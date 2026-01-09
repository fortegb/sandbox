import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
  
  // Validação
  if (!body.email && !body.phone) {
    throw createError({
      statusCode: 400,
      message: 'É necessário fornecer e-mail ou telefone para identificar os dados'
    })
  }

  // Buscar dados do usuário
  let userData: any[] = []

  if (body.email) {
    const { data: leadsByEmail } = await supabase
      .from('leads')
      .select('*')
      .eq('email', body.email)
    
    if (leadsByEmail) userData.push(...leadsByEmail)
  }

  if (body.phone) {
    const { data: leadsByPhone } = await supabase
      .from('leads')
      .select('*')
      .eq('phone', body.phone)
    
    if (leadsByPhone) userData.push(...leadsByPhone)
  }

  // Buscar visitas
  let visits: any[] = []
  if (body.email || body.phone) {
    const { data: visitsData } = await supabase
      .from('visits')
      .select('*')
      .or(`visitor_phone.eq.${body.phone},visitor_email.eq.${body.email}`)
    
    if (visitsData) visits.push(...visitsData)
  }

  // Anonimizar ou deletar dados conforme política de retenção
  // Documentos de verificação: deletar após 30 dias
  // Dados de leads: anonimizar após período de retenção
  // Dados de visitas: anonimizar após período de retenção

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  // Deletar documentos de verificação antigos
  for (const visit of visits) {
    if (visit.verification_data && new Date(visit.created_at) < thirtyDaysAgo) {
      // Remover dados de verificação
      await supabase
        .from('visits')
        .update({
          verification_data: null,
          selfie_photo: null,
          document_photo: null
        })
        .eq('id', visit.id)
    }
  }

  // Anonimizar dados pessoais após período de retenção (ex: 1 ano)
  const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)

  for (const lead of userData) {
    if (new Date(lead.created_at) < oneYearAgo) {
      await supabase
        .from('leads')
        .update({
          name: '[Dados Anonimizados]',
          email: null,
          phone: '[Anonimizado]',
          notes: null
        })
        .eq('id', lead.id)
    } else {
      // Se dentro do período de retenção, deletar completamente se solicitado
      if (body.deleteImmediately) {
        await supabase
          .from('leads')
          .delete()
          .eq('id', lead.id)
      }
    }
  }

  return {
    success: true,
    message: 'Solicitação de exclusão processada. Dados sensíveis foram removidos ou anonimizados conforme nossa política de retenção.'
  }
})




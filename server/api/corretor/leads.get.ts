import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
  
  // Verificar autenticação
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      message: 'Não autorizado'
    })
  }

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  
  if (authError || !user) {
    throw createError({
      statusCode: 401,
      message: 'Não autorizado'
    })
  }

  // Verificar se é corretor
  const { data: realtor, error: realtorError } = await supabase
    .from('realtors')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (realtorError || !realtor) {
    throw createError({
      statusCode: 403,
      message: 'Acesso negado'
    })
  }

  // Buscar leads do corretor
  const { data: leads, error: leadsError } = await supabase
    .from('leads')
    .select(`
      *,
      houses (
        id,
        title
      )
    `)
    .eq('realtor_id', realtor.id)
    .order('created_at', { ascending: false })

  if (leadsError) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao buscar leads: ' + leadsError.message
    })
  }

  // Formatar dados
  const formattedLeads = leads.map((lead: any) => ({
    ...lead,
    house_title: lead.houses?.title || null
  }))

  return {
    leads: formattedLeads
  }
})




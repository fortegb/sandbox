import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  // Verificar autenticação
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
  const authHeader = getHeader(event, 'authorization')
  
  if (!authHeader) {
    throw createError({
      statusCode: 401,
      message: 'Não autorizado'
    })
  }

  // Obter usuário autenticado
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
      message: 'Acesso negado. Apenas corretores podem registrar leads.'
    })
  }

  // Validação
  if (!body.name || !body.phone || !body.houseId) {
    throw createError({
      statusCode: 400,
      message: 'Campos obrigatórios: name, phone, houseId'
    })
  }

  // Verificar se o lead já existe (proteção de comissão)
  const { data: existingLead, error: checkError } = await supabase
    .from('leads')
    .select('*')
    .eq('phone', body.phone)
    .eq('house_id', body.houseId)
    .single()

  if (existingLead) {
    // Lead já existe - verificar se é do mesmo corretor
    if (existingLead.realtor_id === realtor.id) {
      throw createError({
        statusCode: 400,
        message: 'Este lead já foi registrado por você.'
      })
    } else {
      throw createError({
        statusCode: 400,
        message: 'Este lead já foi registrado por outro corretor. A comissão será creditada ao primeiro corretor que registrou.'
      })
    }
  }

  // Criar lead
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .insert({
      realtor_id: realtor.id,
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      house_id: body.houseId,
      visit_date: body.visitDate || null,
      notes: body.notes || null,
      status: 'new',
      created_at: new Date().toISOString()
    })
    .select()
    .single()

  if (leadError) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao criar lead: ' + leadError.message
    })
  }

  // Sincronizar com HubSpot
  try {
    await syncLeadToHubSpot({
      leadId: lead.id,
      realtorId: realtor.id,
      name: body.name,
      phone: body.phone,
      email: body.email,
      houseId: body.houseId,
      visitDate: body.visitDate,
      notes: body.notes
    })
  } catch (err) {
    console.error('Erro ao sincronizar com HubSpot:', err)
    // Não falhar o registro se o HubSpot falhar
  }

  return {
    success: true,
    lead: lead,
    message: 'Lead registrado com sucesso! Você será creditado pela comissão se este lead fechar negócio.'
  }
})

async function syncLeadToHubSpot(data: any) {
  // TODO: Implementar integração com HubSpot API
  console.log('HubSpot - Sincronizar lead:', data)
}




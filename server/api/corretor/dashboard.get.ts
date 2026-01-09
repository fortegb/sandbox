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

  // Buscar estatísticas
  const { data: allLeads, error: leadsError } = await supabase
    .from('leads')
    .select('status')
    .eq('realtor_id', realtor.id)

  if (leadsError) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao buscar estatísticas: ' + leadsError.message
    })
  }

  const stats = {
    totalLeads: allLeads.length,
    activeLeads: allLeads.filter((l: any) => 
      ['new', 'contacted', 'visit_scheduled', 'visit_completed', 'negotiating'].includes(l.status)
    ).length,
    negotiating: allLeads.filter((l: any) => l.status === 'negotiating').length
  }

  // Buscar leads recentes
  const { data: recentLeads, error: recentError } = await supabase
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
    .limit(5)

  const formattedRecentLeads = (recentLeads || []).map((lead: any) => ({
    ...lead,
    house_title: lead.houses?.title || null
  }))

  return {
    stats,
    recentLeads: formattedRecentLeads
  }
})




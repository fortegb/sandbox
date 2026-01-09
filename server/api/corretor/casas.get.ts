import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
  
  // Buscar todas as casas disponíveis
  const { data: houses, error } = await supabase
    .from('houses')
    .select('*')
    .in('status', ['disponivel', 'em-construcao', 'reservado'])
    .order('created_at', { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao buscar casas: ' + error.message
    })
  }

  return {
    houses: houses || []
  }
})




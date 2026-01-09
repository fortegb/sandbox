import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code')
  const config = useRuntimeConfig()
  
  if (!code) {
    throw createError({
      statusCode: 400,
      message: 'Código QR não fornecido'
    })
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
  
  // Buscar casa pelo código QR
  const { data: house, error } = await supabase
    .from('houses')
    .select('*')
    .eq('qr_code', code)
    .single()

  if (error || !house) {
    return {
      success: false,
      message: 'Código QR inválido'
    }
  }

  return {
    success: true,
    house: {
      id: house.id,
      title: house.title,
      description: house.description,
      image: house.main_image
    }
  }
})




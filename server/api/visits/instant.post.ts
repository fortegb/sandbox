import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  if (!body.qrCode || !body.verificationData) {
    throw createError({
      statusCode: 400,
      message: 'Campos obrigatórios: qrCode, verificationData'
    })
  }

  // Verificar identidade
  if (!body.verificationData.verified) {
    throw createError({
      statusCode: 403,
      message: 'Verificação de identidade falhou'
    })
  }

  // Buscar informações da casa pelo QR code
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
  
  const { data: house, error: houseError } = await supabase
    .from('houses')
    .select('*')
    .eq('qr_code', body.qrCode)
    .single()

  if (houseError || !house) {
    throw createError({
      statusCode: 404,
      message: 'Código QR inválido'
    })
  }

  // Gerar senha imediata (válida por 2 horas)
  const password = generatePassword()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000) // 2 horas

  // Salvar visita
  const { data: visit, error: visitError } = await supabase
    .from('visits')
    .insert({
      house_id: house.id,
      visitor_name: body.verificationData.name || 'Visitante',
      visitor_phone: body.verificationData.phone || '',
      visit_date: now.toISOString(),
      password: password,
      password_expires_at: expiresAt.toISOString(),
      verification_data: body.verificationData,
      status: 'instant',
      qr_code: body.qrCode
    })
    .select()
    .single()

  if (visitError) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao criar visita: ' + visitError.message
    })
  }

  // Programar senha no smart lock
  try {
    await programSmartLock(house.id, password, now, expiresAt)
  } catch (err) {
    console.error('Erro ao programar smart lock:', err)
  }

  // Enviar senha via WhatsApp
  if (body.verificationData.phone) {
    try {
      await sendWhatsAppMessage(
        body.verificationData.phone,
        `Sua senha de acesso: ${password}. Esta senha é válida por 2 horas.`
      )
    } catch (err) {
      console.error('Erro ao enviar WhatsApp:', err)
    }
  }

  // Criar lead no HubSpot
  try {
    await createHubSpotLead({
      name: body.verificationData.name || 'Visitante',
      phone: body.verificationData.phone || '',
      houseId: house.id,
      visitDate: now.toISOString(),
      source: 'qr_code_instant_visit'
    })
  } catch (err) {
    console.error('Erro ao criar lead no HubSpot:', err)
  }

  return {
    success: true,
    password: password,
    expiresAt: expiresAt.toISOString(),
    validHours: 2
  }
})

function generatePassword(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

async function programSmartLock(houseId: string, password: string, startDate: Date, endDate: Date) {
  // TODO: Implementar integração com Tuya API
  console.log('Smart lock would be programmed:', { houseId, password, startDate, endDate })
}

async function sendWhatsAppMessage(phone: string, message: string) {
  // TODO: Implementar integração com WhatsApp API
  console.log('WhatsApp message would be sent:', { phone, message })
}

async function createHubSpotLead(data: any) {
  // TODO: Implementar integração com HubSpot API
  console.log('HubSpot lead would be created:', data)
}




import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  
  // Validação
  if (!body.houseId || !body.name || !body.phone || !body.date || !body.time || !body.verificationData) {
    throw createError({
      statusCode: 400,
      message: 'Campos obrigatórios: houseId, name, phone, date, time, verificationData'
    })
  }

  // Verificar identidade (já foi feita no frontend, mas validar novamente)
  if (!body.verificationData.verified) {
    throw createError({
      statusCode: 403,
      message: 'Verificação de identidade falhou'
    })
  }

  // Gerar senha única e temporária
  const password = generatePassword()
  const visitDate = new Date(`${body.date}T${body.time}`)
  const expiresAt = new Date(visitDate.getTime() + 4 * 60 * 60 * 1000) // 4 horas após a visita

  // Salvar no banco de dados
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)
  
  const { data: visit, error: dbError } = await supabase
    .from('visits')
    .insert({
      house_id: body.houseId,
      visitor_name: body.name,
      visitor_phone: body.phone,
      visit_date: visitDate.toISOString(),
      password: password,
      password_expires_at: expiresAt.toISOString(),
      verification_data: body.verificationData,
      status: 'scheduled'
    })
    .select()
    .single()

  if (dbError) {
    throw createError({
      statusCode: 500,
      message: 'Erro ao salvar agendamento: ' + dbError.message
    })
  }

  // Criar evento no Google Calendar
  try {
    await createCalendarEvent({
      title: `Visita - ${body.name}`,
      description: `Visita agendada para ${body.name} (${body.phone})`,
      start: visitDate,
      end: new Date(visitDate.getTime() + 60 * 60 * 1000) // 1 hora
    })
  } catch (err) {
    console.error('Erro ao criar evento no calendário:', err)
    // Não falhar o agendamento se o calendário falhar
  }

  // Programar senha no smart lock via Tuya API
  try {
    await programSmartLock(body.houseId, password, visitDate, expiresAt)
  } catch (err) {
    console.error('Erro ao programar smart lock:', err)
    // Não falhar o agendamento se o lock falhar
  }

  // Enviar confirmação via WhatsApp
  try {
    await sendWhatsAppMessage(
      body.phone,
      `Olá ${body.name}! Sua visita foi agendada para ${formatDate(visitDate)} às ${body.time}. ` +
      `Sua senha de acesso: ${password}. Esta senha é válida por 4 horas a partir do horário agendado.`
    )
  } catch (err) {
    console.error('Erro ao enviar WhatsApp:', err)
    // Não falhar o agendamento se o WhatsApp falhar
  }

  // Criar lead no HubSpot
  try {
    await createHubSpotLead({
      name: body.name,
      phone: body.phone,
      houseId: body.houseId,
      visitDate: visitDate.toISOString(),
      source: 'website_visit_booking'
    })
  } catch (err) {
    console.error('Erro ao criar lead no HubSpot:', err)
    // Não falhar o agendamento se o HubSpot falhar
  }

  return {
    success: true,
    visitId: visit.id,
    password: password,
    expiresAt: expiresAt.toISOString()
  }
})

function generatePassword(): string {
  // Gerar senha numérica de 6 dígitos
  return Math.floor(100000 + Math.random() * 900000).toString()
}

async function createCalendarEvent(event: any) {
  // TODO: Implementar integração com Google Calendar API
  // Por enquanto, apenas log
  console.log('Calendar event would be created:', event)
}

async function programSmartLock(houseId: string, password: string, startDate: Date, endDate: Date) {
  // TODO: Implementar integração com Tuya API
  // Por enquanto, apenas log
  console.log('Smart lock would be programmed:', { houseId, password, startDate, endDate })
}

async function sendWhatsAppMessage(phone: string, message: string) {
  // TODO: Implementar integração com WhatsApp API
  // Por enquanto, apenas log
  console.log('WhatsApp message would be sent:', { phone, message })
}

async function createHubSpotLead(data: any) {
  // TODO: Implementar integração com HubSpot API
  // Por enquanto, apenas log
  console.log('HubSpot lead would be created:', data)
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}




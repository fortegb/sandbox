// Serviço para integração com HubSpot CRM

export class HubSpotService {
  private apiKey: string
  private baseUrl = 'https://api.hubapi.com'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  /**
   * Criar ou atualizar contato no HubSpot
   */
  async createOrUpdateContact(data: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    [key: string]: any
  }): Promise<string> {
    // TODO: Implementar integração real com HubSpot API
    console.log('HubSpot - Criar/Atualizar contato:', data)

    // Exemplo de implementação:
    // const response = await fetch(`${this.baseUrl}/crm/v3/objects/contacts`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${this.apiKey}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     properties: {
    //       email: data.email,
    //       phone: data.phone,
    //       firstname: data.firstName,
    //       lastname: data.lastName,
    //       ...data.customProperties
    //     }
    //   })
    // })
    // 
    // if (!response.ok) {
    //   throw new Error(`HubSpot API error: ${response.statusText}`)
    // }
    // 
    // const result = await response.json()
    // return result.id

    return 'mock-contact-id'
  }

  /**
   * Criar deal no HubSpot
   */
  async createDeal(data: {
    name: string
    amount?: number
    pipelineId: string
    stageId: string
    associatedContactId?: string
    customProperties?: Record<string, any>
  }): Promise<string> {
    // TODO: Implementar
    console.log('HubSpot - Criar deal:', data)
    return 'mock-deal-id'
  }

  /**
   * Criar lead (contact + deal) completo
   */
  async createLead(data: {
    name: string
    phone: string
    email?: string
    houseId?: string
    houseTitle?: string
    visitDate?: string
    realtorId?: string
    realtorName?: string
    source: string
    notes?: string
  }): Promise<{ contactId: string; dealId: string }> {
    // Criar contato
    const contactId = await this.createOrUpdateContact({
      phone: data.phone,
      email: data.email,
      firstName: data.name.split(' ')[0],
      lastName: data.name.split(' ').slice(1).join(' '),
      // Custom properties
      house_id: data.houseId,
      house_title: data.houseTitle,
      visit_date: data.visitDate,
      realtor_id: data.realtorId,
      realtor_name: data.realtorName,
      lead_source: data.source,
      notes: data.notes
    })

    // Criar deal associado
    const dealId = await this.createDeal({
      name: `Negociação - ${data.houseTitle || 'Casa'}`,
      amount: 0, // Será atualizado quando fechar
      pipelineId: 'default', // ID do pipeline configurado no HubSpot
      stageId: 'new', // Stage inicial
      associatedContactId: contactId,
      customProperties: {
        house_id: data.houseId,
        house_title: data.houseTitle,
        visit_date: data.visitDate,
        realtor_id: data.realtorId,
        realtor_name: data.realtorName,
        lead_source: data.source
      }
    })

    return { contactId, dealId }
  }

  /**
   * Atualizar status do deal
   */
  async updateDealStage(dealId: string, stageId: string): Promise<void> {
    // TODO: Implementar
    console.log('HubSpot - Atualizar stage do deal:', { dealId, stageId })
  }

  /**
   * Buscar contato por telefone ou email
   */
  async findContactByPhoneOrEmail(phone?: string, email?: string): Promise<any | null> {
    // TODO: Implementar
    console.log('HubSpot - Buscar contato:', { phone, email })
    return null
  }
}

export function createHubSpotService(apiKey: string): HubSpotService {
  return new HubSpotService(apiKey)
}




<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Meus Leads</h1>
      <NuxtLink to="/corretor/leads/novo" class="btn btn-primary">
        Registrar Novo Lead
      </NuxtLink>
    </div>

    <!-- Filtros -->
    <div class="card bg-base-100 shadow-xl mb-6">
      <div class="card-body">
        <div class="flex flex-wrap gap-4">
          <select v-model="filters.status" class="select select-bordered">
            <option value="">Todos os status</option>
            <option value="new">Novo</option>
            <option value="contacted">Contatado</option>
            <option value="visit_scheduled">Visita Agendada</option>
            <option value="visit_completed">Visita Realizada</option>
            <option value="negotiating">Em Negociação</option>
            <option value="closed_won">Fechado</option>
            <option value="closed_lost">Perdido</option>
          </select>
          
          <input
            v-model="filters.search"
            type="text"
            placeholder="Buscar por nome ou telefone..."
            class="input input-bordered flex-grow max-w-md"
          />
        </div>
      </div>
    </div>

    <!-- Lista de Leads -->
    <div v-if="loading" class="text-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="filteredLeads.length === 0" class="text-center py-12">
      <p class="text-xl text-base-content/70">Nenhum lead encontrado.</p>
    </div>
    
    <div v-else class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Casa</th>
                <th>Status</th>
                <th>Data de Registro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lead in filteredLeads" :key="lead.id">
                <td>{{ lead.name }}</td>
                <td>{{ lead.phone }}</td>
                <td>{{ lead.email || '-' }}</td>
                <td>{{ lead.house_title || '-' }}</td>
                <td>
                  <span class="badge" :class="getStatusBadgeClass(lead.status)">
                    {{ formatStatus(lead.status) }}
                  </span>
                </td>
                <td>{{ formatDate(lead.created_at) }}</td>
                <td>
                  <NuxtLink :to="`/corretor/leads/${lead.id}`" class="btn btn-sm btn-ghost">
                    Ver Detalhes
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'realtor-auth'
})

const loading = ref(true)
const leads = ref<any[]>([])

const filters = reactive({
  status: '',
  search: ''
})

onMounted(async () => {
  await loadLeads()
})

const loadLeads = async () => {
  try {
    const response = await $fetch('/api/corretor/leads')
    leads.value = response.leads
  } catch (err) {
    console.error('Error loading leads:', err)
  } finally {
    loading.value = false
  }
}

const filteredLeads = computed(() => {
  let result = [...leads.value]
  
  if (filters.status) {
    result = result.filter(lead => lead.status === filters.status)
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    result = result.filter(lead => 
      lead.name.toLowerCase().includes(searchLower) ||
      lead.phone.toLowerCase().includes(searchLower) ||
      (lead.email && lead.email.toLowerCase().includes(searchLower))
    )
  }
  
  return result
})

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(dateString))
}

const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    'new': 'Novo',
    'contacted': 'Contatado',
    'visit_scheduled': 'Visita Agendada',
    'visit_completed': 'Visita Realizada',
    'negotiating': 'Em Negociação',
    'closed_won': 'Fechado',
    'closed_lost': 'Perdido'
  }
  return statusMap[status] || status
}

const getStatusBadgeClass = (status: string) => {
  const classMap: Record<string, string> = {
    'new': 'badge-info',
    'contacted': 'badge-primary',
    'visit_scheduled': 'badge-warning',
    'visit_completed': 'badge-warning',
    'negotiating': 'badge-warning',
    'closed_won': 'badge-success',
    'closed_lost': 'badge-error'
  }
  return classMap[status] || 'badge-neutral'
}

useHead({
  title: 'Meus Leads - Portal do Corretor'
})
</script>




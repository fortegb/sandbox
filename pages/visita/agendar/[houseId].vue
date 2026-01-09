<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 class="text-4xl font-bold mb-8">Agendar Visita</h1>
    
    <div v-if="step === 1" class="card bg-base-100 shadow-xl p-6">
      <h2 class="text-2xl font-bold mb-4">Informações da Visita</h2>
      <form @submit.prevent="handleStep1" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium mb-2">Nome Completo *</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="input input-bordered w-full"
            placeholder="Seu nome completo"
          />
        </div>
        
        <div>
          <label for="phone" class="block text-sm font-medium mb-2">Telefone/WhatsApp *</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            required
            class="input input-bordered w-full"
            placeholder="(19) 99999-9999"
          />
        </div>
        
        <div>
          <label for="date" class="block text-sm font-medium mb-2">Data Preferida *</label>
          <input
            id="date"
            v-model="form.date"
            type="date"
            required
            :min="minDate"
            class="input input-bordered w-full"
          />
        </div>
        
        <div>
          <label for="time" class="block text-sm font-medium mb-2">Horário Preferido *</label>
          <select
            id="time"
            v-model="form.time"
            required
            class="select select-bordered w-full"
          >
            <option value="">Selecione um horário</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
          </select>
        </div>
        
        <div v-if="error" class="alert alert-error">
          <span>{{ error }}</span>
        </div>
        
        <button type="submit" class="btn btn-primary w-full">
          Continuar para Verificação
        </button>
      </form>
    </div>
    
    <div v-else-if="step === 2" class="card bg-base-100 shadow-xl p-6">
      <h2 class="text-2xl font-bold mb-4">Verificação de Identidade</h2>
      <p class="text-base-content/70 mb-6">
        Para sua segurança e a nossa, precisamos verificar sua identidade antes de liberar o acesso.
      </p>
      
      <IdentityVerification
        @verified="handleVerification"
        @error="handleVerificationError"
      />
    </div>
    
    <div v-else-if="step === 3" class="card bg-base-100 shadow-xl p-6 text-center">
      <div class="mb-4">
        <svg class="w-16 h-16 text-success mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold mb-4">Visita Agendada com Sucesso!</h2>
      <p class="text-base-content/70 mb-6">
        Você receberá as informações de acesso via WhatsApp em breve.
      </p>
      <div class="space-y-2 mb-6">
        <p><strong>Data:</strong> {{ formatDate(form.date) }}</p>
        <p><strong>Horário:</strong> {{ form.time }}</p>
        <p v-if="visitPassword"><strong>Senha de Acesso:</strong> <code class="text-lg font-mono">{{ visitPassword }}</code></p>
      </div>
      <NuxtLink to="/portfolio" class="btn btn-primary">
        Voltar ao Portfólio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const houseId = route.params.houseId as string

const step = ref(1)
const error = ref('')
const visitPassword = ref('')

const form = reactive({
  name: '',
  phone: '',
  date: '',
  time: ''
})

const minDate = computed(() => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
})

const handleStep1 = () => {
  error.value = ''
  step.value = 2
}

const handleVerification = async (verificationData: any) => {
  try {
    // Enviar dados para o backend
    const response = await $fetch('/api/visits/schedule', {
      method: 'POST',
      body: {
        houseId,
        ...form,
        verificationData
      }
    })
    
    if (response.success) {
      visitPassword.value = response.password || ''
      step.value = 3
    } else {
      error.value = response.error || 'Erro ao agendar visita. Tente novamente.'
      step.value = 1
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao agendar visita. Tente novamente.'
    step.value = 1
  }
}

const handleVerificationError = (err: string) => {
  error.value = err
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

useHead({
  title: 'Agendar Visita - ForteGB'
})
</script>




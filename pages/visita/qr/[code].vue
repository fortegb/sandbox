<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <div v-if="loading" class="text-center py-12">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else-if="house" class="card bg-base-100 shadow-xl p-6">
      <h1 class="text-3xl font-bold mb-4">{{ house.title }}</h1>
      <p class="text-base-content/70 mb-6">
        Para acessar esta propriedade, precisamos verificar sua identidade.
      </p>
      
      <div v-if="step === 1">
        <IdentityVerification
          @verified="handleVerification"
          @error="handleVerificationError"
        />
      </div>
      
      <div v-else-if="step === 2" class="text-center">
        <div class="mb-4">
          <svg class="w-16 h-16 text-success mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold mb-4">Acesso Liberado!</h2>
        <p class="text-base-content/70 mb-6">
          Você receberá a senha de acesso via WhatsApp em instantes.
        </p>
        <div v-if="password" class="mb-6">
          <p class="text-sm text-base-content/70 mb-2">Sua senha de acesso:</p>
          <code class="text-2xl font-mono font-bold text-primary-500">{{ password }}</code>
          <p class="text-xs text-base-content/50 mt-2">
            Esta senha é válida por {{ validHours }} horas
          </p>
        </div>
        <div v-if="error" class="alert alert-error mb-4">
          <span>{{ error }}</span>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center py-12">
      <h1 class="text-4xl font-bold mb-4">Código QR inválido</h1>
      <p class="text-base-content/70 mb-6">Este código não está associado a nenhuma propriedade.</p>
      <NuxtLink to="/portfolio" class="btn btn-primary">
        Ver Portfólio
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const code = route.params.code as string

const loading = ref(true)
const step = ref(1)
const house = ref<any>(null)
const password = ref('')
const error = ref('')
const validHours = 2

onMounted(async () => {
  try {
    // Buscar informações da casa pelo código QR
    const response = await $fetch(`/api/visits/qr/${code}`)
    if (response.success) {
      house.value = response.house
    }
  } catch (err) {
    console.error('Error loading QR code:', err)
  } finally {
    loading.value = false
  }
})

const handleVerification = async (verificationData: any) => {
  try {
    const response = await $fetch('/api/visits/instant', {
      method: 'POST',
      body: {
        qrCode: code,
        verificationData
      }
    })
    
    if (response.success) {
      password.value = response.password || ''
      step.value = 2
    } else {
      error.value = response.error || 'Erro ao gerar acesso. Tente novamente.'
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao gerar acesso. Tente novamente.'
  }
}

const handleVerificationError = (err: string) => {
  error.value = err
}

useHead({
  title: 'Acesso à Propriedade - ForteGB'
})
</script>




<template>
  <div class="space-y-6">
    <div class="alert alert-info">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        Por segurança, precisamos verificar sua identidade. Tire uma foto sua e faça upload de um documento (RG ou CNH).
      </span>
    </div>
    
    <div>
      <label class="block text-sm font-medium mb-2">1. Tire uma foto sua (selfie) *</label>
      <div class="flex items-center space-x-4">
        <div v-if="!selfiePhoto" class="border-2 border-dashed border-base-300 rounded-lg p-8 w-full text-center">
          <input
            ref="selfieInput"
            type="file"
            accept="image/*"
            capture="user"
            @change="handleSelfieUpload"
            class="hidden"
          />
          <button
            @click="$refs.selfieInput?.click()"
            class="btn btn-outline"
          >
            Tirar Foto
          </button>
        </div>
        <div v-else class="relative">
          <img :src="selfiePhoto" alt="Selfie" class="w-32 h-32 object-cover rounded-lg" />
          <button
            @click="selfiePhoto = null"
            class="absolute -top-2 -right-2 btn btn-circle btn-sm btn-error"
          >
            ×
          </button>
        </div>
      </div>
    </div>
    
    <div>
      <label class="block text-sm font-medium mb-2">2. Faça upload do seu documento (RG ou CNH) *</label>
      <div class="flex items-center space-x-4">
        <div v-if="!documentPhoto" class="border-2 border-dashed border-base-300 rounded-lg p-8 w-full text-center">
          <input
            ref="documentInput"
            type="file"
            accept="image/*"
            capture="environment"
            @change="handleDocumentUpload"
            class="hidden"
          />
          <button
            @click="$refs.documentInput?.click()"
            class="btn btn-outline"
          >
            Fazer Upload
          </button>
        </div>
        <div v-else class="relative">
          <img :src="documentPhoto" alt="Documento" class="w-32 h-32 object-cover rounded-lg" />
          <button
            @click="documentPhoto = null"
            class="absolute -top-2 -right-2 btn btn-circle btn-sm btn-error"
          >
            ×
          </button>
        </div>
      </div>
    </div>
    
    <div v-if="verifying" class="text-center py-4">
      <span class="loading loading-spinner loading-lg"></span>
      <p class="mt-2">Verificando identidade...</p>
    </div>
    
    <div v-if="error" class="alert alert-error">
      <span>{{ error }}</span>
    </div>
    
    <button
      @click="verifyIdentity"
      :disabled="!selfiePhoto || !documentPhoto || verifying"
      class="btn btn-primary w-full"
    >
      Verificar Identidade
    </button>
  </div>
</template>

<script setup lang="ts">
const selfiePhoto = ref<string | null>(null)
const documentPhoto = ref<string | null>(null)
const verifying = ref(false)
const error = ref('')

const emit = defineEmits<{
  verified: [data: any]
  error: [message: string]
}>()

const handleSelfieUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      selfiePhoto.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const handleDocumentUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      documentPhoto.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const verifyIdentity = async () => {
  if (!selfiePhoto.value || !documentPhoto.value) {
    error.value = 'Por favor, forneça tanto a foto quanto o documento.'
    return
  }

  verifying.value = true
  error.value = ''

  try {
    // Aqui você pode usar uma biblioteca de verificação facial como face-api.js
    // Por enquanto, vamos fazer uma verificação básica no backend
    const response = await $fetch('/api/visits/verify', {
      method: 'POST',
      body: {
        selfie: selfiePhoto.value,
        document: documentPhoto.value
      }
    })

    if (response.success) {
      emit('verified', {
        selfie: selfiePhoto.value,
        document: documentPhoto.value,
        verificationScore: response.score,
        verified: response.verified
      })
    } else {
      error.value = response.error || 'Falha na verificação. Por favor, tente novamente.'
      emit('error', error.value)
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao verificar identidade. Tente novamente.'
    emit('error', error.value)
  } finally {
    verifying.value = false
  }
}
</script>




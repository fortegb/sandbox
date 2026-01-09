<template>
  <div
    v-if="!consentGiven"
    class="fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg border-t border-base-300 z-50 p-4"
  >
    <div class="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="flex-1">
        <p class="text-sm">
          Utilizamos cookies para melhorar sua experiência em nosso site. 
          Ao continuar navegando, você concorda com nossa 
          <NuxtLink to="/privacidade" class="text-primary-500 hover:underline">
            Política de Privacidade
          </NuxtLink>.
        </p>
      </div>
      <div class="flex gap-2">
        <button
          @click="acceptCookies"
          class="btn btn-primary btn-sm"
        >
          Aceitar
        </button>
        <button
          @click="rejectCookies"
          class="btn btn-outline btn-sm"
        >
          Recusar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const consentGiven = ref(false)

onMounted(() => {
  // Verificar se o consentimento já foi dado
  const consent = localStorage.getItem('cookie-consent')
  if (consent === 'accepted' || consent === 'rejected') {
    consentGiven.value = true
  }
})

const acceptCookies = () => {
  localStorage.setItem('cookie-consent', 'accepted')
  consentGiven.value = true
}

const rejectCookies = () => {
  localStorage.setItem('cookie-consent', 'rejected')
  consentGiven.value = true
  // Remover cookies existentes se necessário
}
</script>




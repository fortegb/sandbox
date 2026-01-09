<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 class="text-4xl font-bold mb-8">Registrar Novo Lead</h1>
    
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium mb-2">Nome do Lead *</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="input input-bordered w-full"
              placeholder="Nome completo do lead"
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
            <label for="email" class="block text-sm font-medium mb-2">E-mail</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="input input-bordered w-full"
              placeholder="email@exemplo.com"
            />
          </div>

          <div>
            <label for="houseId" class="block text-sm font-medium mb-2">Casa de Interesse *</label>
            <select
              id="houseId"
              v-model="form.houseId"
              required
              class="select select-bordered w-full"
            >
              <option value="">Selecione uma casa</option>
              <option v-for="house in houses" :key="house.id" :value="house.id">
                {{ house.title }}
              </option>
            </select>
          </div>

          <div>
            <label for="visitDate" class="block text-sm font-medium mb-2">Data da Visita (se aplicável)</label>
            <input
              id="visitDate"
              v-model="form.visitDate"
              type="date"
              class="input input-bordered w-full"
            />
          </div>

          <div>
            <label for="notes" class="block text-sm font-medium mb-2">Observações</label>
            <textarea
              id="notes"
              v-model="form.notes"
              rows="4"
              class="textarea textarea-bordered w-full"
              placeholder="Anotações sobre o lead..."
            ></textarea>
          </div>

          <div v-if="error" class="alert alert-error">
            <span>{{ error }}</span>
          </div>

          <div v-if="success" class="alert alert-success">
            <span>Lead registrado com sucesso! Você será creditado pela comissão se este lead fechar negócio.</span>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              :disabled="loading"
              class="btn btn-primary flex-1"
            >
              <span v-if="loading" class="loading loading-spinner"></span>
              <span v-else>Registrar Lead</span>
            </button>
            <NuxtLink to="/corretor/leads" class="btn btn-outline">
              Cancelar
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'realtor-auth'
})

const form = reactive({
  name: '',
  phone: '',
  email: '',
  houseId: '',
  visitDate: '',
  notes: ''
})

const houses = ref<any[]>([])
const loading = ref(false)
const error = ref('')
const success = ref(false)

onMounted(async () => {
  await loadHouses()
})

const loadHouses = async () => {
  try {
    const response = await $fetch('/api/corretor/casas')
    houses.value = response.houses
  } catch (err) {
    console.error('Error loading houses:', err)
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  success.value = false

  try {
    const response = await $fetch('/api/corretor/leads', {
      method: 'POST',
      body: form
    })

    if (response.success) {
      success.value = true
      // Reset form
      form.name = ''
      form.phone = ''
      form.email = ''
      form.houseId = ''
      form.visitDate = ''
      form.notes = ''
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigateTo('/corretor/leads')
      }, 2000)
    } else {
      error.value = response.error || 'Erro ao registrar lead. Tente novamente.'
    }
  } catch (err: any) {
    error.value = err.message || 'Erro ao registrar lead. Tente novamente.'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Registrar Novo Lead - Portal do Corretor'
})
</script>




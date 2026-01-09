<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div class="card bg-base-100 shadow-xl w-full max-w-md">
      <div class="card-body">
        <h1 class="text-3xl font-bold text-center mb-6">Portal do Corretor</h1>
        
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium mb-2">E-mail</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input input-bordered w-full"
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium mb-2">Senha</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input input-bordered w-full"
              placeholder="Sua senha"
            />
          </div>
          
          <div v-if="error" class="alert alert-error">
            <span>{{ error }}</span>
          </div>
          
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary w-full"
          >
            <span v-if="loading" class="loading loading-spinner"></span>
            <span v-else>Entrar</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['guest']
})

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const supabase = useSupabaseClient()
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })

    if (authError) {
      error.value = 'E-mail ou senha incorretos.'
      return
    }

    // Verificar se o usuário é um corretor
    const { data: realtor, error: realtorError } = await supabase
      .from('realtors')
      .select('*')
      .eq('user_id', data.user.id)
      .single()

    if (realtorError || !realtor) {
      error.value = 'Você não tem permissão para acessar este portal.'
      await supabase.auth.signOut()
      return
    }

    // Redirecionar para o dashboard
    await navigateTo('/corretor/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Erro ao fazer login. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>




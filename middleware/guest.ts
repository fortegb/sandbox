export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient()
  
  // Verificar se o usuário já está autenticado
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    // Se já estiver autenticado, redirecionar para o dashboard
    return navigateTo('/corretor/dashboard')
  }
})




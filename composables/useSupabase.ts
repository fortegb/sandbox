export const useSupabase = () => {
  const supabase = useSupabaseClient()
  
  return {
    supabase,
  }
}



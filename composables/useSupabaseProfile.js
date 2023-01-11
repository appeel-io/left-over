import { useSupabaseClient, useSupabaseUser } from '#imports'

export async function useSupabaseProfile(sessionUser = null) {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const $user = sessionUser || user.value
  if (!$user) return {}

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', $user.id)
    .maybeSingle()

  return profile
}

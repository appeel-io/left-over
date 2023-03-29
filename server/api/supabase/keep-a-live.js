/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event)

  return await supabase.from('profiles').select()
})

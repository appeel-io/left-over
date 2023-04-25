/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  await supabase.from('profiles').select()
  return 'ok'
})

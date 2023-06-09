/* eslint-disable no-undef */
import { defineStore } from 'pinia'
import { useProfileStore } from '@/store/profile'
import { arrayToPostGresArray } from '~/util/postgres'

export const usePostingsStore = defineStore('usePostingsStore', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const profile = useProfileStore()

  const postings = ref(null)

  async function filterPostings(search = '', radius, filters = [], allergies = []) {
    try {
      const baseQuery = supabase
        .from('postings')
        .select('id, name, category(id, label, color, icon), status, description, expiration_date_item, expiration_date_post, created_at, created_by(firstname, lastname), address(lat,long)', { count: 'exact' })
        .neq('created_by', user.value.id)
      if (search) baseQuery.ilike('name', `%${search}%`)
      if (filters?.length) baseQuery.in('category', filters)
      if (allergies?.length) baseQuery.not('allergies', 'cs', arrayToPostGresArray(allergies))

      const { data, error } = await baseQuery
      if (error) throw error

      postings.value = data

      if (radius) postings.value = useRangePostings(radius, postings.value, profile.position.lat, profile.position.long)
    }
    catch (error) {
      console.error(error)
    }
  }

  async function getPostingById(id) {
    try {
      const { data, error } = await supabase
        .from('postings')
        .select(
          'id, name, category(id, label, color, icon), status, expiration_date_item, experation_date_post, created_at, retrieval_start_range, retrieval_end_range,  created_by(firstname, lastname, rating), address(lat,long)',
          { count: 'exact' },
        )
        .eq('id', id)

      if (error) throw error

      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  async function addPosting(newData) {
    try {
      const { data, error } = await supabase
        .from('postings')
        .insert({ created_by: user.value.id, ...newData })

      if (error) throw error

      return data
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, newData)
    }
  }

  async function updatePosting(id, newData) {
    try {
      const index = postings.value.findIndex(p => p.id === id)

      if (index >= 0 && newData?.status) postings.value[index].status = newData.status

      const { error } = await supabase
        .from('postings')
        .update(newData)
        .eq('id', id)

      if (error) throw error
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  async function deletePosting(id) {
    try {
      const { error } = await supabase
        .from('posting')
        .delete()
        .eq('id', id)

      if (error) throw error
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  return {
    data: postings,
    getPostingById,
    addPosting,
    filterPostings,
    updatePosting,
    deletePosting,
  }
})

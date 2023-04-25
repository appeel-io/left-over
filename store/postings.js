/* eslint-disable no-undef */

import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const usePostingsStore = defineStore('usePostingsStore', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const postings = ref(null)

  async function getPostings() {
    try {
      const { data, error } = await supabase
        .from('postings')
        .select('id, name, category(label), status, description, expiration_date_post, expiration_date_post, created_at, created_by(firstname, lastname), address(lat,long)', { count: 'exact' })

      if (error) throw error

      postings.value = data
    }
    catch (error) {
      console.error(error)
    }
  }

  async function getPostingById(id) {
    try {
      const { data, error } = await supabase
        .from('postings')
        .select('id, name, category(label), status, description, expiration_date_post, expiration_date_post, created_at, created_by(firstname, lastname), address(lat,long)', { count: 'exact' }).eq('id', id)

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
        .add({ created_by: user.value.id, ...newData })

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
      const { error } = await supabase
        .from('postings')
        .update({ id, user_id: user.value.id, ...newData })
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

  onMounted(getPostings)

  return {
    data: postings,
    getPostings,
    getPostingById,
    addPosting,
    updatePosting,
    deletePosting,
  }
})

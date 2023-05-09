/* eslint-disable no-undef */
import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useReservationsStore = defineStore('useReservationsStore', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const reservations = ref(null)

  async function getReservationById(id) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select(
          '*',
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

  async function getReservationsForUser() {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select(
          'id(id, name, address(*), status), message, profile, pickup_date_time',
          { count: 'exact' },
        )
        .eq('profile', user.value.id)
        .neq('cancelled', true)
      if (error) throw error

      return data
    }
    catch (error) {
      console.error(error)
    }
  }

  async function addReservation(postId, newData) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .upsert({ profile: user.value.id, id: postId, ...newData, cancelled: false })

      if (error) throw error

      return data
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, newData)
    }
  }

  async function updateReservation(id, newData) {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .update(newData)
        .eq('id', id)

      if (error) throw error

      return data
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, newData)
    }
  }

  async function deleteReservation(id) {
    try {
      const { error } = await supabase
        .from('reservations')
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
    data: reservations,
    getReservationById,
    updateReservation,
    deleteReservation,
    addReservation,
    getReservationsForUser,
  }
})

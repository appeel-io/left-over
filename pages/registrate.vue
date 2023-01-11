<script setup>
import { useAuthStore } from '@/store/auth'

const user = useSupabaseUser()
const store = useAuthStore()
const router = useRouter()

const formData = ref({ firstname: '', lastname: '', email: '', password: '', terms: false })
const error = ref(null)
const loading = ref(false)

const registration = async({ __init, email, password, ...form }) => {
  loading.value = true
  try {
    await store.register({ email, password }, form)
    router.push({ path: '/' })
  }
  catch (err) {
    error.value = err.message
  }
  finally {
    loading.value = false
  }
}

const togglePassword = (node) => {
  node.props.type = node.props.type === 'text' ? 'password' : 'text'
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
}

watchEffect(() => {
  if (user.value) navigateTo('/')
})
</script>

<template>
  <NuxtLayout name="centered">
    <section class="space-y-8">
      <div class="space-y-4">
        <img class="w-32 mx-auto rounded-full" src="~/assets/icons/favicon.png" alt="Appeel logo">
        <h2 class="text-center">
          Registration
        </h2>
      </div>
      <FormKit v-model="formData" type="form" :actions="false" @submit="registration">
        <div class="flex flex-col gap-2">
          <p v-if="error" class="text-center text-red-500">
            {{ error }}
          </p>
          <Input label="Firstname" name="firstname" placeholder="Sherlock" validation="required|length:2,50" />
          <Input label="Lastname" name="lastname" placeholder="Holmes" validation="required|length:2,50" />
          <Input label="Email" name="email" placeholder="sherlock.holmes@email.com" validation="required|*email" />
          <Input
            label="Password"
            type="password"
            name="password"
            suffix-icon="eyeClosed"
            validation="required|length:8,50"
            @suffix-icon-click="togglePassword"
          />
          <Checkbox name="terms" label="I accept the terms and conditions" validation="accepted" />
          <div class="mx-auto">
            <Button type="submit" emoji="🔐" label="Register" :disabled="loading" />
          </div>
        </div>
      </FormKit>
    </section>
  </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'

const user = useSupabaseUser()
const store = useAuthStore()
const router = useRouter()
const formData = ref({ email: '', password: '' })
const error = ref(null)
const loading = ref(false)

const login = async(data) => {
  const { email, password } = data

  try {
    loading.value = true
    await store.login({ email, password })

    navigateTo('/')
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
  <Head>
    <Title>Login</Title>
  </Head>

  <NuxtLayout name="centered-box">
    <section class="space-y-8">
      <div class="space-y-4">
        <img
          class="w-32 mx-auto rounded-full"
          src="~/assets/icons/favicon.png"
          alt="Appeel logo"
        >

        <h2 class="text-center">
          Login
        </h2>
      </div>

      <FormKit
        v-model="formData"
        type="form"
        :actions="false"
        @submit="(data) => {
          login(data)
        }"
      >
        <div class="flex flex-col gap-2">
          <p v-if="error" class="text-center text-red-500">
            {{ error }}
          </p>

          <Input
            label="Email"
            name="email"
            validation="required|*email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            suffix-icon="eyeClosed"
            validation="required|length:8,50"
            @suffix-icon-click="togglePassword"
          />

          <div class="mx-auto mt-8">
            <Button type="submit" emoji=" 🔐" label="Login" :disabled="loading" />
          </div>
        </div>
      </FormKit>
    </section>
  </NuxtLayout>
</template>

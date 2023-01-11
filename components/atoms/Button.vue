<script setup>
const props = defineProps({
  label: { type: String, required: true },
  emoji: { type: String },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  link: { type: Boolean, default: false },
  large: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
  url: { type: String, default: null },
  color: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'neutral', 'success', 'white', 'danger', 'dark'].includes(value)
    },
  },
})

const style = computed(() => {
  let style = 'max-w-max flex gap-1 items-center cursor-pointer group'
  style += props.link ? ' rounded-none border-b-2 bg-transparent pr-1 pl-0 py-1 ' : ' py-1 px-4 rounded-full hover:shadow-md '
  if (props.color === 'primary') style += props.link ? 'border-primary text-primary' : 'bg-primary text-white hover:bg-white hover:text-primary'
  else if (props.color === 'neutral') style += props.link ? 'border-gray text-gray' : 'bg-gray text-white hover:bg-white hover:text-gray'
  else if (props.color === 'success') style += props.link ? 'border-green-500 text-green-500' : 'bg-green-500 text-white hover:bg-white hover:text-green-500'
  else if (props.color === 'white') style += props.link ? 'border-white text-white' : 'bg-white text-gray hover:bg-gray hover:text-white'
  else if (props.color === 'danger') style += props.link ? 'border-red-500 text-red-500' : 'bg-red-500 text-white hover:bg-white hover:text-red-500'
  else style += props.link ? 'border-primary-dark text-primary-dark' : 'bg-primary-dark text-white hover:bg-white hover:text-primary-dark'
  if (props.disabled) style += ' opacity-40 pointer-events-none'
  if (props.loading) style += ' animate-pulse pointer-events-none'
  if (props.small) style += ' text-xs px-2'
  if (props.large) style += ' text-lg px-6 !py-2'
  return style
})

</script>

<template>
  <NuxtLink v-if="url" :to="url" :class="style">
    <div class="group-hover:scale-105 duration-200 ease-in-out">
      <slot />
    </div>
    <div :class="{'group-hover:font-bold': link}">
      <span v-if="emoji" class="mr-2">
        {{ emoji }}
      </span>
      <slot name="left" />
      <span>
        {{ label }}
      </span>
    </div>
  </NuxtLink>
  <button v-else :type="type" :class="style">
    <div class="group-hover:scale-105 duration-200 ease-in-out">
      <slot />
    </div>
    <div :class="{'group-hover:font-bold': link}" class="flex items-center">
      <!-- Eventually migrate over to #left -->
      <span v-if="emoji" class="mr-2">
        {{ emoji }}
      </span>

      <slot name="left" />
      <span>
        {{ label }}
      </span>
    </div>
  </button>
</template>

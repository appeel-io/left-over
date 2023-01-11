<script setup>
defineProps({
  label: { type: String, required: true },
  modelValue: { type: Boolean },
  disabled: { type: Boolean, default: false },
  help: { type: String, required: false },
  name: { type: String, required: true },
})
</script>

<template>
  <FormKit
    type="checkbox"
    :value="modelValue"
    :name="name"
    :help="help"
    :label="label"
    :disabled="disabled"
  />
</template>

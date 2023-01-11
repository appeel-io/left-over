<script setup>
import { getNode } from '@formkit/core'

const emit = defineEmits(['input'])
const props = defineProps({
  label: { type: String },
  help: { type: String, required: '' },
  placeholder: { type: String, required: false },
  type: { type: String, default: 'text' },
  name: { type: String, required: true },
  modelValue: { type: [String, Number, Boolean] },
  validation: { type: String },
  disabled: { type: Boolean, default: false },
  options: { type: Array, default: () => [] },
  validationRules: { type: Object },
  min: { type: Number, default: 0 },
  max: { type: Number },
  rows: { type: Number, default: 5 },
  multiple: { type: Boolean, default: false },
})

onMounted(() => {
  const node = getNode(props.name)
  if (node?.props?.validation?.includes('required'))
    node.props.label = `${node.props.label} *`
})

// options="options" breaks type checkbox
</script>

<!-- TODO: add locale system from Thintana -->
<!-- :validation-messages="{
  required: $t('validation.required',{ name: label }),
  length: $t('validation.length',{ name: label }),
  date_before: $t('validation.dateBefore'),
  date_after: $t('validation.dateAfter'),
  between: $t('validation.between',{ name: label }),
  min: $t('validation.min',{ name: label }),
  email: $t('validation.email'),
  validateTech: $t('validation.techExists'),
}" -->

<template>
  <FormKit
    :id="name"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :value="modelValue"
    :help="help"
    :label="label"
    :validation="validation"
    :rows="rows"
    :min="min"
    :max="max"
    :options="options"
    :multiple="multiple"
    :validation-rules="validationRules"
    :disabled="disabled"
    @input="$emit('input', {value: $event, name})"
  />
</template>

<style>
.formkit-suffix-icon svg {
  @apply w-6;
}
</style>

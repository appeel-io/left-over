<script setup>
import Close from '@/assets/icons/close.svg'

defineEmits(['close'])
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  containerClasses: {
    type: String,
    default: '',
  },
  contentClasses: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="relative z-50"
      aria-labelledby="modal-title"
      data-testid="modal"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray/75"
        @click="$emit('close')"
      />
      <div class="fixed inset-0 z-50 pointer-events-none">
        <div class="flex items-end justify-center text-center sm:min-h-full sm:p-4 sm:items-center">
          <div
            class="!w-screen relative overflow-scroll text-left bg-white shadow-xl pointer-events-auto h-screen sm:h-full sm:my-8 sm:max-w-2xl sm:w-full sm:rounded-lg sm:overflow-visible"
            :class="containerClasses"
          >
            <div class="sm:max-h-[800px] sm:overflow-y-auto">
              <div
                class="p-4"
                :class="contentClasses"
              >
                <div class="flex justify-between mb-5">
                  <div v-if="title" class="text-3xl font-bold text-primary">
                    {{ title }}
                  </div>
                  <slot v-else name="title" />
                  <Icon class="!pt-1" @click="$emit('close')">
                    <Close
                      class="w-7 h-7"
                    />
                  </Icon>
                </div>
                <slot name="container" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

import { generateClasses } from '@formkit/themes'

export default {
  config: {
    classes: generateClasses({
      'global': {
        outer: 'mb-3',
        help: 'text-xs text-gray',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs',
      },
      'family:text': {
        label: 'block font-bold text-sm mb-1 formkit-invalid:text-red-500',
        inner: 'flex max-w border border-gray rounded-lg overflow-hidden focus-within:border-primary formkit-invalid:border-red-500',
        input: 'w-full h-10 px-3 border-none rounded-lg text-base text-gray-dark placeholder-gray',
        suffixIcon: 'flex w-10 justify-center cursor-pointer',
      },
      'password': {
        label: 'block font-bold text-sm mb-1 formkit-invalid:text-red-500',
        inner: 'flex max-w border border-gray rounded-lg overflow-hidden focus-within:border-primary formkit-invalid:border-red-500',
        input: 'w-full h-10 px-3 border-none rounded-lg text-base text-gray-dark placeholder-gray',
        suffixIcon: 'flex w-10 justify-center cursor-pointer',
      },
      'number': {
        label: 'block font-bold text-sm mb-1 formkit-invalid:text-red-500',
        inner: 'max-w border border-gray rounded-lg overflow-hidden focus-within:border-primary formkit-invalid:border-red-500',
        input: 'w-full h-10 px-3 border-none rounded-lg text-base text-gray-dark placeholder-gray',
      },
      'textarea': {
        label: 'block font-bold text-sm mb-1 formkit-invalid:text-red-500',
        inner: 'max-w border border-gray rounded-lg overflow-hidden focus-within:border-primary formkit-invalid:border-red-500',
        input: 'w-full min-h-10 px-3 border-none rounded-lg text-base text-gray-dark placeholder-gray',
      },
      'select': {
        label: 'block font-bold text-sm mb-1 formkit-invalid:text-red-500',
        inner: 'max-w border border-gray rounded-lg overflow-hidden focus-within:border-primary formkit-invalid:border-red-500',
        input: 'w-full h-10 px-3 border-none rounded-lg text-base text-gray-dark placeholder-gray formkit-multiple:h-44',
      },
      'family:date': {
        label: 'block font-bold text-sm mb-1 formkit-invalid:text-red-500',
        inner: 'max-w border border-gray rounded-lg overflow-hidden focus-within:border-primary formkit-invalid:border-red-500',
        input: 'w-full h-10 px-3 border-none rounded-lg text-base text-gray-dark placeholder-gray',
      },
      'family:button': {
        outer: 'mb-0',
        input: 'bg-primary text-white text-lg py-2 px-6 shadow rounded shadow outline-none flex justify-center items-center gap-4 disabled:bg-gray',
      },
      'submit': {
        outer: 'mb-0',
        input: 'bg-primary text-white text-lg py-2 px-6 shadow rounded shadow outline-none flex justify-center items-center gap-4 disabled:bg-gray',
      },
      'checkbox': {
        input: 'w-5 h-5 disabled:pointer-events-none disabled:bg-slate-100',
        label: 'block text-lg mb-1',
        wrapper: 'flex flex-row gap-2 items-center',
      },
      'radio': {
        input: 'h-5 w-5 ml-1',
        label: 'hidden',
        options: 'flex flex-row',
      },
      'file': {
        label: 'block font-bold text-sm mb-1 formkit-invalid:text-red-500',
        input: 'bg-white w-full h-10 px-3 pt-1 border-none rounded-lg text-base text-gray-dark',
        inner: 'max-w border border-gray rounded-lg overflow-hidden focus-within:border-primary formkit-invalid:border-red-500',
        noFiles: 'hidden',
        fileItem: 'hidden',
      },
    }),
  },
}

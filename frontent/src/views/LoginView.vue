<script setup lang="ts">
import { reactive } from 'vue'
import { Form } from '@primevue/forms'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'

import { useToast } from 'primevue/usetoast'
import { useUserStore } from '@/stores/useUserStore'
import router from '@/router'

const toast = useToast()

const initialValues = reactive({
  username: '',
  password: '',
})

const resolver = ({ values }: { values: Record<string, string> }) => {
  const errors: Record<string, { message: string }[]> = {}

  if (!values.username) {
    errors.username = [{ message: 'Username is required.' }]
  }

  if (!values.password) {
    errors.password = [{ message: 'Password is required.' }]
  }

  return {
    values,
    errors,
  }
}

const onFormSubmit = ({ values, valid }: { values: Record<string, string>; valid: boolean }) => {
  if (valid) {
    const { login } = useUserStore()

    const loggedIn = login(values.username ?? '', values.password ?? '')

    if (loggedIn) {
      toast.add({
        severity: 'success',
        summary: 'Form is submitted.',
        life: 3000,
      })
      router.push('/')
    } else {
      toast.add({
        severity: 'error',
        summary: 'Form is not submitted.',
        life: 3000,
      })
    }
  }
}
</script>

<template>
  <div class="flex items-center flex-col mt-6 gap-8">
    <Form
      v-slot="$form"
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{
          $form.username.error?.message
        }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <InputText name="password" type="password" placeholder="Password" fluid />
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
          $form.password.error?.message
        }}</Message>
      </div>
      <Button type="submit" severity="secondary" label="Login" />
    </Form>
  </div>
</template>

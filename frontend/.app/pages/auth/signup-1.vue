<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created
const { authenticateUser, signUpUser } = useAuthStore() // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()) // make authenticated state reactive with storeToRefs

definePageMeta({
  layout: 'empty',
  title: 'Signup',
  preview: {
    title: 'Signup 1',
    description: 'For authentication and sign up',
    categories: ['layouts', 'authentication'],
    src: '/img/screens/auth-signup-1.png',
    srcDark: '/img/screens/auth-signup-1-dark.png',
    order: 100,
  },
})

const VALIDATION_TEXT = {
  EMAIL_REQUIRED: 'A valid email is required',
  USERNAME_LENGTH: 'Username must be at least 3 characters',
  NAME_LENGTH: 'Name must be at least 1 characters',
  PASSWORD_LENGTH: 'Password must be at least 4 characters',
  PASSWORD_CONTAINS_EMAIL: 'Password cannot contain your email',
  PASSWORD_MATCH: 'Passwords do not match',
}

// This is the Zod schema for the form input
// It's used to define the shape that the form data will have
const zodSchema = z
  .object({
    user_name: z.string().min(3, VALIDATION_TEXT.USERNAME_LENGTH),
    email: z.string().email(VALIDATION_TEXT.EMAIL_REQUIRED),
    password: z.string().min(4, VALIDATION_TEXT.PASSWORD_LENGTH),
    first_name: z.string().min(1, VALIDATION_TEXT.NAME_LENGTH),
    last_name: z.string().min(1, VALIDATION_TEXT.NAME_LENGTH),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    // This is a custom validation function that will be called
    // before the form is submitted
    if (data.password.includes(data.email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.PASSWORD_CONTAINS_EMAIL,
        path: ['password'],
      })
    }
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: VALIDATION_TEXT.PASSWORD_MATCH,
        path: ['confirmPassword'],
      })
    }
  })

// Zod has a great infer method that will
// infer the shape of the schema into a TypeScript type
type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues = computed<FormInput>(() => ({
  user_name: 'lindsay',
  email: 'lindsay@bittfurst.xyz',
  password: 'lindsaylindsay',
  confirmPassword: 'lindsaylindsay',
  first_name: 'Lindsay',
  last_name: 'Bittfurst',
}))

const { handleSubmit, isSubmitting, setFieldError } = useForm({
  validationSchema,
  initialValues,
})

const router = useRouter()
const toaster = useToaster()

const onSubmit = handleSubmit(async (values) => {
  await signUpUser(values)
  // redirect to homepage if user is authenticated
  if (authenticated) {
    toaster.clearAll()
    toaster.show({
      title: 'Success',
      message: `Welcome back!`,
      color: 'success',
      icon: 'ph:user-circle-fill',
      closable: true,
    })
    router.push('/')
  } else {
    toaster.clearAll()
    toaster.show({
      title: 'Error',
      message: `Failed!`,
      color: 'warning',
      icon: 'ph:user-circle-fill',
      closable: true,
    })
  }
})
</script>

<template>
  <div class="h-screen md:flex">
    <div
      class="from-primary-900 to-primary-500 i group relative hidden w-1/2 items-center justify-around overflow-hidden bg-gradient-to-tr md:flex"
    >
      <div class="mx-auto max-w-xs text-center">
        <BaseHeading as="h2" size="3xl" weight="medium" class="text-white">
          Have an Account?
        </BaseHeading>
        <BaseParagraph size="sm" class="text-muted-200 mb-3">
          No need to waste time on this page, let's take you back to your
          account
        </BaseParagraph>
        <BaseButton to="/auth/login-1" shape="curved" class="w-full"
          >Login to Account</BaseButton
        >
      </div>
      <div
        class="bg-muted-200/20 absolute -start-6 -top-6 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-72"
      ></div>
      <div
        class="bg-muted-200/20 absolute -top-12 start-20 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48"
      ></div>
      <div
        class="bg-muted-200/20 absolute -start-7 top-24 h-14 w-0 origin-top-left rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-40"
      ></div>

      <div
        class="bg-muted-200/20 absolute -bottom-6 -end-6 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-150 duration-300 group-hover:w-72"
      ></div>
      <div
        class="bg-muted-200/20 absolute -bottom-12 end-20 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-75 duration-300 group-hover:w-48"
      ></div>
      <div
        class="bg-muted-200/20 absolute -end-7 bottom-24 h-14 w-0 origin-bottom-right rotate-45 rounded-full transition-all delay-[25ms] duration-300 group-hover:w-40"
      ></div>
    </div>
    <div
      class="dark:bg-muted-900 flex flex-col items-center justify-between bg-white py-10 md:w-1/2"
    >
      <div class="mx-auto flex w-full max-w-xs items-center justify-between">
        <NuxtLink
          to="/dashboards"
          class="text-muted-400 hover:text-primary-500 dark:text-muted-700 dark:hover:text-primary-500 transition-colors duration-300"
        >
          <TairoLogo class="h-10 w-10" />
        </NuxtLink>
        <div>
          <BaseThemeToggle />
        </div>
      </div>
      <form
        method="POST"
        action=""
        @submit.prevent="onSubmit"
        class="mx-auto w-full max-w-xs"
        novalidate
      >
        <BaseHeading as="h2" size="3xl" weight="medium">
          Welcome to Tairo
        </BaseHeading>
        <BaseParagraph size="sm" class="text-muted-400 mb-6">
          Let's start by creating you account
        </BaseParagraph>

        <div class="mb-4 space-y-3">
          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="first_name"
          >
            <BaseInput
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              type="text"
              shape="curved"
              placeholder="First name"
              icon="ph:user-circle-duotone"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>

          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="last_name"
          >
            <BaseInput
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              type="text"
              shape="curved"
              placeholder="Last name"
              icon="ph:user-circle-duotone"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>

          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="user_name"
          >
            <BaseInput
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              type="text"
              shape="curved"
              placeholder="Username"
              icon="ph:fingerprint-duotone"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>
          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="email"
          >
            <BaseInput
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              type="email"
              shape="curved"
              placeholder="Email Address"
              icon="ph:at-duotone"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>
          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="password"
          >
            <BaseInput
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              type="password"
              shape="curved"
              placeholder="Password"
              icon="ph:lock-duotone"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>
          <Field
            v-slot="{ field, errorMessage, handleChange, handleBlur }"
            name="confirmPassword"
          >
            <BaseInput
              :model-value="field.value"
              :error="errorMessage"
              :disabled="isSubmitting"
              type="password"
              shape="curved"
              placeholder="Confirm password"
              icon="ph:check"
              @update:model-value="handleChange"
              @blur="handleBlur"
            />
          </Field>
        </div>
        <BaseButton
          :disabled="isSubmitting"
          :loading="isSubmitting"
          type="submit"
          shape="curved"
          color="primary"
          class="!h-11 w-full"
        >
          Create Account
        </BaseButton>
        <!--No account link-->
        <p
          class="text-muted-400 mt-4 flex justify-between font-sans text-sm leading-5"
        >
          <span>Have an account?</span>
          <NuxtLink
            to="/auth/login-1"
            class="text-primary-600 hover:text-primary-500 font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline focus:underline focus:outline-none"
          >
            Login here
          </NuxtLink>
        </p>
      </form>
      <div class="text-center">
        <BaseText size="sm" class="text-muted-400">
          © {{ new Date().getFullYear() }} Tairo. All rights reserved.
        </BaseText>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { storeToRefs } from 'pinia' // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/stores/auth' // import the auth store we just created
const { authenticateUser } = useAuthStore() // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()) // make authenticated state reactive with storeToRefs

definePageMeta({
  layout: 'empty',
  title: 'Login',
})

const VALIDATION_TEXT = {
  EMAIL_REQUIRED: 'A valid email is required',
  PASSWORD_REQUIRED: 'A password is required',
  USERNAME_REQUIRED: 'A username is required',
}

// This is the Zod schema for the form input
// It's used to define the shape that the form data will have
const zodSchema = z.object({
  email: z.string().email(VALIDATION_TEXT.EMAIL_REQUIRED),
  user_name: z.string().min(1, VALIDATION_TEXT.USERNAME_REQUIRED),
  password: z.string().min(1, VALIDATION_TEXT.PASSWORD_REQUIRED),
  trustDevice: z.boolean(),
})

// Zod has a great infer method that will
// infer the shape of the schema into a TypeScript type
type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues = computed<FormInput>(() => ({
  email: 'matt@bittfurst.xyz',
  user_name: 'matt',
  password: 'password',
  trustDevice: false,
}))

const {
  handleSubmit,
  isSubmitting,
  setFieldError,
  meta,
  values,
  errors,
  resetForm,
  setFieldValue,
  setErrors,
} = useForm({
  validationSchema,
  initialValues,
})

const router = useRouter()
const toaster = useToaster()

// This is where you would send the form data to the server
const onSubmit = handleSubmit(async (values) => {
  await authenticateUser(values)
  // redirect to homepage if user is authenticated
  if (authenticated.value === true) {
    toaster.clearAll()
    toaster.show({
      title: 'Successfully logged in!',
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
      message: `Unable to login. Please try again.`,
      color: 'warning',
      icon: 'ph:user-circle-fill',
      closable: true,
    })
  }
})
</script>

<template>
  <div class="dark:bg-muted-800 flex min-h-screen bg-white">
    <div
      class="bg-muted-100 dark:bg-muted-900 relative hidden w-0 flex-1 items-center justify-center lg:flex lg:w-3/5"
    >
      <div
        class="mx-auto w-full h-full flex items-center justify-center max-w-4xl"
      >
        <!--Media image-->
        <img
          class="max-w-xl mx-auto"
          src="/img/illustrations/station.svg"
          alt=""
          width="619"
          height="594"
        />
      </div>
    </div>
    <div
      class="relative flex flex-1 flex-col justify-center px-6 py-12 lg:w-2/5 lg:flex-none"
    >
      <div class="dark:bg-muted-800 relative mx-auto w-full max-w-sm bg-white">
        <!--Nav-->
        <div class="flex w-full items-center justify-between">
          <NuxtLink
            to="/"
            class="text-muted-400 hover:text-primary-500 flex items-center gap-2 font-sans font-medium transition-colors duration-300"
          >
            <Icon name="gg:arrow-long-left" class="h-5 w-5" />
            <span>Back to Home</span>
          </NuxtLink>
          <!--Theme button-->
          <BaseThemeToggle />
        </div>
        <div>
          <BaseHeading
            as="h2"
            size="3xl"
            lead="relaxed"
            weight="medium"
            class="mt-6"
          >
            Welcome back.
          </BaseHeading>
          <div v-if="false">
            <BaseParagraph size="sm" class="text-muted-400 mb-6">
              Login with social media or your credentials
            </BaseParagraph>
            <!-- 	Social Sign Up Buttons	 -->
            <div class="flex flex-wrap justify-between gap-4">
              <!--Google button-->
              <button
                class="dark:bg-muted-700 text-muted-800 border-muted-300 dark:border-muted-600 nui-focus relative inline-flex grow items-center justify-center gap-2 rounded-xl border bg-white px-6 py-4 dark:text-white"
              >
                <Icon name="logos:google-icon" class="h-5 w-5" />
                <div>Login with Google</div>
              </button>
              <!--Twitter button-->
              <button
                class="bg-muted-200 dark:bg-muted-700 hover:bg-muted-100 dark:hover:bg-muted-600 text-muted-600 dark:text-muted-400 nui-focus w-[calc(50%_-_0.5rem)] cursor-pointer rounded-xl px-5 py-4 text-center transition-colors duration-300 md:w-auto"
              >
                <Icon name="fa6-brands:twitter" class="mx-auto h-4 w-4" />
              </button>
              <!--Linkedin button-->
              <button
                class="bg-muted-200 dark:bg-muted-700 hover:bg-muted-100 dark:hover:bg-muted-600 text-muted-600 dark:text-muted-400 nui-focus w-[calc(50%_-_0.5rem)] cursor-pointer rounded-xl px-5 py-4 text-center transition-colors duration-300 md:w-auto"
              >
                <Icon name="fa6-brands:linkedin-in" class="mx-auto h-4 w-4" />
              </button>
            </div>
            <!-- 'or' divider		 -->
            <div class="flex-100 mt-8 flex items-center">
              <hr
                class="border-muted-200 dark:border-muted-700 flex-auto border-t-2"
              />
              <span class="text-muted-400 px-4 font-sans font-light"> OR </span>
              <hr
                class="border-muted-200 dark:border-muted-700 flex-auto border-t-2"
              />
            </div>
          </div>
        </div>
        <!--Form section-->
        <div class="mt-6">
          <div class="mt-5">
            <!--Form-->
            <form
              method="POST"
              action=""
              @submit.prevent="onSubmit"
              class="mt-6"
              novalidate
            >
              <div class="space-y-4">
                <Field
                  v-slot="{ field, errorMessage, handleChange, handleBlur }"
                  name="email"
                >
                  <BaseInput
                    :model-value="field.value"
                    :error="errorMessage"
                    :disabled="isSubmitting"
                    type="email"
                    label="Email address"
                    placeholder="Email address"
                    shape="curved"
                    :classes="{
                      input: 'h-12',
                    }"
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
                    label="Username"
                    placeholder="User Name"
                    shape="curved"
                    :classes="{
                      input: 'h-12',
                    }"
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
                    label="Password"
                    placeholder="Password"
                    shape="curved"
                    :classes="{
                      input: 'h-12',
                    }"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>
              </div>

              <!--Remember-->
              <div class="mt-6 flex items-center justify-between">
                <Field
                  v-slot="{ field, handleChange, handleBlur }"
                  name="trustDevice"
                >
                  <BaseCheckbox
                    :model-value="field.value"
                    :disabled="isSubmitting"
                    shape="curved"
                    label="Trust for 60 days"
                    color="primary"
                    @update:model-value="handleChange"
                    @blur="handleBlur"
                  />
                </Field>

                <div class="text-xs leading-5">
                  <NuxtLink
                    to="/auth/forgot-password"
                    class="text-primary-600 hover:text-primary-500 font-sans font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline"
                  >
                    Forgot your password?
                  </NuxtLink>
                </div>
              </div>

              <!--Submit-->
              <div class="mt-6">
                <div class="block w-full rounded-md shadow-sm">
                  <BaseButton
                    :disabled="isSubmitting"
                    :loading="isSubmitting"
                    type="submit"
                    color="primary"
                    shape="curved"
                    class="!h-11 w-full"
                  >
                    Sign in
                  </BaseButton>
                </div>
              </div>
            </form>

            <!--No account link-->
            <p
              class="text-muted-400 mt-4 flex justify-between font-sans text-xs leading-5"
            >
              <span>Don't have an account?</span>
              <NuxtLink
                to="/auth/signup-2"
                class="text-primary-600 hover:text-primary-500 font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline"
              >
                start your 14-day free trial
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <BaseButtonIcon
    shape="full"
    class="border-muted-200 hover:ring-muted-200 dark:hover:ring-muted-700 dark:border-muted-700 dark:bg-muted-800 dark:ring-offset-muted-900 flex h-9 w-9 items-center justify-center rounded-full border bg-white ring-1 ring-transparent transition-all duration-300 hover:ring-offset-4"
    to="/auth/logout"
  >
    <Icon
      name="ph:address-book-duotone"
      class="text-danger-400 h-5 w-5"
    />Logout
  </BaseButtonIcon>
</template>

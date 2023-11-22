<script lang="ts" setup>
import { inject } from 'vue'

const $unicornLog = inject('$unicornLog')

$unicornLog({
  text: 'This should only show up in debug mode',
  styles: 'color: DeepPink; font-size: 1.5rem;',
  type: 'debug',
})

$unicornLog({
  text: 'This is a fatal error.  Should see it every time',
  type: 'error',
})

const simpleExample = $unicornLog({
  text: 'Hello World',
  magical: true,
})
</script>

<template>
  <div>
    <div class="row mb-2">
      <div class="col-12">
        <h5 class="my-0"><code>magical</code></h5>
      </div>
    </div>

    <!-- ======================= Simple Example -->
    <div class="row mb-4" id="magical-simple-example">
      <div class="col-xl-4 col-6 d-flex align-items-center">
        <div class="form-check form-switch">
          <input
            v-model="magical"
            class="form-check-input"
            type="checkbox"
            role="switch"
            checked
          />
          <label class="form-check-label"
            >magical =
            <span class="boolean-style">{{ magical }}</span>
          </label>
        </div>
      </div>
      <div class="col-xl-4 col-6 d-flex align-items-center justify-content-end">
        <button
          @click="simpleExample"
          class="btn btn-outline-primary btn-sm"
          type="button"
        >
          Run
        </button>
      </div>
    </div>
  </div>
</template>

<template>
  <button
    class="toggle-button"
    @click="toggleTheme"
    :aria-label="label"
    :title="label"
  >
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clip-rule="evenodd"
      />
    </svg>

    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
      />
    </svg>
  </button>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

let savedTheme = undefined

try {
  savedTheme = localStorage.getItem('minze-color-scheme')
} catch (err) {}

const themeTransitionActive = ref(false)
const themeTransitionTimeout = ref(null)

const isDark = ref(savedTheme === 'dark')
const label = computed(() =>
  isDark.value ? 'Switch to light mode' : 'Switch to dark mode'
)

const toggleTheme = () => {
  try {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('minze-color-scheme', isDark.value ? 'dark' : 'light')
  } catch (err) {}
}

// run on color s change
watch(isDark, async function (value, oldValue) {
  if (value !== oldValue && oldValue !== undefined) {
    themeTransitionActive.value = true

    // clear timeout if present
    if (themeTransitionTimeout.value) clearTimeout(themeTransitionTimeout)

    // set timeout to help overwrite individual transition styles
    themeTransitionTimeout.value = setTimeout(() => {
      themeTransitionActive.value = false
      themeTransitionTimeout.value = null
    }, 0)
  }
})

watch(themeTransitionActive, function (value) {
  if (value) {
    document.documentElement.setAttribute('theme-transition', '')
  } else {
    document.documentElement.removeAttribute('theme-transition')
  }
})
</script>

<style scoped>
.toggle-button {
  display: flex;
  font-size: 1.1rem;
  background: 0 0;
  border: 0;
  outline: 0;
  color: var(--c-text);
  opacity: 35%;
  cursor: pointer;
  position: relative;
  padding-top: 4px;
  margin-left: 12px;
  /* margin-right: -12px; */
}

html.dark .toggle-button {
  opacity: 60%;
  padding-top: 6px;
}

.toggle-button:hover,
html.dark .toggle-button:hover {
  opacity: 100%;
}
</style>

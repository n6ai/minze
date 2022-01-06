<template>
  <layout>
    <template #navbar-search>
      <theme-toggle />

      <AlgoliaSearchBox
        v-if="theme.algolia"
        :options="theme.algolia"
        :multilang="isMultiLang"
      />
    </template>
  </layout>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

// components
import Layout from 'vitepress/dist/client/theme-default/Layout.vue'
import AlgoliaSearchBox from 'vitepress/dist/client/theme-default/components/AlgoliaSearchBox.vue'
import ThemeToggle from './components/ThemeToggle.vue'

const { site, theme } = useData()
const isMultiLang = computed(() => Object.keys(site.value.langs).length > 1)
</script>

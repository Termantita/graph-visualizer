<script setup lang="ts">
import { marked } from "marked";
import { WikiLinks } from "./services/markdown/extensions";

marked.use({extensions: [WikiLinks]});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

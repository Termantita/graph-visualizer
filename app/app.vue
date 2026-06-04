<script setup lang="ts">
import { marked } from "marked";
import { Tags, WikiLinks } from "./services/marked/extensions";

marked.use({extensions: [WikiLinks, Tags]});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

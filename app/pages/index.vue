<script setup lang="ts">
import { useVaultStore } from "~/stores/vault";
import { marked } from "marked";
import type { Note } from "~/types";

const markdownFiles = ref<Note[]>([])
const selectedFile = ref<Note>()

const vaultStore = useVaultStore();

const onChange = async (e: Event) => {
  const files = e.target?.files as File[];
  vaultStore.loadVaultFromFiles(files);
}

const selectFile = (e: PointerEvent) => {
  const btn = e.currentTarget as HTMLButtonElement;
  vaultStore;
  selectedFile.value = markdownFiles.value.find(file => file.name === btn.textContent);
}

const handleWikiLinks = (e: PointerEvent) => {
  const link = e.target as HTMLLinkElement;
  const target = link.dataset["target"];

  if (!target || target == undefined) return;

  const match = markdownFiles.value.find(file => link.dataset["target"] === file.name);

  if (match) selectedFile.value = match;
}
</script>

<template>
  <div class="flex w-full justify-between">
    <main>
      <input type="file" id="vaultInput" @change="onChange" webkitdirectory directory multiple />
      <ul>
        <li v-for="(path, idx) in markdownFiles" :key="idx"><button @click="selectFile"  class="bg-lime-500 p-2 m-1">{{ path.name }}</button></li>
      </ul>
    </main>
    <Graph />
    <aside class="flex-row-reverse h-full">
      <div class="m-3">
        Notas
        <article>
          <h1>{{ selectedFile?.name || "no content" }}</h1>
          <div v-html="selectedFile?.parsed" @click="handleWikiLinks" class="min-w-50 min-h-150 bg-gray-500 rounded-md"></div>
        </article>
      </div>
    </aside>
  </div>
</template>
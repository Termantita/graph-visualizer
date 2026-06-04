<script setup lang="ts">
import { useVaultStore } from "~/stores/vault";
import { marked } from "marked";

const vaultStore = useVaultStore();

const onChange = async (e: Event) => {
  const files = e.target?.files as File[];
  vaultStore.loadVaultFromFiles(files);
}

const selectFile = (e: PointerEvent) => {
  const btn = e.currentTarget as HTMLButtonElement;
  const btnText = btn.textContent;

  vaultStore.activeNoteName = vaultStore.notes[btnText]?.name ?? null;
}

const lazyParseContent = computed(() => {
  if (!vaultStore.activeNote) return;

  return marked.parse(vaultStore.activeNote.rawContent);
})

const handleWikiLinks = (e: PointerEvent) => {
  const link = e.target as HTMLLinkElement;
  const target = link.dataset["target"];

  if (!target || target == undefined) return;

  if (!vaultStore.notes) return;

  const match = vaultStore.activeNoteName = vaultStore.notes[target]?.name ?? null;

  if (match) vaultStore.activeNoteName = match;
}
</script>

<template>
  <div class="flex w-full justify-between">
    <main>
      <input type="file" id="vaultInput" @change="onChange" webkitdirectory directory multiple />
      <ul>
        <li v-for="(note, idx) in vaultStore.notes" :key="idx"><button @click="selectFile"  class="bg-lime-500 p-2 m-1">{{ note.name }}</button></li>
      </ul>
    </main>
    <Graph />
    <aside class="flex-row-reverse h-full">
      <div class="m-3">
        Notas
        <article>
          <h1>{{ vaultStore.activeNoteName || "N/A" }}</h1>
          <div v-html="lazyParseContent" @click="handleWikiLinks" class="min-w-50 min-h-150 bg-gray-500 rounded-md"></div>
        </article>
      </div>
    </aside>
  </div>
</template>
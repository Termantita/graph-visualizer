<script setup lang="ts">
import { useVaultStore } from "~/stores/vault";
import { marked } from "marked";
import { Tags, WikiLinks } from "~/services/marked/extensions";
import { db } from "~/services/database/db";

definePageMeta({
  middleware: (to, from) => {
    const vaultStore = useVaultStore();

    if (!vaultStore.ready && !db.notes) {
      return navigateTo('/');
    }
  }
})

const vaultStore = useVaultStore();
let showGraph = false;

const selectFile = (name: string) => {
  vaultStore.activeNoteName = name;
}

onMounted(() => {
  marked.use({extensions: [WikiLinks, Tags]});
})

const lazyParseContent = computed(() => {
  if (!vaultStore.activeNote) return;

  return marked.parse(vaultStore.activeNote.rawContent);
})

const handleWikiLinks = (e: PointerEvent) => {
  const link = e.target as HTMLLinkElement;
  const target = link.dataset["link-target"];

  if (!target || target == undefined) return;

  if (!vaultStore.notes) return;

  const match = vaultStore.activeNoteName = vaultStore.notes[target]?.name ?? null;

  if (match) vaultStore.activeNoteName = match;
}
</script>

<template>
  <div class="flex w-screen h-screen overflow-y-auto bg-zinc-700">
    <aside class="bg-neutral-600 w-64 flex flex-col-reverse overflow-y-auto h-full">
      <div class="bg-neutral-700 text-white p-5">
        <h1>Repositorio: {{ vaultStore.vaultName ?? "No name" }}</h1>
        <button @click="vaultStore.activeNoteName = ''">Mostrar grafo</button> // temporal btn
      </div>
      <section class="p-2 overflow-x-hidden">
        <ul>
          <li v-for="(note, idx) in vaultStore.notes" :key="idx">
            <button 
              @click="selectFile(note.name)"  
              :class="[
                'mt-1 p-2 rounded transition-colors w-full text-left duration-150 overflow-hidden text-sm',
                vaultStore.activeNoteName === note.name 
                  ? 'bg-zinc-800 text-white' 
                  : 'hover:bg-zinc-700 text-neutral-200 hover:text-white'
              ]"
            >
            {{ note.name }}
          </button>
        </li>
        </ul>
    </section>
  </aside>
  <Graph class="flex-shrink" :class="{'hidden': vaultStore.activeNote}"/>
    <main class="bg-zinc-700 flex-grow overflow-y-auto h-full min-w-xl p-6 text-neutral-100">
      <article class="max-w-3xl min-w-xl mx-auto">
        <h1 class="text-3xl font-bold mb-4 border-b border-zinc-600 pb-2 text-white">{{ vaultStore.activeNoteName || "No active note" }}</h1>
        <div v-html="lazyParseContent" @click="handleWikiLinks" class="rounded-md prose prose-invert max-w-none"></div>
      </article>
    </main>
  </div>
</template>
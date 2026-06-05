<script setup lang="ts">
import { getDirectory } from 'nuxt/kit';

    const vaultStore = useVaultStore();

    const onChange = async (e: Event) => {
        const files: File[] | null = e.target?.files;

        if (!files) return;

        await vaultStore.loadVaultFromFiles(files);

        navigateTo(`/${vaultStore.vaultName}`);
    }
</script>

<template>
    <div class="flex flex-col gap-3 items-center justify-center w-screen h-screen bg-zinc-700 text-white">
        <h1 class="text-2xl">Welcome to Graph Visualizer</h1>
        <input type="file" id="vaultInput" @change="onChange" webkitdirectory directory multiple class="text-sm text-white file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-zinc-500 file:text-white hover:file:bg-zinc-400 mb-2" />
    </div>
</template>
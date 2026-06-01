import { marked } from "marked";
import type { Note } from "~/types";

export const useVaultStore = defineStore("vault", () => { 
    const notes: Ref<Record<string, Note>> = ref({});
    const activeNoteName: Ref<string | null> = ref(null);

    const activeNote = computed(() => {
        if (!activeNoteName.value) return null;

        return notes.value[activeNoteName.value] || null;
    })
    
    const loadVaultFromFiles = async (fileList: File[]) => {
        notes.value = {};

        for (let file of fileList) {
            if (!file.name.endsWith(".md")) continue;

            const text = await file.text();

            notes.value.push(ref({
                id: file.name.replace(".md", ""),
                note: {
                    type: file.type,
                    content: text,
                    parsed: await marked.parse(text)
                } as Note
            }));
        };
    };

    return {
        notes,
        activeNoteName,
        activeNote,
        loadVaultFromFiles
    }
});

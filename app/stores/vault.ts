import { parseNote } from "~/services/parse-note";
import type { Note } from "~/types";

export const useVaultStore = defineStore("vault", () => { 
    const notes: Ref<Record<string, Note>> = ref({});
    const images: Ref<Record<string, string>> = ref({});
    const activeNoteName: Ref<string | null> = ref(null);

    const activeNote = computed(() => {
        if (!activeNoteName.value) return null;

        return notes.value[activeNoteName.value] || null;
    })
    
    const loadVaultFromFiles = async (fileList: File[]) => {
        // Reset states
        Object.values(images.value).forEach(URL.revokeObjectURL)
        images.value = {};
        notes.value = {};

        for (let file of fileList) {
            const [type, extension] = file.type.split("/");

            switch (type) {
                case "image":
                    images.value[file.name] = URL.createObjectURL(file);
                    break;
                case "text":
                    const content = await file.text();
                    let {outboundLinks, tags} = await parseNote(content);
                    const noteName = file.name.replace(".md", "");

                    notes.value[noteName] = {
                        name: noteName,
                        path: file.webkitRelativePath,
                        rawContent: content,
                        outboundLinks,
                        tags,
                    }

                    break;
                default:
                    continue;
            }
        };
    };

    return {
        notes,
        activeNoteName,
        activeNote,
        loadVaultFromFiles
    }
});

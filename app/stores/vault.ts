import { saveNotes, getAllNotes } from "~/services/database/db";
import { parseNote } from "~/services/parse-note";
import type { Note } from "~/types";

export const useVaultStore = defineStore("vault", () => { 
    const vaultName: Ref<string | null> = ref(null);
    const notes: Ref<Record<string, Note>> = ref({});
    const images: Ref<Record<string, string>> = ref({});
    const activeNoteName: Ref<string | null> = ref(null);
    const ready: Ref<boolean> = ref(false);

    const activeNote = computed(() => {
        if (!activeNoteName.value) return null;

        return notes.value[activeNoteName.value] || null;
    })

    const graphData = computed(() => {
        const nodes = Object.values(notes.value).map(note => ({
            id: note.name,
            name: note.name,
            tags: note.tags,
        }));

        const links = Object.values(notes.value).flatMap(note => 
            note.outboundLinks.map(link => ({
                source: note.name,
                target: link,
            }))
        );

        return { nodes, links };
    })

    const loadVaultFromDB = async () => {
        const allNotes = await getAllNotes();
        
        if (!allNotes || !allNotes.length) return;

        allNotes.forEach(note => {
            notes.value[note.name] = note;
        });

        vaultName.value = localStorage.getItem("vault-name");
        
        ready.value = true;
    }

    const loadVaultFromFiles = async (fileList: File[]) => {
        // Reset states
        Object.values(images.value).forEach(URL.revokeObjectURL)
        images.value = {};
        notes.value = {};

        for (let file of fileList) {
            const [type, extension] = file.type.split("/");
            
            vaultName.value = file.webkitRelativePath.split("/")[0] || null;
            console.log(file.webkitRelativePath);
            if (file.webkitRelativePath.split("/")[1]?.startsWith(".")) continue; // ignore ".<dirname>" directories
            switch (type) {
                case "image":
                    images.value[file.name] = URL.createObjectURL(file);
                    break;
                case "text":
                    if (extension !== "markdown") continue;

                    const content = await file.text();
                    let {outboundLinks, tags} = await parseNote(content);
                    const noteName = file.name.replace(".md", "");

                    notes.value[noteName] = {
                        name: noteName,
                        path: file.webkitRelativePath,
                        rawContent: content,
                        updatedAt: new Date(Date.now()),
                        outboundLinks,
                        tags,
                    }

                    break;
                default:
                    continue;
            }
        };

        const rawNotes = Object.values(notes.value).map(note => toRaw(note));

        saveNotes(rawNotes);
        localStorage.setItem("vault-name", vaultName.value ?? "");
        ready.value = true;
    };

    return {
        vaultName,
        notes,
        ready,
        activeNoteName,
        activeNote,
        graphData,
        loadVaultFromFiles,
        loadVaultFromDB
    }
});

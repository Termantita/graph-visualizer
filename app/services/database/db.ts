import { Dexie, type EntityTable} from "dexie";
import type { Note } from "~/types";

type Vault = {
    id: number
    name: string
}

export const db = new Dexie("localVault") as Dexie & {
    notes: EntityTable<Note, "id">
}

db.version(1).stores({
    notes: "++id, name, path, updatedAt, tags*"
})

// class LocalVault extends Dexie {
//     notes!: EntityTable<Note>
//     constructor() {
//         super("localVault");
//         this.version(1).stores({
//             notes: "name, path, updatedAt, tags*"
//         });
//     }
// }

// export const db = new LocalVault();

export const saveNote = (note: Note) => {
   db.notes.put(note); 
}

export const saveNotes = (data: Note[]) => {
    db.notes.bulkPut(data);
}

export const getNote = async (name: string) => {
    return await db.notes.get({name});
}

export const getAllNotes = async () => {
    return await db.notes.toArray();
}
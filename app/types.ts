import type { Token } from "marked"

export type Note = {
  name: string
  type: string
  content: string
  parsed: string
}

export type VaultStore = {
    notes: Ref<Record<string, string>>
    activeNoteName: Ref<string | null>;
}

export type WikiLinkToken = Token & {
    type: "wikiLink",
    raw: string,
    noteLink: string,
    text: string
}
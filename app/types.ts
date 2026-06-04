import type { Token } from "marked"

export type Note = {
  name: string
  path: string
  rawContent: string
  outboundLinks: string[]
  tags: string[]
}

export type VaultStore = {
    notes: Ref<Record<string, string>>
    activeNoteName: Ref<string | null>;
}

export type WikiLinkToken = Token & {
    type: "wikiLink",
    rawText: string,
    noteLink: string,
    text: string
}

export type TagToken = Token & {
    type: "tag",
    raw: string,
    tag: string
}
import type { Token } from "marked"

export type Note = {
  id?: number;
  name: string;
  path: string;
  rawContent: string;
  tags: string[];
  outboundLinks: string[];
  updatedAt: Date;
}

export type WikiLinkToken = Token & {
  type: "wikiLink";
  rawText: string;
  noteLink: string;
  text: string;
}

export type TagToken = Token & {
  type: "tag";
  raw: string;
  tag: string;
}
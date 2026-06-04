import { marked } from "marked"
import type { Note } from "~/types"

export const parseNote = async (rawContent: string) => {
    const linkRegex = /\[\[([^\]|#]+)/g;
    const tagsRegex = /(?<![\p{L}\p{N}_#\\])#(?![0-9]+\b)([\p{L}\p{N}/_-]+)/gu;

    const htmlContent = await marked.parse(rawContent);

    const extractedLinks = [...rawContent.matchAll(linkRegex)]
        .map(match => match[1]?.trim()) as string[];
    const extractedTags = [...rawContent.matchAll(tagsRegex)].map(match => match[1]?.trim()) as string[];

    return { htmlContent, outboundLinks: extractedLinks, tags: extractedTags};
}
import type { TokenizerAndRendererExtension, Token } from "marked";
import type { TagToken, WikiLinkToken } from "~/types";

export const WikiLinks: TokenizerAndRendererExtension = {
    name: "wikiLink",
    level: "inline",

    start(src: string) {
        return src.indexOf("[[");
    },

    tokenizer(src: string, tokens: Token[]) {
        const rule = /(?<!\\)\[\[([^\]|#]+)(?:\|([^\]]+))?\]\]/g;

        const match = rule.exec(src);

        if (!match) return undefined;
        
        const link = match[1]?.trim();
        const displayText = match[2] ? match[2] : link;

        return {
            type: "wikiLink",
            raw: match[0],
            link: link,
            text: displayText
        };
    },

    renderer(token: Token) {
        const wikiToken = token as WikiLinkToken;

        return `<a href="#" class="internal-link" data-target="${wikiToken.link}">${wikiToken.text}</a>`
    }
}

export const Tags: TokenizerAndRendererExtension = {
    name: "tag",
    level: "inline",

    start(src: string) {
        const rule = /(?<![\p{L}\p{N}_#\\])#(?![0-9]+\b)[\p{L}\p{N}/_-]+/u;

        const match = src.match(rule);

        return match && match.index !== undefined ? match.index : -1;
    },

    tokenizer(src: string, tokens: Token[]) {
        const rule = /^#(?![0-9]+\b)([\p{L}\p{N}/_-]+)/u;
        const match = rule.exec(src);

        if (!match) return undefined;

        return {
            type: "tag",
            raw: match[0],
            tag: match[1],
        }
    },

    renderer(token: Token) {
        const tagToken = token as TagToken;

        return `<span class="bg-purple-700 rounded-lg text-purple-500 p-5" data-target="${tagToken.tag}">${tagToken.raw}</span>`;
    }
}
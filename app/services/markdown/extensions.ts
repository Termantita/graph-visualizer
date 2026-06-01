import type { TokenizerAndRendererExtension, Token } from "marked";
import type { WikiLinkToken } from "~/types";

export const WikiLinks: TokenizerAndRendererExtension = {
    name: "wikiLink",
    level: "inline",

    start(src: string) {
        return src.indexOf("[[");
    },

    tokenizer(src: string, tokens: Token[]) {
        const rule = new RegExp("^\\[\\[([^\\]|#]+)(?:\\|([^\\]]+))?\\]\\]");

        const match = rule.exec(src);

        if (match) {
            const link = match[1]?.trim();
            const displayText = match[2] ? match[2] : link;

            return {
                type: "wikiLink",
                raw: match[0],
                noteLink: link,
                text: displayText
            };
        }
        return undefined;
    },

    renderer(token: Token) {
        const wikiToken = token as WikiLinkToken;

        return `<a href="#" class="internal-link" data-target="${wikiToken.noteLink}">${wikiToken.text}</a>`
    }
} 
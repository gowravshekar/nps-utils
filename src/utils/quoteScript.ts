// utils

export function quoteScript(script: string, escaped?: boolean): string {
    const quote = escaped ? '\\"' : '"';
    const shouldQuote = script.indexOf(" ") !== -1;

    return shouldQuote ? `${quote}${script}${quote}` : script;
}

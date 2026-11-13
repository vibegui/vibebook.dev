/** Transitional rich-body adapter, not a native content renderer. The host still owns these bodies.
 * Class names become explicit data roles so migrated chat never depends on legacy CSS selectors.
 * Percentage bars use the browser's progress geometry, without authored inline declarations.
 */
export function adaptLegacyChatMarkup(html: string): string {
  return html
    .replace(
      /<(span|i)\b([^>]*?)\sstyle="width:(\d+)%"([^>]*)><\/\1>/g,
      (_all, _tag: string, before: string, percent: string, after: string) =>
        `<progress max="100" value="${Math.min(100, Math.max(0, Number(percent)))}"${before}${after}></progress>`,
    )
    .replace(/\sstyle="[^"]*"/g, "")
    .replace(/\sclass="([^"]*)"/g, ' data-chat-rich="$1"');
}

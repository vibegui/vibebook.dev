// Only the controlled benchmark's heading/plain-paragraph fixture grammar.
// This is an expectation oracle, never an application Markdown renderer.
export function metricDocumentContent(source: string) {
  const titles: string[] = [];
  const sections: string[] = [];
  const paragraphs: string[] = [];
  for (const block of source.trim().split(/\n\s*\n/)) {
    if (block.startsWith("# ")) titles.push(block.slice(2));
    else if (block.startsWith("## ")) sections.push(block.slice(3));
    else if (block) paragraphs.push(block);
  }
  if (titles.length !== 1 || !sections.length || !paragraphs.length)
    throw Error("Benchmark document requires a title, sections and body");
  return { titles, sections, paragraphs };
}

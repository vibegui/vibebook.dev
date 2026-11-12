// What the vanilla app (public/app.html) hands to the Svelte pieces while both live side by side.
export type Wait = {
  book_id: string;
  room: string;
  ref: string; // m<msg> ask to you, t<task> your task in review, a/b<msg> your agent waiting on you
  thread: string;
  topic: string | null;
  author: string;
  author_name: string | null;
  text: string;
  ts: number;
};

export type Bridge = {
  t: (s: string, vars?: Record<string, string | number>) => string;
  icon: (name: string, size?: number) => string; // trusted SVG markup from the app's icon set
  avatar: (email: string) => string; // trusted avatar markup (escaped by the app)
  ago: (ts: number) => string;
};

import type { ImageSource } from 'expo-image';

/**
 * ---------------------------------------------------------------------------
 *  STORY TYPES
 * ---------------------------------------------------------------------------
 *  A `Story` bundles its own metadata (title, cover, synopsis, tags…) with a
 *  node graph. Nodes point at each other by `id`, so adding a quest is just:
 *
 *    1. create `src/data/stories/my-story.ts`
 *    2. export a `Story` from it
 *    3. add it to the `stories` array in `src/data/stories/index.ts`
 *
 *  Each node has:
 *    id       unique key that other nodes use in `next`
 *    chapter  small label shown in the header chip
 *    title    scene headline
 *    text     narrative body ("\n\n" starts a new paragraph)
 *    image    a URL string, an { uri } object, or require('@/assets/...')
 *    choices  the buttons at the bottom; each `next` points at another id
 *    ending   when set, the node is an ending (no choices, restart button)
 * ---------------------------------------------------------------------------
 */

/** Anything expo-image can render: a URL, an `{ uri }` object, or `require(...)`. */
export type StoryImage = string | ImageSource | number;

/** Tone of an ending — used to pick its badge color. */
export type EndingTone = 'triumph' | 'doom' | 'neutral';

export type StoryEnding = {
  /** Short tag, e.g. "Ending A". */
  label: string;
  /** Headline for the ending screen. */
  title: string;
  /** One-line summary shown under the headline. */
  summary: string;
  tone: EndingTone;
};

export type StoryChoice = {
  /** Text on the button. */
  label: string;
  /** Id of the node this choice leads to. */
  next: string;
  /** Optional one-liner shown under the label. */
  hint?: string;
};

export type StoryNode = {
  id: string;
  chapter: string;
  title: string;
  text: string;
  image?: StoryImage;
  choices?: StoryChoice[];
  ending?: StoryEnding;
};

/** A playable quest: menu metadata + the node graph the engine walks. */
export type Story = {
  /** Stable id used in navigation params. */
  id: string;
  title: string;
  author?: string;
  /** 1–2 sentence hook shown on the main menu card. */
  synopsis: string;
  /** Menu card artwork. */
  cover: StoryImage;
  /** Free-form tags, e.g. ['Dark fantasy', 'Short']. */
  genres: string[];
  /** Rough play time in minutes, shown on the menu card. */
  estimatedMinutes: number;
  /** Node id the quest begins on. */
  start: string;
  nodes: Record<string, StoryNode>;
};
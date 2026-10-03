import type { Story, StoryEnding } from './types';

/**
 * Placeholder artwork (600×400). Swap any story's `cover`/`image` for your own
 * URL, or drop files into `assets/images/` and use
 * `require('@/assets/images/your-scene.png')`.
 */
export function placeholderArt(label: string, palette?: { bg?: string; fg?: string }): string {
  const bg = palette?.bg ?? '12131a';
  const fg = palette?.fg ?? '6e8bff';
  return `https://placehold.co/600x400/${bg}/${fg}.png?text=${encodeURIComponent(label)}`;
}

/** Sequential label for a choice button: 0 → "A", 1 → "B", … */
export function choiceBadge(index: number): string {
  return String.fromCharCode(65 + (index % 26));
}

/** Every node that ends the story, in declaration order. */
export function storyEndings(story: Story): StoryEnding[] {
  return Object.values(story.nodes)
    .map((node) => node.ending)
    .filter((ending): ending is StoryEnding => Boolean(ending));
}

/**
 * Longest number of *choices* needed to reach any ending. Drives the progress
 * bar so it fills up exactly once by the time the player finishes the quest.
 */
export function storyDepth(story: Story): number {
  const memo = new Map<string, number>();

  const depth = (id: string, seen: Set<string>): number => {
    const cached = memo.get(id);
    if (cached !== undefined) return cached;
    if (seen.has(id)) return 0; // cycle guard — a loop is still 0 extra steps

    const node = story.nodes[id];
    if (!node?.choices?.length) return 0;

    const next = new Set(seen);
    next.add(id);
    const value = 1 + Math.max(...node.choices.map((choice) => depth(choice.next, next)));
    memo.set(id, value);
    return value;
  };

  return depth(story.start, new Set());
}

/**
 * Structural problems in a story graph — broken `next` targets, unreachable
 * start nodes, dead-end nodes that are neither a choice nor an ending.
 * Handy while writing: `console.log(validateStory(myStory))`.
 */
export function validateStory(story: Story): string[] {
  const problems: string[] = [];

  if (!story.nodes[story.start]) {
    problems.push(`[${story.id}] start node "${story.start}" does not exist.`);
  }

  for (const node of Object.values(story.nodes)) {
    if (!node.choices?.length && !node.ending) {
      problems.push(`[${story.id}] "${node.id}" has no choices and no ending.`);
    }
    for (const choice of node.choices ?? []) {
      if (!story.nodes[choice.next]) {
        problems.push(`[${story.id}] "${node.id}" points at "${choice.next}", which does not exist.`);
      }
    }
  }

  return problems;
}
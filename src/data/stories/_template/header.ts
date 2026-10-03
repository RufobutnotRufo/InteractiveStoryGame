import { placeholderArt } from '../helpers';
import type { StoryNode } from '../types';

/**
 * ---------------------------------------------------------------------------
 *  STORY TEMPLATE — part 1 of 2: the node graph ("header")
 * ---------------------------------------------------------------------------
 *  Shows how to split a quest across two modules when a story gets long.
 *  Copy the whole `_template/` folder to `my-story/` and edit:
 *
 *    header.ts  ← this file: the node graph, via `export const nodes`
 *    tail.ts    ← the menu metadata, which does `import { nodes } from './header'`
 *
 *  That export/import pair is what makes each file valid on its own. A fragment
 *  that merely *references* `nodes` without importing it can never compile.
 *
 *  Graph for this example:
 *
 *    opening ─┬─▶ left_turn ─┬─▶ ending_light  (Ending A)
 *             │              └─▶ ending_shade  (Ending B)
 *             └─▶ right_turn ┬─▶ ending_light
 *                            └─▶ ending_shade
 *
 *  Edit the text below freely — placeholder copy only.
 * ---------------------------------------------------------------------------
 */

/** Every node in this quest, keyed by id. */
export const nodes: Record<string, StoryNode> = {
  opening: {
    id: 'opening',
    chapter: 'Chapter 1',
    title: 'The Fork in the Road',
    text:
      'Chapter 1: You stand at a fork in the road, and both paths look like they have been waiting for you.\n\n' +
      'Replace this text with your own opening paragraph. Use "\\n\\n" to start a new paragraph.',
    image: placeholderArt('Opening Scene'),
    choices: [
      { label: 'Take the left path', next: 'left_turn', hint: 'Optional hint line.' },
      { label: 'Take the right path', next: 'right_turn' },
    ],
  },

  left_turn: {
    id: 'left_turn',
    chapter: 'Chapter 2',
    title: 'The Left Path',
    text: 'Describe what happens when the player chooses the left path.',
    image: placeholderArt('The Left Path'),
    choices: [
      { label: 'Continue onward', next: 'ending_light' },
      { label: 'Turn back', next: 'ending_shade' },
    ],
  },

  right_turn: {
    id: 'right_turn',
    chapter: 'Chapter 2',
    title: 'The Right Path',
    text: 'Describe what happens when the player chooses the right path.',
    image: placeholderArt('The Right Path'),
    choices: [
      { label: 'Continue onward', next: 'ending_light' },
      { label: 'Turn back', next: 'ending_shade' },
    ],
  },

  ending_light: {
    id: 'ending_light',
    chapter: 'Epilogue',
    title: 'Ending A — Into the Light',
    text:
      'Write the payoff for your good/hopeful ending here.\n\n' +
      'Endings must have an `ending` block and no `choices`.',
    image: placeholderArt('Ending A'),
    ending: {
      label: 'Ending A',
      title: 'Into the Light',
      summary: 'One-line summary of how this ending feels.',
      tone: 'triumph',
    },
  },

  ending_shade: {
    id: 'ending_shade',
    chapter: 'Epilogue',
    title: 'Ending B — Into the Shade',
    text: 'Write the payoff for your other ending here.',
    image: placeholderArt('Ending B'),
    ending: {
      label: 'Ending B',
      title: 'Into the Shade',
      summary: 'One-line summary of how this ending feels.',
      tone: 'neutral',
    },
  },
};
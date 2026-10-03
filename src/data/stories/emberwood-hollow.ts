import { placeholderArt } from './helpers';
import type { Story, StoryNode } from './types';

/**
 * ---------------------------------------------------------------------------
 *  QUEST 02 — "Emberwood Hollow"
 * ---------------------------------------------------------------------------
 *  A deliberately shorter graph that reuses both endings, to show that the
 *  engine, the menu and the settings are story-agnostic:
 *
 *    crossroads ─┬─▶ embers ─┬─▶ forest_floor ─┬─▶ ending_ember  (Ending A)
 *                │           │                 └─▶ ending_ash    (Ending B)
 *                │           └─▶ ridge ───────┬─▶ ending_ember
 *                │                            └─▶ ending_ash
 *                └─▶ haze ────┬─▶ bell ───────┬─▶ ending_ember
 *                             │               └─▶ ending_ash
 *                             └─▶ ending_ash
 *
 *  Placeholder copy only — swap in your own text.
 * ---------------------------------------------------------------------------
 */

const nodes: Record<string, StoryNode> = {
  crossroads: {
    id: 'crossroads',
    chapter: 'Chapter 1',
    title: 'Where the Road Ends',
    text:
      'The road ends at a ring of burnt trees. Nothing grows inside the ring, and the ash under your boots is warm.\n\n' +
      'To the left, embers still glow in a dead campfire. To the right, a grey haze drifts between the trunks.\n\n' +
      'Somewhere in the hollow, a bell is not ringing.',
    image: placeholderArt('Emberwood Hollow', { bg: '1a1208', fg: 'f0c674' }),
    choices: [
      { label: 'Step toward the embers', next: 'embers', hint: 'Still warm. Still awake.' },
      { label: 'Walk into the haze', next: 'haze', hint: 'The bell is that way. Maybe.' },
    ],
  },

  embers: {
    id: 'embers',
    chapter: 'Chapter 2',
    title: 'The Dead Campfire',
    text:
      'The embers brighten as you approach, which is not how embers work.\n\n' +
      'Beside the fire lies a knapsack with one strap cut. Above, the ridge line is bare against a sky the colour of old paper.',
    image: placeholderArt('The Dead Campfire', { bg: '1a1208', fg: 'f0c674' }),
    choices: [
      { label: 'Search the knapsack', next: 'forest_floor' },
      { label: 'Climb toward the ridge', next: 'ridge' },
    ],
  },

  haze: {
    id: 'haze',
    chapter: 'Chapter 2',
    title: 'The Grey Haze',
    text:
      'The haze tastes of cold metal. Shapes move inside it — slow, patient, uninterested in you so far.\n\n' +
      'A bell hangs from a branch at the end of the path, entirely still.',
    image: placeholderArt('The Grey Haze', { bg: '1a1208', fg: 'a8b0bd' }),
    choices: [
      { label: 'Reach for the bell', next: 'bell' },
      { label: 'Back away quietly', next: 'ending_ash' },
    ],
  },

  forest_floor: {
    id: 'forest_floor',
    chapter: 'Chapter 3',
    title: 'Beneath the Ashes',
    text:
      'The knapsack holds a single tin box, and the box holds a spoon of something that glows.\n\n' +
      'You cannot decide whether it is food or a promise. In Emberwood, those have always been the same thing.',
    image: placeholderArt('Beneath the Ashes', { bg: '1a1208', fg: 'f0c674' }),
    choices: [
      { label: 'Swallow it', next: 'ending_ember', hint: 'It tastes like summer.' },
      { label: 'Bury it again', next: 'ending_ash' },
    ],
  },

  ridge: {
    id: 'ridge',
    chapter: 'Chapter 3',
    title: 'The Bare Ridge',
    text:
      'From the ridge you can see the whole hollow: a perfect circle of ash, and at its centre a figure made of smoke, holding a lantern it does not need.\n\n' +
      'It lifts the lantern toward you. Politely. Insistently.',
    image: placeholderArt('The Bare Ridge', { bg: '1a1208', fg: 'f0c674' }),
    choices: [
      { label: 'Accept the lantern', next: 'ending_ember' },
      { label: 'Look away', next: 'ending_ash', hint: 'Some lights are questions.' },
    ],
  },

  bell: {
    id: 'bell',
    chapter: 'Chapter 3',
    title: 'The Still Bell',
    text:
      'The bell is warm, and it rings the moment you touch it — once, loud enough to shake ash out of the trees.\n\n' +
      'Every shape in the haze turns toward the sound at the same time.',
    image: placeholderArt('The Still Bell', { bg: '1a1208', fg: 'a8b0bd' }),
    choices: [
      { label: 'Ring it again', next: 'ending_ember', hint: 'Twice is a bargain.' },
      { label: 'Cover it with your hands', next: 'ending_ash' },
    ],
  },

  ending_ember: {
    id: 'ending_ember',
    chapter: 'Epilogue',
    title: 'The Lantern Keeper',
    text:
      'The hollow keeps you, or you keep the hollow — either way, the lantern is yours now, and the shapes in the haze have somewhere to go.\n\n' +
      'By morning, travellers will find a new light on the ridge and walk toward it without knowing why.\n\n' +
      'You have reached an ending.',
    image: placeholderArt('Ending A', { bg: '1a1208', fg: 'f0c674' }),
    ending: {
      label: 'Ending A',
      title: 'The Lantern Keeper',
      summary: 'You took the light, and the hollow made room for you.',
      tone: 'triumph',
    },
  },

  ending_ash: {
    id: 'ending_ash',
    chapter: 'Epilogue',
    title: 'One More Layer of Ash',
    text:
      'You leave the hollow exactly as you found it, which is the only thing it ever wanted.\n\n' +
      'Somewhere behind you the bell stays still, and the shapes go back to being nothing in particular.\n\n' +
      'You have reached an ending.',
    image: placeholderArt('Ending B', { bg: '1a1208', fg: 'a8b0bd' }),
    ending: {
      label: 'Ending B',
      title: 'One More Layer of Ash',
      summary: 'You refused the light, and the hollow forgot your name.',
      tone: 'neutral',
    },
  },
};

/** Menu metadata + the node graph the engine plays. */
export const emberwoodHollow: Story = {
  id: 'emberwood-hollow',
  title: 'Emberwood Hollow',
  author: 'Placeholder Author',
  synopsis:
    'A ring of burnt trees where the ash is still warm and a bell refuses to ring. Something in the haze has been waiting for a visitor with your patience.',
  cover: placeholderArt('Emberwood Hollow', { bg: '1a1208', fg: 'f0c674' }),
  genres: ['Horror', 'Exploration'],
  estimatedMinutes: 4,
  start: 'crossroads',
  nodes,
};
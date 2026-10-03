import { placeholderArt } from './helpers';
import type { Story, StoryNode } from './types';

/**
 * ---------------------------------------------------------------------------
 *  QUEST 01 — "The Dark Doorway"
 * ---------------------------------------------------------------------------
 *  The story is a simple graph. Every node points at other nodes by `id`:
 *
 *    intro ──┬─▶ great_hall ──┬─▶ cellar ──┬─▶ ending_crown    (Ending A)
 *            │                │            └─▶ ending_silence  (Ending B)
 *            │                └─▶ note ────┬─▶ cellar
 *            │                             └─▶ ending_silence
 *            └─▶ forest_path ─┬─▶ stream ──┬─▶ ending_crown
 *                             │            └─▶ ending_silence
 *                             └─▶ oak ─────┬─▶ ending_crown
 *                                          └─▶ ending_silence
 *
 *  Edit the text below freely — placeholder copy only.
 * ---------------------------------------------------------------------------
 */

/** Node graph for this quest. */
const nodes: Record<string, StoryNode> = {
  intro: {
    id: 'intro',
    chapter: 'Chapter 1',
    title: 'The Dark Doorway',
    text:
      'You stand before a dark doorway. Cold air slips through the gap, carrying the smell of wet stone and old smoke.\n\n' +
      'Somewhere far below, something is waiting — you can feel it the way you feel a held breath.\n\n' +
      'Two paths lie open to you.',
    image: placeholderArt('The Dark Doorway'),
    choices: [
      { label: 'Push the door open', next: 'great_hall', hint: 'Brave. Possibly foolish.' },
      { label: 'Turn back to the forest', next: 'forest_path', hint: 'The trees know your name.' },
    ],
  },

  great_hall: {
    id: 'great_hall',
    chapter: 'Chapter 2',
    title: 'The Candlelit Hall',
    text:
      'The door closes behind you on its own. Candles line the walls, though no one has lit them in years.\n\n' +
      'A folded note rests on the table. In the corner, a torch waits in its bracket.\n\n' +
      'The floorboards creak toward a stairwell that only goes down.',
    image: placeholderArt('The Candlelit Hall'),
    choices: [
      { label: 'Take the torch', next: 'cellar', hint: 'Light for whatever is below.' },
      { label: 'Read the note on the table', next: 'note', hint: 'Someone left it for you.' },
    ],
  },

  forest_path: {
    id: 'forest_path',
    chapter: 'Chapter 2',
    title: 'The Listening Forest',
    text:
      'You step back into the trees. The moonlight is thin here, and the forest has gone very quiet.\n\n' +
      'A stream glows faintly between the roots. Above you, an ancient oak holds a nest of pale sticks.\n\n' +
      'You have time for only one of them.',
    image: placeholderArt('The Listening Forest'),
    choices: [
      { label: 'Follow the glowing stream', next: 'stream' },
      { label: 'Climb the ancient oak', next: 'oak' },
    ],
  },

  note: {
    id: 'note',
    chapter: 'Chapter 3',
    title: 'The Folded Note',
    text:
      'The handwriting is yours.\n\n' +
      '"Whatever you hear below," it reads, "do not take the crown. The crown takes back."\n\n' +
      'Beneath the warning, someone has drawn a rough map of the cellar stairs.',
    image: placeholderArt('The Folded Note'),
    choices: [
      { label: 'Follow the map down', next: 'cellar', hint: 'The note warned you.' },
      {
        label: 'Burn the note in the candle',
        next: 'ending_silence',
        hint: 'Some warnings are too heavy to carry.',
      },
    ],
  },


  cellar: {
    id: 'cellar',
    chapter: 'Chapter 4',
    title: 'The Iron Chest',
    text:
      'The stairs end in a room of black water and white dust. At its center, an iron chest breathes a thin line of light.\n\n' +
      'Something in the dark shifts its weight and waits to see what you will do.',
    image: placeholderArt('The Iron Chest'),
    choices: [
      { label: 'Open the iron chest', next: 'ending_crown', hint: 'The light is warm. Almost kind.' },
      { label: 'Slip away into the dark', next: 'ending_silence', hint: 'Leave it sleeping.' },
    ],
  },

  stream: {
    id: 'stream',
    chapter: 'Chapter 3',
    title: 'The Glowing Stream',
    text:
      'The water runs bright as poured moonlight. When you cup it, it hums against your palms like a small animal.\n\n' +
      'Downstream, the stream disappears under a black stone arch.',
    image: placeholderArt('The Glowing Stream'),
    choices: [
      { label: 'Drink from the stream', next: 'ending_crown', hint: 'It smells of summer.' },
      { label: 'Follow it under the arch', next: 'ending_silence' },
    ],
  },

  oak: {
    id: 'oak',
    chapter: 'Chapter 3',
    title: 'The Ancient Oak',
    text:
      'The bark is warm, as if the tree has been standing in sunlight. Halfway up you find the nest — and inside it, a small iron crown.\n\n' +
      'Far below, the whole forest holds its breath.',
    image: placeholderArt('The Ancient Oak'),
    choices: [
      { label: 'Reach into the nest', next: 'ending_crown', hint: 'It is exactly your size.' },
      { label: 'Climb back down empty-handed', next: 'ending_silence' },
    ],
  },

  ending_crown: {
    id: 'ending_crown',
    chapter: 'Epilogue',
    title: 'The Crown of Dawn',
    text:
      'The moment the iron touches your brow, the dark decides to keep you.\n\n' +
      'Morning finds the doorway open and the forest full of light. Whatever waited below has a name now — and it is yours.\n\n' +
      'You have reached an ending.',
    image: placeholderArt('Ending A'),
    ending: {
      label: 'Ending A',
      title: 'The Crown of Dawn',
      summary: 'You claimed the crown, and the dark claimed you back.',
      tone: 'triumph',
    },
  },

  ending_silence: {
    id: 'ending_silence',
    chapter: 'Epilogue',
    title: 'The Long Silence',
    text:
      'You choose the dark, and the dark is happy to keep its secrets.\n\n' +
      'You walk out the way you came, with nothing in your hands and one less question in your heart.\n\n' +
      'Behind you the doorway closes gently, like a door in a house where you no longer live.',
    image: placeholderArt('Ending B'),
    ending: {
      label: 'Ending B',
      title: 'The Long Silence',
      summary: 'You walked away, and the doorway let you.',
      tone: 'neutral',
    },
  },
};

/** Menu metadata + the node graph the engine plays. */
export const theDarkDoorway: Story = {
  id: 'the-dark-doorway',
  title: 'The Dark Doorway',
  author: 'Placeholder Author',
  synopsis:
    'A doorway that should not be open, a candlelit hall, and something waiting at the bottom of the stairs. Every warning down here was written in your own handwriting.',
  cover: placeholderArt('The Dark Doorway', { bg: '0f1420', fg: '6e8bff' }),
  genres: ['Dark fantasy', 'Mystery'],
  estimatedMinutes: 6,
  start: 'intro',
  nodes,
};

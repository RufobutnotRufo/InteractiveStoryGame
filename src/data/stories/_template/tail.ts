import { nodes } from './header';

import { placeholderArt } from '../helpers';
import type { Story } from '../types';

/**
 * ---------------------------------------------------------------------------
 *  STORY TEMPLATE — part 2 of 2: menu metadata ("tail")
 * ---------------------------------------------------------------------------
 *  The "tail" half of a split story. It pulls the node graph in from `./header`
 *  (that import is what the original fragment was missing) and attaches the
 *  metadata the main menu card renders.
 *
 *  Not registered in `./index.ts`, so the template never shows up on the menu.
 * ---------------------------------------------------------------------------
 */

/** Menu metadata + the node graph the engine plays. */
export const templateStory: Story = {
  id: 'template',
  title: 'Story Template',
  author: 'Your Name',
  synopsis:
    'A short hook for the main menu card. One or two sentences is plenty — this is the text players read before they decide to start.',
  cover: placeholderArt('Story Template'),
  genres: ['Genre', 'Tags'],
  estimatedMinutes: 5,
  start: 'opening',
  nodes,
};
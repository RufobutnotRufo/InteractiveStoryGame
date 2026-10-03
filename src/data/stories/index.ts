import { emberwoodHollow } from './emberwood-hollow';
import { theDarkDoorway } from './the-dark-doorway';
import type { Story } from './types';

/**
 * Every playable quest, in main-menu order.
 * To add a story: create `./my-story.ts` exporting a `Story`, then add it below.
 */
export const stories: Story[] = [theDarkDoorway, emberwoodHollow];

/** Shown when a route gets an unknown or missing story id. */
export const defaultStory: Story = stories[0];

/** Look a story up by id, falling back to the first story. */
export function getStory(id?: string | string[] | null): Story {
  const wanted = Array.isArray(id) ? id[0] : id;
  return stories.find((story) => story.id === wanted) ?? defaultStory;
}

export { choiceBadge, placeholderArt, storyDepth, storyEndings, validateStory } from './helpers';
export type { EndingTone, Story, StoryChoice, StoryEnding, StoryImage, StoryNode } from './types';
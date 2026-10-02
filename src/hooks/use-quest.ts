import { useCallback, useMemo, useState } from 'react';

import { START_NODE_ID, STORY_DEPTH, storyData, type StoryNode } from '@/data/story';

export type QuestEngine = {
  /** The scene currently on screen. */
  node: StoryNode;
  /** How many choices the player has made so far. */
  steps: number;
  /** 0 → 1, used for the progress bar. */
  progress: number;
  /** True when the current node is an ending. */
  isEnding: boolean;
  /** Ids of every node visited so far, in order. */
  trail: string[];
  /** Advance the story. Unknown ids are ignored instead of crashing. */
  choose: (nextNodeId: string) => void;
  /** Jump back to the first node and reset all counters. */
  restart: () => void;
};

/**
 * The narrative engine. It owns the current node and moves the player through
 * `storyData` whenever a choice is made.
 */
export function useQuest(startNodeId: string = START_NODE_ID): QuestEngine {
  const [currentId, setCurrentId] = useState(startNodeId);
  const [steps, setSteps] = useState(0);
  const [trail, setTrail] = useState<string[]>([startNodeId]);

  const node = storyData[currentId] ?? storyData[START_NODE_ID];

  const choose = useCallback((nextNodeId: string) => {
    const next = storyData[nextNodeId];
    // Ignore typos in the story data rather than throwing on screen.
    if (!next) return;

    setCurrentId(next.id);
    setSteps((value) => value + 1);
    setTrail((visited) => [...visited, next.id]);
  }, []);

  const restart = useCallback(() => {
    setCurrentId(startNodeId);
    setSteps(0);
    setTrail([startNodeId]);
  }, [startNodeId]);

  const progress = useMemo(() => Math.min(steps / STORY_DEPTH, 1), [steps]);

  return { node, steps, progress, isEnding: Boolean(node.ending), trail, choose, restart };
}

import { useCallback, useMemo, useState } from 'react';

import { storyDepth, type Story, type StoryNode } from '@/data/stories';

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
  /** Choices needed to reach the deepest ending in this story. */
  maxSteps: number;
  /** Advance the story. Unknown ids are ignored instead of crashing. */
  choose: (nextNodeId: string) => void;
  /** Jump back to the first node and reset all counters. */
  restart: () => void;
};

/**
 * The narrative engine. It is story-agnostic: hand it any `Story` and it walks
 * that story's node graph, so the main menu can launch a different quest without
 * changing anything here.
 */
export function useQuest(story: Story): QuestEngine {
  const [currentId, setCurrentId] = useState(story.start);
  const [steps, setSteps] = useState(0);
  const [trail, setTrail] = useState<string[]>([story.start]);

  /**
   * If a different story is handed to this hook, reset the run during render —
   * React's documented alternative to a `useEffect` that calls `setState`
   * (see https://react.dev/reference/react/useState#storing-information-from-previous-renders).
   */
  const [activeId, setActiveId] = useState(story.id);
  if (activeId !== story.id) {
    setActiveId(story.id);
    setCurrentId(story.start);
    setSteps(0);
    setTrail([story.start]);
  }

  const node = story.nodes[currentId] ?? story.nodes[story.start];
  const maxSteps = useMemo(() => storyDepth(story), [story]);

  const choose = useCallback(
    (nextNodeId: string) => {
      const next = story.nodes[nextNodeId];
      // Ignore typos in the story data rather than throwing on screen.
      if (!next) return;

      setCurrentId(next.id);
      setSteps((value) => value + 1);
      setTrail((visited) => [...visited, next.id]);
    },
    [story],
  );

  const restart = useCallback(() => {
    setCurrentId(story.start);
    setSteps(0);
    setTrail([story.start]);
  }, [story.start]);

  const progress = useMemo(
    () => Math.min(steps / Math.max(maxSteps, 1), 1),
    [steps, maxSteps],
  );

  return {
    node,
    steps,
    progress,
    isEnding: Boolean(node.ending),
    trail,
    maxSteps,
    choose,
    restart,
  };
}
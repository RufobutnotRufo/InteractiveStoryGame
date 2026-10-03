import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { ImageCard } from '@/components/ui/image-card';
import { TagChip } from '@/components/ui/tag-chip';
import { Spacing } from '@/constants/theme';
import { storyEndings, type Story } from '@/data/stories';
import { useTheme } from '@/hooks/use-theme';

type StoryCardProps = {
  story: Story;
  onStart: (story: Story) => void;
};

/** One quest entry on the main menu: cover, metadata, synopsis and CTA. */
export function StoryCard({ story, onStart }: StoryCardProps) {
  const theme = useTheme();
  const endingCount = storyEndings(story).length;
  const minutes = `~${story.estimatedMinutes} min`;

  return (
    <View
      style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
      <ImageCard source={story.cover} ratio={16 / 9} placeholderLabel="Cover art" />

      <View style={styles.body}>
        <View style={styles.headline}>
          <ThemedText style={styles.title}>{story.title}</ThemedText>
          {story.author ? (
            <ThemedText type="small" themeColor="textSecondary">
              by {story.author}
            </ThemedText>
          ) : null}
        </View>

        <View style={styles.tags}>
          {story.genres.map((genre) => (
            <TagChip key={genre} label={genre} />
          ))}
          <TagChip
            label={minutes}
            icon={{ ios: 'clock', android: 'schedule', web: 'schedule' }}
          />
          {endingCount > 0 ? (
            <TagChip
              label={`${endingCount} endings`}
              icon={{ ios: 'flag', android: 'flag', web: 'flag' }}
            />
          ) : null}
        </View>

        <ThemedText type="small" themeColor="textSecondary" style={styles.synopsis}>
          {story.synopsis}
        </ThemedText>

        <Button
          label="Start story"
          variant="primary"
          icon={{ ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' }}
          onPress={() => onStart(story)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  body: {
    gap: Spacing.two,
  },
  headline: {
    gap: Spacing.half,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  synopsis: {
    lineHeight: 20,
  },
});
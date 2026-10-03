# Welcome to your Expo app 👋

An interactive, text-based quest game for Android (and iOS/web) built with Expo
Router. Dark, immersive UI, branching stories with multiple endings, a story
selection menu and a persisted audio-settings screen.

## Architecture

```
src/
├─ app/                     # Expo Router screens
│  ├─ _layout.tsx           # Stack + providers (animated transitions)
│  ├─ index.tsx             # Main menu — story selection
│  ├─ play.tsx              # Story screen (?storyId=…)
│  └─ settings.tsx          # Settings (modal presentation)
├─ data/stories/            # the story dataset
│  ├─ types.ts              # Story / StoryNode / StoryChoice / StoryEnding
│  ├─ helpers.ts            # placeholderArt, storyDepth, storyEndings, validateStory
│  ├─ the-dark-doorway.ts   # quest #1
│  ├─ emberwood-hollow.ts   # quest #2
│  └─ index.ts              # `stories`, `getStory(id)`
├─ hooks/use-quest.ts       # story-agnostic narrative engine
├─ context/settings-context.tsx
├─ storage/settings.ts      # AsyncStorage persistence
├─ lib/audio.ts             # playBGM() / playSFX() placeholders
└─ components/{ui,menu,settings,quest}/
```

- **Main menu** (`app/index.tsx`) lists every entry in `stories` as a card with
  cover art, synopsis, genre tags and estimated play time, and launches the
  chosen quest with `router.push({ pathname: '/play', params: { storyId } })`.
- **Story screen** (`app/play.tsx`) feeds that story into `useQuest()`. Its header
  has *back to main menu*, *settings* and *pause* controls; the pause menu can
  resume, open settings, or exit to the menu.
- **Settings** (`app/settings.tsx`) opens as a modal from both the menu and the
  pause menu. BGM/SFX toggles and volume sliders persist via AsyncStorage.

## Adding a story

1. Copy the `src/data/stories/_template/` folder → `src/data/stories/my-story/`
   and edit it. It is a complete, valid story split across two modules
   (`header.ts` exports the node graph, `tail.ts` imports it and adds the menu
   metadata) and it is deliberately not registered, so it never appears on the
   menu. Prefer one file per story? Use `emberwood-hollow.ts` as the shape instead.
2. Add it to the `stories` array in `src/data/stories/index.ts`. It appears on
   the menu automatically.
3. Run `validateStory(myStory)` while writing to catch broken `next` targets.

Nodes use `chapter`, `title`, `text`, `image`, and either `choices` (each with a
`next` node id) or an `ending` block. Images accept a URL string, an `{ uri }`
object, or a local `require('@/assets/images/your-scene.png')`; the dummy text
uses `placehold.co` placeholder art.

## Audio

`src/lib/audio.ts` is a **placeholder** layer: `playBGM()`, `stopBGM()` and
`playSFX()` log instead of playing. It is already wired to the menu, the pause
button, choice taps, scene transitions and the settings previews, so connecting
real assets later is a one-file change (`npx expo install expo-audio`).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

   Then press `a` to open Android (emulator or connected device), or run
   `npx expo start --android` directly.

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

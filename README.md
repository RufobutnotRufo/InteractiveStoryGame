# Welcome to your Expo app 👋

An interactive, text-based quest game for Android (and iOS/web) built with Expo
Router. Dark, immersive UI: a scene image card, a scrolling narrative block, two
styled choice buttons, branching story paths and two distinct endings.

## Story & narration

Everything narrative lives in **`src/data/story.ts`** — this is the file to edit:

- `storyData` is a plain object keyed by node id. Each node has `chapter`,
  `title`, `text`, `image`, and either `choices` (each with a `next` node id) or
  an `ending` block.
- `START_NODE_ID` sets the first scene; `STORY_DEPTH` is the longest path and
  feeds the header progress bar.
- Images accept a URL string, an `{ uri }` object, or a local
  `require('@/assets/images/your-scene.png')`. The dummy text uses
  `placehold.co` placeholder art.
- `validateStory()` returns a list of broken links/dead ends — handy while you
  write (e.g. `console.log(validateStory())`).

The engine is `src/hooks/use-quest.ts` (`choose` / `restart` / progress) and the
UI pieces live in `src/components/quest/`. To support light mode, see the note in
`src/hooks/use-color-scheme.ts`.

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

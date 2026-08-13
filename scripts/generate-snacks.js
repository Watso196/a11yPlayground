#!/usr/bin/env node
// Publishes each screen in ./generate-snacks/screens.js as a standalone,
// anonymous Expo Snack, then rewrites the README's generated links table.
const fs = require('fs');
const path = require('path');
const {Snack, getSupportedSDKVersions} = require('snack-sdk');
const {SCREENS, EXCLUDED} = require('./generate-snacks/screens');

const ROOT = path.resolve(__dirname, '..');
const README_PATH = path.join(ROOT, 'README.md');
const START_MARKER = '<!-- SNACK-LINKS:START -->';
const END_MARKER = '<!-- SNACK-LINKS:END -->';

function latestSupportedSDKVersion() {
  return getSupportedSDKVersions()
    .map(version => ({version, major: parseInt(version.split('.')[0], 10)}))
    .sort((a, b) => a.major - b.major)
    .pop().version;
}

function componentNameFor(screenFile) {
  return path.basename(screenFile, path.extname(screenFile));
}

// Fails the run if a screen under screens/ isn't in SCREENS or EXCLUDED, so
// new screens can't be silently forgotten from the Snack links table.
function assertAllScreensAreCategorized() {
  const actualFiles = fs
    .readdirSync(path.join(ROOT, 'screens'))
    .filter(file => file.endsWith('.tsx'));
  const categorizedFiles = new Set([
    ...SCREENS.map(s => s.file),
    ...EXCLUDED.map(s => s.file),
  ]);
  const uncategorized = actualFiles.filter(file => !categorizedFiles.has(file));
  if (uncategorized.length > 0) {
    throw new Error(
      `screens/${uncategorized.join(', screens/')} ${
        uncategorized.length === 1 ? 'is' : 'are'
      } not listed in SCREENS or EXCLUDED in scripts/generate-snacks/screens.js. ` +
        'Add each new screen to one of those lists before generating Snacks.',
    );
  }
}

function buildAppSource(screen) {
  const componentName = componentNameFor(screen.file);
  if (screen.wrapWithGestureHandlerRoot) {
    return `import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Screen from './screens/${componentName}';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Screen />
    </GestureHandlerRootView>
  );
}
`;
  }
  return `import React from 'react';
import Screen from './screens/${componentName}';

export default function App() {
  return <Screen />;
}
`;
}

async function generateSnackForScreen(screen, sdkVersion) {
  const screenSource = fs.readFileSync(
    path.join(ROOT, 'screens', screen.file),
    'utf8',
  );
  const stylesSource = fs.readFileSync(
    path.join(ROOT, 'styles', 'commonStyles.ts'),
    'utf8',
  );
  const componentName = componentNameFor(screen.file);

  const snack = new Snack({
    name: `a11yPlayground - ${screen.title}`,
    description: `Standalone Expo Snack for the "${screen.title}" accessibility test case from a11yPlayground.`,
    sdkVersion,
    dependencies: screen.dependencies ?? {},
    files: {
      'App.tsx': {type: 'CODE', contents: buildAppSource(screen)},
      [`screens/${componentName}.tsx`]: {
        type: 'CODE',
        contents: screenSource,
      },
      'styles/commonStyles.ts': {type: 'CODE', contents: stylesSource},
    },
  });

  // Wait for dependencies to resolve so the saved Snack isn't missing versions.
  await snack.getStateAsync();
  const {id} = await snack.saveAsync();
  // snack.saveAsync()'s own `url` is an exp:// deep link; snack.expo.dev/<id>
  // is the shareable web page (shows the QR code to scan with Expo Go).
  return {title: screen.title, url: `https://snack.expo.dev/${id}`};
}

function updateReadme(results) {
  const readme = fs.readFileSync(README_PATH, 'utf8');
  const startIdx = readme.indexOf(START_MARKER);
  const endIdx = readme.indexOf(END_MARKER);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(
      `Could not find ${START_MARKER}/${END_MARKER} markers in README.md`,
    );
  }

  const generatedAt = new Date().toISOString();
  const rows = results
    .map(r => `| ${r.title} | [Open in Expo Snack](${r.url}) |`)
    .join('\n');
  const excludedRows = EXCLUDED.map(s => `| ${s.title} | ${s.reason} |`).join(
    '\n',
  );
  const table = `${START_MARKER}\n_Last generated: ${generatedAt}_\n\n| Screen | Snack |\n| --- | --- |\n${rows}\n\n**Not available as a Snack:**\n\n| Screen | Why |\n| --- | --- |\n${excludedRows}\n${END_MARKER}`;

  const updated =
    readme.slice(0, startIdx) + table + readme.slice(endIdx + END_MARKER.length);
  fs.writeFileSync(README_PATH, updated);
}

async function main() {
  assertAllScreensAreCategorized();

  const sdkVersion = latestSupportedSDKVersion();
  console.log(`Using Expo SDK ${sdkVersion} for generated Snacks.`);

  const results = [];
  let hadFailure = false;
  for (const screen of SCREENS) {
    process.stdout.write(`Publishing Snack for "${screen.title}"... `);
    try {
      const result = await generateSnackForScreen(screen, sdkVersion);
      console.log(result.url);
      results.push(result);
    } catch (error) {
      hadFailure = true;
      console.log('FAILED');
      console.error(error);
    }
  }

  if (results.length > 0) {
    updateReadme(results);
    console.log('README.md updated.');
  }

  if (hadFailure) {
    process.exitCode = 1;
  }
}

main();

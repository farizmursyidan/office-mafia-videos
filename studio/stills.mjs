import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
const [comp, outDir, ...frames] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
import fs from 'fs';
const shell = fs.readdirSync('/opt/pw-browsers').filter((d) => d.startsWith('chromium_headless_shell-')).sort().pop();
const browserExecutable =
  process.env.CHROME ||
  ['chrome-linux/headless_shell', 'chrome-headless-shell-linux64/chrome-headless-shell'].map((p) => `/opt/pw-browsers/${shell}/${p}`).find((p) => fs.existsSync(p));
const composition = await selectComposition({serveUrl, id: comp, browserExecutable});
for (const fr of frames) {
  await renderStill({composition, serveUrl, output: `${outDir}/f${fr}.png`, frame: Number(fr), browserExecutable});
}
console.log('done');

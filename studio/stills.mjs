import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'path';
const [comp, outDir, ...frames] = process.argv.slice(2);
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const browserExecutable = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const composition = await selectComposition({serveUrl, id: comp, browserExecutable});
for (const fr of frames) {
  await renderStill({composition, serveUrl, output: `${outDir}/f${fr}.png`, frame: Number(fr), browserExecutable});
}
console.log('done');

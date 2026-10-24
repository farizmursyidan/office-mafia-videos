import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

export const FPS = 30;
export const s = (sec: number) => Math.round(sec * FPS);

export const C = {
  paper: '#EDE8E0',
  paperDeep: '#E2DBD0',
  ink: '#141414',
  night: '#111111',
  nightSoft: '#1C1C1C',
  amber: '#E0A93B',
  red: '#C8413A',
  green: '#2E9E5B',
  muted: '#8A8379',
  white: '#FFFFFF',
};

export const SANS = 'Inter, sans-serif';
export const SERIF = '"Instrument Serif", serif';

const weights = ['400', '600', '700', '800', '900'];
export const fontsReady = Promise.all([
  ...weights.map((w) =>
    loadFont({family: 'Inter', url: staticFile(`fonts/inter-latin-${w}-normal.woff2`), weight: w}),
  ),
  loadFont({family: 'Instrument Serif', url: staticFile('fonts/instrument-serif-latin-400-normal.woff2'), weight: '400'}),
  loadFont({
    family: 'Instrument Serif',
    url: staticFile('fonts/instrument-serif-latin-400-italic.woff2'),
    weight: '400',
    style: 'italic',
  }),
]);

import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, Bub, CL, Caps, INOUT, Label, Mark, Paper, Push, card, ez, useT} from './kit';

/* 4. Move 2: the problem arrives with two option cards. A: cut the reporting page. B: move launch to the 20th. The boss picks B. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const Opt: React.FC<{l: string; title: string; sub: string; p: number; top: number; pick: number}> = ({l, title, sub, p, top, pick}) => (
  <div
    style={{
      ...card,
      top,
      height: 200,
      padding: '0 40px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      gap: 30,
      opacity: p,
      translate: `${(1 - p) * 80}px 0px`,
      border: `5px solid ${pick > 0 ? `rgba(46,158,91,${pick})` : 'transparent'}`,
    }}
  >
    <div style={{width: 96, height: 96, borderRadius: 24, background: pick > 0.5 ? C.green : C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{l}</div>
    <div>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 44, color: C.ink, whiteSpace: 'nowrap'}}>{title}</div>
      <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 30, color: C.muted, marginTop: 6, whiteSpace: 'nowrap'}}>{sub}</div>
    </div>
  </div>
);
export const Move2: React.FC = () => {
  const {t} = useT();
  const prob = ez(t, 0.3, 0.5);
  const a = ez(t, 1.9, 0.5);
  const b = ez(t, 2.4, 0.5);
  const pick = interpolate(t, [7.3, 7.7], [0, 1], {...CL, easing: INOUT});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Bring two options" />
        {/* the problem */}
        <div style={{...card, top: 440, height: 170, padding: '0 40px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 26, background: '#FBEDEC', opacity: prob, translate: `0px ${(1 - prob) * 40}px`}}>
          <div style={{width: 76, height: 76, borderRadius: '50%', background: C.red, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>!</div>
          <div>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.red}}>THE PROBLEM</div>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 42, color: C.ink, whiteSpace: 'nowrap'}}>Vendor slipped two weeks</div>
          </div>
        </div>
        <Opt l="A" title="Cut the reporting page" sub="Launch stays on Friday" p={a} top={650} pick={0} />
        <div style={{position: 'absolute', left: 0, right: 0, top: 650}}>
          <Opt l="B" title="Move launch to the 20th" sub="Everything ships, two weeks later" p={b} top={230} pick={pick} />
        </div>
        <div style={{position: 'absolute', left: 140, top: 1110, width: 200, height: 60}}>
          <Circle color={C.green} strokeWidth={5} iterations={1} seed={5} padding={{left: 10, right: 10, top: 6, bottom: 6}} progress={interpolate(t, [7.7, 8.1], [0, 1], {...CL, easing: INOUT})}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.green, whiteSpace: 'nowrap', opacity: ez(t, 7.6, 0.3)}}>Her pick</div>
          </Circle>
        </div>
        <div style={{position: 'absolute', left: 560, top: 1100, display: 'flex', alignItems: 'center', gap: 14, opacity: ez(t, 7.4, 0.35)}}>
          <Av i="DA" bg="#3F6FB5" size={60} />
          <Bub at={7.4} left={76} top={-40} width={260} tail="none" size={34}>
            B. Thanks.
          </Bub>
        </div>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={1.9} name="pop" volume={0.28} />
      <Sfx at={2.4} name="pop" volume={0.28} />
      <Sfx at={7.4} name="ping" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: bring two options with the problem.', start: 0.65, end: 3.6, key: 'options', se: 3.19},
          {text: '"We cut the reporting page, or we move launch to the twentieth.', start: 3.68, end: 6.85, key: 'or', se: 6.39},
          {text: 'Which do you prefer?"', start: 6.92, end: 8.1, key: 'prefer', se: 7.52},
        ]}
      />
    </Paper>
  );
};

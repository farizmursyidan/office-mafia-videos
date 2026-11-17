import React from 'react';
import {Easing, interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Av, CL, Caps, DANA, INOUT, KAREN, Label, Mark, Paper, Pill, Push, card, ez, useT} from './kit';

/* 4. Move 2: your honest answer types into the "confidential" form, then the forward chain stacks up:
   HR to Dana (your boss) to Karen (VP). Then the face test: the answer gets crossed off, "Don't write it". */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const HR = '#6C7A89';
const ANSWER = 'Honestly? Dana micromanages everyone.';
const STEPS = [{text: ANSWER, from: 0.5, to: 2.0, mode: 'type' as const}];
const FWD = [
  {i: 'LI', bg: HR, from: 'Linda (HR)', to: 'Dana (your boss)', at: 1.9},
  {i: 'DA', bg: DANA.shirt, from: 'Dana', to: 'Karen (VP)', at: 2.5},
  {i: 'KA', bg: KAREN.shirt, from: 'Karen', to: 'All managers', at: 3.1},
];
export const Move2: React.FC = () => {
  const {f, t} = useT();
  const form = ez(t, 0.15, 0.5);
  const test = ez(t, 4.0, 0.5);
  const cross = interpolate(t, [6.0, 6.6], [0, 1], {...CL, easing: INOUT});
  const dont = interpolate(t, [6.5, 6.85], [0, 1], {...CL, easing: POP});
  const caret = Math.floor(t * 2.5) % 2 === 0 ? '|' : '';
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Assume it's forwarded" />
        {/* the form */}
        <div style={{...card, top: 440, height: 230, padding: '26px 36px', boxSizing: 'border-box', opacity: form, translate: `0px ${(1 - form) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.muted}}>EXIT FORM (CONFIDENTIAL)</div>
          <div style={{marginTop: 16, background: '#F6F2EC', borderRadius: 20, padding: '18px 24px', minHeight: 100, boxSizing: 'border-box', fontFamily: SANS, fontWeight: 800, fontSize: 36, lineHeight: 1.25, color: C.ink}}>
            <CrossedOff color={C.red} strokeWidth={5} iterations={1} seed={4} progress={cross}>
              <span>
                {typedText(f, STEPS)}
                {t >= 0.5 && t < 2.3 ? caret : ''}
              </span>
            </CrossedOff>
          </div>
        </div>
        {/* forward chain */}
        <div style={{position: 'absolute', left: 70, right: 70, top: 700}}>
          {FWD.map((r, k) => {
            const p = interpolate(t, [r.at, r.at + 0.4], [0, 1], {...CL, easing: POP});
            return (
              <div
                key={r.i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  height: 84,
                  marginBottom: 14,
                  marginLeft: k * 30,
                  padding: '0 26px',
                  borderRadius: 24,
                  background: C.white,
                  boxShadow: '0 10px 26px rgba(60,45,20,0.14)',
                  opacity: p,
                  translate: `${(1 - p) * 40}px 0px`,
                }}
              >
                <Av i={r.i} bg={r.bg} size={50} />
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink, whiteSpace: 'nowrap'}}>
                  Fwd: {r.from} <span style={{color: C.muted}}>to</span> {r.to}
                </div>
              </div>
            );
          })}
        </div>
        {/* face test */}
        <div style={{position: 'absolute', left: 70, top: 1020, display: 'flex', alignItems: 'center', gap: 16, opacity: test, translate: `0px ${(1 - test) * 24}px`}}>
          <Av i="DA" bg={DANA.shirt} size={58} />
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>Would you say it to her face?</div>
        </div>
        <Pill p={dont} bg={C.red} size={28} style={{left: 70, top: 1100}}>
          No? Don't write it.
        </Pill>
      </Push>
      <TypeClicks steps={STEPS} />
      {FWD.map((r) => (
        <Sfx key={r.i} at={r.at} name="send" volume={0.18} />
      ))}
      <Sfx at={4.0} name="blip" volume={0.22} />
      <Sfx at={6.0} name="snip" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: assume every word gets forwarded.', start: 0.69, end: 3.75, key: 'forwarded', se: 3.27},
          {text: "If you wouldn't say it to your boss's face,", start: 3.86, end: 5.78, key: 'face', se: 5.54},
          {text: "don't put it on the form.", start: 5.83, end: 7.58, key: 'form', se: 7.15},
        ]}
      />
    </Paper>
  );
};

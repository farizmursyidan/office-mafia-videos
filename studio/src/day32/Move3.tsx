import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person} from '../characters';
import {Av, Bub, CL, Caps, DANA, INOUT, KAREN, Label, Mark, Paper, Pill, Push, YOU, card, ez, useT} from './kit';

/* 5. Move 3: your last week on a calendar. "Fri: Last day" is there first; two 10 minute blocks drop in
   before it (Dana, then Karen). Below, you thank Dana for one specific thing. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const ROWS = [
  {day: 'TUE', what: 'Coffee with Dana (boss)', len: '10 min', i: 'DA', bg: DANA.shirt, at: 4.25},
  {day: 'WED', what: 'Coffee with Karen (VP)', len: '10 min', i: 'KA', bg: KAREN.shirt, at: 5.6},
];
export const Move3: React.FC = () => {
  const {t} = useT();
  const cal = ez(t, 0.2, 0.5);
  const lastRing = interpolate(t, [2.4, 3.0], [0, 1], {...CL, easing: INOUT});
  const people = ez(t, 6.7, 0.6);
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const youTalk = t > 7.4 && t < 9.0 ? Math.max(0, Math.sin(t * 9)) * 8 : 0;
  const specific = interpolate(t, [8.6, 8.95], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Goodbye in person" />
        <div style={{...card, top: 440, height: 360, padding: '24px 36px', boxSizing: 'border-box', opacity: cal, translate: `0px ${(1 - cal) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.muted}}>YOUR LAST WEEK</div>
          {ROWS.map((r) => {
            const p = interpolate(t, [r.at, r.at + 0.4], [0, 1], {...CL, easing: POP});
            return (
              <div key={r.i} style={{display: 'flex', alignItems: 'center', gap: 18, height: 84, borderBottom: '2px solid #EEEAE4', opacity: 0.15 + 0.85 * p}}>
                <div style={{width: 80, fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.muted}}>{r.day}</div>
                <div style={{flex: 1, height: 62, borderRadius: 16, background: p > 0.05 ? 'rgba(46,158,91,0.14)' : '#F6F2EC', display: 'flex', alignItems: 'center', gap: 14, padding: '0 18px', scale: String(0.94 + 0.06 * p), transformOrigin: 'left center'}}>
                  {p > 0.05 && <Av i={r.i} bg={r.bg} size={42} />}
                  <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink, opacity: p, whiteSpace: 'nowrap'}}>{r.what}</div>
                  <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 800, fontSize: 24, color: C.green, opacity: p}}>{r.len}</div>
                </div>
              </div>
            );
          })}
          <div style={{display: 'flex', alignItems: 'center', gap: 18, height: 84}}>
            <div style={{width: 80, fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.muted}}>FRI</div>
            <Circle color={C.red} strokeWidth={5} iterations={1} seed={6} padding={{top: 4, bottom: 4, left: 14, right: 14}} progress={lastRing}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.red, padding: '0 6px'}}>Last day</div>
            </Circle>
          </div>
        </div>
        {/* thanking Dana */}
        <AbsoluteFill style={{opacity: people}}>
          <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
            <Person x={300} y={1170} scale={0.76} facing={1} armL={youTalk + 15} bob={breathe(0)} {...YOU} />
            <Person x={700} y={1170} scale={0.76} facing={-1} armL={10} bob={breathe(1.2)} {...DANA} />
          </svg>
          <Bub at={7.3} left={110} top={800} size={30} tail="left">
            Thanks for backing my Q3 launch.
          </Bub>
          <Pill p={specific} bg={C.green} size={24} style={{left: 750, top: 1050}}>
            One specific thing
          </Pill>
        </AbsoluteFill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.24} />
      <Sfx at={2.4} name="snip" volume={0.2} />
      {ROWS.map((r) => (
        <Sfx key={r.i} at={r.at} name="pop" volume={0.22} />
      ))}
      <Sfx at={7.3} name="pop" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: say goodbye in person before your last day.', start: 0.43, end: 4.1, key: 'person last', se: 3.6},
          {text: "Ten minutes with your boss, and ten with your boss's boss.", start: 4.23, end: 7.05, key: 'ten', se: 6.77},
          {text: 'Thank each of them for one specific thing.', start: 7.15, end: 9.67, key: 'specific', se: 9.02},
        ]}
      />
    </Paper>
  );
};

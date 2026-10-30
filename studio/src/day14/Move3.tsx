import React from 'react';
import {interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, OUT, Paper, Push, card, ez, float, useT} from './kit';

/* 5. Move 3: give allies a line to repeat. One win with a number, then three allies echo it. */
const ECHO = [
  {i: 'RA', bg: '#5B8C5A', at: 6.6},
  {i: 'MK', bg: '#9A5BB0', at: 7.0},
  {i: 'DA', bg: '#8E6845', at: 7.4},
];
export const Move3: React.FC = () => {
  const {t} = useT();
  const win = ez(t, 0.5, 0.6);
  const bars = interpolate(t, [3.6, 4.8], [0, 1], {...CL, easing: INOUT});
  const daysAfter = Math.round(10 - 5 * bars);
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Give them a line to repeat" />
        <div style={{...card, top: 440, padding: '24px 36px', opacity: win, translate: `0px ${(1 - win) * 70 + float(t)}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted}}>ONE CLEAR WIN</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink, marginTop: 8}}>New hire onboarding</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16, marginTop: 22}}>
            {[
              {l: 'BEFORE', d: 10, w: 1, c: '#CFC6B8'},
              {l: 'AFTER', d: daysAfter, w: 1 - 0.5 * bars, c: C.green},
            ].map((b) => (
              <div key={b.l} style={{display: 'flex', alignItems: 'center', gap: 20}}>
                <div style={{width: 130, fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: C.muted}}>{b.l}</div>
                <div style={{flex: 1, height: 48, position: 'relative'}}>
                  <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${b.w * 100}%`, background: b.c, borderRadius: 12}} />
                </div>
                <div style={{width: 170, whiteSpace: 'nowrap', textAlign: 'right', fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>{b.d} days</div>
              </div>
            ))}
          </div>
          <div style={{marginTop: 22, fontFamily: SANS, fontWeight: 900, fontSize: 44, color: C.ink, opacity: ez(t, 5.9, 0.5)}}>
            <Highlight color="rgba(224,169,59,0.75)" seed={6} iterations={1} progress={interpolate(t, [6.2, 6.7], [0, 1], {...CL, easing: INOUT})}>
              <span>Cut in half.</span>
            </Highlight>
          </div>
        </div>
        <div style={{position: 'absolute', left: 70, right: 70, top: 885, display: 'flex', flexDirection: 'column', gap: 16}}>
          {ECHO.map((e, k) => {
            const p = ez(t, e.at, 0.45);
            return (
              <div key={e.i} style={{display: 'flex', alignItems: 'center', gap: 18, marginLeft: k * 60, opacity: p, translate: `${(1 - p) * 50}px ${float(t, k + 1) * 0.6}px`}}>
                <Av i={e.i} bg={e.bg} size={70} />
                <div style={{background: C.white, borderRadius: 24, padding: '14px 24px', fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.ink, boxShadow: '0 10px 24px rgba(60,45,20,0.14)', whiteSpace: 'nowrap'}}>
                  YOU cut onboarding in half.
                </div>
              </div>
            );
          })}
        </div>
      </Push>
      <Sfx at={0.5} name="pop" volume={0.3} />
      <Sfx at={3.6} name="whoosh" volume={0.2} />
      <Sfx at={6.2} name="hit" volume={0.3} />
      {ECHO.map((e) => (
        <Sfx key={e.i} at={e.at} name="blip" volume={0.26} />
      ))}
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: give your allies something to repeat.', start: 0.4, end: 3.25, key: 'repeat.', se: 2.76},
          {text: 'One clear win with a number, like cutting onboarding time in half.', start: 3.3, end: 8.1, key: 'number,', se: 7.13},
        ]}
      />
    </Paper>
  );
};

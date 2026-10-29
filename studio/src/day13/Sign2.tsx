import React from 'react';
import {interpolate} from 'remotion';
import {Circle, Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Camera, Caps, INOUT, Label, Mark, OUT, Paper, Pill, card, ez, float, useT} from './kit';

/* 4. Sign 2: the same unknown consultant lands in the CC line of every budget email */
const MAILS = [
  {subj: 'Q1 budget draft', at: 1.2},
  {subj: 'Headcount plan', at: 3.2},
  {subj: 'Cost review, all teams', at: 4.1},
];
export const Sign2: React.FC = () => {
  const {t} = useT();
  return (
    <Paper>
      <Mark />
      <Label n="2/3" title="New names show up" />
      <Camera
        shots={[
          {t: 0, x: 540, y: 700, z: 1},
          {t: 4.6, x: 540, y: 700, z: 1},
          {t: 5.6, x: 760, y: 900, z: 1.08},
          {t: 7, x: 760, y: 900, z: 1.1},
        ]}
      >
        <div
          style={{
            ...card,
            top: 440,
            padding: '22px 36px 14px',
            opacity: interpolate(t, [0.2, 0.8], [0, 1], {...CL, easing: OUT}),
            translate: interpolate(t, [0.2, 0.9], ['0px 90px', `0px ${float(t)}px`], {...CL, easing: OUT}),
          }}
        >
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 8}}>INBOX</div>
          {MAILS.map((m, i) => (
            <div
              key={m.subj}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                padding: '16px 0',
                borderTop: '2px solid #EEEAE4',
                opacity: interpolate(t, [m.at, m.at + 0.5], [0, 1], {...CL, easing: OUT}),
                translate: interpolate(t, [m.at, m.at + 0.6], ['60px 0px', '0px 0px'], {...CL, easing: OUT}),
              }}
            >
              <div style={{width: 64, height: 64, borderRadius: '50%', background: '#E9E4DC', color: C.muted, fontFamily: SANS, fontWeight: 900, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>RK</div>
              <div>
                <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink}}>{m.subj}</div>
                <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 27, color: C.muted, marginTop: 6}}>
                  {'CC: you, Dana, '}
                  <Highlight color="rgba(224,169,59,0.6)" seed={i + 11} iterations={1} progress={interpolate(t, [m.at + 0.35, m.at + 0.8], [0, 1], {...CL, easing: INOUT})}>
                    <span style={{color: C.ink, fontWeight: 800}}>R. Kessler (consultant)</span>
                  </Highlight>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{position: 'absolute', left: 640, top: 1000}}>
          <Pill p={ez(t, 5.3, 0.5)} bg={C.ink} style={{position: 'relative'}}>
            <Circle color={C.amber} strokeWidth={4} seed={5} padding={{left: 26, right: 26, top: 14, bottom: 14}} progress={interpolate(t, [5.7, 6.3], [0, 1], {...CL, easing: INOUT})}>
              <span>Who is this?</span>
            </Circle>
          </Pill>
        </div>
      </Camera>
      {MAILS.map((m) => (
        <Sfx key={m.subj} at={m.at} name="ping" volume={0.28} />
      ))}
      <Sfx at={5.3} name="pop" volume={0.35} />
      <Caps
        top={1290}
        caps={[
          {text: 'Sign two: new names show up.', start: 0.38, end: 2.65, key: 'names', se: 2.41},
          {text: "A consultant you've never met is suddenly CC'd on every budget email.", start: 2.69, end: 7.1, key: 'consultant', se: 6.25},
        ]}
      />
    </Paper>
  );
};

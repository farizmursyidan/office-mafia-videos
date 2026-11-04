import React from 'react';
import {interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person, Plant} from '../characters';
import {Av, Bub, CL, Camera, Caps, DANA, FadeOut, Fg, Floor, INOUT, Label, Mark, Paper, Pill, YOU, card, ez, useT} from './kit';

/* 3. Move 1: you say yes once and turn the chore into a rotation. */
const ROTA = [
  {w: 'Today', i: 'YOU', bg: C.amber, fg: C.ink},
  {w: 'Next week', i: 'RA', bg: '#5B8C5A', fg: C.white},
  {w: 'Week 3', i: 'ME', bg: '#9A5BB0', fg: C.white},
  {w: 'Week 4', i: 'TO', bg: '#4F7F8C', fg: C.white},
];
export const Move1: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const rota = ez(t, 6.95, 0.5);
  const nod = t > 6.0 ? Math.sin((t - 6.0) * 7) * Math.max(0, 1 - (t - 6.0) / 1.2) * 5 : 0;
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 900, z: 1.04},
          {t: 2.8, x: 540, y: 900, z: 1.0},
          {t: 7.0, x: 540, y: 700, z: 1.0},
          {t: 9.9, x: 540, y: 700, z: 1.03},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Plant x={70} y={1080} />
          <Plant x={1010} y={1080} />
          <Fg k={1.2}>
            <Person x={300} y={1180} facing={1} bob={breathe(0)} armL={t > 4.0 ? interpolate(t, [4.0, 4.4], [10, 70], {...CL, easing: INOUT}) : 10} {...YOU} />
            <Person x={780} y={1180} facing={-1} bob={breathe(1) + nod} {...DANA} />
          </Fg>
        </svg>
        <FadeOut from={3.7} d={0.3}>
          <Bub at={0.7} left={520} top={480} tail="right" size={40}>
            Notes again?
          </Bub>
        </FadeOut>
        <Pill p={ez(t, 3.21, 0.3) * (1 - ez(t, 4.1, 0.3))} bg={C.red} size={32} style={{left: 90, top: 520}}>
          {"DON'T REFUSE"}
        </Pill>
        <FadeOut from={6.75} d={0.3}>
          <Bub at={4.4} left={70} top={450} tail="none" size={40}>
            Happy to do it today.
          </Bub>
          <Bub at={5.75} left={70} top={590} tail="left" size={40}>
            {"Who's got next week?"}
          </Bub>
        </FadeOut>
        <div style={{...card, top: 430, height: 270, padding: '22px 30px', opacity: rota, translate: `0px ${(1 - rota) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>NOTES ROTATION</div>
          <div style={{display: 'flex', gap: 14, marginTop: 20}}>
            {ROTA.map((r, i) => {
              const p = ez(t, 7.1 + i * 0.28, 0.4);
              return (
                <div key={r.w} style={{flex: 1, background: '#F0EBE3', borderRadius: 18, height: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: p, translate: `0px ${(1 - p) * 20}px`}}>
                  <Av i={r.i} bg={r.bg} fg={r.fg} size={76} />
                  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.ink, whiteSpace: 'nowrap'}}>{r.w}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Camera>
      <Mark />
      <Label n="1/3" title="Rotate the chore" />
      <Sfx at={0.7} name="pop" volume={0.3} />
      <Sfx at={3.21} name="click" volume={0.28} />
      <Sfx at={4.4} name="pop" volume={0.32} />
      <Sfx at={5.75} name="pop" volume={0.32} />
      <Sfx at={7.1} name="blip" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: rotate the chore.', start: 0.41, end: 2.9, key: 'rotate', se: 2.64},
          {text: "Don't refuse.", start: 3.21, end: 4.05, key: 'refuse', se: 3.79},
          {text: 'Say, "Happy to do it today.', start: 4.15, end: 5.65, key: 'today', se: 5.47},
          {text: 'Who\'s got next week?"', start: 5.75, end: 7.05, key: 'next', se: 6.75},
          {text: "Now it's a rotation, not your job.", start: 7.16, end: 9.8, key: 'rotation', se: 8.84},
        ]}
      />
    </Paper>
  );
};

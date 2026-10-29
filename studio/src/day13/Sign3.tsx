import React from 'react';
import {interpolate} from 'remotion';
import {Underline} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Desk, Person} from '../characters';
import {CL, Camera, Caps, DANA, Fg, Floor, INOUT, Label, Mark, OUT, Paper, Pill, YOU, ez, mix, useT} from './kit';

/* 5. Sign 3: you walk up and ask about next quarter, the boss gives you fog */
const Bub: React.FC<{at: number; left: number; top: number; width: number; tail: 'left' | 'right'; dark?: boolean; children: React.ReactNode}> = ({at, left, top, width, tail, dark, children}) => {
  const {t} = useT();
  if (t < at) return null;
  const bg = dark ? C.ink : C.white;
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        transformOrigin: tail === 'left' ? 'left bottom' : 'right bottom',
        opacity: interpolate(t, [at, at + 0.35], [0, 1], {...CL, easing: OUT}),
        scale: String(interpolate(t, [at, at + 0.5], [0.85, 1], {...CL, easing: OUT, output: 'perceptual-scale'})),
        translate: interpolate(t, [at, at + 0.5], ['0px 24px', '0px 0px'], {...CL, easing: OUT}),
      }}
    >
      <div style={{background: bg, color: dark ? C.white : C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 40, lineHeight: 1.2, padding: '22px 30px', borderRadius: 30, boxShadow: '0 16px 40px rgba(60,45,20,0.18)'}}>{children}</div>
      <div style={{position: 'absolute', bottom: -22, [tail]: 60, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: `26px solid ${bg}`}} />
    </div>
  );
};

export const Sign3: React.FC = () => {
  const {f, t} = useT();
  const walk = ez(t, 0.2, 1.5, INOUT);
  const walking = t > 0.2 && t < 1.65;
  const ask = ez(t, 2.8, 0.4);
  const answer = ez(t, 4.2, 0.6);
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 1000, z: 1.06},
          {t: 2.6, x: 540, y: 1000, z: 1.0},
          {t: 4.1, x: 540, y: 1000, z: 1.0},
          {t: 5.2, x: 820, y: 900, z: 1.1},
          {t: 7, x: 820, y: 900, z: 1.12},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Fg k={1.15}>
            <Desk x={660} y={1080} w={260} laptop screenGlow={0.4 + 0.2 * Math.sin(t * 3)} />
            <Person x={820} y={1180} facing={-1} sitting bob={breathe(1)} lean={-5 * answer} {...DANA} />
            <Person x={170 + 230 * walk} y={1180} facing={1} walk={walking ? f / 3.4 : undefined} bob={walking ? 0 : breathe(0)} armL={mix(0, 35, ask)} {...YOU} />
          </Fg>
        </svg>
        <Bub at={3.0} left={80} top={440} width={520} tail="left">
          {"What's next quarter?"}
        </Bub>
        <Bub at={4.3} left={480} top={575} width={520} tail="right" dark>
          {"Let's see how things "}
          <Underline color={C.amber} strokeWidth={5} seed={3} progress={interpolate(t, [5.4, 5.9], [0, 1], {...CL, easing: INOUT})}>
            <span>shake out.</span>
          </Underline>
        </Bub>
        <Pill p={ez(t, 5.3, 0.5)} bg={C.red} size={26} style={{left: 84, top: 604}}>
          No dates
        </Pill>
        <Pill p={ez(t, 5.5, 0.5)} bg={C.red} size={26} style={{left: 252, top: 604}}>
          No names
        </Pill>
      </Camera>
      <Mark />
      <Label n="3/3" title="Your boss goes vague" />
      <Sfx at={3.0} name="pop" volume={0.35} />
      <Sfx at={4.3} name="pop" volume={0.35} />
      <Sfx at={5.3} name="hit" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Sign three: your boss goes vague.', start: 0.39, end: 2.9, key: 'vague.', se: 2.6},
          {text: "Ask about next quarter and you hear, let's see how things shake out.", start: 3.1, end: 6.95, key: 'shake', se: 6.14},
        ]}
      />
    </Paper>
  );
};

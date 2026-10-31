import React from 'react';
import {interpolate} from 'remotion';
import {Box} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Desk, Person, Plant} from '../characters';
import {Bub, CL, Camera, Caps, Fg, Floor, INOUT, Label, Mark, Paper, Pill, YOU, ez, useT} from './kit';

/* 4. Move 2: options, not problems. At the boss's desk: the vendor slipped, here are plan A and plan B, you pick B. */
const BOSS = {shirt: '#3F6FB5', hair: '#2A211C', hairStyle: 'short' as const, skin: '#E2B48C', pants: '#2A2A33'};

const Option: React.FC<{p: number; left: number; tag: string; title: string; sub: string; dim?: number}> = ({p, left, tag, title, sub, dim = 0}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top: 0,
      width: 400,
      height: 170,
      background: '#FFFFFF',
      borderRadius: 26,
      boxShadow: '0 16px 40px rgba(60,45,20,0.16)',
      padding: '20px 26px',
      boxSizing: 'border-box',
      opacity: p * (1 - 0.45 * dim),
      translate: `0px ${(1 - p) * 40}px`,
    }}
  >
    <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 3, color: C.muted}}>{tag}</div>
    <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.ink, marginTop: 6, whiteSpace: 'nowrap'}}>{title}</div>
    <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.muted, marginTop: 6, whiteSpace: 'nowrap'}}>{sub}</div>
  </div>
);

export const Move2: React.FC = () => {
  const {t} = useT();
  const a = ez(t, 5.2, 0.5);
  const b = ez(t, 6.25, 0.5);
  const pick = interpolate(t, [7.1, 7.7], [0, 1], {...CL, easing: INOUT});
  const nod = t > 7.3 ? Math.sin((t - 7.3) * 7) * 3 * Math.max(0, 1 - (t - 7.3) / 1.2) : 0;
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 1000, z: 1.05},
          {t: 3.0, x: 540, y: 1000, z: 1.0},
          {t: 5.0, x: 540, y: 1000, z: 1.0},
          {t: 7.1, x: 760, y: 700, z: 1.0},
          {t: 8.0, x: 760, y: 700, z: 1.07},
          {t: 9.0, x: 760, y: 700, z: 1.09},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Plant x={70} y={1080} />
          <Fg k={1.1}>
            <Desk x={690} y={1120} w={300} monitor screenGlow={0.4 + 0.2 * Math.sin(t * 2)} />
            <Person x={300} y={1180} facing={1} bob={breathe(0)} armL={t > 5.1 ? 70 : 15} {...YOU} />
            <Person x={890} y={1180} facing={-1} bob={breathe(1) + nod} lean={nod * 0.6} {...BOSS} />
          </Fg>
        </svg>
        <Bub at={3.95} left={90} top={470} tail="left" size={38}>
          {'The vendor slipped a week.'}
        </Bub>
        <div style={{position: 'absolute', left: 90, right: 90, top: 610}}>
          <Option p={a} left={0} tag="PLAN A" title="Pay for rush" sub="+$4k, on time" dim={pick} />
          <div style={{position: 'absolute', left: 500, top: 0}}>
            <Box color={C.amber} strokeWidth={7} seed={11} padding={{left: 8, right: 8, top: 8, bottom: 8}} progress={pick}>
              <div style={{position: 'relative', width: 400, height: 170}}>
                <Option p={b} left={0} tag="PLAN B" title="Cut scope" sub="$0, still on time" />
              </div>
            </Box>
          </div>
        </div>
        <Pill p={ez(t, 7.15, 0.45)} bg={C.amber} fg={C.ink} size={26} style={{left: 600, top: 535}}>
          MY PICK
        </Pill>
      </Camera>
      <Mark />
      <Label n="2/3" title="Options, not problems" />
      <Sfx at={3.95} name="pop" volume={0.33} />
      <Sfx at={5.2} name="click" volume={0.35} />
      <Sfx at={6.25} name="click" volume={0.35} />
      <Sfx at={7.1} name="hit" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: bring options, not problems.', start: 0.55, end: 3.85, key: 'options,', se: 3.43},
          {text: 'The vendor slipped a week?', start: 3.9, end: 5.1, key: 'slipped', se: 4.94},
          {text: "Here's plan A, plan B, and I'd pick B.", start: 5.15, end: 9.0, key: 'pick', se: 7.92},
        ]}
      />
    </Paper>
  );
};

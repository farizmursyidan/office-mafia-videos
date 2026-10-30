import React from 'react';
import {interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person, Plant} from '../characters';
import {Bub, CL, Camera, Caps, Fg, Floor, INOUT, Label, MEI, Mark, Paper, Pill, YOU, ez, mix, useT} from './kit';

/* 4. Move 2: friends outside your team. At the coffee machine, Mei from Finance tells you what your boss hears next week. */
const CoffeeMachine: React.FC<{x: number; y: number; t: number}> = ({x, y, t}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-110} y={-16} width={220} height={22} rx={6} fill="#B98A5E" />
    <rect x={-92} y={6} width={14} height={110} fill="#8E6845" />
    <rect x={78} y={6} width={14} height={110} fill="#8E6845" />
    <rect x={-60} y={-150} width={110} height={134} rx={12} fill="#2B2B33" />
    <rect x={-44} y={-132} width={78} height={30} rx={6} fill={C.amber} opacity={0.6 + 0.3 * Math.sin(t * 3)} />
    <rect x={-22} y={-60} width={34} height={40} rx={4} fill="#F4F1EC" />
    {[0, 1].map((k) => (
      <path key={k} d={`M${-12 + k * 14} -70 q 6 -14 0 -28`} stroke="#FFFFFF" strokeWidth={4} fill="none" strokeLinecap="round" opacity={0.25 + 0.25 * Math.sin(t * 2 + k)} />
    ))}
  </g>
);

export const Move2: React.FC = () => {
  const {f, t} = useT();
  const walk = ez(t, 0.1, 1.4, INOUT);
  const walking = t > 0.1 && t < 1.45;
  const talk = ez(t, 3.3, 0.4);
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 1000, z: 1.05},
          {t: 3.0, x: 540, y: 1000, z: 1.0},
          {t: 3.6, x: 540, y: 1000, z: 1.0},
          {t: 4.6, x: 640, y: 640, z: 1.08},
          {t: 7.7, x: 640, y: 640, z: 1.1},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Plant x={980} y={1080} />
          <CoffeeMachine x={540} y={1080} t={t} />
          <Fg k={1.15}>
            <Person x={230} y={1180} facing={1} bob={breathe(0)} armL={20} {...YOU} />
            <Person x={mix(1040, 820, walk)} y={1180} facing={-1} walk={walking ? f / 3.4 : undefined} bob={walking ? 0 : breathe(1)} lean={-4 * talk} badge="FIN" {...MEI} />
          </Fg>
        </svg>
        <Bub at={3.4} left={490} top={455} width={510} tail="right" size={38}>
          {'Heads up. Budgets get cut '}
          <Highlight color="rgba(224,169,59,0.7)" seed={8} iterations={1} progress={interpolate(t, [4.2, 4.7], [0, 1], {...CL, easing: INOUT})}>
            <span>Friday.</span>
          </Highlight>
        </Bub>
        <Pill p={ez(t, 0.9, 0.5)} bg="#9A5BB0" size={24} style={{left: 760, top: 650}}>
          MEI, FINANCE
        </Pill>
        <Pill p={ez(t, 5.6, 0.5)} bg={C.red} size={26} style={{left: 80, top: 480}}>
          Your boss hears Monday
        </Pill>
      </Camera>
      <Mark />
      <Label n="2/3" title="Befriend other teams" />
      <Sfx at={3.4} name="pop" volume={0.35} />
      <Sfx at={5.6} name="hit" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: make friends outside your team.', start: 0.45, end: 3.2, key: 'outside', se: 2.8},
          {text: 'The analyst in finance hears about every budget before your boss does.', start: 3.25, end: 7.7, key: 'finance', se: 7.29},
        ]}
      />
    </Paper>
  );
};

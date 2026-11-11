import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person, Plant} from '../characters';
import {Av, Bub, CL, Camera, Caps, DANA, INOUT, MEI, Mark, Paper, Pill, TOM, YOU, card, ez, useT} from './kit';

/* 1. Hook: the same four people at the same lunch table, ticked off every day of the week. Your boss looks at her whiteboard, circles the four of you and labels it a faction. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const SAM = {shirt: '#6C6F7D', hair: '#3B2A1E', hairStyle: 'short' as const, skin: '#D7A47C', pants: '#2A2A33'};
const Stool: React.FC<{x: number}> = ({x}) => (
  <g>
    <rect x={x - 34} y={398} width={68} height={12} rx={6} fill="#8E6845" />
    <rect x={x - 6} y={408} width={12} height={72} fill="#8E6845" />
  </g>
);
export const Hook: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const office = ez(t, 3.0, 0.5);
  const crew = ez(t, 4.75, 0.6);
  const tag = interpolate(t, [5.0, 5.35], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 450, z: 1.06},
          {t: 2.8, x: 540, y: 450, z: 1.0},
          {t: 7.4, x: 540, y: 700, z: 1.03},
        ]}
      >
        {/* Cafeteria */}
        <div style={{...card, top: 170, height: 560, overflow: 'hidden', background: '#F6F2EC'}}>
          <div style={{position: 'absolute', left: 40, top: 30, right: 40, display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 2, color: C.muted, marginRight: 'auto', whiteSpace: 'nowrap'}}>LUNCH</div>
            {DAYS.map((d, i) => {
              const p = interpolate(t, [0.1 + i * 0.42, 0.4 + i * 0.42], [0, 1], {...CL, easing: POP});
              return (
                <div key={d} style={{width: 118, height: 62, borderRadius: 16, background: p > 0.5 ? C.ink : '#E9E4DC', color: p > 0.5 ? C.white : C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: SANS, fontWeight: 900, fontSize: 24, scale: String(0.9 + 0.1 * p)}}>
                  {d}
                  <span style={{color: C.amber, opacity: p}}>✓</span>
                </div>
              );
            })}
          </div>
          <svg width={940} height={560} style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={0} y={480} width={940} height={80} fill="#DDD5C8" />
            <Plant x={50} y={480} />
            {/* crew outline */}
            <rect x={95} y={190} width={770} height={305} rx={40} fill="none" stroke={C.amber} strokeWidth={6} strokeDasharray="22 16" opacity={crew} />
            <Stool x={150} />
            <Stool x={290} />
            <Stool x={650} />
            <Stool x={790} />
            {/* table */}
            <rect x={350} y={352} width={240} height={18} rx={6} fill="#B98A5E" />
            <rect x={400} y={368} width={12} height={112} fill="#8E6845" />
            <rect x={528} y={368} width={12} height={112} fill="#8E6845" />
            <rect x={372} y={340} width={70} height={12} rx={4} fill="#7FB287" />
            <rect x={498} y={340} width={70} height={12} rx={4} fill="#E58F6B" />
            <Person x={150} y={480} scale={0.8} facing={1} sitting bob={breathe(0)} armL={55} {...SAM} />
            <Person x={290} y={480} scale={0.8} facing={1} sitting bob={breathe(1)} armL={65} {...YOU} />
            <Person x={650} y={480} scale={0.8} facing={-1} sitting bob={breathe(2)} armL={65} {...MEI} />
            <Person x={790} y={480} scale={0.8} facing={-1} sitting bob={breathe(3)} armL={55} {...TOM} />
          </svg>
          <Pill p={tag} bg={C.amber} fg={C.ink} size={30} style={{left: 330, top: 128}}>
            THE LUNCH CREW
          </Pill>
        </div>
        {/* Boss office */}
        <div style={{...card, top: 770, height: 400, overflow: 'hidden', background: '#F6F2EC', opacity: 0.35 + 0.65 * office}}>
          <svg width={940} height={400} style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={0} y={340} width={940} height={60} fill="#DDD5C8" />
            <Person x={170} y={375} scale={0.78} facing={1} bob={breathe(4)} armL={interpolate(t, [3.2, 3.7], [10, 72], {...CL, easing: INOUT})} badge="BOSS" {...DANA} />
          </svg>
          {/* whiteboard */}
          <div style={{position: 'absolute', left: 330, top: 155, width: 560, height: 215, background: C.white, border: '6px solid #C9C2B6', borderRadius: 16, boxSizing: 'border-box', padding: '22px 30px'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 2, color: C.muted}}>WHO'S WITH WHO</div>
            <div style={{position: 'absolute', left: 70, top: 94, width: 400, height: 80}}>
              <Circle color={C.red} strokeWidth={5} iterations={1} seed={6} padding={{left: 14, right: 14, top: 2, bottom: 2}} progress={interpolate(t, [4.75, 5.4], [0, 1], {...CL, easing: INOUT})}>
                <div style={{display: 'flex', gap: 16}}>
                  <Av i="SA" bg={SAM.shirt} size={68} />
                  <Av i="YOU" bg={C.amber} fg={C.ink} size={68} />
                  <Av i="ME" bg={MEI.shirt} size={68} />
                  <Av i="TO" bg={TOM.shirt} size={68} />
                </div>
              </Circle>
            </div>
            <div style={{position: 'absolute', right: 30, top: 20, fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 2, color: C.red, opacity: ez(t, 5.4, 0.35), whiteSpace: 'nowrap'}}>= FACTION</div>
          </div>
          <Bub at={3.35} left={300} top={30} width={480} tail="left" size={32}>
            Same four. Every day.
          </Bub>
        </div>
      </Camera>
      <Sfx at={0.1} name="click" volume={0.22} />
      <Sfx at={0.94} name="click" volume={0.22} />
      <Sfx at={1.78} name="click" volume={0.22} />
      <Sfx at={3.35} name="pop" volume={0.3} />
      <Sfx at={4.75} name="snip" volume={0.26} />
      <Sfx at={5.0} name="hit" volume={0.28} />
      <Caps
        top={1290}
        caps={[
          {text: 'You eat lunch with the same three people every day.', start: 0.28, end: 3.25, key: 'same', se: 2.83},
          {text: 'Your boss noticed.', start: 3.34, end: 4.62, key: 'noticed', se: 4.4},
          {text: "And now you're part of a faction.", start: 4.68, end: 7.1, key: 'faction', se: 6.4},
        ]}
      />
    </Paper>
  );
};

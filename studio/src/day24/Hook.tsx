import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Desk, Person, Plant} from '../characters';
import {Bub, CL, Camera, Caps, DANA, INOUT, Mark, OUT, Paper, Pill, YOU, card, ez, useT} from './kit';

/* 1. Hook: split screen. At home you tick off task after task. At the office your boss looks at your empty desk and wonders if you were coasting. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const TASKS = ['Q3 report', 'Client deck', 'Bug fixes'];
const Tag: React.FC<{children: string; dark?: boolean}> = ({children, dark}) => (
  <div style={{position: 'absolute', top: 22, left: 30, background: dark ? C.ink : 'rgba(224,169,59,0.3)', color: dark ? C.white : C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 3, padding: '6px 18px', borderRadius: 10}}>{children}</div>
);
export const Hook: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const done = Math.min(12, Math.floor(interpolate(t, [0, 2.2], [3, 12], {...CL, easing: OUT})));
  const top = ez(t, 2.2, 0.35);
  const office = ez(t, 3.6, 0.5);
  const look = interpolate(t, [3.9, 4.6], [0, 1], {...CL, easing: INOUT});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 400, z: 1.05},
          {t: 3.3, x: 540, y: 400, z: 1.0},
          {t: 4.0, x: 540, y: 900, z: 1.0},
          {t: 6.9, x: 540, y: 900, z: 1.05},
        ]}
      >
        {/* HOME panel */}
        <div style={{...card, top: 180, height: 450, overflow: 'hidden'}}>
          <svg width={940} height={450} style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={0} y={380} width={940} height={70} fill="#E6DED2" />
            <rect x={40} y={90} width={170} height={120} rx={10} fill="#DCE7F2" stroke="#C9B9A3" strokeWidth={8} />
            <path d="M125 90 V210 M40 150 H210" stroke="#C9B9A3" strokeWidth={6} />
            <Desk x={300} y={330} w={260} laptop screenGlow={0.5 + 0.5 * Math.sin(t * 3)} />
            <Person x={170} y={410} scale={0.82} facing={1} sitting bob={breathe(0)} armR={70 + Math.sin(t * 9) * 4} {...YOU} />
          </svg>
          <Tag>HOME</Tag>
          <div style={{position: 'absolute', left: 500, top: 70, width: 400}}>
            {TASKS.map((x, i) => {
              const p = interpolate(t, [0.1 + i * 0.5, 0.4 + i * 0.5], [0, 1], {...CL, easing: POP});
              return (
                <div key={x} style={{display: 'flex', alignItems: 'center', gap: 16, height: 64}}>
                  <div style={{width: 44, height: 44, borderRadius: 10, background: p > 0.5 ? C.green : '#EEEAE4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <svg width={28} height={28} viewBox="0 0 36 36" style={{opacity: p, scale: String(0.6 + 0.4 * p)}}>
                      <path d="M6 19 L14 27 L30 9" stroke={C.white} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink, whiteSpace: 'nowrap'}}>{x}</div>
                </div>
              );
            })}
            <div style={{marginTop: 14, fontFamily: SANS, fontWeight: 900, fontSize: 52, color: C.ink, whiteSpace: 'nowrap'}}>{done} done</div>
          </div>
          <Pill p={top} bg={C.green} size={30} style={{left: 500, top: 360}}>
            MOST ON THE TEAM
          </Pill>
        </div>
        {/* OFFICE panel */}
        <div style={{...card, top: 670, height: 500, overflow: 'hidden', background: '#F6F2EC', opacity: 0.35 + 0.65 * office}}>
          <svg width={940} height={500} style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={0} y={420} width={940} height={80} fill="#DDD5C8" />
            <Plant x={60} y={420} />
            <Desk x={380} y={360} w={280} monitor screenGlow={0} />
            <g transform="translate(380 0)">
              <rect x={-40} y={300} width={80} height={14} rx={6} fill="#5A5F68" />
            </g>
            <Person x={720} y={450} scale={0.85} facing={-1} bob={breathe(1)} lean={-4 * look} badge="BOSS" {...DANA} />
          </svg>
          <Tag dark>OFFICE</Tag>
          <div style={{position: 'absolute', left: 230, top: 120, width: 300, height: 60}}>
            <Circle color={C.red} strokeWidth={5} iterations={1} seed={3} padding={{left: 18, right: 18, top: 18, bottom: 18}} progress={interpolate(t, [4.2, 4.8], [0, 1], {...CL, easing: INOUT})}>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.muted, whiteSpace: 'nowrap', textAlign: 'center', width: 300, opacity: ez(t, 3.8, 0.4)}}>Your desk: empty</div>
            </Circle>
          </div>
        </div>
        <Bub at={4.9} left={630} top={688} width={270} tail="right" size={44}>
          Coasting?
        </Bub>
      </Camera>
      <Sfx at={0.1} name="click" volume={0.28} />
      <Sfx at={0.6} name="click" volume={0.28} />
      <Sfx at={1.1} name="click" volume={0.28} />
      <Sfx at={2.2} name="ping" volume={0.32} />
      <Sfx at={4.2} name="snip" volume={0.26} />
      <Sfx at={4.9} name="pop" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'You worked from home all week.', start: 0.21, end: 2.1, key: 'home', se: 1.96},
          {text: 'You got more done than anyone.', start: 2.17, end: 3.95, key: 'more', se: 3.68},
          {text: 'And your boss still thinks you were coasting.', start: 4.05, end: 6.45, key: 'coasting', se: 6.07},
        ]}
      />
    </Paper>
  );
};

import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Desk, Person, Plant} from '../characters';
import {Bub, CL, Camera, Caps, DANA, INOUT, Mark, OUT, Paper, Pill, YOU, card, ez, useT} from './kit';

/* 1. Hook: the project tracker already shows the launch slipping past Friday. Your boss walks by asking if it's on track. Days tick by and the blame needle swings from the vendor to you. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
export const Hook: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  /* projected finish slides from Thu past the Fri deadline */
  const slip = interpolate(t, [0.1, 1.9], [0, 1], {...CL, easing: INOUT});
  const late = interpolate(t, [1.6, 1.95], [0, 1], {...CL, easing: POP});
  const office = ez(t, 2.5, 0.5);
  const today = Math.min(3, Math.floor(interpolate(t, [4.0, 6.4], [0, 3.99], CL)));
  const blame = interpolate(t, [4.0, 6.6], [0, 1], {...CL, easing: INOUT});
  const barW = 700;
  const dayW = barW / 5;
  const finishX = interpolate(slip, [0, 1], [3.6 * dayW, 5.0 * dayW + 70]);
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 420, z: 1.06},
          {t: 2.3, x: 540, y: 420, z: 1.0},
          {t: 3.0, x: 540, y: 900, z: 1.0},
          {t: 7.4, x: 540, y: 900, z: 1.04},
        ]}
      >
        {/* Tracker */}
        <div style={{...card, top: 180, height: 450, padding: '30px 40px', boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 44, color: C.ink}}>Project Atlas</div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted, whiteSpace: 'nowrap'}}>Launch: Friday</div>
          </div>
          <div style={{position: 'relative', marginTop: 40, width: barW + 80, height: 230}}>
            {DAYS.map((d, i) => (
              <div key={d} style={{position: 'absolute', left: i * dayW, top: 0, width: dayW, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: i === today && t > 4.0 ? C.ink : C.muted}}>
                {d}
              </div>
            ))}
            {/* deadline line */}
            <div style={{position: 'absolute', left: 5 * dayW - 2, top: 40, width: 4, height: 170, background: C.ink}} />
            <div style={{position: 'absolute', left: 5 * dayW - 64, top: 206, fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 2, color: C.ink, whiteSpace: 'nowrap'}}>DEADLINE</div>
            {/* planned bar */}
            <div style={{position: 'absolute', left: 0, top: 70, height: 44, width: 3.6 * dayW, background: 'rgba(46,158,91,0.25)', borderRadius: 10}} />
            {/* projected bar, slipping */}
            <div style={{position: 'absolute', left: 0, top: 130, height: 44, width: finishX, background: slip > 0.7 ? C.red : C.amber, borderRadius: 10}} />
            <div style={{position: 'absolute', left: 14, top: 75, fontFamily: SANS, fontWeight: 800, fontSize: 24, color: C.green}}>PLAN</div>
            <div style={{position: 'absolute', left: 14, top: 136, fontFamily: SANS, fontWeight: 800, fontSize: 24, color: C.white}}>REALITY</div>
          </div>
          <Pill p={late} bg={C.red} size={30} style={{left: 40, top: 370}}>
            LATE
          </Pill>
        </div>
        {/* Office panel */}
        <div style={{...card, top: 670, height: 500, overflow: 'hidden', background: '#F6F2EC', opacity: 0.35 + 0.65 * office}}>
          <svg width={940} height={500} style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={0} y={420} width={940} height={80} fill="#DDD5C8" />
            <Plant x={60} y={420} />
            <Desk x={300} y={360} w={280} laptop screenGlow={0.5 + 0.5 * Math.sin(t * 3)} />
            <Person x={170} y={450} scale={0.85} facing={1} sitting bob={breathe(0)} armR={70} {...YOU} />
            <Person x={830} y={450} scale={0.85} facing={-1} bob={breathe(1)} walk={t < 2.9 ? t * 9 : undefined} badge="BOSS" {...DANA} />
          </svg>
          {/* blame meter */}
          <div style={{position: 'absolute', left: 300, top: 40, width: 400, opacity: ez(t, 3.95, 0.4)}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 3, color: C.ink, marginBottom: 12}}>WHOSE FAULT?</div>
            <div style={{position: 'relative', height: 30, borderRadius: 999, background: 'linear-gradient(90deg, #DDD5C8, #C8413A)'}}>
              <div style={{position: 'absolute', top: -8, left: `calc(${4 + blame * 88}% - 23px)`, width: 46, height: 46, borderRadius: '50%', background: C.ink, border: `5px solid ${C.white}`, boxSizing: 'border-box'}} />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted}}>
              <span>Vendor</span>
              <div style={{width: 70, height: 44, position: 'relative'}}>
                <Circle color={C.red} strokeWidth={5} iterations={1} seed={4} padding={{left: 14, right: 14, top: 4, bottom: 4}} progress={interpolate(t, [6.2, 6.7], [0, 1], {...CL, easing: INOUT})}>
                  <span style={{color: C.ink, fontWeight: 900}}>You</span>
                </Circle>
              </div>
            </div>
          </div>
        </div>
        <Bub at={2.75} left={560} top={872} width={300} tail="right" size={38}>
          All on track for Friday?
        </Bub>
      </Camera>
      <Sfx at={0.2} name="blip" volume={0.26} />
      <Sfx at={1.6} name="hit" volume={0.3} />
      <Sfx at={2.75} name="pop" volume={0.32} />
      <Sfx at={4.0} name="click" volume={0.24} />
      <Sfx at={4.8} name="click" volume={0.24} />
      <Sfx at={5.6} name="click" volume={0.24} />
      <Sfx at={6.2} name="snip" volume={0.26} />
      <Caps
        top={1290}
        caps={[
          {text: 'Your project is going to be late.', start: 0.35, end: 2.55, key: 'late', se: 2.16},
          {text: "Your boss doesn't know yet.", start: 2.65, end: 3.9, key: 'know', se: 3.62},
          {text: 'And every day you wait, it becomes more your fault.', start: 3.96, end: 7.1, key: 'fault', se: 6.78},
        ]}
      />
    </Paper>
  );
};

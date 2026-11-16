import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, DANA, INOUT, KAREN, Lights, Mark, Paper, Pill, RAJ, YOU, card, ez, useT} from './kit';

/* 1. Hook: the year-end party invite is on screen from frame 0 (lights twinkling). You tap "Can't make it".
   Below, the guest list: everyone important is Going, your row says Not going, gets circled, and "VP noticed" lands. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const GUESTS = [
  {i: 'KA', name: 'Karen (VP)', bg: KAREN.shirt, go: true},
  {i: 'DA', name: 'Dana (boss)', bg: DANA.shirt, go: true},
  {i: 'RA', name: 'Raj', bg: RAJ.shirt, go: true},
];
export const Hook: React.FC = () => {
  const {t} = useT();
  const press = interpolate(t, [2.25, 2.55], [0, 1], {...CL, easing: POP});
  const list = ez(t, 2.9, 0.45);
  const you = 1;
  const ring = interpolate(t, [4.5, 5.1], [0, 1], {...CL, easing: INOUT});
  const noticed = interpolate(t, [5.3, 5.65], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 400, z: 1.08},
          {t: 1.8, x: 540, y: 400, z: 1.0},
          {t: 3.2, x: 540, y: 400, z: 1.0},
          {t: 6.4, x: 540, y: 950, z: 1.05},
        ]}
      >
        {/* the invite */}
        <div style={{...card, top: 190, height: 450, background: C.ink, overflow: 'hidden'}}>
          <svg width={940} height={150} style={{position: 'absolute', left: 0, top: 0}}>
            <Lights x0={-20} x1={960} y={10} sag={22} n={14} t={t} />
          </svg>
          <div style={{position: 'absolute', left: 44, top: 100, fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.amber}}>YOU'RE INVITED</div>
          <div style={{position: 'absolute', left: 44, top: 140, fontFamily: SANS, fontWeight: 900, fontSize: 64, color: C.white, letterSpacing: -1}}>Year-End Party</div>
          <div style={{position: 'absolute', left: 44, top: 222, fontFamily: SANS, fontWeight: 700, fontSize: 30, color: 'rgba(255,255,255,0.7)'}}>Friday, Dec 12 at 6 PM, Rooftop</div>
          <div style={{position: 'absolute', left: 44, right: 44, top: 300, display: 'flex', gap: 24}}>
            <div style={{flex: 1, height: 92, borderRadius: 24, border: '3px solid rgba(255,255,255,0.35)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 34, color: 'rgba(255,255,255,0.75)', opacity: 1 - 0.5 * press}}>Going</div>
            <div
              style={{
                flex: 1,
                height: 92,
                borderRadius: 24,
                border: `3px solid ${press > 0.05 ? C.red : 'rgba(255,255,255,0.35)'}`,
                background: press > 0.05 ? C.red : 'transparent',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: 34,
                color: C.white,
                scale: String(1 - 0.06 * Math.sin(Math.PI * Math.min(1, press))),
              }}
            >
              Can't make it
            </div>
          </div>
        </div>
        {/* guest list */}
        <div style={{...card, top: 690, height: 440, padding: '26px 40px', boxSizing: 'border-box', opacity: 0.4 + 0.6 * list, translate: `0px ${(1 - list) * 30}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>GUEST LIST</div>
          <div style={{marginTop: 12, display: 'flex', flexDirection: 'column'}}>
            {GUESTS.map((g) => (
              <div key={g.i} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 74, borderBottom: '2px solid #EEEAE4'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <Av i={g.i} bg={g.bg} size={52} />
                  <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>{g.name}</div>
                </div>
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.green}}>Going</div>
              </div>
            ))}
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80, opacity: you, translate: `${(1 - you) * 30}px 0px`}}>
              <Circle color={C.red} strokeWidth={5} iterations={1} seed={9} padding={{top: 6, bottom: 6, left: 12, right: 18}} progress={ring}>
                <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
                  <Av i="YOU" bg={YOU.shirt} size={52} fg={C.ink} />
                  <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>You</div>
                </div>
              </Circle>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, color: press > 0.05 ? C.red : C.muted}}>{press > 0.05 ? 'Not going' : 'No reply'}</div>
            </div>
          </div>
          <Pill p={noticed} bg={C.red} size={26} style={{right: 40, top: 18}}>
            The VP noticed
          </Pill>
        </div>
      </Camera>
      <Sfx at={0.0} name="whoosh" volume={0.18} />
      <Sfx at={2.25} name="click" volume={0.26} />
            <Sfx at={5.3} name="hit" volume={0.24} />
      <Caps
        top={1290}
        caps={[
          {text: 'Your office party is next month.', start: 0.26, end: 2.05, key: 'party', se: 1.66},
          {text: "You're planning to skip it.", start: 2.16, end: 3.38, key: 'skip', se: 3.25},
          {text: "And your boss's boss will notice who showed up.", start: 3.45, end: 6.4, key: 'notice', se: 5.97},
        ]}
      />
    </Paper>
  );
};

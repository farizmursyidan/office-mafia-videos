import React from 'react';
import {Easing, interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, INOUT, Mark, Paper, Pill, YOU, card, ez, useT} from './kit';

/* 1. Hook: your resignation email is on screen from frame 0 and gets its "Sent" tick. HR's calendar invite
   "Exit interview" slides in, a CONFIDENTIAL stamp lands on it, then the stamp is crossed off. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const HR = '#6C7A89';
export const Hook: React.FC = () => {
  const {t} = useT();
  const sent = interpolate(t, [0.35, 0.7], [0, 1], {...CL, easing: POP});
  const invite = ez(t, 1.55, 0.55);
  const stamp = interpolate(t, [3.55, 3.9], [0, 1], {...CL, easing: POP});
  const cross = interpolate(t, [4.45, 4.95], [0, 1], {...CL, easing: INOUT});
  const fwd = interpolate(t, [4.85, 5.2], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 320, z: 1.1},
          {t: 1.4, x: 540, y: 320, z: 1.0},
          {t: 3.3, x: 540, y: 700, z: 1.0},
          {t: 5.4, x: 540, y: 760, z: 1.06},
        ]}
      >
        {/* resignation email */}
        <div style={{...card, top: 190, height: 230, padding: '30px 40px', boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <Av i="YOU" bg={YOU.shirt} size={64} fg={C.ink} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.muted}}>TO: DANA (YOUR BOSS)</div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 44, color: C.ink, marginTop: 4}}>My resignation</div>
            </div>
          </div>
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 30, color: C.muted, marginTop: 22}}>Last day: Friday, Dec 4</div>
          <Pill p={sent} bg={C.green} size={28} style={{right: 40, top: 40}}>
            Sent
          </Pill>
        </div>
        {/* HR invite */}
        <div style={{...card, top: 470, height: 560, padding: '34px 40px', boxSizing: 'border-box', opacity: invite, translate: `0px ${(1 - invite) * 60}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.muted}}>CALENDAR INVITE FROM HR</div>
          <div style={{display: 'flex', alignItems: 'stretch', gap: 24, marginTop: 22}}>
            <div style={{width: 12, borderRadius: 6, background: HR}} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 64, color: C.ink, letterSpacing: -1}}>Exit interview</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 32, color: C.muted, marginTop: 8}}>Thursday, 3:00 PM, 30 min</div>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 34}}>
            <Av i="LI" bg={HR} size={54} />
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.ink}}>Linda (HR)</div>
            <Av i="YOU" bg={YOU.shirt} size={54} fg={C.ink} />
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.ink}}>You</div>
          </div>
          {/* stamp */}
          <div
            style={{
              position: 'absolute',
              left: 150,
              top: 340,
              opacity: stamp,
              rotate: '-8deg',
              scale: String(interpolate(stamp, [0, 1], [1.6, 1])),
            }}
          >
            <CrossedOff color={C.ink} strokeWidth={6} iterations={1} seed={5} progress={cross}>
              <div style={{border: `6px solid ${C.red}`, color: C.red, borderRadius: 14, padding: '6px 26px', fontFamily: SANS, fontWeight: 900, fontSize: 60, letterSpacing: 6}}>CONFIDENTIAL</div>
            </CrossedOff>
          </div>
        </div>
        <Pill p={fwd} bg={C.ink} size={28} style={{left: 110, top: 1060}}>
          Fwd: Dana (your boss)
        </Pill>
      </Camera>
      <Sfx at={0.0} name="whoosh" volume={0.18} />
      <Sfx at={0.35} name="send" volume={0.22} />
      <Sfx at={1.55} name="blip" volume={0.24} />
      <Sfx at={3.55} name="hit" volume={0.26} />
      <Sfx at={4.85} name="pop" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'You just quit your job.', start: 0.21, end: 1.5, key: 'quit', se: 1.12},
          {text: 'HR booked your exit interview.', start: 1.61, end: 3.45, key: 'exit interview', se: 3.22},
          {text: "And they swear it's confidential.", start: 3.58, end: 5.4, key: 'confidential', se: 4.83},
        ]}
      />
    </Paper>
  );
};

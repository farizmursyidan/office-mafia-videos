import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Av, CL, Camera, Caps, DANA, INOUT, Mark, Msg, Paper, card, ez, useT} from './kit';

/* 1. Hook: Dana's message "Be honest. How am I doing as a manager?" is already on screen and buzzing.
   You start typing "Honestly? Your meetings..." Below, WHAT DANA REMEMBERS: "Your feedback" bar grows past "Your Q3 work". */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const REPLY = 'Honestly? Your meetings are...';
const STEPS = [{text: REPLY, from: 3.2, to: 4.4, mode: 'type' as const}];
export const Hook: React.FC = () => {
  const {f, t} = useT();
  const buzz = t < 1.6 ? Math.sin(t * 60) * 5 * interpolate(t, [0, 1.6], [1, 0], CL) : 0;
  const msg1 = interpolate(t, [0, 0.35], [0.75, 1], {...CL, easing: Easing.out(Easing.cubic)});
  const box = 0.55 + 0.45 * ez(t, 2.9, 0.3);
  const caret = Math.floor(t * 2.5) % 2 === 0 ? '|' : '';
  const mem = ez(t, 4.4, 0.45);
  const fb = interpolate(t, [4.9, 6.2], [0.04, 0.92], {...CL, easing: INOUT});
  const work = interpolate(t, [5.0, 5.8], [0.04, 0.3], {...CL, easing: INOUT});
  const ring = interpolate(t, [6.0, 6.6], [0, 1], {...CL, easing: INOUT});
  const tag = interpolate(t, [6.2, 6.5], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 420, z: 1.07},
          {t: 1.5, x: 540, y: 420, z: 1.07},
          {t: 2.6, x: 540, y: 420, z: 1.0},
          {t: 4.4, x: 540, y: 420, z: 1.0},
          {t: 7.0, x: 540, y: 980, z: 1.04},
        ]}
      >
        {/* chat with Dana */}
        <div style={{...card, top: 190, height: 450, background: C.white, overflow: 'hidden', translate: `${buzz}px 0px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '26px 36px', borderBottom: '2px solid #EEEAE4'}}>
            <Av i="DA" bg={DANA.shirt} size={64} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>Dana (boss)</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 22, color: C.muted}}>Direct message</div>
            </div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>4:12 PM</div>
          </div>
          <div style={{padding: '30px 36px', display: 'flex', flexDirection: 'column', gap: 26}}>
            <Msg p={msg1}>Be honest. How am I doing as a manager?</Msg>
            <div style={{display: 'flex', justifyContent: 'flex-end', opacity: box, translate: `0px ${(1 - box) * 20}px`}}>
              <div
                style={{
                  width: 640,
                  minHeight: 96,
                  background: '#FFFFFF',
                  border: '3px solid #E6E0D6',
                  color: C.ink,
                  fontFamily: SANS,
                  fontWeight: 800,
                  fontSize: 38,
                  lineHeight: 1.22,
                  padding: '20px 28px',
                  borderRadius: 28,
                  boxSizing: 'border-box',
                }}
              >
                {t < 3.2 ? <span style={{color: '#B9B2A8'}}>Type a reply</span> : typedText(f, STEPS)}
                {t >= 3.2 ? caret : ''}
              </div>
            </div>
          </div>
        </div>
        {/* what Dana remembers */}
        <div style={{...card, top: 700, height: 360, padding: '30px 40px', boxSizing: 'border-box', opacity: 0.35 + 0.65 * mem, translate: `0px ${(1 - mem) * 30}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>WHAT DANA REMEMBERS</div>
          {[
            {name: 'Your feedback', w: fb, color: C.red},
            {name: 'Your Q3 work', w: work, color: C.muted},
          ].map((r) => (
            <div key={r.name} style={{marginTop: 30}}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>{r.name}</div>
              <div style={{marginTop: 10, height: 44, borderRadius: 22, background: '#F1EEE9', position: 'relative'}}>
                <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${r.w * 100}%`, borderRadius: 22, background: r.color}} />
              </div>
            </div>
          ))}
          <div style={{position: 'absolute', right: 52, top: 26, opacity: tag, scale: String(0.8 + 0.2 * tag)}}>
            <Circle color={C.red} strokeWidth={5} iterations={1} seed={6} padding={{top: 8, bottom: 8, left: 12, right: 12}} progress={ring}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.red, padding: '2px 8px'}}>For years</div>
            </Circle>
          </div>
        </div>
      </Camera>
      <TypeClicks steps={STEPS} />
      <Sfx at={0.0} name="ping" volume={0.3} />
      <Sfx at={4.9} name="blip" volume={0.24} />
      <Sfx at={6.0} name="snip" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Your boss just asked for honest feedback.', start: 0.21, end: 3.05, key: 'honest feedback', se: 2.75},
          {text: "You're about to give it.", start: 3.19, end: 4.4, key: 'give', se: 4.2},
          {text: "And they'll remember it longer than your work.", start: 4.49, end: 6.85, key: 'remember longer', se: 6.32},
        ]}
      />
    </Paper>
  );
};

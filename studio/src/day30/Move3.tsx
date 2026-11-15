import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person} from '../characters';
import {Bub, CL, Caps, DANA, INOUT, Label, Mark, Paper, Pill, Push, RAJ, Sun, YOU, card, ez, mix, useT} from './kit';

/* 5. Move 3: the calendar of your first morning back. "Catch up with Dana" fills 9:00 to 9:30, tagged "Booked before you leave".
   Below, you give Dana the update yourself while Sam stands aside ("Not from Sam"). */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
export const Move3: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const cal = ez(t, 0.2, 0.5);
  const block = interpolate(t, [1.4, 2.2], [0, 1], {...CL, easing: INOUT});
  const booked = interpolate(t, [2.4, 2.75], [0, 1], {...CL, easing: POP});
  const people = ez(t, 0.5, 0.6);
  const notSam = interpolate(t, [6.9, 7.25], [0, 1], {...CL, easing: POP});
  const samDim = interpolate(t, [6.9, 7.2], [1, 0.45], CL);
  const talk = t > 5.7 && t < 8.2 ? Math.max(0, Math.sin(t * 9)) * 10 : 0;
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Book the catch up" />
        {/* first morning back */}
        <div style={{...card, top: 440, height: 300, padding: '26px 40px', boxSizing: 'border-box', opacity: cal, translate: `0px ${(1 - cal) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Sun size={34} />
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>MONDAY 12TH, FIRST DAY BACK</div>
          </div>
          <div style={{display: 'flex', marginTop: 20, fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted}}>
            {['9:00', '9:15', '9:30', '9:45'].map((h) => (
              <div key={h} style={{width: 210}}>{h}</div>
            ))}
          </div>
          <div style={{position: 'relative', height: 110, marginTop: 10}}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 420, height: 110, borderRadius: 22, border: `3px dashed ${C.muted}`, boxSizing: 'border-box', opacity: 0.5 * (1 - block)}} />
            <div style={{position: 'absolute', left: 0, top: 0, height: 110, width: mix(40, 420, block), opacity: Math.min(1, block * 3), borderRadius: 22, background: DANA.shirt, padding: '16px 26px', boxSizing: 'border-box', overflow: 'hidden'}}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.white, whiteSpace: 'nowrap'}}>Catch up: Dana</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 26, color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap'}}>30 min</div>
            </div>
          </div>
          <Pill p={booked} bg={C.green} size={24} style={{left: 470, top: 172}}>
            Booked before you left
          </Pill>
        </div>
        {/* you give the update */}
        <AbsoluteFill style={{opacity: people}}>
          <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
            <Person x={330} y={1170} scale={0.78} facing={1} armL={talk + 20} bob={breathe(0)} {...YOU} />
            <Person x={590} y={1170} scale={0.78} facing={-1} bob={breathe(1.2)} {...DANA} />
            <Person x={890} y={1170} scale={0.78} facing={-1} bob={breathe(2.4)} opacity={samDim} {...RAJ} />
          </svg>
          <Bub at={5.75} left={260} top={780} size={34}>
            Acme is on track.
          </Bub>
          <Pill p={notSam} bg={C.muted} size={24} style={{left: 790, top: 840}}>
            Not from Sam
          </Pill>
        </AbsoluteFill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={1.4} name="whoosh" volume={0.14} />
      <Sfx at={2.4} name="ping" volume={0.26} />
      <Sfx at={5.75} name="pop" volume={0.24} />
      <Sfx at={6.9} name="click" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: book the catch up before you leave.', start: 0.67, end: 3.4, key: 'book leave', se: 3.07},
          {text: 'Thirty minutes with your boss on your first morning back,', start: 3.56, end: 5.62, key: 'first morning', se: 5.51},
          {text: 'so the update comes from you, not from Sam.', start: 5.72, end: 8.6, key: 'you Sam', se: 7.97},
        ]}
      />
    </Paper>
  );
};

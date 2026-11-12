import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Desk, Person} from '../characters';
import {Av, Bub, CL, Caps, DANA, FadeOut, Label, Mark, Paper, Pill, Push, TOM, YOU, card, ez, useT} from './kit';

/* 3. Move 1: in the meeting, Tom takes a shot at your plan. You answer "Good point. Let's dig in after." The room's read: you look senior, he looks like he picked a fight. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
export const Move1: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const room = ez(t, 0.2, 0.5);
  const read = ez(t, 0.5, 0.5);
  const p1 = interpolate(t, [8.1, 8.45], [0, 1], {...CL, easing: POP});
  const p2 = interpolate(t, [8.7, 9.05], [0, 1], {...CL, easing: POP});
  const shot = t > 3.6 && t < 5.6;
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Never fight in public" />
        {/* meeting room */}
        <div style={{...card, top: 440, height: 520, overflow: 'hidden', background: '#F6F2EC', opacity: room, translate: `0px ${(1 - room) * 40}px`}}>
          <svg width={940} height={520} style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={0} y={440} width={940} height={80} fill="#DDD5C8" />
            <Person x={470} y={420} scale={0.7} facing={1} bob={breathe(1)} badge="BOSS" {...DANA} />
            <Desk x={470} y={380} w={560} />
            <Person x={150} y={470} scale={0.8} facing={1} sitting bob={breathe(0)} armL={t > 5.8 && t < 7.6 ? 64 : 10} {...YOU} />
            <Person x={790} y={470} scale={0.8} facing={-1} sitting bob={breathe(2)} armL={shot ? 70 : 10} lean={shot ? -4 : 0} {...TOM} />
          </svg>
        </div>
        <FadeOut from={5.55}>
          <Bub at={3.6} left={540} top={456} width={380} tail="right" size={36}>
            That plan won't scale.
          </Bub>
        </FadeOut>
        <Bub at={5.85} left={96} top={456} width={470} tail="left" size={36}>
          Good point. Let's dig in after.
        </Bub>
        {/* the room's read */}
        <div style={{...card, top: 990, height: 170, padding: '0 40px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 22, opacity: read, translate: `0px ${(1 - read) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 2, color: C.muted, width: 150, lineHeight: 1.15}}>THE ROOM SEES</div>
          <Av i="ME" bg={YOU.shirt} size={64} fg={C.ink} />
          <div style={{position: 'relative', width: 230, height: 60}}>
            <div style={{position: 'absolute', left: 0, top: 4, width: 150, height: 52, borderRadius: 999, border: `3px dashed ${C.muted}`, boxSizing: 'border-box', opacity: 0.5 * (1 - p1)}} />
            <Pill p={p1} bg={C.green} size={28} style={{left: 0, top: 4}}>
              Senior
            </Pill>
          </div>
          <Av i="TO" bg={TOM.shirt} size={64} />
          <div style={{position: 'relative', width: 230, height: 60}}>
            <div style={{position: 'absolute', left: 0, top: 4, width: 170, height: 52, borderRadius: 999, border: `3px dashed ${C.muted}`, boxSizing: 'border-box', opacity: 0.5 * (1 - p2)}} />
            <Pill p={p2} bg={C.red} size={28} style={{left: 0, top: 4}}>
              Defensive
            </Pill>
          </div>
        </div>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={3.6} name="hit" volume={0.28} />
      <Sfx at={5.85} name="pop" volume={0.3} />
      <Sfx at={8.1} name="ping" volume={0.3} />
      <Sfx at={8.7} name="pop" volume={0.26} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: never fight them in public.', start: 0.55, end: 2.95, key: 'public', se: 2.72},
          {text: 'When they take a shot at your plan in a meeting, say', start: 3.03, end: 5.78, key: 'shot', se: 5.5},
          {text: '"Good point. Let\'s dig in after."', start: 5.85, end: 7.95, key: 'after', se: 7.5},
          {text: 'Staying calm looks senior.', start: 8.07, end: 10.9, key: 'senior', se: 10.13},
        ]}
      />
    </Paper>
  );
};

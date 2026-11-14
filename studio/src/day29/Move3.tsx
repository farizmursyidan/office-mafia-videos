import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person} from '../characters';
import {CL, Caps, DANA, INOUT, Label, Mark, Paper, Pill, Push, RAJ, MEI, TOM, YOU, card, ez, useT} from './kit';

/* 5. Move 3: the "anonymous" survey answer, and its name field flips from Hidden to You.
   Below, a team of five: four get ruled out one by one, a spotlight lands on you. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const TEAM = [
  {x: 150, look: TOM, out: 4.85},
  {x: 345, look: MEI, out: 5.2},
  {x: 540, look: RAJ, out: 5.55},
  {x: 735, look: YOU, out: -1},
  {x: 930, look: {...DANA, shirt: '#7A6A58'}, out: 5.9},
];
export const Move3: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const survey = ez(t, 0.2, 0.5);
  const flip = interpolate(t, [2.7, 3.1], [0, 1], {...CL, easing: INOUT});
  const team = ez(t, 0.5, 0.6);
  const spot = interpolate(t, [6.2, 6.7], [0, 1], {...CL, easing: INOUT});
  const you = interpolate(t, [6.35, 6.7], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Anonymous isn't" />
        {/* survey */}
        <div style={{...card, top: 440, height: 320, padding: '26px 40px', boxSizing: 'border-box', opacity: survey, translate: `0px ${(1 - survey) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>ANONYMOUS TEAM SURVEY</div>
          <div style={{marginTop: 18, background: '#F6F2EC', borderRadius: 20, padding: '18px 26px', fontFamily: SANS, fontWeight: 800, fontSize: 36, lineHeight: 1.25, color: C.ink}}>
            "Our Monday meetings drag on and nobody gets heard."
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 20}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted}}>Name:</div>
            <div style={{position: 'relative', width: 240, height: 50}}>
              <div style={{position: 'absolute', left: 0, top: 0, fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.muted, opacity: 1 - flip, translate: `0px ${-flip * 20}px`, letterSpacing: 2}}>Hidden</div>
              <div style={{position: 'absolute', left: 0, top: -4, background: C.amber, borderRadius: 999, padding: '4px 22px', fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink, opacity: flip, translate: `0px ${(1 - flip) * 20}px`}}>You</div>
            </div>
          </div>
        </div>
        {/* team of five */}
        <AbsoluteFill style={{opacity: team}}>
          <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
            <defs>
              <radialGradient id="spot29" cx="50%" cy="100%" r="70%">
                <stop offset="0%" stopColor="rgba(224,169,59,0.55)" />
                <stop offset="100%" stopColor="rgba(224,169,59,0)" />
              </radialGradient>
            </defs>
            <polygon points="735,790 640,1190 830,1190" fill="url(#spot29)" opacity={spot} />
            {TEAM.map((m, i) => {
              const dim = m.out > 0 ? interpolate(t, [m.out, m.out + 0.3], [1, 0.3], CL) : 1;
              return <Person key={i} x={m.x} y={1170} scale={0.78} facing={i < 3 ? 1 : -1} bob={breathe(i)} opacity={dim} {...m.look} />;
            })}
          </svg>
          {TEAM.map((m, i) =>
            m.out > 0 ? (
              <Pill key={i} p={interpolate(t, [m.out, m.out + 0.3], [0, 1], {...CL, easing: POP})} bg={C.muted} size={22} style={{left: m.x - 70, top: 820}}>
                Not them
              </Pill>
            ) : null
          )}
          <Pill p={you} bg={C.red} size={28} style={{left: 735 - 80, top: 812}}>
            Wrote it
          </Pill>
        </AbsoluteFill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={2.7} name="snip" volume={0.24} />
      {TEAM.filter((m) => m.out > 0).map((m) => (
        <Sfx key={m.out} at={m.out} name="click" volume={0.22} />
      ))}
      <Sfx at={6.35} name="hit" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: treat the anonymous survey like it has your name on it.', start: 0.65, end: 4.6, key: 'anonymous name', se: 4.12},
          {text: "On a team of five, they'll guess who wrote it.", start: 4.71, end: 7.3, key: 'five guess', se: 6.72},
        ]}
      />
    </Paper>
  );
};

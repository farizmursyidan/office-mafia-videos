import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Desk, Person} from '../characters';
import {Bub, CL, Caps, DANA, Mark, Night, Pill, RAJ, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: whoever holds the work gets the credit. Sam presents your Acme chart to Dana,
   Dana says "Great work, Sam.", and your desk sits empty with an OUT OF OFFICE tag. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const BARS = [0.35, 0.55, 0.72, 0.9];
export const Rule: React.FC = () => {
  const {t} = useT();
  const room = ez(t, 0.15, 0.55);
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const point = interpolate(t, [0.8, 1.4], [0, 80], {...CL, easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const ooo = interpolate(t, [1.2, 1.55], [0, 1], {...CL, easing: POP});
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 200, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.2)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26, maxWidth: 640}}>
          <Reveal at={2.73} se={5.57} size={88} mark={{word: 'credit.', color: C.amber, at: 5.3}}>
            Who holds the work gets the credit.
          </Reveal>
        </div>
      </div>
      {/* Dana's office, while you're away */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 500, height: 640, borderRadius: 30, background: C.paper, overflow: 'hidden', opacity: room, translate: `0px ${(1 - room) * 40}px`}}>
        <svg width={960} height={640} style={{position: 'absolute', left: 0, top: 0}}>
          <rect x={0} y={560} width={960} height={80} fill="#D6CCBD" />
          {/* whiteboard with your chart */}
          <rect x={50} y={150} width={240} height={200} rx={14} fill={C.white} stroke="#CFC6B8" strokeWidth={4} />
          {BARS.map((h, i) => {
            const g = interpolate(t, [0.5 + i * 0.12, 1.0 + i * 0.12], [0, 1], {...CL, easing: Easing.bezier(0.16, 1, 0.3, 1)});
            return <rect key={i} x={80 + i * 50} y={320 - 140 * h * g} width={34} height={140 * h * g} rx={6} fill={C.amber} />;
          })}
          <rect x={160} y={350} width={14} height={210} fill="#B5AC9E" />
          {/* empty desk on the right */}
          <Desk x={800} y={470} w={230} laptop />
          <Person x={380} y={590} scale={0.92} facing={-1} armL={point} armR={0} bob={breathe(0)} {...RAJ} />
          <Person x={560} y={590} scale={0.92} facing={-1} bob={breathe(1.3)} {...DANA} />
        </svg>
        <div style={{position: 'absolute', left: 300, top: 60, fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.ink, opacity: ez(t, 0.9, 0.4)}}>SAM</div>
        <div style={{position: 'absolute', left: 520, top: 60, fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.ink, opacity: ez(t, 0.9, 0.4)}}>DANA (BOSS)</div>
        <Pill p={ooo} bg={C.ink} size={24} style={{left: 660, top: 320}}>
          Your desk: away
        </Pill>
        <Bub at={4.3} left={470} top={140} size={34}>
          Great work, Sam.
        </Bub>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={1.2} name="pop" volume={0.24} />
      <Sfx at={4.3} name="ping" volume={0.26} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.42, end: 2.55, key: 'rule', se: 2.14},
          {text: "Whoever holds your work while you're gone decides who gets the credit.", start: 2.73, end: 6.5, key: 'holds credit', se: 5.57},
        ]}
      />
    </Night>
  );
};

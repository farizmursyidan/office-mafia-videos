import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person} from '../characters';
import {Av, Bub, CL, Caps, KAREN, Lights, MEI, Mark, Night, Pill, RAJ, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: the party is a meeting with no agenda. Under the party lights, Karen (VP) asks Raj and Mei
   what they're working on, and her mental notes fill in: "Raj: sharp", "Mei: owns it", "You: ?" */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const NOTES = [
  {i: 'RA', bg: RAJ.shirt, text: 'Raj: sharp', at: 5.3, ok: true},
  {i: 'ME', bg: MEI.shirt, text: 'Mei: owns it', at: 6.0, ok: true},
  {i: 'YOU', bg: C.amber, text: 'You: ?', at: 6.8, ok: false},
];
export const Rule: React.FC = () => {
  const {t} = useT();
  const room = ez(t, 0.15, 0.55);
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const talk = t > 2.6 && t < 4.4 ? Math.max(0, Math.sin(t * 9)) * 8 : 0;
  const notes = ez(t, 4.9, 0.45);
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 200, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.2)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26, maxWidth: 760}}>
          <Reveal at={4.43} se={6.2} size={88} mark={{word: 'agenda.', color: C.amber, at: 6.4}}>
            A meeting with no agenda.
          </Reveal>
        </div>
      </div>
      {/* the party */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 500, height: 640, borderRadius: 30, background: C.paper, overflow: 'hidden', opacity: room, translate: `0px ${(1 - room) * 40}px`}}>
        <svg width={960} height={640} style={{position: 'absolute', left: 0, top: 0}}>
          <Lights x0={-20} x1={980} y={0} sag={18} n={13} t={t} />
          <rect x={0} y={560} width={960} height={80} fill="#D6CCBD" />
          {/* high table */}
          <rect x={210} y={430} width={120} height={14} rx={7} fill="#B98A5E" />
          <rect x={263} y={444} width={14} height={120} fill="#A57A50" />
          <Person x={120} y={590} scale={0.92} facing={1} armL={talk + 15} bob={breathe(0)} {...KAREN} />
          <Person x={380} y={590} scale={0.92} facing={-1} bob={breathe(1.3)} {...RAJ} />
          <Person x={520} y={590} scale={0.92} facing={-1} bob={breathe(2.1)} {...MEI} />
        </svg>
        <div style={{position: 'absolute', left: 40, top: 60, fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.ink, opacity: ez(t, 0.9, 0.4)}}>KAREN (VP)</div>
        <Bub at={2.7} left={70} top={115} size={32}>
          So, what are you working on?
        </Bub>
        {/* Karen's mental notes */}
        <div style={{position: 'absolute', left: 640, top: 250, width: 290, padding: '18px 22px', boxSizing: 'border-box', borderRadius: 22, background: C.white, boxShadow: '0 16px 40px rgba(60,45,20,0.18)', opacity: notes, translate: `0px ${(1 - notes) * 24}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: 2, color: C.muted}}>KAREN'S NOTES</div>
          {NOTES.map((n) => {
            const p = interpolate(t, [n.at, n.at + 0.35], [0, 1], {...CL, easing: POP});
            return (
              <div key={n.i} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 12, opacity: p, translate: `${(1 - p) * 20}px 0px`}}>
                <Av i={n.i} bg={n.bg} size={40} fg={n.ok ? C.white : C.ink} />
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, color: n.ok ? C.ink : C.red, whiteSpace: 'nowrap'}}>{n.text}</div>
              </div>
            );
          })}
        </div>
        <Pill p={interpolate(t, [7.0, 7.35], [0, 1], {...CL, easing: POP})} bg={C.red} size={22} style={{left: 660, top: 500}}>
          Not in the room
        </Pill>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={2.7} name="pop" volume={0.24} />
      {NOTES.map((n) => (
        <Sfx key={n.i} at={n.at} name="click" volume={0.2} />
      ))}
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.49, end: 2.4, key: 'rule', se: 1.82},
          {text: "The party isn't a break from work.", start: 2.54, end: 4.35, key: 'break work', se: 4.15},
          {text: "It's a meeting with no agenda, where leaders size people up.", start: 4.43, end: 8.1, key: 'agenda size', se: 7.53},
        ]}
      />
    </Night>
  );
};

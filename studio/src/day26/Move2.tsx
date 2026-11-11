import React from 'react';
import {Easing, interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, DANA, INOUT, Label, MEI, Mark, OUT, Paper, Pill, Push, TOM, card, ez, mix, useT} from './kit';

/* 4. Move 2: the lunch crew group chat. Your vent gets crossed out. Then a screenshot of it flashes, flies down and lands in a forward to Dana. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const VENT = 'This plan is a joke. She has no clue.';
const Msg: React.FC<{who: string; bg: string; text: string; p: number}> = ({who, bg, text, p}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 18, opacity: p, translate: `0px ${(1 - p) * 20}px`}}>
    <Av i={who} bg={bg} size={56} />
    <div style={{background: '#F1EEE9', color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 34, padding: '14px 24px', borderRadius: 24, whiteSpace: 'nowrap'}}>{text}</div>
  </div>
);
const VentBubble: React.FC = () => (
  <div style={{background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 34, padding: '14px 24px', borderRadius: 24, whiteSpace: 'nowrap'}}>{VENT}</div>
);
export const Move2: React.FC = () => {
  const {t} = useT();
  const chat = ez(t, 0.2, 0.5);
  const m1 = ez(t, 0.5, 0.35);
  const m2 = ez(t, 0.9, 0.35);
  const m3 = ez(t, 1.3, 0.35);
  const cross = interpolate(t, [1.9, 2.5], [0, 1], {...CL, easing: INOUT});
  const flash = interpolate(t, [3.45, 3.55, 3.95], [0, 0.85, 0], CL);
  const saved = interpolate(t, [3.55, 3.85], [0, 1], {...CL, easing: POP});
  const fly = interpolate(t, [4.4, 5.2], [0, 1], {...CL, easing: INOUT});
  const fwd = ez(t, 4.3, 0.4);
  const problem = interpolate(t, [5.9, 6.25], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Never vent in the chat" />
        {/* group chat */}
        <div style={{...card, top: 440, height: 440, padding: '26px 36px', boxSizing: 'border-box', overflow: 'hidden', opacity: chat, translate: `0px ${(1 - chat) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 16, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>Lunch crew</div>
            <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.muted}}>4 members</div>
          </div>
          <Msg who="ME" bg={MEI.shirt} text="Did you see the new targets?" p={m1} />
          <Msg who="TO" bg={TOM.shirt} text="Dana's plan again..." p={m2} />
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 22, opacity: m3, translate: `0px ${(1 - m3) * 20}px`}}>
            <CrossedOff color={C.red} strokeWidth={6} iterations={1} seed={9} progress={cross}>
              <VentBubble />
            </CrossedOff>
          </div>
          <div style={{position: 'absolute', inset: 0, background: C.white, opacity: flash}} />
          <Pill p={saved} bg={C.ink} size={28} style={{left: 36, top: 362}}>
            SCREENSHOT SAVED
          </Pill>
        </div>
        {/* flying screenshot */}
        {fly > 0 && fly < 1 && (
          <div style={{position: 'absolute', left: mix(324, 470, fly), top: mix(728, 1024, fly), scale: String(mix(1, 0.62, fly)), transformOrigin: 'left top', opacity: 1, border: `4px solid ${C.ink}`, borderRadius: 28, boxShadow: '0 20px 40px rgba(0,0,0,0.25)'}}>
            <VentBubble />
          </div>
        )}
        {/* forwarded to Dana */}
        <div style={{...card, top: 920, height: 240, padding: '26px 36px', boxSizing: 'border-box', opacity: fwd, translate: `0px ${(1 - fwd) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <Av i="DA" bg={DANA.shirt} size={64} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>Forwarded to Dana</div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.muted}}>12:03</div>
          </div>
          <div style={{position: 'absolute', left: 400, top: 104, scale: '0.62', transformOrigin: 'left top', border: `4px solid ${C.ink}`, borderRadius: 28, opacity: fly >= 1 ? 1 : 0}}>
            <VentBubble />
          </div>
          <Pill p={problem} bg={C.red} size={30} style={{left: 36, top: 150}}>
            PROBLEM: YOU
          </Pill>
        </div>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={1.3} name="pop" volume={0.26} />
      <Sfx at={1.9} name="snip" volume={0.26} />
      <Sfx at={3.45} name="click" volume={0.34} />
      <Sfx at={4.4} name="whoosh" volume={0.22} />
      <Sfx at={5.9} name="hit" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: never vent in the group chat.', start: 0.62, end: 3.35, key: 'vent', se: 2.82},
          {text: "One screenshot sent to the wrong person, and you're the problem.", start: 3.43, end: 7.0, key: 'problem', se: 6.39},
        ]}
      />
    </Paper>
  );
};

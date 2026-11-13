import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Av, CL, Caps, DANA, Label, Mark, Moon, Msg, Paper, Pill, Push, Sun, card, ez, useT} from './kit';

/* 3. Move 1: the 9:04 PM message sits unanswered overnight. The clock rolls to 8:30 AM, then the reply gets typed and sent: "On it. You'll have it by noon." Same answer, no new standard. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const REPLY = "On it. You'll have it by noon.";
const STEPS = [{text: REPLY, from: 4.0, to: 5.4, mode: 'type' as const}];
export const Move1: React.FC = () => {
  const {f, t} = useT();
  const phone = ez(t, 0.2, 0.5);
  const morning = interpolate(t, [3.0, 3.6], [0, 1], {...CL, easing: Easing.inOut(Easing.cubic)});
  const sent = t >= 5.6;
  const sentP = interpolate(t, [5.6, 5.95], [0, 1], {...CL, easing: POP});
  const p1 = interpolate(t, [6.64, 7.0], [0, 1], {...CL, easing: POP});
  const p2 = interpolate(t, [7.35, 7.7], [0, 1], {...CL, easing: POP});
  const caret = Math.floor(t * 2.5) % 2 === 0 && !sent ? '|' : '';
  const nightBg = `rgb(${Math.round(28 + (246 - 28) * morning)}, ${Math.round(28 + (242 - 28) * morning)}, ${Math.round(28 + (236 - 28) * morning)})`;
  const fg = morning > 0.5 ? C.ink : C.white;
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Answer in the morning" />
        {/* phone thread */}
        <div style={{...card, top: 440, height: 540, background: nightBg, overflow: 'hidden', opacity: phone, translate: `0px ${(1 - phone) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '24px 36px', borderBottom: `2px solid ${morning > 0.5 ? '#EEEAE4' : 'rgba(255,255,255,0.08)'}`}}>
            <Av i="DA" bg={DANA.shirt} size={60} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: fg}}>Dana (boss)</div>
            <div style={{marginLeft: 'auto', position: 'relative', width: 250, height: 50}}>
              <div style={{position: 'absolute', right: 0, top: 0, display: 'flex', alignItems: 'center', gap: 12, opacity: 1 - morning, translate: `0px ${-morning * 30}px`}}>
                <Moon size={36} />
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.white, whiteSpace: 'nowrap'}}>9:04 PM</div>
              </div>
              <div style={{position: 'absolute', right: 0, top: 0, display: 'flex', alignItems: 'center', gap: 12, opacity: morning, translate: `0px ${(1 - morning) * 30}px`}}>
                <Sun size={38} />
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink, whiteSpace: 'nowrap'}}>8:30 AM</div>
              </div>
            </div>
          </div>
          <div style={{padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 18}}>
            <Msg p={1} dark={morning < 0.5} time="Last night, 9:04 PM">
              Can you send me the deck tonight?
            </Msg>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted, textAlign: 'center', opacity: 1 - ez(t, 3.6, 0.3), height: 40}}>Seen. Reply in the morning.</div>
            <div style={{display: 'flex', justifyContent: 'flex-end', opacity: ez(t, 3.7, 0.3)}}>
              <div
                style={{
                  width: 640,
                  minHeight: 96,
                  background: sent ? C.amber : '#FFFFFF',
                  border: sent ? 'none' : '3px solid #E6E0D6',
                  color: C.ink,
                  fontFamily: SANS,
                  fontWeight: 800,
                  fontSize: 38,
                  lineHeight: 1.22,
                  padding: '20px 28px',
                  borderRadius: 28,
                  boxSizing: 'border-box',
                  scale: String(sent ? 0.96 + 0.04 * sentP : 1),
                  transformOrigin: 'right bottom',
                }}
              >
                {typedText(f, STEPS)}
                {caret}
              </div>
            </div>
            <div style={{textAlign: 'right', fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.green, opacity: sentP}}>Sent 8:30 AM</div>
          </div>
        </div>
        {/* result */}
        <div style={{...card, top: 1010, height: 150, padding: '0 40px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', opacity: ez(t, 0.5, 0.5)}}>
          <div style={{position: 'relative', width: 330, height: 64}}>
            <div style={{position: 'absolute', left: 0, top: 4, width: 290, height: 56, borderRadius: 999, border: `3px dashed ${C.muted}`, boxSizing: 'border-box', opacity: 0.5 * (1 - p1)}} />
            <Pill p={p1} bg={C.green} size={32} style={{left: 0, top: 4}}>
              Same answer
            </Pill>
          </div>
          <div style={{position: 'relative', width: 420, height: 64, marginLeft: 'auto'}}>
            <div style={{position: 'absolute', left: 0, top: 4, width: 380, height: 56, borderRadius: 999, border: `3px dashed ${C.muted}`, boxSizing: 'border-box', opacity: 0.5 * (1 - p2)}} />
            <Pill p={p2} bg={C.ink} size={32} style={{left: 0, top: 4}}>
              No new standard
            </Pill>
          </div>
        </div>
      </Push>
      <TypeClicks steps={STEPS} />
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={3.0} name="whoosh" volume={0.18} />
      <Sfx at={5.6} name="send" volume={0.3} />
      <Sfx at={6.64} name="pop" volume={0.28} />
      <Sfx at={7.35} name="ping" volume={0.28} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: answer late messages in the morning.', start: 0.62, end: 3.45, key: 'morning', se: 3.09},
          {text: 'At eight thirty, write "On it. You\'ll have it by noon."', start: 3.54, end: 6.55, key: 'noon', se: 6.01},
          {text: 'Same answer, no new standard.', start: 6.64, end: 8.57, key: 'standard', se: 8.17},
        ]}
      />
    </Paper>
  );
};

import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {CL, Caps, Label, Mark, OUT, Paper, Push, card, ez, useT} from './kit';

/* 5. Move 3: a three line recap email gets written in step with the voice (what changed, what you agreed, the new date), then sent. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const L1 = 'Vendor slipped two weeks.';
const L2 = 'Launch moves to the 20th.';
const L3 = 'Friday the 20th.';
const S1 = [{text: L1, from: 5.0, to: 5.7, mode: 'type' as const}];
const S2 = [{text: L2, from: 5.9, to: 6.6, mode: 'type' as const}];
const S3 = [{text: L3, from: 6.8, to: 7.3, mode: 'type' as const}];
const Field: React.FC<{k: string; v: string}> = ({k, v}) => (
  <div style={{display: 'flex', gap: 18, padding: '16px 0', borderBottom: '2px solid #EEEAE4', fontFamily: SANS, fontSize: 32}}>
    <div style={{width: 120, fontWeight: 700, color: C.muted}}>{k}</div>
    <div style={{fontWeight: 800, color: C.ink, whiteSpace: 'nowrap'}}>{v}</div>
  </div>
);
const Row: React.FC<{k: string; text: string; p: number}> = ({k, text, p}) => (
  <div style={{display: 'flex', alignItems: 'baseline', gap: 18, height: 66, opacity: p, translate: `${(1 - p) * 30}px 0px`}}>
    <div style={{width: 210, flexShrink: 0, fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 1, color: C.amber}}>{k}</div>
    <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.ink, whiteSpace: 'nowrap'}}>{text}</div>
  </div>
);
export const Move3: React.FC = () => {
  const {f, t} = useT();
  const mail = ez(t, 0.3, 0.5);
  const r1 = ez(t, 3.3, 0.35);
  const r2 = ez(t, 3.5, 0.35);
  const r3 = ez(t, 3.7, 0.35);
  const sent = interpolate(t, [7.6, 7.95], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Put it in writing" />
        <div style={{...card, top: 440, height: 720, padding: '30px 44px', boxSizing: 'border-box', opacity: mail, translate: `0px ${(1 - mail) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink, marginBottom: 10}}>New message</div>
          <Field k="To" v="Dana" />
          <Field k="Subject" v="Recap: Atlas launch" />
          <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 34, color: C.ink, marginTop: 30, marginBottom: 20, opacity: ez(t, 3.0, 0.4)}}>Thanks for the quick chat. To recap:</div>
          <Row k="CHANGED" text={typedText(f, S1)} p={r1} />
          <Row k="AGREED" text={typedText(f, S2)} p={r2} />
          <Row k="NEW DATE" text={typedText(f, S3)} p={r3} />
          <div style={{position: 'absolute', right: 44, bottom: 36, display: 'flex', alignItems: 'center', gap: 16}}>
            <div style={{background: sent > 0.5 ? C.green : C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 32, padding: '14px 34px', borderRadius: 999, scale: String(1 + 0.08 * Math.sin(sent * Math.PI))}}>{sent > 0.5 ? 'Sent' : 'Send'}</div>
          </div>
          <div style={{position: 'absolute', left: 44, bottom: 46, fontFamily: SANS, fontWeight: 700, fontSize: 28, color: C.muted, opacity: interpolate(t, [7.9, 8.3], [0, 1], {...CL, easing: OUT})}}>Now it's on record.</div>
        </div>
      </Push>
      <TypeClicks steps={S1} />
      <TypeClicks steps={S2} />
      <TypeClicks steps={S3} />
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={7.6} name="send" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: put it in writing.', start: 0.72, end: 2.8, key: 'writing', se: 2.25},
          {text: 'After the chat, send a three line recap.', start: 2.88, end: 4.95, key: 'recap', se: 4.63},
          {text: 'What changed, what you agreed, the new date.', start: 5.03, end: 7.95, key: 'date', se: 7.33},
        ]}
      />
    </Paper>
  );
};

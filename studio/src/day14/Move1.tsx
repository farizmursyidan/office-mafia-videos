import React from 'react';
import {interpolate} from 'remotion';
import {Underline} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, OUT, Paper, Push, card, ez, float, useT} from './kit';

/* 3. Move 1: help before you need help. Late night DM, you review Raj's deck, he owes you one. */
const Msg: React.FC<{at: number; out?: boolean; children: React.ReactNode}> = ({at, out, children}) => {
  const {t} = useT();
  const p = ez(t, at, 0.45);
  return (
    <div style={{display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start', marginTop: 14, opacity: p, translate: `0px ${(1 - p) * 26}px`}}>
      <div style={{maxWidth: 640, background: out ? C.amber : '#F1ECE4', color: C.ink, fontFamily: SANS, fontWeight: 700, fontSize: 34, lineHeight: 1.22, padding: '16px 24px', borderRadius: 26}}>{children}</div>
    </div>
  );
};
const NOTES = [
  {n: '3', text: 'Lead with the number', at: 4.3},
  {n: '7', text: 'Cut this slide', at: 4.85},
];
export const Move1: React.FC = () => {
  const {t} = useT();
  const deck = ez(t, 3.6, 0.6);
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Help before you need help" />
        <div style={{...card, top: 430, padding: '20px 32px 24px', translate: `0px ${float(t)}px`, opacity: ez(t, 0.1, 0.5)}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 12, borderBottom: '2px solid #EEEAE4'}}>
            <Av i="RA" bg="#5B8C5A" size={60} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>Raj</div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.muted}}>10:42 PM</div>
          </div>
          <Msg at={0.9}>Pitch is tomorrow. Deck is a mess.</Msg>
          <Msg at={2.0} out>
            {"Send it. I'll look tonight."}
          </Msg>
          <Msg at={5.4}>
            {'You saved me. '}
            <Underline color={C.amber} strokeWidth={5} seed={4} progress={interpolate(t, [5.8, 6.3], [0, 1], {...CL, easing: INOUT})}>
              <span>I owe you.</span>
            </Underline>
          </Msg>
        </div>
        <div
          style={{
            ...card,
            top: 905,
            height: 250,
            padding: '20px 30px',
            display: 'flex',
            gap: 26,
            opacity: deck,
            translate: `0px ${(1 - deck) * 70 + float(t, 2)}px`,
          }}
        >
          <div style={{width: 300, height: 206, borderRadius: 16, background: '#24242B', position: 'relative', flexShrink: 0, overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 22, top: 22, fontFamily: SANS, fontWeight: 900, fontSize: 22, color: C.white}}>Q4 PITCH</div>
            {[0, 1, 2].map((k) => (
              <div key={k} style={{position: 'absolute', left: 22, top: 70 + k * 34, height: 16, width: 200 - k * 50, borderRadius: 8, background: 'rgba(255,255,255,0.25)'}} />
            ))}
            <div style={{position: 'absolute', right: 22, bottom: 22, width: 70, height: 90, borderRadius: 8, background: C.amber, opacity: 0.85}} />
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center'}}>
            {NOTES.map((n) => {
              const p = ez(t, n.at, 0.45);
              return (
                <div key={n.n} style={{display: 'flex', alignItems: 'center', gap: 14, opacity: p, translate: `${(1 - p) * 40}px 0px`}}>
                  <div style={{background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 22, borderRadius: 10, padding: '6px 12px', whiteSpace: 'nowrap'}}>SLIDE {n.n}</div>
                  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.ink}}>{n.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Push>
      <Sfx at={0.9} name="ping" volume={0.3} />
      <Sfx at={2.0} name="send" volume={0.32} />
      <Sfx at={3.6} name="pop" volume={0.3} />
      {NOTES.map((n) => (
        <Sfx key={n.n} at={n.at} name="click" volume={0.35} />
      ))}
      <Sfx at={5.4} name="ping" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: help before you need help.', start: 0.6, end: 3.5, key: 'help.', se: 3.08},
          {text: "Review a peer's deck the night before their big presentation.", start: 3.6, end: 6.7, key: 'deck', se: 6.14},
        ]}
      />
    </Paper>
  );
};

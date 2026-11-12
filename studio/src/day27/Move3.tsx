import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Av, CL, Caps, DANA, Label, Mark, OUT, Paper, Push, card, ez, useT} from './kit';

/* 5. Move 3: four Fridays light up one by one, then this Friday's one-line update to Dana gets typed and sent. Dana replies "Noted." */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const FRIS = ['Nov 6', 'Nov 13', 'Nov 20', 'Nov 27'];
const MSG = 'This week I closed the Acme renewal.';
const STEPS = [{text: MSG, from: 6.2, to: 7.35, mode: 'type' as const}];
export const Move3: React.FC = () => {
  const {f, t} = useT();
  const strip = ez(t, 0.3, 0.5);
  const chat = ez(t, 0.6, 0.5);
  const sent = interpolate(t, [7.45, 7.75], [0, 1], {...CL, easing: OUT});
  const reply = interpolate(t, [7.8, 8.1], [0, 1], {...CL, easing: POP});
  const caret = Math.floor(t * 2.5) % 2 === 0 && t < 7.45 ? '|' : '';
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Make her choice easy" />
        {/* Fridays */}
        <div style={{...card, top: 440, height: 230, padding: '28px 40px', boxSizing: 'border-box', opacity: strip, translate: `0px ${(1 - strip) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>EVERY FRIDAY, ONE LINE</div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 22}}>
            {FRIS.map((d, i) => {
              const p = interpolate(t, [3.9 + i * 0.4, 4.25 + i * 0.4], [0, 1], {...CL, easing: POP});
              return (
                <div key={d} style={{width: 186, height: 104, borderRadius: 22, background: p > 0.5 ? C.amber : '#F1EEE9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', scale: String(1 + 0.08 * Math.sin(p * Math.PI))}}>
                  <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>FRI</div>
                  <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, color: p > 0.5 ? C.ink : C.muted}}>{d}</div>
                </div>
              );
            })}
          </div>
        </div>
        {/* chat with Dana */}
        <div style={{...card, top: 710, height: 450, padding: '30px 40px', boxSizing: 'border-box', opacity: chat, translate: `0px ${(1 - chat) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, paddingBottom: 20, borderBottom: '2px solid #EEEAE4'}}>
            <Av i="DA" bg={DANA.shirt} size={64} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>Dana (boss)</div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.muted}}>Fri 4:30</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 28}}>
            <div style={{width: 640, minHeight: 116, background: t >= 6.1 ? C.amber : '#F1EEE9', color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 40, lineHeight: 1.25, padding: '20px 30px', borderRadius: 28, boxSizing: 'border-box'}}>
              {t < 6.1 ? <span style={{color: C.muted, fontWeight: 700}}>Write one line...</span> : (
                <>
                  {typedText(f, STEPS)}
                  {caret}
                </>
              )}
            </div>
          </div>
          <div style={{textAlign: 'right', marginTop: 10, fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.green, opacity: sent}}>Sent</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 4, opacity: Math.min(1, reply * 1.5), scale: String(0.8 + 0.2 * reply), transformOrigin: 'left center'}}>
            <Av i="DA" bg={DANA.shirt} size={52} />
            <div style={{background: '#F1EEE9', color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 34, padding: '14px 26px', borderRadius: 24}}>Noted. Nice work.</div>
          </div>
        </div>
      </Push>
      <TypeClicks steps={STEPS} />
      <Sfx at={0.3} name="blip" volume={0.26} />
      {FRIS.map((d, i) => (
        <Sfx key={d} at={3.9 + i * 0.4} name="click" volume={0.24} />
      ))}
      <Sfx at={7.45} name="send" volume={0.3} />
      <Sfx at={7.8} name="ping" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: "Move three: make your boss's choice easy.", start: 0.59, end: 3.8, key: 'easy', se: 3.27},
          {text: 'Every Friday, send one line.', start: 3.88, end: 6.15, key: 'Friday', se: 5.58},
          {text: '"This week I closed the Acme renewal."', start: 6.24, end: 8.7, key: 'closed', se: 7.74},
        ]}
      />
    </Paper>
  );
};

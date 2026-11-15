import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, Paper, Push, RAJ, YOU, card, ez, useT} from './kit';

/* 3. Move 1: the handover list. The two open tickets get "Sam", the Acme client stays "Yours" (highlighted).
   Below, your email to the client types out: "I'm back on the 12th. Sam has the small stuff." */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const ROWS = [
  {name: 'Ticket 482: invoice fix', to: 'sam', at: 3.7},
  {name: 'Ticket 487: report export', to: 'sam', at: 4.15},
  {name: 'Acme client', to: 'you', at: 5.6},
];
const MAIL = "I'm back on the 12th. Sam has the small stuff.";
const STEPS = [{text: MAIL, from: 6.93, to: 9.6, mode: 'type' as const}];
export const Move1: React.FC = () => {
  const {f, t} = useT();
  const list = ez(t, 0.2, 0.5);
  const mail = ez(t, 0.5, 0.5);
  const hl = interpolate(t, [5.9, 6.5], [0, 1], {...CL, easing: INOUT});
  const caret = Math.floor(t * 2.5) % 2 === 0 ? '|' : '';
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Tasks, not clients" />
        {/* handover list */}
        <div style={{...card, top: 440, height: 340, padding: '26px 40px', boxSizing: 'border-box', opacity: list, translate: `0px ${(1 - list) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>HANDOVER LIST</div>
          <div style={{marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14}}>
            {ROWS.map((r, i) => {
              const p = interpolate(t, [r.at, r.at + 0.35], [0, 1], {...CL, easing: POP});
              const isYou = r.to === 'you';
              const label = (
                <span style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink, whiteSpace: 'nowrap', padding: '0 6px'}}>{r.name}</span>
              );
              return (
                <div key={r.name} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70, borderBottom: i < 2 ? '2px solid #EEEAE4' : 'none'}}>
                  {isYou ? (
                    <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={5} padding={{left: 6, right: 6, top: 0, bottom: 0}} progress={hl}>
                      {label}
                    </Highlight>
                  ) : (
                    label
                  )}
                  <div style={{position: 'relative', width: 170, height: 58}}>
                    <div style={{position: 'absolute', right: 0, top: 0, width: 160, height: 58, borderRadius: 29, border: `3px dashed ${C.muted}`, boxSizing: 'border-box', opacity: 0.5 * (1 - p)}} />
                    <div style={{position: 'absolute', right: 0, top: 0, display: 'flex', alignItems: 'center', gap: 10, opacity: p, scale: String(0.85 + 0.15 * p), transformOrigin: 'right center'}}>
                      {isYou ? <Av i="YOU" bg={YOU.shirt} size={52} fg={C.ink} /> : <Av i="SA" bg={RAJ.shirt} size={52} />}
                      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: isYou ? C.amber : C.ink, whiteSpace: 'nowrap'}}>{isYou ? 'Yours' : 'Sam'}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* email to the client */}
        <div style={{...card, top: 810, height: 330, padding: '26px 40px', boxSizing: 'border-box', opacity: mail, translate: `0px ${(1 - mail) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <Av i="PR" bg="#B5523F" size={56} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>To: Priya, Acme</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted}}>Subject: Next week</div>
            </div>
          </div>
          <div style={{marginTop: 24, background: '#F6F2EC', borderRadius: 20, padding: '18px 26px', minHeight: 140, boxSizing: 'border-box', fontFamily: SANS, fontWeight: 800, fontSize: 38, lineHeight: 1.25, color: C.ink}}>
            {t < 6.93 ? <span style={{color: '#B9B2A8'}}>Write a message</span> : typedText(f, STEPS)}
            {t >= 6.93 ? caret : ''}
          </div>
        </div>
      </Push>
      <TypeClicks steps={STEPS} />
      <Sfx at={0.3} name="blip" volume={0.26} />
      {ROWS.map((r) => (
        <Sfx key={r.name} at={r.at} name="pop" volume={0.22} />
      ))}
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: hand over tasks, not relationships.', start: 0.63, end: 3.62, key: 'tasks relationships', se: 3.57},
          {text: 'Give them the open tickets,', start: 3.64, end: 5.4, key: 'tickets', se: 5.31},
          {text: 'but tell your biggest client,', start: 5.54, end: 6.82, key: 'biggest client', se: 6.7},
          {text: '"I\'m back on the twelfth.', start: 6.93, end: 8.08, key: 'twelfth', se: 7.89},
          {text: 'Sam has the small stuff."', start: 8.18, end: 10.2, key: 'small', se: 9.71},
        ]}
      />
    </Paper>
  );
};

import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, Label, Mark, PRIYA, Paper, Pill, Push, RAJ, TOM, card, ez, useT} from './kit';

/* 5. Move 3: an ally map with one empty slot per department. Finance, Sales and IT fill in as they are named. Then your request goes out and Priya from Finance answers first. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const ROWS = [
  {dept: 'FINANCE', i: 'PR', name: 'Priya', bg: PRIYA.shirt, at: 4.3},
  {dept: 'SALES', i: 'RA', name: 'Raj', bg: RAJ.shirt, at: 5.45},
  {dept: 'IT', i: 'TO', name: 'Tom', bg: TOM.shirt, at: 6.0},
];
export const Move3: React.FC = () => {
  const {t} = useT();
  const map = ez(t, 0.3, 0.5);
  const ask = ez(t, 6.6, 0.45);
  const reply = interpolate(t, [7.5, 7.85], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="One ally per team" />
        <div style={{...card, top: 440, height: 480, padding: '28px 40px', boxSizing: 'border-box', opacity: map, translate: `0px ${(1 - map) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 2, color: C.muted, marginBottom: 10}}>YOUR ALLIES</div>
          {ROWS.map((r, k) => {
            const p = interpolate(t, [r.at, r.at + 0.35], [0, 1], {...CL, easing: POP});
            const row = ez(t, 0.6 + k * 0.15, 0.4);
            return (
              <div key={r.dept} style={{display: 'flex', alignItems: 'center', gap: 26, height: 128, borderBottom: k < 2 ? '2px solid #EEEAE4' : 'none', opacity: row, translate: `${(1 - row) * 30}px 0px`}}>
                <div style={{width: 200, fontFamily: SANS, fontWeight: 900, fontSize: 32, letterSpacing: 2, color: C.amber}}>{r.dept}</div>
                <div style={{position: 'relative', width: 88, height: 88}}>
                  <div style={{position: 'absolute', inset: 0, opacity: 1 - p}}>
                    <Av i="?" bg="transparent" size={88} dashed />
                  </div>
                  <div style={{position: 'absolute', inset: 0, opacity: p, scale: String(0.6 + 0.4 * p)}}>
                    <Av i={r.i} bg={r.bg} size={88} />
                  </div>
                </div>
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink, opacity: p}}>{r.name}</div>
                <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.green, opacity: p, whiteSpace: 'nowrap'}}>✓ Ally</div>
              </div>
            );
          })}
        </div>
        {/* the ask */}
        <div style={{...card, top: 960, height: 200, padding: '24px 36px', boxSizing: 'border-box', opacity: ask, translate: `0px ${(1 - ask) * 40}px`}}>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <div style={{background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 32, padding: '12px 24px', borderRadius: 22, whiteSpace: 'nowrap'}}>Can someone approve this today?</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 16, opacity: reply, translate: `0px ${(1 - reply) * 16}px`}}>
            <Av i="PR" bg={PRIYA.shirt} size={56} />
            <div style={{background: '#F1EEE9', color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 32, padding: '12px 24px', borderRadius: 22, whiteSpace: 'nowrap'}}>Done. Approved.</div>
            <Pill p={reply} bg={C.green} size={26} style={{position: 'relative', marginLeft: 6}}>
              FIRST REPLY
            </Pill>
          </div>
        </div>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={4.3} name="pop" volume={0.28} />
      <Sfx at={5.45} name="pop" volume={0.28} />
      <Sfx at={6.0} name="pop" volume={0.28} />
      <Sfx at={6.6} name="send" volume={0.28} />
      <Sfx at={7.5} name="ping" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: build one ally in every department.', start: 0.66, end: 3.95, key: 'ally', se: 3.43},
          {text: 'Someone in finance, sales and IT', start: 4.0, end: 6.32, key: 'finance', se: 6.28},
          {text: 'who answers your message first.', start: 6.35, end: 9.1, key: 'first', se: 8.17},
        ]}
      />
    </Paper>
  );
};

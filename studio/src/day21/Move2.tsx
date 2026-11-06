import React from 'react';
import {Easing, interpolate} from 'remotion';
import {StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Label, Mark, OUT, Paper, Push, card, ez, useT} from './kit';

/* 4. Move 2: the brief's three lines fill in with nothing, the priority gets crossed out, and it gets parked. */
const ROWS = [
  {k: 'Budget', v: '$0', at: 2.43},
  {k: 'Headcount', v: 'Just you', at: 3.3},
  {k: 'Launch date', v: 'TBD', at: 4.27},
];
export const Move2: React.FC = () => {
  const {t} = useT();
  const page = ez(t, 0.2, 0.55);
  const stamp = interpolate(t, [6.99, 7.29], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Check the budget" />
        <div style={{...card, top: 430, height: 700, padding: '26px 34px', opacity: page, translate: `0px ${(1 - page) * 50}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>PROJECT BRIEF</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 52, color: C.ink, marginTop: 8, whiteSpace: 'nowrap'}}>Your special project</div>
          <div style={{marginTop: 20, borderTop: '2px solid #EEEAE4'}}>
            {ROWS.map((r) => {
              const p = ez(t, r.at, 0.35);
              return (
                <div key={r.k} style={{height: 122, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #EEEAE4'}}>
                  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, color: C.ink, whiteSpace: 'nowrap'}}>{r.k}</div>
                  <div style={{position: 'relative', width: 280, height: 64}}>
                    <div style={{position: 'absolute', right: 0, top: 0, fontFamily: SANS, fontWeight: 800, fontSize: 44, color: '#CFC8BC', opacity: 1 - p}}>?</div>
                    <div style={{position: 'absolute', right: 0, top: 0, fontFamily: SANS, fontWeight: 900, fontSize: 48, color: C.red, whiteSpace: 'nowrap', opacity: p, translate: `${(1 - p) * 16}px 0px`}}>{r.v}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 170, opacity: ez(t, 0.8, 0.4)}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, color: C.ink, whiteSpace: 'nowrap'}}>Priority</div>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 48, color: C.ink, whiteSpace: 'nowrap'}}>
              <StrikeThrough color={C.red} strokeWidth={7} seed={4} progress={interpolate(t, [5.61, 6.2], [0, 1], {...CL, easing: INOUT})}>
                <span>Top priority</span>
              </StrikeThrough>
            </div>
          </div>
          {stamp > 0 && (
            <div style={{position: 'absolute', right: 34, top: 22, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-4deg', scale: String(interpolate(t, [6.99, 7.29], [1.5, 1], {...CL, easing: OUT})), display: 'flex', alignItems: 'center', gap: 12, background: C.white, border: '5px solid #3F6FB5', borderRadius: 14, padding: '4px 14px'}}>
              <div style={{width: 46, height: 46, background: '#3F6FB5', borderRadius: 8, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 34, lineHeight: '46px', textAlign: 'center'}}>P</div>
              <div style={{color: '#3F6FB5', fontFamily: SANS, fontWeight: 900, fontSize: 34, letterSpacing: 3}}>PARKED</div>
            </div>
          )}
        </div>
      </Push>
      <Sfx at={2.43} name="click" volume={0.28} />
      <Sfx at={3.3} name="click" volume={0.28} />
      <Sfx at={4.27} name="click" volume={0.28} />
      <Sfx at={5.61} name="click" volume={0.28} />
      <Sfx at={6.99} name="hit" volume={0.4} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: check the budget.', start: 0.42, end: 2.3, key: 'budget', se: 1.82},
          {text: 'No money, no headcount, no launch date?', start: 2.43, end: 5.45, key: 'money', se: 5.06},
          {text: "That's not a priority.", start: 5.61, end: 6.9, key: 'priority', se: 6.52},
          {text: "That's a parking spot.", start: 6.99, end: 8.4, key: 'parking', se: 7.78},
        ]}
      />
    </Paper>
  );
};

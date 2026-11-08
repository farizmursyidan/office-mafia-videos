import React from 'react';
import {Easing, interpolate} from 'remotion';
import {StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Label, Mark, OUT, Paper, Push, card, ez, useT} from './kit';

/* 4. Move 2: the raise pool drains month by month until March, then rewinds to the fall when the money is still there. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const MONTHS = ['OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'];
export const Move2: React.FC = () => {
  const {t} = useT();
  const pool = ez(t, 0.4, 0.5);
  const drain = interpolate(t, [1.2, 3.4], [0, 1], {...CL, easing: INOUT});
  const rewind = interpolate(t, [5.39, 6.3], [0, 1], {...CL, easing: INOUT});
  const pos = drain * (1 - rewind);
  const level = 1 - pos;
  const month = MONTHS[Math.min(5, Math.round(pos * 5))];
  const late = ez(t, 3.72, 0.45);
  const strike = interpolate(t, [4.3, 4.9], [0, 1], {...CL, easing: INOUT});
  const early = ez(t, 5.6, 0.45);
  const check = interpolate(t, [6.3, 6.6], [0, 1], {...CL, easing: POP});
  const barColor = level > 0.35 ? C.green : level > 0.1 ? C.amber : C.red;
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Ask before it closes" />
        <div style={{...card, top: 440, height: 300, padding: '26px 34px', boxSizing: 'border-box', opacity: pool, translate: `0px ${(1 - pool) * 40}px`}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>TEAM RAISE BUDGET</div>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink, background: 'rgba(224,169,59,0.3)', padding: '4px 16px', borderRadius: 10, minWidth: 80, textAlign: 'center'}}>{month}</div>
          </div>
          <div style={{marginTop: 34, height: 70, borderRadius: 18, background: '#EEEAE4', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.max(0, level) * 100}%`, background: barColor, borderRadius: 18}} />
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 18, fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.ink}}>
            <span style={{whiteSpace: 'nowrap'}}>${Math.round(level * 60)}k left</span>
            <span style={{whiteSpace: 'nowrap', color: level < 0.05 ? C.red : C.muted}}>{level < 0.05 ? 'Closed' : 'Open'}</span>
          </div>
        </div>
        <div style={{...card, top: 780, height: 150, padding: '0 34px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 24, opacity: late * (1 - 0.4 * strike), translate: `0px ${(1 - late) * 30}px`}}>
          <div style={{width: 70, height: 70, borderRadius: '50%', background: C.red, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>×</div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 46, color: C.ink, whiteSpace: 'nowrap'}}>
            <StrikeThrough color={C.red} strokeWidth={6} seed={5} progress={strike}>
              <span>Ask at your review in March</span>
            </StrikeThrough>
          </div>
        </div>
        <div style={{...card, top: 960, height: 150, padding: '0 34px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 24, opacity: early, translate: `0px ${(1 - early) * 30}px`, border: `4px solid ${C.green}`}}>
          <div style={{width: 70, height: 70, borderRadius: '50%', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <svg width={40} height={40} viewBox="0 0 36 36" style={{opacity: check, scale: String(0.6 + 0.4 * check)}}>
              <path d="M6 19 L14 27 L30 9" stroke={C.white} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 46, color: C.ink, whiteSpace: 'nowrap'}}>Ask in the fall</div>
        </div>
      </Push>
      <Sfx at={0.4} name="blip" volume={0.28} />
      <Sfx at={3.3} name="lock" volume={0.3} />
      <Sfx at={3.72} name="pop" volume={0.3} />
      <Sfx at={4.3} name="snip" volume={0.28} />
      <Sfx at={5.39} name="whoosh" volume={0.2} />
      <Sfx at={6.3} name="ping" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: ask before the budget closes.', start: 0.65, end: 3.6, key: 'before closes', se: 3.5},
          {text: 'Not at your review in March.', start: 3.72, end: 5.2, key: 'not', se: 4.96},
          {text: "In the fall, while there's still money on the table.", start: 5.39, end: 7.8, key: 'fall money', se: 7.3},
        ]}
      />
    </Paper>
  );
};

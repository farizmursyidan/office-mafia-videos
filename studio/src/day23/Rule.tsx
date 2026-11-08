import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Mark, Night, OUT, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: a year timeline. Your review sits in March, but the raise was locked in October when the budget was set. */
const MONTHS = ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'];
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const X0 = 70;
const STEP = 120;
export const Rule: React.FC = () => {
  const {t} = useT();
  const line = interpolate(t, [0.2, 1.4], [0, 1], {...CL, easing: INOUT});
  const rev = ez(t, 2.2, 0.5);
  const dim = interpolate(t, [4.45, 4.9], [0, 1], {...CL, easing: INOUT});
  const bud = ez(t, 4.45, 0.5);
  const lock = interpolate(t, [5.4, 5.7], [0, 1], {...CL, easing: POP});
  const arrow = interpolate(t, [5.9, 6.6], [0, 1], {...CL, easing: INOUT});
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 210, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.3)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{position: 'relative', marginTop: 30, height: 200}}>
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, opacity: 1 - ez(t, 4.3, 0.25)}}>
            <Reveal at={2.01} se={3.6} size={92}>
              Not at your review.
            </Reveal>
          </div>
          {t >= 4.35 && (
            <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
              <Reveal at={4.45} se={6.3} size={92} color={C.amber} italic mark={{word: 'budget', color: C.white, at: 5.6}}>
                When the budget gets set.
              </Reveal>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 60,
          right: 60,
          top: 560,
          height: 560,
          borderRadius: 30,
          background: C.nightSoft,
          border: '3px solid rgba(255,255,255,0.12)',
          boxShadow: '0 30px 70px rgba(0,0,0,0.45)',
          opacity: ez(t, 0.1, 0.5),
          translate: `0px ${(1 - ez(t, 0.1, 0.6)) * 40}px`,
        }}
      >
        <div style={{position: 'absolute', top: 30, left: 36, fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: 'rgba(255,255,255,0.55)'}}>HOW YOUR RAISE GETS DECIDED</div>
        <svg width={960} height={560} style={{position: 'absolute', left: 0, top: 0}}>
          <line x1={X0} y1={330} x2={X0 + (MONTHS.length - 1) * STEP * line + 1} y2={330} stroke="rgba(255,255,255,0.35)" strokeWidth={6} strokeLinecap="round" />
          {MONTHS.map((m, i) => {
            const p = ez(t, 0.25 + i * 0.12, 0.35);
            return (
              <g key={m} opacity={p}>
                <circle cx={X0 + i * STEP} cy={330} r={12} fill={i === 1 ? C.amber : i === 6 ? C.white : 'rgba(255,255,255,0.5)'} />
                <text x={X0 + i * STEP} y={390} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={30} fill="rgba(255,255,255,0.75)">
                  {m}
                </text>
              </g>
            );
          })}
          {arrow > 0 && (
            <path
              d={`M ${X0 + STEP} 300 C ${X0 + STEP + 120} 200, ${X0 + 6 * STEP - 160} 200, ${X0 + 6 * STEP - 14} 292`}
              stroke={C.amber}
              strokeWidth={6}
              strokeDasharray="1 1"
              pathLength={1}
              strokeDashoffset={1 - arrow}
              fill="none"
              strokeLinecap="round"
            />
          )}
        </svg>
        <div style={{position: 'absolute', left: X0 + 6 * STEP - 150, width: 300, top: 420, textAlign: 'center', opacity: rev * (1 - 0.55 * dim), translate: `0px ${(1 - rev) * 20}px`}}>
          <div style={{display: 'inline-block', background: C.white, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 32, padding: '8px 20px', borderRadius: 14, whiteSpace: 'nowrap'}}>Your review</div>
          <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 26, color: 'rgba(255,255,255,0.7)', marginTop: 8, opacity: dim, whiteSpace: 'nowrap'}}>just the reading</div>
        </div>
        <div style={{position: 'absolute', left: X0 + STEP - 40, top: 420, opacity: bud, translate: `0px ${(1 - bud) * 20}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 32, padding: '8px 20px', borderRadius: 14, whiteSpace: 'nowrap'}}>
            Budget set
            {lock > 0 && (
              <svg width={34} height={38} viewBox="0 0 34 38" style={{opacity: interpolate(lock, [0, 0.4], [0, 1], CL), scale: String(interpolate(t, [5.4, 5.7], [1.5, 1], {...CL, easing: OUT}))}}>
                <rect x={3} y={16} width={28} height={20} rx={4} fill={C.ink} />
                <path d="M9 16 V11 a8 8 0 0 1 16 0 V16" stroke={C.ink} strokeWidth={5} fill="none" />
              </svg>
            )}
          </div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.amber, marginTop: 8, whiteSpace: 'nowrap'}}>decided here</div>
        </div>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={2.2} name="click" volume={0.28} />
      <Sfx at={4.45} name="pop" volume={0.3} />
      <Sfx at={5.4} name="lock" volume={0.34} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.6, end: 1.9, key: 'rule', se: 1.7},
          {text: "Raises aren't decided at your review.", start: 2.01, end: 4.3, key: 'review', se: 4.1},
          {text: "They're decided months earlier, when the budget gets set.", start: 4.45, end: 7.15, key: 'budget', se: 6.64},
        ]}
      />
    </Night>
  );
};

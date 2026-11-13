import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Mark, Night, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: your reply time is a promise. A stopwatch runs to 2 minutes once, then the same "2 min" copies itself onto every night of Dana's expectations and gets stamped THE STANDARD. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const NIGHTS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const Rule: React.FC = () => {
  const {t} = useT();
  const once = ez(t, 0.2, 0.5);
  const run = interpolate(t, [0.6, 3.6], [0, 1], {...CL, easing: INOUT});
  const exp = ez(t, 4.3, 0.5);
  const stamp = interpolate(t, [6.3, 6.6], [0, 1], {...CL, easing: POP});
  const secs = Math.round(run * 120);
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 200, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.2)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26}}>
          <Reveal at={2.25} se={3.98} size={88} mark={{word: 'promise.', color: C.amber, at: 3.9}}>
            Your reply time is a promise.
          </Reveal>
        </div>
      </div>
      {/* once */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 470, height: 250, borderRadius: 30, background: C.nightSoft, border: '3px solid rgba(255,255,255,0.12)', padding: '26px 36px', boxSizing: 'border-box', opacity: once, translate: `0px ${(1 - once) * 40}px`}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>YOU, ONCE, AT 9:04 PM</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 36, marginTop: 22}}>
          <svg width={120} height={120} viewBox="0 0 120 120">
            <rect x={50} y={4} width={20} height={12} rx={4} fill={C.muted} />
            <circle cx={60} cy={66} r={48} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={10} />
            <circle cx={60} cy={66} r={48} fill="none" stroke={C.amber} strokeWidth={10} strokeDasharray={`${run * 301.6} 301.6`} transform="rotate(-90 60 66)" strokeLinecap="round" />
            <line x1={60} y1={66} x2={60 + 34 * Math.sin(run * Math.PI * 2)} y2={66 - 34 * Math.cos(run * Math.PI * 2)} stroke={C.white} strokeWidth={6} strokeLinecap="round" />
          </svg>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 96, color: C.white, fontVariantNumeric: 'tabular-nums'}}>
            {Math.floor(secs / 60)}:{String(secs % 60).padStart(2, '0')}
          </div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.amber, opacity: ez(t, 3.6, 0.3)}}>Replied.</div>
        </div>
      </div>
      {/* expectation */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 760, height: 400, borderRadius: 30, background: C.nightSoft, border: `3px solid ${C.amber}`, padding: '26px 36px', boxSizing: 'border-box', opacity: exp, translate: `0px ${(1 - exp) * 40}px`}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.amber}}>WHAT DANA EXPECTS NOW</div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 30}}>
          {NIGHTS.map((n, i) => {
            const p = interpolate(t, [4.7 + i * 0.25, 5.05 + i * 0.25], [0, 1], {...CL, easing: POP});
            return (
              <div key={n} style={{width: 150, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
                <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted}}>{n}</div>
                <div style={{width: 146, height: 84, borderRadius: 20, background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: Math.min(1, p * 1.5), scale: String(0.7 + 0.3 * p)}}>
                  2 min
                </div>
              </div>
            );
          })}
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 40}}>
          <div
            style={{
              border: `6px solid ${C.red}`,
              color: C.red,
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: 54,
              letterSpacing: 6,
              padding: '6px 28px',
              borderRadius: 14,
              rotate: '-4deg',
              opacity: Math.min(1, stamp * 1.4),
              scale: String(interpolate(stamp, [0, 1], [1.6, 1])),
            }}
          >
            THE STANDARD
          </div>
        </div>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={3.6} name="ping" volume={0.26} />
      {NIGHTS.map((n, i) => (
        <Sfx key={n} at={4.7 + i * 0.25} name="click" volume={0.22} />
      ))}
      <Sfx at={6.3} name="hit" volume={0.32} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.63, end: 2.15, key: 'rule', se: 1.72},
          {text: 'Your reply time is a promise.', start: 2.25, end: 4.5, key: 'promise', se: 3.98},
          {text: 'The speed you show once becomes the standard.', start: 4.59, end: 7.33, key: 'once standard', se: 6.83},
        ]}
      />
    </Night>
  );
};

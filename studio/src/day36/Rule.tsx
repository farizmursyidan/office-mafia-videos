import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Mark, Night, TOM, YOU, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: two task columns, "Dan's tasks" and "Your job". While the voice says "fix someone's work in silence",
   Dan's tasks slide one by one into your column, quietly (a "muted" icon). Your column grows, his empties,
   and a "Now yours" stamp lands on the moved tasks. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const MOVED = ['Client section', 'Budget slide', 'Follow up email'];
const MINE = ['Research', 'Data'];
const chip: React.CSSProperties = {height: 64, borderRadius: 16, display: 'flex', alignItems: 'center', padding: '0 20px', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.ink, whiteSpace: 'nowrap', boxSizing: 'border-box'};

export const Rule: React.FC = () => {
  const {t} = useT();
  const panel = ez(t, 0.15, 0.55);
  const stamp = interpolate(t, [5.6, 5.95], [0, 1], {...CL, easing: POP});
  const hush = ez(t, 2.4, 0.4);
  // column geometry inside the panel
  const LX = 36;
  const RX = 500;
  const TOP = 120;
  const ROW = 80;
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 200, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.2)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26, maxWidth: 900}}>
          <Reveal at={4.57} se={6.77} size={70} mark={{word: 'job.', color: C.amber, at: 6.6}}>
            Their problem becomes your job.
          </Reveal>
        </div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 520, height: 600, borderRadius: 30, background: C.paper, overflow: 'hidden', opacity: panel, translate: `0px ${(1 - panel) * 40}px`}}>
        {/* headers */}
        <div style={{position: 'absolute', left: LX, top: 34, display: 'flex', alignItems: 'center', gap: 14}}>
          <Av i="DA" bg={TOM.shirt} size={50} />
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>Dan's tasks</div>
        </div>
        <div style={{position: 'absolute', left: RX, top: 34, display: 'flex', alignItems: 'center', gap: 14}}>
          <Av i="YOU" bg={YOU.shirt} size={50} fg={C.ink} />
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>Your job</div>
        </div>
        <div style={{position: 'absolute', left: 480, top: 110, bottom: 40, width: 3, background: '#D6CCBD'}} />
        {/* your own tasks */}
        {MINE.map((m, k) => (
          <div key={m} style={{...chip, position: 'absolute', left: RX, top: TOP + k * ROW, width: 410, background: C.white}}>
            {m}
          </div>
        ))}
        {/* Dan's tasks slide across, one by one, while you fix them in silence */}
        {MOVED.map((m, k) => {
          const p = interpolate(t, [2.6 + k * 0.6, 3.3 + k * 0.6], [0, 1], {...CL, easing: INOUT});
          const x = LX + (RX - LX) * p;
          const y = TOP + k * ROW + (MINE.length * ROW) * p;
          return (
            <div key={m} style={{...chip, position: 'absolute', left: x, top: y, width: 410, background: p > 0.5 ? 'rgba(224,169,59,0.35)' : C.white, justifyContent: 'space-between'}}>
              <span>{m}</span>
              <span style={{fontSize: 20, letterSpacing: 1, color: C.red, opacity: stamp, scale: String(0.8 + 0.2 * stamp)}}>NOW YOURS</span>
            </div>
          );
        })}
        {/* "in silence" marker */}
        <div style={{position: 'absolute', left: LX, bottom: 36, display: 'flex', alignItems: 'center', gap: 12, opacity: hush, fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.muted}}>
          <svg width={34} height={34} viewBox="0 0 34 34">
            <path d="M4 13 L10 13 L17 6 L17 28 L10 21 L4 21 Z" fill={C.muted} />
            <path d="M22 12 L30 22 M30 12 L22 22" stroke={C.red} strokeWidth={3.5} strokeLinecap="round" />
          </svg>
          Nobody was told
        </div>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      {MOVED.map((_, k) => (
        <Sfx key={k} at={2.6 + k * 0.6} name="click" volume={0.18} />
      ))}
      <Sfx at={5.6} name="hit" volume={0.2} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.35, end: 2.3, key: 'rule', se: 1.83},
          {text: "When you fix someone's work in silence,", start: 2.35, end: 4.52, key: 'silence', se: 4.4},
          {text: 'their problem quietly becomes your job.', start: 4.57, end: 7.2, key: 'your job', se: 6.77},
        ]}
      />
    </Night>
  );
};

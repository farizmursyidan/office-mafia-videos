import React from 'react';
import {interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Mark, Night, Pill, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: a pecking order of whose ideas come first. Let one interruption slide and YOU drops to the bottom. */
const ROW_H = 150;
const GAP = 18;
const TOP = 560;
const rows = [
  {id: 'you', label: 'Your idea', i: 'YOU', bg: C.amber, fg: C.ink, a: 0, b: 2},
  {id: 'mark', label: "Mark's idea", i: 'MA', bg: '#3F6FB5', fg: C.white, a: 1, b: 0},
  {id: 'dana', label: "Dana's idea", i: 'DA', bg: '#B5523F', fg: C.white, a: 2, b: 1},
];

export const Rule: React.FC = () => {
  const {t} = useT();
  const slide = interpolate(t, [4.75, 5.55], [0, 1], {...CL, easing: INOUT});
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 210, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.45), marginBottom: 18}}>THE RULE NOBODY TELLS YOU</div>
        <Reveal at={2.37} se={4.09} size={96} mark={{word: 'test.', color: C.amber, at: 3.9}}>
          Every interruption is a test.
        </Reveal>
      </div>
      <div style={{position: 'absolute', left: 80, right: 80, top: TOP - 8, opacity: ez(t, 0.3, 0.6)}}>
        {rows.map((r, n) => (
          <div key={n} style={{position: 'absolute', left: 0, top: 8 + n * (ROW_H + GAP), height: ROW_H, width: 70, display: 'flex', alignItems: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 54, color: 'rgba(255,255,255,0.3)'}}>{n + 1}</div>
        ))}
        {rows.map((r) => {
          const pos = r.a + (r.b - r.a) * slide;
          const you = r.id === 'you';
          return (
            <div
              key={r.id}
              style={{
                position: 'absolute',
                left: 76,
                right: 0,
                top: 8 + pos * (ROW_H + GAP),
                height: ROW_H,
                borderRadius: 26,
                background: C.nightSoft,
                border: `3px solid ${you ? C.amber : 'rgba(255,255,255,0.12)'}`,
                boxSizing: 'border-box',
                padding: '0 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                zIndex: you ? 2 : 1,
              }}
            >
              <Av i={r.i} bg={r.bg} fg={r.fg} size={88} />
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, color: C.white}}>{r.label}</div>
            </div>
          );
        })}
        <Pill p={ez(t, 6.75, 0.45)} bg={C.red} size={32} style={{right: 26, top: 8 + 2 * (ROW_H + GAP) + 46, zIndex: 3}}>
          CAN WAIT
        </Pill>
      </div>
      <Sfx at={4.75} name="whoosh" volume={0.3} />
      <Sfx at={6.75} name="hit" volume={0.4} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.45, end: 2.3, key: 'rule', se: 1.9},
          {text: 'Every interruption is a test.', start: 2.37, end: 4.6, key: 'test', se: 4.09},
          {text: 'Let one slide,', start: 4.69, end: 5.68, key: 'slide', se: 5.62},
          {text: 'and the room learns your ideas can wait.', start: 5.75, end: 8.45, key: 'wait', se: 7.43},
        ]}
      />
    </Night>
  );
};

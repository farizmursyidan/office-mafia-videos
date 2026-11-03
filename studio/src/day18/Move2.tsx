import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS, SERIF} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, OUT, Paper, Push, card, ez, float, useT} from './kit';

/* 4. Move 2: you ask the question, the answer goes in the notebook, and the notebook becomes the real job description. */
const Q = 'What would make your first 90 days great?';
const NOTES = [
  {n: '1.', w: 'Renewals dashboard by January', at: 5.0},
  {n: '2.', w: 'No surprises in the board deck', at: 5.6},
  {n: '3.', w: 'Fix the weekly report', at: 6.2},
];
export const Move2: React.FC = () => {
  const {t} = useT();
  const q = ez(t, 0.2, 0.55);
  const typed = Math.floor(interpolate(t, [3.06, 4.7], [0, Q.length], CL));
  const book = ez(t, 0.45, 0.55);
  const mark = 1 - ez(t, 4.6, 0.4);
  const stamp = interpolate(t, [7.3, 7.6], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Ask what winning means" />
        <div style={{...card, top: 430, height: 200, padding: '24px 32px', display: 'flex', alignItems: 'flex-start', gap: 22, opacity: q, translate: `0px ${(1 - q) * 50 + float(t)}px`}}>
          <Av i="YOU" bg={C.amber} fg={C.ink} size={84} />
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, lineHeight: 1.18, color: C.ink, flex: 1}}>
            <div style={{fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 6}}>YOUR FIRST 1:1</div>
            {Q.slice(0, typed)}
            {typed < Q.length && t > 0.6 ? <span style={{opacity: Math.sin(t * 12) > 0 ? 1 : 0.15}}>|</span> : null}
          </div>
        </div>
        <div
          style={{
            ...card,
            top: 660,
            height: 480,
            padding: '28px 40px',
            background: '#FBF6E9',
            opacity: book,
            translate: `0px ${(1 - book) * 60}px`,
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 86px, rgba(63,111,181,0.22) 86px, rgba(63,111,181,0.22) 89px)',
            backgroundPosition: '0 60px',
          }}
        >
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 3, color: C.muted, height: 62}}>{'WHAT PRIYA WANTS'}</div>
          {mark > 0 && <div style={{position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center', fontFamily: SERIF, fontSize: 300, lineHeight: 1, color: C.amber, opacity: mark, rotate: `${Math.sin(t * 1.6) * 3}deg`}}>?</div>}
          {NOTES.map((r, i) => {
            const p = ez(t, r.at, 0.4, OUT);
            return (
              <div key={r.n} style={{fontFamily: SERIF, fontStyle: 'italic', fontSize: 62, lineHeight: '89px', color: C.ink, opacity: p, translate: `${(1 - p) * -24}px 0px`, whiteSpace: 'nowrap'}}>
                <span style={{color: C.amber, marginRight: 14}}>{r.n}</span>
                {i === 2 ? (
                  <Highlight color="rgba(224,169,59,0.7)" iterations={1} seed={4} padding={{left: 2, right: 2, top: 0, bottom: 0}} progress={interpolate(t, [7.0, 7.4], [0, 1], {...CL, easing: INOUT})}>
                    <span>{r.w}</span>
                  </Highlight>
                ) : (
                  r.w
                )}
              </div>
            );
          })}
          {stamp > 0 && (
            <div style={{position: 'absolute', right: 30, bottom: 26, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [7.3, 7.6], [1.5, 1], {...CL, easing: OUT}))}}>
              <div style={{border: `5px solid ${C.red}`, color: C.red, background: '#FBF6E9', fontFamily: SANS, fontWeight: 900, fontSize: 32, letterSpacing: 2, padding: '4px 16px', borderRadius: 12, whiteSpace: 'nowrap'}}>YOUR REAL JOB DESCRIPTION</div>
            </div>
          )}
        </div>
      </Push>
      <Sfx at={3.06} name="pop" volume={0.3} />
      {NOTES.map((r) => (
        <Sfx key={r.n} at={r.at} name="click" volume={0.28} />
      ))}
      <Sfx at={7.3} name="hit" volume={0.4} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: ask what winning means.', start: 0.38, end: 2.9, key: 'winning', se: 2.54},
          {text: '"What would make your first ninety days great?"', start: 3.06, end: 5.6, key: 'ninety', se: 5.26},
          {text: 'Write down the answer.', start: 5.78, end: 7.0, key: 'answer', se: 6.58},
          {text: "That's your real job description now.", start: 7.1, end: 10.2, key: 'real', se: 8.9},
        ]}
      />
    </Paper>
  );
};

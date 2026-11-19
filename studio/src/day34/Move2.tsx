import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {CL, Caps, INOUT, Label, Mark, Paper, Pill, Push, YOU, Av, card, ez, useT} from './kit';

/* 4. Move 2: the career ladder card for Senior. "Owns projects end to end" is highlighted, then your self review line
   types in below using the same words, and "end to end" is highlighted in both places with a "Same words" pill. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const LINE = 'I owned the billing project end to end.';
const STEPS = [{text: LINE, from: 6.1, to: 7.9, mode: 'type' as const}];
const ROWS = ['Owns projects end to end', 'Mentors newer teammates', 'Spots problems early'];
export const Move2: React.FC = () => {
  const {f, t} = useT();
  const ladder = ez(t, 0.15, 0.5);
  const hl = interpolate(t, [4.3, 5.0], [0, 1], {...CL, easing: INOUT});
  const mine = ez(t, 1.2, 0.5);
  const hl2 = interpolate(t, [8.0, 8.5], [0, 1], {...CL, easing: INOUT});
  const same = interpolate(t, [8.2, 8.55], [0, 1], {...CL, easing: POP});
  const typed = typedText(f, STEPS);
  const caret = Math.floor(t * 2.5) % 2 === 0 ? '|' : '';
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Use next level words" />
        {/* career ladder */}
        <div style={{...card, top: 440, height: 320, padding: '28px 40px', boxSizing: 'border-box', opacity: ladder, translate: `0px ${(1 - ladder) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 18, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.ink}}>Career ladder</div>
            <div style={{background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, padding: '8px 20px', borderRadius: 999}}>Senior</div>
          </div>
          {ROWS.map((r, k) => {
            const p = interpolate(t, [0.6 + k * 0.25, 1.0 + k * 0.25], [0, 1], {...CL, easing: INOUT});
            return (
              <div key={r} style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 24, opacity: p, translate: `${(1 - p) * -30}px 0px`}}>
                <div style={{width: 18, height: 18, borderRadius: 9, background: k === 0 ? C.amber : '#D8D0C4', flexShrink: 0}} />
                <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: k === 0 ? C.ink : '#8A8278'}}>
                  {k === 0 ? (
                    <Highlight color="rgba(224,169,59,0.55)" iterations={1} seed={3} padding={{left: 6, right: 6, top: 0, bottom: 0}} progress={hl}>
                      <span>{r}</span>
                    </Highlight>
                  ) : (
                    r
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* your self review line */}
        <div style={{...card, top: 810, height: 180, padding: '26px 40px', boxSizing: 'border-box', opacity: mine, translate: `0px ${(1 - mine) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <Av i="YOU" bg={YOU.shirt} size={46} fg={C.ink} />
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted}}>MY SELF REVIEW</div>
          </div>
          <div style={{marginTop: 22, fontFamily: SANS, fontWeight: 800, fontSize: 38, lineHeight: 1.25, color: C.ink, minHeight: 48}}>
            {typed.length === LINE.length ? (
              <>
                I owned the billing project{' '}
                <Highlight color="rgba(224,169,59,0.55)" iterations={1} seed={6} padding={{left: 6, right: 6, top: 0, bottom: 0}} progress={hl2}>
                  <span>end to end.</span>
                </Highlight>
              </>
            ) : (
              <>
                {typed || <span style={{color: '#C9C2B8'}}>Write it in their words.</span>}
                {t >= 6.1 && caret}
              </>
            )}
          </div>
        </div>
        <Pill p={same} bg={C.amber} fg={C.ink} size={26} style={{right: 110, top: 828}}>
          Same words
        </Pill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.22} />
      <Sfx at={4.3} name="snip" volume={0.18} />
      <TypeClicks steps={STEPS} />
      <Sfx at={8.0} name="snip" volume={0.18} />
      <Sfx at={8.2} name="pop" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: use the words of the next level.', start: 0.51, end: 3.3, key: 'next level', se: 2.89},
          {text: 'If senior means owning a project end to end,', start: 3.66, end: 5.92, key: 'senior end', se: 5.81},
          {text: 'write "I owned the billing project end to end."', start: 6.0, end: 9.4, key: 'owned', se: 8.43},
        ]}
      />
    </Paper>
  );
};

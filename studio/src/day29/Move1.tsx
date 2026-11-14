import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight, StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Label, Mark, Paper, Pill, Push, card, ez, mix, useT} from './kit';

/* 3. Move 1: Monday's team sync block shrinks from 60 to 50 minutes ("Fixable this week").
   Below, YOUR FEEDBACK: the one small fix gets highlighted, and the whole-style critiques get struck through. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const BIG = ['Rethink your whole style', 'Be less controlling', 'Communicate better'];
export const Move1: React.FC = () => {
  const {t} = useT();
  const cal = ez(t, 0.2, 0.5);
  const fixP = interpolate(t, [2.4, 2.75], [0, 1], {...CL, easing: POP});
  const shrink = interpolate(t, [5.6, 6.6], [0, 1], {...CL, easing: INOUT});
  const mins = Math.round(mix(60, 50, shrink));
  const fb = ez(t, 0.5, 0.5);
  const one = ez(t, 5.05, 0.45);
  const hl = interpolate(t, [5.6, 6.3], [0, 1], {...CL, easing: INOUT});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="One small fix" />
        {/* calendar */}
        <div style={{...card, top: 440, height: 330, padding: '28px 40px', boxSizing: 'border-box', opacity: cal, translate: `0px ${(1 - cal) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>MONDAY</div>
          <div style={{display: 'flex', marginTop: 20, fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted}}>
            {['10:00', '10:15', '10:30', '10:45'].map((h) => (
              <div key={h} style={{width: 210}}>{h}</div>
            ))}
          </div>
          <div style={{position: 'relative', height: 110, marginTop: 10}}>
            <div style={{position: 'absolute', left: 0, top: 0, height: 110, width: 840 * mix(1, 50 / 60, shrink), borderRadius: 22, background: '#3F6FB5', padding: '16px 26px', boxSizing: 'border-box'}}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.white, whiteSpace: 'nowrap'}}>Team sync</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 26, color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap'}}>{mins} min</div>
            </div>
            <div style={{position: 'absolute', right: 20, top: 0, width: 140 * shrink, height: 110, borderRadius: 22, border: `3px dashed ${C.green}`, boxSizing: 'border-box', opacity: shrink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.green, whiteSpace: 'nowrap', overflow: 'hidden'}}>
              +10
            </div>
          </div>
          <Pill p={fixP} bg={C.green} size={26} style={{right: 40, top: 22}}>
            Fixable this week
          </Pill>
        </div>
        {/* your feedback */}
        <div style={{...card, top: 800, height: 330, padding: '28px 40px', boxSizing: 'border-box', opacity: fb, translate: `0px ${(1 - fb) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>YOUR FEEDBACK FOR DANA</div>
          <div style={{marginTop: 22, height: 62, position: 'relative'}}>
            <div style={{position: 'absolute', inset: 0, borderRadius: 16, border: `3px dashed ${C.muted}`, opacity: 0.5 * (1 - one)}} />
            <div style={{position: 'absolute', left: 12, top: 6, opacity: one, translate: `0px ${(1 - one) * 16}px`}}>
              <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={4} padding={{left: 8, right: 8, top: 0, bottom: 0}} progress={hl}>
                <span style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink, whiteSpace: 'nowrap'}}>End Monday sync 10 min early</span>
              </Highlight>
            </div>
          </div>
          <div style={{marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start'}}>
            {BIG.map((b, i) => (
              <StrikeThrough key={b} color={C.red} strokeWidth={5} seed={i + 11} progress={interpolate(t, [7.6 + i * 0.45, 8.0 + i * 0.45], [0, 1], {...CL, easing: INOUT})}>
                <span style={{fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.muted, whiteSpace: 'nowrap', padding: '0 12px'}}>{b}</span>
              </StrikeThrough>
            ))}
          </div>
        </div>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={2.4} name="pop" volume={0.26} />
      <Sfx at={5.05} name="ping" volume={0.26} />
      <Sfx at={5.6} name="whoosh" volume={0.14} />
      {BIG.map((b, i) => (
        <Sfx key={b} at={7.6 + i * 0.45} name="snip" volume={0.2} />
      ))}
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: give one small thing they can fix this week.', start: 0.72, end: 4.9, key: 'small week', se: 4.39},
          {text: '"The Monday meeting could end ten minutes early."', start: 5.05, end: 7.4, key: 'ten minutes', se: 6.94},
          {text: 'Not a review of their whole style.', start: 7.55, end: 10.2, key: 'whole style', se: 9.75},
        ]}
      />
    </Paper>
  );
};

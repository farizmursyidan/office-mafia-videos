import React from 'react';
import {interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Mark, Night, OUT, Push, float, useT} from './kit';

/* 2. The rule: reorgs reward whoever the new boss already knows */
export const Rule: React.FC = () => {
  const {t} = useT();
  const col = (label: string, big: React.ReactNode, small: string, hi: boolean, at: number, k: number) => (
    <div
      style={{
        flex: 1,
        background: hi ? C.amber : C.nightSoft,
        border: hi ? 'none' : '3px solid #2E2E2E',
        borderRadius: 30,
        padding: '26px 28px',
        opacity: hi ? interpolate(t, [at, at + 0.6], [0, 1], {...CL, easing: OUT}) : interpolate(t, [at, at + 0.6, 4.83, 5.4], [0, 1, 1, 0.5], {...CL, easing: OUT}),
        translate: hi
          ? interpolate(t, [at, at + 0.7], ['0px 80px', `0px ${float(t, k)}px`], {...CL, easing: OUT})
          : interpolate(t, [at, at + 0.7, 4.83, 5.5], ['0px 80px', '0px 0px', '0px 0px', '0px 40px'], {...CL, easing: [OUT, OUT, INOUT]}),
        scale: String(hi ? interpolate(t, [at, at + 0.7], [0.92, 1.04], {...CL, easing: OUT, output: 'perceptual-scale'}) : 1),
      }}
    >
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 2, color: hi ? C.ink : C.muted}}>{label}</div>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 72, color: hi ? C.ink : C.white, marginTop: 16}}>{big}</div>
      <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 32, color: hi ? C.ink : C.muted, marginTop: 8}}>{small}</div>
    </div>
  );
  return (
    <Night>
      <Push>
        <Mark dark />
        <div style={{position: 'absolute', top: 240, left: 80, right: 80, fontFamily: SANS}}>
          <div style={{fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber, opacity: interpolate(t, [0.3, 0.8], [0, 1], {...CL, easing: OUT})}}>THE RULE NOBODY TELLS YOU</div>
          <div style={{overflow: 'hidden', marginTop: 14, paddingBottom: 8}}>
            <div style={{fontWeight: 900, fontSize: 76, lineHeight: 1.05, color: C.white, translate: interpolate(t, [0.4, 1.0], ['0px 170px', '0px 0px'], {...CL, easing: OUT})}}>Reorgs reward who the new boss knows</div>
          </div>
        </div>
        <div style={{position: 'absolute', top: 660, left: 70, right: 70, display: 'flex', gap: 30}}>
          {col('WORKS HARDEST', 'Moved', '60 hour weeks, name unknown', false, 2.26, 0)}
          {col(
            'KNOWN TO NEW BOSS',
            <Circle color={C.ink} strokeWidth={5} seed={2} padding={{left: 10, right: 10, top: -6, bottom: -6}} progress={interpolate(t, [5.6, 6.3], [0, 1], {...CL, easing: INOUT})}>
              <span>Kept</span>
            </Circle>,
            'two coffee chats, name known',
            true,
            4.83,
            2,
          )}
        </div>
      </Push>
      <Sfx at={2.26} name="pop" volume={0.3} />
      <Sfx at={4.83} name="hit" volume={0.38} />
      <Caps
        dark
        top={1250}
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.38, end: 2.2, key: 'nobody', se: 1.78},
          {text: "Reorgs don't reward whoever works hardest.", start: 2.24, end: 4.78, key: 'hardest.', se: 4.47},
          {text: 'They reward whoever the new boss already knows.', start: 4.81, end: 8.0, key: 'knows.', se: 7.26},
        ]}
      />
    </Night>
  );
};

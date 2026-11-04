import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight, StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, OUT, Paper, Pill, Push, card, ez, useT} from './kit';

/* 5. Move 3: the vague line in the weekly update gets replaced by one line with numbers. */
const A = 'Trained 3 new hires,';
const B = 'cut setup to 2 days.';
export const Move3: React.FC = () => {
  const {t} = useT();
  const mail = ez(t, 0.15, 0.55);
  const ta = Math.floor(interpolate(t, [5.26, 6.3], [0, A.length], CL));
  const tb = Math.floor(interpolate(t, [6.63, 7.5], [0, B.length], CL));
  const stamp = interpolate(t, [7.6, 7.9], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  const hl = interpolate(t, [7.5, 7.9], [0, 1], {...CL, easing: INOUT});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Put a number on it" />
        <div style={{...card, top: 430, height: 700, padding: '28px 36px', opacity: mail, translate: `0px ${(1 - mail) * 50}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, paddingBottom: 18, borderBottom: '2px solid #EEEAE4'}}>
            <Av i="YOU" bg={C.amber} fg={C.ink} size={72} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.ink}}>Weekly update</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 28, color: C.muted}}>To: Dana</div>
            </div>
          </div>
          <div style={{marginTop: 26, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: C.muted, lineHeight: 1.3}}>Shipped the Q4 report</div>
          <div style={{marginTop: 14, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: C.muted, lineHeight: 1.3}}>
            <StrikeThrough color={C.red} strokeWidth={5} seed={8} progress={interpolate(t, [4.5, 5.0], [0, 1], {...CL, easing: INOUT})}>
              <span>Helped with onboarding</span>
            </StrikeThrough>
          </div>
          <div style={{marginTop: 26, minHeight: 170, background: '#FBF6E9', borderRadius: 18, padding: '18px 22px', fontFamily: SANS, fontWeight: 900, fontSize: 52, lineHeight: 1.18, color: C.ink, opacity: ez(t, 1.2, 0.4), position: 'relative'}}>
            <div style={{position: 'absolute', left: 22, top: 18, fontFamily: SANS, fontWeight: 800, fontSize: 40, color: C.muted, opacity: 1 - ez(t, 4.9, 0.3)}}>Add a number here</div>
            <div style={{whiteSpace: 'nowrap', height: 62}}>
              {ta >= A.length ? (
                <>
                  {'Trained '}
                  <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={5} padding={{left: 2, right: 2, top: 0, bottom: 0}} progress={hl}>
                    <span>3 new hires,</span>
                  </Highlight>
                </>
              ) : (
                A.slice(0, ta)
              )}
            </div>
            <div style={{whiteSpace: 'nowrap', height: 62}}>
              {tb >= B.length ? (
                <>
                  {'cut setup to '}
                  <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={6} padding={{left: 2, right: 2, top: 0, bottom: 0}} progress={hl}>
                    <span>2 days.</span>
                  </Highlight>
                </>
              ) : (
                B.slice(0, tb)
              )}
            </div>
          </div>
          {stamp > 0 && (
            <div style={{position: 'absolute', right: 34, bottom: 28, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [7.6, 7.9], [1.5, 1], {...CL, easing: OUT}))}}>
              <div style={{border: `5px solid ${C.green}`, color: C.green, background: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 34, letterSpacing: 3, padding: '4px 18px', borderRadius: 12, whiteSpace: 'nowrap'}}>NOW IT COUNTS</div>
            </div>
          )}
        </div>
        <Pill p={ez(t, 3.47, 0.4)} bg={C.ink} size={28} style={{right: 112, top: 462}}>
          ONE LINE
        </Pill>
      </Push>
      <Sfx at={3.47} name="click" volume={0.28} />
      <Sfx at={5.26} name="blip" volume={0.3} />
      <Sfx at={7.6} name="hit" volume={0.4} />
      <Caps
        top={1290}
        caps={[
          {text: "Move three: put a number on what's left.", start: 0.71, end: 3.3, key: 'number', se: 2.9},
          {text: 'One line in your weekly update.', start: 3.47, end: 5.1, key: 'weekly', se: 4.68},
          {text: '"Trained three new hires,', start: 5.26, end: 6.5, key: 'three', se: 6.34},
          {text: 'cut setup to two days."', start: 6.63, end: 8.2, key: 'two', se: 7.58},
        ]}
      />
    </Paper>
  );
};

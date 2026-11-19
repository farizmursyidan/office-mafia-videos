import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Desk, Person} from '../characters';
import {CL, Caps, DANA, INOUT, Label, Mark, Paper, Pill, Push, YOU, card, ez, useT} from './kit';

/* 5. Move 3: the last box of the self review, "What's next for me", gets one line typed into it and circled.
   Below, Dana reads it at her desk and it is pinned to her plan for next year. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const LINE = 'Next year I want to lead our biggest client account.';
const STEPS = [{text: LINE, from: 4.15, to: 6.2, mode: 'type' as const}];
export const Move3: React.FC = () => {
  const {f, t} = useT();
  const form = ez(t, 0.15, 0.5);
  const one = interpolate(t, [3.2, 3.55], [0, 1], {...CL, easing: POP});
  const ring = interpolate(t, [6.25, 6.8], [0, 1], {...CL, easing: INOUT});
  const plan = interpolate(t, [6.5, 6.85], [0, 1], {...CL, easing: POP});
  const people = ez(t, 0.6, 0.6);
  const typed = typedText(f, STEPS);
  const caret = Math.floor(t * 2.5) % 2 === 0 ? '|' : '';
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const glow = 0.5 + 0.5 * Math.sin(t * 2);
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Name your next step" />
        <div style={{...card, top: 440, height: 380, padding: '28px 40px', boxSizing: 'border-box', opacity: form, translate: `0px ${(1 - form) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 18, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.ink}}>What's next for me</div>
            <div style={{opacity: one, scale: String(0.85 + 0.15 * one), background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, padding: '8px 20px', borderRadius: 999, whiteSpace: 'nowrap'}}>One line</div>
          </div>
          <div style={{marginTop: 30, marginLeft: 6}}>
            <Circle color={C.amber} strokeWidth={6} iterations={1} seed={11} padding={{top: 8, bottom: 8, left: 12, right: 12}} progress={ring}>
              <div style={{width: 780, minHeight: 112, fontFamily: SANS, fontWeight: 800, fontSize: 42, lineHeight: 1.3, color: typed ? C.ink : '#C9C2B8'}}>
                {typed || 'Last section. Most people leave it blank.'}
                {t >= 4.15 && t < 6.3 && caret}
              </div>
            </Circle>
          </div>
          <Pill p={plan} bg={C.green} size={26} style={{left: 40, top: 290}}>
            Pinned to Dana's 2027 plan
          </Pill>
        </div>
        {/* Dana reads it at her desk */}
        <AbsoluteFill style={{opacity: people}}>
          <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
            <Person x={250} y={1175} scale={0.66} facing={1} armL={12} bob={breathe(0)} {...YOU} />
            <Person x={860} y={1175} scale={0.66} facing={-1} sitting armL={55} bob={breathe(1.3)} {...DANA} />
            <Desk x={700} y={1080} w={220} laptop screenGlow={glow} />
          </svg>
        </AbsoluteFill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.22} />
      <Sfx at={3.2} name="pop" volume={0.2} />
      <TypeClicks steps={STEPS} />
      <Sfx at={6.25} name="snip" volume={0.18} />
      <Sfx at={6.5} name="ping" volume={0.2} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: end with what you want next.', start: 0.58, end: 3.1, key: 'want next', se: 2.86},
          {text: 'One line.', start: 3.15, end: 4.05, key: 'one', se: 3.65},
          {text: '"Next year I want to lead our biggest client account."', start: 4.1, end: 7.5, key: 'lead', se: 6.44},
        ]}
      />
    </Paper>
  );
};

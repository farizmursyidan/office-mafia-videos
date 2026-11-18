import React from 'react';
import {Easing, interpolate} from 'remotion';
import {StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, Msg, Paper, Pill, Push, RAJ, card, ez, useT} from './kit';

/* 3. Move 1: Fast, Short, Calm chips pop with the voice. In the thread, your reply types under Raj's callout and
   gets a "2 min later" stamp. Below, the long excuse paragraph you did NOT send is struck through. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const REPLY = 'Good catch. Fixing it by three.';
const STEPS = [{text: REPLY, from: 4.2, to: 5.4, mode: 'type' as const}];
const CHIPS = [
  {label: 'Fast', at: 1.35, left: 70},
  {label: 'Short', at: 2.05, left: 240},
  {label: 'Calm', at: 2.75, left: 430},
];
export const Move1: React.FC = () => {
  const {f, t} = useT();
  const thread = ez(t, 0.15, 0.5);
  const sent = interpolate(t, [5.5, 5.85], [0, 1], {...CL, easing: POP});
  const stamp = interpolate(t, [5.9, 6.25], [0, 1], {...CL, easing: POP});
  const bad = ez(t, 6.45, 0.45);
  const strike = interpolate(t, [7.6, 8.3], [0, 1], {...CL, easing: INOUT});
  const caret = Math.floor(t * 2.5) % 2 === 0 ? '|' : '';
  const typed = typedText(f, STEPS);
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Reply fast and calm" />
        {CHIPS.map((c) => (
          <Pill key={c.label} p={interpolate(t, [c.at, c.at + 0.35], [0, 1], {...CL, easing: POP})} bg={c.label === 'Calm' ? C.green : C.ink} size={30} style={{left: c.left, top: 440}}>
            {c.label}
          </Pill>
        ))}
        {/* the thread */}
        <div style={{...card, top: 530, height: 330, padding: '26px 36px', boxSizing: 'border-box', opacity: thread, translate: `0px ${(1 - thread) * 40}px`}}>
          <div style={{display: 'flex', gap: 16, alignItems: 'flex-start'}}>
            <Av i="RA" bg={RAJ.shirt} size={56} />
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 32, lineHeight: 1.25, color: C.muted, marginTop: 6}}>
              <span style={{color: C.ink, fontWeight: 900}}>Raj:</span> the numbers in your Q3 deck are wrong.
            </div>
          </div>
          <div style={{marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
            {t < 5.5 ? (
              <div style={{width: '100%', boxSizing: 'border-box', border: '3px solid #EEEAE4', borderRadius: 24, padding: '18px 26px', fontFamily: SANS, fontWeight: 800, fontSize: 38, color: typed ? C.ink : C.muted, minHeight: 86}}>
                {typed || 'Reply in thread'}
                {t >= 4.2 && caret}
              </div>
            ) : (
              <Msg p={sent} out size={40}>
                {REPLY}
              </Msg>
            )}
          </div>
          <Pill p={stamp} bg={C.green} size={24} style={{left: 36, top: 250}}>
            Sent 2 min later
          </Pill>
        </div>
        {/* what not to send */}
        <div style={{...card, top: 925, height: 175, padding: '24px 36px', boxSizing: 'border-box', opacity: bad, translate: `0px ${(1 - bad) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.red}}>NOT THIS</div>
          <div style={{marginTop: 14, fontFamily: SANS, fontWeight: 800, fontSize: 30, lineHeight: 1.3, color: '#5A5246'}}>
            <StrikeThrough color={C.red} strokeWidth={5} iterations={1} seed={12} progress={strike}>
              <span>"Actually, finance sent me the old file, so..."</span>
            </StrikeThrough>
          </div>
        </div>
      </Push>
      {CHIPS.map((c) => (
        <Sfx key={c.label} at={c.at} name="pop" volume={0.2} />
      ))}
      <TypeClicks steps={STEPS} />
      <Sfx at={5.5} name="send" volume={0.24} />
      <Sfx at={6.45} name="blip" volume={0.22} />
      <Sfx at={7.6} name="snip" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: reply fast, short and calm.', start: 0.66, end: 3.9, key: 'fast short calm', se: 3.43},
          {text: '"Good catch. Fixing it by three."', start: 4.1, end: 6.3, key: 'catch three', se: 5.72},
          {text: 'No excuses, no long paragraph.', start: 6.45, end: 9.1, key: 'excuses paragraph', se: 8.43},
        ]}
      />
    </Paper>
  );
};

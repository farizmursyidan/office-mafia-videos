import React from 'react';
import {Easing, interpolate} from 'remotion';
import {StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, OUT, Paper, Pill, Push, card, ez, float, useT} from './kit';

/* 4. Move 2: one chore leaves your plate, one visible job comes on. */
const CHORES = ['Meeting notes', 'Onboarding docs', 'Team calendar'];
export const Move2: React.FC = () => {
  const {t} = useT();
  const a = ez(t, 0.3, 0.55);
  const b = ez(t, 3.3, 0.55);
  const you = ez(t, 8.3, 0.4);
  const pick = ez(t, 2.8, 0.4);
  const stamp = interpolate(t, [8.9, 9.2], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Trade up" />
        <div style={{...card, top: 430, height: 300, padding: '22px 34px', opacity: a, translate: `0px ${(1 - a) * 50 + float(t)}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>YOUR PLATE</div>
          {CHORES.map((w, i) => {
            const hot = i === 1;
            return (
              <div key={w} style={{marginTop: 14, height: 66, display: 'flex', alignItems: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 42, color: hot && t > 7.0 ? C.muted : C.ink, background: hot ? `rgba(224,169,59,${0.28 * pick})` : 'transparent', borderRadius: 12, padding: '0 14px'}}>
                <StrikeThrough color={hot ? C.red : 'transparent'} strokeWidth={6} seed={3} progress={hot ? interpolate(t, [6.7, 7.2], [0, 1], {...CL, easing: INOUT}) : 0}>
                  <span>{w}</span>
                </StrikeThrough>
              </div>
            );
          })}
        </div>
        <Pill p={ez(t, 7.1, 0.4)} bg={C.ink} size={28} style={{right: 112, top: 540}}>
          HANDED OFF
        </Pill>
        <div style={{...card, top: 760, height: 370, padding: '22px 34px', background: C.night, opacity: b, translate: `0px ${(1 - b) * 50}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.amber}}>ONE VISIBLE JOB</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 58, color: C.white, marginTop: 16}}>Client update</div>
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 32, color: 'rgba(255,255,255,0.7)', marginTop: 6}}>Thursday, with the VP in the room</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 28}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 2, color: C.muted}}>PRESENTER</div>
            <div style={{position: 'relative', width: 96, height: 96}}>
              <div style={{position: 'absolute', opacity: 1 - you}}>
                <Av i="?" bg="transparent" dashed size={96} />
              </div>
              <div style={{position: 'absolute', opacity: you, scale: String(0.8 + 0.2 * you)}}>
                <Av i="YOU" bg={C.amber} fg={C.ink} size={96} />
              </div>
            </div>
          </div>
          {stamp > 0 && (
            <div style={{position: 'absolute', right: 34, bottom: 34, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [8.9, 9.2], [1.5, 1], {...CL, easing: OUT}))}}>
              <div style={{border: `5px solid ${C.amber}`, color: C.amber, background: C.night, fontFamily: SANS, fontWeight: 900, fontSize: 36, letterSpacing: 3, padding: '4px 18px', borderRadius: 12}}>VISIBLE</div>
            </div>
          )}
        </div>
      </Push>
      <Sfx at={2.8} name="click" volume={0.28} />
      <Sfx at={3.3} name="blip" volume={0.3} />
      <Sfx at={7.1} name="click" volume={0.28} />
      <Sfx at={8.3} name="pop" volume={0.32} />
      <Sfx at={8.9} name="hit" volume={0.4} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: trade up.', start: 0.59, end: 2.7, key: 'trade', se: 2.31},
          {text: 'Give one chore away, ask for one visible job.', start: 2.8, end: 6.3, key: 'visible', se: 5.66},
          {text: '"I\'ll hand off the onboarding docs.', start: 6.5, end: 8.05, key: 'onboarding', se: 7.84},
          {text: 'Let me present the client update."', start: 8.2, end: 10.2, key: 'present', se: 9.43},
        ]}
      />
    </Paper>
  );
};

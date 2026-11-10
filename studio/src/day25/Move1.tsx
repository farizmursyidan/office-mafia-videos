import React from 'react';
import {Easing, interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, OUT, Paper, Push, card, ez, useT} from './kit';

/* 3. Move 1: the week strip marks the day you found out (Monday) and the due date (Friday). Friday gets crossed off, and the heads-up message goes out on Monday. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const MSG = 'Heads up, the vendor slipped. Launch is at risk.';
const STEPS = [{text: MSG, from: 4.2, to: 6.0, mode: 'type' as const}];
export const Move1: React.FC = () => {
  const {f, t} = useT();
  const strip = ez(t, 0.2, 0.5);
  const know = interpolate(t, [1.6, 1.95], [0, 1], {...CL, easing: POP});
  const due = interpolate(t, [2.5, 2.85], [0, 1], {...CL, easing: POP});
  const cross = interpolate(t, [3.0, 3.5], [0, 1], {...CL, easing: INOUT});
  const chat = ez(t, 3.7, 0.45);
  const sent = interpolate(t, [6.1, 6.4], [0, 1], {...CL, easing: OUT});
  const caret = Math.floor(t * 2.5) % 2 === 0 && t < 6.1 ? '|' : '';
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Tell them the day you know" />
        {/* week strip */}
        <div style={{...card, top: 440, height: 300, padding: '34px 40px', boxSizing: 'border-box', opacity: strip, translate: `0px ${(1 - strip) * 40}px`}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {DAYS.map((d, i) => {
              const isMon = i === 0;
              const isFri = i === 4;
              const bg = isMon && know > 0 ? `rgba(224,169,59,${0.25 + 0.6 * know})` : '#F1EEE9';
              const tile = (
                <div style={{width: 148, height: 130, borderRadius: 22, background: bg, border: isFri && due > 0 ? `4px solid ${C.ink}` : '4px solid transparent', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.ink}}>
                  {d}
                </div>
              );
              return (
                <div key={d} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
                  {isFri ? (
                    <CrossedOff color={C.red} strokeWidth={6} iterations={1} seed={7} progress={cross}>
                      {tile}
                    </CrossedOff>
                  ) : (
                    tile
                  )}
                  <div style={{height: 50, fontFamily: SANS, fontWeight: 900, fontSize: 28, whiteSpace: 'nowrap', color: isMon ? C.ink : C.red, opacity: isMon ? know : isFri ? due : 0, scale: String(0.8 + 0.2 * (isMon ? know : due))}}>
                    {isMon ? 'YOU KNOW' : isFri ? 'DUE' : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* chat */}
        <div style={{...card, top: 780, height: 380, padding: '30px 40px', boxSizing: 'border-box', opacity: chat, translate: `0px ${(1 - chat) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, paddingBottom: 20, borderBottom: '2px solid #EEEAE4'}}>
            <Av i="DA" bg="#3F6FB5" size={64} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>Dana (boss)</div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.muted}}>Mon 9:12</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 30, opacity: ez(t, 4.1, 0.25)}}>
            <div style={{maxWidth: 680, minHeight: 120, background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 40, lineHeight: 1.25, padding: '22px 30px', borderRadius: 28, boxSizing: 'border-box'}}>
              {typedText(f, STEPS)}
              {caret}
            </div>
          </div>
          <div style={{textAlign: 'right', marginTop: 12, fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.green, opacity: sent}}>Sent Monday</div>
        </div>
      </Push>
      <TypeClicks steps={STEPS} />
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={1.6} name="pop" volume={0.28} />
      <Sfx at={2.5} name="pop" volume={0.28} />
      <Sfx at={3.0} name="snip" volume={0.26} />
      <Sfx at={6.1} name="send" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: "Move one: tell them the day you know, not the day it's due.", start: 0.64, end: 4.05, key: 'know', se: 3.6},
          {text: '"Heads up, the vendor slipped. Launch is at risk."', start: 4.15, end: 6.9, key: 'heads', se: 6.38},
        ]}
      />
    </Paper>
  );
};

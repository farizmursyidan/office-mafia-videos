import React from 'react';
import {interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, OUT, Paper, Pill, Push, card, ez, float, mix, useT} from './kit';

/* 4. Move 2: never put it in writing. Your chat message gets screenshotted and lands in three other chats. */
const MSG = "lol Raj's deck was a disaster";
const DEST = [
  {name: 'Raj', i: 'RA', bg: '#5B8C5A', x: 70, at: 3.9},
  {name: 'His boss', i: 'DK', bg: '#8E6845', x: 385, at: 4.35},
  {name: '#general', i: '#', bg: '#3F6FB5', x: 700, at: 4.8},
];
export const Move2: React.FC = () => {
  const {t} = useT();
  const chat = ez(t, 0.15, 0.55);
  const typed = Math.floor(interpolate(t, [0.9, 2.3], [0, MSG.length], CL));
  const flash = interpolate(t, [3.0, 3.08, 3.45], [0, 0.95, 0], CL);
  const shot = ez(t, 3.0, 0.3);
  const cross = interpolate(t, [6.1, 6.7], [0, 1], {...CL, easing: INOUT});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Never in writing" />
        <div style={{...card, top: 440, height: 330, padding: '24px 36px', opacity: chat, translate: `0px ${(1 - chat) * 60 + float(t)}px`, overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 14, borderBottom: '2px solid #EEEAE4'}}>
            <Av i="TO" bg="#4F7F8C" size={52} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>Tom</div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 800, fontSize: 24, color: C.muted, letterSpacing: 2}}>12:41 PM</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 34}}>
            <CrossedOff color={C.red} strokeWidth={7} seed={8} progress={cross}>
              <div style={{background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 700, fontSize: 40, padding: '18px 26px', borderRadius: 24, whiteSpace: 'nowrap', minWidth: 60}}>
                {MSG.slice(0, typed)}
                {typed < MSG.length && t > 0.8 ? <span style={{opacity: Math.sin(t * 12) > 0 ? 1 : 0}}>|</span> : null}
              </div>
            </CrossedOff>
          </div>
          <div style={{position: 'absolute', inset: 0, background: C.white, opacity: flash}} />
          {/* screenshot corners */}
          {shot > 0 &&
            [
              {left: 18, top: 18, r: '0deg'},
              {right: 18, top: 18, r: '90deg'},
              {right: 18, bottom: 18, r: '180deg'},
              {left: 18, bottom: 18, r: '270deg'},
            ].map((c, k) => (
              <div key={k} style={{position: 'absolute', ...c, width: 44, height: 44, borderLeft: `6px solid ${C.ink}`, borderTop: `6px solid ${C.ink}`, rotate: c.r, opacity: interpolate(t, [3.0, 3.2, 3.7, 3.9], [0, 1, 1, 0], CL), scale: String(mix(1.3, 1, shot))}} />
            ))}
        </div>
        {/* copies landing in other chats */}
        {DEST.map((d) => {
          const p = ez(t, d.at, 0.6);
          return (
            <div key={d.name} style={{position: 'absolute', left: d.x, top: 860, width: 310, opacity: interpolate(p, [0, 0.3], [0, 1], CL), translate: `${(1 - p) * (385 - d.x)}px ${(1 - p) * -230}px`, scale: String(mix(0.6, 1, p))}}>
              <div style={{background: C.white, borderRadius: 24, padding: '16px 18px', boxShadow: '0 16px 36px rgba(60,45,20,0.16)'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                  <Av i={d.i} bg={d.bg} size={50} />
                  <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.ink, whiteSpace: 'nowrap'}}>{d.name}</div>
                </div>
                <div style={{marginTop: 12, height: 92, borderRadius: 14, background: '#F1ECE4', border: '3px solid #E4DCCF', padding: '12px 14px', boxSizing: 'border-box'}}>
                  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 18, color: C.muted, letterSpacing: 1}}>SCREENSHOT</div>
                  <div style={{marginTop: 8, height: 26, width: '82%', marginLeft: 'auto', borderRadius: 10, background: C.amber}} />
                </div>
              </div>
            </div>
          );
        })}
        <Pill p={ez(t, 5.3, 0.45)} bg={C.red} size={28} style={{left: 70, top: 1100}}>
          SENT TO 3 CHATS
        </Pill>
        <Pill p={ez(t, 5.6, 0.45)} bg={C.ink} size={28} style={{left: 450, top: 1100}}>
          LUNCH TALK: FORGOTTEN
        </Pill>
      </Push>
      <Sfx at={0.9} name="click" volume={0.25} />
      <Sfx at={2.35} name="send" volume={0.3} />
      <Sfx at={3.0} name="snip" volume={0.4} />
      {DEST.map((d) => (
        <Sfx key={d.name} at={d.at} name="ping" volume={0.24} />
      ))}
      <Sfx at={6.1} name="snip" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: never put it in writing.', start: 0.45, end: 2.85, key: 'writing.', se: 2.55},
          {text: 'One screenshot of your chat message travels further than anything you said at lunch.', start: 2.95, end: 7.75, key: 'screenshot', se: 6.95},
        ]}
      />
    </Paper>
  );
};

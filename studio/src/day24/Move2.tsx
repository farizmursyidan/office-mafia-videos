import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Av, CL, Caps, Label, Mark, OUT, Paper, Push, card, ez, useT} from './kit';

/* 4. Move 2: you post two lines in the team channel when the deck ships, and the reactions and your boss's reply land in public. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const MSG1 = 'Client deck sent.';
const MSG2 = 'They signed off.';
const STEPS1 = [{text: MSG1, from: 4.0, to: 5.0, mode: 'type' as const}];
const STEPS2 = [{text: MSG2, from: 5.3, to: 6.2, mode: 'type' as const}];
const Line: React.FC<{i: string; bg: string; fg?: string; name: string; time: string; p: number; children: React.ReactNode}> = ({i, bg, fg, name, time, p, children}) => (
  <div style={{display: 'flex', gap: 20, opacity: p, translate: `0px ${(1 - p) * 24}px`}}>
    <Av i={i} bg={bg} fg={fg} size={70} />
    <div style={{flex: 1}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>{name}</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 24, color: C.muted}}>{time}</div>
      </div>
      <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 38, color: C.ink, marginTop: 4, lineHeight: 1.25}}>{children}</div>
    </div>
  </div>
);
export const Move2: React.FC = () => {
  const {f, t} = useT();
  const ch = ez(t, 0.3, 0.5);
  const old = ez(t, 0.8, 0.4);
  const mine = ez(t, 3.15, 0.4);
  const r1 = interpolate(t, [6.5, 6.8], [0, 1], {...CL, easing: POP});
  const r2 = interpolate(t, [6.9, 7.2], [0, 1], {...CL, easing: POP});
  const reply = ez(t, 7.4, 0.4);
  const cnt = Math.round(interpolate(t, [6.5, 7.6], [1, 5], CL));
  const caret = Math.floor(t * 2.5) % 2 === 0 && t < 6.3 ? '|' : '';
  const l1 = typedText(f, STEPS1);
  const l2 = typedText(f, STEPS2);
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Make your wins visible" />
        <div style={{...card, top: 440, height: 720, overflow: 'hidden', opacity: ch, translate: `0px ${(1 - ch) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '26px 34px', borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink}}># team-sales</div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.muted}}>14 members</div>
          </div>
          <div style={{padding: '28px 34px', display: 'flex', flexDirection: 'column', gap: 30}}>
            <Line i="RA" bg="#5B8C5A" name="Raj" time="10:02" p={old}>
              Anyone free for lunch?
            </Line>
            <Line i="YOU" bg={C.amber} fg={C.ink} name="You" time="10:14" p={mine}>
              <div style={{minHeight: 96}}>
                <div style={{fontWeight: 800}}>
                  {l1}
                  {t < 5.3 ? caret : ''}
                </div>
                <div style={{fontWeight: 800}}>
                  {l2}
                  {t >= 5.3 ? caret : ''}
                </div>
              </div>
              <div style={{display: 'flex', gap: 12, marginTop: 14, height: 52}}>
                {r1 > 0 && (
                  <div style={{opacity: Math.min(1, r1 * 2), scale: String(0.6 + 0.4 * r1), background: 'rgba(224,169,59,0.25)', border: `2px solid ${C.amber}`, borderRadius: 999, padding: '4px 16px', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.ink, whiteSpace: 'nowrap'}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <svg width={26} height={24} viewBox="0 0 26 24"><path d="M13 23 L3 13 A6 6 0 0 1 13 5 A6 6 0 0 1 23 13 Z" fill={C.red} /></svg>
                      {cnt}
                    </span>
                  </div>
                )}
                {r2 > 0 && (
                  <div style={{opacity: Math.min(1, r2 * 2), scale: String(0.6 + 0.4 * r2), background: '#F1EEE9', borderRadius: 999, padding: '4px 16px', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.ink, whiteSpace: 'nowrap'}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <svg width={26} height={26} viewBox="0 0 36 36"><path d="M6 19 L14 27 L30 9" stroke={C.green} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      3
                    </span>
                  </div>
                )}
              </div>
            </Line>
            <Line i="DA" bg="#3F6FB5" name="Dana (boss)" time="10:16" p={reply}>
              Great work. Let's talk about this account on Friday.
            </Line>
          </div>
        </div>
      </Push>
      <TypeClicks steps={STEPS1} />
      <TypeClicks steps={STEPS2} />
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={6.3} name="send" volume={0.3} />
      <Sfx at={6.5} name="pop" volume={0.28} />
      <Sfx at={6.9} name="pop" volume={0.28} />
      <Sfx at={7.4} name="ping" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: make your wins visible.', start: 0.7, end: 3.05, key: 'visible', se: 2.77},
          {text: 'When something ships, post two lines in the team channel.', start: 3.15, end: 5.85, key: 'two lines', se: 5.55},
          {text: '"Client deck sent. They signed off."', start: 5.95, end: 8.3, key: 'signed', se: 7.86},
        ]}
      />
    </Paper>
  );
};

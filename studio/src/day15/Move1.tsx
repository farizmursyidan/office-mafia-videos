import React from 'react';
import {interpolate} from 'remotion';
import {Underline} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, Paper, Pill, Push, card, ez, float, useT} from './kit';

/* 3. Move 1: the Friday update, three lines. Done, next, blocked. Your boss forwards it up. */
const ROWS = [
  {tag: 'DONE', c: C.green, text: 'Vendor contract signed', at: 6.0},
  {tag: 'NEXT', c: C.amber, text: 'Launch test on Tuesday', at: 6.78},
  {tag: 'BLOCKED', c: C.red, text: 'Need legal sign-off', at: 7.59},
];
export const Move1: React.FC = () => {
  const {t} = useT();
  const mail = ez(t, 0.15, 0.55);
  const fri = ez(t, 4.1, 0.45);
  const sent = ez(t, 8.1, 0.45);
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Update before they ask" />
        <div style={{...card, top: 440, padding: '24px 36px 30px', opacity: mail, translate: `0px ${(1 - mail) * 60 + float(t)}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 14, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted}}>To</div>
            <Av i="MA" bg="#3F6FB5" size={52} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>Mark</div>
            <Pill p={fri} bg={C.ink} size={22} style={{position: 'relative', marginLeft: 'auto'}}>
              FRI 4:00 PM
            </Pill>
          </div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink, marginTop: 18}}>
            {'Atlas: '}
            <Underline color={C.amber} strokeWidth={5} seed={7} progress={interpolate(t, [4.4, 5.0], [0, 1], {...CL, easing: INOUT})}>
              <span>3 lines</span>
            </Underline>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 22}}>
            {ROWS.map((r) => {
              const p = ez(t, r.at, 0.45);
              return (
                <div key={r.tag} style={{display: 'flex', alignItems: 'center', gap: 20, height: 64}}>
                  <div style={{width: 190, flexShrink: 0, opacity: 0.35 + 0.65 * p}}>
                    <div style={{display: 'inline-block', background: r.c, color: r.tag === 'NEXT' ? C.ink : C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 2, padding: '8px 16px', borderRadius: 12}}>{r.tag}</div>
                  </div>
                  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink, whiteSpace: 'nowrap', opacity: p, translate: `${(1 - p) * 40}px 0px`}}>{r.text}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{position: 'absolute', left: 70, right: 70, top: 1015, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 16, opacity: sent, translate: `0px ${(1 - sent) * 30}px`}}>
          <div style={{background: C.white, borderRadius: 24, padding: '16px 26px', fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.ink, boxShadow: '0 10px 24px rgba(60,45,20,0.14)', whiteSpace: 'nowrap'}}>Perfect. Forwarding to Elena.</div>
          <Av i="MA" bg="#3F6FB5" size={70} />
        </div>
      </Push>
      <Sfx at={0.15} name="whoosh" volume={0.18} />
      <Sfx at={4.1} name="blip" volume={0.3} />
      {ROWS.map((r) => (
        <Sfx key={r.tag} at={r.at} name="click" volume={0.35} />
      ))}
      <Sfx at={8.1} name="ping" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: send the update before they ask.', start: 0.45, end: 3.95, key: 'before', se: 3.48},
          {text: 'Every Friday, three lines. Done, next, blocked.', start: 4.05, end: 8.9, key: 'Friday,', se: 7.94},
        ]}
      />
    </Paper>
  );
};

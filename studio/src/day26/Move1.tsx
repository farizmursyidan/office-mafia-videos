import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Av, CL, Caps, Label, Mark, OUT, Paper, Push, RAJ, card, ez, useT} from './kit';

/* 3. Move 1: the lunch week. Four days with the crew, Wednesday flips to the Sales team. You ask what they're stuck on, Raj from Sales answers. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const MSG = "What are you stuck on this month?";
const STEPS = [{text: MSG, from: 4.75, to: 6.2, mode: 'type' as const}];
export const Move1: React.FC = () => {
  const {f, t} = useT();
  const week = ez(t, 0.2, 0.5);
  const flip = interpolate(t, [3.1, 3.5], [0, 1], {...CL, easing: POP});
  const chat = ez(t, 3.6, 0.45);
  const hi = ez(t, 3.9, 0.35);
  const reply = ez(t, 6.45, 0.4);
  const caret = Math.floor(t * 2.5) % 2 === 0 && t < 6.25 ? '|' : '';
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Rotate your lunch" />
        {/* lunch week */}
        <div style={{...card, top: 440, height: 300, padding: '26px 40px', boxSizing: 'border-box', opacity: week, translate: `0px ${(1 - week) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 2, color: C.muted, marginBottom: 18}}>LUNCH THIS WEEK</div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {DAYS.map((d, i) => {
              const isWed = i === 2;
              const p = isWed ? flip : 0;
              return (
                <div key={d} style={{width: 150, height: 160, borderRadius: 22, background: p > 0.5 ? C.amber : '#F1EEE9', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, scale: String(1 + 0.08 * Math.sin(p * Math.PI))}}>
                  <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>{d}</div>
                  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, color: p > 0.5 ? C.ink : C.muted, whiteSpace: 'nowrap'}}>{p > 0.5 ? 'SALES' : 'CREW'}</div>
                </div>
              );
            })}
          </div>
        </div>
        {/* chat */}
        <div style={{...card, top: 770, height: 410, padding: '26px 40px', boxSizing: 'border-box', opacity: chat, translate: `0px ${(1 - chat) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, paddingBottom: 18, borderBottom: '2px solid #EEEAE4'}}>
            <Av i="RA" bg={RAJ.shirt} size={60} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>Raj (Sales)</div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.muted}}>Wed 12:40</div>
          </div>
          <div style={{display: 'flex', marginTop: 16, opacity: hi, translate: `0px ${(1 - hi) * 20}px`}}>
            <div style={{background: '#F1EEE9', color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 34, lineHeight: 1.2, padding: '16px 26px', borderRadius: 26, whiteSpace: 'nowrap'}}>Sure, grab a seat!</div>
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 16, opacity: ez(t, 4.6, 0.25)}}>
            <div style={{background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 34, lineHeight: 1.2, padding: '16px 26px', borderRadius: 26, whiteSpace: 'nowrap', minWidth: 120}}>
              {typedText(f, STEPS)}
              {caret}
            </div>
          </div>
          <div style={{display: 'flex', marginTop: 16, opacity: reply, translate: `0px ${(1 - reply) * 20}px`}}>
            <div style={{background: '#F1EEE9', color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 34, lineHeight: 1.2, padding: '16px 26px', borderRadius: 26, whiteSpace: 'nowrap'}}>Pricing approvals. Got ideas?</div>
          </div>
        </div>
      </Push>
      <TypeClicks steps={STEPS} />
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={3.1} name="pop" volume={0.3} />
      <Sfx at={3.9} name="pop" volume={0.24} />
      <Sfx at={6.45} name="ping" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: rotate your lunch.', start: 0.74, end: 3.05, key: 'rotate', se: 2.72},
          {text: 'Once a week, sit with a different team', start: 3.14, end: 4.55, key: 'different', se: 4.5},
          {text: "and ask what they're stuck on this month.", start: 4.6, end: 7.0, key: 'stuck', se: 6.31},
        ]}
      />
    </Paper>
  );
};

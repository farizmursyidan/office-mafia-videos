import React from 'react';
import {interpolate} from 'remotion';
import {CrossedOff, Underline} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Mark, Night, OUT, Push, ez, float, mix, useT} from './kit';

/* 2. The rule: your boss's boss sees you only through your boss. If your boss can't explain your work, it never happened. */
const CHAIN = [
  {i: 'EL', bg: '#8E6845', label: 'VP', x: 90, at: 2.3},
  {i: 'MA', bg: '#3F6FB5', label: 'YOUR BOSS', x: 395, at: 2.9},
  {i: 'YOU', bg: C.amber, label: 'YOU', x: 700, at: 3.5},
];
export const Rule: React.FC = () => {
  const {t} = useT();
  const lens = ez(t, 4.2, 0.6);
  const work = ez(t, 6.0, 0.6);
  const uh = ez(t, 7.2, 0.4);
  const fadeWork = interpolate(t, [7.9, 8.6], [1, 0.45], {...CL, easing: INOUT});
  return (
    <Night>
      <Push>
        <Mark dark />
        <div style={{position: 'absolute', top: 230, left: 80, right: 80, fontFamily: SANS}}>
          <div style={{fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber, opacity: interpolate(t, [0.2, 0.7], [0, 1], {...CL, easing: OUT})}}>THE RULE NOBODY TELLS YOU</div>
          <div style={{overflow: 'hidden', marginTop: 14, paddingBottom: 8}}>
            <div style={{fontWeight: 900, fontSize: 72, lineHeight: 1.05, color: C.white, translate: interpolate(t, [0.3, 0.9], ['0px 170px', '0px 0px'], {...CL, easing: OUT})}}>
              {'Seen only '}
              <Underline color={C.amber} strokeWidth={6} seed={9} progress={interpolate(t, [4.3, 4.9], [0, 1], {...CL, easing: INOUT})}>
                <span>through your boss</span>
              </Underline>
            </div>
          </div>
        </div>
        {/* chain VP -> boss -> you */}
        {CHAIN.map((p, k) => {
          const o = ez(t, p.at, 0.5);
          const isBoss = k === 1;
          return (
            <div key={p.i} style={{position: 'absolute', left: p.x, top: 560 + float(t, k), width: 290, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: o, translate: `0px ${(1 - o) * 40}px`}}>
              <div style={{borderRadius: '50%', boxShadow: isBoss ? `0 0 0 ${10 * lens}px rgba(224,169,59,${0.9 * lens})` : 'none', scale: String(isBoss ? mix(1, 1.12, lens) : 1)}}>
                <Av i={p.i} bg={p.bg} fg={k === 2 ? C.ink : C.white} size={130} />
              </div>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: C.muted}}>{p.label}</div>
            </div>
          );
        })}
        {[0, 1].map((k) => {
          const p = interpolate(t, [CHAIN[k + 1].at - 0.1, CHAIN[k + 1].at + 0.4], [0, 1], {...CL, easing: OUT});
          return (
            <div
              key={k}
              style={{
                position: 'absolute',
                left: CHAIN[k].x + 225,
                top: 622,
                width: 160 * p,
                height: 0,
                borderTop: `6px ${k === 1 ? 'dashed' : 'solid'} ${k === 1 ? C.muted : C.amber}`,
              }}
            />
          );
        })}
        {/* your work, as the VP sees it */}
        <div
          style={{
            position: 'absolute',
            left: 90,
            right: 90,
            top: 860,
            padding: '24px 34px',
            borderRadius: 30,
            background: C.nightSoft,
            border: '3px solid #333',
            opacity: work * fadeWork,
            translate: `0px ${(1 - work) * 50}px`,
          }}
        >
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 3, color: C.muted}}>YOUR WORK THIS QUARTER</div>
          <div style={{display: 'flex', gap: 20, marginTop: 16}}>
            {['Atlas launch', '3 vendor deals'].map((w, i) => (
              <CrossedOff key={w} color={C.red} strokeWidth={6} seed={i + 2} progress={interpolate(t, [7.9 + i * 0.2, 8.5 + i * 0.2], [0, 1], {...CL, easing: INOUT})}>
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.white, background: '#2A2A2A', padding: '10px 22px', borderRadius: 16, whiteSpace: 'nowrap'}}>{w}</div>
              </CrossedOff>
            ))}
          </div>
        </div>
        <div style={{position: 'absolute', left: 400, top: 470, opacity: uh, scale: String(mix(0.85, 1, uh)), transformOrigin: 'left bottom'}}>
          <div style={{background: C.white, color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 34, padding: '12px 24px', borderRadius: 22, whiteSpace: 'nowrap'}}>Uh, they did... stuff?</div>
        </div>
      </Push>
      <Sfx at={2.3} name="blip" volume={0.28} />
      <Sfx at={4.2} name="whoosh" volume={0.2} />
      <Sfx at={7.2} name="pop" volume={0.33} />
      <Sfx at={7.9} name="snip" volume={0.3} />
      <Caps
        dark
        top={1250}
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.36, end: 2.1, key: 'nobody', se: 1.7},
          {text: "Your boss's boss only sees you through your boss.", start: 2.23, end: 5.85, key: 'through', se: 5.47},
          {text: "If your boss can't explain your work, it didn't happen.", start: 5.96, end: 9.6, key: 'explain', se: 8.4},
        ]}
      />
    </Night>
  );
};

import React from 'react';
import {interpolate} from 'remotion';
import {Underline} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Mark, Night, OUT, Push, ez, float, mix, useT} from './kit';

/* 2. The rule: gossip is a loyalty test. Whoever brings it to you is already carrying yours to someone else. */
const CHAIN = [
  {i: 'RA', bg: '#5B8C5A', label: 'RAJ', x: 90, at: 2.5},
  {i: 'PR', bg: '#B5523F', label: 'PRIYA', x: 395, at: 2.9},
  {i: 'YOU', bg: C.amber, label: 'YOU', x: 700, at: 4.4},
];
const OUTS = [
  {i: 'ME', bg: '#9A5BB0', name: 'Mei', at: 5.7},
  {i: 'TO', bg: '#4F7F8C', name: 'Tom', at: 6.05},
  {i: 'SA', bg: '#8E6845', name: 'Sam', at: 6.4},
];
export const Rule: React.FC = () => {
  const {t} = useT();
  const lens = ez(t, 3.0, 0.6);
  const drop = interpolate(t, [5.2, 5.8], [0, 1], {...CL, easing: OUT});
  const box = ez(t, 5.5, 0.5);
  return (
    <Night>
      <Push>
        <Mark dark />
        <div style={{position: 'absolute', top: 230, left: 80, right: 80, fontFamily: SANS}}>
          <div style={{fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber, opacity: interpolate(t, [0.2, 0.7], [0, 1], {...CL, easing: OUT})}}>THE RULE NOBODY TELLS YOU</div>
          <div style={{overflow: 'hidden', marginTop: 14, paddingBottom: 8}}>
            <div style={{fontWeight: 900, fontSize: 72, lineHeight: 1.05, color: C.white, translate: interpolate(t, [0.3, 0.9], ['0px 170px', '0px 0px'], {...CL, easing: OUT})}}>
              {'Gossip is a '}
              <Underline color={C.amber} strokeWidth={6} seed={9} progress={interpolate(t, [3.0, 3.6], [0, 1], {...CL, easing: INOUT})}>
                <span>loyalty test</span>
              </Underline>
            </div>
          </div>
        </div>
        {CHAIN.map((p, k) => {
          const o = ez(t, p.at, 0.5);
          const hot = k === 1;
          return (
            <div key={p.i} style={{position: 'absolute', left: p.x, top: 500 + float(t, k), width: 290, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: o, translate: `0px ${(1 - o) * 40}px`}}>
              <div style={{borderRadius: '50%', boxShadow: hot ? `0 0 0 ${10 * lens}px rgba(200,65,58,${0.85 * lens})` : 'none', scale: String(hot ? mix(1, 1.1, lens) : 1)}}>
                <Av i={p.i} bg={p.bg} fg={k === 2 ? C.ink : C.white} size={130} />
              </div>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: C.muted}}>{p.label}</div>
            </div>
          );
        })}
        {[0, 1].map((k) => {
          const p = interpolate(t, [CHAIN[k + 1].at - 0.1, CHAIN[k + 1].at + 0.4], [0, 1], {...CL, easing: OUT});
          return <div key={k} style={{position: 'absolute', left: CHAIN[k].x + 225, top: 562, width: 160 * p, height: 0, borderTop: `6px solid ${C.amber}`}} />;
        })}
        {/* Priya to everyone else, carrying what you said */}
        <div style={{position: 'absolute', left: 537, top: 740, width: 0, height: 120 * drop, borderLeft: `6px dashed ${C.red}`}} />
        <div
          style={{
            position: 'absolute',
            left: 90,
            right: 90,
            top: 870,
            padding: '24px 34px',
            borderRadius: 30,
            background: C.nightSoft,
            border: '3px solid #333',
            opacity: box,
            translate: `0px ${(1 - box) * 50}px`,
          }}
        >
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 3, color: C.muted}}>WHAT PRIYA TELLS THEM NEXT</div>
          <div style={{display: 'flex', gap: 22, marginTop: 18}}>
            {OUTS.map((o) => {
              const p = ez(t, o.at, 0.45);
              return (
                <div key={o.i} style={{flex: 1, display: 'flex', alignItems: 'center', gap: 12, background: '#2A2A2A', borderRadius: 18, padding: '12px 16px', opacity: p, translate: `0px ${(1 - p) * 26}px`}}>
                  <Av i={o.i} bg={o.bg} size={56} />
                  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.white, lineHeight: 1.15}}>
                    {o.name}
                    <div style={{color: C.amber, fontSize: 22}}>hears YOU</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Push>
      <Sfx at={2.5} name="blip" volume={0.28} />
      <Sfx at={3.0} name="whoosh" volume={0.2} />
      <Sfx at={4.4} name="blip" volume={0.28} />
      {OUTS.map((o) => (
        <Sfx key={o.i} at={o.at} name="pop" volume={0.26} />
      ))}
      <Caps
        dark
        top={1250}
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.4, end: 2.2, key: 'nobody', se: 1.9},
          {text: 'Gossip is a loyalty test.', start: 2.3, end: 4.3, key: 'loyalty', se: 4.11},
          {text: 'Whoever brings it to you is already carrying yours to someone else.', start: 4.33, end: 8.3, key: 'yours', se: 7.46},
        ]}
      />
    </Night>
  );
};

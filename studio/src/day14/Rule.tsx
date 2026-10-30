import React from 'react';
import {interpolate} from 'remotion';
import {Underline} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Mark, Night, OUT, Push, ez, float, mix, useT} from './kit';

/* 2. The rule: your reputation is decided in a room you're not in, so you need someone inside saying your name */
const INSIDE = [
  {i: 'PR', bg: '#3F6FB5', x: 110, y: 680},
  {i: 'DA', bg: '#8E6845', x: 330, y: 820},
  {i: 'MK', bg: '#5B8C5A', x: 130, y: 870},
];
export const Rule: React.FC = () => {
  const {t} = useT();
  const room = ez(t, 2.4, 0.7);
  const you = ez(t, 3.6, 0.6);
  const ally = ez(t, 6.0, 0.6);
  const bub = ez(t, 7.0, 0.5);
  return (
    <Night>
      <Push>
        <Mark dark />
        <div style={{position: 'absolute', top: 230, left: 80, right: 80, fontFamily: SANS}}>
          <div style={{fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber, opacity: interpolate(t, [0.3, 0.8], [0, 1], {...CL, easing: OUT})}}>THE RULE NOBODY TELLS YOU</div>
          <div style={{overflow: 'hidden', marginTop: 14, paddingBottom: 8}}>
            <div style={{fontWeight: 900, fontSize: 72, lineHeight: 1.05, color: C.white, translate: interpolate(t, [0.4, 1.0], ['0px 170px', '0px 0px'], {...CL, easing: OUT})}}>
              {'Decided in rooms '}
              <Underline color={C.amber} strokeWidth={6} seed={9} progress={interpolate(t, [4.4, 5.0], [0, 1], {...CL, easing: INOUT})}>
                <span>{"you're not in"}</span>
              </Underline>
            </div>
          </div>
        </div>
        {/* the room */}
        <div
          style={{
            position: 'absolute',
            left: 70,
            top: 600,
            width: 560,
            height: 420,
            borderRadius: 34,
            border: '4px solid #3A3A3A',
            background: C.nightSoft,
            opacity: room,
            translate: `0px ${(1 - room) * 60}px`,
          }}
        >
          <div style={{position: 'absolute', left: 30, top: 22, fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 3, color: C.muted}}>ROOM 4B</div>
        </div>
        {INSIDE.map((p, k) => {
          const isAlly = k === 1;
          const o = ez(t, 2.7 + k * 0.2, 0.5);
          return (
            <div key={p.i} style={{position: 'absolute', left: p.x, top: p.y + float(t, k), opacity: o, scale: String(isAlly ? mix(1, 1.15, ally) : 1)}}>
              <div style={{borderRadius: '50%', boxShadow: isAlly ? `0 0 0 ${8 * ally}px rgba(224,169,59,${0.9 * ally})` : 'none'}}>
                <Av i={p.i} bg={p.bg} size={110} />
              </div>
            </div>
          );
        })}
        {/* the wall and you outside */}
        <div style={{position: 'absolute', left: 750, top: 760, opacity: you, translate: `${(1 - you) * 60}px ${float(t, 3)}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
          <div style={{filter: `grayscale(${1 - ally * 0.6})`, opacity: mix(0.55, 1, ally)}}>
            <Av i="YOU" bg={C.amber} fg={C.ink} size={130} />
          </div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: C.muted}}>OUTSIDE</div>
        </div>
        {/* the ally says your name */}
        <div
          style={{
            position: 'absolute',
            left: 262,
            top: 690,
            opacity: bub,
            scale: String(mix(0.85, 1, bub)),
            transformOrigin: 'left bottom',
            translate: `0px ${(1 - bub) * 20}px`,
          }}
        >
          <div style={{background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 34, padding: '16px 24px', borderRadius: 24, whiteSpace: 'nowrap'}}>YOU fixed that last month.</div>
          <div style={{position: 'absolute', bottom: -20, left: 90, width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: `22px solid ${C.amber}`}} />
        </div>
      </Push>
      <Sfx at={2.4} name="whoosh" volume={0.22} />
      <Sfx at={6.0} name="blip" volume={0.32} />
      <Sfx at={7.0} name="pop" volume={0.35} />
      <Caps
        dark
        top={1250}
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.5, end: 2.45, key: 'nobody', se: 1.91},
          {text: "Your reputation gets decided in rooms you're not in.", start: 2.5, end: 5.85, key: 'reputation', se: 5.29},
          {text: 'You need people in those rooms who say your name.', start: 5.9, end: 9.4, key: 'name.', se: 8.53},
        ]}
      />
    </Night>
  );
};

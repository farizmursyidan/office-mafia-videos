import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, Bub, CL, Caps, INOUT, Label, Mark, OUT, Paper, Push, ez, mix, useT} from './kit';

/* 4. Move 2: you credit your boss in front of the VP, the credit climbs the chain, and it comes back down to you. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const NODES = [
  {i: 'YOU', bg: C.amber, fg: C.ink, n: 'You', x: 120, y: 990, at: 0.3},
  {i: 'DA', bg: '#3F6FB5', fg: C.white, n: 'Dana, boss', x: 460, y: 830, at: 0.45},
  {i: 'KA', bg: '#2F3A4F', fg: C.white, n: 'Karen, VP', x: 800, y: 670, at: 0.6},
];
const R = 60; // avatar radius
export const Move2: React.FC = () => {
  const {t} = useT();
  const halo = ez(t, 1.73, 0.5);
  const up = interpolate(t, [5.75, 6.9], [0, 2], {...CL, easing: INOUT});
  const back = interpolate(t, [7.0, 7.9], [0, 1], {...CL, easing: INOUT});
  const plus = interpolate(t, [7.75, 8.05], [0, 1], {...CL, easing: POP});
  const c = NODES.map((n) => ({x: n.x + R, y: n.y + R}));
  const seg = Math.min(1, Math.floor(up));
  const u = up - seg;
  const star = up >= 2 ? c[2] : {x: mix(c[seg].x, c[seg + 1].x, u), y: mix(c[seg].y, c[seg + 1].y, u)};
  const ret = `M ${c[2].x} ${c[2].y + R + 70} C ${c[2].x + 40} ${c[0].y + 120}, ${c[0].x + 300} ${c[0].y + 60}, ${c[0].x + R + 20} ${c[0].y + 10}`;
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Make your boss shine" />
        <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
          <path d={`M ${c[0].x} ${c[0].y} L ${c[1].x} ${c[1].y} L ${c[2].x} ${c[2].y}`} stroke="#CFC8BC" strokeWidth={6} strokeDasharray="14 14" fill="none" opacity={ez(t, 0.5, 0.5)} />
          <path d={ret} stroke={C.green} strokeWidth={8} fill="none" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - back} />
          {back > 0.95 && <path d={`M ${c[0].x + R + 46} ${c[0].y - 4} L ${c[0].x + R + 14} ${c[0].y + 12} L ${c[0].x + R + 44} ${c[0].y + 34}`} stroke={C.green} strokeWidth={8} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
        {NODES.map((n, k) => {
          const p = ez(t, n.at, 0.45);
          return (
            <div key={n.n} style={{position: 'absolute', left: n.x, top: n.y, width: 2 * R, opacity: p, translate: `0px ${(1 - p) * 30}px`}}>
              {k === 1 && <div style={{position: 'absolute', left: -18, top: -18, width: 2 * R + 36, height: 2 * R + 36, borderRadius: '50%', background: `rgba(224,169,59,${0.45 * halo})`, scale: String(0.7 + 0.3 * halo)}} />}
              <div style={{position: 'relative'}}>
                <Av i={n.i} bg={n.bg} fg={n.fg} size={2 * R} />
              </div>
              <div style={{position: 'absolute', top: 2 * R + 8, left: -80, right: -80, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.ink, whiteSpace: 'nowrap'}}>{n.n}</div>
            </div>
          );
        })}
        {up > 0 && (
          <div style={{position: 'absolute', left: star.x - 34, top: star.y - 34 - 80, width: 68, height: 68, opacity: interpolate(t, [5.75, 5.95], [0, 1], CL)}}>
            <svg width={68} height={68} viewBox="0 0 24 24">
              <path d="M12 2 L14.9 8.6 L22 9.3 L16.6 14 L18.2 21 L12 17.3 L5.8 21 L7.4 14 L2 9.3 L9.1 8.6 Z" fill={C.amber} stroke={C.ink} strokeWidth={1.2} />
            </svg>
          </div>
        )}
        {plus > 0 && (
          <div style={{position: 'absolute', left: 90, top: 900, opacity: interpolate(plus, [0, 0.4], [0, 1], CL), scale: String(interpolate(t, [7.75, 8.05], [1.4, 1], {...CL, easing: OUT}))}}>
            <div style={{background: C.green, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 34, padding: '6px 20px', borderRadius: 999, whiteSpace: 'nowrap'}}>+ CREDIT</div>
          </div>
        )}
        <Bub at={3.47} left={70} top={440} width={900} tail="left" size={44}>
          "My manager pushed us to fix it."
        </Bub>
      </Push>
      <Sfx at={1.73} name="blip" volume={0.28} />
      <Sfx at={3.47} name="pop" volume={0.32} />
      <Sfx at={5.75} name="whoosh" volume={0.2} />
      <Sfx at={7.0} name="whoosh" volume={0.2} />
      <Sfx at={7.75} name="ping" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: make your boss look good.', start: 0.6, end: 3.3, key: 'good', se: 2.99},
          {text: '"My manager pushed us to fix it."', start: 3.47, end: 5.62, key: 'manager', se: 5.52},
          {text: 'Credit that flows up comes back to you.', start: 5.75, end: 8.7, key: 'credit back', se: 8.09},
        ]}
      />
    </Paper>
  );
};

import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {Circle, CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Camera, Caps, INOUT, Mark, OUT, Paper, Pill, card, ez, mix, useT} from './kit';

/* 1. Hook: the confidential reorg plan reshuffles the org chart. Your boss knows. Your line gets cut. */
type Node = {id: string; name: string; sub?: string; a: [number, number]; b: [number, number]; arc?: number};
const NODES: Node[] = [
  {id: 'ceo', name: 'CEO', a: [540, 575], b: [540, 575]},
  {id: 'vps', name: 'VP Sales', a: [300, 715], b: [300, 715]},
  {id: 'vpn', name: 'VP Strategy', sub: 'new', a: [300, 715], b: [300, 715]},
  {id: 'vpo', name: 'VP Ops', a: [780, 715], b: [780, 715]},
  {id: 'dana', name: 'Dana', sub: 'your boss', a: [300, 885], b: [780, 885], arc: -60},
  {id: 'raj', name: 'Raj', sub: 'peer', a: [780, 885], b: [300, 885], arc: 60},
  {id: 'you', name: 'YOU', a: [300, 1055], b: [300, 1055]},
];
const BW = 250;
const BH = 96;

export const Hook: React.FC = () => {
  const {t} = useT();
  const mv = ez(t, 0.75, 1.7, INOUT); // reshuffle
  const born = ez(t, 1.6, 0.6);
  const vpsFade = 1 - ez(t, 1.25, 0.5);
  const knows = ez(t, 3.42, 0.5);
  const cut = ez(t, 4.9, 0.45);
  const stamp = interpolate(t, [5.25, 5.55], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  const shake = t > 5.3 && t < 5.65 ? Math.sin((t - 5.3) * 90) * 6 * (1 - (t - 5.3) / 0.35) : 0;

  const pos = (n: Node): [number, number] => [mix(n.a[0], n.b[0], mv), mix(n.a[1], n.b[1], mv) + (n.arc ?? 0) * Math.sin(Math.PI * mv)];
  const by = Object.fromEntries(NODES.map((n) => [n.id, n])) as Record<string, Node>;
  const path = (from: string, to: string) => {
    const [px, py] = pos(by[from]);
    const [cx, cy] = pos(by[to]);
    const my = (py + BH / 2 + cy - BH / 2) / 2;
    return `M${px} ${py + BH / 2} C${px} ${my} ${cx} ${my} ${cx} ${cy - BH / 2}`;
  };
  const edges: {from: string; to: string; o: number; you?: boolean}[] = [
    {from: 'ceo', to: 'vps', o: vpsFade},
    {from: 'ceo', to: 'vpn', o: born},
    {from: 'ceo', to: 'vpo', o: 1},
    {from: 'vps', to: 'dana', o: 1 - mv},
    {from: 'vpo', to: 'dana', o: mv},
    {from: 'vpo', to: 'raj', o: 1 - mv},
    {from: 'vpn', to: 'raj', o: mv},
    {from: 'dana', to: 'you', o: 1 - cut, you: true},
  ];
  const [dx, dy] = pos(by.dana);

  const box = (n: Node) => {
    const isYou = n.id === 'you';
    const grey = isYou && cut > 0.5;
    const bg = n.id === 'ceo' ? C.ink : isYou ? (cut > 0.3 ? '#E9E4DC' : C.amber) : '#F4F1EC';
    const ink = n.id === 'ceo' ? C.white : grey ? C.muted : C.ink;
    return (
      <div style={{width: BW, height: BH, borderRadius: 20, background: bg, border: n.id === 'vpn' ? `5px solid ${C.amber}` : 'none', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: isYou && !grey ? '0 12px 30px rgba(224,169,59,0.35)' : 'none'}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: ink, lineHeight: 1}}>{grey ? 'YOU ?' : n.name}</div>
        {n.sub && <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 21, letterSpacing: 1, color: n.id === 'vpn' ? '#B07D1A' : C.muted, marginTop: 6}}>{n.sub.toUpperCase()}</div>}
      </div>
    );
  };

  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 830, z: 1.12},
          {t: 2.7, x: 540, y: 820, z: 1.0},
          {t: 3.3, x: 540, y: 820, z: 1.0},
          {t: 4.2, x: 760, y: 870, z: 1.16},
          {t: 4.8, x: 760, y: 870, z: 1.16},
          {t: 5.7, x: 560, y: 1000, z: 1.14},
          {t: 7, x: 560, y: 1000, z: 1.16},
        ]}
      >
        <AbsoluteFill style={{translate: `${shake}px 0px`}}>
          <div style={{...card, top: 420, height: 760}} />
          <div style={{position: 'absolute', left: 110, top: 462, fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 3, color: C.muted}}>REORG PLAN</div>
          <div style={{position: 'absolute', left: 700, top: 456, width: 270, height: 48, borderRadius: 24, background: C.red, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>CONFIDENTIAL</div>
          <svg width={1080} height={1920} style={{position: 'absolute'}}>
            {edges.map((e, i) => (
              <path key={i} d={path(e.from, e.to)} fill="none" stroke={e.you ? C.amber : '#CFC6B8'} strokeWidth={6} strokeLinecap="round" opacity={e.o} strokeDasharray={e.you && cut > 0 ? `14 ${14 + 30 * cut}` : undefined} />
            ))}
          </svg>
          {NODES.map((n) => {
            const [x, y] = pos(n);
            const o = n.id === 'vps' ? vpsFade : n.id === 'vpn' ? born : 1;
            if (o <= 0.001) return null;
            let inner = box(n);
            if (n.id === 'vps') {
              inner = (
                <CrossedOff color={C.red} strokeWidth={6} seed={4} progress={interpolate(t, [0.45, 1.05], [0, 1], {...CL, easing: INOUT})}>
                  {inner}
                </CrossedOff>
              );
            }
            if (n.id === 'dana') {
              inner = (
                <Circle color={C.amber} strokeWidth={6} seed={7} padding={{left: 22, right: 22, top: 2, bottom: 6}} progress={interpolate(t, [3.45, 4.15], [0, 1], {...CL, easing: INOUT})}>
                  {inner}
                </Circle>
              );
            }
            return (
              <div key={n.id} style={{position: 'absolute', left: x - BW / 2, top: y - BH / 2, opacity: o, scale: String(n.id === 'vpn' ? mix(0.8, 1, born) : 1)}}>
                {inner}
              </div>
            );
          })}
          <Pill p={knows} bg={C.ink} size={22} style={{left: dx - 120, top: dy - BH / 2 - 64}}>
            ALREADY KNOWS
          </Pill>
          {stamp > 0 && (
            <div style={{position: 'absolute', left: 470, top: 1018, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-7deg', scale: String(interpolate(t, [5.25, 5.55], [1.7, 1], {...CL, easing: OUT, output: 'perceptual-scale'}))}}>
              <div style={{border: `6px solid ${C.red}`, color: C.red, background: 'rgba(255,255,255,0.94)', fontFamily: SANS, fontWeight: 900, fontSize: 46, letterSpacing: 3, padding: '8px 26px', borderRadius: 14}}>LAST TO KNOW</div>
            </div>
          )}
        </AbsoluteFill>
      </Camera>
      <Sfx at={0.45} name="snip" volume={0.35} />
      <Sfx at={0.75} name="whoosh" volume={0.25} />
      <Sfx at={1.6} name="pop" volume={0.3} />
      <Sfx at={3.42} name="blip" volume={0.35} />
      <Sfx at={4.9} name="snip" volume={0.4} />
      <Sfx at={5.25} name="hit" volume={0.55} />
      <Caps
        top={1290}
        caps={[
          {text: 'Your company is planning a reorg right now.', start: 0.12, end: 3.3, key: 'reorg', se: 3.11},
          {text: 'Your boss already knows.', start: 3.38, end: 4.8, key: 'knows.', se: 4.55},
          {text: "You'll be the last to know.", start: 4.84, end: 6.8, key: 'last', se: 5.98},
        ]}
      />
    </Paper>
  );
};

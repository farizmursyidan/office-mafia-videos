import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, DANA, INOUT, Label, Mark, Moon, Paper, Push, card, ez, mix, useT} from './kit';

/* 4. Move 2: incoming items get sorted into two bins. Late messages drop into LOUD (answer at 8:30). The call from Dana drops into URGENT (pick up). */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
type Item = {kind: 'msg' | 'call'; title: string; sub: string; at: number; drop: number; bin: 0 | 1; slot: number};
const ITEMS: Item[] = [
  {kind: 'msg', title: 'Idea for Q3, discuss?', sub: '9:12 PM', at: 0.9, drop: 2.7, bin: 0, slot: 0},
  {kind: 'call', title: 'Dana is calling', sub: 'Server is down', at: 3.84, drop: 5.15, bin: 1, slot: 0},
  {kind: 'msg', title: 'Fix slide colors pls', sub: '9:31 PM', at: 5.6, drop: 7.4, bin: 0, slot: 1},
];
const IN = {x: 330, y: 470, k: 1.3};
const BIN = [
  {x: 100, y: 820},
  {x: 580, y: 820},
];
const Phone: React.FC<{color: string}> = ({color}) => (
  <svg width={44} height={44} viewBox="0 0 24 24">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" fill={color} />
  </svg>
);
const ItemCard: React.FC<{it: Item; t: number}> = ({it, t}) => {
  const enter = interpolate(t, [it.at, it.at + 0.4], [0, 1], {...CL, easing: POP});
  const move = interpolate(t, [it.drop, it.drop + 0.6], [0, 1], {...CL, easing: INOUT});
  if (enter <= 0) return null;
  const b = BIN[it.bin];
  const x = mix(IN.x, b.x, move);
  const y = mix(IN.y, b.y + it.slot * 150, move);
  const k = mix(IN.k, 1, move);
  const ringing = it.kind === 'call' && move < 0.05 ? Math.sin(t * 40) * 3 : 0;
  const isCall = it.kind === 'call';
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 400,
        height: 124,
        transformOrigin: 'left top',
        scale: String(k * mix(0.8, 1, enter)),
        opacity: Math.min(1, enter * 1.5),
        rotate: `${ringing}deg`,
        background: isCall ? C.green : C.white,
        borderRadius: 26,
        boxShadow: '0 14px 30px rgba(60,45,20,0.18)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 22px',
        boxSizing: 'border-box',
      }}
    >
      {isCall ? <Phone color={C.white} /> : <Av i="DA" bg={DANA.shirt} size={56} />}
      <div style={{minWidth: 0}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 29, color: isCall ? C.white : C.ink, whiteSpace: 'nowrap'}}>{it.title}</div>
        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 4}}>
          {!isCall && <Moon size={22} />}
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, color: isCall ? 'rgba(255,255,255,0.85)' : C.muted, whiteSpace: 'nowrap'}}>{it.sub}</div>
        </div>
      </div>
    </div>
  );
};
export const Move2: React.FC = () => {
  const {t} = useT();
  const inbox = ez(t, 0.2, 0.5);
  const bins = ez(t, 0.45, 0.5);
  const glowU = interpolate(t, [5.6, 5.9, 6.6], [0, 1, 0.4], CL);
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Urgent or just loud?" />
        {/* incoming tray */}
        <div style={{...card, top: 440, height: 210, background: 'rgba(255,255,255,0.55)', border: `3px dashed ${C.muted}`, boxShadow: 'none', opacity: inbox}}>
          <div style={{position: 'absolute', left: 30, top: 18, fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.muted}}>AFTER 7 PM</div>
        </div>
        {/* bins */}
        {[
          {x: 70, title: 'LOUD', sub: 'Answer at 8:30 AM', color: C.ink, glow: 0},
          {x: 550, title: 'URGENT', sub: 'Pick up now', color: C.red, glow: glowU},
        ].map((b) => (
          <div key={b.title} style={{position: 'absolute', left: b.x, top: 690, width: 460, height: 420, background: C.white, borderRadius: 30, boxShadow: `0 20px 50px rgba(60,45,20,0.16), 0 0 0 ${6 * b.glow}px ${C.red}`, opacity: bins, translate: `0px ${(1 - bins) * 40}px`}}>
            <div style={{padding: '24px 30px 0'}}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 42, color: b.color, letterSpacing: 2}}>{b.title}</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.muted, marginTop: 2}}>{b.sub}</div>
            </div>
          </div>
        ))}
        {ITEMS.map((it) => (
          <ItemCard key={it.title} it={it} t={t} />
        ))}
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={0.9} name="ping" volume={0.26} />
      <Sfx at={2.7} name="whoosh" volume={0.16} />
      <Sfx at={3.84} name="ring" volume={0.24} />
      <Sfx at={5.15} name="whoosh" volume={0.16} />
      <Sfx at={5.6} name="ping" volume={0.26} />
      <Sfx at={7.4} name="whoosh" volume={0.16} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: sort the urgent from the loud.', start: 0.94, end: 3.75, key: 'urgent loud', se: 3.28},
          {text: "If it's truly urgent, they'll call.", start: 3.84, end: 5.4, key: 'call', se: 5.04},
          {text: "A message at nine is usually a thought they didn't want to forget.", start: 5.49, end: 8.93, key: 'thought forget', se: 8.3},
        ]}
      />
    </Paper>
  );
};

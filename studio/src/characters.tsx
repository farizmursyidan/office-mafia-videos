import React from 'react';
import {C, SANS} from './theme';

/* Flat, faceless office characters and props, drawn in SVG.
   Coordinates: a Person is drawn with feet at (0,0), about 300 units tall at scale 1. */

export type PersonProps = {
  x: number;
  y: number;
  scale?: number;
  shirt?: string;
  pants?: string;
  skin?: string;
  hair?: string;
  hairStyle?: 'short' | 'bun' | 'long';
  facing?: 1 | -1;
  walk?: number; // walk phase in radians; undefined = standing
  armL?: number; // shoulder angle in degrees (0 = hanging down, positive = forward/up)
  armR?: number;
  bob?: number;
  badge?: string;
  opacity?: number;
  lean?: number; // degrees
  sitting?: boolean;
};

export const Person: React.FC<PersonProps> = ({
  x,
  y,
  scale = 1,
  shirt = '#3F6FB5',
  pants = '#2B2B33',
  skin = '#E2B48C',
  hair = '#2A211C',
  hairStyle = 'short',
  facing = 1,
  walk,
  armL = 0,
  armR = 0,
  bob = 0,
  badge,
  opacity = 1,
  lean = 0,
  sitting = false,
}) => {
  const swing = walk === undefined ? 0 : Math.sin(walk) * 24;
  const step = walk === undefined ? 0 : Math.abs(Math.sin(walk)) * 6;
  const legL = sitting ? -80 : swing;
  const legR = sitting ? -80 : -swing;
  const armSwingL = walk === undefined ? 0 : -swing * 0.8;
  const armSwingR = walk === undefined ? 0 : swing * 0.8;
  const hipY = sitting ? -110 : -130;
  const leg = (angle: number, key: string) => (
    <g key={key} transform={`translate(0 ${hipY}) rotate(${-angle})`}>
      <rect x={-13} y={0} width={26} height={sitting ? 70 : 125} rx={13} fill={pants} />
      <rect x={-15} y={sitting ? 58 : 113} width={40} height={18} rx={9} fill="#1A1A1E" />
    </g>
  );
  const arm = (angle: number, side: number, key: string) => (
    <g key={key} transform={`translate(${side * 34} -238) rotate(${-angle * side * -1})`}>
      <rect x={-11} y={0} width={22} height={92} rx={11} fill={shirt} />
      <circle cx={0} cy={96} r={13} fill={skin} />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y - step - bob}) scale(${scale * facing} ${scale})`} opacity={opacity}>
      <ellipse cx={0} cy={4} rx={60} ry={10} fill="rgba(0,0,0,0.12)" />
      <g transform={`rotate(${lean} 0 -130)`}>
        {sitting ? (
          <>
            <g transform={`translate(0 ${hipY})`}>
              <rect x={-30} y={-6} width={110} height={30} rx={15} fill={pants} />
              <rect x={60} y={10} width={28} height={100} rx={14} fill={pants} />
              <rect x={58} y={98} width={44} height={18} rx={9} fill="#1A1A1E" />
            </g>
          </>
        ) : (
          [leg(legL, 'l'), leg(legR, 'r')]
        )}
        {arm(armL + armSwingL, -1, 'al')}
        {/* torso */}
        <rect x={-44} y={-250} width={88} height={130} rx={34} fill={shirt} />
        <rect x={-8} y={-250} width={16} height={22} rx={4} fill="rgba(255,255,255,0.35)" />
        {badge && (
          <g transform="translate(14 -200)">
            <rect x={0} y={0} width={30} height={20} rx={4} fill={C.amber} />
          </g>
        )}
        {/* neck + head */}
        <rect x={-10} y={-268} width={20} height={24} rx={8} fill={skin} />
        <circle cx={0} cy={-300} r={38} fill={skin} />
        {hairStyle === 'short' && <path d="M-38 -300 a38 38 0 0 1 76 -6 q-30 -18 -76 6 z" fill={hair} />}
        {hairStyle === 'bun' && (
          <>
            <path d="M-39 -298 a39 39 0 0 1 78 0 q-38 -24 -78 0 z" fill={hair} />
            <circle cx={-18} cy={-342} r={16} fill={hair} />
          </>
        )}
        {hairStyle === 'long' && <path d="M-40 -300 a40 40 0 0 1 80 0 v46 q-8 6 -14 0 v-40 q-26 -14 -52 0 v40 q-6 6 -14 0 z" fill={hair} />}
        {arm(armR + armSwingR, 1, 'ar')}
      </g>
    </g>
  );
};

/* ---------- Props ---------- */
export const Desk: React.FC<{x: number; y: number; w?: number; laptop?: boolean; monitor?: boolean; screenGlow?: number}> = ({
  x,
  y,
  w = 300,
  laptop,
  monitor,
  screenGlow = 0,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-16} width={w} height={22} rx={6} fill="#B98A5E" />
    <rect x={-w / 2 + 18} y={6} width={14} height={110} fill="#8E6845" />
    <rect x={w / 2 - 32} y={6} width={14} height={110} fill="#8E6845" />
    {monitor && (
      <g>
        <rect x={-70} y={-130} width={140} height={92} rx={8} fill="#24242B" />
        <rect x={-62} y={-122} width={124} height={76} rx={4} fill={`rgba(120,170,255,${0.35 + screenGlow * 0.5})`} />
        <rect x={-8} y={-38} width={16} height={22} fill="#24242B" />
      </g>
    )}
    {laptop && (
      <g>
        <path d="M-60 -16 L60 -16 L50 -22 L-50 -22 Z" fill="#9AA0A8" />
        <rect x={-50} y={-100} width={100} height={78} rx={6} fill="#5A5F68" />
        <rect x={-44} y={-94} width={88} height={66} rx={3} fill={`rgba(160,200,255,${0.4 + screenGlow * 0.5})`} />
      </g>
    )}
  </g>
);

export const Plant: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M-28 0 L28 0 L22 -50 L-22 -50 Z" fill="#C46A3E" />
    <ellipse cx={-14} cy={-80} rx={16} ry={34} fill="#3F7D5C" transform="rotate(-20 -14 -80)" />
    <ellipse cx={14} cy={-84} rx={16} ry={38} fill="#4E9A70" transform="rotate(18 14 -84)" />
    <ellipse cx={0} cy={-96} rx={14} ry={36} fill="#3F7D5C" />
  </g>
);

export const OfficeBackdrop: React.FC<{floorY?: number}> = ({floorY = 1180}) => (
  <g>
    <rect x={0} y={0} width={1080} height={floorY} fill="#E7E1D7" />
    {/* windows */}
    {[0, 1, 2].map((i) => (
      <g key={i} transform={`translate(${110 + i * 300} 280)`}>
        <rect x={0} y={0} width={240} height={340} rx={10} fill="#CFDDE6" />
        <rect x={116} y={0} width={8} height={340} fill="#E7E1D7" />
        <rect x={0} y={166} width={240} height={8} fill="#E7E1D7" />
      </g>
    ))}
    <rect x={0} y={floorY} width={1080} height={1920 - floorY} fill="#D6CCBD" />
    <rect x={0} y={floorY} width={1080} height={10} fill="#C7BBA9" />
  </g>
);

/* ---------- Ledger book ---------- */
export type LedgerEntry = {name: string; note: string; sign: '+' | '-' | ''; at: number; empty?: boolean};
export const Ledger: React.FC<{open: number; t: number; entries: LedgerEntry[]; x: number; y: number; scale?: number; highlight?: string}> = ({
  open,
  t,
  entries,
  x,
  y,
  scale = 1,
  highlight,
}) => {
  const w = 760;
  const h = 560;
  return (
    <div
      style={{
        position: 'absolute',
        left: x - (w * scale) / 2,
        top: y,
        width: w,
        height: h,
        transform: `scale(${scale}) perspective(1600px) rotateX(${(1 - open) * 70}deg)`,
        transformOrigin: 'top left',
        opacity: Math.min(1, open * 1.6),
        background: '#FBF7EE',
        borderRadius: 18,
        boxShadow: '0 30px 70px rgba(40,30,15,0.30)',
        border: '3px solid #E3D8C4',
        overflow: 'hidden',
      }}
    >
      <div style={{height: 70, background: '#3B2A20', color: '#F3E3C3', fontFamily: SANS, fontWeight: 900, fontSize: 34, letterSpacing: 6, display: 'flex', alignItems: 'center', paddingLeft: 36}}>
        THE LEDGER
      </div>
      <div style={{padding: '14px 36px'}}>
        {entries.map((e) => {
          const p = Math.max(0, Math.min(1, (t - e.at) / 0.5));
          const shown = Math.round(e.note.length * p);
          const isHl = highlight === e.name;
          return (
            <div
              key={e.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 96,
                borderBottom: '2px solid #E9DFCC',
                fontFamily: SANS,
                fontSize: 36,
                background: isHl ? 'rgba(224,169,59,0.25)' : 'transparent',
                margin: '0 -36px',
                padding: '0 36px',
              }}
            >
              <div style={{width: 160, fontWeight: 900, color: C.ink}}>{e.name}</div>
              <div style={{flex: 1, fontWeight: 500, color: e.empty ? '#A79F92' : '#4A3B2F', fontStyle: e.empty ? 'italic' : 'normal'}}>
                {e.empty ? (t >= e.at ? e.note : '') : e.note.slice(0, shown)}
              </div>
              <div style={{width: 50, textAlign: 'right', fontWeight: 900, fontSize: 48, color: e.sign === '+' ? C.green : C.red, opacity: p >= 1 ? 1 : 0}}>
                {e.sign}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

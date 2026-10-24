import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, SANS, s} from './theme';
import {Bubble, Captions, ChatCard, King, Scene, SerifLine, Sfx, StepLabel, Typing, Watermark} from './components';
import {Ledger, OfficeBackdrop, Person, Plant} from './characters';

/* Scene timeline (seconds, global), synced to public/voice/day6.wav */
export const SCENES6 = {
  hook: [0, 5.95],
  who: [5.95, 11.3],
  rule1: [11.3, 19.3],
  rule2: [19.3, 27.0],
  rule3: [27.0, 37.9],
  punch: [37.9, 42.8],
  end: [42.8, 52.6],
} as const;
export const DAY6_DURATION = SCENES6.end[1];

const Seq: React.FC<{k: keyof typeof SCENES6; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES6[k];
  return (
    <Sequence from={s(a)} durationInFrames={s(b - a)}>
      {children}
    </Sequence>
  );
};
const useT = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return {f, fps, t: f / fps};
};
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const card: React.CSSProperties = {
  position: 'absolute',
  left: 70,
  right: 70,
  background: C.white,
  borderRadius: 34,
  boxShadow: '0 30px 70px rgba(60,45,20,0.18)',
};

/* Characters used across scenes */
const MANAGER = {shirt: '#2F3E55', hair: '#2A211C', hairStyle: 'short' as const, skin: '#D9A77E'};
const YOU = {shirt: C.amber, hair: '#1E1A17', hairStyle: 'short' as const, skin: '#C99267', pants: '#2B2B33'};
const HIRE = {shirt: '#8A6FB8', hair: '#5A3B22', hairStyle: 'bun' as const, skin: '#E8BC96'};
const DAN = {shirt: '#3F7D5C', hair: '#3A2A1E', hairStyle: 'short' as const, skin: '#E2B48C'};
const DIRECTOR = {shirt: '#7A2E2A', hair: '#4A4A4A', hairStyle: 'long' as const, skin: '#D9A77E', pants: '#22222A'};

/* Desk seen from the front: top plus modesty panel, so a seated person sits behind it */
const FrontDesk: React.FC<{x: number; y: number; w?: number; children?: React.ReactNode}> = ({x, y, w = 420, children}) => (
  <g transform={`translate(${x} ${y})`}>
    {children}
    <rect x={-w / 2} y={-14} width={w} height={22} rx={6} fill="#B98A5E" />
    <rect x={-w / 2 + 12} y={8} width={w - 24} height={150} fill="#A57A50" />
    <rect x={-w / 2 + 12} y={8} width={w - 24} height={10} fill="rgba(0,0,0,0.12)" />
  </g>
);
const LaptopBack: React.FC<{x: number; glow?: number}> = ({x, glow = 0}) => (
  <g transform={`translate(${x} 0)`}>
    <rect x={-62} y={-104} width={124} height={88} rx={8} fill="#8B9099" />
    <circle cx={0} cy={-60} r={10} fill="#A9AEB6" />
    <rect x={-72} y={-18} width={144} height={8} rx={4} fill="#6E737B" />
  </g>
);
const Mug: React.FC<{x: number}> = ({x}) => (
  <g transform={`translate(${x} 0)`}>
    <rect x={-18} y={-46} width={36} height={40} rx={6} fill={C.white} />
    <path d="M18 -38 q16 0 16 12 q0 12 -16 12" fill="none" stroke={C.white} strokeWidth={6} />
  </g>
);

const Fg: React.FC<{children: React.ReactNode; k?: number}> = ({children, k = 1.45}) => (
  <g transform={`translate(540 1180) scale(${k}) translate(-540 -1180)`}>{children}</g>
);

/* Closed ledger book, drawn in SVG */
const LedgerBook: React.FC<{x: number; y: number; scale: number; rot: number; stamp: number}> = ({x, y, scale, rot, stamp}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
    <ellipse cx={0} cy={0} rx={230} ry={260} fill="rgba(224,169,59,0.18)" />
    <rect x={-150} y={-195} width={300} height={390} rx={18} fill="#3B2A20" />
    <rect x={-150} y={-195} width={34} height={390} rx={10} fill="#2C1F17" />
    <rect x={-96} y={-150} width={210} height={300} rx={10} fill="none" stroke="#C9A25A" strokeWidth={5} />
    <text x={9} y={-60} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={44} letterSpacing={6} fill="#F3E3C3">
      THE
    </text>
    <text x={9} y={-8} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={50} letterSpacing={4} fill="#F3E3C3">
      LEDGER
    </text>
    {stamp > 0 && (
      <g transform={`translate(9 78) rotate(-8) scale(${2 - stamp})`} opacity={Math.min(1, stamp * 1.4)}>
        <rect x={-108} y={-34} width={216} height={68} rx={12} fill={C.amber} />
        <text x={0} y={16} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={44} letterSpacing={4} fill={C.ink}>
          FAVORS
        </text>
      </g>
    )}
  </g>
);

const DollarBill: React.FC<{x: number; y: number; pop: number; strike: number}> = ({x, y, pop, strike}) => (
  <g transform={`translate(${x} ${y}) rotate(-10) scale(${pop})`} opacity={Math.min(1, pop)}>
    <rect x={-120} y={-60} width={240} height={120} rx={12} fill="#7FB287" />
    <rect x={-104} y={-46} width={208} height={92} rx={8} fill="none" stroke="#4E8A5A" strokeWidth={5} />
    <circle cx={0} cy={0} r={34} fill="#5E9A68" />
    <text x={0} y={18} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={52} fill="#E8F3E8">
      $
    </text>
    <line x1={-140} y1={-70} x2={-140 + 280 * strike} y2={-70 + 140 * strike} stroke={C.red} strokeWidth={16} strokeLinecap="round" />
  </g>
);

/* ---------- 1. Hook: the boss and the secret ledger ---------- */
const Hook: React.FC = () => {
  const {f, fps, t} = useT();
  const rise = interpolate(t, [1.2, 2.5], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const bob = Math.sin(f / 14) * 8 * rise;
  const bill = spring({frame: f - s(4.08), fps, config: {damping: 11, stiffness: 200}});
  const strike = interpolate(t, [4.45, 4.7], [0, 1], clamp);
  const billOut = interpolate(t, [5.0, 5.3], [1, 0], clamp);
  const stamp = spring({frame: f - s(5.06), fps, config: {damping: 9, stiffness: 260}});
  const typing = t < 1.2 ? Math.sin(f / 2) * 3 : 0;
  return (
    <Scene bg={C.paper} dur={5.95} whoosh={false}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <OfficeBackdrop />
        <Fg>
          <Plant x={905} y={1180} />
          <FrontDesk x={540} y={1036} w={480}>
            <Person x={0} y={134} bob={typing} armL={8} armR={8} {...MANAGER} />
            <LaptopBack x={-140} />
            <Mug x={160} />
          </FrontDesk>
        </Fg>
        {rise > 0 && <g opacity={Math.min(1, rise * 2)}><LedgerBook x={540} y={640 - 170 * rise + bob} scale={0.3 + 0.6 * rise} rot={(1 - rise) * -18 + Math.sin(f / 20) * 2} stamp={stamp} /></g>}
        {t >= 4.08 && (
          <g opacity={billOut}>
            <DollarBill x={215} y={470} pop={bill} strike={strike} />
          </g>
        )}
      </svg>
      <Watermark />
      <Sfx at={1.2} name="whoosh" volume={0.35} />
      <Sfx at={4.08} name="pop" volume={0.45} />
      <Sfx at={4.45} name="snip" volume={0.4} />
      <Sfx at={5.06} name="hit" volume={0.6} />
      <Captions
        top={1270}
        caps={[
          {text: 'Every decision maker in your office keeps a secret ledger.', start: 0.05, end: 4.0, key: 'ledger.', se: 3.15},
          {text: 'Not of money. Of favors.', start: 4.05, end: 5.95, key: 'favors.', se: 5.84},
        ]}
      />
    </Scene>
  );
};

/* ---------- 2. Inside the ledger ---------- */
const Who: React.FC = () => {
  const {f, fps, t} = useT();
  const open = spring({frame: f, fps, config: {damping: 16, stiffness: 120}});
  const hl = t >= 3.5 ? 'You' : undefined;
  const pulse = t >= 3.5 ? 1 + 0.015 * Math.sin((f - s(3.5)) / 3) : 1;
  return (
    <Scene bg={C.paper} dur={5.35}>
      <Watermark />
      <div style={{position: 'absolute', inset: 0, transform: `scale(${pulse})`, transformOrigin: '540px 700px'}}>
        <Ledger
          open={open}
          t={t}
          x={540}
          y={360}
          scale={1.24}
          highlight={hl}
          entries={[
            {name: 'Sarah', note: 'covered for me', sign: '+', at: 0.4},
            {name: 'Tom', note: 'missed my deadline', sign: '-', at: 1.37},
            {name: 'Priya', note: 'intro to the VP', sign: '+', at: 1.95},
            {name: 'You', note: 'No entries', sign: '', at: 3.48, empty: true},
          ]}
        />
      </div>
      <Sfx at={0.4} name="blip" volume={0.35} />
      <Sfx at={1.37} name="blip" volume={0.35} />
      <Sfx at={1.95} name="blip" volume={0.3} />
      <Sfx at={3.48} name="lock" volume={0.45} />
      <Captions
        top={1250}
        caps={[
          {text: 'Who helped them. Who cost them.', start: 0.4, end: 2.55, key: 'helped cost', se: 2.29},
          {text: 'And most people never open an account.', start: 2.6, end: 5.35, key: 'account.', se: 4.42},
        ]}
      />
    </Scene>
  );
};

/* ---------- 3. Rule 1: small favors early ---------- */
const Rule1: React.FC = () => {
  const {f, fps, t} = useT();
  // Phase A: week 2, you walk over and help
  const walkP = interpolate(t, [0.9, 2.7], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
  const walking = t >= 0.9 && t < 2.7;
  const youX = 100 + 280 * walkP;
  const point = interpolate(t, [2.8, 3.1], [0, 1], clamp);
  const fixed = spring({frame: f - s(3.3), fps, config: {damping: 11, stiffness: 220}});
  const week = spring({frame: f - s(1.6), fps, config: {damping: 12}});
  const aOut = interpolate(t, [5.75, 6.0], [1, 0], clamp);
  // Phase B: 3 years later, they hand you the project
  const bIn = interpolate(t, [5.85, 6.15], [0, 1], clamp);
  const later = spring({frame: f - s(5.9), fps, config: {damping: 13}});
  const hand = interpolate(t, [6.4, 7.1], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const folderX = 625 - 165 * hand;
  return (
    <Scene bg={C.paper} dur={8.0}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <OfficeBackdrop />
        <g opacity={aOut}>
          <Fg>
          <Plant x={930} y={1180} />
          <FrontDesk x={680} y={1036} w={380}>
            <Person x={0} y={134} armL={6} armR={6} {...HIRE} />
            <LaptopBack x={-110} glow={t >= 3.3 ? 1 : 0.4} />
          </FrontDesk>
          <Person x={youX} y={1180} walk={walking ? f / 3.2 : undefined} facing={1} armL={point * 95} {...YOU} />
          </Fg>
          {t >= 3.3 && (
            <g transform={`translate(560 760) scale(${fixed * 1.3})`}>
              <circle r={42} fill={C.green} />
              <path d="M-18 2 L-5 15 L20 -12" fill="none" stroke={C.white} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
        </g>
        <g opacity={bIn}>
          <rect x={0} y={0} width={1080} height={1180} fill="rgba(224,169,59,0.10)" />
          <Fg>
          <Person x={720} y={1180} facing={-1} armL={70} badge="M" {...HIRE} shirt="#2F3E55" />
          <Person x={360} y={1180} facing={1} armL={hand > 0.5 ? 70 : 0} {...YOU} />
          <g transform={`translate(${folderX} ${1000 - 25 * Math.sin(hand * Math.PI)}) rotate(${-6 + 12 * hand})`}>
            <rect x={-62} y={-44} width={124} height={88} rx={8} fill={C.amber} />
            <rect x={-62} y={-54} width={52} height={16} rx={5} fill="#C89428" />
          </g>
          </Fg>
        </g>
      </svg>
      <Watermark />
      <StepLabel n="1/3" title="Small favors early" />
      {t >= 1.6 && t < 6.0 && (
        <div style={{position: 'absolute', top: 560, left: 640, opacity: Math.min(week, aOut), transform: `scale(${week})`}}>
          <div style={{background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 34, padding: '10px 24px', borderRadius: 999, letterSpacing: 2}}>WEEK 2</div>
        </div>
      )}
      {t >= 5.9 && (
        <div style={{position: 'absolute', top: 440, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, opacity: later, transform: `translateY(${(1 - later) * 30}px)`}}>
          <div style={{background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 38, padding: '12px 30px', borderRadius: 999, letterSpacing: 3}}>3 YEARS LATER</div>
          {t >= 7.0 && (
            <div style={{background: C.white, color: C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 34, padding: '12px 26px', borderRadius: 18, boxShadow: '0 10px 30px rgba(60,45,20,0.15)'}}>
              {'"I want you on the new project."'}
            </div>
          )}
        </div>
      )}
      <Sfx at={3.3} name="ping" volume={0.45} />
      <Sfx at={5.9} name="whoosh" volume={0.35} />
      <Sfx at={7.0} name="pop" volume={0.4} />
      <Captions
        top={1270}
        caps={[
          {text: 'Rule one: small favors early beat big favors late.', start: 0.42, end: 4.4, key: 'early', se: 3.85},
          {text: 'Help someone in their second week and they remember it for years.', start: 4.42, end: 8.0, key: 'years.', se: 7.2},
        ]}
      />
    </Scene>
  );
};

/* ---------- 4. Rule 2: never name the debt ---------- */
const Rule2: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.2), fps, config: {damping: 15}});
  const drain = interpolate(t, [5.13, 5.7], [1, 0], {...clamp, easing: Easing.in(Easing.cubic)});
  const value = Math.round(100 * drain);
  const stamp = spring({frame: f - s(5.2), fps, config: {damping: 9, stiffness: 260}});
  const zero = t >= 6.09;
  const zeroSp = spring({frame: f - s(6.09), fps, config: {damping: 10, stiffness: 240}});
  const barColor = drain > 0.5 ? C.green : drain > 0.15 ? C.amber : C.red;
  return (
    <Scene bg={C.paper} dur={7.7}>
      <Watermark />
      <StepLabel n="2/3" title="Never name the debt" />
      <div style={{...card, top: 430, padding: '28px 40px', opacity: inn, transform: `translateY(${(1 - inn) * 50}px)`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: SANS}}>
          <div style={{fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>DINA OWES YOU</div>
          <div style={{fontWeight: 900, fontSize: zero ? 54 * (0.8 + 0.2 * zeroSp) : 46, color: zero ? C.red : C.ink}}>{zero ? 'Worth: 0' : `${value}`}</div>
        </div>
        <div style={{height: 54, borderRadius: 18, background: '#E2DBD0', overflow: 'hidden', marginTop: 18}}>
          <div style={{height: '100%', width: `${drain * 100}%`, background: barColor, borderRadius: 18}} />
        </div>
        {t >= 5.2 && (
          <div style={{position: 'absolute', top: 40, left: 36, display: 'flex', justifyContent: 'flex-start'}}>
            <div
              style={{
                border: `9px solid ${C.red}`,
                color: C.red,
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: 70,
                letterSpacing: 5,
                padding: '2px 28px',
                borderRadius: 18,
                background: 'rgba(255,255,255,0.88)',
                transform: `rotate(-8deg) scale(${2.1 - 1.1 * stamp})`,
                opacity: Math.min(1, stamp * 1.5),
              }}
            >
              PAID OFF
            </div>
          </div>
        )}
      </div>
      <ChatCard name="Dina" sub="Product Lead" initials="D" color="#3F6FB5" top={720} minHeight={420}>
        <Bubble at={2.6} out>
          remember when I helped you with the launch?
        </Bubble>
        <Typing from={3.9} to={5.05} />
        <Bubble at={5.1}>sure. we're even now.</Bubble>
      </ChatCard>
      <Sfx at={5.13} name="snip" volume={0.35} />
      <Sfx at={5.2} name="hit" volume={0.6} />
      <Captions
        top={1250}
        caps={[
          {text: 'Rule two: never name the debt.', start: 0.25, end: 2.45, key: 'debt.', se: 2.03},
          {text: 'The moment you say, remember when I helped you?', start: 2.49, end: 5.1, key: 'remember', se: 4.55},
          {text: "It's paid off. And it's worth nothing.", start: 5.13, end: 7.7, key: 'nothing.', se: 6.93},
        ]}
      />
    </Scene>
  );
};

/* ---------- 5. Rule 3: cover for someone in public ---------- */
const SpeechBubble: React.FC<{at: number; out: number; left: number; top: number; width: number; tail: 'left' | 'right'; dark?: boolean; children: React.ReactNode}> = ({
  at,
  out,
  left,
  top,
  width,
  tail,
  dark,
  children,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < s(at) || f >= s(out)) return null;
  const sp = spring({frame: f - s(at), fps, config: {damping: 13, stiffness: 190}});
  const fade = interpolate(f, [s(out) - 5, s(out)], [1, 0], clamp);
  const bg = dark ? C.ink : C.white;
  return (
    <div style={{position: 'absolute', left, top, width, opacity: sp * fade, transform: `scale(${0.85 + 0.15 * sp})`, transformOrigin: tail === 'left' ? 'left bottom' : 'right bottom'}}>
      <div style={{background: bg, color: dark ? C.white : C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 40, lineHeight: 1.2, padding: '22px 30px', borderRadius: 30, boxShadow: '0 16px 40px rgba(60,45,20,0.18)'}}>{children}</div>
      <div style={{position: 'absolute', bottom: -22, [tail]: 60, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: `26px solid ${bg}`}} />
    </div>
  );
};

const Rule3: React.FC = () => {
  const {f, fps, t} = useT();
  const slump = interpolate(t, [3.9, 4.4, 6.9, 7.4], [0, -9, -9, 0], clamp);
  const dirPoint = interpolate(t, [3.5, 3.8, 6.0, 6.4], [0, 1, 1, 0.3], clamp);
  const shield = spring({frame: f - s(6.95), fps, config: {damping: 10, stiffness: 200}});
  const shieldOut = interpolate(t, [8.2, 8.5], [1, 0], clamp);
  const row = spring({frame: f - s(8.4), fps, config: {damping: 14}});
  const look = t >= 7.6;
  return (
    <Scene bg={C.paper} dur={10.9}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <rect x={0} y={0} width={1080} height={1180} fill="#E7E1D7" />
        <rect x={0} y={1180} width={1080} height={740} fill="#D6CCBD" />
        {/* director stands at the head of the room */}
        <Fg>
        <Person x={810} y={1180} facing={-1} armL={dirPoint * 80} {...DIRECTOR} />
        {/* seated behind the table */}
        <FrontDesk x={390} y={1036} w={560}>
          <Person x={-130} y={134} lean={slump} facing={look ? 1 : 1} {...DAN} />
          <Person x={115} y={134} armL={t >= 5.05 && t < 7.0 ? 30 : 0} {...YOU} />
          <rect x={-50} y={-24} width={90} height={10} rx={4} fill="#F6F2EA" />
        </FrontDesk>
        </Fg>
        {t >= 6.95 && (
          <g transform={`translate(150 640) scale(${shield * 1.2})`} opacity={shieldOut}>
            <path d="M0 -90 L76 -62 L70 20 Q60 72 0 100 Q-60 72 -70 20 L-76 -62 Z" fill={C.amber} />
            <path d="M-26 4 L-6 24 L30 -16" fill="none" stroke={C.ink} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </svg>
      <Watermark />
      <StepLabel n="3/3" title="Cover for them in public" />
      <SpeechBubble at={3.5} out={5.0} left={540} top={470} width={420} tail="right">
        Who approved this?
      </SpeechBubble>
      <SpeechBubble at={5.05} out={7.5} left={330} top={470} width={580} tail="left" dark>
        That was a shared call, not just his.
      </SpeechBubble>
      {t >= 8.4 && (
        <div style={{...card, top: 440, left: 90, right: 90, padding: '22px 30px', opacity: row, transform: `translateY(${(1 - row) * 30}px)`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>{"DAN'S LEDGER"}</div>
          <div style={{display: 'flex', alignItems: 'center', marginTop: 10, fontFamily: SANS, fontSize: 40}}>
            <div style={{width: 130, fontWeight: 900, color: C.ink}}>You</div>
            <div style={{flex: 1, fontWeight: 600, color: '#4A3B2F'}}>saved me in front of the boss</div>
            <div style={{fontWeight: 900, fontSize: 52, color: C.green}}>+</div>
          </div>
        </div>
      )}
      <Sfx at={3.5} name="ping" volume={0.4} />
      <Sfx at={3.9} name="hit" volume={0.35} />
      <Sfx at={5.05} name="pop" volume={0.4} />
      <Sfx at={6.95} name="lock" volume={0.45} />
      <Sfx at={8.4} name="blip" volume={0.4} />
      <Captions
        top={1270}
        caps={[
          {text: 'Rule three: cover for someone in public.', start: 0.52, end: 3.4, key: 'public.', se: 3.05},
          {text: 'One sentence in a meeting.', start: 3.44, end: 5.0, key: 'sentence', se: 4.57},
          {text: 'That was a shared call, not just his.', start: 5.05, end: 7.5, key: 'shared', se: 6.89},
          {text: 'Nobody forgets who protected them in front of their boss.', start: 7.57, end: 10.9, key: 'protected', se: 10.28},
        ]}
      />
    </Scene>
  );
};

/* ---------- 6. Punch line ---------- */
const Punch: React.FC = () => (
  <Scene bg={C.night} dur={4.9}>
    <Watermark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 34}}>
      <SerifLine at={0.38} size={116}>
        People forget who fixed their spreadsheet.
      </SerifLine>
      <SerifLine at={2.14} size={116} color={C.amber} italic>
        They never forget who saved their reputation.
      </SerifLine>
    </AbsoluteFill>
    <Sfx at={0.38} name="pop" volume={0.3} />
    <Sfx at={2.14} name="pop" volume={0.4} />
  </Scene>
);

/* ---------- 7. End card ---------- */
const End: React.FC = () => {
  const {f, fps} = useT();
  const brand = spring({frame: f - s(5.79), fps, config: {damping: 14}});
  const qOut = interpolate(f, [s(5.5), s(5.79)], [1, 0], clamp);
  return (
    <Scene bg={C.night} dur={9.8}>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut, gap: 30}}>
        <SerifLine at={0.57} size={108}>
          Who helped you early in your career,
        </SerifLine>
        <SerifLine at={2.2} size={84} color="rgba(255,255,255,0.8)">
          and still gets your yes instantly?
        </SerifLine>
        <SerifLine at={4.56} size={64} color={C.amber} italic>
          Tell me in the comments.
        </SerifLine>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: brand, transform: `scale(${0.9 + 0.1 * brand})`}}>
        <King size={130} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: 14, color: C.white, marginTop: 36}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={5.79} name="pop" volume={0.4} />
    </Scene>
  );
};

export const Day6: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day6.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music_day6.wav')}
      volume={(f) => interpolate(f, [0, s(50.1), s(50.7), s(DAY6_DURATION)], [0.13, 0.13, 0.32, 0.32], clamp)}
    />
    <Seq k="hook"><Hook /></Seq>
    <Seq k="who"><Who /></Seq>
    <Seq k="rule1"><Rule1 /></Seq>
    <Seq k="rule2"><Rule2 /></Seq>
    <Seq k="rule3"><Rule3 /></Seq>
    <Seq k="punch"><Punch /></Seq>
    <Seq k="end"><End /></Seq>
  </AbsoluteFill>
);

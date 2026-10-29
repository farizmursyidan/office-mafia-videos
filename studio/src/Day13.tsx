import React from 'react';
import {AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, SANS, SERIF, s} from './theme';
import {King, Sfx} from './components';
import {Desk, Person} from './characters';

/* Scene timeline (seconds, global), synced to public/voice/day13.wav.
   Each scene keeps playing TR seconds past its end, underneath the next one, so cuts are crossfades. */
export const SCENES13 = {
  hook: [0, 6.4],
  how: [6.4, 14.0],
  sign1: [14.0, 20.5],
  sign2: [20.5, 27.2],
  sign3: [27.2, 33.75],
  act: [33.75, 40.5],
  punch: [40.5, 45.9],
  end: [45.9, 54.5],
} as const;
export const DAY13_DURATION = SCENES13.end[1];
const TR = 0.35;

const Seq: React.FC<{k: keyof typeof SCENES13; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES13[k];
  const tail = k === 'end' ? 0 : TR;
  return (
    <Sequence from={s(a)} durationInFrames={s(b - a + tail)}>
      {children}
    </Sequence>
  );
};

/* ---------- motion helpers: no bouncy springs, everything eases ---------- */
const OUT = Easing.bezier(0.16, 1, 0.3, 1); // expo-like ease out
const INOUT = Easing.bezier(0.65, 0, 0.35, 1);
const useT = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return {f, fps, t: f / fps};
};
/** 0..1 from `at` over `d` seconds, eased out */
const ez = (t: number, at: number, d = 0.55, e = OUT) => interpolate(t, [at, at + d], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});
const mix = (a: number, b: number, p: number) => a + (b - a) * p;
const enterStyle = (p: number, dy = 34): React.CSSProperties => ({opacity: p, transform: `translateY(${(1 - p) * dy}px)`});

/* ---------- shells ---------- */
const SceneX: React.FC<{bg: string; dur: number; first?: boolean; dark?: boolean; children: React.ReactNode}> = ({bg, dur, first, dark, children}) => {
  const {t} = useT();
  const fade = first ? 1 : ez(t, 0, TR, INOUT);
  const settle = first ? 1 : ez(t, 0, 0.7);
  const push = interpolate(t, [0, dur + TR], [1, 1.03]);
  return (
    <AbsoluteFill style={{background: bg, overflow: 'hidden', opacity: fade}}>
      {dark && <Glow />}
      <AbsoluteFill style={{transform: `scale(${push * mix(1.04, 1, settle)})`}}>{children}</AbsoluteFill>
      {!first && <Sfx at={0} name="whoosh" volume={0.22} />}
    </AbsoluteFill>
  );
};

/* slow drifting warm light so dark cards never sit perfectly still */
const Glow: React.FC = () => {
  const {t} = useT();
  const x = 50 + 18 * Math.sin(t * 0.5);
  const y = 42 + 10 * Math.cos(t * 0.4);
  return <AbsoluteFill style={{background: `radial-gradient(circle at ${x}% ${y}%, rgba(224,169,59,0.16), rgba(17,17,17,0) 55%)`}} />;
};

const Mark: React.FC<{dark?: boolean}> = ({dark}) => (
  <div style={{position: 'absolute', top: 110, left: 72, fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,20,20,0.45)'}}>OFFICE MAFIA</div>
);

const Label: React.FC<{n: string; title: string; dark?: boolean}> = ({n, title, dark}) => {
  const {t} = useT();
  const a = ez(t, 0.05, 0.6);
  const b = ez(t, 0.15, 0.6);
  return (
    <div style={{position: 'absolute', top: 210, left: 72, right: 72}}>
      <div style={{display: 'inline-block', background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 34, padding: '8px 22px', borderRadius: 999, marginBottom: 18, ...enterStyle(a, 20)}}>{n}</div>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 70, lineHeight: 1.02, color: dark ? C.white : C.ink, letterSpacing: -1, ...enterStyle(b, 26)}}>{title}</div>
    </div>
  );
};

/* ---------- captions: words glide up in time with the voice, key word gets a sweeping highlight ---------- */
type Cap = {text: string; start: number; end: number; key?: string; se?: number};
const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, '');
const Caps: React.FC<{caps: Cap[]; top?: number; dark?: boolean}> = ({caps, top = 1280, dark}) => {
  const {t} = useT();
  const cap = caps.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;
  const words = cap.text.split(' ');
  const keys = (cap.key || '').split(' ').map(norm);
  const span = ((cap.se ?? cap.start + words.length * 0.12) - cap.start) * 0.9;
  const out = interpolate(t, [cap.end - 0.14, cap.end], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', top, left: 70, right: 70, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'flex-start', gap: '6px 22px', opacity: out}}>
      {words.map((w, i) => {
        const at = cap.start + (i * span) / words.length;
        const p = ez(t, at, 0.28);
        const isKey = keys.includes(norm(w));
        const hl = isKey ? ez(t, at + 0.12, 0.35) : 0;
        return (
          <span key={i} style={{position: 'relative', display: 'inline-block', fontFamily: SANS, fontWeight: 900, fontSize: 82, lineHeight: 1.12, letterSpacing: -1, color: dark ? (isKey ? C.amber : C.white) : C.ink, textShadow: dark ? '0 6px 20px rgba(0,0,0,0.5)' : 'none', opacity: p, transform: `translateY(${(1 - p) * 22}px)`}}>
            {!dark && isKey && <span style={{position: 'absolute', left: -12, right: -12, top: 6, bottom: 4, background: C.amber, borderRadius: 14, transform: `scaleX(${hl})`, transformOrigin: 'left center'}} />}
            <span style={{position: 'relative'}}>{w}</span>
          </span>
        );
      })}
    </div>
  );
};

const Pill: React.FC<{p: number; bg: string; fg?: string; size?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({p, bg, fg = C.white, size = 32, style, children}) => (
  <div style={{position: 'absolute', opacity: p, transform: `translateY(${(1 - p) * 16}px) scale(${mix(0.9, 1, p)})`, transformOrigin: 'left center', ...style}}>
    <div style={{background: bg, color: fg, fontFamily: SANS, fontWeight: 900, fontSize: size, padding: '10px 24px', borderRadius: 999, letterSpacing: 1, whiteSpace: 'nowrap', boxShadow: '0 10px 24px rgba(60,45,20,0.18)'}}>{children}</div>
  </div>
);

const card: React.CSSProperties = {position: 'absolute', left: 70, right: 70, background: C.white, borderRadius: 34, boxShadow: '0 30px 70px rgba(60,45,20,0.18)'};
const float = (t: number, k = 1) => Math.sin(t * 1.3 + k) * 4;

const YOU = {shirt: C.amber, hair: '#1E1A17', hairStyle: 'short' as const, skin: '#C99267', pants: '#2B2B33'};
const DANA = {shirt: '#3F6FB5', hair: '#3A2A20', hairStyle: 'bun' as const, skin: '#E2B48C', pants: '#2A2A33'};

const Fg: React.FC<{children: React.ReactNode; k?: number}> = ({children, k = 1.45}) => (
  <g transform={`translate(540 1180) scale(${k}) translate(-540 -1180)`}>{children}</g>
);
const Backdrop: React.FC = () => (
  <g>
    <rect x={0} y={0} width={1080} height={1180} fill="#E7E1D7" />
    <rect x={0} y={1080} width={1080} height={100} fill="#DDD5C8" />
    <rect x={0} y={1180} width={1080} height={740} fill="#D6CCBD" />
    <rect x={0} y={1180} width={1080} height={10} fill="#C7BBA9" />
  </g>
);

/* ---------- 1. Hook: the reorg plan reshuffles the org chart, you're left hanging ---------- */
type Node = {id: string; name: string; sub?: string; a: [number, number]; b: [number, number]; parentA?: string; parentB?: string; arc?: number};
const NODES: Node[] = [
  {id: 'ceo', name: 'CEO', a: [540, 575], b: [540, 575]},
  {id: 'vps', name: 'VP Sales', a: [300, 715], b: [300, 715], parentA: 'ceo'},
  {id: 'vpn', name: 'VP Strategy', sub: 'new', a: [300, 715], b: [300, 715], parentB: 'ceo'},
  {id: 'vpo', name: 'VP Ops', a: [780, 715], b: [780, 715], parentA: 'ceo', parentB: 'ceo'},
  {id: 'dana', name: 'Dana', sub: 'your boss', a: [300, 885], b: [780, 885], parentA: 'vps', parentB: 'vpo', arc: -60},
  {id: 'raj', name: 'Raj', sub: 'peer', a: [780, 885], b: [300, 885], parentA: 'vpo', parentB: 'vpn', arc: 60},
  {id: 'you', name: 'YOU', a: [300, 1055], b: [300, 1055], parentA: 'dana', parentB: 'dana'},
];
const BW = 250;
const BH = 96;
const Hook: React.FC = () => {
  const {t} = useT();
  const mv = ez(t, 0.7, 1.7, INOUT); // reshuffle
  const kill = ez(t, 0.5, 0.5); // VP Sales struck
  const born = ez(t, 1.6, 0.6); // VP Strategy appears
  const knows = ez(t, 3.42, 0.5);
  const cut = ez(t, 4.9, 0.45); // your line goes
  const stamp = ez(t, 5.25, 0.32, Easing.bezier(0.2, 1.4, 0.4, 1));
  const shake = t > 5.25 && t < 5.55 ? Math.sin((t - 5.25) * 90) * 5 * (1 - (t - 5.25) / 0.3) : 0;
  const pos = (n: Node): [number, number] => {
    const x = mix(n.a[0], n.b[0], mv);
    const y = mix(n.a[1], n.b[1], mv) + (n.arc ?? 0) * Math.sin(Math.PI * mv);
    return [x, y];
  };
  const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
  const alpha = (n: Node) => (n.id === 'vps' ? 1 - ez(t, 1.2, 0.5) : n.id === 'vpn' ? born : 1);
  const edges: {from: string; to: string; o: number; key: string}[] = [];
  NODES.forEach((n) => {
    if (n.id === 'you') {
      edges.push({from: 'dana', to: 'you', o: 1 - cut, key: 'you'});
      return;
    }
    if (n.parentA && n.parentA === n.parentB) edges.push({from: n.parentA, to: n.id, o: 1, key: n.id});
    else {
      if (n.parentA) edges.push({from: n.parentA, to: n.id, o: n.id === 'vps' ? alpha(n) : 1 - mv, key: n.id + 'a'});
      if (n.parentB) edges.push({from: n.parentB, to: n.id, o: n.id === 'vpn' ? born : mv, key: n.id + 'b'});
    }
  });
  const path = (from: string, to: string) => {
    const [px, py] = pos(byId[from]);
    const [cx, cy] = pos(byId[to]);
    const my = (py + BH / 2 + cy - BH / 2) / 2;
    return `M${px} ${py + BH / 2} C${px} ${my} ${cx} ${my} ${cx} ${cy - BH / 2}`;
  };
  return (
    <SceneX bg={C.paper} dur={6.4} first>
      <Mark />
      <div style={{...card, top: 420, height: 760, transform: `translateX(${shake}px)`}} />
      <svg width={1080} height={1920} style={{position: 'absolute', transform: `translateX(${shake}px)`}}>
        <text x={110} y={490} fontFamily={SANS} fontWeight={900} fontSize={30} letterSpacing={3} fill={C.muted}>
          REORG PLAN
        </text>
        <g>
          <rect x={700} y={458} width={270} height={46} rx={23} fill={C.red} />
          <text x={835} y={490} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={24} letterSpacing={2} fill={C.white}>
            CONFIDENTIAL
          </text>
        </g>
        {edges.map((e) => (
          <path key={e.key} d={path(e.from, e.to)} fill="none" stroke={e.key === 'you' ? C.amber : '#CFC6B8'} strokeWidth={6} strokeLinecap="round" opacity={e.o} strokeDasharray={e.key === 'you' && cut > 0 ? `${14} ${14 + 30 * cut}` : undefined} />
        ))}
        {NODES.map((n) => {
          const [x, y] = pos(n);
          const o = alpha(n);
          if (o <= 0.001) return null;
          const isYou = n.id === 'you';
          const isDana = n.id === 'dana';
          const fill = isYou ? (cut > 0 ? '#E9E4DC' : C.amber) : n.id === 'ceo' ? C.ink : '#F4F1EC';
          const ink = n.id === 'ceo' ? C.white : isYou && cut > 0.5 ? C.muted : C.ink;
          const sc = n.id === 'vpn' ? mix(0.8, 1, born) : 1;
          return (
            <g key={n.id} opacity={o} transform={`translate(${x} ${y}) scale(${sc})`}>
              {isDana && knows > 0 && <rect x={-BW / 2 - 10} y={-BH / 2 - 10} width={BW + 20} height={BH + 20} rx={28} fill="none" stroke={C.amber} strokeWidth={6} opacity={knows * (0.75 + 0.25 * Math.sin(t * 6))} />}
              <rect x={-BW / 2} y={-BH / 2} width={BW} height={BH} rx={20} fill={fill} stroke={n.id === 'vpn' ? C.amber : 'none'} strokeWidth={5} />
              <text x={0} y={n.sub ? -4 : 11} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={34} fill={ink}>
                {isYou && cut > 0.5 ? 'YOU ?' : n.name}
              </text>
              {n.sub && (
                <text x={0} y={30} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={22} letterSpacing={1} fill={n.id === 'vpn' ? '#B07D1A' : C.muted}>
                  {n.sub.toUpperCase()}
                </text>
              )}
              {n.id === 'vps' && kill > 0 && <line x1={-BW / 2 + 20} y1={0} x2={-BW / 2 + 20 + (BW - 40) * kill} y2={0} stroke={C.red} strokeWidth={6} strokeLinecap="round" />}
            </g>
          );
        })}
      </svg>
      {(() => {
        const [dx, dy] = pos(byId.dana);
        return (
          <Pill p={knows} bg={C.ink} size={22} style={{left: dx - 120, top: dy - BH / 2 - 50}}>
            ALREADY KNOWS
          </Pill>
        );
      })()}
      {stamp > 0 && (
        <div style={{position: 'absolute', left: 470, top: 1018, opacity: Math.min(1, stamp * 2), transform: `rotate(-7deg) scale(${mix(1.6, 1, stamp)})`, transformOrigin: 'center'}}>
          <div style={{border: `6px solid ${C.red}`, color: C.red, background: 'rgba(255,255,255,0.92)', fontFamily: SANS, fontWeight: 900, fontSize: 46, letterSpacing: 3, padding: '8px 26px', borderRadius: 14}}>LAST TO KNOW</div>
        </div>
      )}
      <Sfx at={0.7} name="whoosh" volume={0.25} />
      <Sfx at={0.5} name="snip" volume={0.35} />
      <Sfx at={1.6} name="pop" volume={0.3} />
      <Sfx at={3.42} name="blip" volume={0.35} />
      <Sfx at={4.9} name="snip" volume={0.4} />
      <Sfx at={5.25} name="hit" volume={0.5} />
      <Caps
        top={1270}
        caps={[
          {text: 'Your company is planning a reorg right now.', start: 0.12, end: 3.3, key: 'reorg', se: 3.11},
          {text: 'Your boss already knows.', start: 3.38, end: 4.8, key: 'knows.', se: 4.55},
          {text: "You'll be the last to know.", start: 4.84, end: 6.4, key: 'last', se: 5.98},
        ]}
      />
    </SceneX>
  );
};

/* ---------- 2. The rule ---------- */
const How: React.FC = () => {
  const {t} = useT();
  const h1 = ez(t, 0.2, 0.6);
  const h2 = ez(t, 0.35, 0.7);
  const a = ez(t, 2.26, 0.7);
  const b = ez(t, 4.83, 0.7);
  const dim = ez(t, 4.83, 0.6);
  const col = (label: string, big: string, small: string, hi: boolean, p: number, k: number) => (
    <div style={{flex: 1, background: hi ? C.amber : C.nightSoft, border: hi ? 'none' : '3px solid #2E2E2E', borderRadius: 30, padding: '26px 28px', opacity: p * (hi ? 1 : 1 - 0.45 * dim), transform: `translateY(${(1 - p) * 50 + float(t, k)}px) scale(${hi ? mix(0.94, 1.03, p) : 1})`}}>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 2, color: hi ? C.ink : C.muted}}>{label}</div>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 72, color: hi ? C.ink : C.white, marginTop: 16}}>{big}</div>
      <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 32, color: hi ? C.ink : C.muted, marginTop: 8}}>{small}</div>
    </div>
  );
  return (
    <SceneX bg={C.night} dur={7.6} dark>
      <Mark dark />
      <div style={{position: 'absolute', top: 240, left: 80, right: 80, fontFamily: SANS}}>
        <div style={{fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber, ...enterStyle(h1, 16)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{fontWeight: 900, fontSize: 76, lineHeight: 1.05, color: C.white, marginTop: 14, ...enterStyle(h2, 24)}}>Reorgs reward who the new boss knows</div>
      </div>
      <div style={{position: 'absolute', top: 660, left: 70, right: 70, display: 'flex', gap: 30}}>
        {col('WORKS HARDEST', 'Moved', '60 hour weeks, name unknown', false, a, 0)}
        {col('KNOWN TO NEW BOSS', 'Kept', 'two coffee chats, name known', true, b, 2)}
      </div>
      <Sfx at={2.26} name="pop" volume={0.3} />
      <Sfx at={4.83} name="hit" volume={0.38} />
      <Caps
        dark
        top={1250}
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.38, end: 2.2, key: 'nobody', se: 1.78},
          {text: "Reorgs don't reward whoever works hardest.", start: 2.24, end: 4.78, key: 'hardest.', se: 4.47},
          {text: 'They reward whoever the new boss already knows.', start: 4.81, end: 7.6, key: 'knows.', se: 7.26},
        ]}
      />
    </SceneX>
  );
};

/* ---------- 3. Sign 1: meetings vanish ---------- */
const CAL = [
  {day: 'MON', time: '10:00', name: 'Team standup', gone: 99},
  {day: 'TUE', time: '14:00', name: 'Leadership sync (weekly)', gone: 4.3},
  {day: 'WED', time: '11:00', name: 'Roadmap review', gone: 1.6},
  {day: 'THU', time: '16:00', name: 'Client check in', gone: 99},
];
const Sign1: React.FC = () => {
  const {t} = useT();
  const inn = ez(t, 0.25, 0.7);
  const chip = ez(t, 5.0, 0.5);
  return (
    <SceneX bg={C.paper} dur={6.5}>
      <Mark />
      <Label n="1/3" title="Meetings vanish" />
      <div style={{...card, top: 440, padding: '22px 36px 18px', opacity: inn, transform: `translateY(${(1 - inn) * 60 + float(t)}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 8}}>YOUR WEEK</div>
        {CAL.map((r, i) => {
          const rin = ez(t, 0.4 + i * 0.1, 0.55);
          const strike = ez(t, r.gone, 0.45, INOUT);
          const fade = ez(t, r.gone + 0.3, 0.5);
          const isLead = r.gone < 5 && r.gone > 4;
          const flash = isLead ? ez(t, r.gone - 0.4, 0.3) * (1 - fade) : 0;
          return (
            <div key={r.day} style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 22, padding: '16px 0', borderTop: '2px solid #EEEAE4', ...enterStyle(rin, 20)}}>
              <div style={{position: 'absolute', left: -16, right: -16, top: 6, bottom: 6, borderRadius: 14, background: C.amber, opacity: 0.28 * flash}} />
              <div style={{position: 'relative', width: 80, fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.muted, opacity: 1 - 0.5 * fade}}>{r.day}</div>
              <div style={{position: 'relative', width: 6, alignSelf: 'stretch', borderRadius: 3, background: strike > 0 ? C.red : C.amber}} />
              <div style={{position: 'relative', opacity: 1 - 0.55 * fade}}>
                <div style={{position: 'relative', display: 'inline-block', fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink}}>
                  {r.name}
                  <div style={{position: 'absolute', left: -4, right: -4, top: '52%', height: 5, borderRadius: 3, background: C.red, transform: `scaleX(${strike})`, transformOrigin: 'left center'}} />
                </div>
                <div style={{position: 'relative', height: 32, marginTop: 2}}>
                  <div style={{position: 'absolute', fontFamily: SANS, fontWeight: 600, fontSize: 26, color: C.muted, opacity: 1 - fade}}>{r.time}</div>
                  <div style={{position: 'absolute', fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.red, opacity: fade}}>Canceled</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pill p={chip} bg={C.red} style={{left: 110, top: 1010}}>
        Canceled. No reason given.
      </Pill>
      <Sfx at={1.6} name="snip" volume={0.4} />
      <Sfx at={4.3} name="snip" volume={0.4} />
      <Sfx at={5.0} name="hit" volume={0.35} />
      <Caps
        top={1290}
        caps={[
          {text: 'Sign one: meetings vanish without a reason.', start: 0.44, end: 3.62, key: 'vanish', se: 3.24},
          {text: 'Your weekly sync with leadership disappears from the calendar.', start: 3.64, end: 6.5, key: 'leadership', se: 6.16},
        ]}
      />
    </SceneX>
  );
};

/* ---------- 4. Sign 2: new names on every budget email ---------- */
const MAILS = [
  {subj: 'Q1 budget draft', at: 1.2},
  {subj: 'Headcount plan', at: 3.2},
  {subj: 'Cost review, all teams', at: 4.1},
];
const Sign2: React.FC = () => {
  const {t} = useT();
  const inn = ez(t, 0.25, 0.7);
  const who = ez(t, 5.3, 0.5);
  return (
    <SceneX bg={C.paper} dur={6.7}>
      <Mark />
      <Label n="2/3" title="New names show up" />
      <div style={{...card, top: 440, padding: '22px 36px 14px', opacity: inn, transform: `translateY(${(1 - inn) * 60 + float(t)}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 8}}>INBOX</div>
        {MAILS.map((m) => {
          const p = ez(t, m.at, 0.55);
          const hl = ez(t, m.at + 0.35, 0.45, INOUT);
          return (
            <div key={m.subj} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '16px 0', borderTop: '2px solid #EEEAE4', opacity: p, transform: `translateX(${(1 - p) * 50}px)`}}>
              <div style={{width: 64, height: 64, borderRadius: '50%', background: '#E9E4DC', color: C.muted, fontFamily: SANS, fontWeight: 900, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>RK</div>
              <div>
                <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink}}>{m.subj}</div>
                <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 27, color: C.muted, marginTop: 6}}>
                  CC: you, Dana,{' '}
                  <span style={{position: 'relative', display: 'inline-block', color: C.ink, fontWeight: 800, padding: '2px 10px'}}>
                    <span style={{position: 'absolute', inset: 0, borderRadius: 10, background: 'rgba(224,169,59,0.55)', transform: `scaleX(${hl})`, transformOrigin: 'left center'}} />
                    <span style={{position: 'relative'}}>R. Kessler (consultant)</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pill p={who} bg={C.ink} style={{left: 640, top: 1000}}>
        Who is this?
      </Pill>
      {MAILS.map((m) => (
        <Sfx key={m.subj} at={m.at} name="ping" volume={0.28} />
      ))}
      <Sfx at={5.3} name="pop" volume={0.35} />
      <Caps
        top={1290}
        caps={[
          {text: 'Sign two: new names show up.', start: 0.38, end: 2.65, key: 'names', se: 2.41},
          {text: "A consultant you've never met is suddenly CC'd on every budget email.", start: 2.69, end: 6.7, key: 'consultant', se: 6.25},
        ]}
      />
    </SceneX>
  );
};

/* ---------- 5. Sign 3: your boss goes vague ---------- */
const Bub: React.FC<{p: number; left: number; top: number; width: number; tail: 'left' | 'right'; dark?: boolean; children: React.ReactNode}> = ({p, left, top, width, tail, dark, children}) => {
  if (p <= 0) return null;
  const bg = dark ? C.ink : C.white;
  return (
    <div style={{position: 'absolute', left, top, width, opacity: p, transform: `translateY(${(1 - p) * 24}px) scale(${mix(0.9, 1, p)})`, transformOrigin: tail === 'left' ? 'left bottom' : 'right bottom'}}>
      <div style={{background: bg, color: dark ? C.white : C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 40, lineHeight: 1.2, padding: '22px 30px', borderRadius: 30, boxShadow: '0 16px 40px rgba(60,45,20,0.18)'}}>{children}</div>
      <div style={{position: 'absolute', bottom: -22, [tail]: 60, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: `26px solid ${bg}`}} />
    </div>
  );
};
const Sign3: React.FC = () => {
  const {f, t} = useT();
  const walk = ez(t, 0.2, 1.5, INOUT);
  const walking = t > 0.2 && t < 1.65;
  const q = ez(t, 3.0, 0.5);
  const a = ez(t, 4.35, 0.5);
  const fog = ez(t, 5.3, 0.5);
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  return (
    <SceneX bg={C.paper} dur={6.55}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Backdrop />
        <Fg k={1.15}>
          <Desk x={660} y={1080} w={260} laptop />
          <Person x={820} y={1180} facing={-1} sitting bob={breathe(1)} lean={a > 0 ? -4 * a : 0} {...DANA} />
          <Person x={170 + 230 * walk} y={1180} facing={1} walk={walking ? f / 3.4 : undefined} bob={walking ? 0 : breathe(0)} armL={q * 35} {...YOU} />
        </Fg>
      </svg>
      <Mark />
      <Label n="3/3" title="Your boss goes vague" />
      <Bub p={q} left={80} top={440} width={520} tail="left">
        {"What's next quarter?"}
      </Bub>
      <Bub p={a} left={480} top={575} width={520} tail="right" dark>
        {"Let's see how things shake out."}
      </Bub>
      <Pill p={fog} bg={C.red} size={26} style={{left: 84, top: 604}}>
        No dates
      </Pill>
      <Pill p={ez(t, 5.5, 0.5)} bg={C.red} size={26} style={{left: 252, top: 604}}>
        No names
      </Pill>
      <Sfx at={3.0} name="pop" volume={0.35} />
      <Sfx at={4.35} name="pop" volume={0.35} />
      <Sfx at={5.3} name="hit" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Sign three: your boss goes vague.', start: 0.39, end: 2.9, key: 'vague.', se: 2.6},
          {text: "Ask about next quarter and you hear, let's see how things shake out.", start: 3.1, end: 6.55, key: 'shake', se: 6.14},
        ]}
      />
    </SceneX>
  );
};

/* ---------- 6. The move ---------- */
const WINS = [
  {w: 'Cut churn 18%', at: 2.8},
  {w: 'Shipped billing v2 early', at: 3.2},
  {w: 'Saved $40k on vendors', at: 3.6},
];
const Check: React.FC<{p: number}> = ({p}) => (
  <svg width={54} height={54} viewBox="0 0 54 54">
    <rect x={0} y={0} width={54} height={54} rx={14} fill={p > 0 ? C.amber : '#F1ECE4'} opacity={p > 0 ? mix(0.4, 1, p) : 1} />
    <path d="M14 28 L23 37 L41 18" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={42} strokeDashoffset={42 * (1 - p)} />
  </svg>
);
const Act: React.FC = () => {
  const {t} = useT();
  const top = ez(t, 0.2, 0.6);
  const wins = ez(t, 2.5, 0.6);
  const inv = ez(t, 4.4, 0.6);
  const sent = ez(t, 5.5, 0.35, INOUT);
  return (
    <SceneX bg={C.paper} dur={6.75}>
      <Mark />
      <Label n="THE MOVE" title="Spot two? Move." />
      <div style={{...card, top: 430, padding: '18px 36px', display: 'flex', alignItems: 'center', gap: 22, opacity: top, transform: `translateY(${(1 - top) * 40 + float(t, 0)}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>Signs spotted</div>
        <div style={{display: 'flex', gap: 12, marginLeft: 'auto'}}>
          <Check p={ez(t, 0.55, 0.35)} />
          <Check p={ez(t, 0.9, 0.35)} />
          <Check p={0} />
        </div>
      </div>
      <div style={{...card, top: 580, padding: '20px 36px 14px', opacity: wins, transform: `translateY(${(1 - wins) * 50 + float(t, 1)}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 6}}>MY 3 BIGGEST WINS</div>
        {WINS.map((w, i) => {
          const p = ez(t, w.at, 0.5);
          return (
            <div key={w.w} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '10px 0', borderTop: '2px solid #EEEAE4', opacity: p, transform: `translateX(${(1 - p) * 36}px)`}}>
              <div style={{width: 44, height: 44, borderRadius: '50%', background: C.green, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.ink}}>{w.w}</div>
            </div>
          );
        })}
      </div>
      <div style={{...card, top: 900, padding: '20px 36px', display: 'flex', alignItems: 'center', gap: 22, opacity: inv, transform: `translateY(${(1 - inv) * 50 + float(t, 2)}px)`}}>
        <div style={{width: 76, height: 76, borderRadius: 18, background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1.05}}>
          <div>THU</div>
          <div style={{fontSize: 30}}>9:30</div>
        </div>
        <div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.ink}}>15 min with Priya</div>
          <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 26, color: C.muted, marginTop: 2}}>{"Your boss's boss (VP)"}</div>
        </div>
        <div style={{position: 'relative', marginLeft: 'auto', width: 120, height: 50, borderRadius: 999, overflow: 'hidden', background: '#F1ECE4'}}>
          <div style={{position: 'absolute', inset: 0, background: C.green, transform: `scaleX(${sent})`, transformOrigin: 'left center'}} />
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 24, color: sent > 0.5 ? C.white : C.ink}}>{sent > 0.5 ? 'SENT' : 'SEND'}</div>
        </div>
      </div>
      <Sfx at={0.55} name="click" volume={0.4} />
      <Sfx at={0.9} name="click" volume={0.4} />
      {WINS.map((w) => (
        <Sfx key={w.w} at={w.at} name="blip" volume={0.26} />
      ))}
      <Sfx at={4.4} name="pop" volume={0.35} />
      <Sfx at={5.5} name="send" volume={0.38} />
      <Caps
        top={1290}
        caps={[
          {text: 'Spot two, and move.', start: 0.44, end: 2.4, key: 'move.', se: 2.12},
          {text: "Write down your three biggest wins, and get fifteen minutes with your boss's boss.", start: 2.56, end: 6.75, key: 'wins,', se: 6.45},
        ]}
      />
    </SceneX>
  );
};

/* ---------- 7. Punch line: words surface one by one ---------- */
const Reveal: React.FC<{at: number; se: number; size: number; color?: string; italic?: boolean; children: string}> = ({at, se, size, color = C.white, italic, children}) => {
  const {t} = useT();
  const words = children.split(' ');
  const step = ((se - at) * 0.85) / words.length;
  return (
    <div style={{fontFamily: SERIF, fontStyle: italic ? 'italic' : 'normal', fontSize: size, lineHeight: 1.05, color, letterSpacing: -1}}>
      {words.map((w, i) => {
        const p = ez(t, at + i * step, 0.45);
        return (
          <span key={i} style={{display: 'inline-block', marginRight: '0.24em', opacity: p, transform: `translateY(${(1 - p) * 26}px)`, filter: `blur(${(1 - p) * 6}px)`}}>
            {w}
          </span>
        );
      })}
    </div>
  );
};
const Punch: React.FC = () => (
  <SceneX bg={C.night} dur={5.4} dark>
    <Mark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 34}}>
      <Reveal at={0.37} se={2.55} size={108}>
        Loyalty to the old chart gets you moved.
      </Reveal>
      <Reveal at={2.87} se={4.97} size={108} color={C.amber} italic>
        Visibility on the new one gets you kept.
      </Reveal>
    </AbsoluteFill>
    <Sfx at={0.37} name="pop" volume={0.25} />
    <Sfx at={2.87} name="pop" volume={0.35} />
  </SceneX>
);

/* ---------- 8. End card ---------- */
const End: React.FC = () => {
  const {t} = useT();
  const brand = ez(t, 4.2, 0.8);
  const qOut = 1 - ez(t, 3.95, 0.35, INOUT);
  return (
    <SceneX bg={C.night} dur={8.6} dark>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut, gap: 30, transform: `translateY(${-30 * (1 - qOut)}px)`}}>
        <Reveal at={0.47} se={2.58} size={100}>
          Have you ever seen a reorg coming before it was announced?
        </Reveal>
        <Reveal at={3.08} se={3.88} size={64} color={C.amber} italic>
          Tell me in the comments.
        </Reveal>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: brand, transform: `translateY(${(1 - brand) * 40}px) scale(${mix(0.94, 1, brand)})`}}>
        <King size={130} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: 14, color: C.white, marginTop: 36}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={4.2} name="pop" volume={0.35} />
    </SceneX>
  );
};

/* thin progress bar across the top: a retention cue */
const Progress: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', top: 0, left: 0, height: 10, width: `${(f / s(DAY13_DURATION)) * 100}%`, background: C.amber, opacity: 0.9}} />;
};

export const Day13: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day13.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music_day13.wav')}
      volume={(f) => interpolate(f, [0, s(51.7), s(52.3), s(DAY13_DURATION)], [0.13, 0.13, 0.32, 0.32], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}
    />
    <Seq k="hook"><Hook /></Seq>
    <Seq k="how"><How /></Seq>
    <Seq k="sign1"><Sign1 /></Seq>
    <Seq k="sign2"><Sign2 /></Seq>
    <Seq k="sign3"><Sign3 /></Seq>
    <Seq k="act"><Act /></Seq>
    <Seq k="punch"><Punch /></Seq>
    <Seq k="end"><End /></Seq>
    <Progress />
  </AbsoluteFill>
);

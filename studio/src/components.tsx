import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, SANS, SERIF, s} from './theme';

/* ---------- Sound helpers ---------- */
export const Sfx: React.FC<{at: number; name: string; volume?: number}> = ({at, name, volume = 0.6}) => (
  <Sequence from={s(at)} durationInFrames={s(1.2)} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={volume} />
  </Sequence>
);

/* ---------- Scene shell: background, gentle push-in, entry motion ---------- */
export const Scene: React.FC<{bg: string; children: React.ReactNode; dur: number; whoosh?: boolean}> = ({
  bg,
  children,
  dur,
  whoosh = true,
}) => {
  const f = useCurrentFrame();
  const enter = interpolate(f, [0, 9], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const push = interpolate(f, [0, s(dur)], [1, 1.035]);
  return (
    <AbsoluteFill style={{background: bg, overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transform: `translateY(${(1 - enter) * 70}px) scale(${push})`,
          opacity: enter,
        }}
      >
        {children}
      </AbsoluteFill>
      {whoosh && <Sfx at={0} name="whoosh" volume={0.35} />}
    </AbsoluteFill>
  );
};

/* ---------- Brand watermark ---------- */
export const Watermark: React.FC<{dark?: boolean}> = ({dark}) => (
  <div
    style={{
      position: 'absolute',
      top: 110,
      left: 72,
      fontFamily: SANS,
      fontWeight: 800,
      fontSize: 30,
      letterSpacing: 6,
      color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,20,20,0.45)',
    }}
  >
    OFFICE MAFIA
  </div>
);

/* ---------- Step label: "1/3  FORGET THE ORG CHART" ---------- */
export const StepLabel: React.FC<{n: string; title: string; dark?: boolean}> = ({n, title, dark}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = spring({frame: f - 4, fps, config: {damping: 14}});
  return (
    <div style={{position: 'absolute', top: 210, left: 72, right: 72, transform: `scale(${0.9 + 0.1 * sp})`, opacity: sp, transformOrigin: 'left center'}}>
      <div
        style={{
          display: 'inline-block',
          background: C.amber,
          color: C.ink,
          fontFamily: SANS,
          fontWeight: 900,
          fontSize: 34,
          padding: '8px 22px',
          borderRadius: 999,
          marginBottom: 18,
        }}
      >
        {n}
      </div>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 70, lineHeight: 1.02, color: dark ? C.white : C.ink, letterSpacing: -1}}>
        {title}
      </div>
    </div>
  );
};

/* ---------- Captions: word by word pop, one key word in amber ---------- */
// se = when the voice finishes this line; words are revealed in step with the speech
export type Cap = {text: string; start: number; end: number; key?: string; se?: number};
const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, '');

export const Captions: React.FC<{caps: Cap[]; top?: number; dark?: boolean}> = ({caps, top = 1190, dark}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const cap = caps.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;
  const words = cap.text.split(' ');
  const keys = (cap.key || '').split(' ').map(norm);
  const localF = f - s(cap.start);
  const out = interpolate(f, [s(cap.end) - 4, s(cap.end)], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 70,
        right: 70,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
        gap: '6px 22px',
        opacity: out,
      }}
    >
      {words.map((w, i) => {
        const span = cap.se ? s(cap.se - cap.start) * 0.9 : words.length * 3;
        const appear = Math.round((i * span) / words.length);
        const sp = spring({frame: localF - appear, fps, config: {damping: 12, stiffness: 220}});
        const isKey = keys.includes(norm(w));
        return (
          <span
            key={i}
            style={{
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: 82,
              lineHeight: 1.12,
              color: dark ? (isKey ? C.amber : C.white) : C.ink,
              background: !dark && isKey ? C.amber : 'transparent',
              padding: !dark && isKey ? '0 14px' : 0,
              borderRadius: 14,
              textShadow: dark ? '0 6px 20px rgba(0,0,0,0.5)' : 'none',
              letterSpacing: -1,
              transform: `translateY(${(1 - sp) * 26}px) scale(${0.85 + 0.15 * sp})`,
              opacity: sp,
              display: 'inline-block',
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

/* ---------- Chat UI ---------- */
export const Avatar: React.FC<{initials: string; color: string; size?: number}> = ({initials, color, size = 84}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      color: C.white,
      fontFamily: SANS,
      fontWeight: 800,
      fontSize: size * 0.38,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    {initials}
  </div>
);

export const ChatCard: React.FC<{
  name: string;
  sub: string;
  initials: string;
  color: string;
  top?: number;
  dark?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  minHeight?: number;
}> = ({name, sub, initials, color, top = 330, dark, children, footer, minHeight = 560}) => (
  <div
    style={{
      position: 'absolute',
      top,
      left: 70,
      right: 70,
      background: dark ? C.nightSoft : C.white,
      borderRadius: 40,
      boxShadow: dark ? '0 30px 80px rgba(0,0,0,0.6)' : '0 30px 70px rgba(60,45,20,0.18)',
      overflow: 'hidden',
      minHeight,
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        padding: '30px 36px',
        borderBottom: `2px solid ${dark ? '#2A2A2A' : '#EEEAE4'}`,
      }}
    >
      <Avatar initials={initials} color={color} />
      <div>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 40, color: dark ? C.white : C.ink}}>{name}</div>
        <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 28, color: C.muted, marginTop: 2}}>{sub}</div>
      </div>
    </div>
    <div style={{flex: 1, padding: '30px 36px', display: 'flex', flexDirection: 'column', gap: 18}}>{children}</div>
    {footer}
  </div>
);

export const Bubble: React.FC<{at: number; out?: boolean; dark?: boolean; children: React.ReactNode; sound?: string | null}> = ({
  at,
  out,
  dark,
  children,
  sound,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = spring({frame: f - s(at), fps, config: {damping: 13, stiffness: 180}});
  if (f < s(at)) return null;
  const snd = sound === undefined ? (out ? 'send' : 'ping') : sound;
  return (
    <div style={{display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start'}}>
      <div
        style={{
          maxWidth: '82%',
          background: out ? C.ink : dark ? '#2B2B2B' : '#F1EEE9',
          color: out || dark ? C.white : C.ink,
          fontFamily: SANS,
          fontWeight: 500,
          fontSize: 42,
          lineHeight: 1.25,
          padding: '22px 30px',
          borderRadius: 34,
          borderBottomRightRadius: out ? 10 : 34,
          borderBottomLeftRadius: out ? 34 : 10,
          transform: `translateY(${(1 - sp) * 30}px) scale(${0.92 + 0.08 * sp})`,
          transformOrigin: out ? 'right bottom' : 'left bottom',
          opacity: sp,
        }}
      >
        {children}
      </div>
      {snd && <Sfx at={at} name={snd} volume={0.55} />}
    </div>
  );
};

export const Typing: React.FC<{from: number; to: number; out?: boolean; dark?: boolean}> = ({from, to, out, dark}) => {
  const f = useCurrentFrame();
  if (f < s(from) || f >= s(to)) return null;
  return (
    <div style={{display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start'}}>
      <div
        style={{
          background: out ? C.ink : dark ? '#2B2B2B' : '#F1EEE9',
          borderRadius: 34,
          padding: '26px 30px',
          display: 'flex',
          gap: 12,
        }}
      >
        {[0, 1, 2].map((i) => {
          const y = Math.sin((f - s(from)) / 4 - i * 0.9) * 7;
          return (
            <div
              key={i}
              style={{width: 16, height: 16, borderRadius: '50%', background: out || dark ? '#BDBDBD' : '#9A948B', transform: `translateY(${y}px)`}}
            />
          );
        })}
      </div>
    </div>
  );
};

/* ---------- Typing into a compose box (with delete) ---------- */
export type TypeStep = {text: string; from: number; to: number; mode: 'type' | 'delete'};
export const typedText = (f: number, steps: TypeStep[]) => {
  let current = '';
  for (const st of steps) {
    if (f < s(st.from)) break;
    const p = interpolate(f, [s(st.from), s(st.to)], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (st.mode === 'type') current = st.text.slice(0, Math.round(st.text.length * p));
    else current = st.text.slice(0, Math.round(st.text.length * (1 - p)));
  }
  return current;
};

export const TypeClicks: React.FC<{steps: TypeStep[]}> = ({steps}) => (
  <>
    {steps.flatMap((st, k) => {
      const n = Math.max(1, Math.floor(st.text.length / (st.mode === 'type' ? 2 : 4)));
      return Array.from({length: n}).map((_, i) => (
        <Sfx key={`${k}-${i}`} at={st.from + ((st.to - st.from) * i) / n} name="click" volume={st.mode === 'type' ? 0.12 : 0.08} />
      ));
    })}
  </>
);

/* ---------- Phone-style notification ---------- */
export const Notif: React.FC<{at: number; app: string; title: string; body: string; color: string; letter: string; index: number}> = ({
  at,
  app,
  title,
  body,
  color,
  letter,
  index,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < s(at)) return null;
  const sp = spring({frame: f - s(at), fps, config: {damping: 15, stiffness: 170}});
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        top: 430 + index * 210,
        background: 'rgba(255,255,255,0.12)',
        border: '2px solid rgba(255,255,255,0.10)',
        borderRadius: 38,
        padding: '28px 32px',
        display: 'flex',
        gap: 26,
        alignItems: 'center',
        transform: `translateY(${(1 - sp) * -60}px)`,
        opacity: sp,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: 20,
          background: color,
          color: C.white,
          fontFamily: SANS,
          fontWeight: 900,
          fontSize: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {letter}
      </div>
      <div style={{flex: 1}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: SANS, fontSize: 26, color: 'rgba(255,255,255,0.6)', fontWeight: 600}}>
          <span>{app.toUpperCase()}</span>
          <span>now</span>
        </div>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.white, marginTop: 4}}>{title}</div>
        <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 32, color: 'rgba(255,255,255,0.82)', marginTop: 2}}>{body}</div>
      </div>
      <Sfx at={at} name="ping" volume={0.55} />
    </div>
  );
};

/* ---------- Chess king mark ---------- */
export const King: React.FC<{size?: number; color?: string}> = ({size = 120, color = C.amber}) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 100 140">
    <rect x="46" y="2" width="8" height="26" rx="2" fill={color} />
    <rect x="37" y="11" width="26" height="8" rx="2" fill={color} />
    <path d="M28 34 Q50 24 72 34 L66 62 L34 62 Z" fill={color} />
    <rect x="30" y="64" width="40" height="8" rx="3" fill={color} />
    <path d="M36 74 L64 74 L68 108 L32 108 Z" fill={color} />
    <rect x="22" y="110" width="56" height="10" rx="4" fill={color} />
    <rect x="16" y="122" width="68" height="14" rx="5" fill={color} />
  </svg>
);

/* ---------- Padlock ---------- */
export const Padlock: React.FC<{closed: number}> = ({closed}) => {
  // closed: 0 = open shackle, 1 = closed
  const lift = (1 - closed) * 38;
  return (
    <svg width={300} height={380} viewBox="0 0 300 380">
      <path
        d={`M80 ${170 - lift} V${110 - lift} a70 70 0 0 1 140 0 V${170 - (1 - closed) * 0}`}
        fill="none"
        stroke={C.amber}
        strokeWidth={34}
        strokeLinecap="round"
      />
      <rect x="30" y="160" width="240" height="200" rx="34" fill={C.amber} />
      <circle cx="150" cy="245" r="24" fill={C.night} />
      <rect x="140" y="250" width="20" height="56" rx="8" fill={C.night} />
    </svg>
  );
};

/* ---------- Big serif line reveal ---------- */
export const SerifLine: React.FC<{at: number; children: React.ReactNode; color?: string; size?: number; italic?: boolean}> = ({
  at,
  children,
  color = C.white,
  size = 120,
  italic,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < s(at)) return null;
  const sp = spring({frame: f - s(at), fps, config: {damping: 16, stiffness: 140}});
  return (
    <div
      style={{
        fontFamily: SERIF,
        fontStyle: italic ? 'italic' : 'normal',
        fontSize: size,
        lineHeight: 1.05,
        color,
        transform: `translateY(${(1 - sp) * 40}px)`,
        opacity: sp,
        letterSpacing: -1,
      }}
    >
      {children}
    </div>
  );
};

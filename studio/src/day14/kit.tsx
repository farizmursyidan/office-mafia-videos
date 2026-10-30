import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';

/* Shared motion language for Day 14: no bouncy springs, everything eases or uses a damped spring curve. */
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const INOUT = Easing.bezier(0.65, 0, 0.35, 1);
export const SPRING = Easing.spring({damping: 200});
export const CL = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const useT = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return {f, fps, t: f / fps};
};
/** 0..1 from `at` over `d` seconds */
export const ez = (t: number, at: number, d = 0.55, e = OUT) => interpolate(t, [at, at + d], [0, 1], {...CL, easing: e});
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const float = (t: number, k = 0) => Math.sin(t * 1.3 + k) * 4;

export const YOU = {shirt: C.amber, hair: '#1E1A17', hairStyle: 'short' as const, skin: '#C99267', pants: '#2B2B33'};
export const DANA = {shirt: '#3F6FB5', hair: '#3A2A20', hairStyle: 'bun' as const, skin: '#E2B48C', pants: '#2A2A33'};

export const card: React.CSSProperties = {position: 'absolute', left: 70, right: 70, background: C.white, borderRadius: 34, boxShadow: '0 30px 70px rgba(60,45,20,0.18)'};

/* Paper background with a slow-moving soft light, so light scenes never sit perfectly still */
export const Paper: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {t} = useT();
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at ${50 + 20 * Math.sin(t * 0.35)}% ${35 + 8 * Math.cos(t * 0.3)}%, rgba(255,255,255,0.55), rgba(255,255,255,0) 60%)`}} />
      {children}
    </AbsoluteFill>
  );
};
export const Night: React.FC<{children: React.ReactNode}> = ({children}) => {
  const {t} = useT();
  return (
    <AbsoluteFill style={{background: C.night}}>
      <AbsoluteFill style={{background: `radial-gradient(circle at ${50 + 18 * Math.sin(t * 0.5)}% ${42 + 10 * Math.cos(t * 0.4)}%, rgba(224,169,59,0.17), rgba(17,17,17,0) 55%)`}} />
      {children}
    </AbsoluteFill>
  );
};

/* Slow push-in on the whole scene */
export const Push: React.FC<{children: React.ReactNode; to?: number}> = ({children, to = 1.035}) => {
  const {f} = useT();
  const {durationInFrames} = useVideoConfig();
  return <AbsoluteFill style={{scale: String(interpolate(f, [0, durationInFrames], [1, to], {...CL, output: 'perceptual-scale'}))}}>{children}</AbsoluteFill>;
};

export const Mark: React.FC<{dark?: boolean}> = ({dark}) => (
  <div style={{position: 'absolute', top: 110, left: 72, fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,20,20,0.45)'}}>OFFICE MAFIA</div>
);

export const Label: React.FC<{n: string; title: string; dark?: boolean}> = ({n, title, dark}) => {
  const {f, fps} = useT();
  return (
    <div style={{position: 'absolute', top: 210, left: 72, right: 72}}>
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
          opacity: interpolate(f, [0.3 * fps, 0.8 * fps], [0, 1], {...CL, easing: OUT}),
          translate: interpolate(f, [0.3 * fps, 0.8 * fps], ['-40px 0px', '0px 0px'], {...CL, easing: OUT}),
        }}
      >
        {n}
      </div>
      <div style={{overflow: 'hidden', paddingBottom: 6}}>
        <div
          style={{
            fontFamily: SANS,
            fontWeight: 900,
            fontSize: 70,
            lineHeight: 1.02,
            color: dark ? C.white : C.ink,
            letterSpacing: -1,
            translate: interpolate(f, [0.38 * fps, 0.95 * fps], ['0px 90px', '0px 0px'], {...CL, easing: OUT}),
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

/* ---------- captions: words glide up in time with the voice, the spoken word is full ink, key words get a hand-drawn highlight ---------- */
export type Cap = {text: string; start: number; end: number; key?: string; se?: number};
const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, '');
export const Caps: React.FC<{caps: Cap[]; top?: number; dark?: boolean}> = ({caps, top = 1280, dark}) => {
  const {t} = useT();
  const cap = caps.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;
  const words = cap.text.split(' ');
  const keys = (cap.key || '').split(' ').map(norm);
  const span = ((cap.se ?? cap.start + words.length * 0.12) - cap.start) * 0.9;
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
        opacity: interpolate(t, [cap.end - 0.14, cap.end], [1, 0], CL),
      }}
    >
      {words.map((w, i) => {
        const at = cap.start + (i * span) / words.length;
        const isKey = keys.includes(norm(w));
        const word = (
          <span
            style={{
              display: 'inline-block',
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: 82,
              lineHeight: 1.12,
              letterSpacing: -1,
              color: dark ? (isKey ? C.amber : C.white) : C.ink,
              textShadow: dark ? '0 6px 20px rgba(0,0,0,0.5)' : 'none',
              opacity: interpolate(t, [at, at + 0.28], [0, 1], {...CL, easing: OUT}),
              translate: interpolate(t, [at, at + 0.28], ['0px 22px', '0px 0px'], {...CL, easing: OUT}),
            }}
          >
            {w}
          </span>
        );
        if (isKey && !dark) {
          return (
            <Highlight key={i} color="rgba(224,169,59,0.85)" iterations={1} seed={i + 3} padding={{left: 8, right: 8, top: 0, bottom: 0}} progress={interpolate(t, [at + 0.15, at + 0.55], [0, 1], {...CL, easing: INOUT})}>
              {word}
            </Highlight>
          );
        }
        return <React.Fragment key={i}>{word}</React.Fragment>;
      })}
    </div>
  );
};

export const Pill: React.FC<{p: number; bg: string; fg?: string; size?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({p, bg, fg = C.white, size = 32, style, children}) => (
  <div style={{position: 'absolute', opacity: p, translate: `0px ${(1 - p) * 16}px`, scale: String(mix(0.9, 1, p)), transformOrigin: 'left center', ...style}}>
    <div style={{background: bg, color: fg, fontFamily: SANS, fontWeight: 900, fontSize: size, padding: '10px 24px', borderRadius: 999, letterSpacing: 1, whiteSpace: 'nowrap', boxShadow: '0 10px 24px rgba(60,45,20,0.18)'}}>{children}</div>
  </div>
);

export const Fg: React.FC<{children: React.ReactNode; k?: number}> = ({children, k = 1.45}) => (
  <g transform={`translate(540 1180) scale(${k}) translate(-540 -1180)`}>{children}</g>
);
export const Floor: React.FC = () => (
  <g>
    <rect x={0} y={1080} width={1080} height={100} fill="#DDD5C8" opacity={0.85} />
    <rect x={0} y={1180} width={1080} height={740} fill="#D6CCBD" />
    <rect x={0} y={1180} width={1080} height={10} fill="#C7BBA9" />
  </g>
);

/* Camera: keyframes of a zoom anchor point (stays fixed on screen) and zoom factor, eased in and out */
export type Shot = {t: number; x: number; y: number; z: number};
export const Camera: React.FC<{shots: Shot[]; children: React.ReactNode}> = ({shots, children}) => {
  const {t} = useT();
  const ts = shots.map((s) => s.t);
  const easing = shots.slice(1).map(() => INOUT);
  const z = interpolate(t, ts, shots.map((s) => s.z), {...CL, easing});
  const x = interpolate(t, ts, shots.map((s) => s.x), {...CL, easing});
  const y = interpolate(t, ts, shots.map((s) => s.y), {...CL, easing});
  return (
    <AbsoluteFill style={{transformOrigin: `${x}px ${y}px`, scale: String(z)}}>
      {children}
    </AbsoluteFill>
  );
};

export const RAJ = {shirt: '#5B8C5A', hair: '#1E1A17', hairStyle: 'short' as const, skin: '#B07A52', pants: '#2A2A33'};
export const MEI = {shirt: '#9A5BB0', hair: '#141414', hairStyle: 'long' as const, skin: '#EBC29A', pants: '#2A2A33'};

/* Round initials avatar */
export const Av: React.FC<{i: string; bg: string; size?: number; dashed?: boolean; fg?: string}> = ({i, bg, size = 84, dashed, fg = C.white}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: dashed ? 'transparent' : bg,
      border: dashed ? `4px dashed ${C.muted}` : 'none',
      boxSizing: 'border-box',
      color: dashed ? C.muted : fg,
      fontFamily: SANS,
      fontWeight: 900,
      fontSize: size * 0.34,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    {i}
  </div>
);

/* Speech bubble that eases in, with a tail at the bottom */
export const Bub: React.FC<{at: number; left: number; top: number; width?: number; tail?: 'left' | 'right' | 'none'; dark?: boolean; size?: number; children: React.ReactNode}> = ({
  at,
  left,
  top,
  width,
  tail = 'left',
  dark,
  size = 38,
  children,
}) => {
  const {t} = useT();
  if (t < at) return null;
  const bg = dark ? C.ink : C.white;
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width,
        transformOrigin: tail === 'right' ? 'right bottom' : 'left bottom',
        opacity: interpolate(t, [at, at + 0.35], [0, 1], {...CL, easing: OUT}),
        scale: String(interpolate(t, [at, at + 0.5], [0.85, 1], {...CL, easing: OUT, output: 'perceptual-scale'})),
        translate: interpolate(t, [at, at + 0.5], ['0px 24px', '0px 0px'], {...CL, easing: OUT}),
      }}
    >
      <div style={{background: bg, color: dark ? C.white : C.ink, fontFamily: SANS, fontWeight: 800, fontSize: size, lineHeight: 1.2, padding: '20px 28px', borderRadius: 28, boxShadow: '0 16px 40px rgba(60,45,20,0.18)'}}>{children}</div>
      {tail !== 'none' && <div style={{position: 'absolute', bottom: -22, [tail]: 50, width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '16px solid transparent', borderTop: `24px solid ${bg}`}} />}
    </div>
  );
};

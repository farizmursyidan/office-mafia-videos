import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Mark, Night, OUT, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: you did twice the work, but the boss only saw one task. Raj did half and was seen doing all of it. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const Row: React.FC<{i: string; bg: string; fg?: string; v: number; max: number; p: number; color: string}> = ({i, bg, fg, v, max, p, color}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18, height: 84}}>
    <Av i={i} bg={bg} fg={fg} size={62} />
    <div style={{flex: 1, height: 38, background: 'rgba(255,255,255,0.08)', borderRadius: 10, position: 'relative'}}>
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(v / max) * 100 * p}%`, background: color, borderRadius: 10}} />
    </div>
    <div style={{width: 60, textAlign: 'right', fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.white}}>{Math.round(v * p)}</div>
  </div>
);
export const Rule: React.FC = () => {
  const {t} = useT();
  const box = ez(t, 0.1, 0.5);
  const doneP = interpolate(t, [0.4, 1.6], [0, 1], {...CL, easing: OUT});
  const seenBox = ez(t, 4.2, 0.5);
  const seenP = interpolate(t, [4.4, 5.6], [0, 1], {...CL, easing: OUT});
  const dimDone = interpolate(t, [4.2, 4.7], [0, 1], {...CL, easing: INOUT});
  const star = interpolate(t, [5.7, 6.0], [0, 1], {...CL, easing: POP});
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 210, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.3)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{position: 'relative', marginTop: 30, height: 120}}>
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, opacity: 1 - ez(t, 4.1, 0.25)}}>
            <Reveal at={2.22} se={3.6} size={92}>
              Not the work.
            </Reveal>
          </div>
          {t >= 4.15 && (
            <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
              <Reveal at={4.29} se={6.0} size={92} color={C.amber} italic mark={{word: 'saw.', color: C.white, at: 5.6}}>
                The work they saw.
              </Reveal>
            </div>
          )}
        </div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 470, height: 680}}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 300,
            borderRadius: 30,
            background: C.nightSoft,
            border: '3px solid rgba(255,255,255,0.12)',
            padding: '24px 36px',
            boxSizing: 'border-box',
            opacity: box * (1 - 0.5 * dimDone),
            translate: `0px ${(1 - box) * 40}px`,
          }}
        >
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: 'rgba(255,255,255,0.55)', marginBottom: 14}}>WORK DONE THIS WEEK</div>
          <Row i="YOU" bg={C.amber} fg={C.ink} v={12} max={12} p={doneP} color={C.amber} />
          <Row i="RA" bg="#5B8C5A" v={6} max={12} p={doneP} color="rgba(255,255,255,0.45)" />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 340,
            height: 300,
            borderRadius: 30,
            background: C.nightSoft,
            border: `3px solid ${C.amber}`,
            padding: '24px 36px',
            boxSizing: 'border-box',
            opacity: seenBox,
            translate: `0px ${(1 - seenBox) * 40}px`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14}}>
            <svg width={44} height={30} viewBox="0 0 44 30">
              <path d="M2 15 Q22 -6 42 15 Q22 36 2 15 Z" fill="none" stroke={C.amber} strokeWidth={4} />
              <circle cx={22} cy={15} r={7} fill={C.amber} />
            </svg>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.amber}}>WORK YOUR BOSS SAW</div>
          </div>
          <Row i="YOU" bg={C.amber} fg={C.ink} v={1} max={12} p={seenP} color="rgba(255,255,255,0.45)" />
          <div style={{position: 'relative'}}>
            <Row i="RA" bg="#5B8C5A" v={6} max={12} p={seenP} color={C.green} />
            {star > 0 && (
              <div style={{position: 'absolute', left: 470, top: 14, opacity: interpolate(star, [0, 0.4], [0, 1], CL), scale: String(interpolate(t, [5.7, 6.0], [1.5, 1], {...CL, easing: OUT}))}}>
                <div style={{background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 28, padding: '6px 16px', borderRadius: 10, whiteSpace: 'nowrap'}}>GETS PROMOTED</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={2.22} name="click" volume={0.28} />
      <Sfx at={4.3} name="pop" volume={0.3} />
      <Sfx at={5.7} name="hit" volume={0.3} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.44, end: 2.1, key: 'rule', se: 1.74},
          {text: "Managers don't reward the work.", start: 2.22, end: 4.15, key: 'reward', se: 3.78},
          {text: 'They reward the work they saw happen.', start: 4.29, end: 6.75, key: 'saw', se: 6.18},
        ]}
      />
    </Night>
  );
};

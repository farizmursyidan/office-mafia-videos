import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, Mark, Night, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: same late project, two timelines. Told on Monday, the boss says "Let's fix it". Found out Friday, the boss asks "Why am I hearing this now?" */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const Lane: React.FC<{p: number; top: number; when: string; good: boolean; reply: string; rp: number; border: string}> = ({p, top, when, good, reply, rp, border}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top,
      height: 300,
      borderRadius: 30,
      background: C.nightSoft,
      border: `3px solid ${border}`,
      padding: '28px 36px',
      boxSizing: 'border-box',
      opacity: p,
      translate: `0px ${(1 - p) * 40}px`,
    }}
  >
    <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 3, color: good ? C.green : C.red}}>{when}</div>
    <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 34}}>
      <Av i="DA" bg="#3F6FB5" size={84} />
      <div
        style={{
          background: C.white,
          color: C.ink,
          fontFamily: SANS,
          fontWeight: 800,
          fontSize: 40,
          padding: '20px 28px',
          borderRadius: 26,
          whiteSpace: 'nowrap',
          opacity: Math.min(1, rp * 2),
          scale: String(0.85 + 0.15 * rp),
          transformOrigin: 'left center',
        }}
      >
        {reply}
      </div>
    </div>
  </div>
);
export const Rule: React.FC = () => {
  const {t} = useT();
  const a = ez(t, 0.1, 0.5);
  const ar = interpolate(t, [2.3, 2.6], [0, 1], {...CL, easing: POP});
  const b = ez(t, 4.1, 0.5);
  const br = interpolate(t, [4.9, 5.2], [0, 1], {...CL, easing: POP});
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 210, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.3)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{position: 'relative', marginTop: 30, height: 120}}>
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, opacity: 1 - ez(t, 4.0, 0.25)}}>
            <Reveal at={2.15} se={3.85} size={92}>
              Bad news: forgiven.
            </Reveal>
          </div>
          {t >= 4.05 && (
            <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
              <Reveal at={4.13} se={5.62} size={92} color={C.amber} italic mark={{word: 'never.', color: C.white, at: 5.3}}>
                Surprises: never.
              </Reveal>
            </div>
          )}
        </div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 470, height: 680}}>
        <Lane p={a} top={0} when="YOU TELL HER ON MONDAY" good reply="Okay. Let's fix it." rp={ar} border="rgba(255,255,255,0.12)" />
        <Lane p={b} top={340} when="SHE FINDS OUT ON FRIDAY" good={false} reply="Why am I hearing this now?" rp={br} border={C.red} />
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={2.3} name="pop" volume={0.28} />
      <Sfx at={4.2} name="blip" volume={0.26} />
      <Sfx at={4.9} name="hit" volume={0.3} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.43, end: 2.08, key: 'rule', se: 1.97},
          {text: 'Bosses forgive bad news.', start: 2.15, end: 4.05, key: 'forgive', se: 3.85},
          {text: 'They never forgive surprises.', start: 4.13, end: 6.2, key: 'surprises', se: 5.62},
        ]}
      />
    </Night>
  );
};

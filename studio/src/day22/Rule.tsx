import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, Mark, Night, OUT, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: the "chat" is scored like an audition, and the score sheet gets forwarded to your boss. */
const NOTES = [
  {k: 'Knows their numbers', at: 4.1},
  {k: 'Talks up the team', at: 4.4},
  {k: 'Ready for more', at: 4.7},
];
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
export const Rule: React.FC = () => {
  const {t} = useT();
  const sheet = ez(t, 2.3, 0.55);
  const fwd = ez(t, 5.29, 0.45);
  const stamp = interpolate(t, [5.9, 6.2], [0, 1], {...CL, easing: POP});
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 210, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.3)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{position: 'relative', marginTop: 30, height: 110}}>
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, opacity: 1 - ez(t, 3.85, 0.25)}}>
            <Reveal at={2.28} se={3.4} size={92}>
              Not a chat.
            </Reveal>
          </div>
          {t >= 3.9 && (
            <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
              <Reveal at={4.02} se={4.9} size={92} color={C.amber} italic mark={{word: 'audition.', color: C.white, at: 4.6}}>
                An audition.
              </Reveal>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 80,
          right: 80,
          top: 470,
          height: 520,
          borderRadius: 30,
          background: C.nightSoft,
          border: '3px solid rgba(255,255,255,0.12)',
          padding: '30px 36px',
          boxSizing: 'border-box',
          opacity: sheet,
          translate: `0px ${(1 - sheet) * 50 - fwd * 24}px`,
          boxShadow: '0 30px 70px rgba(0,0,0,0.45)',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <Av i="KA" bg="#2F3A4F" size={70} />
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 3, color: 'rgba(255,255,255,0.6)'}}>KAREN'S NOTES ON YOU</div>
        </div>
        <div style={{marginTop: 22}}>
          {NOTES.map((n) => {
            const p = ez(t, n.at, 0.35);
            return (
              <div key={n.k} style={{height: 104, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid rgba(255,255,255,0.1)'}}>
                <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 42, color: C.white, whiteSpace: 'nowrap'}}>{n.k}</div>
                <div style={{width: 64, height: 64, borderRadius: 14, border: '3px solid rgba(255,255,255,0.25)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(224,169,59,${p})`}}>
                  <svg width={36} height={36} viewBox="0 0 36 36" style={{opacity: p, scale: String(0.6 + 0.4 * p)}}>
                    <path d="M6 19 L14 27 L30 9" stroke={C.ink} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{position: 'absolute', left: 80, right: 80, top: 1030, height: 120, borderRadius: 24, background: C.amber, display: 'flex', alignItems: 'center', gap: 22, padding: '0 28px', boxSizing: 'border-box', opacity: fwd, translate: `0px ${(1 - fwd) * 40}px`}}>
        <svg width={56} height={56} viewBox="0 0 56 56">
          <path d="M6 30 H40 M28 16 L42 30 L28 44" stroke={C.ink} strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink, whiteSpace: 'nowrap'}}>Fwd to Dana, your boss</div>
        {stamp > 0 && (
          <div style={{marginLeft: 'auto', opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), scale: String(interpolate(t, [5.9, 6.2], [1.5, 1], {...CL, easing: OUT}))}}>
            <Av i="DA" bg="#3F6FB5" size={76} />
          </div>
        )}
      </div>
      <Sfx at={2.28} name="click" volume={0.28} />
      <Sfx at={4.02} name="pop" volume={0.3} />
      <Sfx at={4.4} name="click" volume={0.22} />
      <Sfx at={4.7} name="click" volume={0.22} />
      <Sfx at={5.29} name="send" volume={0.3} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.4, end: 2.15, key: 'rule', se: 1.83},
          {text: "A skip level isn't a chat.", start: 2.28, end: 3.9, key: 'chat', se: 3.68},
          {text: "It's an audition.", start: 4.02, end: 5.15, key: 'audition', se: 4.98},
          {text: 'And your boss reads the review.', start: 5.29, end: 7.6, key: 'review', se: 6.98},
        ]}
      />
    </Night>
  );
};

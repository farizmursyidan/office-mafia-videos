import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {Underline} from '@remotion/rough-notation';
import {C, SANS, SERIF} from '../theme';
import {King, Sfx} from '../components';
import {CL, INOUT, Mark, Night, OUT, Push, useT} from './kit';

/* Serif line whose words surface one by one, in step with the voice. `mark` words get a hand-drawn underline. */
export const Reveal: React.FC<{at: number; se: number; size: number; color?: string; italic?: boolean; mark?: {word: string; color: string; at: number}; children: string}> = ({
  at,
  se,
  size,
  color = C.white,
  italic,
  mark,
  children,
}) => {
  const {t} = useT();
  const words = children.split(' ');
  const step = ((se - at) * 0.85) / words.length;
  return (
    <div style={{fontFamily: SERIF, fontStyle: italic ? 'italic' : 'normal', fontSize: size, lineHeight: 1.08, color, letterSpacing: -1}}>
      {words.map((w, i) => {
        const a = at + i * step;
        const el = (
          <span
            style={{
              display: 'inline-block',
              opacity: interpolate(t, [a, a + 0.45], [0, 1], {...CL, easing: OUT}),
              translate: interpolate(t, [a, a + 0.5], ['0px 28px', '0px 0px'], {...CL, easing: OUT}),
              filter: `blur(${interpolate(t, [a, a + 0.4], [6, 0], CL)}px)`,
            }}
          >
            {w}
          </span>
        );
        return (
          <React.Fragment key={i}>
            {mark && mark.word === w ? (
              <Underline color={mark.color} strokeWidth={6} seed={i + 30} padding={{top: -4}} progress={interpolate(t, [mark.at, mark.at + 0.5], [0, 1], {...CL, easing: INOUT})}>
                {el}
              </Underline>
            ) : (
              el
            )}
            {i < words.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* 6. Punch line */
export const Punch: React.FC = () => (
  <Night>
    <Push to={1.05}>
      <Mark dark />
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 150px 0 90px', gap: 34}}>
        <Reveal at={0.64} se={1.88} size={108} mark={{word: 'comfortable.', color: C.muted, at: 1.7}}>
          Cliques keep you comfortable.
        </Reveal>
        <Reveal at={2.51} se={3.96} size={108} color={C.amber} italic mark={{word: 'promoted.', color: C.white, at: 3.7}}>
          Networks get you promoted.
        </Reveal>
      </AbsoluteFill>
    </Push>
    <Sfx at={0.64} name="pop" volume={0.25} />
    <Sfx at={2.51} name="pop" volume={0.35} />
  </Night>
);

/* 7. End card */
export const End: React.FC = () => {
  const {t} = useT();
  return (
    <Night>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          padding: '0 90px',
          gap: 30,
          opacity: interpolate(t, [3.0, 3.3], [1, 0], {...CL, easing: INOUT}),
          translate: interpolate(t, [3.0, 3.3], ['0px 0px', '0px -40px'], {...CL, easing: INOUT}),
        }}
      >
        <div style={{maxWidth: 860}}>
          <Reveal at={0.42} se={1.82} size={88}>
            Is there a clique in your office?
          </Reveal>
        </div>
        <Reveal at={2.01} se={2.79} size={64} color={C.amber} italic>
          Tell me in the comments.
        </Reveal>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: interpolate(t, [3.3, 3.9], [0, 1], {...CL, easing: OUT}),
          translate: interpolate(t, [3.3, 4.1], ['0px 40px', '0px 0px'], {...CL, easing: OUT}),
        }}
      >
        <div style={{scale: String(interpolate(t, [3.3, 4.1], [0.6, 1], {...CL, easing: OUT, output: 'perceptual-scale'})), rotate: interpolate(t, [3.3, 4.1], ['-12deg', '0deg'], {...CL, easing: OUT})}}>
          <King size={130} />
        </div>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: interpolate(t, [3.4, 4.3], [26, 14], {...CL, easing: OUT}), color: C.white, marginTop: 36, whiteSpace: 'nowrap'}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40, opacity: interpolate(t, [3.6, 4.1], [0, 1], {...CL, easing: OUT})}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14, opacity: interpolate(t, [3.8, 4.3], [0, 1], {...CL, easing: OUT})}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={3.3} name="pop" volume={0.35} />
    </Night>
  );
};

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
        <Reveal at={0.59} se={1.98} size={108} mark={{word: 'desk.', color: C.muted, at: 1.85}}>
          Hard work happens at your desk.
        </Reveal>
        <Reveal at={2.32} se={4.0} size={108} color={C.amber} italic mark={{word: 'hallway.', color: C.white, at: 3.7}}>
          Promotions happen in the hallway.
        </Reveal>
      </AbsoluteFill>
    </Push>
    <Sfx at={0.59} name="pop" volume={0.25} />
    <Sfx at={2.32} name="pop" volume={0.35} />
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
          opacity: interpolate(t, [4.0, 4.3], [1, 0], {...CL, easing: INOUT}),
          translate: interpolate(t, [4.0, 4.3], ['0px 0px', '0px -40px'], {...CL, easing: INOUT}),
        }}
      >
        <div style={{maxWidth: 860}}>
          <Reveal at={0.76} se={2.29} size={88}>
            Do you think remote workers get passed over?
          </Reveal>
        </div>
        <Reveal at={2.67} se={3.46} size={64} color={C.amber} italic>
          Tell me in the comments.
        </Reveal>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: interpolate(t, [4.3, 4.9], [0, 1], {...CL, easing: OUT}),
          translate: interpolate(t, [4.3, 5.1], ['0px 40px', '0px 0px'], {...CL, easing: OUT}),
        }}
      >
        <div style={{scale: String(interpolate(t, [4.3, 5.1], [0.6, 1], {...CL, easing: OUT, output: 'perceptual-scale'})), rotate: interpolate(t, [4.3, 5.1], ['-12deg', '0deg'], {...CL, easing: OUT})}}>
          <King size={130} />
        </div>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: interpolate(t, [4.4, 5.3], [26, 14], {...CL, easing: OUT}), color: C.white, marginTop: 36, whiteSpace: 'nowrap'}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40, opacity: interpolate(t, [4.8, 5.3], [0, 1], {...CL, easing: OUT})}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14, opacity: interpolate(t, [5.0, 5.5], [0, 1], {...CL, easing: OUT})}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={4.3} name="pop" volume={0.35} />
    </Night>
  );
};

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
        <Reveal at={0.72} se={2.01} size={116} mark={{word: 'noise.', color: C.muted, at: 1.8}}>
          Rivals win with noise.
        </Reveal>
        <Reveal at={2.51} se={3.85} size={116} color={C.amber} italic mark={{word: 'receipts.', color: C.white, at: 3.6}}>
          You win with receipts.
        </Reveal>
      </AbsoluteFill>
    </Push>
    <Sfx at={0.72} name="pop" volume={0.25} />
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
          opacity: interpolate(t, [3.05, 3.35], [1, 0], {...CL, easing: INOUT}),
          translate: interpolate(t, [3.05, 3.35], ['0px 0px', '0px -40px'], {...CL, easing: INOUT}),
        }}
      >
        <div style={{maxWidth: 860}}>
          <Reveal at={0.62} se={1.9} size={96}>
            Do you have a rival at work?
          </Reveal>
        </div>
        <Reveal at={2.03} se={2.85} size={64} color={C.amber} italic>
          Tell me in the comments.
        </Reveal>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          opacity: interpolate(t, [3.35, 3.95], [0, 1], {...CL, easing: OUT}),
          translate: interpolate(t, [3.35, 4.15], ['0px 40px', '0px 0px'], {...CL, easing: OUT}),
        }}
      >
        <div style={{scale: String(interpolate(t, [3.35, 4.15], [0.6, 1], {...CL, easing: OUT, output: 'perceptual-scale'})), rotate: interpolate(t, [3.35, 4.15], ['-12deg', '0deg'], {...CL, easing: OUT})}}>
          <King size={130} />
        </div>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: interpolate(t, [3.45, 4.35], [26, 14], {...CL, easing: OUT}), color: C.white, marginTop: 36, whiteSpace: 'nowrap'}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40, opacity: interpolate(t, [3.85, 4.35], [0, 1], {...CL, easing: OUT})}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14, opacity: interpolate(t, [4.05, 4.55], [0, 1], {...CL, easing: OUT})}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={3.35} name="pop" volume={0.35} />
    </Night>
  );
};

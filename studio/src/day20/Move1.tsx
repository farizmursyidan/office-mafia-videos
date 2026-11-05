import React from 'react';
import {interpolate} from 'remotion';
import {Highlight, StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person, Plant} from '../characters';
import {Av, Bub, CL, Camera, Caps, DANA, FadeOut, Fg, Floor, INOUT, Label, Mark, Paper, Pill, YOU, card, ez, useT} from './kit';

/* 3. Move 1: hoping gets crossed out, a 30 minute slot gets booked, and you say the title out loud. */
export const Move1: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const inv = ez(t, 3.35, 0.5) * (1 - ez(t, 5.45, 0.3));
  const nod = t > 7.4 ? Math.sin((t - 7.4) * 7) * Math.max(0, 1 - (t - 7.4) / 1.0) * 5 : 0;
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 900, z: 1.04},
          {t: 2.8, x: 540, y: 900, z: 1.0},
          {t: 5.8, x: 540, y: 700, z: 1.0},
          {t: 8.1, x: 540, y: 700, z: 1.03},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Plant x={70} y={1080} />
          <Plant x={1010} y={1080} />
          <Fg k={1.2}>
            <Person x={300} y={1180} facing={1} bob={breathe(0)} armL={t > 5.6 ? interpolate(t, [5.6, 6.0], [10, 70], {...CL, easing: INOUT}) : 10} {...YOU} />
            <Person x={780} y={1180} facing={-1} bob={breathe(1) + nod} {...DANA} />
          </Fg>
        </svg>
        <FadeOut from={3.1} d={0.3}>
          <Bub at={0.7} left={70} top={470} tail="left" size={42}>
            <StrikeThrough color={C.red} strokeWidth={6} seed={5} progress={interpolate(t, [1.9, 2.4], [0, 1], {...CL, easing: INOUT})}>
              <span>Maybe they noticed?</span>
            </StrikeThrough>
          </Bub>
        </FadeOut>
        <div style={{...card, top: 430, height: 250, padding: '24px 32px', opacity: inv, translate: `0px ${(1 - ez(t, 3.35, 0.5)) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>CALENDAR INVITE</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 54, color: C.ink, marginTop: 12, whiteSpace: 'nowrap'}}>My career, 30 minutes</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 16}}>
            <Av i="YOU" bg={C.amber} fg={C.ink} size={66} />
            <Av i="DA" bg="#3F6FB5" size={66} />
            <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 34, color: C.muted, marginLeft: 8, whiteSpace: 'nowrap'}}>Tuesday, 10:00</div>
          </div>
        </div>
        <Pill p={ez(t, 4.2, 0.3) * (1 - ez(t, 5.45, 0.3))} bg={C.green} size={30} style={{right: 104, top: 590}}>
          BOOKED
        </Pill>
        <Bub at={5.75} left={70} top={460} width={700} tail="left" size={58}>
          I want{' '}
          <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={6} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={interpolate(t, [6.4, 6.9], [0, 1], {...CL, easing: INOUT})}>
            <span>senior analyst</span>
          </Highlight>{' '}
          by June.
        </Bub>
      </Camera>
      <Mark />
      <Label n="1/3" title="Say the title out loud" />
      <Sfx at={0.7} name="pop" volume={0.3} />
      <Sfx at={1.9} name="click" volume={0.28} />
      <Sfx at={3.76} name="blip" volume={0.3} />
      <Sfx at={5.87} name="pop" volume={0.34} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: say the title out loud.', start: 0.59, end: 3.4, key: 'title', se: 3.21},
          {text: 'Book thirty minutes and name it.', start: 3.76, end: 5.6, key: 'thirty', se: 5.28},
          {text: '"I want senior analyst by June."', start: 5.87, end: 8.0, key: 'senior', se: 7.6},
        ]}
      />
    </Paper>
  );
};

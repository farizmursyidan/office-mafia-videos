import React from 'react';
import {interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person, Plant} from '../characters';
import {Bub, CL, Camera, Caps, FadeOut, Fg, Floor, INOUT, KAREN, Label, Mark, Paper, Pill, YOU, ez, useT} from './kit';

/* 5. Move 3: you ask the VP about her biggest problem, she answers, you offer to help, and you land on her list. */
export const Move3: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const ask = t > 4.02 ? interpolate(t, [4.02, 4.4], [10, 65], {...CL, easing: INOUT}) * (1 - interpolate(t, [6.2, 6.6], [0, 1], {...CL, easing: INOUT})) + 10 * interpolate(t, [6.2, 6.6], [0, 1], CL) : 10;
  const offer = t > 7.51 ? interpolate(t, [7.51, 7.9], [0, 60], {...CL, easing: INOUT}) : 0;
  const nod = t > 6.2 ? Math.sin((t - 6.2) * 7) * Math.max(0, 1 - (t - 6.2) / 1.0) * 5 : 0;
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 800, z: 1.04},
          {t: 3.8, x: 540, y: 800, z: 1.0},
          {t: 7.3, x: 540, y: 700, z: 1.0},
          {t: 9.4, x: 540, y: 700, z: 1.03},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Plant x={70} y={1080} />
          <Plant x={1010} y={1080} />
          <Fg k={1.05}>
            <Person x={300} y={1180} facing={1} bob={breathe(0)} armL={ask + offer} {...YOU} />
            <Person x={780} y={1180} facing={-1} bob={breathe(1) + nod} badge="VP" {...KAREN} />
          </Fg>
        </svg>
        <FadeOut from={6.45}>
          <Bub at={4.02} left={70} top={430} width={780} tail="left" size={44}>
            "What's the one{' '}
            <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={6} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={interpolate(t, [4.6, 5.1], [0, 1], {...CL, easing: INOUT})}>
              <span>problem</span>
            </Highlight>{' '}
            keeping you up this quarter?"
          </Bub>
        </FadeOut>
        <Bub at={6.2} left={560} top={620} width={440} tail="right" size={42}>
          Honestly? Churn.
        </Bub>
        <Bub at={7.51} left={70} top={430} width={620} tail="left" size={46}>
          I can help with that.
        </Bub>
        <Pill p={ez(t, 8.2, 0.3)} bg={C.green} size={32} style={{left: 90, top: 610}}>
          ON KAREN'S LIST
        </Pill>
      </Camera>
      <Mark />
      <Label n="3/3" title="Ask a big question" />
      <Sfx at={4.02} name="pop" volume={0.34} />
      <Sfx at={6.2} name="pop" volume={0.3} />
      <Sfx at={7.51} name="pop" volume={0.32} />
      <Sfx at={8.2} name="ping" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: ask a question only they can answer.', start: 0.56, end: 3.85, key: 'only', se: 3.5},
          {text: '"What\'s the one problem keeping you up this quarter?"', start: 4.02, end: 6.6, key: 'problem', se: 6.16},
          {text: 'Then offer to help with it.', start: 6.76, end: 9.3, key: 'help', se: 8.46},
        ]}
      />
    </Paper>
  );
};

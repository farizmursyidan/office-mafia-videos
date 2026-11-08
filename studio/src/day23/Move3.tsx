import React from 'react';
import {interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {Sfx} from '../components';
import {C} from '../theme';
import {Person, Plant} from '../characters';
import {Bub, CL, Camera, Caps, DANA, FadeOut, Fg, Floor, INOUT, Label, Mark, Paper, Pill, YOU, ez, useT} from './kit';

/* 5. Move 3: you tell your boss you want to stay, name the gap, ask what they can do by January, and the fix lands on their plate. */
export const Move3: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const gesture = t > 3.45 ? interpolate(t, [3.45, 3.8], [10, 62], {...CL, easing: INOUT}) * (1 - interpolate(t, [7.95, 8.3], [0, 1], {...CL, easing: INOUT})) + 10 * interpolate(t, [7.95, 8.3], [0, 1], CL) : 10;
  const nod = t > 8.0 ? Math.sin((t - 8.0) * 7) * Math.max(0, 1 - (t - 8.0) / 1.0) * 5 : 0;
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 800, z: 1.04},
          {t: 3.3, x: 540, y: 800, z: 1.0},
          {t: 6.8, x: 540, y: 700, z: 1.0},
          {t: 9.0, x: 540, y: 700, z: 1.03},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Plant x={70} y={1080} />
          <Plant x={1010} y={1080} />
          <Fg k={1.05}>
            <Person x={300} y={1180} facing={1} bob={breathe(0)} armL={gesture} {...YOU} />
            <Person x={780} y={1180} facing={-1} bob={breathe(1) + nod} badge="BOSS" {...DANA} />
          </Fg>
        </svg>
        <FadeOut from={6.75}>
          <Bub at={3.45} left={70} top={430} width={640} tail="left" size={46}>
            "I want to stay here."
          </Bub>
          <Bub at={5.35} left={70} top={580} width={640} tail="left" size={46}>
            "This{' '}
            <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={6} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={interpolate(t, [5.8, 6.3], [0, 1], {...CL, easing: INOUT})}>
              <span>gap</span>
            </Highlight>{' '}
            makes that hard."
          </Bub>
        </FadeOut>
        <Bub at={6.93} left={70} top={430} width={720} tail="left" size={46}>
          "What can you do by{' '}
          <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={9} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={interpolate(t, [7.4, 7.9], [0, 1], {...CL, easing: INOUT})}>
            <span>January</span>
          </Highlight>
          ?"
        </Bub>
        <Bub at={7.98} left={560} top={655} width={440} tail="right" size={42}>
          Let me fix this.
        </Bub>
        <Pill p={ez(t, 8.3, 0.3)} bg={C.green} size={32} style={{left: 90, top: 600}}>
          NOW IT'S HER PROBLEM
        </Pill>
      </Camera>
      <Mark />
      <Label n="3/3" title="Make it their problem" />
      <Sfx at={3.45} name="pop" volume={0.32} />
      <Sfx at={5.35} name="pop" volume={0.3} />
      <Sfx at={6.93} name="pop" volume={0.32} />
      <Sfx at={7.98} name="pop" volume={0.3} />
      <Sfx at={8.3} name="ping" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: make it their problem to solve.', start: 0.71, end: 3.3, key: 'their problem', se: 3.08},
          {text: 'Say, "I want to stay here."', start: 3.45, end: 5.2, key: 'stay', se: 4.99},
          {text: '"This gap makes that hard."', start: 5.35, end: 6.8, key: 'gap', se: 6.48},
          {text: '"What can you do by January?"', start: 6.93, end: 8.55, key: 'january', se: 7.95},
        ]}
      />
    </Paper>
  );
};

import React from 'react';
import {interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C} from '../theme';
import {Sfx} from '../components';
import {Person, Plant} from '../characters';
import {Bub, CL, Camera, Caps, FadeOut, Fg, Floor, INOUT, Label, Mark, Paper, Pill, TOM, YOU, ez, useT} from './kit';

/* 3. Move 1: keep talking. Mark jumps in, you keep going, then you use his name. */
const MARK = {...TOM, shirt: '#3F6FB5'};
export const Move1: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const lean = interpolate(t, [1.6, 2.1, 5.9, 6.6], [0, 6, 6, -3], {...CL, easing: INOUT});
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 900, z: 1.04},
          {t: 2.2, x: 540, y: 900, z: 1.0},
          {t: 5.4, x: 300, y: 800, z: 1.0},
          {t: 6.4, x: 300, y: 800, z: 1.05},
          {t: 8.7, x: 300, y: 800, z: 1.07},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Plant x={70} y={1080} />
          <Plant x={1010} y={1080} />
          <Fg k={1.2}>
            <Person x={300} y={1180} facing={1} bob={breathe(0)} armL={t > 4.5 ? interpolate(t, [4.5, 4.9], [10, 72], {...CL, easing: INOUT}) : 10} {...YOU} />
            <Person x={780} y={1180} facing={-1} bob={breathe(1)} lean={lean} armL={t > 1.5 && t < 5.9 ? 62 : 10} {...MARK} />
          </Fg>
        </svg>
        <FadeOut from={5.2} d={0.3}>
          <Bub at={0.75} left={90} top={640} tail="left" size={36}>
            So the budget is short by...
          </Bub>
        </FadeOut>
        <FadeOut from={6.3} d={0.35}>
          <Bub at={1.65} left={500} top={460} tail="right" size={36}>
            Actually, quick thing...
          </Bub>
        </FadeOut>
        <Pill p={ez(t, 2.6, 0.4)} bg={C.ink} size={30} style={{left: 420, top: 900}}>
          {"DON'T STOP"}
        </Pill>
        <Pill p={ez(t, 3.37, 0.4)} bg={C.ink} size={30} style={{left: 420, top: 980}}>
          {"DON'T SPEED UP"}
        </Pill>
        <Bub at={5.72} left={70} top={620} tail="left" size={40}>
          <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={7} progress={interpolate(t, [5.8, 6.2], [0, 1], {...CL, easing: INOUT})}>
            <span>Mark,</span>
          </Highlight>
          {' one second, let me finish.'}
        </Bub>
        <Pill p={ez(t, 7.5, 0.45)} bg={C.green} size={30} style={{left: 90, top: 470}}>
          FLOOR: STILL YOURS
        </Pill>
      </Camera>
      <Mark />
      <Label n="1/3" title="Keep talking" />
      <Sfx at={0.75} name="pop" volume={0.3} />
      <Sfx at={1.65} name="pop" volume={0.32} />
      <Sfx at={2.6} name="click" volume={0.28} />
      <Sfx at={3.37} name="click" volume={0.28} />
      <Sfx at={5.72} name="pop" volume={0.32} />
      <Sfx at={7.5} name="blip" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: keep talking.', start: 0.56, end: 2.5, key: 'talking', se: 2.26},
          {text: "Don't stop, don't speed up.", start: 2.6, end: 4.35, key: 'stop', se: 4.0},
          {text: 'Just say their name.', start: 4.45, end: 5.65, key: 'name', se: 5.11},
          {text: '"Mark, one second, let me finish."', start: 5.72, end: 8.6, key: 'finish', se: 7.61},
        ]}
      />
    </Paper>
  );
};

import React from 'react';
import {interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C} from '../theme';
import {Sfx} from '../components';
import {Plant, Person} from '../characters';
import {Bub, CL, Camera, Caps, CoffeeStation, Fg, FadeOut, Floor, INOUT, Label, Mark, PRIYA, Paper, Pill, YOU, ez, useT} from './kit';

/* 3. Move 1: listen, but don't add. At the coffee machine Priya asks about Raj. You say "huh, really?" and change the subject. */
export const Move1: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const lean = interpolate(t, [0.9, 1.4, 3.0, 3.5], [0, 6, 6, 0], {...CL, easing: INOUT});
  const zero = interpolate(t, [6.9, 7.5], [0, 1], {...CL, easing: INOUT});
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 900, z: 1.05},
          {t: 2.5, x: 540, y: 900, z: 1.0},
          {t: 4.6, x: 300, y: 700, z: 1.04},
          {t: 6.3, x: 300, y: 600, z: 1.0},
          {t: 8.9, x: 300, y: 500, z: 1.05},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Plant x={70} y={1080} />
          <CoffeeStation x={960} />
          <Fg k={1.2}>
            <Person x={300} y={1180} facing={1} bob={breathe(0)} armL={t > 4.8 && t < 6.6 ? 60 : 10} {...YOU} />
            <Person x={690} y={1180} facing={-1} bob={breathe(1)} lean={lean} armL={t > 0.9 && t < 3.1 ? 70 : 10} {...PRIYA} />
          </Fg>
        </svg>
        <Bub at={0.9} left={470} top={450} tail="right" size={38}>
          Did you hear about Raj?
        </Bub>
        <FadeOut from={4.35} d={0.3}>
          <Bub at={3.2} left={90} top={600} tail="left" size={40}>
            Huh, really?
          </Bub>
        </FadeOut>
        <Bub at={4.75} left={90} top={600} tail="left" size={38}>
          {"Anyway, how's the launch?"}
        </Bub>
        <div style={{position: 'absolute', left: 90, top: 470}}>
          <Pill p={ez(t, 6.4, 0.45)} bg={C.ink} size={26} style={{position: 'relative'}}>
            <span>
              {'SAID ABOUT RAJ: '}
              <Circle color={C.amber} strokeWidth={5} seed={6} padding={{left: 8, right: 8, top: 8, bottom: 8}} progress={zero}>
                <span>0</span>
              </Circle>
            </span>
          </Pill>
        </div>
      </Camera>
      <Mark />
      <Label n="1/3" title="Listen, don't add" />
      <Sfx at={0.9} name="pop" volume={0.32} />
      <Sfx at={3.2} name="pop" volume={0.3} />
      <Sfx at={4.75} name="pop" volume={0.3} />
      <Sfx at={6.4} name="click" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: "Move one: listen, but don't add.", start: 0.5, end: 3.0, key: "don't", se: 2.8},
          {text: 'Say "huh, really?" and change the subject.', start: 3.05, end: 6.3, key: 'change', se: 6.05},
          {text: 'Nothing you said, nothing to repeat.', start: 6.35, end: 8.9, key: 'nothing', se: 8.08},
        ]}
      />
    </Paper>
  );
};

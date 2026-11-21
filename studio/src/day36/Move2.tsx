import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C} from '../theme';
import {Sfx} from '../components';
import {Person} from '../characters';
import {Bub, CL, Caps, DANA, Floor, INOUT, Label, Mark, Paper, Pill, Push, YOU, ez, useT} from './kit';

/* 4. Move 2: you start to tell your manager "Dan never does anything!" and the bubble gets crossed out.
   Instead you say the deadline version: "The client section is still empty and we present Thursday."
   then "Can Dan confirm by tomorrow?" Your manager nods and a green "Risk flagged" pill lands. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
export const Move2: React.FC = () => {
  const {t} = useT();
  const people = ez(t, 0.1, 0.5);
  const cross = interpolate(t, [3.1, 3.8], [0, 1], {...CL, easing: INOUT});
  const oldOut = interpolate(t, [3.95, 4.3], [1, 0], CL);
  const point = interpolate(t, [4.3, 4.8], [0, 65], {...CL, easing: INOUT});
  const nod = interpolate(t, [8.9, 9.2, 9.5], [0, 6, 0], CL);
  const flagged = interpolate(t, [9.0, 9.35], [0, 1], {...CL, easing: POP});
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Make it a deadline risk" />
        <AbsoluteFill style={{opacity: people}}>
          <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
            <Floor />
            <Person x={300} y={1180} scale={1.15} facing={1} armL={point} armR={8} bob={breathe(0)} {...YOU} />
            <Person x={790} y={1180} scale={1.15} facing={-1} armL={6} armR={4} bob={breathe(1.3) + nod} {...DANA} />
          </svg>
        </AbsoluteFill>
        {oldOut > 0 && (
          <div style={{opacity: oldOut}}>
            <Bub at={1.0} left={80} top={470} width={620} tail="left" size={42}>
              <CrossedOff color={C.red} strokeWidth={6} iterations={1} seed={5} progress={cross}>
                <span>"Dan never does anything!"</span>
              </CrossedOff>
            </Bub>
          </div>
        )}
        <Bub at={4.4} left={80} top={440} width={760} tail="left" size={38}>
          "The client section is still empty and we present Thursday."
        </Bub>
        <Bub at={7.95} left={80} top={610} width={600} tail="left" size={38}>
          "Can Dan confirm by tomorrow?"
        </Bub>
        <Pill p={flagged} bg={C.green} size={28} style={{left: 720, top: 680}}>
          Risk flagged
        </Pill>
      </Push>
      <Sfx at={1.0} name="pop" volume={0.2} />
      <Sfx at={3.1} name="snip" volume={0.22} />
      <Sfx at={4.4} name="pop" volume={0.2} />
      <Sfx at={7.95} name="pop" volume={0.2} />
      <Sfx at={9.0} name="ping" volume={0.2} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: raise it as a deadline risk, not a complaint.', start: 0.65, end: 4.3, key: 'deadline risk', se: 4.09},
          {text: 'Say: "The client section is still empty and we present Thursday."', start: 4.37, end: 7.9, key: 'Thursday', se: 7.68},
          {text: '"Can Dan confirm by tomorrow?"', start: 7.98, end: 9.75, key: 'tomorrow', se: 9.2},
        ]}
      />
    </Paper>
  );
};

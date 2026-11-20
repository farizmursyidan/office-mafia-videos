import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C} from '../theme';
import {Sfx} from '../components';
import {Person} from '../characters';
import {Bub, CL, Caps, Floor, INOUT, Label, Mark, Paper, Pill, Push, PRIYA, YOU, ez, useT} from './kit';

/* 5. Move 3: you start to say "At my old company, we..." and the bubble gets crossed out. It fades and you ask
   "Why do we do it this way?" instead. Priya answers "Good question. Long story." and a green pill says
   "Then suggest changes". */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
export const Move3: React.FC = () => {
  const {t} = useT();
  const people = ez(t, 0.1, 0.5);
  const cross = interpolate(t, [2.0, 2.8], [0, 1], {...CL, easing: INOUT});
  const oldOut = interpolate(t, [3.8, 4.2], [1, 0], CL);
  const ask = interpolate(t, [4.3, 4.8], [0, 65], {...CL, easing: INOUT});
  const later = interpolate(t, [6.9, 7.25], [0, 1], {...CL, easing: POP});
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Ask before you change" />
        <AbsoluteFill style={{opacity: people}}>
          <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
            <Floor />
            <Person x={300} y={1180} scale={1.15} facing={1} armL={ask} armR={8} bob={breathe(0)} {...YOU} />
            <Person x={790} y={1180} scale={1.15} facing={-1} armL={6} armR={4} bob={breathe(1.3)} {...PRIYA} />
          </svg>
        </AbsoluteFill>
        {oldOut > 0 && (
          <div style={{opacity: oldOut}}>
            <Bub at={0.9} left={80} top={470} width={600} tail="left" size={40}>
              <CrossedOff color={C.red} strokeWidth={6} iterations={1} seed={5} progress={cross}>
                <span>"At my old company, we..."</span>
              </CrossedOff>
            </Bub>
          </div>
        )}
        <Bub at={4.35} left={80} top={460} width={660} tail="left" size={40}>
          Why do we do it this way?
        </Bub>
        <Bub at={6.2} left={316} top={600} width={520} tail="right" size={38}>
          Good question. Long story...
        </Bub>
        <Pill p={later} bg={C.green} size={28} style={{left: 345, top: 1110}}>
          Then suggest changes
        </Pill>
      </Push>
      <Sfx at={0.9} name="pop" volume={0.2} />
      <Sfx at={2.0} name="snip" volume={0.22} />
      <Sfx at={4.35} name="pop" volume={0.2} />
      <Sfx at={6.2} name="pop" volume={0.2} />
      <Sfx at={6.9} name="ping" volume={0.2} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: never say "at my old company."', start: 0.65, end: 4.2, key: 'never old company', se: 3.75},
          {text: 'Ask why things work the way they do', start: 4.31, end: 6.15, key: 'why', se: 6.1},
          {text: 'before you suggest changing anything.', start: 6.2, end: 8.0, key: 'before', se: 7.89},
        ]}
      />
    </Paper>
  );
};

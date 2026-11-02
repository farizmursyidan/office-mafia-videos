import React from 'react';
import {interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C} from '../theme';
import {Sfx} from '../components';
import {CL, CallWindow, Camera, Caps, INOUT, Label, Mark, Paper, TileChip, ez, useT} from './kit';

/* 5. Move 3: same call as the Hook. Mark runs out of words, you pick your sentence up and finish it. */
const LINE1 = 'Going back to my point,';
const LINE2 = ' we should cut the vendor.';
export const Move3: React.FC = () => {
  const {t} = useT();
  const STOP = 3.14;
  const you = t >= 4.76;
  const n1 = Math.floor(interpolate(t, [4.76, 5.7], [0, LINE1.length], CL));
  const n2 = Math.floor(interpolate(t, [6.27, 7.5], [0, LINE2.length], CL));
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 760, z: 1.03},
          {t: 4.4, x: 540, y: 760, z: 1.0},
          {t: 5.4, x: 540, y: 1040, z: 1.03},
          {t: 8.8, x: 540, y: 1040, z: 1.06},
        ]}
      >
        <CallWindow
          top={425}
          rings={{mark: t < STOP ? C.red : undefined, you: you ? C.amber : undefined}}
          dims={{mark: ez(t, STOP, 0.4)}}
          pills={{
            mark: <TileChip p={ez(t, STOP, 0.35)} bg="#3A3A45">done talking</TileChip>,
            you: <TileChip p={ez(t, 7.6, 0.4)} bg={C.green}>POINT MADE</TileChip>,
          }}
        >
          <div style={{color: t < STOP ? C.white : 'rgba(255,255,255,0.45)', opacity: 1 - interpolate(t, [4.6, 4.8], [0, 1], CL), height: you ? 0 : 'auto', overflow: 'hidden'}}>
            <span style={{color: '#8FB4E8', fontWeight: 900}}>MARK </span>
            ...and that's basically my whole take.
          </div>
          {you && (
            <div>
              <span style={{color: C.amber, fontWeight: 900}}>YOU </span>
              <Highlight color="rgba(224,169,59,0.45)" iterations={1} seed={3} progress={interpolate(t, [5.6, 6.0], [0, 1], {...CL, easing: INOUT})}>
                <span>{LINE1.slice(0, n1)}</span>
              </Highlight>
              <span>{LINE2.slice(0, n2)}</span>
            </div>
          )}
        </CallWindow>
      </Camera>
      <Mark />
      <Label n="3/3" title="Take the floor back" />
      <Sfx at={STOP} name="click" volume={0.3} />
      <Sfx at={4.76} name="pop" volume={0.32} />
      <Sfx at={7.6} name="blip" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: take the floor back.', start: 0.62, end: 3.05, key: 'floor', se: 2.67},
          {text: 'When they finally stop, say "Going back to my point,"', start: 3.14, end: 6.2, key: 'going', se: 5.81},
          {text: 'and finish like nothing happened.', start: 6.27, end: 8.6, key: 'finish', se: 7.69},
        ]}
      />
    </Paper>
  );
};

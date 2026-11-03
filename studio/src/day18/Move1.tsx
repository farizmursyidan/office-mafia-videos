import React from 'react';
import {interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person, Plant} from '../characters';
import {Av, Bub, CL, Camera, Caps, FadeOut, Fg, Floor, INOUT, Label, Mark, PRIYA, Paper, Pill, YOU, card, ez, useT} from './kit';

/* 3. Move 1: you book the first slot, then give your new boss what you own and one win. */
export const Move1: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const invite = ez(t, 2.74, 0.5);
  const nod = t > 8.9 ? Math.sin((t - 8.9) * 7) * Math.max(0, 1 - (t - 8.9) / 1.2) * 5 : 0;
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 900, z: 1.04},
          {t: 2.6, x: 540, y: 900, z: 1.0},
          {t: 6.6, x: 300, y: 800, z: 1.0},
          {t: 7.4, x: 300, y: 800, z: 1.04},
          {t: 10.9, x: 300, y: 800, z: 1.06},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Plant x={70} y={1080} />
          <Plant x={1010} y={1080} />
          <Fg k={1.2}>
            <Person x={300} y={1180} facing={1} bob={breathe(0)} armL={t > 6.7 ? interpolate(t, [6.7, 7.1], [10, 70], {...CL, easing: INOUT}) : 10} {...YOU} />
            <Person x={780} y={1180} facing={-1} bob={breathe(1) + nod} {...PRIYA} />
          </Fg>
        </svg>
        <FadeOut from={6.3} d={0.35}>
          <div style={{...card, top: 430, height: 130, padding: '0 30px', display: 'flex', alignItems: 'center', gap: 22, opacity: invite, translate: `0px ${(1 - invite) * 40}px`}}>
            <Av i="PR" bg="#B5523F" size={76} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.ink}}>Intro with Priya</div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink, background: C.amber, padding: '8px 20px', borderRadius: 999, whiteSpace: 'nowrap'}}>Week 1, 15 min</div>
          </div>
          <Pill p={ez(t, 4.84, 0.4)} bg={C.ink} size={30} style={{left: 90, top: 600}}>
            WHAT YOU OWN
          </Pill>
          <Pill p={ez(t, 5.65, 0.4)} bg={C.ink} size={30} style={{left: 90, top: 680}}>
            ONE WIN
          </Pill>
        </FadeOut>
        <Bub at={6.88} left={70} top={450} tail="none" size={40}>
          I run client renewals.
        </Bub>
        <Bub at={8.38} left={70} top={590} tail="left" size={40}>
          {'We kept all '}
          <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={7} padding={{left: 2, right: 2, top: 0, bottom: 0}} progress={interpolate(t, [8.8, 9.2], [0, 1], {...CL, easing: INOUT})}>
            <span>12 accounts.</span>
          </Highlight>
        </Bub>
        <Pill p={ez(t, 9.6, 0.45)} bg={C.green} size={30} style={{left: 640, top: 480}}>
          HEARD YOU FIRST
        </Pill>
      </Camera>
      <Mark />
      <Label n="1/3" title="Get there first" />
      <Sfx at={2.74} name="blip" volume={0.3} />
      <Sfx at={4.84} name="click" volume={0.28} />
      <Sfx at={5.65} name="click" volume={0.28} />
      <Sfx at={6.88} name="pop" volume={0.32} />
      <Sfx at={8.38} name="pop" volume={0.32} />
      <Sfx at={9.6} name="blip" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: get there first.', start: 0.46, end: 2.6, key: 'first', se: 2.24},
          {text: 'In week one, book fifteen minutes.', start: 2.74, end: 4.75, key: 'fifteen', se: 4.52},
          {text: 'Say what you own and one win.', start: 4.84, end: 6.75, key: 'own', se: 6.5},
          {text: '"I run client renewals.', start: 6.88, end: 8.3, key: 'renewals', se: 8.12},
          {text: 'We kept all twelve accounts."', start: 8.38, end: 10.9, key: 'twelve', se: 9.62},
        ]}
      />
    </Paper>
  );
};

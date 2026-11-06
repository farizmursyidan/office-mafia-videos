import React from 'react';
import {interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person, Plant} from '../characters';
import {Av, Bub, CL, Camera, Caps, DANA, Fg, Floor, INOUT, Label, Mark, Paper, Pill, YOU, card, ez, useT} from './kit';

/* 3. Move 1: the sponsor line is blank, you ask who wanted this, and your boss has no name. */
export const Move1: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const brief = ez(t, 0.5, 0.5) * (1 - ez(t, 3.85, 0.3));
  const shrug = t > 5.77 ? Math.sin((t - 5.77) * 6) * Math.max(0, 1 - (t - 5.77) / 1.2) * 5 : 0;
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 800, z: 1.04},
          {t: 3.6, x: 540, y: 800, z: 1.0},
          {t: 5.6, x: 540, y: 700, z: 1.0},
          {t: 9.3, x: 540, y: 700, z: 1.03},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Plant x={70} y={1080} />
          <Plant x={1010} y={1080} />
          <Fg k={1.05}>
            <Person x={300} y={1180} facing={1} bob={breathe(0)} armL={t > 3.95 ? interpolate(t, [3.95, 4.35], [10, 70], {...CL, easing: INOUT}) : 10} {...YOU} />
            <Person x={780} y={1180} facing={-1} bob={breathe(1) + shrug} {...DANA} />
          </Fg>
        </svg>
        <div style={{...card, top: 430, height: 230, padding: '24px 32px', opacity: brief, translate: `0px ${(1 - ez(t, 0.5, 0.5)) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>PROJECT SPONSOR</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 20}}>
            <Av i="?" bg="transparent" dashed size={100} />
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 48, color: C.muted, whiteSpace: 'nowrap'}}>Name not listed</div>
          </div>
        </div>
        <Pill p={ez(t, 2.45, 0.3) * (1 - ez(t, 3.85, 0.3))} bg={C.ink} size={28} style={{right: 104, top: 452}}>
          ONE QUESTION
        </Pill>
        <Bub at={4.14} left={70} top={440} width={850} tail="left" size={58}>
          Which{' '}
          <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={6} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={interpolate(t, [4.6, 5.1], [0, 1], {...CL, easing: INOUT})}>
            <span>VP</span>
          </Highlight>{' '}
          asked for this?
        </Bub>
        <Bub at={5.77} left={570} top={610} width={420} tail="right" size={46}>
          Uh... not sure?
        </Bub>
        <Pill p={ez(t, 7.31, 0.3)} bg={C.red} size={32} style={{left: 90, top: 626}}>
          NOBODY IS WAITING
        </Pill>
      </Camera>
      <Mark />
      <Label n="1/3" title="Find the sponsor" />
      <Sfx at={2.45} name="blip" volume={0.3} />
      <Sfx at={4.14} name="pop" volume={0.34} />
      <Sfx at={5.77} name="pop" volume={0.3} />
      <Sfx at={7.31} name="hit" volume={0.36} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: find the sponsor.', start: 0.41, end: 2.35, key: 'sponsor', se: 2.0},
          {text: 'Ask one question.', start: 2.45, end: 4.0, key: 'one', se: 3.53},
          {text: '"Which VP asked for this?"', start: 4.14, end: 5.65, key: 'VP', se: 5.26},
          {text: 'If nobody can name one, nobody is waiting for it.', start: 5.77, end: 9.0, key: 'waiting', se: 8.43},
        ]}
      />
    </Paper>
  );
};

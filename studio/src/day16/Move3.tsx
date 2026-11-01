import React from 'react';
import {interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Plant, Person} from '../characters';
import {Av, Bub, CL, Camera, Caps, Fg, FadeOut, Floor, INOUT, Label, Mark, Paper, TOM, YOU, ez, useT} from './kit';

/* 5. Move 3: answer gossip with a compliment. Tom digs at Mei; you defend her. What travels is a good story about you. */
export const Move3: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const story = ez(t, 5.9, 0.55);
  const hl = interpolate(t, [6.6, 7.3], [0, 1], {...CL, easing: INOUT});
  const nod = t > 5.2 ? Math.sin((t - 5.2) * 7) * 3 * Math.max(0, 1 - (t - 5.2) / 1.2) : 0;
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 900, z: 1.05},
          {t: 3.0, x: 540, y: 900, z: 1.0},
          {t: 5.6, x: 540, y: 600, z: 1.0},
          {t: 8.6, x: 540, y: 520, z: 1.06},
        ]}
      >
        <svg width={1080} height={1920} style={{position: 'absolute'}}>
          <Floor />
          <Plant x={1000} y={1080} />
          <Fg k={1.2}>
            <Person x={300} y={1180} facing={1} bob={breathe(0)} armL={t > 3.2 && t < 5.6 ? 65 : 10} {...YOU} />
            <Person x={720} y={1180} facing={-1} bob={breathe(1) + nod} lean={nod * 0.6} armL={t > 0.9 && t < 3.0 ? 70 : 10} {...TOM} />
          </Fg>
        </svg>
        <FadeOut from={5.6}>
          <Bub at={0.9} left={430} top={450} width={570} tail="right" size={38}>
            {"Did you see Mei's numbers? Yikes."}
          </Bub>
        </FadeOut>
        <Bub at={3.2} left={90} top={610} width={600} tail="left" size={38}>
          Really? She saved me on the budget deck last month.
        </Bub>
        {/* what gets repeated */}
        <div style={{position: 'absolute', left: 70, right: 70, top: 440, height: 130, background: C.ink, borderRadius: 28, padding: '0 30px', display: 'flex', alignItems: 'center', gap: 20, boxSizing: 'border-box', opacity: story, translate: `0px ${(1 - story) * -30}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 22, letterSpacing: 3, color: C.muted, width: 150, lineHeight: 1.2}}>WHAT TRAVELS</div>
          <Av i="YOU" bg={C.amber} fg={C.ink} size={70} />
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.white, whiteSpace: 'nowrap'}}>
            {'"'}
            <Highlight color="rgba(224,169,59,0.75)" iterations={1} seed={12} progress={hl}>
              <span>has your back</span>
            </Highlight>
            {'"'}
          </div>
        </div>
      </Camera>
      <Mark />
      <Label n="3/3" title="Compliment back" />
      <Sfx at={0.9} name="pop" volume={0.32} />
      <Sfx at={3.2} name="pop" volume={0.32} />
      <Sfx at={5.9} name="whoosh" volume={0.22} />
      <Sfx at={6.6} name="ping" volume={0.28} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: answer gossip with a compliment.', start: 0.4, end: 3.05, key: 'compliment.', se: 2.74},
          {text: '"Really? She saved me on the budget deck last month."', start: 3.1, end: 5.7, key: 'saved', se: 5.4},
          {text: 'Now the story that travels makes you look good.', start: 5.8, end: 8.6, key: 'good.', se: 7.82},
        ]}
      />
    </Paper>
  );
};

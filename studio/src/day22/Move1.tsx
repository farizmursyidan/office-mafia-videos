import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight, StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Bub, CL, Caps, INOUT, Label, Mark, OUT, Paper, Push, card, ez, useT} from './kit';

/* 3. Move 1: the vague answer gets crossed out, the specific one lands, and the chart shows the 30 percent drop. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
export const Move1: React.FC = () => {
  const {t} = useT();
  const chart = ez(t, 1.5, 0.55);
  const after = interpolate(t, [2.4, 3.2], [100, 70], {...CL, easing: INOUT});
  const tag = interpolate(t, [2.75, 3.05], [0, 1], {...CL, easing: POP});
  const vague = interpolate(t, [4.9, 5.5], [0, 1], {...CL, easing: INOUT});
  const glow = ez(t, 7.6, 0.5);
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Bring one win" />
        <div style={{opacity: 1 - 0.45 * vague}}>
          <Bub at={3.74} left={70} top={440} width={900} tail="left" size={48}>
            <StrikeThrough color={C.red} strokeWidth={6} seed={5} progress={vague}>
              <span>"Things are going well."</span>
            </StrikeThrough>
          </Bub>
        </div>
        <Bub at={5.89} left={70} top={610} width={900} tail="left" size={46}>
          "We cut invoice errors by{' '}
          <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={9} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={interpolate(t, [7.6, 8.1], [0, 1], {...CL, easing: INOUT})}>
            <span>30%</span>
          </Highlight>
          ."
        </Bub>
        <div style={{...card, top: 790, height: 360, padding: '24px 34px', opacity: chart, translate: `0px ${(1 - chart) * 50}px`, boxShadow: `0 30px 70px rgba(60,45,20,${0.18 + 0.2 * glow})`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>YOUR ONE WIN · INVOICE ERRORS</div>
          <div style={{position: 'absolute', left: 60, right: 60, bottom: 30, height: 230, display: 'flex', alignItems: 'flex-end', gap: 60}}>
            {[
              {k: 'Before', h: 100, c: '#CFC8BC'},
              {k: 'After', h: after, c: C.green},
            ].map((b) => (
              <div key={b.k} style={{display: 'flex', alignItems: 'flex-end', gap: 18}}>
                <div style={{width: 120, height: b.h * 1.7, background: b.c, borderRadius: '12px 12px 0 0'}} />
                <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink, whiteSpace: 'nowrap', paddingBottom: 4}}>{b.k}</div>
              </div>
            ))}
            {tag > 0 && (
              <div style={{position: 'absolute', right: 0, top: 10, opacity: interpolate(tag, [0, 0.4], [0, 1], CL), scale: String(interpolate(t, [2.75, 3.05], [1.4, 1], {...CL, easing: OUT}))}}>
                <div style={{background: C.green, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 48, padding: '6px 22px', borderRadius: 16}}>-30%</div>
              </div>
            )}
          </div>
        </div>
      </Push>
      <Sfx at={1.5} name="blip" volume={0.28} />
      <Sfx at={2.75} name="pop" volume={0.32} />
      <Sfx at={3.74} name="pop" volume={0.3} />
      <Sfx at={4.9} name="snip" volume={0.3} />
      <Sfx at={5.89} name="pop" volume={0.32} />
      <Sfx at={7.6} name="hit" volume={0.36} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: bring one win with a number.', start: 0.62, end: 3.6, key: 'win number', se: 3.32},
          {text: 'Not "things are going well."', start: 3.74, end: 5.75, key: 'not', se: 5.4},
          {text: 'Say, "We cut invoice errors by thirty percent."', start: 5.89, end: 8.95, key: 'thirty percent', se: 8.44},
        ]}
      />
    </Paper>
  );
};

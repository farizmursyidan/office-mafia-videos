import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, INOUT, Mark, OUT, Paper, Pill, card, ez, float, useT} from './kit';

/* 1. Hook: the months tick up, your boss's note says you're fine, and the senior slot goes to the one who asked. */
export const Hook: React.FC = () => {
  const {t} = useT();
  const months = Math.floor(interpolate(t, [0, 1.7], [9, 26], {...CL, easing: INOUT}));
  const note = 1;
  const line = ez(t, 2.21, 0.4);
  const slot = 1;
  const raj = ez(t, 6.25, 0.4);
  const stamp = interpolate(t, [6.3, 6.6], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 300, z: 1.05},
          {t: 1.8, x: 540, y: 300, z: 1.0},
          {t: 2.2, x: 540, y: 600, z: 1.02},
          {t: 4.3, x: 540, y: 600, z: 1.0},
          {t: 4.8, x: 540, y: 1000, z: 1.03},
          {t: 7.7, x: 540, y: 1000, z: 1.05},
        ]}
      >
        <div style={{...card, top: 190, height: 240, padding: '26px 34px', translate: `0px ${float(t)}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>WAITING FOR A PROMOTION</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 24}}>
            <Av i="YOU" bg={C.amber} fg={C.ink} size={110} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, color: months >= 26 ? C.red : C.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', lineHeight: 1}}>{months}</div>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 46, color: C.ink, whiteSpace: 'nowrap'}}>months and counting</div>
          </div>
        </div>
        <div style={{...card, top: 460, height: 270, padding: '26px 34px', opacity: note, translate: `0px ${(1 - note) * 50}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>{"YOUR BOSS'S NOTES"}</div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 40, color: C.muted, marginTop: 20}}>On you:</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 60, color: C.ink, marginTop: 8, whiteSpace: 'nowrap', opacity: line, translate: `${(1 - line) * -18}px 0px`}}>
            <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={7} padding={{left: 8, right: 8, top: 0, bottom: 0}} progress={interpolate(t, [3.2, 3.8], [0, 1], {...CL, easing: INOUT})}>
              <span>Happy where they are</span>
            </Highlight>
          </div>
        </div>
        <div style={{...card, top: 760, height: 370, padding: '26px 34px', opacity: slot, translate: `0px ${(1 - slot) * 50}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>NEW SENIOR ANALYST</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 28, marginTop: 34}}>
            <div style={{position: 'relative', width: 150, height: 150, flexShrink: 0}}>
              <div style={{position: 'absolute', opacity: 1 - raj}}>
                <Av i="?" bg="transparent" dashed size={150} />
              </div>
              <div style={{position: 'absolute', opacity: raj, scale: String(0.8 + 0.2 * raj)}}>
                <Av i="RA" bg="#5B8C5A" size={150} />
              </div>
            </div>
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 60, color: C.ink, whiteSpace: 'nowrap'}}>{t >= 6.25 ? 'Raj' : 'Your spot?'}</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.muted, marginTop: 4, whiteSpace: 'nowrap'}}>{t >= 6.25 ? 'He asked for it in March' : 'Open role'}</div>
            </div>
          </div>
          {stamp > 0 && (
            <div style={{position: 'absolute', right: 30, bottom: 26, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [6.3, 6.6], [1.6, 1], {...CL, easing: OUT}))}}>
              <div style={{border: `5px solid ${C.red}`, color: C.red, fontFamily: SANS, fontWeight: 900, fontSize: 32, letterSpacing: 2, padding: '2px 14px', borderRadius: 12, whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.95)'}}>NOT YOU</div>
            </div>
          )}
        </div>
        <Pill p={ez(t, 3.5, 0.3)} bg={C.green} size={30} style={{right: 104, top: 486}}>
          NO ACTION NEEDED
        </Pill>
      </Camera>
      <Sfx at={0.3} name="blip" volume={0.3} />
      <Sfx at={2.21} name="click" volume={0.3} />
      <Sfx at={4.71} name="pop" volume={0.3} />
      <Sfx at={6.3} name="hit" volume={0.45} />
      <Caps
        top={1290}
        caps={[
          {text: "You've been waiting to get promoted.", start: 0.3, end: 2.1, key: 'waiting', se: 1.62},
          {text: "Your boss thinks you're happy where you are.", start: 2.21, end: 4.6, key: 'happy', se: 4.29},
          {text: 'And the coworker who asked got your spot.', start: 4.71, end: 7.3, key: 'asked', se: 6.91},
        ]}
      />
    </Paper>
  );
};

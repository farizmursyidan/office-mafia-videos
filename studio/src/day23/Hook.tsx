import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, INOUT, Mark, OUT, Paper, card, ez, float, useT} from './kit';

/* 1. Hook: the pay sheet shows the new hire above you, the onboarding card says you trained them, and your next raise is not even scheduled. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const Bar: React.FC<{i: string; bg: string; fg?: string; n: string; pay: number; w: number; at: number; color: string}> = ({i, bg, fg, n, pay, w, at, color}) => {
  const {t} = useT();
  const p = interpolate(t, [at, at + 1.6], [0.4, 1], {...CL, easing: OUT});
  return (
    <div style={{height: 108, display: 'flex', alignItems: 'center', gap: 20, borderTop: '2px solid #EEEAE4'}}>
      <Av i={i} bg={bg} fg={fg} size={70} />
      <div style={{width: 150, fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink, whiteSpace: 'nowrap'}}>{n}</div>
      <div style={{flex: 1, height: 44, position: 'relative'}}>
        <div style={{position: 'absolute', left: 0, top: 0, height: 44, width: `${w * p}%`, background: color, borderRadius: 12}} />
      </div>
      <div style={{width: 130, textAlign: 'right', fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink, whiteSpace: 'nowrap'}}>${Math.round(pay * p)}k</div>
    </div>
  );
};
export const Hook: React.FC = () => {
  const {t} = useT();
  const tag = interpolate(t, [1.9, 2.2], [0, 1], {...CL, easing: POP});
  const onb = ez(t, 3.0, 0.45);
  const stamp = interpolate(t, [3.4, 3.7], [0, 1], {...CL, easing: POP});
  const next = ez(t, 4.6, 0.45);
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 340, z: 1.06},
          {t: 2.8, x: 540, y: 340, z: 1.0},
          {t: 3.3, x: 540, y: 700, z: 1.02},
          {t: 4.5, x: 540, y: 700, z: 1.0},
          {t: 4.9, x: 540, y: 1040, z: 1.03},
          {t: 6.9, x: 540, y: 1040, z: 1.05},
        ]}
      >
        <div style={{...card, top: 190, height: 340, padding: '24px 34px 0', translate: `0px ${float(t)}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>PAY · SAME ROLE</div>
            {tag > 0 && (
              <div style={{opacity: interpolate(tag, [0, 0.4], [0, 1], CL), scale: String(interpolate(t, [1.9, 2.2], [1.4, 1], {...CL, easing: OUT}))}}>
                <div style={{background: C.red, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 34, padding: '4px 18px', borderRadius: 12}}>+$9k</div>
              </div>
            )}
          </div>
          <Bar i="SA" bg="#5B8C5A" n="Sam" pay={79} w={100} at={0.0} color={C.red} />
          <Bar i="YOU" bg={C.amber} fg={C.ink} n="You" pay={70} w={88} at={0.15} color="#CFC8BC" />
        </div>
        <div style={{...card, top: 570, height: 260, padding: '24px 34px', opacity: onb, translate: `0px ${(1 - onb) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>SAM · ONBOARDING</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 26, position: 'relative'}}>
            <Av i="YOU" bg={C.amber} fg={C.ink} size={90} />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 30, color: C.muted, whiteSpace: 'nowrap'}}>Trained by</div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 54, color: C.ink, whiteSpace: 'nowrap'}}>
                <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={4} padding={{left: 8, right: 8, top: 0, bottom: 0}} progress={interpolate(t, [3.3, 3.8], [0, 1], {...CL, easing: INOUT})}>
                  <span>You</span>
                </Highlight>
              </div>
            </div>
            {stamp > 0 && (
              <div style={{marginLeft: 'auto', opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-4deg', scale: String(interpolate(t, [3.4, 3.7], [1.5, 1], {...CL, easing: OUT}))}}>
                <div style={{border: `5px solid ${C.green}`, color: C.green, fontFamily: SANS, fontWeight: 900, fontSize: 32, letterSpacing: 2, padding: '4px 16px', borderRadius: 12, whiteSpace: 'nowrap'}}>8 WEEKS</div>
              </div>
            )}
          </div>
        </div>
        <div style={{...card, top: 870, height: 250, padding: '24px 34px', opacity: next, translate: `0px ${(1 - next) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>YOUR NEXT RAISE</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 28}}>
            <svg width={80} height={80} viewBox="0 0 80 80">
              <rect x={8} y={14} width={64} height={58} rx={10} fill="none" stroke={C.muted} strokeWidth={6} />
              <path d="M8 32 H72 M24 6 V20 M56 6 V20" stroke={C.muted} strokeWidth={6} strokeLinecap="round" />
              <path d="M30 44 L50 62 M50 44 L30 62" stroke={C.red} strokeWidth={6} strokeLinecap="round" />
            </svg>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 56, color: C.ink, whiteSpace: 'nowrap'}}>Not scheduled</div>
          </div>
        </div>
      </Camera>
      <Sfx at={0.1} name="blip" volume={0.3} />
      <Sfx at={1.9} name="hit" volume={0.38} />
      <Sfx at={3.09} name="pop" volume={0.3} />
      <Sfx at={3.4} name="click" volume={0.3} />
      <Sfx at={4.68} name="pop" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'The new hire on your team makes more than you.', start: 0.28, end: 2.95, key: 'more', se: 2.78},
          {text: 'You trained them.', start: 3.09, end: 4.55, key: 'trained', se: 4.04},
          {text: 'And nobody is going to fix it for you.', start: 4.68, end: 6.5, key: 'nobody', se: 6.12},
        ]}
      />
    </Paper>
  );
};

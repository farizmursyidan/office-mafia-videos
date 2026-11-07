import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight, StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, INOUT, Mark, OUT, Paper, card, ez, float, useT} from './kit';

/* 1. Hook: a 15 minute invite from your boss's boss lands, your boss is left off it, then your boss pings you about it. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const Row: React.FC<{i: string; bg: string; fg?: string; n: string; role: string; at: number; out?: number}> = ({i, bg, fg, n, role, at, out}) => {
  const {t} = useT();
  const p = ez(t, at, 0.4);
  const strike = out === undefined ? 0 : interpolate(t, [out, out + 0.5], [0, 1], {...CL, easing: INOUT});
  const stamp = out === undefined ? 0 : interpolate(t, [out + 0.35, out + 0.65], [0, 1], {...CL, easing: POP});
  return (
    <div style={{height: 104, display: 'flex', alignItems: 'center', gap: 22, borderTop: '2px solid #EEEAE4', position: 'relative', opacity: p, translate: `${(1 - p) * -30}px 0px`}}>
      <div style={{opacity: 1 - 0.5 * strike}}>
        <Av i={i} bg={bg} fg={fg} size={72} />
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, color: C.ink, whiteSpace: 'nowrap', lineHeight: 1.05}}>
          {out === undefined ? (
            n
          ) : (
            <StrikeThrough color={C.red} strokeWidth={6} seed={3} progress={strike}>
              <span>{n}</span>
            </StrikeThrough>
          )}
        </div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 26, color: C.muted, whiteSpace: 'nowrap'}}>{role}</div>
      </div>
      {stamp > 0 && (
        <div style={{position: 'absolute', right: 4, top: 26, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [out! + 0.35, out! + 0.65], [1.5, 1], {...CL, easing: OUT}))}}>
          <div style={{border: `5px solid ${C.red}`, color: C.red, fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 2, padding: '2px 14px', borderRadius: 12, whiteSpace: 'nowrap'}}>NOT INVITED</div>
        </div>
      )}
    </div>
  );
};
export const Hook: React.FC = () => {
  const {t} = useT();
  const ping = ez(t, 5.2, 0.45);
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 330, z: 1.06},
          {t: 2.9, x: 540, y: 330, z: 1.0},
          {t: 3.4, x: 540, y: 720, z: 1.02},
          {t: 5.0, x: 540, y: 720, z: 1.0},
          {t: 5.4, x: 540, y: 1050, z: 1.03},
          {t: 7.6, x: 540, y: 1050, z: 1.05},
        ]}
      >
        <div style={{...card, top: 190, height: 290, padding: '26px 34px', translate: `0px ${float(t)}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>NEW INVITE</div>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.ink, background: 'rgba(224,169,59,0.3)', padding: '4px 16px', borderRadius: 10}}>Thu 9:00 AM</div>
          </div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 62, lineHeight: 1.1, color: C.ink, marginTop: 22, whiteSpace: 'nowrap'}}>Quick chat</div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, color: C.ink, marginTop: 10, whiteSpace: 'nowrap'}}>
            <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={7} padding={{left: 8, right: 8, top: 0, bottom: 0}} progress={interpolate(t, [1.6, 2.2], [0, 1], {...CL, easing: INOUT})}>
              <span>15 min</span>
            </Highlight>{' '}
            · from Karen, VP
          </div>
        </div>
        <div style={{...card, top: 510, height: 400, padding: '24px 34px 0'}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3, height: 66}}>GUESTS</div>
          <Row i="KA" bg="#2F3A4F" n="Karen" role="Your boss's boss" at={0.0} />
          <Row i="YOU" bg={C.amber} fg={C.ink} n="You" role="Invited" at={0.15} />
          <Row i="DA" bg="#3F6FB5" n="Dana" role="Your boss" at={0.3} out={3.44} />
        </div>
        <div style={{...card, top: 940, height: 190, padding: '24px 34px', opacity: ping, translate: `0px ${(1 - ping) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted, letterSpacing: 3}}>DANA · LATER THAT DAY</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 16}}>
            <Av i="DA" bg="#3F6FB5" size={84} />
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 46, color: C.ink, whiteSpace: 'nowrap'}}>So... what did Karen ask?</div>
          </div>
        </div>
      </Camera>
      <Sfx at={0.15} name="ping" volume={0.3} />
      <Sfx at={3.44} name="click" volume={0.3} />
      <Sfx at={3.85} name="hit" volume={0.4} />
      <Sfx at={5.2} name="pop" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: "Your boss's boss just booked fifteen minutes with you.", start: 0.25, end: 3.3, key: 'fifteen minutes', se: 2.96},
          {text: "Your boss wasn't invited.", start: 3.44, end: 5.1, key: "wasn't", se: 5.04},
          {text: 'And every word will get back to them.', start: 5.2, end: 7.35, key: 'back', se: 6.96},
        ]}
      />
    </Paper>
  );
};

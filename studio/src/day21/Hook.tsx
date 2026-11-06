import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, INOUT, Mark, OUT, Paper, card, ez, float, useT} from './kit';

/* 1. Hook: the boss's note sounds like an honor, then three names decline and the empty slot lands on you. */
const WHO = [
  {i: 'RA', bg: '#5B8C5A', n: 'Raj', at: 2.81},
  {i: 'ME', bg: '#9A5BB0', n: 'Mei', at: 3.12},
  {i: 'TO', bg: '#4F7F8C', n: 'Tom', at: 3.43},
];
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const Row: React.FC<{i: string; bg: string; n: string; at: number}> = ({i, bg, n, at}) => {
  const {t} = useT();
  const st = interpolate(t, [at, at + 0.28], [0, 1], {...CL, easing: POP});
  return (
    <div style={{height: 100, display: 'flex', alignItems: 'center', gap: 22, borderTop: '2px solid #EEEAE4', position: 'relative'}}>
      <div style={{opacity: 1 - 0.45 * Math.min(1, st)}}>
        <Av i={i} bg={bg} size={72} />
      </div>
      <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 46, color: C.ink, whiteSpace: 'nowrap'}}>{n}</div>
      {st > 0 && (
        <div style={{position: 'absolute', right: 6, top: 24, opacity: interpolate(st, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [at, at + 0.28], [1.5, 1], {...CL, easing: OUT}))}}>
          <div style={{border: `5px solid ${C.red}`, color: C.red, fontFamily: SANS, fontWeight: 900, fontSize: 32, letterSpacing: 2, padding: '2px 14px', borderRadius: 12, whiteSpace: 'nowrap'}}>DECLINED</div>
        </div>
      )}
    </div>
  );
};
export const Hook: React.FC = () => {
  const {t} = useT();
  const you = ez(t, 4.19, 0.4);
  const stamp = interpolate(t, [4.8, 5.08], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 300, z: 1.06},
          {t: 2.4, x: 540, y: 300, z: 1.0},
          {t: 2.8, x: 540, y: 640, z: 1.02},
          {t: 4.1, x: 540, y: 640, z: 1.0},
          {t: 4.5, x: 540, y: 1040, z: 1.03},
          {t: 6.2, x: 540, y: 1040, z: 1.05},
        ]}
      >
        <div style={{...card, top: 190, height: 280, padding: '26px 34px', translate: `0px ${float(t)}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>MESSAGE FROM YOUR BOSS</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 28}}>
            <Av i="DA" bg="#3F6FB5" size={124} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 62, lineHeight: 1.12, color: C.ink}}>
              I have a{' '}
              <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={7} padding={{left: 8, right: 8, top: 0, bottom: 0}} progress={interpolate(t, [0.25, 0.85], [0, 1], {...CL, easing: INOUT})}>
                <span>special project</span>
              </Highlight>{' '}
              for you!
            </div>
          </div>
        </div>
        <div style={{...card, top: 500, height: 410, padding: '24px 34px 0'}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3, height: 66}}>ALREADY ASKED</div>
          {WHO.map((w) => (
            <Row key={w.n} {...w} />
          ))}
        </div>
        <div style={{...card, top: 940, height: 190, padding: '22px 34px'}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>PROJECT OWNER</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 14}}>
            <div style={{position: 'relative', width: 92, height: 92, flexShrink: 0}}>
              <div style={{position: 'absolute', opacity: 1 - you}}>
                <Av i="?" bg="transparent" dashed size={92} />
              </div>
              <div style={{position: 'absolute', opacity: you, scale: String(0.8 + 0.2 * you)}}>
                <Av i="YOU" bg={C.amber} fg={C.ink} size={92} />
              </div>
            </div>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 56, color: C.ink, whiteSpace: 'nowrap'}}>{t >= 4.19 ? 'You' : 'Anyone?'}</div>
          </div>
          {stamp > 0 && (
            <div style={{position: 'absolute', right: 34, bottom: 34, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [4.8, 5.08], [1.6, 1], {...CL, easing: OUT}))}}>
              <div style={{border: `5px solid ${C.red}`, color: C.red, fontFamily: SANS, fontWeight: 900, fontSize: 32, letterSpacing: 2, padding: '2px 14px', borderRadius: 12, whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.95)'}}>LAST ONE LEFT</div>
            </div>
          )}
        </div>
      </Camera>
      <Sfx at={0.2} name="blip" volume={0.3} />
      <Sfx at={2.81} name="hit" volume={0.3} />
      <Sfx at={3.12} name="hit" volume={0.3} />
      <Sfx at={3.43} name="hit" volume={0.3} />
      <Sfx at={4.19} name="pop" volume={0.3} />
      <Sfx at={4.8} name="hit" volume={0.45} />
      <Caps
        top={1290}
        caps={[
          {text: 'Your boss just gave you a special project.', start: 0.2, end: 2.7, key: 'special', se: 2.43},
          {text: 'Nobody else wanted it.', start: 2.81, end: 4.1, key: 'nobody', se: 3.73},
          {text: "And that's exactly why it's yours.", start: 4.19, end: 5.95, key: 'yours', se: 5.72},
        ]}
      />
    </Paper>
  );
};

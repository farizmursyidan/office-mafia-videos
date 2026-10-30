import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, Bub, CL, Camera, Caps, INOUT, Mark, OUT, Paper, Pill, card, ez, useT} from './kit';

/* 1. Hook: a talent review is discussing YOU. Your seat is empty. Nobody speaks up. */
const PEOPLE = [
  {i: 'PR', bg: '#3F6FB5', name: 'Priya'},
  {i: 'DA', bg: '#8E6845', name: 'Dana'},
  {i: 'RA', bg: '#5B8C5A', name: 'Raj'},
  {i: 'TO', bg: '#9A5BB0', name: 'Tom'},
];

const Dots: React.FC<{at: number; left: number; top: number; who: string; bg: string}> = ({at, left, top, who, bg}) => {
  const {t} = useT();
  const p = ez(t, at, 0.45);
  return (
    <div style={{position: 'absolute', left, top, display: 'flex', alignItems: 'center', gap: 16, opacity: p, translate: `0px ${(1 - p) * 20}px`}}>
      <Av i={who} bg={bg} size={64} />
      <div style={{background: '#F1ECE4', borderRadius: 24, padding: '14px 26px', display: 'flex', gap: 10}}>
        {[0, 1, 2].map((k) => (
          <div key={k} style={{width: 14, height: 14, borderRadius: '50%', background: C.muted, opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 4 + k))}} />
        ))}
      </div>
    </div>
  );
};

export const Hook: React.FC = () => {
  const {t} = useT();
  const notInv = ez(t, 2.35, 0.45);
  const stamp = interpolate(t, [4.75, 5.05], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  const shake = t > 4.8 && t < 5.15 ? Math.sin((t - 4.8) * 90) * 6 * (1 - (t - 4.8) / 0.35) : 0;
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 760, z: 1.1},
          {t: 1.6, x: 540, y: 760, z: 1.02},
          {t: 2.3, x: 840, y: 560, z: 1.02},
          {t: 3.2, x: 840, y: 560, z: 1.1},
          {t: 4.0, x: 540, y: 980, z: 1.04},
          {t: 6.4, x: 540, y: 980, z: 1.1},
        ]}
      >
        <AbsoluteFill style={{translate: `${shake}px 0px`}}>
          <div style={{...card, top: 420, height: 760}} />
          <div style={{position: 'absolute', left: 110, top: 456, fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 3, color: C.muted}}>TALENT REVIEW</div>
          <div style={{position: 'absolute', right: 110, top: 452, background: C.red, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 2, padding: '8px 20px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 10}}>
            <div style={{width: 12, height: 12, borderRadius: '50%', background: C.white, opacity: 0.5 + 0.5 * Math.sin(t * 6)}} />
            ROOM 4B, LIVE
          </div>
          {/* attendees */}
          <div style={{position: 'absolute', left: 110, top: 520, display: 'flex', gap: 22, alignItems: 'flex-start'}}>
            {PEOPLE.map((p) => (
              <div key={p.i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
                <Av i={p.i} bg={p.bg} size={92} />
                <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 22, color: C.muted}}>{p.name}</div>
              </div>
            ))}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginLeft: 24}}>
              <Av i="YOU" bg="none" size={92} dashed />
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 22, color: C.muted}}>empty seat</div>
            </div>
          </div>
          <Pill p={notInv} bg={C.ink} size={22} style={{left: 690, top: 668}}>
            NOT INVITED
          </Pill>
          {/* now discussing */}
          <div style={{position: 'absolute', left: 110, right: 110, top: 726, height: 120, borderRadius: 24, background: '#F7F3EC', display: 'flex', alignItems: 'center', padding: '0 28px', gap: 84}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 2, color: C.muted}}>NOW DISCUSSING</div>
            <Circle color={C.amber} strokeWidth={6} seed={5} padding={{left: 16, right: 16, top: 6, bottom: 6}} progress={interpolate(t, [0.35, 1.1], [0, 1], {...CL, easing: INOUT})}>
              <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                <Av i="Y" bg={C.amber} fg={C.ink} size={64} />
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 44, color: C.ink}}>YOU</div>
              </div>
            </Circle>
          </div>
          <Bub at={3.6} left={110} top={880} size={36} tail="none">
            <span style={{color: '#3F6FB5'}}>Priya: </span>
            {'What do they even do?'}
          </Bub>
          <Dots at={4.1} left={110} top={982} who="DA" bg="#8E6845" />
          <Dots at={4.3} left={420} top={982} who="RA" bg="#5B8C5A" />
          {stamp > 0 && (
            <div style={{position: 'absolute', left: 230, top: 1066, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-6deg', scale: String(interpolate(t, [4.75, 5.05], [1.7, 1], {...CL, easing: OUT, output: 'perceptual-scale'}))}}>
              <div style={{border: `6px solid ${C.red}`, color: C.red, background: 'rgba(255,255,255,0.94)', fontFamily: SANS, fontWeight: 900, fontSize: 44, letterSpacing: 3, padding: '6px 24px', borderRadius: 14, whiteSpace: 'nowrap'}}>NOBODY DEFENDED YOU</div>
            </div>
          )}
        </AbsoluteFill>
      </Camera>
      <Sfx at={0.35} name="blip" volume={0.35} />
      <Sfx at={2.35} name="pop" volume={0.3} />
      <Sfx at={3.6} name="pop" volume={0.35} />
      <Sfx at={4.75} name="hit" volume={0.55} />
      <Caps
        top={1290}
        caps={[
          {text: 'Your name came up in a meeting today.', start: 0.2, end: 2.2, key: 'name', se: 1.81},
          {text: "You weren't there.", start: 2.3, end: 3.7, key: "weren't", se: 3.14},
          {text: 'And nobody defended you.', start: 3.78, end: 6.6, key: 'nobody', se: 5.44},
        ]}
      />
    </Paper>
  );
};

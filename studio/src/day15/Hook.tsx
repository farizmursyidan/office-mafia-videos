import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {Underline} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, INOUT, Mark, OUT, Paper, Pill, card, ez, useT} from './kit';

/* 1. Hook: the VP asks your boss about your project. Your boss has nothing. The project card says owner: YOU. */
const Msg: React.FC<{at: number; who: string; bg: string; name: string; children: React.ReactNode}> = ({at, who, bg, name, children}) => {
  const {t} = useT();
  const p = at <= 0 ? 1 : ez(t, at, 0.45);
  return (
    <div style={{display: 'flex', gap: 18, alignItems: 'flex-start', marginTop: 22, opacity: p, translate: `0px ${(1 - p) * 26}px`}}>
      <Av i={who} bg={bg} size={70} />
      <div>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, color: C.muted, marginBottom: 6}}>{name}</div>
        <div style={{background: '#F1ECE4', color: C.ink, fontFamily: SANS, fontWeight: 700, fontSize: 38, lineHeight: 1.2, padding: '16px 24px', borderRadius: 24, maxWidth: 680}}>{children}</div>
      </div>
    </div>
  );
};

const Dots: React.FC<{from: number; to: number}> = ({from, to}) => {
  const {t} = useT();
  if (t < from || t >= to) return null;
  const p = ez(t, from, 0.3);
  return (
    <div style={{display: 'flex', gap: 18, alignItems: 'center', marginTop: 22, opacity: p}}>
      <Av i="MA" bg="#3F6FB5" size={70} />
      <div style={{background: '#F1ECE4', borderRadius: 24, padding: '18px 26px', display: 'flex', gap: 10}}>
        {[0, 1, 2].map((k) => (
          <div key={k} style={{width: 14, height: 14, borderRadius: '50%', background: C.muted, opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 4 + k))}} />
        ))}
      </div>
    </div>
  );
};

export const Hook: React.FC = () => {
  const {t} = useT();
  const owner = ez(t, 4.5, 0.5);
  const stamp = interpolate(t, [3.2, 3.5], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  const shake = t > 3.25 && t < 3.6 ? Math.sin((t - 3.25) * 90) * 6 * (1 - (t - 3.25) / 0.35) : 0;
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 600, z: 1.12},
          {t: 1.3, x: 540, y: 640, z: 1.03},
          {t: 2.8, x: 540, y: 820, z: 1.03},
          {t: 3.6, x: 540, y: 820, z: 1.09},
          {t: 4.5, x: 540, y: 1060, z: 1.04},
          {t: 6.4, x: 540, y: 1060, z: 1.1},
        ]}
      >
        <AbsoluteFill style={{translate: `${shake}px 0px`}}>
          <div style={{...card, top: 420, height: 560, padding: '24px 36px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 14, borderBottom: '2px solid #EEEAE4'}}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}># leadership</div>
              <div style={{marginLeft: 'auto', background: C.red, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 22, letterSpacing: 2, padding: '6px 16px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 10}}>
                <div style={{width: 10, height: 10, borderRadius: '50%', background: C.white, opacity: 0.5 + 0.5 * Math.sin(t * 6)}} />
                BOARD PREP
              </div>
            </div>
            <Msg at={0} who="EL" bg="#8E6845" name="Elena, VP">
              {'Where are we on '}
              <Underline color={C.amber} strokeWidth={6} seed={3} progress={interpolate(t, [0.3, 1.0], [0, 1], {...CL, easing: INOUT})}>
                <span>Atlas?</span>
              </Underline>
            </Msg>
            <Dots from={0.9} to={2.75} />
            <Msg at={2.75} who="MA" bg="#3F6FB5" name="Mark, your boss">
              Not sure. Let me check.
            </Msg>
          </div>
          {stamp > 0 && (
            <div style={{position: 'absolute', left: 520, top: 870, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-6deg', scale: String(interpolate(t, [3.2, 3.5], [1.7, 1], {...CL, easing: OUT, output: 'perceptual-scale'}))}}>
              <div style={{border: `6px solid ${C.red}`, color: C.red, background: 'rgba(255,255,255,0.94)', fontFamily: SANS, fontWeight: 900, fontSize: 44, letterSpacing: 3, padding: '6px 24px', borderRadius: 14, whiteSpace: 'nowrap'}}>NO ANSWER</div>
            </div>
          )}
          {/* the project card: owner is you */}
          <div style={{...card, top: 1010, height: 150, padding: '0 36px', display: 'flex', alignItems: 'center', gap: 22, opacity: owner, translate: `0px ${(1 - owner) * 50}px`}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.ink}}>Atlas</div>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.muted, letterSpacing: 2}}>OWNER</div>
            <Av i="YOU" bg={C.amber} fg={C.ink} size={84} />
          </div>
          <Pill p={ez(t, 5.0, 0.45)} bg={C.ink} size={24} style={{left: 640, top: 1060}}>
            LAST UPDATE: 3 WEEKS
          </Pill>
        </AbsoluteFill>
      </Camera>
      <Sfx at={0.3} name="ping" volume={0.3} />
      <Sfx at={2.75} name="pop" volume={0.32} />
      <Sfx at={3.2} name="hit" volume={0.55} />
      <Sfx at={4.5} name="pop" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Your boss just got asked about your project.', start: 0.2, end: 2.6, key: 'asked', se: 2.39},
          {text: 'They had nothing to say.', start: 2.7, end: 4.4, key: 'nothing', se: 4.07},
          {text: "And that's on you.", start: 4.45, end: 6.4, key: 'you.', se: 5.31},
        ]}
      />
    </Paper>
  );
};

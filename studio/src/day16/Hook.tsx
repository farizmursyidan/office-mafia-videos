import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, INOUT, Mark, OUT, Paper, card, ez, useT} from './kit';

/* 1. Hook: Priya DMs you gossip about Raj. You lean in. Then your reply gets forwarded to three other people. */
const Line: React.FC<{at: number; me?: boolean; children: React.ReactNode}> = ({at, me, children}) => {
  const {t} = useT();
  const p = at <= 0 ? 1 : ez(t, at, 0.45);
  return (
    <div style={{display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', gap: 16, alignItems: 'flex-end', marginTop: 20, opacity: p, translate: `0px ${(1 - p) * 26}px`}}>
      {!me && <Av i="PR" bg="#B5523F" size={64} />}
      <div style={{background: me ? C.amber : '#F1ECE4', color: C.ink, fontFamily: SANS, fontWeight: 700, fontSize: 38, lineHeight: 1.2, padding: '16px 24px', borderRadius: 24, maxWidth: 640}}>{children}</div>
      {me && <Av i="YOU" bg={C.ink} size={64} />}
    </div>
  );
};

const FWD = [
  {name: 'Mei', i: 'ME', bg: '#9A5BB0', at: 4.0},
  {name: 'Tom', i: 'TO', bg: '#4F7F8C', at: 4.35},
  {name: 'Raj', i: 'RA', bg: '#5B8C5A', at: 4.7},
];

export const Hook: React.FC = () => {
  const {t} = useT();
  const stamp = interpolate(t, [5.0, 5.3], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  const shake = t > 5.05 && t < 5.4 ? Math.sin((t - 5.05) * 90) * 6 * (1 - (t - 5.05) / 0.35) : 0;
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 560, z: 1.13},
          {t: 1.6, x: 540, y: 600, z: 1.04},
          {t: 2.8, x: 540, y: 760, z: 1.04},
          {t: 3.5, x: 540, y: 760, z: 1.08},
          {t: 4.0, x: 540, y: 1020, z: 1.03},
          {t: 6.4, x: 540, y: 1020, z: 1.09},
        ]}
      >
        <AbsoluteFill style={{translate: `${shake}px 0px`}}>
          <div style={{...card, top: 420, height: 450, padding: '24px 36px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 14, borderBottom: '2px solid #EEEAE4'}}>
              <Av i="PR" bg="#B5523F" size={52} />
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>Priya</div>
              <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 800, fontSize: 24, color: C.muted, letterSpacing: 2, opacity: 1 - interpolate(t, [4.8, 5.0], [0, 1], CL)}}>DIRECT MESSAGE</div>
            </div>
            <Line at={0}>{"ok don't tell anyone..."}</Line>
            <Line at={0.6}>
              {'Raj is about to get '}
              <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={4} progress={interpolate(t, [1.1, 1.7], [0, 1], {...CL, easing: INOUT})}>
                <span>fired</span>
              </Highlight>
            </Line>
            <Line at={2.85} me>
              no way. tell me everything
            </Line>
          </div>
          {/* your reply, forwarded */}
          <div style={{position: 'absolute', left: 70, right: 70, top: 900, display: 'flex', flexDirection: 'column', gap: 14}}>
            {FWD.map((r) => {
              const p = ez(t, r.at, 0.45);
              return (
                <div key={r.name} style={{display: 'flex', alignItems: 'center', gap: 18, background: C.white, borderRadius: 22, padding: '10px 22px', height: 58, boxShadow: '0 10px 24px rgba(60,45,20,0.12)', opacity: p, translate: `${(1 - p) * 80}px 0px`}}>
                  <svg width={34} height={34} viewBox="0 0 24 24">
                    <path fill={C.muted} d="M14 5l7 7-7 7v-4.1C9 14.9 5.6 16.5 3 20c1-5 4-10 11-11V5z" />
                  </svg>
                  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted, whiteSpace: 'nowrap'}}>Priya forwarded to</div>
                  <Av i={r.i} bg={r.bg} size={50} />
                  <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>{r.name}</div>
                  <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted, whiteSpace: 'nowrap'}}>"tell me everything"</div>
                </div>
              );
            })}
          </div>
          {stamp > 0 && (
            <div style={{position: 'absolute', left: 620, top: 428, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-6deg', scale: String(interpolate(t, [5.0, 5.3], [1.7, 1], {...CL, easing: OUT, output: 'perceptual-scale'}))}}>
              <div style={{border: `6px solid ${C.red}`, color: C.red, background: 'rgba(255,255,255,0.94)', fontFamily: SANS, fontWeight: 900, fontSize: 38, letterSpacing: 3, padding: '4px 20px', borderRadius: 14, whiteSpace: 'nowrap'}}>{"YOU'RE NEXT"}</div>
            </div>
          )}
        </AbsoluteFill>
      </Camera>
      <Sfx at={0.6} name="ping" volume={0.3} />
      <Sfx at={2.85} name="send" volume={0.3} />
      {FWD.map((r) => (
        <Sfx key={r.name} at={r.at} name="blip" volume={0.26} />
      ))}
      <Sfx at={5.0} name="hit" volume={0.55} />
      <Caps
        top={1290}
        caps={[
          {text: 'A coworker just told you some juicy gossip.', start: 0.2, end: 2.75, key: 'juicy', se: 2.45},
          {text: 'You leaned in.', start: 2.8, end: 3.8, key: 'leaned', se: 3.4},
          {text: "Now they'll tell your secrets too.", start: 3.86, end: 6.4, key: 'secrets', se: 5.65},
        ]}
      />
    </Paper>
  );
};

import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, CallWindow, Camera, Caps, INOUT, Mark, OUT, Paper, TileChip, ez, useT} from './kit';

/* 1. Hook: you are talking on a call, the live caption types your sentence, Mark cuts in mid-word, nobody reacts. */
const BASE = 'So the real issue with the budget is';
const REST = ' that we sh';

export const Hook: React.FC = () => {
  const {t} = useT();
  const CUT = 2.27;
  const typed = BASE + REST.slice(0, Math.floor(interpolate(t, [0.1, CUT - 0.05], [0, REST.length], CL)));
  const cut = t >= CUT;
  const stamp = interpolate(t, [4.2, 4.5], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  const shake = t > CUT && t < CUT + 0.35 ? Math.sin((t - CUT) * 90) * 6 * (1 - (t - CUT) / 0.35) : 0;
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 1000, z: 1.06},
          {t: 2.2, x: 540, y: 1000, z: 1.03},
          {t: 3.4, x: 540, y: 700, z: 1.03},
          {t: 5.8, x: 540, y: 700, z: 1.07},
        ]}
      >
        <AbsoluteFill style={{translate: `${shake}px 0px`}}>
          <CallWindow
            top={380}
            rings={{you: cut ? undefined : C.amber, mark: cut ? C.red : undefined}}
            dims={{you: ez(t, CUT, 0.4)}}
            pills={{
              you: <TileChip p={ez(t, CUT + 0.05, 0.3)} bg={C.red}>CUT OFF</TileChip>,
              dana: <TileChip p={ez(t, 3.7, 0.4)} bg="#3A3A45">listening</TileChip>,
              raj: <TileChip p={ez(t, 4.0, 0.4)} bg="#3A3A45">listening</TileChip>,
            }}
            right={
              <div style={{position: 'relative', height: 52, display: 'flex', alignItems: 'center'}}>
                <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 26, color: 'rgba(255,255,255,0.6)', opacity: 1 - interpolate(t, [4.0, 4.2], [0, 1], CL)}}>4 in call</div>
                {stamp > 0 && (
                  <div style={{position: 'absolute', right: 0, top: -2, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [4.2, 4.5], [1.6, 1], {...CL, easing: OUT, output: 'perceptual-scale'}))}}>
                    <div style={{border: `5px solid ${C.red}`, color: C.red, background: 'rgba(255,255,255,0.95)', fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 2, padding: '2px 16px', borderRadius: 12, whiteSpace: 'nowrap'}}>NOBODY SAYS A WORD</div>
                  </div>
                )}
              </div>
            }
          >
            <div style={{color: cut ? 'rgba(255,255,255,0.45)' : C.white}}>
              <span style={{color: C.amber, fontWeight: 900}}>YOU </span>
              {cut ? (
                <StrikeThrough color={C.red} strokeWidth={4} seed={5} progress={interpolate(t, [CUT, CUT + 0.45], [0, 1], {...CL, easing: INOUT})}>
                  <span>{typed}</span>
                </StrikeThrough>
              ) : (
                <span>
                  {typed}
                  <span style={{opacity: Math.floor(t * 4) % 2 ? 0.2 : 1}}>|</span>
                </span>
              )}
            </div>
            <div style={{marginTop: 8, opacity: ez(t, CUT, 0.25)}}>
              <span style={{color: '#8FB4E8', fontWeight: 900}}>MARK </span>
              Actually, quick thing on that...
            </div>
          </CallWindow>
        </AbsoluteFill>
      </Camera>
      <Sfx at={CUT} name="hit" volume={0.5} />
      <Sfx at={3.7} name="blip" volume={0.24} />
      <Sfx at={4.0} name="blip" volume={0.24} />
      <Sfx at={4.3} name="hit" volume={0.4} />
      <Caps
        top={1290}
        caps={[
          {text: "You're mid-sentence in a meeting.", start: 0.24, end: 2.22, key: 'mid-sentence', se: 1.83},
          {text: 'Someone cuts you off.', start: 2.27, end: 3.6, key: 'cuts', se: 3.24},
          {text: 'And the whole room lets them.', start: 3.67, end: 5.8, key: 'room', se: 5.18},
        ]}
      />
    </Paper>
  );
};

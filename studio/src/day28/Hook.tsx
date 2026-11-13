import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, DANA, INOUT, Mark, Moon, Msg, Paper, card, ez, useT} from './kit';

/* 1. Hook: 9:04 PM, Dana's message is already on screen and buzzing. You reply two minutes later ("Replied in 2 min" gets circled).
   Below, the week fills in: a 9 PM message from Dana every single night. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const TIMES = ['9:04 PM', '9:12 PM', '8:57 PM', '9:20 PM', '9:08 PM'];
export const Hook: React.FC = () => {
  const {t} = useT();
  const buzz = t < 1.6 ? Math.sin(t * 60) * 5 * interpolate(t, [0, 1.6], [1, 0], CL) : 0;
  const msg1 = interpolate(t, [0, 0.35], [0.75, 1], {...CL, easing: Easing.out(Easing.cubic)});
  const reply = interpolate(t, [3.3, 3.65], [0, 1], {...CL, easing: POP});
  const badge = ez(t, 4.1, 0.4);
  const ring = interpolate(t, [4.4, 5.0], [0, 1], {...CL, easing: INOUT});
  const week = ez(t, 5.3, 0.45);
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 400, z: 1.07},
          {t: 1.5, x: 540, y: 400, z: 1.07},
          {t: 2.6, x: 540, y: 400, z: 1.0},
          {t: 5.2, x: 540, y: 400, z: 1.0},
          {t: 7.8, x: 540, y: 960, z: 1.04},
        ]}
      >
        {/* phone thread */}
        <div style={{...card, top: 190, height: 540, background: C.nightSoft, overflow: 'hidden', translate: `${buzz}px 0px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '26px 36px', borderBottom: '2px solid rgba(255,255,255,0.08)'}}>
            <Av i="DA" bg={DANA.shirt} size={64} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.white}}>Dana (boss)</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 22, color: C.muted}}>Thursday night</div>
            </div>
            <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12}}>
              <Moon size={36} />
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.white}}>9:04 PM</div>
            </div>
          </div>
          <div style={{padding: '30px 36px', display: 'flex', flexDirection: 'column', gap: 22}}>
            <Msg p={msg1} dark time="9:04 PM">
              Can you send me the deck tonight?
            </Msg>
            <Msg p={reply} out time="9:06 PM">
              Sure! Sending it now.
            </Msg>
          </div>
          <div style={{position: 'absolute', left: 56, bottom: 40, opacity: badge, translate: `0px ${(1 - badge) * 16}px`}}>
            <Circle color={C.red} strokeWidth={5} iterations={1} seed={4} padding={{top: 14, bottom: 14, left: 14, right: 14}} progress={ring}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.white, padding: '4px 10px'}}>Replied in 2 min</div>
            </Circle>
          </div>
        </div>
        {/* every night */}
        <div style={{...card, top: 790, height: 340, padding: '28px 36px', boxSizing: 'border-box', opacity: 0.35 + 0.65 * week, translate: `0px ${(1 - week) * 30}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>DANA'S MESSAGES THIS WEEK</div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 24}}>
            {DAYS.map((d, i) => {
              const p = interpolate(t, [5.7 + i * 0.28, 6.05 + i * 0.28], [0, 1], {...CL, easing: POP});
              return (
                <div key={d} style={{width: 158, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
                  <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>{d}</div>
                  <div style={{width: 150, height: 150, borderRadius: 26, border: `3px dashed ${C.muted}`, boxSizing: 'border-box', position: 'relative'}}>
                    <div
                      style={{
                        position: 'absolute',
                        inset: -3,
                        borderRadius: 26,
                        background: C.night,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        opacity: Math.min(1, p * 1.5),
                        scale: String(0.7 + 0.3 * p),
                      }}
                    >
                      <Moon size={34} />
                      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 25, color: C.white, whiteSpace: 'nowrap'}}>{TIMES[i]}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Camera>
      <Sfx at={0.0} name="ping" volume={0.3} />
      <Sfx at={3.3} name="send" volume={0.3} />
      <Sfx at={4.4} name="snip" volume={0.22} />
      {DAYS.map((d, i) => (
        <Sfx key={d} at={5.7 + i * 0.28} name="click" volume={0.24} />
      ))}
      <Caps
        top={1290}
        caps={[
          {text: 'Your boss just messaged you at nine at night.', start: 0.3, end: 3.1, key: 'nine night', se: 2.76},
          {text: 'You replied in two minutes.', start: 3.24, end: 5.5, key: 'two minutes', se: 4.91},
          {text: 'Now they expect that every night.', start: 5.63, end: 7.75, key: 'every night', se: 7.2},
        ]}
      />
    </Paper>
  );
};

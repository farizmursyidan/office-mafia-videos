import React from 'react';
import {interpolate} from 'remotion';
import {StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Camera, Caps, INOUT, Label, Mark, OUT, Paper, Pill, card, ez, float, useT} from './kit';

/* 3. Sign 1: meetings vanish. The camera leans in on the leadership sync as it gets struck out. */
const CAL = [
  {day: 'MON', time: '10:00', name: 'Team standup', gone: 99},
  {day: 'TUE', time: '14:00', name: 'Leadership sync (weekly)', gone: 4.3},
  {day: 'WED', time: '11:00', name: 'Roadmap review', gone: 1.6},
  {day: 'THU', time: '16:00', name: 'Client check in', gone: 99},
];
export const Sign1: React.FC = () => {
  const {t} = useT();
  return (
    <Paper>
      <Mark />
      <Label n="1/3" title="Meetings vanish" />
      <Camera
        shots={[
          {t: 0, x: 540, y: 800, z: 1},
          {t: 3.5, x: 540, y: 800, z: 1},
          {t: 4.3, x: 540, y: 690, z: 1.12},
          {t: 5.6, x: 540, y: 690, z: 1.12},
          {t: 6.4, x: 540, y: 800, z: 1.02},
        ]}
      >
        <div
          style={{
            ...card,
            top: 440,
            padding: '22px 36px 18px',
            opacity: interpolate(t, [0.2, 0.8], [0, 1], {...CL, easing: OUT}),
            translate: interpolate(t, [0.2, 0.9], ['0px 90px', `0px ${float(t)}px`], {...CL, easing: OUT}),
          }}
        >
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 8}}>YOUR WEEK</div>
          {CAL.map((r, i) => {
            const fade = ez(t, r.gone + 0.45, 0.5);
            const lead = r.day === 'TUE';
            const flash = lead ? ez(t, 3.6, 0.4) * (1 - fade) : 0;
            return (
              <div
                key={r.day}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  padding: '16px 0',
                  borderTop: '2px solid #EEEAE4',
                  opacity: interpolate(t, [0.45 + i * 0.1, 0.95 + i * 0.1], [0, 1], {...CL, easing: OUT}),
                  translate: interpolate(t, [0.45 + i * 0.1, 0.95 + i * 0.1], ['0px 24px', '0px 0px'], {...CL, easing: OUT}),
                }}
              >
                <div style={{position: 'absolute', left: -16, right: -16, top: 6, bottom: 6, borderRadius: 14, background: C.amber, opacity: 0.3 * flash}} />
                <div style={{position: 'relative', width: 80, fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.muted, opacity: 1 - 0.5 * fade}}>{r.day}</div>
                <div style={{position: 'relative', width: 6, alignSelf: 'stretch', borderRadius: 3, background: t >= r.gone ? C.red : C.amber}} />
                <div style={{position: 'relative', opacity: 1 - 0.45 * fade}}>
                  <StrikeThrough color={C.red} strokeWidth={5} iterations={2} seed={i + 1} progress={interpolate(t, [r.gone, r.gone + 0.5], [0, 1], {...CL, easing: INOUT})}>
                    <span style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink}}>{r.name}</span>
                  </StrikeThrough>
                  <div style={{position: 'relative', height: 32, marginTop: 2}}>
                    <div style={{position: 'absolute', fontFamily: SANS, fontWeight: 600, fontSize: 26, color: C.muted, opacity: 1 - fade}}>{r.time}</div>
                    <div style={{position: 'absolute', fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.red, opacity: fade}}>Canceled</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Pill p={ez(t, 5.0, 0.5)} bg={C.red} style={{left: 110, top: 1000}}>
          Canceled. No reason given.
        </Pill>
      </Camera>
      <Sfx at={1.6} name="snip" volume={0.4} />
      <Sfx at={4.3} name="snip" volume={0.4} />
      <Sfx at={5.0} name="hit" volume={0.35} />
      <Caps
        top={1290}
        caps={[
          {text: 'Sign one: meetings vanish without a reason.', start: 0.44, end: 3.62, key: 'vanish', se: 3.24},
          {text: 'Your weekly sync with leadership disappears from the calendar.', start: 3.64, end: 6.9, key: 'leadership', se: 6.16},
        ]}
      />
    </Paper>
  );
};

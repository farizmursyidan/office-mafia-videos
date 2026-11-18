import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle, Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, DANA, INOUT, MEI, Mark, Paper, Pill, RAJ, TOM, PRIYA, KAREN, YOU, card, ez, useT} from './kit';

/* 1. Hook: the team chat is on screen from frame 0 with Raj's callout sliding in. "wrong" gets a red highlight,
   the "Seen by" counter climbs to 40 while avatars stack up, then your typing indicator appears and everyone waits. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const WATCH = [
  {i: 'DA', bg: DANA.shirt},
  {i: 'ME', bg: MEI.shirt},
  {i: 'TO', bg: TOM.shirt},
  {i: 'PR', bg: PRIYA.shirt},
  {i: 'KA', bg: KAREN.shirt},
  {i: 'SA', bg: '#6C7A89'},
  {i: 'LE', bg: '#8C6A4F'},
];
export const Hook: React.FC = () => {
  const {t} = useT();
  const msg = interpolate(t, [0, 0.45], [0.35, 1], {...CL, easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const hl = interpolate(t, [1.6, 2.3], [0, 1], {...CL, easing: INOUT});
  const seen = Math.round(interpolate(t, [3.0, 4.3], [3, 40], {...CL, easing: INOUT}));
  const typing = ez(t, 4.75, 0.45);
  const wait = interpolate(t, [5.4, 5.75], [0, 1], {...CL, easing: POP});
  const ring = interpolate(t, [3.9, 4.5], [0, 1], {...CL, easing: INOUT});
  const dot = (k: number) => 0.35 + 0.65 * Math.max(0, Math.sin(t * 7 - k * 0.9));
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 470, z: 1.08},
          {t: 2.6, x: 540, y: 470, z: 1.0},
          {t: 4.4, x: 540, y: 700, z: 1.04},
          {t: 6.6, x: 540, y: 820, z: 1.07},
        ]}
      >
        <div style={{...card, top: 200, height: 700, padding: '34px 40px', boxSizing: 'border-box'}}>
          {/* channel header */}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 22, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 44, color: C.ink}}># team-launch</div>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.muted, whiteSpace: 'nowrap'}}>42 members</div>
          </div>
          {/* Raj's callout */}
          <div style={{display: 'flex', gap: 20, marginTop: 44, opacity: msg, translate: `0px ${(1 - msg) * 30}px`}}>
            <Av i="RA" bg={RAJ.shirt} size={72} />
            <div style={{flex: 1}}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>
                Raj <span style={{fontWeight: 700, color: C.muted, fontSize: 24}}>9:41 AM</span>
              </div>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 48, lineHeight: 1.22, color: C.ink, marginTop: 8}}>
                <span style={{color: '#3F6FB5'}}>@You</span> the numbers in your Q3 deck are{' '}
                <Highlight color="rgba(200,65,58,0.35)" iterations={1} seed={4} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={hl}>
                  <span>wrong.</span>
                </Highlight>
              </div>
            </div>
          </div>
          {/* seen by */}
          <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 50, padding: '22px 26px', borderRadius: 24, background: '#F6F2EC'}}>
            <div style={{display: 'flex'}}>
              {WATCH.map((w, k) => {
                const p = interpolate(t, [2.9 + k * 0.17, 3.25 + k * 0.17], [0, 1], {...CL, easing: POP});
                return (
                  <div key={w.i} style={{marginLeft: k === 0 ? 0 : -18, opacity: 0.2 + 0.8 * p, scale: String(0.8 + 0.2 * p), border: '4px solid #F6F2EC', borderRadius: '50%'}}>
                    <Av i={w.i} bg={w.bg} size={62} />
                  </div>
                );
              })}
            </div>
            <Circle color={C.red} strokeWidth={5} iterations={1} seed={9} padding={{top: 6, bottom: 6, left: 14, right: 14}} progress={ring}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.ink, whiteSpace: 'nowrap', padding: '0 4px'}}>Seen by {seen}</div>
            </Circle>
          </div>
          {/* your typing indicator */}
          <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 18, marginTop: 56, opacity: typing, translate: `0px ${(1 - typing) * 24}px`}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.muted}}>You are typing</div>
            <div style={{display: 'flex', gap: 10, background: C.amber, borderRadius: 28, padding: '22px 28px'}}>
              {[0, 1, 2].map((k) => (
                <div key={k} style={{width: 16, height: 16, borderRadius: 8, background: C.ink, opacity: dot(k)}} />
              ))}
            </div>
            <Av i="YOU" bg={YOU.shirt} size={64} fg={C.ink} />
          </div>
          <div style={{position: 'absolute', left: 40, right: 40, top: 516, height: 76, borderRadius: 24, border: '3px dashed #E2DBD0', boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '0 26px', fontFamily: SANS, fontWeight: 700, fontSize: 30, color: '#C9C2B8', opacity: 1 - typing}}>Reply in thread</div>
          <Pill p={wait} bg={C.ink} size={30} style={{left: 40, top: 522}}>
            40 people waiting
          </Pill>
        </div>
      </Camera>
      <Sfx at={0.0} name="ping" volume={0.22} />
      <Sfx at={1.6} name="snip" volume={0.16} />
      <Sfx at={3.0} name="blip" volume={0.22} />
      <Sfx at={4.75} name="click" volume={0.18} />
      <Sfx at={5.4} name="pop" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Someone just called out your mistake in the team chat.', start: 0.3, end: 3.0, key: 'mistake', se: 2.74},
          {text: 'Forty people saw it.', start: 3.05, end: 4.6, key: 'forty', se: 4.3},
          {text: "And they're all waiting for your reply.", start: 4.68, end: 6.6, key: 'waiting', se: 6.24},
        ]}
      />
    </Paper>
  );
};

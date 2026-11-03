import React from 'react';
import {Easing, interpolate} from 'remotion';
import {StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, INOUT, Mark, OUT, Paper, Pill, card, ez, float, useT} from './kit';

/* 1. Hook: the new-boss announcement is already up. Your wins get struck off, the record counts to zero, and Mark already has the Monday slot. */
const WINS = [
  {w: 'Q3 launch', at: 2.2},
  {w: '12 accounts', at: 2.7},
  {w: 'Top rated', at: 3.2},
];
export const Hook: React.FC = () => {
  const {t} = useT();
  const years = interpolate(t, [2.2, 3.9], [4, 0], {...CL, easing: INOUT});
  const zero = t >= 3.9;
  const cal = ez(t, 4.6, 0.5);
  const stamp = interpolate(t, [5.9, 6.2], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 300, z: 1.05},
          {t: 1.8, x: 540, y: 300, z: 1.0},
          {t: 2.3, x: 540, y: 640, z: 1.02},
          {t: 4.4, x: 540, y: 640, z: 1.0},
          {t: 5.0, x: 540, y: 1060, z: 1.03},
          {t: 7.6, x: 540, y: 1060, z: 1.05},
        ]}
      >
        <div style={{...card, top: 190, height: 270, padding: '26px 36px', translate: `0px ${float(t)}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted, letterSpacing: 2}}># team-announcements</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 24, marginTop: 26}}>
            <Av i="PR" bg="#B5523F" size={110} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 50, color: C.ink, lineHeight: 1.1}}>Please welcome Priya</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.muted, marginTop: 8}}>Your new boss. Starts Monday.</div>
            </div>
          </div>
        </div>
        <Pill p={ez(t, 0.3, 0.35)} bg={C.red} size={30} style={{right: 100, top: 208}}>
          NEW BOSS
        </Pill>
        <div style={{...card, top: 490, height: 310, padding: '26px 36px', opacity: ez(t, 0.1, 0.5)}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>YOUR TRACK RECORD</div>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 64, color: zero ? C.red : C.ink, fontVariantNumeric: 'tabular-nums', scale: String(zero ? interpolate(t, [3.9, 4.2], [1.3, 1], {...CL, easing: OUT}) : 1), transformOrigin: 'right center'}}>
              {Math.ceil(years - 0.001)} {Math.ceil(years - 0.001) === 1 ? 'year' : 'years'}
            </div>
          </div>
          <div style={{marginTop: 22, display: 'flex', flexDirection: 'column', gap: 12}}>
            {WINS.slice(0, 2).map((r, i) => (
              <div key={r.w} style={{fontFamily: SANS, fontWeight: 800, fontSize: 40, color: t > r.at + 0.3 ? C.muted : C.ink}}>
                <StrikeThrough color={C.red} strokeWidth={5} seed={i + 4} progress={interpolate(t, [r.at, r.at + 0.4], [0, 1], {...CL, easing: INOUT})}>
                  <span>{r.w}</span>
                </StrikeThrough>
              </div>
            ))}
          </div>
          <div style={{position: 'absolute', left: 36, bottom: 24, fontFamily: SANS, fontWeight: 800, fontSize: 40, color: t > WINS[2].at + 0.3 ? C.muted : C.ink}}>
            <StrikeThrough color={C.red} strokeWidth={5} seed={9} progress={interpolate(t, [WINS[2].at, WINS[2].at + 0.4], [0, 1], {...CL, easing: INOUT})}>
              <span>{WINS[2].w}</span>
            </StrikeThrough>
          </div>
        </div>
        <div style={{...card, top: 830, height: 300, padding: '26px 36px', opacity: cal, translate: `0px ${(1 - cal) * 50}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>{"PRIYA'S MONDAY"}</div>
          <div style={{marginTop: 22, background: '#F4EFE7', borderLeft: `10px solid ${C.red}`, borderRadius: 16, padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 22}}>
            <Av i="MA" bg="#3F6FB5" size={88} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 42, color: C.ink}}>Coffee with Mark</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 32, color: C.muted, marginTop: 4}}>9:00 AM, her office</div>
            </div>
          </div>
          {stamp > 0 && (
            <div style={{position: 'absolute', right: 34, top: 18, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [5.9, 6.2], [1.6, 1], {...CL, easing: OUT}))}}>
              <div style={{border: `5px solid ${C.red}`, color: C.red, fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 2, padding: '2px 14px', borderRadius: 12, whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.95)'}}>ALREADY IN THERE</div>
            </div>
          )}
        </div>
      </Camera>
      <Sfx at={0.3} name="blip" volume={0.3} />
      <Sfx at={2.2} name="click" volume={0.25} />
      <Sfx at={2.7} name="click" volume={0.25} />
      <Sfx at={3.2} name="click" volume={0.25} />
      <Sfx at={3.9} name="hit" volume={0.5} />
      <Sfx at={4.68} name="pop" volume={0.3} />
      <Sfx at={5.9} name="hit" volume={0.4} />
      <Caps
        top={1290}
        caps={[
          {text: 'You just got a new boss.', start: 0.28, end: 1.85, key: 'boss', se: 1.52},
          {text: 'Your track record just reset to zero.', start: 1.92, end: 4.6, key: 'zero', se: 4.24},
          {text: 'And someone else is already in their office.', start: 4.68, end: 7.5, key: 'already', se: 6.76},
        ]}
      />
    </Paper>
  );
};

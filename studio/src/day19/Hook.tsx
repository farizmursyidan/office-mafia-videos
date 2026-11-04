import React from 'react';
import {Easing, interpolate} from 'remotion';
import {StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, INOUT, Mark, OUT, Paper, Pill, card, ez, float, useT} from './kit';

/* 1. Hook: the note-taking ask is already on screen. Every meeting this month lands on you, and the promotion list has other names. */
const WEEKS = 8;
export const Hook: React.FC = () => {
  const {t} = useT();
  const count = Math.floor(interpolate(t, [1.0, 2.7], [1, WEEKS], {...CL, easing: INOUT}));
  const list = ez(t, 3.2, 0.5);
  const stamp = interpolate(t, [4.5, 4.8], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 300, z: 1.05},
          {t: 1.0, x: 540, y: 300, z: 1.0},
          {t: 1.4, x: 540, y: 600, z: 1.02},
          {t: 3.0, x: 540, y: 600, z: 1.0},
          {t: 3.5, x: 540, y: 1000, z: 1.03},
          {t: 5.8, x: 540, y: 1000, z: 1.05},
        ]}
      >
        <div style={{...card, top: 190, height: 230, padding: '24px 34px', translate: `0px ${float(t)}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted, letterSpacing: 2}}># monday-standup</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 22}}>
            <Av i="DA" bg="#3F6FB5" size={96} />
            <div style={{background: '#F0EBE3', fontFamily: SANS, fontWeight: 800, fontSize: 44, color: C.ink, padding: '16px 26px', borderRadius: 24, whiteSpace: 'nowrap'}}>Can you take notes?</div>
          </div>
        </div>
        <div style={{...card, top: 450, height: 280, padding: '24px 34px', opacity: ez(t, 0.1, 0.5)}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>NOTE TAKER THIS MONTH</div>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 54, color: count === WEEKS ? C.red : C.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>
              {count} of {WEEKS}
            </div>
          </div>
          <div style={{marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 12}}>
            {Array.from({length: WEEKS}).map((_, i) => {
              const on = i < count;
              return (
                <div key={i} style={{height: 130, borderRadius: 16, background: on ? C.amber : '#F0EBE3', color: on ? C.ink : C.muted, fontFamily: SANS, fontWeight: 900, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {on ? 'YOU' : ''}
                </div>
              );
            })}
          </div>
        </div>
        <div style={{...card, top: 760, height: 370, padding: '24px 34px', opacity: list, translate: `0px ${(1 - list) * 50}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted, letterSpacing: 3}}>PROMOTED THIS CYCLE</div>
          {[
            {i: 'RA', bg: '#5B8C5A', n: 'Raj', w: 'led the client demo'},
            {i: 'ME', bg: '#9A5BB0', n: 'Mei', w: 'presented to the VP'},
          ].map((r) => (
            <div key={r.i} style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 18}}>
              <Av i={r.i} bg={r.bg} size={72} />
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink}}>{r.n}</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 34, color: C.muted}}>{r.w}</div>
            </div>
          ))}
          <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 18, color: C.muted}}>
            <Av i="YOU" bg={C.amber} fg={C.ink} size={72} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40}}>
              <StrikeThrough color={C.red} strokeWidth={6} seed={4} progress={interpolate(t, [4.2, 4.6], [0, 1], {...CL, easing: INOUT})}>
                <span>You</span>
              </StrikeThrough>
            </div>
            <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 34}}>took the notes</div>
          </div>
          {stamp > 0 && (
            <div style={{position: 'absolute', right: 30, top: 18, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [4.5, 4.8], [1.6, 1], {...CL, easing: OUT}))}}>
              <div style={{border: `5px solid ${C.red}`, color: C.red, fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 2, padding: '2px 14px', borderRadius: 12, whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.95)'}}>NOT ON THE LIST</div>
            </div>
          )}
        </div>
        <Pill p={ez(t, 0.2, 0.3)} bg={C.red} size={30} style={{right: 100, top: 206}}>
          AGAIN
        </Pill>
      </Camera>
      <Sfx at={0.3} name="blip" volume={0.3} />
      <Sfx at={2.07} name="click" volume={0.3} />
      <Sfx at={3.27} name="pop" volume={0.3} />
      <Sfx at={4.5} name="hit" volume={0.45} />
      <Caps
        top={1290}
        caps={[
          {text: 'You just got asked to take the notes.', start: 0.21, end: 1.98, key: 'notes', se: 1.67},
          {text: 'Again.', start: 2.07, end: 3.15, key: 'Again', se: 2.58},
          {text: "And that's why you're not getting promoted.", start: 3.27, end: 5.7, key: 'promoted', se: 4.94},
        ]}
      />
    </Paper>
  );
};

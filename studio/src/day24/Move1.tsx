import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, OUT, Paper, Pill, Push, card, ez, useT} from './kit';

/* 3. Move 1: the week calendar. Your boss is in the office Tuesday and Thursday, so your Home days flip to Office on those days. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const BOSS_IN = [1, 3];
const COL = 128;
const Cell: React.FC<{office: boolean; p: number; flip?: number}> = ({office, p, flip = 0}) => {
  const on = office || flip > 0.5;
  return (
    <div
      style={{
        width: COL - 14,
        height: 92,
        borderRadius: 16,
        background: on ? (office ? C.amber : C.green) : '#EEEAE4',
        color: on ? (office ? C.ink : C.white) : C.muted,
        fontFamily: SANS,
        fontWeight: 900,
        fontSize: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: p,
        translate: `0px ${(1 - p) * 20}px`,
        scale: `${1} ${flip > 0 ? Math.abs(1 - 2 * flip) * 0.9 + 0.1 : 1}`,
      }}
    >
      {on ? 'OFFICE' : 'HOME'}
    </div>
  );
};
export const Move1: React.FC = () => {
  const {t} = useT();
  const cal = ez(t, 0.3, 0.5);
  const boss = (i: number) => ez(t, 3.6 + i * 0.1, 0.4);
  const you = (i: number) => ez(t, 4.0 + i * 0.08, 0.4);
  const flip = (k: number) => interpolate(t, [5.4 + k * 0.6, 5.9 + k * 0.6], [0, 1], {...CL, easing: INOUT});
  const pill = ez(t, 6.9, 0.35);
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Come in when they do" />
        <div style={{...card, top: 450, height: 560, padding: '28px 34px', boxSizing: 'border-box', opacity: cal, translate: `0px ${(1 - cal) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>THIS WEEK</div>
          <div style={{display: 'flex', marginTop: 24, marginLeft: 110}}>
            {DAYS.map((d, i) => (
              <div key={d} style={{width: COL, fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink, textAlign: 'center', position: 'relative'}}>
                {i === 1 ? (
                  <Circle color={C.red} strokeWidth={5} iterations={1} seed={7} padding={{left: 14, right: 14, top: 14, bottom: 14}} progress={interpolate(t, [5.5, 6.1], [0, 1], {...CL, easing: INOUT})}>
                    <span>{d}</span>
                  </Circle>
                ) : (
                  d
                )}
              </div>
            ))}
          </div>
          <div style={{display: 'flex', alignItems: 'center', marginTop: 30}}>
            <div style={{width: 110, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4}}>
              <Av i="DA" bg="#3F6FB5" size={64} />
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, color: C.muted}}>BOSS</div>
            </div>
            {DAYS.map((d, i) => (
              <div key={d} style={{width: COL, display: 'flex', justifyContent: 'center'}}>
                {BOSS_IN.includes(i) ? <Cell office p={boss(i)} /> : <div style={{width: COL - 14, height: 92, borderRadius: 16, border: '3px dashed #DDD6CB', boxSizing: 'border-box', opacity: boss(i)}} />}
              </div>
            ))}
          </div>
          <div style={{display: 'flex', alignItems: 'center', marginTop: 26}}>
            <div style={{width: 110, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4}}>
              <Av i="YOU" bg={C.amber} fg={C.ink} size={64} />
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, color: C.muted}}>YOU</div>
            </div>
            {DAYS.map((d, i) => (
              <div key={d} style={{width: COL, display: 'flex', justifyContent: 'center'}}>
                <Cell office={false} p={you(i)} flip={i === 1 ? flip(0) : i === 3 ? flip(1) : 0} />
              </div>
            ))}
          </div>
        </div>
        <Pill p={pill} bg={C.ink} size={32} style={{left: 90, top: 1050}}>
          SAME DAYS AS THE DECIDERS
        </Pill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.28} />
      <Sfx at={3.6} name="pop" volume={0.28} />
      <Sfx at={5.4} name="click" volume={0.3} />
      <Sfx at={6.0} name="click" volume={0.3} />
      <Sfx at={6.9} name="ping" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: come in when the deciders do.', start: 0.6, end: 3.45, key: 'deciders', se: 2.98},
          {text: "Check your boss's calendar.", start: 3.54, end: 4.7, key: 'calendar', se: 4.58},
          {text: "If they're in the office on Tuesday, so are you.", start: 4.77, end: 7.6, key: 'tuesday', se: 7.08},
        ]}
      />
    </Paper>
  );
};

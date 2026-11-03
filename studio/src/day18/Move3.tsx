import React from 'react';
import {interpolate} from 'remotion';
import {StrikeThrough, Underline} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, OUT, Paper, Pill, Push, card, ez, float, useT} from './kit';

/* 5. Move 3: Priya keeps complaining about one report. The week runs out, the report gets fixed by Friday, before anyone asks. */
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const Move3: React.FC = () => {
  const {t} = useT();
  const chat = ez(t, 0.15, 0.55);
  const week = ez(t, 2.6, 0.5);
  const run = interpolate(t, [5.26, 6.6], [0, 4], {...CL, easing: INOUT});
  const fixed = t > 6.6;
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Hand them a quick win" />
        <div style={{...card, top: 430, height: 330, padding: '24px 34px', opacity: chat, translate: `0px ${(1 - chat) * 50 + float(t)}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 14, borderBottom: '2px solid #EEEAE4'}}>
            <Av i="PR" bg="#B5523F" size={56} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>Priya</div>
          </div>
          <div style={{marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start'}}>
            <div style={{background: '#F0EBE3', fontFamily: SANS, fontWeight: 700, fontSize: 38, color: C.ink, padding: '14px 24px', borderRadius: 22, opacity: ez(t, 0.7, 0.4)}}>
              {'Why is the '}
              <Underline color={C.red} strokeWidth={6} seed={5} iterations={2} progress={interpolate(t, [3.2, 3.8], [0, 1], {...CL, easing: INOUT})}>
                <span>weekly report</span>
              </Underline>
              {' 40 tabs?'}
            </div>
            <div style={{background: '#F0EBE3', fontFamily: SANS, fontWeight: 700, fontSize: 38, color: C.ink, padding: '14px 24px', borderRadius: 22, opacity: ez(t, 1.7, 0.4)}}>Nobody can find anything.</div>
          </div>
        </div>
        <div style={{...card, top: 790, height: 350, padding: '26px 34px', opacity: week, translate: `0px ${(1 - week) * 50}px`}}>
          <div style={{display: 'flex', gap: 12}}>
            {DAYS.map((d, i) => {
              const on = run >= i - 0.2;
              const fri = i === 4;
              return (
                <div key={d} style={{flex: 1, height: 90, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 36, background: on ? (fri ? C.green : C.amber) : '#F0EBE3', color: on ? (fri ? C.white : C.ink) : C.muted}}>
                  {d}
                </div>
              );
            })}
          </div>
          <div style={{marginTop: 34, display: 'flex', alignItems: 'center', gap: 30, fontFamily: SANS, fontWeight: 900, fontSize: 60, color: C.ink}}>
            <div style={{color: fixed ? C.muted : C.ink}}>
              <StrikeThrough color={C.red} strokeWidth={6} seed={3} progress={interpolate(t, [6.2, 6.6], [0, 1], {...CL, easing: INOUT})}>
                <span>40 tabs</span>
              </StrikeThrough>
            </div>
            <div style={{opacity: ez(t, 6.6, 0.35), translate: `${(1 - ez(t, 6.6, 0.35, OUT)) * -24}px 0px`, color: C.green}}>1 page</div>
          </div>
        </div>
        <Pill p={ez(t, 6.9, 0.4)} bg={C.ink} size={30} style={{right: 102, top: 1058}}>
          BEFORE ANYONE ASKS
        </Pill>
      </Push>
      <Sfx at={0.7} name="pop" volume={0.3} />
      <Sfx at={1.7} name="pop" volume={0.3} />
      <Sfx at={5.26} name="click" volume={0.28} />
      <Sfx at={6.6} name="blip" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: hand them a quick win.', start: 0.4, end: 2.7, key: 'win', se: 2.42},
          {text: 'Find the report they keep complaining about.', start: 2.82, end: 5.15, key: 'report', se: 4.78},
          {text: 'Fix it by Friday, before anyone asks.', start: 5.26, end: 8.5, key: 'Friday', se: 7.44},
        ]}
      />
    </Paper>
  );
};

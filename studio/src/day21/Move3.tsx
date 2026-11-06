import React from 'react';
import {interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, Paper, Push, card, ez, mix, useT} from './kit';

/* 5. Move 3: eight weeks tick by, week 8 turns into a review, and the project gets an exit you can walk out of. */
const WEEKS = [1, 2, 3, 4, 5, 6, 7, 8];
export const Move3: React.FC = () => {
  const {t} = useT();
  const page = ez(t, 0.15, 0.55);
  const exit = ez(t, 6.79, 0.45);
  const walk = interpolate(t, [8.73, 9.6], [0, 1], {...CL, easing: INOUT});
  const review = ez(t, 4.95, 0.4);
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Set an end date" />
        <div style={{...card, top: 430, height: 430, padding: '24px 32px', opacity: page, translate: `0px ${(1 - page) * 50}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>YOUR SPECIAL PROJECT</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 52, color: C.ink, marginTop: 8, whiteSpace: 'nowrap'}}>
            Runs for{' '}
            <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={8} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={interpolate(t, [3.9, 4.4], [0, 1], {...CL, easing: INOUT})}>
              <span>eight weeks</span>
            </Highlight>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 22}}>
            {WEEKS.map((w, i) => {
              const p = ez(t, 3.0 + i * 0.25, 0.3);
              const last = w === 8;
              return (
                <div key={w} style={{height: 110, borderRadius: 16, boxSizing: 'border-box', border: `3px solid ${p > 0.5 ? 'transparent' : '#E5DFD5'}`, background: last ? `rgba(46,158,91,${review})` : `rgba(224,169,59,${0.35 * p})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, color: last && review > 0.5 ? C.white : C.muted}}>{last && review > 0.5 ? 'WEEK 8' : 'WEEK'}</div>
                  <div style={{fontFamily: SANS, fontWeight: 900, fontSize: last && review > 0.5 ? 30 : 42, color: last && review > 0.5 ? C.white : C.ink, lineHeight: 1.1}}>{last && review > 0.5 ? 'REVIEW' : w}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{...card, top: 885, height: 245, background: C.night, opacity: ez(t, 0.5, 0.5), translate: `0px ${(1 - ez(t, 0.5, 0.5)) * 50}px`, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 34, top: 22, fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.amber}}>WAY OUT</div>
          <div style={{position: 'absolute', left: 34, right: 240, bottom: 54, height: 6, background: 'rgba(255,255,255,0.18)', borderRadius: 3}} />
          <div style={{position: 'absolute', bottom: 30, left: mix(40, 590, walk)}}>
            <Av i="YOU" bg={C.amber} fg={C.ink} size={104} />
          </div>
          <div style={{position: 'absolute', right: 40, bottom: 0, width: 170, height: 190, borderRadius: '14px 14px 0 0', background: exit > 0.5 ? C.green : '#2C2C2C', boxShadow: `0 0 ${50 * exit}px rgba(46,158,91,${0.8 * exit})`, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 26, boxSizing: 'border-box'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 46, letterSpacing: 2, color: C.white, opacity: 0.2 + 0.8 * exit}}>EXIT</div>
          </div>
        </div>
      </Push>
      <Sfx at={3.0} name="click" volume={0.24} />
      <Sfx at={3.75} name="click" volume={0.24} />
      <Sfx at={4.5} name="click" volume={0.24} />
      <Sfx at={5.12} name="blip" volume={0.3} />
      <Sfx at={6.79} name="pop" volume={0.32} />
      <Sfx at={8.73} name="hit" volume={0.36} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: set an end date.', start: 0.51, end: 2.75, key: 'end', se: 2.36},
          {text: 'Tell your boss, "I\'ll run this for eight weeks, then we review it together."', start: 2.86, end: 6.65, key: 'eight review', se: 6.15},
          {text: 'Now the project has an exit.', start: 6.79, end: 8.6, key: 'exit', se: 8.15},
          {text: 'And so do you.', start: 8.73, end: 9.85, key: 'you', se: 9.26},
        ]}
      />
    </Paper>
  );
};

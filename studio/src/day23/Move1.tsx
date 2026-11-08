import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, Label, Mark, OUT, Paper, Push, card, ez, useT} from './kit';

/* 3. Move 1: three job posts for your exact role and city slide in, the middle salary gets circled and becomes your number. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const POSTS = [
  {co: 'Northwind', pay: '$72k', at: 1.4},
  {co: 'Bluepeak', pay: '$80k', at: 2.7},
  {co: 'Atlas Co', pay: '$88k', at: 3.7},
];
export const Move1: React.FC = () => {
  const {t} = useT();
  const pick = interpolate(t, [5.7, 6.3], [0, 1], CL);
  const pill = interpolate(t, [6.0, 6.3], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Know your number" />
        {POSTS.map((p, i) => {
          const a = ez(t, p.at, 0.5);
          const mid = i === 1;
          const fade = mid ? 0 : interpolate(t, [5.7, 6.2], [0, 0.45], CL);
          return (
            <div
              key={p.co}
              style={{
                ...card,
                top: 440 + i * 220,
                height: 196,
                padding: '26px 34px',
                boxSizing: 'border-box',
                opacity: a * (1 - fade),
                translate: `${(1 - a) * 80}px 0px`,
                border: mid && pick > 0 ? `4px solid ${C.amber}` : '4px solid transparent',
              }}
            >
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>JOB POST · {p.co.toUpperCase()}</div>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 46, color: C.ink, whiteSpace: 'nowrap'}}>Your exact role</div>
                  <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 28, color: C.muted, whiteSpace: 'nowrap'}}>Same city · full time</div>
                </div>
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 64, color: C.ink, whiteSpace: 'nowrap', marginRight: 10}}>
                  {mid ? (
                    <Circle color={C.amber} strokeWidth={6} seed={8} padding={{left: 14, right: 14, top: 10, bottom: 10}} progress={pick}>
                      <span>{p.pay}</span>
                    </Circle>
                  ) : (
                    p.pay
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {pill > 0 && (
          <div style={{position: 'absolute', left: 90, top: 1100, opacity: interpolate(pill, [0, 0.4], [0, 1], CL), scale: String(interpolate(t, [6.0, 6.3], [1.3, 1], {...CL, easing: OUT})), transformOrigin: 'left center'}}>
            <div style={{background: C.green, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 36, padding: '8px 24px', borderRadius: 999, whiteSpace: 'nowrap'}}>YOUR NUMBER: $80k</div>
          </div>
        )}
      </Push>
      <Sfx at={1.4} name="whoosh" volume={0.18} />
      <Sfx at={2.7} name="whoosh" volume={0.18} />
      <Sfx at={3.7} name="whoosh" volume={0.18} />
      <Sfx at={5.7} name="snip" volume={0.26} />
      <Sfx at={6.0} name="ping" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: know your number.', start: 0.6, end: 2.45, key: 'number', se: 2.14},
          {text: 'Pull three job posts for your exact role and city.', start: 2.56, end: 5.55, key: 'three', se: 5.21},
          {text: 'Bring the middle one.', start: 5.7, end: 6.75, key: 'middle', se: 6.3},
        ]}
      />
    </Paper>
  );
};

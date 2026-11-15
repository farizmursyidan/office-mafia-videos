import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, INOUT, Mark, Paper, Pill, RAJ, Sun, YOU, card, ez, useT} from './kit';

/* 1. Hook: next week's calendar is already blocked OUT OF OFFICE (sun spinning, bar sweeping in).
   "Covering: Sam" lands on it. Below, the Acme renewal card: Owner flips from You to Sam, circled, "Keeps it". */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
export const Hook: React.FC = () => {
  const {t} = useT();
  const bar = interpolate(t, [0, 0.45], [0.55, 1], {...CL, easing: Easing.out(Easing.cubic)});
  const cover = interpolate(t, [2.2, 2.55], [0, 1], {...CL, easing: POP});
  const proj = ez(t, 3.0, 0.45);
  const flip = interpolate(t, [4.4, 4.8], [0, 1], {...CL, easing: INOUT});
  const ring = interpolate(t, [5.0, 5.6], [0, 1], {...CL, easing: INOUT});
  const keep = interpolate(t, [5.3, 5.65], [0, 1], {...CL, easing: POP});
  const progress = interpolate(t, [0, 6.2], [0.62, 0.8], CL);
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 400, z: 1.08},
          {t: 1.8, x: 540, y: 400, z: 1.0},
          {t: 3.2, x: 540, y: 400, z: 1.0},
          {t: 6.2, x: 540, y: 900, z: 1.05},
        ]}
      >
        {/* next week's calendar */}
        <div style={{...card, top: 190, height: 430, padding: '28px 40px', boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>NEXT WEEK</div>
          </div>
          <div style={{display: 'flex', marginTop: 26}}>
            {DAYS.map((d, i) => (
              <div key={d} style={{flex: 1, textAlign: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>
                {d}
                <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted, marginTop: 4}}>{5 + i}</div>
              </div>
            ))}
          </div>
          <div style={{position: 'relative', marginTop: 22, height: 110}}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: 110,
                width: `${bar * 100}%`,
                borderRadius: 24,
                background: C.amber,
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                padding: '0 30px',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              <div style={{rotate: `${t * 40}deg`, display: 'flex'}}>
                <Sun size={56} color={C.ink} />
              </div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink, whiteSpace: 'nowrap'}}>Out of office</div>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 26, height: 64}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.muted}}>Covering:</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, opacity: cover, translate: `${(1 - cover) * 30}px 0px`, scale: String(0.9 + 0.1 * cover)}}>
              <Av i="SA" bg={RAJ.shirt} size={58} />
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>Sam</div>
            </div>
          </div>
        </div>
        {/* the project */}
        <div style={{...card, top: 680, height: 390, padding: '28px 40px', boxSizing: 'border-box', opacity: 0.4 + 0.6 * proj, translate: `0px ${(1 - proj) * 30}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>PROJECT</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 48, color: C.ink, marginTop: 8}}>Acme renewal</div>
          <div style={{marginTop: 22, height: 26, borderRadius: 13, background: '#F1EEE9', position: 'relative'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${progress * 100}%`, borderRadius: 13, background: C.green}} />
          </div>
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted, marginTop: 8}}>{Math.round(progress * 100)}% done, by you</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 26}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.muted}}>Owner:</div>
            <div style={{position: 'relative', width: 230, height: 70, marginLeft: 40}}>
              <div style={{position: 'absolute', left: 0, top: 4, display: 'flex', alignItems: 'center', gap: 12, opacity: 1 - flip, translate: `0px ${-flip * 24}px`}}>
                <Av i="YOU" bg={YOU.shirt} size={58} fg={C.ink} />
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>You</div>
              </div>
              <div style={{position: 'absolute', left: 0, top: 4, opacity: flip, translate: `0px ${(1 - flip) * 24}px`}}>
                <Circle color={C.red} strokeWidth={5} iterations={1} seed={7} padding={{top: 8, bottom: 8, left: 12, right: 18}} progress={ring}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <Av i="SA" bg={RAJ.shirt} size={58} />
                    <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>Sam</div>
                  </div>
                </Circle>
              </div>
            </div>
          </div>
          <Pill p={keep} bg={C.red} size={28} style={{right: 40, bottom: 52}}>
            Keeps it
          </Pill>
        </div>
      </Camera>
      <Sfx at={0.0} name="whoosh" volume={0.18} />
      <Sfx at={2.2} name="pop" volume={0.26} />
      <Sfx at={4.4} name="snip" volume={0.24} />
      <Sfx at={5.3} name="hit" volume={0.24} />
      <Caps
        top={1290}
        caps={[
          {text: "You're going on vacation next week.", start: 0.25, end: 2.05, key: 'vacation', se: 1.76},
          {text: 'Someone is covering for you.', start: 2.16, end: 3.85, key: 'covering', se: 3.37},
          {text: 'And they might not give your work back.', start: 3.95, end: 6.15, key: 'work back', se: 5.78},
        ]}
      />
    </Paper>
  );
};

import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, Mark, Paper, Pill, TOM, YOU, card, ez, useT} from './kit';

/* 1. Hook: the group project board is on screen from frame 0. Every task flips to done with YOUR avatar on it while
   Dan's tally stays at 0. Then a review card slides in: You and Dan, both "Meets expectations", and a red "Same rating" pill. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const TASKS = ['Research', 'Slides', 'Client section', 'Final edit'];
const lbl: React.CSSProperties = {fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted};

const Check: React.FC<{p: number}> = ({p}) => (
  <div style={{width: 44, height: 44, borderRadius: 12, background: p > 0.5 ? C.green : '#EEEAE4', display: 'flex', alignItems: 'center', justifyContent: 'center', scale: String(0.85 + 0.15 * p), flexShrink: 0}}>
    <svg width={26} height={26} viewBox="0 0 26 26" style={{opacity: p}}>
      <path d="M5 13 L11 19 L21 7" stroke={C.white} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const Rating: React.FC<{p: number; i: string; bg: string; name: string; note: string}> = ({p, i, bg, name, note}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 22, opacity: p, translate: `0px ${(1 - p) * 20}px`}}>
    <Av i={i} bg={bg} size={60} />
    <div style={{flex: 1}}>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.white}}>{name}</div>
      <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, color: '#8A8379'}}>{note}</div>
    </div>
    <div style={{background: '#2E2E2E', color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 26, padding: '10px 20px', borderRadius: 14, whiteSpace: 'nowrap'}}>Meets expectations</div>
  </div>
);

export const Hook: React.FC = () => {
  const {t} = useT();
  const board = interpolate(t, [0, 0.4], [0.9, 1], {...CL, easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const done = TASKS.map((_, k) => interpolate(t, [0.3 + k * 0.55, 0.6 + k * 0.55], [0, 1], {...CL, easing: POP}));
  const youN = done.filter((d) => d > 0.5).length;
  const zero = interpolate(t, [2.7, 3.1], [0, 1], {...CL, easing: POP});
  const review = ez(t, 4.3, 0.55);
  const r1 = ez(t, 4.6, 0.4);
  const r2 = ez(t, 5.0, 0.4);
  const same = interpolate(t, [5.7, 6.05], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 420, z: 1.06},
          {t: 3.4, x: 540, y: 480, z: 1.0},
          {t: 5.0, x: 540, y: 900, z: 1.03},
          {t: 6.8, x: 540, y: 950, z: 1.05},
        ]}
      >
        {/* project board */}
        <div style={{...card, top: 190, height: 500, padding: '28px 40px', boxSizing: 'border-box', scale: String(board)}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.ink}}>Group project</div>
            <div style={lbl}>OWNER</div>
          </div>
          {TASKS.map((task, k) => (
            <div key={task} style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 18}}>
              <Check p={done[k]} />
              <div style={{flex: 1, fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.ink}}>{task}</div>
              <div style={{opacity: done[k], scale: String(0.7 + 0.3 * done[k])}}>
                <Av i="YOU" bg={YOU.shirt} size={50} fg={C.ink} />
              </div>
            </div>
          ))}
          <div style={{position: 'absolute', left: 40, right: 40, bottom: 26, display: 'flex', gap: 20}}>
            <div style={{flex: 1, background: 'rgba(224,169,59,0.18)', borderRadius: 16, padding: '10px 18px', fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.ink}}>You: {youN} tasks</div>
            <div style={{flex: 1, background: '#F1EEE9', borderRadius: 16, padding: '10px 18px', fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.ink, display: 'flex', justifyContent: 'space-between'}}>
              <span>Dan: 0 tasks</span>
              <span style={{color: C.red, opacity: zero}}>?!</span>
            </div>
          </div>
        </div>
        {/* review results */}
        <div style={{...card, top: 740, height: 360, padding: '28px 40px', boxSizing: 'border-box', background: '#1C1C1C', opacity: review, translate: `0px ${(1 - review) * 60}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '2px solid #2E2E2E'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.white}}>Review ratings</div>
            <div style={{...lbl, color: '#8A8379'}}>Q4</div>
          </div>
          <Rating p={r1} i="YOU" bg={YOU.shirt} name="You" note="Did 4 of 4 tasks" />
          <Rating p={r2} i="DA" bg={TOM.shirt} name="Dan" note="Did 0 of 4 tasks" />
        </div>
        <Pill p={same} bg={C.red} size={28} style={{left: 100, top: 1060}}>
          Same rating
        </Pill>
      </Camera>
      {TASKS.map((_, k) => (
        <Sfx key={k} at={0.3 + k * 0.55} name="pop" volume={0.16} />
      ))}
      <Sfx at={2.7} name="blip" volume={0.2} />
      <Sfx at={4.3} name="whoosh" volume={0.16} />
      <Sfx at={5.7} name="hit" volume={0.2} />
      <Caps
        top={1290}
        caps={[
          {text: 'Your teammate did nothing on the group project.', start: 0.2, end: 3.03, key: 'nothing', se: 2.82},
          {text: 'You covered for them.', start: 3.09, end: 4.44, key: 'covered', se: 4.28},
          {text: "And now you're both getting the same rating.", start: 4.5, end: 6.7, key: 'same rating', se: 6.32},
        ]}
      />
    </Paper>
  );
};

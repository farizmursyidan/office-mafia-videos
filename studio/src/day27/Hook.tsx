import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Desk, Person, Plant} from '../characters';
import {Av, Bub, CL, Camera, Caps, DANA, INOUT, Mark, Paper, Pill, TOM, YOU, card, ez, useT} from './kit';

/* 1. Hook: one promotion, two names. Tom's visibility bar climbs as his campaign moves pop in (coffee with Dana, led the demo, CC'd the VP). Yours sits flat. Below, Tom chats up the boss while you work heads down. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const MOVES = [
  {at: 2.8, text: 'Coffee with Dana'},
  {at: 3.4, text: 'Led the demo'},
  {at: 4.0, text: "CC'd the VP"},
];
const Bar: React.FC<{w: number; color: string}> = ({w, color}) => (
  <div style={{position: 'relative', width: 560, height: 26, borderRadius: 999, background: '#EEEAE4'}}>
    <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${w * 100}%`, borderRadius: 999, background: color}} />
  </div>
);
export const Hook: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const tomBar = interpolate(t, [0.1, 4.6], [0.18, 0.9], {...CL, easing: INOUT});
  const youBar = 0.32 + Math.sin(t * 1.5) * 0.008;
  const office = ez(t, 2.3, 0.5);
  const heads = interpolate(t, [5.1, 5.45], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 420, z: 1.06},
          {t: 2.2, x: 540, y: 420, z: 1.0},
          {t: 2.9, x: 540, y: 900, z: 1.0},
          {t: 6.8, x: 540, y: 900, z: 1.04},
        ]}
      >
        {/* Promotion board */}
        <div style={{...card, top: 180, height: 450, padding: '30px 40px', boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 44, color: C.ink, whiteSpace: 'nowrap'}}>Team Lead promotion</div>
            <div style={{marginLeft: 'auto', background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, padding: '8px 18px', borderRadius: 999, whiteSpace: 'nowrap'}}>1 SPOT</div>
          </div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.muted, marginTop: 22}}>WHO DANA THINKS OF FIRST</div>
          {/* Tom */}
          <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 20}}>
            <Av i="TO" bg={TOM.shirt} size={76} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink, marginBottom: 8}}>Tom</div>
              <Bar w={tomBar} color={C.red} />
            </div>
          </div>
          <div style={{position: 'relative', height: 46, marginTop: 10, marginLeft: 98}}>
            {MOVES.map((m, i) => {
              const p = interpolate(t, [m.at, m.at + 0.35], [0, 1], {...CL, easing: POP});
              return (
                <div
                  key={m.text}
                  style={{
                    position: 'absolute',
                    left: [0, 262, 476][i],
                    top: 0,
                    opacity: Math.min(1, p * 1.5),
                    scale: String(0.7 + 0.3 * p),
                    transformOrigin: 'left center',
                    background: '#FBEDEC',
                    color: C.red,
                    fontFamily: SANS,
                    fontWeight: 800,
                    fontSize: 24,
                    padding: '7px 14px',
                    borderRadius: 999,
                    whiteSpace: 'nowrap',
                  }}
                >
                  + {m.text}
                </div>
              );
            })}
          </div>
          {/* You */}
          <div style={{display: 'flex', alignItems: 'center', gap: 22, marginTop: 16}}>
            <Av i="ME" bg={YOU.shirt} size={76} fg={C.ink} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink, marginBottom: 8}}>You</div>
              <Bar w={youBar} color={C.amber} />
            </div>
          </div>
        </div>
        {/* Office panel */}
        <div style={{...card, top: 670, height: 500, overflow: 'hidden', background: '#F6F2EC', opacity: 0.35 + 0.65 * office}}>
          <svg width={940} height={500} style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={0} y={420} width={940} height={80} fill="#DDD5C8" />
            <Plant x={60} y={420} />
            <Desk x={300} y={360} w={280} laptop screenGlow={0.5 + 0.5 * Math.sin(t * 3)} />
            <Person x={170} y={450} scale={0.85} facing={1} sitting bob={breathe(0)} armL={62 + Math.sin(t * 9) * 4} {...YOU} />
            <Person x={820} y={450} scale={0.85} facing={-1} bob={breathe(1)} badge="BOSS" {...DANA} />
            <Person x={interpolate(t, [0, 2.6], [560, 650], {...CL, easing: INOUT})} y={450} scale={0.85} facing={1} bob={breathe(2)} walk={t < 2.6 ? t * 9 : undefined} armL={t > 2.8 ? 64 : 0} {...TOM} />
          </svg>
          <Pill p={heads} bg={C.ink} size={26} style={{left: 60, top: 40}}>
            HEADS DOWN
          </Pill>
        </div>
        <Bub at={2.75} left={420} top={716} width={350} tail="right" size={36}>
          Got a sec, Dana?
        </Bub>
      </Camera>
      <Sfx at={0.2} name="blip" volume={0.26} />
      <Sfx at={2.75} name="pop" volume={0.3} />
      <Sfx at={2.8} name="click" volume={0.24} />
      <Sfx at={3.4} name="click" volume={0.24} />
      <Sfx at={4.0} name="click" volume={0.24} />
      <Sfx at={5.1} name="hit" volume={0.28} />
      <Caps
        top={1290}
        caps={[
          {text: 'Someone on your team wants your promotion.', start: 0.34, end: 2.6, key: 'promotion', se: 2.27},
          {text: 'They started campaigning last month.', start: 2.76, end: 4.95, key: 'campaigning', se: 4.62},
          {text: "And you haven't noticed yet.", start: 5.08, end: 6.7, key: 'noticed', se: 6.0},
        ]}
      />
    </Paper>
  );
};

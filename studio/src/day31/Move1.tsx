import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person} from '../characters';
import {CL, Caps, DANA, INOUT, KAREN, Label, Mark, Paper, Pill, Push, YOU, card, ez, mix, useT} from './kit';

/* 3. Move 1: the party timeline 6 PM to 10 PM. "Bosses" fills 6:00 to 7:15 (highlighted), "Music: loud" fills 8 to 10,
   then "You" fills 6:00 to 7:15 too. Below, Karen and Dana head for the door, and you follow them out. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const HOURS = ['6 PM', '7', '8', '9', '10'];
const W = 640; // width of the bar track, 6 PM to 10 PM
const x = (h: number) => ((h - 6) / 4) * W;
const ROWS = [
  {name: 'Bosses', from: 6, to: 7.25, color: DANA.shirt, at: 3.5},
  {name: 'Music', from: 8, to: 10, color: C.red, at: 5.9, tag: 'loud'},
  {name: 'You', from: 6, to: 7.25, color: C.amber, at: 7.9},
];
export const Move1: React.FC = () => {
  const {t} = useT();
  const tl = ez(t, 0.2, 0.5);
  const hl = interpolate(t, [4.2, 4.8], [0, 1], {...CL, easing: INOUT});
  const people = ez(t, 0.4, 0.6);
  const bossGo = interpolate(t, [6.0, 8.6], [0, 1], {...CL, easing: INOUT});
  const youGo = interpolate(t, [7.9, 9.3], [0, 1], {...CL, easing: INOUT});
  const same = interpolate(t, [8.4, 8.75], [0, 1], {...CL, easing: POP});
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Early in, early out" />
        {/* party timeline */}
        <div style={{...card, top: 440, height: 380, padding: '26px 40px', boxSizing: 'border-box', opacity: tl, translate: `0px ${(1 - tl) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>PARTY NIGHT</div>
          <div style={{position: 'relative', marginLeft: 180, marginTop: 18, height: 34}}>
            {HOURS.map((h, i) => (
              <div key={h} style={{position: 'absolute', left: x(6 + i) - 10, fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted, whiteSpace: 'nowrap'}}>
                {h}
              </div>
            ))}
          </div>
          {ROWS.map((r) => {
            const p = interpolate(t, [r.at, r.at + 0.6], [0, 1], {...CL, easing: INOUT});
            const label = <span style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink, padding: '0 6px'}}>{r.name}</span>;
            return (
              <div key={r.name} style={{display: 'flex', alignItems: 'center', height: 76, marginTop: 6}}>
                <div style={{width: 180}}>
                  {r.name === 'Bosses' ? (
                    <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={5} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={hl}>
                      {label}
                    </Highlight>
                  ) : (
                    label
                  )}
                </div>
                <div style={{position: 'relative', width: W, height: 56, borderRadius: 16, background: '#F1EEE9'}}>
                  <div
                    style={{
                      position: 'absolute',
                      left: x(r.from),
                      top: 0,
                      height: 56,
                      width: (x(r.to) - x(r.from)) * p,
                      borderRadius: 16,
                      background: r.color,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 18,
                      boxSizing: 'border-box',
                      overflow: 'hidden',
                      opacity: Math.min(1, p * 5),
                    }}
                  >
                    {r.tag && <span style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, color: C.white, whiteSpace: 'nowrap'}}>{r.tag}</span>}
                  </div>
                </div>
              </div>
            );
          })}
          <Pill p={same} bg={C.green} size={24} style={{right: 40, top: 20}}>
            Leave with them
          </Pill>
        </div>
        {/* heading for the door */}
        <AbsoluteFill style={{opacity: people}}>
          <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
            {/* door */}
            <rect x={900} y={880} width={150} height={290} rx={8} fill="#B98A5E" />
            <rect x={915} y={895} width={120} height={275} rx={4} fill="#2E2E35" opacity={0.85} />
            <rect x={930} y={850} width={90} height={26} rx={6} fill={C.green} />
            <text x={975} y={870} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={20} fill={C.white}>
              EXIT
            </text>
            <Person x={mix(500, 960, bossGo)} y={1170} scale={0.74} facing={1} walk={bossGo > 0 && bossGo < 1 ? t * 9 : undefined} bob={breathe(0)} opacity={1 - interpolate(bossGo, [0.85, 1], [0, 1], CL)} {...DANA} />
            <Person x={mix(640, 1000, bossGo)} y={1170} scale={0.74} facing={1} walk={bossGo > 0 && bossGo < 1 ? t * 9 + 1 : undefined} bob={breathe(1.2)} opacity={1 - interpolate(bossGo, [0.7, 0.9], [0, 1], CL)} {...KAREN} />
            <Person x={mix(240, 960, youGo)} y={1170} scale={0.74} facing={1} walk={youGo > 0 && youGo < 1 ? t * 9 + 2 : undefined} bob={breathe(2.4)} opacity={1 - interpolate(youGo, [0.88, 1], [0, 1], CL)} {...YOU} />
          </svg>
          {[0, 1, 2].map((i) => {
            const p = interpolate(t, [5.9 + i * 0.25, 6.3 + i * 0.25], [0, 1], {...CL, easing: POP});
            return (
              <div key={i} style={{position: 'absolute', left: 50 + i * 55, top: 850 + Math.sin(t * 3 + i) * 8 - i * 16, fontFamily: SANS, fontWeight: 900, fontSize: 56, color: C.red, opacity: p, scale: String(0.6 + 0.4 * p)}}>
                ♪
              </div>
            );
          })}
        </AbsoluteFill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      {ROWS.map((r) => (
        <Sfx key={r.name} at={r.at} name="pop" volume={0.22} />
      ))}
      <Sfx at={8.4} name="ping" volume={0.24} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: arrive early, leave early.', start: 0.67, end: 3.4, key: 'early', se: 3.14},
          {text: 'The first hour is when the bosses are there.', start: 3.47, end: 5.8, key: 'first hour', se: 5.33},
          {text: 'When the music gets loud, they leave.', start: 5.89, end: 7.84, key: 'loud leave', se: 7.69},
          {text: 'So do you.', start: 7.89, end: 8.85, key: 'you', se: 8.29},
        ]}
      />
    </Paper>
  );
};

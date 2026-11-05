import React from 'react';
import {interpolate} from 'remotion';
import {Highlight, StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, Paper, Pill, Push, card, ez, useT} from './kit';

/* 5. Move 3: one page with three wins goes into the room your boss sits in and you don't. */
const WINS = [
  {a: 'Renewals up ', b: '18%', at: 3.91},
  {a: 'Vendor costs down ', b: '$40K', at: 4.3},
  {a: 'Led ', b: '3 launches', at: 4.7},
];
const SEATS = [
  {i: 'VP', bg: '#5B8C5A'},
  {i: 'HR', bg: '#9A5BB0'},
  {i: 'DA', bg: '#3F6FB5'},
];
export const Move3: React.FC = () => {
  const {t} = useT();
  const page = ez(t, 0.15, 0.55);
  const room = ez(t, 0.5, 0.55);
  const lit = ez(t, 6.2, 0.4);
  const hl = interpolate(t, [4.97, 5.5], [0, 1], {...CL, easing: INOUT});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Write their pitch" />
        <div style={{...card, top: 430, height: 450, padding: '26px 34px', opacity: page, translate: `0px ${(1 - page) * 50}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>THE CASE FOR YOU</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 56, color: C.ink, marginTop: 10, whiteSpace: 'nowrap'}}>Senior analyst, by June</div>
          <div style={{marginTop: 12, borderTop: '2px solid #EEEAE4'}}>
            {WINS.map((w, i) => {
              const p = ez(t, w.at, 0.4);
              return (
                <div key={w.a} style={{height: 88, display: 'flex', alignItems: 'center', gap: 18, borderBottom: '2px solid #EEEAE4', opacity: 0.25 + 0.75 * p}}>
                  <div style={{width: 52, height: 52, borderRadius: '50%', background: p > 0.5 ? C.amber : '#F0EBE3', color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{i + 1}</div>
                  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, color: C.ink, whiteSpace: 'nowrap', translate: `${(1 - p) * -14}px 0px`}}>
                    {w.a}
                    <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={11 + i} padding={{left: 3, right: 3, top: 0, bottom: 0}} progress={hl}>
                      <span style={{fontWeight: 900}}>{w.b}</span>
                    </Highlight>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Pill p={ez(t, 3.07, 0.3)} bg={C.ink} size={28} style={{right: 104, top: 452}}>
          ONE PAGE
        </Pill>
        <div style={{...card, top: 905, height: 225, padding: '20px 34px', background: C.night, opacity: room, translate: `0px ${(1 - room) * 50}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.amber}}>PROMOTION MEETING, FRIDAY</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 18}}>
            {SEATS.map((a) => {
              const boss = a.i === 'DA';
              return (
                <div key={a.i} style={{borderRadius: '50%', opacity: boss ? 0.45 + 0.55 * lit : 0.45, boxShadow: boss ? `0 0 0 ${6 * lit}px ${C.amber}` : 'none'}}>
                  <Av i={a.i} bg={a.bg} size={104} />
                </div>
              );
            })}
            <div style={{display: 'flex', flexDirection: 'column', gap: 4, marginLeft: 18, alignItems: 'center'}}>
              <div style={{opacity: 0.4 + 0.6 * lit}}>
                <Av i="YOU" bg="transparent" dashed size={104} />
              </div>
            </div>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 38, lineHeight: 1.1, color: C.white, opacity: ez(t, 7.2, 0.4)}}>
              <StrikeThrough color={C.red} strokeWidth={6} seed={3} progress={interpolate(t, [7.3, 7.8], [0, 1], {...CL, easing: INOUT})}>
                <span>Your seat</span>
              </StrikeThrough>
            </div>
          </div>
        </div>
      </Push>
      <Sfx at={3.07} name="click" volume={0.28} />
      <Sfx at={3.91} name="click" volume={0.26} />
      <Sfx at={4.3} name="click" volume={0.26} />
      <Sfx at={4.7} name="click" volume={0.26} />
      <Sfx at={6.2} name="blip" volume={0.3} />
      <Sfx at={7.3} name="hit" volume={0.36} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: write their pitch.', start: 0.53, end: 2.9, key: 'pitch', se: 2.58},
          {text: 'One page, three wins, real numbers.', start: 3.07, end: 6.05, key: 'numbers', se: 5.69},
          {text: "Your boss has to sell you in a room you're not in.", start: 6.21, end: 9.0, key: 'sell', se: 8.58},
        ]}
      />
    </Paper>
  );
};

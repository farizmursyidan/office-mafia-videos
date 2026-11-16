import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, Glass, INOUT, Label, Mark, Msg, Paper, Pill, Push, RAJ, TOM, YOU, card, ez, useT} from './kit';

/* 5. Move 3: drinks by 10 PM. You: one glass all night (circled). Raj 3, Tom 5, counting up.
   Below, Monday's team chat: "Did anyone see Tom at the party??" and the replies pile up; "Promotion: on hold" lands. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const ROWS = [
  {i: 'YOU', name: 'You', bg: YOU.shirt, n: 1, fg: C.ink},
  {i: 'RA', name: 'Raj', bg: RAJ.shirt, n: 3, fg: C.white},
  {i: 'TO', name: 'Tom', bg: TOM.shirt, n: 5, fg: C.white},
];
export const Move3: React.FC = () => {
  const {t} = useT();
  const tally = ez(t, 0.2, 0.5);
  const ring = interpolate(t, [2.2, 2.8], [0, 1], {...CL, easing: INOUT});
  const chat = ez(t, 0.5, 0.5);
  const m1 = interpolate(t, [1.0, 1.35], [0, 1], {...CL, easing: POP});
  const m2 = interpolate(t, [3.6, 3.95], [0, 1], {...CL, easing: POP});
  const m3 = interpolate(t, [4.8, 5.15], [0, 1], {...CL, easing: POP});
  const hold = interpolate(t, [7.0, 7.35], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Hold one drink" />
        {/* drinks tally */}
        <div style={{...card, top: 440, height: 330, padding: '24px 40px', boxSizing: 'border-box', opacity: tally, translate: `0px ${(1 - tally) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>DRINKS BY 10 PM</div>
          {ROWS.map((r, ri) => {
            const shown = Math.min(r.n, Math.floor(interpolate(t, [0.6, 3.0], [1, r.n + 0.99], CL)));
            return (
              <div key={r.i} style={{display: 'flex', alignItems: 'center', height: 84, borderBottom: ri < 2 ? '2px solid #EEEAE4' : 'none'}}>
                <div style={{width: 230}}>
                  {r.name === 'You' ? (
                    <Circle color={C.green} strokeWidth={5} iterations={1} seed={6} padding={{top: 4, bottom: 4, left: 10, right: 14}} progress={ring}>
                      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                        <Av i={r.i} bg={r.bg} size={48} fg={r.fg} />
                        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>{r.name}</div>
                      </div>
                    </Circle>
                  ) : (
                    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                      <Av i={r.i} bg={r.bg} size={48} fg={r.fg} />
                      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>{r.name}</div>
                    </div>
                  )}
                </div>
                <div style={{display: 'flex', gap: 14, alignItems: 'center'}}>
                  {Array.from({length: shown}, (_, k) => (
                    <Glass key={k} size={40} fill={r.name === 'You' ? 0.75 - 0.3 * Math.min(1, t / 8) : 0.15} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {/* Monday's team chat */}
        <div style={{...card, top: 800, height: 360, padding: '24px 36px', boxSizing: 'border-box', opacity: chat, translate: `0px ${(1 - chat) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>TEAM CHAT, MONDAY</div>
            <Pill p={hold} bg={C.red} size={22} style={{position: 'relative'}}>
              Tom's promotion: on hold
            </Pill>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20}}>
            <Msg p={m1} size={32}>
              Did anyone see Tom at the party??
            </Msg>
            <Msg p={m2} size={32}>The karaoke. With the CEO.</Msg>
            <Msg p={m3} size={32}>
              Someone filmed it.
            </Msg>
          </div>
        </div>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={2.2} name="snip" volume={0.2} />
      <Sfx at={1.0} name="ping" volume={0.22} />
      <Sfx at={3.6} name="ping" volume={0.22} />
      <Sfx at={4.8} name="ping" volume={0.22} />
      <Sfx at={7.0} name="hit" volume={0.24} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: hold one drink all night.', start: 0.67, end: 3.4, key: 'one drink', se: 3.01},
          {text: 'Nobody gets promoted for a great story from the party.', start: 3.47, end: 6.35, key: 'promoted story', se: 5.85},
          {text: 'Plenty get passed over for one.', start: 6.43, end: 8.4, key: 'passed over', se: 7.76},
        ]}
      />
    </Paper>
  );
};

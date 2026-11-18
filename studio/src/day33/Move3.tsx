import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Desk, Person} from '../characters';
import {Av, Bub, CL, Caps, DANA, INOUT, Label, Mark, Msg, Paper, Pill, Push, RAJ, YOU, card, ez, useT} from './kit';

/* 5. Move 3: back in #team-launch. The old lines are dimmed; "Done. Updated file attached." posts with a file chip,
   reactions land on it, and it is circled as the last word in the thread. Below, Dana reads it at her desk. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
export const Move3: React.FC = () => {
  const {t} = useT();
  const thread = ez(t, 0.15, 0.5);
  const done = interpolate(t, [4.75, 5.15], [0, 1], {...CL, easing: POP});
  const file = interpolate(t, [5.6, 5.95], [0, 1], {...CL, easing: POP});
  const reacts = interpolate(t, [6.4, 6.75], [0, 1], {...CL, easing: POP});
  const ring = interpolate(t, [7.3, 7.9], [0, 1], {...CL, easing: INOUT});
  const last = interpolate(t, [7.85, 8.2], [0, 1], {...CL, easing: POP});
  const people = ez(t, 0.6, 0.6);
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const glow = 0.5 + 0.5 * Math.sin(t * 2);
  const row: React.CSSProperties = {fontFamily: SANS, fontWeight: 800, fontSize: 28, lineHeight: 1.25, color: '#B4ADA3'};
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Close the loop" />
        <div style={{...card, top: 440, height: 452, padding: '22px 36px', boxSizing: 'border-box', opacity: thread, translate: `0px ${(1 - thread) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink, paddingBottom: 14, borderBottom: '2px solid #EEEAE4'}}># team-launch</div>
          <div style={{display: 'flex', gap: 14, alignItems: 'center', marginTop: 14}}>
            <Av i="RA" bg={RAJ.shirt} size={40} />
            <div style={row}>Raj: your Q3 numbers are wrong.</div>
          </div>
          <div style={{display: 'flex', gap: 14, alignItems: 'center', marginTop: 10}}>
            <Av i="YOU" bg={YOU.shirt} size={40} fg={C.ink} />
            <div style={row}>You: Good catch. Fixing it by three.</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 14, fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted, opacity: 1 - done * 0.0}}>
            <div style={{flex: 1, height: 2, background: '#EEEAE4'}} />
            2:48 PM
            <div style={{flex: 1, height: 2, background: '#EEEAE4'}} />
          </div>
          {/* the closing message */}
          <div style={{marginTop: 30, marginLeft: 34, display: 'flex', alignItems: 'center', gap: 18}}>
            {done > 0.01 ? (
              <Circle color={C.amber} strokeWidth={6} iterations={1} seed={11} padding={{top: 4, bottom: 6, left: 10, right: 10}} progress={ring}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                  <Msg p={done} out size={36}>
                    Done. Updated file attached.
                  </Msg>
                </div>
              </Circle>
            ) : (
              <div style={{height: 80, flex: 1, borderRadius: 24, border: '3px dashed #E2DBD0'}} />
            )}
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 24}}>
            <div style={{opacity: file, scale: String(0.85 + 0.15 * file), transformOrigin: 'left center', display: 'flex', alignItems: 'center', gap: 10, background: '#F6F2EC', borderRadius: 16, padding: '10px 18px', fontFamily: SANS, fontWeight: 900, fontSize: 26, color: C.ink}}>
              <div style={{width: 26, height: 32, borderRadius: 4, background: C.red}} />
              Q3_deck_v2.pdf
            </div>
            <div style={{opacity: reacts, scale: String(0.85 + 0.15 * reacts), transformOrigin: 'left center', background: 'rgba(46,158,91,0.14)', borderRadius: 999, padding: '8px 18px', fontFamily: SANS, fontWeight: 900, fontSize: 26, color: C.green, whiteSpace: 'nowrap'}}>
              +1  12
            </div>
            <div style={{marginLeft: 'auto', opacity: last, scale: String(0.85 + 0.15 * last), background: C.amber, borderRadius: 999, padding: '8px 20px', fontFamily: SANS, fontWeight: 900, fontSize: 26, color: C.ink, whiteSpace: 'nowrap'}}>Last word: yours</div>
          </div>
        </div>
        {/* Dana reads it at her desk */}
        <AbsoluteFill style={{opacity: people}}>
          <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
            <Person x={250} y={1175} scale={0.66} facing={1} armL={12} bob={breathe(0)} {...YOU} />
            <Person x={860} y={1175} scale={0.66} facing={-1} sitting armL={55} bob={breathe(1.3)} {...DANA} />
            <Desk x={700} y={1080} w={220} laptop screenGlow={glow} />
          </svg>
          <Bub at={8.0} left={540} top={905} size={30} tail="right">
            Handled well.
          </Bub>
        </AbsoluteFill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.22} />
      <Sfx at={4.75} name="send" volume={0.24} />
      <Sfx at={5.6} name="pop" volume={0.2} />
      <Sfx at={6.4} name="pop" volume={0.2} />
      <Sfx at={7.3} name="snip" volume={0.18} />
      <Sfx at={8.0} name="ping" volume={0.2} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: close the loop in public.', start: 0.78, end: 3.2, key: 'loop public', se: 2.88},
          {text: 'When it\'s fixed, post "Done. Updated file attached."', start: 3.24, end: 7.0, key: 'done', se: 6.4},
          {text: 'Now the last word in the thread is yours.', start: 7.08, end: 9.5, key: 'last word', se: 8.8},
        ]}
      />
    </Paper>
  );
};

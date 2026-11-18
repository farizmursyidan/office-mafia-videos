import React from 'react';
import {Easing, interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Av, CL, Caps, DANA, INOUT, Label, Mark, Msg, Paper, Pill, Push, RAJ, YOU, card, ez, useT} from './kit';

/* 4. Move 2: the public thread (with Dana, your boss, in the channel) stays calm. A private DM to Raj opens with a
   lock and the line "Next time, can you flag it to me first?" types and sends. Then an angry reply drafted in the
   public thread is crossed off: your boss can scroll. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const DM = 'Next time, can you flag it to me first?';
const STEPS = [{text: DM, from: 6.05, to: 7.45, mode: 'type' as const}];
const ANGRY = 'Maybe check YOUR numbers, Raj.';
export const Move2: React.FC = () => {
  const {f, t} = useT();
  const pub = ez(t, 0.15, 0.5);
  const dm = ez(t, 1.3, 0.55);
  const lock = interpolate(t, [2.0, 2.35], [0, 1], {...CL, easing: POP});
  const sent = interpolate(t, [7.55, 7.9], [0, 1], {...CL, easing: POP});
  const angry = ez(t, 8.25, 0.4);
  const cross = interpolate(t, [9.0, 9.55], [0, 1], {...CL, easing: INOUT});
  const scroll = interpolate(t, [8.75, 9.1], [0, 1], {...CL, easing: POP});
  const caret = Math.floor(t * 2.5) % 2 === 0 ? '|' : '';
  const typed = typedText(f, STEPS);
  const row: React.CSSProperties = {fontFamily: SANS, fontWeight: 800, fontSize: 30, lineHeight: 1.25, color: C.muted};
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Take it private" />
        {/* public thread */}
        <div style={{...card, top: 440, height: 360, padding: '22px 36px', boxSizing: 'border-box', opacity: pub, translate: `0px ${(1 - pub) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}># team-launch</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <Av i="DA" bg={DANA.shirt} size={46} />
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 22, letterSpacing: 2, color: C.white, background: DANA.shirt, borderRadius: 999, padding: '4px 14px'}}>BOSS</div>
            </div>
          </div>
          <div style={{display: 'flex', gap: 14, alignItems: 'center', marginTop: 16}}>
            <Av i="RA" bg={RAJ.shirt} size={44} />
            <div style={row}>
              <span style={{color: C.ink, fontWeight: 900}}>Raj:</span> your Q3 numbers are wrong.
            </div>
          </div>
          <div style={{display: 'flex', gap: 14, alignItems: 'center', marginTop: 12}}>
            <Av i="YOU" bg={YOU.shirt} size={44} fg={C.ink} />
            <div style={row}>
              <span style={{color: C.ink, fontWeight: 900}}>You:</span> Good catch. Fixing it by three.
            </div>
          </div>
          {/* compose row: empty, then the angry draft that gets crossed off */}
          <div style={{marginTop: 18, height: 70, borderRadius: 20, border: `3px solid ${angry > 0.5 ? 'rgba(200,65,58,0.5)' : '#EEEAE4'}`, display: 'flex', alignItems: 'center', padding: '0 22px'}}>
            {angry > 0 ? (
              <div style={{opacity: angry, translate: `${(1 - angry) * 20}px 0px`}}>
                <CrossedOff color={C.red} strokeWidth={5} iterations={1} seed={8} progress={cross}>
                  <span style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.red, whiteSpace: 'nowrap'}}>{ANGRY}</span>
                </CrossedOff>
              </div>
            ) : (
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 30, color: '#C9C2B8'}}>Reply in thread</div>
            )}
          </div>
        </div>
        <Pill p={scroll} bg={C.red} size={26} style={{left: 600, top: 812}}>
          Your boss can scroll
        </Pill>
        {/* private DM */}
        <div style={{...card, top: 870, height: 290, padding: '22px 36px', boxSizing: 'border-box', opacity: dm, translate: `0px ${(1 - dm) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <Av i="RA" bg={RAJ.shirt} size={50} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>Raj</div>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted}}>DIRECT MESSAGE</div>
          </div>
          <Pill p={lock} bg={C.green} size={22} style={{right: 36, top: 26}}>
            Only Raj sees this
          </Pill>
          <div style={{marginTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
            {t < 7.55 ? (
              <div style={{width: '100%', boxSizing: 'border-box', border: '3px solid #EEEAE4', borderRadius: 24, padding: '16px 24px', fontFamily: SANS, fontWeight: 800, fontSize: 34, color: typed ? C.ink : '#C9C2B8', minHeight: 80}}>
                {typed || 'Message Raj'}
                {t >= 6.05 && caret}
              </div>
            ) : (
              <Msg p={sent} out size={34}>
                {DM}
              </Msg>
            )}
          </div>
        </div>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.22} />
      <Sfx at={1.3} name="whoosh" volume={0.16} />
      <Sfx at={2.0} name="lock" volume={0.22} />
      <TypeClicks steps={STEPS} />
      <Sfx at={7.55} name="send" volume={0.24} />
      <Sfx at={8.25} name="blip" volume={0.2} />
      <Sfx at={9.0} name="snip" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: take the rest private.', start: 0.64, end: 3.2, key: 'private', se: 2.84},
          {text: 'If they were rude, message them directly.', start: 3.3, end: 5.9, key: 'directly', se: 5.5},
          {text: '"Next time, can you flag it to me first?"', start: 6.0, end: 8.1, key: 'first', se: 7.8},
          {text: 'Never argue where your boss can scroll.', start: 8.18, end: 10.6, key: 'argue scroll', se: 9.95},
        ]}
      />
    </Paper>
  );
};

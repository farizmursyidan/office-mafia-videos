import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle, CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Mark, Night, Pill, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: two memory cards. THE MISTAKE (wrong number on slide 4) fades and is crossed off, "forgotten by Friday".
   YOUR REACTION (the reply everyone read) gets circled, "remembered for a year". */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const sub: React.CSSProperties = {fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted};
const Meter: React.FC<{p: number; color: string}> = ({p, color}) => (
  <div style={{height: 18, borderRadius: 9, background: '#EEEAE4', marginTop: 14, overflow: 'hidden'}}>
    <div style={{height: '100%', width: `${p * 100}%`, borderRadius: 9, background: color}} />
  </div>
);
export const Rule: React.FC = () => {
  const {t} = useT();
  const left = ez(t, 0.15, 0.55);
  const right = ez(t, 0.45, 0.55);
  const fade = interpolate(t, [2.7, 4.0], [1, 0.12], {...CL, easing: INOUT});
  const cross = interpolate(t, [3.4, 3.95], [0, 1], {...CL, easing: INOUT});
  const forgot = interpolate(t, [3.85, 4.2], [0, 1], {...CL, easing: POP});
  const grow = interpolate(t, [4.6, 5.9], [0.15, 1], {...CL, easing: INOUT});
  const ring = interpolate(t, [5.6, 6.2], [0, 1], {...CL, easing: INOUT});
  const year = interpolate(t, [6.0, 6.35], [0, 1], {...CL, easing: POP});
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 200, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.2)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26, maxWidth: 860}}>
          <Reveal at={4.54} se={6.3} size={84} mark={{word: 'reacted.', color: C.amber, at: 6.2}}>
            They remember how you reacted.
          </Reveal>
        </div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 540, height: 540, borderRadius: 30, background: C.paper, overflow: 'hidden'}}>
        {/* the mistake */}
        <div style={{position: 'absolute', left: 36, top: 40, width: 410, height: 460, padding: '28px 30px', boxSizing: 'border-box', borderRadius: 24, background: C.white, boxShadow: '0 16px 40px rgba(60,45,20,0.16)', opacity: left, translate: `0px ${(1 - left) * 40}px`}}>
          <div style={sub}>THE MISTAKE</div>
          <div style={{opacity: fade, marginTop: 26}}>
            <CrossedOff color={C.red} strokeWidth={5} iterations={1} seed={3} progress={cross}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, lineHeight: 1.15, color: C.ink}}>
                Slide 4:
                <br />
                wrong number
              </div>
            </CrossedOff>
            <div style={{...sub, marginTop: 40}}>REMEMBERED</div>
            <Meter p={interpolate(t, [2.7, 4.0], [0.6, 0.06], {...CL, easing: INOUT})} color={C.muted} />
          </div>
          <Pill p={forgot} bg={C.muted} size={26} style={{left: 30, top: 360}}>
            Forgotten by Friday
          </Pill>
        </div>
        {/* your reaction */}
        <div style={{position: 'absolute', left: 494, top: 40, width: 410, height: 460, padding: '28px 30px', boxSizing: 'border-box', borderRadius: 24, background: C.white, boxShadow: '0 16px 40px rgba(60,45,20,0.16)', opacity: right, translate: `0px ${(1 - right) * 40}px`}}>
          <div style={sub}>YOUR REACTION</div>
          <div style={{marginTop: 34, marginLeft: 8}}>
            <Circle color={C.amber} strokeWidth={6} iterations={1} seed={7} padding={{top: 10, bottom: 10, left: 12, right: 12}} progress={ring}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, lineHeight: 1.15, color: C.ink}}>
                The reply
                <br />
                all 40 read
              </div>
            </Circle>
          </div>
          <div style={{...sub, marginTop: 40}}>REMEMBERED</div>
          <Meter p={grow} color={C.amber} />
          <Pill p={year} bg={C.amber} fg={C.ink} size={26} style={{left: 30, top: 360}}>
            Remembered all year
          </Pill>
        </div>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={3.4} name="snip" volume={0.2} />
      <Sfx at={4.6} name="whoosh" volume={0.16} />
      <Sfx at={6.0} name="pop" volume={0.24} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.68, end: 2.5, key: 'rule', se: 1.93},
          {text: 'Nobody remembers the mistake.', start: 2.6, end: 4.45, key: 'mistake', se: 4.11},
          {text: 'They remember how you reacted to it.', start: 4.5, end: 7.2, key: 'reacted', se: 6.5},
        ]}
      />
    </Night>
  );
};

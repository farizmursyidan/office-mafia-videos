import React from 'react';
import {Easing, interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Mark, Night, YOU, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: honesty is a loyalty test. The list of critiques you think they want gets crossed off.
   Below, WHAT THEY'RE CHECKING: a WITH ME / AGAINST ME meter, and your avatar sways between the two. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const LIST = ['Meetings run long', 'Goals keep changing', 'Feedback comes late'];
export const Rule: React.FC = () => {
  const {t} = useT();
  const list = ez(t, 0.2, 0.5);
  const cross = interpolate(t, [5.1, 5.8], [0, 1], {...CL, easing: INOUT});
  const side = ez(t, 0.5, 0.5);
  const you = interpolate(t, [0.9, 1.3], [0, 1], {...CL, easing: POP});
  const sway = t > 7.1 ? Math.sin((t - 7.1) * 3.2) * 150 * interpolate(t, [7.1, 7.5], [0, 1], CL) : 0;
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 200, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.2)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26}}>
          <Reveal at={2.61} se={4.4} size={88} mark={{word: 'test.', color: C.amber, at: 4.3}}>
            Honesty is a loyalty test.
          </Reveal>
        </div>
      </div>
      {/* what you think they want */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 470, height: 290, borderRadius: 30, background: C.nightSoft, border: '3px solid rgba(255,255,255,0.12)', padding: '26px 36px', boxSizing: 'border-box', opacity: list, translate: `0px ${(1 - list) * 40}px`}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>WHAT YOU THINK THEY WANT</div>
        <div style={{marginTop: 22, display: 'inline-block'}}>
          <CrossedOff color={C.red} strokeWidth={6} iterations={1} seed={9} progress={cross}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 14, padding: '0 10px'}}>
              {LIST.map((l, i) => {
                const p = ez(t, 0.6 + i * 0.25, 0.4);
                return (
                  <div key={l} style={{fontFamily: SANS, fontWeight: 800, fontSize: 40, color: C.white, opacity: p, translate: `${(1 - p) * -30}px 0px`, whiteSpace: 'nowrap'}}>
                    {i + 1}. {l}
                  </div>
                );
              })}
            </div>
          </CrossedOff>
        </div>
      </div>
      {/* what they check */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 800, height: 300, borderRadius: 30, background: C.nightSoft, border: `3px solid ${C.amber}`, padding: '26px 36px', boxSizing: 'border-box', opacity: side, translate: `0px ${(1 - side) * 40}px`}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.amber}}>WHAT THEY'RE CHECKING</div>
        <div style={{position: 'relative', marginTop: 34, height: 170}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: 300, height: 110, borderRadius: 24, background: 'rgba(46,158,91,0.22)', border: `3px solid ${C.green}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.green}}>WITH ME</div>
          <div style={{position: 'absolute', right: 0, top: 0, width: 300, height: 110, borderRadius: 24, background: 'rgba(200,65,58,0.22)', border: `3px solid ${C.red}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.red}}>AGAINST ME</div>
          <div style={{position: 'absolute', left: '50%', top: 6, marginLeft: -50 + sway, opacity: Math.min(1, you * 1.4), scale: String(0.6 + 0.4 * you)}}>
            <Av i="YOU" bg={YOU.shirt} size={100} fg={C.ink} />
            <div style={{position: 'absolute', right: -14, top: -14, width: 44, height: 44, borderRadius: '50%', background: C.white, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>?</div>
          </div>
        </div>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={5.1} name="snip" volume={0.24} />
      <Sfx at={6.7} name="pop" volume={0.28} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.43, end: 2.45, key: 'rule', se: 1.93},
          {text: "When a boss asks for honesty, they're not asking for a list.", start: 2.61, end: 6.6, key: 'honesty list', se: 6.24},
          {text: "They're checking whose side you're on.", start: 6.74, end: 8.7, key: 'side', se: 8.16},
        ]}
      />
    </Night>
  );
};

import React from 'react';
import {Easing, interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Mark, Night, TOM, YOU, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: a race track with two runners gets crossed off. It's replaced by a side by side comparison, where Tom's column fills in while yours stays blank. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const ROWS = [
  {k: 'Wins she heard about', you: '?', tom: '3', at: 5.9},
  {k: 'Seen as', you: '?', tom: 'Leader', at: 6.7},
];
export const Rule: React.FC = () => {
  const {t} = useT();
  const race = ez(t, 0.1, 0.5);
  const run = interpolate(t, [0.3, 3.4], [0, 1], {...CL, easing: INOUT});
  const cross = interpolate(t, [3.2, 3.7], [0, 1], {...CL, easing: INOUT});
  const comp = ez(t, 4.2, 0.5);
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 210, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.3)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{position: 'relative', marginTop: 30, height: 120}}>
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, opacity: 1 - ez(t, 4.1, 0.25)}}>
            <Reveal at={2.48} se={3.91} size={92}>
              Not a race.
            </Reveal>
          </div>
          {t >= 4.15 && (
            <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
              <Reveal at={4.26} se={4.98} size={92} color={C.amber} italic mark={{word: 'comparison.', color: C.white, at: 5.2}}>
                A comparison.
              </Reveal>
            </div>
          )}
        </div>
      </div>
      {/* race lane */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 470, height: 280, borderRadius: 30, background: C.nightSoft, border: '3px solid rgba(255,255,255,0.12)', padding: '26px 36px', boxSizing: 'border-box', opacity: race * (1 - 0.55 * ez(t, 4.2, 0.5)), translate: `0px ${(1 - race) * 40}px`}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>WHAT YOU THINK IT IS</div>
        <div style={{position: 'relative', marginTop: 26, height: 170}}>
          <CrossedOff color={C.red} strokeWidth={7} iterations={1} seed={9} progress={cross}>
            <div style={{position: 'relative', width: 880, height: 160}}>
              {[0, 1].map((i) => (
                <div key={i} style={{position: 'absolute', left: 0, right: 40, top: 30 + i * 80, height: 4, background: 'rgba(255,255,255,0.18)'}} />
              ))}
              <div style={{position: 'absolute', right: 40, top: 0, width: 8, height: 150, background: 'repeating-linear-gradient(0deg, #fff 0 12px, #111 12px 24px)'}} />
              <div style={{position: 'absolute', top: 0, left: 20 + run * 640}}>
                <Av i="ME" bg={YOU.shirt} size={60} fg={C.ink} />
              </div>
              <div style={{position: 'absolute', top: 80, left: 20 + run * 600}}>
                <Av i="TO" bg={TOM.shirt} size={60} />
              </div>
            </div>
          </CrossedOff>
        </div>
      </div>
      {/* comparison */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 790, height: 370, borderRadius: 30, background: C.nightSoft, border: `3px solid ${C.amber}`, padding: '26px 36px', boxSizing: 'border-box', opacity: comp, translate: `0px ${(1 - comp) * 40}px`}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.amber}}>WHAT IT REALLY IS</div>
          <div style={{marginLeft: 'auto', width: 124, display: 'flex', justifyContent: 'center'}}>
            <Av i="ME" bg={YOU.shirt} size={64} fg={C.ink} />
          </div>
          <div style={{width: 150, display: 'flex', justifyContent: 'center'}}>
            <Av i="TO" bg={TOM.shirt} size={64} />
          </div>
        </div>
        {ROWS.map((r) => {
          const p = interpolate(t, [r.at, r.at + 0.35], [0, 1], {...CL, easing: POP});
          return (
            <div key={r.k} style={{display: 'flex', alignItems: 'center', height: 110, borderTop: '2px solid rgba(255,255,255,0.1)', marginTop: 18}}>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.white, whiteSpace: 'nowrap'}}>{r.k}</div>
              <div style={{marginLeft: 'auto', width: 124, textAlign: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.muted}}>{r.you}</div>
              <div style={{width: 150, textAlign: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.red, opacity: Math.min(1, p * 1.5), scale: String(0.7 + 0.3 * p)}}>{r.tom}</div>
            </div>
          );
        })}
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={3.2} name="snip" volume={0.28} />
      <Sfx at={4.3} name="blip" volume={0.26} />
      <Sfx at={5.9} name="pop" volume={0.28} />
      <Sfx at={6.7} name="hit" volume={0.3} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.47, end: 2.4, key: 'rule', se: 1.73},
          {text: "A promotion isn't a race.", start: 2.48, end: 4.18, key: 'race', se: 3.91},
          {text: "It's a comparison.", start: 4.26, end: 5.5, key: 'comparison', se: 4.98},
          {text: 'And your rival is already shaping the comparison.', start: 5.57, end: 8.6, key: 'rival shaping', se: 8.08},
        ]}
      />
    </Night>
  );
};

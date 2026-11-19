import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, DANA, INOUT, Mark, Night, Pill, YOU, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: Dana's review queue. Twelve review tiles stack up on her desk card with a "12 due this week" counter,
   your tile is circled, and its text flows into the RATING slot: "Whatever you hand them becomes your rating." */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const NAMES = ['Sam', 'Mei', 'Tom', 'Raj', 'Lee', 'You', 'Ana', 'Kai', 'Priya', 'Ben', 'Joe', 'Ola'];
export const Rule: React.FC = () => {
  const {t} = useT();
  const panel = ez(t, 0.15, 0.55);
  const count = Math.round(interpolate(t, [0.4, 4.0], [1, 12], {...CL, easing: INOUT}));
  const ring = interpolate(t, [5.0, 5.6], [0, 1], {...CL, easing: INOUT});
  const flow = interpolate(t, [5.6, 6.3], [0, 1], {...CL, easing: INOUT});
  const rated = interpolate(t, [6.3, 6.65], [0, 1], {...CL, easing: POP});
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 200, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.2)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26, maxWidth: 900}}>
          <Reveal at={4.96} se={6.74} size={72} mark={{word: 'rating.', color: C.amber, at: 6.6}}>
            Whatever you hand them becomes your rating.
          </Reveal>
        </div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 520, height: 580, borderRadius: 30, background: C.paper, overflow: 'hidden', opacity: panel, translate: `0px ${(1 - panel) * 40}px`}}>
        <div style={{position: 'absolute', left: 36, right: 36, top: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <Av i="DA" bg={DANA.shirt} size={56} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>Reviews to write</div>
          </div>
          <div style={{background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 28, padding: '8px 20px', borderRadius: 999, whiteSpace: 'nowrap'}}>{count} due this week</div>
        </div>
        {/* 4 x 3 grid of review tiles */}
        <div style={{position: 'absolute', left: 36, right: 36, top: 120, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18}}>
          {NAMES.map((n, k) => {
            const p = interpolate(t, [0.4 + k * 0.3, 0.75 + k * 0.3], [0, 1], {...CL, easing: POP});
            const me = n === 'You';
            const tile = (
              <div style={{height: 92, borderRadius: 18, background: me ? C.amber : C.white, boxShadow: me ? `0 0 0 ${6 * ring}px ${C.red}, 0 8px 20px rgba(60,45,20,0.12)` : '0 8px 20px rgba(60,45,20,0.12)', padding: '14px 16px', boxSizing: 'border-box'}}>
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, color: C.ink}}>{n}</div>
                <div style={{height: 8, width: '80%', borderRadius: 4, background: me ? 'rgba(20,20,20,0.25)' : '#EEEAE4', marginTop: 12}} />
              </div>
            );
            return (
              <div key={n} style={{opacity: p, scale: String(0.85 + 0.15 * p), translate: `0px ${(1 - p) * 20}px`}}>
                {tile}
              </div>
            );
          })}
        </div>
        {/* your text flows into the rating */}
        <div style={{position: 'absolute', left: 36, right: 36, top: 492, height: 76, borderRadius: 20, background: C.white, display: 'flex', alignItems: 'center', gap: 18, padding: '0 24px', boxSizing: 'border-box', opacity: 0.4 + 0.6 * flow}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted}}>YOUR RATING</div>
          <div style={{flex: 1, height: 10, borderRadius: 5, background: '#EEEAE4', overflow: 'hidden'}}>
            <div style={{height: '100%', width: `${flow * 100}%`, background: C.amber, borderRadius: 5}} />
          </div>
          <Av i="YOU" bg={YOU.shirt} size={44} fg={C.ink} />
        </div>
        <Pill p={rated} bg={C.amber} fg={C.ink} size={24} style={{left: 250, top: 440}}>
          Written from your words
        </Pill>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={0.4} name="pop" volume={0.18} />
      <Sfx at={5.0} name="snip" volume={0.2} />
      <Sfx at={6.3} name="pop" volume={0.24} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.5, end: 2.1, key: 'rule', se: 1.72},
          {text: 'Your manager has twelve reviews to write this week.', start: 2.15, end: 4.9, key: 'twelve', se: 4.53},
          {text: 'Whatever you hand them becomes your rating.', start: 4.96, end: 7.6, key: 'rating', se: 6.74},
        ]}
      />
    </Night>
  );
};

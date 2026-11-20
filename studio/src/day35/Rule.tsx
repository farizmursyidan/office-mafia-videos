import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Mark, Night, Pill, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: a 30 day calendar fills in day by day ("Your first thirty days become your reputation").
   Then later chips (Month 3, Month 6, Year 2) slide down into a folder tab labeled "Filed under: your first 30 days". */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const LATER = ['Month 3', 'Month 6', 'Year 2'];
export const Rule: React.FC = () => {
  const {t} = useT();
  const panel = ez(t, 0.15, 0.55);
  const filled = interpolate(t, [2.5, 4.9], [0, 30], {...CL, easing: INOUT});
  const rep = interpolate(t, [4.9, 5.25], [0, 1], {...CL, easing: POP});
  const folder = ez(t, 5.2, 0.5);
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 200, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.2)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26, maxWidth: 900}}>
          <Reveal at={2.46} se={4.86} size={72} mark={{word: 'reputation.', color: C.amber, at: 4.8}}>
            Your first 30 days become your reputation.
          </Reveal>
        </div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 520, height: 600, borderRadius: 30, background: C.paper, overflow: 'hidden', opacity: panel, translate: `0px ${(1 - panel) * 40}px`}}>
        <div style={{position: 'absolute', left: 36, right: 36, top: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>Your first month</div>
          <div style={{opacity: rep, scale: String(0.85 + 0.15 * rep), background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, padding: '8px 20px', borderRadius: 999, whiteSpace: 'nowrap'}}>Reputation: set</div>
        </div>
        {/* 10 x 3 grid of days */}
        <div style={{position: 'absolute', left: 36, right: 36, top: 104, display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 10}}>
          {Array.from({length: 30}, (_, k) => {
            const on = interpolate(filled, [k, k + 1], [0, 1], CL);
            return (
              <div key={k} style={{height: 58, borderRadius: 12, background: on > 0.5 ? C.amber : C.white, scale: String(0.9 + 0.1 * on), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 22, color: on > 0.5 ? C.ink : '#B8B0A4'}}>
                {k + 1}
              </div>
            );
          })}
        </div>
        {/* the folder everything after gets filed into */}
        <div style={{position: 'absolute', left: 36, right: 36, top: 330, height: 240, opacity: folder, translate: `0px ${(1 - folder) * 30}px`}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: 300, height: 50, borderRadius: '18px 18px 0 0', background: '#C99A4A'}} />
          <div style={{position: 'absolute', left: 0, right: 0, top: 40, bottom: 0, borderRadius: '0 22px 22px 22px', background: '#D9AE5F', boxShadow: '0 12px 30px rgba(60,45,20,0.2)'}}>
            <div style={{position: 'absolute', left: 30, top: 24, fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: 'rgba(20,20,20,0.6)'}}>FILED UNDER</div>
            <div style={{position: 'absolute', left: 30, top: 56, fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink}}>Your first 30 days</div>
            <div style={{position: 'absolute', left: 30, right: 30, top: 122, display: 'flex', gap: 16}}>
              {LATER.map((l, k) => {
                const p = interpolate(t, [5.6 + k * 0.4, 6.05 + k * 0.4], [0, 1], {...CL, easing: INOUT});
                return (
                  <div key={l} style={{opacity: p, translate: `0px ${(1 - p) * -70}px`, background: C.white, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 28, padding: '12px 24px', borderRadius: 16, whiteSpace: 'nowrap', boxShadow: '0 8px 18px rgba(60,45,20,0.15)'}}>
                    {l}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={4.9} name="pop" volume={0.24} />
      <Sfx at={5.2} name="whoosh" volume={0.16} />
      <Sfx at={5.6} name="click" volume={0.18} />
      <Sfx at={6.0} name="click" volume={0.18} />
      <Sfx at={6.4} name="click" volume={0.18} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.42, end: 2.4, key: 'rule', se: 1.87},
          {text: 'Your first thirty days become your reputation.', start: 2.46, end: 5.1, key: 'thirty reputation', se: 4.86},
          {text: 'Everything after that gets filed under it.', start: 5.15, end: 7.7, key: 'filed', se: 7.04},
        ]}
      />
    </Night>
  );
};

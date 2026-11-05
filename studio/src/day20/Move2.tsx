import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, OUT, Paper, Push, card, ez, useT} from './kit';

/* 4. Move 2: the empty checklist fills with what the boss says, then goes back to them in writing. */
const ITEMS = ['Lead one client project', 'Train the new hire', 'Present at the Q3 review'];
export const Move2: React.FC = () => {
  const {t} = useT();
  const page = ez(t, 0.2, 0.55);
  const q = ez(t, 2.95, 0.45);
  const sent = t >= 6.55;
  const press = interpolate(t, [6.4, 6.55, 6.7], [1, 0.92, 1], CL);
  const stamp = interpolate(t, [7.5, 7.8], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Ask what's missing" />
        <div style={{...card, top: 430, height: 700, padding: '26px 34px', opacity: page, translate: `0px ${(1 - page) * 50}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>TO BECOME SENIOR ANALYST</div>
          <div style={{position: 'absolute', left: 34, top: 112, fontFamily: SANS, fontWeight: 800, fontSize: 42, color: C.muted, whiteSpace: 'nowrap', opacity: ez(t, 0.7, 0.4) * (1 - ez(t, 2.6, 0.3))}}>Nobody showed you this list</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 20, height: 150, opacity: q, translate: `0px ${(1 - q) * 24}px`}}>
            <Av i="YOU" bg={C.amber} fg={C.ink} size={84} />
            <div style={{background: '#F0EBE3', fontFamily: SANS, fontWeight: 800, fontSize: 40, lineHeight: 1.2, color: C.ink, padding: '16px 24px', borderRadius: 24}}>What would you need to see to put me up for it?</div>
          </div>
          <div style={{marginTop: 22}}>
            {ITEMS.map((w, i) => {
              const p = ez(t, 4.3 + i * 0.32, 0.4);
              return (
                <div key={w} style={{marginTop: 12, height: 72, borderRadius: 14, border: `3px dashed ${p > 0.5 ? 'transparent' : '#CFC8BC'}`, background: `rgba(224,169,59,${0.2 * p})`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', position: 'relative'}}>
                  <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.muted, opacity: 1 - p, position: 'absolute', left: 20}}>?</div>
                  <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 40, color: C.ink, whiteSpace: 'nowrap', opacity: p, translate: `${(1 - p) * -16}px 0px`}}>{w}</div>
                </div>
              );
            })}
          </div>
          <div style={{position: 'absolute', left: 34, right: 34, bottom: 28, height: 100, borderTop: '2px solid #EEEAE4', paddingTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: ez(t, 5.4, 0.4)}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink, whiteSpace: 'nowrap'}}>
              <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={9} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={interpolate(t, [5.9, 6.4], [0, 1], {...CL, easing: INOUT})}>
                <span>To: Dana</span>
              </Highlight>
            </div>
            <div style={{scale: String(press), background: sent ? C.green : C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 32, padding: '12px 30px', borderRadius: 999, whiteSpace: 'nowrap'}}>{sent ? 'SENT' : 'SEND'}</div>
          </div>
          {stamp > 0 && (
            <div style={{position: 'absolute', right: 34, top: 20, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [7.5, 7.8], [1.5, 1], {...CL, easing: OUT}))}}>
              <div style={{border: `5px solid ${C.red}`, color: C.red, background: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 34, letterSpacing: 3, padding: '2px 16px', borderRadius: 12, whiteSpace: 'nowrap'}}>ON RECORD</div>
            </div>
          )}
        </div>
      </Push>
      <Sfx at={3.17} name="pop" volume={0.3} />
      <Sfx at={4.3} name="click" volume={0.28} />
      <Sfx at={4.62} name="click" volume={0.28} />
      <Sfx at={4.94} name="click" volume={0.28} />
      <Sfx at={6.55} name="send" volume={0.32} />
      <Sfx at={7.5} name="hit" volume={0.4} />
      <Caps
        top={1290}
        caps={[
          {text: "Move two: ask what's missing.", start: 0.6, end: 3.0, key: 'missing', se: 2.57},
          {text: '"What would you need to see to put me up for it?"', start: 3.17, end: 5.4, key: 'see', se: 4.94},
          {text: 'Send the answer back in writing.', start: 5.53, end: 7.3, key: 'writing', se: 6.97},
          {text: "Now it's on record.", start: 7.41, end: 8.7, key: 'record', se: 8.28},
        ]}
      />
    </Paper>
  );
};

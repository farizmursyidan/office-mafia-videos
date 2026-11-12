import React from 'react';
import {Easing, interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, Paper, Push, TOM, YOU, card, ez, useT} from './kit';

/* 4. Move 2: Tom grabs the shiny launch. The angry client account sits with nobody until you take it, and its status flips from "3 escalations" to "Renewed". */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const Owner: React.FC<{p: number; who: 'tom' | 'you' | 'none'}> = ({p, who}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 14, opacity: who === 'none' ? 1 : Math.min(1, p * 1.5), scale: String(who === 'none' ? 1 : 0.7 + 0.3 * p), transformOrigin: 'left center'}}>
    {who === 'none' ? <Av i="?" bg="transparent" size={60} dashed /> : <Av i={who === 'tom' ? 'TO' : 'ME'} bg={who === 'tom' ? TOM.shirt : YOU.shirt} size={60} fg={who === 'you' ? C.ink : C.white} />}
    <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: who === 'none' ? C.muted : C.ink, whiteSpace: 'nowrap'}}>{who === 'tom' ? 'Tom' : who === 'you' ? 'You' : 'Nobody'}</div>
  </div>
);
export const Move2: React.FC = () => {
  const {t} = useT();
  const a = ez(t, 0.3, 0.5);
  const b = ez(t, 0.6, 0.5);
  const grab = interpolate(t, [3.25, 3.6], [0, 1], {...CL, easing: POP});
  const take = interpolate(t, [4.9, 5.25], [0, 1], {...CL, easing: POP});
  const cross = interpolate(t, [7.6, 8.0], [0, 1], {...CL, easing: INOUT});
  const fixed = interpolate(t, [8.0, 8.35], [0, 1], {...CL, easing: POP});
  const sparkle = 0.6 + 0.4 * Math.sin(t * 5);
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Own the work they avoid" />
        {/* shiny launch */}
        <div style={{...card, top: 440, height: 250, padding: '30px 40px', boxSizing: 'border-box', opacity: a, translate: `0px ${(1 - a) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.amber}}>THE SHINY LAUNCH</div>
          <div style={{display: 'flex', alignItems: 'center', marginTop: 10}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 46, color: C.ink, whiteSpace: 'nowrap'}}>New app demo</div>
            <div style={{marginLeft: 18, fontSize: 40, color: C.amber, opacity: sparkle, fontFamily: SANS, fontWeight: 900}}>*</div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 700, fontSize: 28, color: C.muted, whiteSpace: 'nowrap'}}>VP in the room</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 24}}>
            <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 28, color: C.muted, width: 110}}>Owner</div>
            {t < 3.25 ? <Owner p={1} who="none" /> : <Owner p={grab} who="tom" />}
          </div>
        </div>
        {/* angry client */}
        <div style={{...card, top: 730, height: 430, padding: '30px 40px', boxSizing: 'border-box', opacity: b, translate: `0px ${(1 - b) * 40}px`, border: `5px solid ${fixed > 0 ? `rgba(46,158,91,${fixed})` : 'transparent'}`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.red}}>THE ANGRY CLIENT</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 46, color: C.ink, marginTop: 10, whiteSpace: 'nowrap'}}>Northwind account</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 24}}>
            <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 28, color: C.muted, width: 110}}>Status</div>
            <div style={{position: 'relative', height: 60, width: 320}}>
              <div style={{position: 'absolute', left: 0, top: 4}}>
                <CrossedOff color={C.ink} strokeWidth={5} iterations={1} seed={11} progress={cross}>
                  <div style={{background: '#FBEDEC', color: C.red, fontFamily: SANS, fontWeight: 900, fontSize: 28, padding: '8px 20px', borderRadius: 999, whiteSpace: 'nowrap'}}>3 escalations</div>
                </CrossedOff>
              </div>
            </div>
            <div style={{background: C.green, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 28, padding: '8px 22px', borderRadius: 999, whiteSpace: 'nowrap', opacity: Math.min(1, fixed * 1.5), scale: String(0.7 + 0.3 * fixed)}}>Renewed</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 24}}>
            <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 28, color: C.muted, width: 110}}>Owner</div>
            {t < 4.9 ? <Owner p={1} who="none" /> : <Owner p={take} who="you" />}
          </div>
          <div style={{marginTop: 28, fontFamily: SANS, fontWeight: 700, fontSize: 30, color: C.ink, opacity: ez(t, 8.4, 0.4), whiteSpace: 'nowrap'}}>
            <span style={{color: C.muted}}>Dana:</span> "Who fixed Northwind?"
          </div>
        </div>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={3.25} name="pop" volume={0.28} />
      <Sfx at={4.9} name="pop" volume={0.3} />
      <Sfx at={7.6} name="snip" volume={0.26} />
      <Sfx at={8.0} name="ping" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: own the work they avoid.', start: 0.58, end: 3.1, key: 'avoid', se: 2.66},
          {text: 'They grab the shiny launch?', start: 3.25, end: 4.75, key: 'shiny', se: 4.61},
          {text: 'You take the angry client nobody can keep happy,', start: 4.82, end: 7.5, key: 'angry', se: 7.15},
          {text: 'and you fix it.', start: 7.6, end: 9.1, key: 'fix', se: 8.54},
        ]}
      />
    </Paper>
  );
};

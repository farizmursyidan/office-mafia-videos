import React from 'react';
import {Easing, interpolate} from 'remotion';
import {StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Av, CL, Caps, DANA, INOUT, Label, Mark, Paper, Pill, Push, PRIYA, TOM, card, ez, useT} from './kit';

/* 4. Move 2: the onboarding doc, tagged "Last edited 2 years ago". An outdated step is struck through and the fix types in,
   the tag flips to "Updated today". Then your message lands in the team channel and the reactions count up. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const FIX = 'Request VPN access in the IT portal.';
const STEPS = [{text: FIX, from: 4.9, to: 6.0, mode: 'type' as const}];
export const Move2: React.FC = () => {
  const {f, t} = useT();
  const doc = ez(t, 0.15, 0.5);
  const old = interpolate(t, [1.6, 1.95], [0, 1], {...CL, easing: POP});
  const strike = interpolate(t, [4.3, 4.85], [0, 1], {...CL, easing: INOUT});
  const fresh = interpolate(t, [6.0, 6.35], [0, 1], {...CL, easing: POP});
  const msg = ez(t, 6.2, 0.5);
  const reacts = Math.round(interpolate(t, [6.8, 8.2], [0, 12], {...CL, easing: INOUT}));
  const seen = interpolate(t, [7.4, 7.75], [0, 1], {...CL, easing: POP});
  const typed = typedText(f, STEPS);
  const caret = Math.floor(t * 2.5) % 2 === 0 ? '|' : '';
  const line: React.CSSProperties = {fontFamily: SANS, fontWeight: 800, fontSize: 32, lineHeight: 1.3, color: C.ink};
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Get one visible win" />
        {/* onboarding doc */}
        <div style={{...card, top: 440, height: 400, padding: '26px 40px', boxSizing: 'border-box', opacity: doc, translate: `0px ${(1 - doc) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>Onboarding guide</div>
            <div style={{position: 'relative', height: 46, width: 300}}>
              <div style={{position: 'absolute', right: 0, top: 0, opacity: old * (1 - fresh), background: C.red, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 24, padding: '8px 18px', borderRadius: 999, whiteSpace: 'nowrap'}}>Edited 2 years ago</div>
              <div style={{position: 'absolute', right: 0, top: 0, opacity: fresh, scale: String(0.85 + 0.15 * fresh), background: C.green, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 24, padding: '8px 18px', borderRadius: 999, whiteSpace: 'nowrap'}}>Updated today</div>
            </div>
          </div>
          <div style={{...line, marginTop: 22, color: '#8A8278'}}>1. Get your laptop from the front desk.</div>
          <div style={{...line, marginTop: 14, color: '#5A5246'}}>
            2.{' '}
            <StrikeThrough color={C.red} strokeWidth={5} iterations={1} seed={12} progress={strike}>
              <span>Ask Mark for VPN access.</span>
            </StrikeThrough>
            <span style={{marginLeft: 14, fontSize: 24, color: C.red, opacity: old}}>(Mark left)</span>
          </div>
          <div style={{...line, marginTop: 14, marginLeft: 34, minHeight: 42, color: C.green}}>
            {typed}
            {t >= 4.9 && t < 6.2 && caret}
          </div>
          <div style={{...line, marginTop: 14, color: '#8A8278'}}>3. Join the Monday team call.</div>
        </div>
        {/* shared with the team */}
        <div style={{...card, top: 880, height: 230, padding: '24px 40px', boxSizing: 'border-box', opacity: msg, translate: `0px ${(1 - msg) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted}}># team</div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 32, lineHeight: 1.25, color: C.ink, marginTop: 10}}>I updated the onboarding guide. Should save the next new hire a day.</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 14}}>
            <Av i="DA" bg={DANA.shirt} size={38} />
            <Av i="PR" bg={PRIYA.shirt} size={38} />
            <Av i="TO" bg={TOM.shirt} size={38} />
            <div style={{marginLeft: 8, background: 'rgba(224,169,59,0.2)', color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 24, padding: '6px 16px', borderRadius: 999}}>+{reacts} thanks</div>
          </div>
        </div>
        <Pill p={seen} bg={C.amber} fg={C.ink} size={26} style={{right: 110, top: 1036}}>
          Seen by the whole team
        </Pill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.22} />
      <Sfx at={1.6} name="pop" volume={0.18} />
      <Sfx at={4.3} name="snip" volume={0.2} />
      <TypeClicks steps={STEPS} />
      <Sfx at={6.0} name="pop" volume={0.2} />
      <Sfx at={6.2} name="send" volume={0.2} />
      <Sfx at={7.4} name="ping" volume={0.2} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: get one small win people can see.', start: 0.6, end: 4.2, key: 'small win', se: 3.83},
          {text: 'Fix the outdated onboarding doc,', start: 4.31, end: 6.1, key: 'outdated', se: 5.9},
          {text: 'then share it with the whole team.', start: 6.15, end: 8.3, key: 'whole team', se: 7.35},
        ]}
      />
    </Paper>
  );
};

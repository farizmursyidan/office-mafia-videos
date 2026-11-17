import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight, StrikeThrough} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, Paper, Pill, Push, card, ez, useT} from './kit';

/* 3. Move 1: two tags (People: praise, Processes: criticize). The good answer fills in line by line:
   praise for Maya, then the process fix. The bad answer ("My boss is the reason I'm leaving.") is struck through. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const MAYA = '#9A5BB0';
const Check: React.FC<{p: number}> = ({p}) => (
  <svg width={46} height={46} viewBox="0 0 46 46" style={{opacity: p, scale: String(0.6 + 0.4 * p), flexShrink: 0}}>
    <circle cx={23} cy={23} r={23} fill={C.green} />
    <path d="M 13 24 L 20 31 L 34 16" stroke={C.white} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Move1: React.FC = () => {
  const {t} = useT();
  const tagA = interpolate(t, [1.2, 1.55], [0, 1], {...CL, easing: POP});
  const tagB = interpolate(t, [2.4, 2.75], [0, 1], {...CL, easing: POP});
  const good = ez(t, 4.0, 0.5);
  const l1 = ez(t, 4.3, 0.45);
  const l2 = ez(t, 6.1, 0.45);
  const hlMaya = interpolate(t, [4.8, 5.3], [0, 1], {...CL, easing: INOUT});
  const hlProc = interpolate(t, [7.0, 7.6], [0, 1], {...CL, easing: INOUT});
  const ok = interpolate(t, [8.3, 8.6], [0, 1], {...CL, easing: POP});
  const bad = ez(t, 8.9, 0.45);
  const strike = interpolate(t, [10.0, 10.6], [0, 1], {...CL, easing: INOUT});
  const burn = interpolate(t, [10.5, 10.85], [0, 1], {...CL, easing: POP});
  const quote: React.CSSProperties = {fontFamily: SANS, fontWeight: 900, fontSize: 40, lineHeight: 1.2, color: C.ink};
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Praise people" />
        <Pill p={tagA} bg={C.green} size={28} style={{left: 70, top: 440}}>
          People: praise
        </Pill>
        <Pill p={tagB} bg={C.amber} fg={C.ink} size={28} style={{left: 380, top: 440}}>
          Processes: criticize
        </Pill>
        {/* good answer */}
        <div style={{...card, top: 530, height: 330, padding: '28px 36px', boxSizing: 'border-box', opacity: good, translate: `0px ${(1 - good) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.muted}}>SAY THIS</div>
            <Check p={ok} />
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, opacity: l1, translate: `0px ${(1 - l1) * 20}px`}}>
            <Av i="MA" bg={MAYA} size={52} />
            <div style={quote}>
              "
              <Highlight color="rgba(46,158,91,0.35)" iterations={1} seed={3} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={hlMaya}>
                <span>Maya</span>
              </Highlight>{' '}
              taught me so much."
            </div>
          </div>
          <div style={{...quote, marginTop: 24, opacity: l2, translate: `0px ${(1 - l2) * 20}px`}}>
            "
            <Highlight color="rgba(224,169,59,0.6)" iterations={1} seed={8} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={hlProc}>
              <span>Promotions here</span>
            </Highlight>{' '}
            need clearer criteria."
          </div>
        </div>
        {/* bad answer */}
        <div style={{...card, top: 900, height: 230, padding: '28px 36px', boxSizing: 'border-box', opacity: bad, translate: `0px ${(1 - bad) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.red}}>NOT THIS</div>
          <div style={{...quote, marginTop: 16, color: '#5A5246'}}>
            <StrikeThrough color={C.red} strokeWidth={5} iterations={1} seed={12} progress={strike}>
              <span>"My boss is the reason I'm leaving."</span>
            </StrikeThrough>
          </div>
          <Pill p={burn} bg={C.red} size={24} style={{right: 36, top: 20}}>
            Burns a reference
          </Pill>
        </div>
      </Push>
      <Sfx at={1.2} name="pop" volume={0.22} />
      <Sfx at={2.4} name="pop" volume={0.22} />
      <Sfx at={4.0} name="blip" volume={0.24} />
      <Sfx at={8.3} name="ping" volume={0.2} />
      <Sfx at={8.9} name="blip" volume={0.22} />
      <Sfx at={10.0} name="snip" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: praise people, criticize processes.', start: 0.65, end: 4.1, key: 'praise criticize', se: 3.69},
          {text: 'Say "Maya taught me so much,', start: 4.27, end: 6.05, key: 'Maya', se: 5.9},
          {text: 'and promotions here need clearer criteria."', start: 6.1, end: 8.9, key: 'promotions criteria', se: 8.48},
          {text: 'Not "My boss is the reason I\'m leaving."', start: 9.03, end: 11.45, key: 'reason', se: 10.76},
        ]}
      />
    </Paper>
  );
};

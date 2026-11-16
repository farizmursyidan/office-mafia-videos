import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {Person} from '../characters';
import {Av, Bub, CL, Caps, INOUT, KAREN, Label, Lights, Mark, Paper, Pill, Push, YOU, card, ez, useT} from './kit';

/* 4. Move 2: "Talked to this year" card: your team (often), Karen VP (never, highlighted). The one easy question types out.
   Below, you ask Karen at the party; she answers ("Honestly? The Asia launch.") and you just listen. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const Q = 'What are you most excited about next year?';
const STEPS = [{text: Q, from: 5.59, to: 7.35, mode: 'type' as const}];
export const Move2: React.FC = () => {
  const {f, t} = useT();
  const cardIn = ez(t, 0.2, 0.5);
  const never = interpolate(t, [2.2, 2.8], [0, 1], {...CL, easing: INOUT});
  const people = ez(t, 0.5, 0.6);
  const walk = interpolate(t, [1.0, 2.6], [0, 1], {...CL, easing: INOUT});
  const listen = interpolate(t, [8.0, 8.35], [0, 1], {...CL, easing: POP});
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const youTalk = t > 5.6 && t < 7.4 ? Math.max(0, Math.sin(t * 9)) * 8 : 0;
  const karenTalk = t > 7.9 ? Math.max(0, Math.sin(t * 8)) * 8 : 0;
  const caret = Math.floor(t * 2.5) % 2 === 0 ? '|' : '';
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Talk to one leader" />
        <div style={{...card, top: 440, height: 330, padding: '26px 40px', boxSizing: 'border-box', opacity: cardIn, translate: `0px ${(1 - cardIn) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <Av i="KA" bg={KAREN.shirt} size={58} />
              <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={4} padding={{left: 6, right: 6, top: 0, bottom: 0}} progress={never}>
                <span style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink, padding: '0 6px', whiteSpace: 'nowrap'}}>Karen (VP)</span>
              </Highlight>
            </div>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.muted, whiteSpace: 'nowrap'}}>Talked to: never</div>
          </div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.muted, marginTop: 26}}>ONE EASY QUESTION</div>
          <div style={{marginTop: 12, background: '#F6F2EC', borderRadius: 20, padding: '18px 26px', minHeight: 130, boxSizing: 'border-box', fontFamily: SANS, fontWeight: 800, fontSize: 38, lineHeight: 1.25, color: C.ink}}>
            {t < 5.59 ? <span style={{color: '#B9B2A8'}}>Ask something easy</span> : typedText(f, STEPS)}
            {t >= 5.59 && t < 7.6 ? caret : ''}
          </div>
        </div>
        {/* at the party */}
        <AbsoluteFill style={{opacity: people}}>
          <svg width={1080} height={1920} style={{position: 'absolute', left: 0, top: 0}}>
            <Lights x0={40} x1={1040} y={800} sag={12} n={12} t={t} />
            <Person x={120 + 200 * walk} y={1170} scale={0.76} facing={1} walk={walk > 0 && walk < 1 ? t * 9 : undefined} armL={youTalk + (walk >= 1 ? 15 : 0)} bob={breathe(0)} {...YOU} />
            <Person x={640} y={1170} scale={0.76} facing={-1} armL={karenTalk + 10} bob={breathe(1.2)} {...KAREN} />
          </svg>
          <Bub at={8.0} left={480} top={805} size={32} tail="left">
            Honestly? The Asia launch.
          </Bub>
          <Pill p={listen} bg={C.green} size={24} style={{left: 140, top: 870}}>
            You: listening
          </Pill>
        </AbsoluteFill>
      </Push>
      <TypeClicks steps={STEPS} />
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={2.2} name="snip" volume={0.2} />
      <Sfx at={8.0} name="pop" volume={0.24} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: talk to one leader you never see.', start: 0.64, end: 3.75, key: 'leader never', se: 3.27},
          {text: 'Ask one easy question, like', start: 3.82, end: 5.55, key: 'easy question', se: 5.47},
          {text: '"What are you most excited about next year?"', start: 5.59, end: 7.8, key: 'excited', se: 7.35},
          {text: 'Then listen.', start: 7.84, end: 8.85, key: 'listen', se: 8.3},
        ]}
      />
    </Paper>
  );
};

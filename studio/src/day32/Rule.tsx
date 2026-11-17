import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Mark, Night, Pill, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: the exit form's "ideas to fix the company" box gets filed and never read.
   An arrow carries the form to next year's reference call, where the old boss says "Let me check their exit notes." */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const Bar: React.FC<{w: number; dim?: boolean}> = ({w, dim}) => <div style={{height: 16, width: w, borderRadius: 8, background: dim ? '#E8E3DC' : '#D3CCC2', marginTop: 14}} />;
export const Rule: React.FC = () => {
  const {t} = useT();
  const left = ez(t, 0.15, 0.55);
  const filed = interpolate(t, [3.4, 3.75], [0, 1], {...CL, easing: POP});
  const arrow = interpolate(t, [4.6, 5.2], [0, 1], {...CL, easing: INOUT});
  const right = ez(t, 4.9, 0.5);
  const check = interpolate(t, [5.6, 6.1], [0, 1], {...CL, easing: INOUT});
  const sub: React.CSSProperties = {fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: 2, color: C.muted};
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 200, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.2)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26, maxWidth: 820}}>
          <Reveal at={5.01} se={6.09} size={88} mark={{word: 'reference.', color: C.amber, at: 6.1}}>
            It writes your reference.
          </Reveal>
        </div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 500, height: 640, borderRadius: 30, background: C.paper, overflow: 'hidden'}}>
        {/* exit form */}
        <div style={{position: 'absolute', left: 36, top: 40, width: 400, height: 560, padding: '26px 28px', boxSizing: 'border-box', borderRadius: 24, background: C.white, boxShadow: '0 16px 40px rgba(60,45,20,0.16)', opacity: left, translate: `0px ${(1 - left) * 40}px`}}>
          <div style={sub}>EXIT INTERVIEW</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink, marginTop: 16}}>Why are you leaving?</div>
          <Bar w={320} />
          <Bar w={280} />
          <Bar w={220} />
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink, marginTop: 34}}>Ideas to fix the company</div>
          <Bar w={330} />
          <Bar w={250} />
          <Pill p={filed} bg={C.muted} size={22} style={{left: 28, top: 440}}>
            Filed. Never read.
          </Pill>
        </div>
        {/* arrow */}
        <svg width={120} height={80} style={{position: 'absolute', left: 430, top: 280}}>
          <path d="M 10 40 L 100 40" stroke={C.amber} strokeWidth={8} strokeLinecap="round" fill="none" strokeDasharray={100} strokeDashoffset={100 * (1 - arrow)} />
          <path d="M 82 22 L 104 40 L 82 58" stroke={C.amber} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={arrow > 0.85 ? 1 : 0} />
        </svg>
        {/* reference call */}
        <div style={{position: 'absolute', left: 530, top: 40, width: 394, height: 560, padding: '26px 28px', boxSizing: 'border-box', borderRadius: 24, background: C.white, boxShadow: '0 16px 40px rgba(60,45,20,0.16)', opacity: right, translate: `0px ${(1 - right) * 40}px`}}>
          <div style={sub}>REFERENCE CALL</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink, marginTop: 16, lineHeight: 1.2}}>"Would you hire them again?"</div>
          <div style={{marginTop: 40, background: C.ink, color: C.white, borderRadius: 24, padding: '20px 24px', fontFamily: SANS, fontWeight: 800, fontSize: 30, lineHeight: 1.25}}>
            Let me check their{' '}
            <Highlight color="rgba(224,169,59,0.9)" iterations={1} seed={7} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={check}>
              <span style={{color: check > 0.5 ? C.ink : C.white}}>exit notes.</span>
            </Highlight>
          </div>
          <div style={{...sub, marginTop: 30}}>YOUR OLD BOSS</div>
        </div>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={3.4} name="snip" volume={0.2} />
      <Sfx at={4.9} name="whoosh" volume={0.18} />
      <Sfx at={5.6} name="pop" volume={0.24} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.53, end: 2.05, key: 'rule', se: 1.78},
          {text: "An exit interview doesn't fix the company.", start: 2.17, end: 4.9, key: 'fix company', se: 4.56},
          {text: 'It writes your reference.', start: 5.01, end: 6.7, key: 'reference', se: 6.09},
        ]}
      />
    </Night>
  );
};

import React from 'react';
import {Easing, interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Mark, Night, OUT, Pill, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: your history sits unread while the first whisper gets believed. */
export const Rule: React.FC = () => {
  const {t} = useT();
  const drop = interpolate(t, [3.9, 4.5], [0, 1], {...CL, easing: INOUT});
  const folderTop = 500 + drop * 80;
  const folderZoom = 1.14 - drop * 0.14;
  const folderIn = ez(t, 0.2, 0.6);
  const whisper = ez(t, 4.7, 0.5);
  const stamp = interpolate(t, [5.7, 6.0], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 210, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.4), marginBottom: 18}}>THE RULE NOBODY TELLS YOU</div>
        <Reveal at={4.34} se={6.14} size={92} mark={{word: 'first.', color: C.amber, at: 5.9}}>
          They believe whatever they hear first.
        </Reveal>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 80,
          right: 80,
          top: folderTop,
          height: 240,
          background: C.nightSoft,
          border: '3px solid rgba(255,255,255,0.14)',
          borderRadius: 26,
          boxSizing: 'border-box',
          padding: '30px 36px',
          opacity: folderIn * (1 - drop * 0.45),
          scale: String(folderZoom),
          translate: `0px ${(1 - folderIn) * 40}px`,
        }}
      >
        <div style={{position: 'absolute', top: -26, left: 28, width: 210, height: 44, background: C.nightSoft, border: '3px solid rgba(255,255,255,0.14)', borderBottom: 'none', borderRadius: '16px 16px 0 0'}} />
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted}}>YOUR HISTORY</div>
        <div style={{marginTop: 16, fontFamily: SANS, fontWeight: 900, fontSize: 58, color: C.white, display: 'inline-block'}}>
          <CrossedOff color={C.red} strokeWidth={7} seed={6} progress={interpolate(t, [2.9, 3.6], [0, 1], {...CL, easing: INOUT})}>
            <span>4 years of reviews</span>
          </CrossedOff>
        </div>
      </div>
      <Pill p={ez(t, 3.1, 0.4)} bg={C.red} size={30} style={{right: 92, top: folderTop + 22}}>
        UNREAD
      </Pill>
      <div style={{position: 'absolute', left: 80, right: 80, top: 860, height: 250, borderRadius: 26, background: C.white, boxSizing: 'border-box', padding: '28px 34px', display: 'flex', alignItems: 'center', gap: 26, opacity: whisper, translate: `0px ${(1 - whisper) * 40}px`, boxShadow: '0 20px 60px rgba(224,169,59,0.25)'}}>
        <Av i="MA" bg="#3F6FB5" size={104} />
        <div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted, letterSpacing: 2}}>MARK, MONDAY 9:02</div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 44, lineHeight: 1.16, color: C.ink, marginTop: 8}}>Between us, they can be a bit slow.</div>
        </div>
      </div>
      {stamp > 0 && (
        <div style={{position: 'absolute', right: 110, top: 880, opacity: interpolate(stamp, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [5.7, 6.0], [1.6, 1], {...CL, easing: OUT}))}}>
          <div style={{border: `5px solid ${C.red}`, color: C.red, background: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 3, padding: '2px 16px', borderRadius: 12}}>BELIEVED</div>
        </div>
      )}
      <Sfx at={3.1} name="click" volume={0.3} />
      <Sfx at={4.7} name="pop" volume={0.3} />
      <Sfx at={5.7} name="hit" volume={0.4} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.38, end: 2.1, key: 'rule', se: 1.74},
          {text: "A new boss doesn't read your history.", start: 2.24, end: 4.25, key: 'history', se: 3.98},
          {text: 'They believe whatever they hear first.', start: 4.34, end: 7.2, key: 'first', se: 6.14},
        ]}
      />
    </Night>
  );
};

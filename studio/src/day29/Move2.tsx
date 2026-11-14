import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, DANA, INOUT, Label, Mark, Paper, Pill, Push, card, ez, useT} from './kit';

/* 4. Move 2: your suggestion ("Send the agenda Friday") connects with a drawn arrow to Dana's win:
   her update to the VP turns from a messy draft into three crisp lines, and the VP replies "Great update, Dana." */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const CRISP = ['Launch on track for the 20th', 'Two risks, both owned', 'One decision needed from you'];
export const Move2: React.FC = () => {
  const {t} = useT();
  const top = ez(t, 0.2, 0.5);
  const idea = ez(t, 3.13, 0.45);
  const arrow = interpolate(t, [3.9, 4.6], [0, 1], {...CL, easing: INOUT});
  const mail = ez(t, 0.5, 0.5);
  const sharpen = interpolate(t, [5.0, 5.9], [0, 1], {...CL, easing: INOUT});
  const tag = interpolate(t, [6.0, 6.35], [0, 1], {...CL, easing: POP});
  const vp = interpolate(t, [6.6, 7.0], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Tie it to their win" />
        {/* your suggestion */}
        <div style={{...card, top: 440, height: 170, padding: '24px 40px', boxSizing: 'border-box', opacity: top, translate: `0px ${(1 - top) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>YOUR SUGGESTION</div>
          <div style={{position: 'relative', marginTop: 16, height: 60}}>
            <div style={{position: 'absolute', left: 0, top: 0, width: 520, height: 60, borderRadius: 16, border: `3px dashed ${C.muted}`, boxSizing: 'border-box', opacity: 0.5 * (1 - idea)}} />
            <div style={{position: 'absolute', left: 0, top: 4, fontFamily: SANS, fontWeight: 900, fontSize: 42, color: C.ink, whiteSpace: 'nowrap', opacity: idea, translate: `0px ${(1 - idea) * 16}px`}}>Send the agenda on Friday</div>
          </div>
        </div>
        {/* arrow */}
        <svg width={120} height={110} style={{position: 'absolute', left: 480, top: 616}}>
          <path d="M60 6 C 40 40, 80 60, 60 92" fill="none" stroke={C.amber} strokeWidth={8} strokeLinecap="round" strokeDasharray="120" strokeDashoffset={120 * (1 - arrow)} />
          <path d="M42 78 L60 100 L78 78" fill="none" stroke={C.amber} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" opacity={arrow > 0.9 ? 1 : 0} />
        </svg>
        {/* Dana's update to the VP */}
        <div style={{...card, top: 730, height: 430, padding: '26px 40px', boxSizing: 'border-box', opacity: mail, translate: `0px ${(1 - mail) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <Av i="DA" bg={DANA.shirt} size={56} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>Dana's weekly update</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted}}>To: VP of Product</div>
            </div>
          </div>
          <div style={{position: 'relative', marginTop: 26, height: 190}}>
            {/* messy draft */}
            <div style={{position: 'absolute', inset: 0, opacity: 1 - sharpen, filter: `blur(${sharpen * 6}px)`}}>
              {[620, 760, 540, 700].map((w, i) => (
                <div key={i} style={{height: 22, width: w, borderRadius: 11, background: '#E6E0D6', marginBottom: 22, rotate: `${(i % 2 ? 1 : -1) * 0.8}deg`}} />
              ))}
            </div>
            {/* crisp lines */}
            <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: 16}}>
              {CRISP.map((c, i) => {
                const p = interpolate(t, [5.2 + i * 0.22, 5.6 + i * 0.22], [0, 1], {...CL, easing: INOUT});
                return (
                  <div key={c} style={{display: 'flex', alignItems: 'center', gap: 16, opacity: p, translate: `${(1 - p) * 24}px 0px`}}>
                    <div style={{width: 16, height: 16, borderRadius: 8, background: C.green}} />
                    <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink, whiteSpace: 'nowrap'}}>{c}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <Pill p={tag} bg={C.green} size={26} style={{right: 40, top: 30}}>
            Sharper
          </Pill>
          <div style={{position: 'absolute', left: 40, bottom: 26, display: 'flex', alignItems: 'center', gap: 14, opacity: vp, translate: `0px ${(1 - vp) * 20}px`}}>
            <Av i="VP" bg={C.ink} size={52} />
            <div style={{background: '#F1EEE9', borderRadius: 22, padding: '10px 22px', fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.ink, whiteSpace: 'nowrap'}}>Great update, Dana.</div>
          </div>
        </div>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={3.13} name="pop" volume={0.26} />
      <Sfx at={3.9} name="whoosh" volume={0.16} />
      <Sfx at={5.2} name="click" volume={0.22} />
      <Sfx at={6.0} name="ping" volume={0.26} />
      <Sfx at={6.6} name="send" volume={0.26} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: tie it to their win.', start: 0.57, end: 2.95, key: 'win', se: 2.46},
          {text: '"If we sent the agenda on Friday, your update to the VP would land sharper."', start: 3.13, end: 7.7, key: 'agenda sharper', se: 7.16},
        ]}
      />
    </Paper>
  );
};

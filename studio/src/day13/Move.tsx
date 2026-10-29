import React from 'react';
import {interpolate} from 'remotion';
import {Underline} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Label, Mark, OUT, Paper, Push, card, float, mix, useT} from './kit';

/* 6. The move: two signs spotted, write the wins, book 15 minutes with your boss's boss */
const WINS = [
  {w: 'Cut churn 18%', at: 2.8},
  {w: 'Shipped billing v2 early', at: 3.2},
  {w: 'Saved $40k on vendors', at: 3.6},
];
const Check: React.FC<{at: number | null}> = ({at}) => {
  const {t} = useT();
  const p = at === null ? 0 : interpolate(t, [at, at + 0.35], [0, 1], {...CL, easing: OUT});
  return (
    <svg width={54} height={54} viewBox="0 0 54 54" style={{scale: String(at === null ? 1 : interpolate(t, [at, at + 0.35], [0.7, 1], {...CL, easing: OUT, output: 'perceptual-scale'}))}}>
      <rect x={0} y={0} width={54} height={54} rx={14} fill={p > 0 ? C.amber : '#F1ECE4'} opacity={p > 0 ? mix(0.4, 1, p) : 1} />
      <path d="M14 28 L23 37 L41 18" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={42} strokeDashoffset={42 * (1 - p)} />
    </svg>
  );
};
const rise = (t: number, at: number, k: number): React.CSSProperties => ({
  opacity: interpolate(t, [at, at + 0.5], [0, 1], {...CL, easing: OUT}),
  translate: interpolate(t, [at, at + 0.7], ['0px 70px', `0px ${float(t, k)}px`], {...CL, easing: OUT}),
});
export const Move: React.FC = () => {
  const {t} = useT();
  const sent = interpolate(t, [5.5, 5.85], [0, 1], {...CL, easing: INOUT});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="THE MOVE" title="Spot two? Move." />
        <div style={{...card, top: 430, padding: '18px 36px', display: 'flex', alignItems: 'center', gap: 22, ...rise(t, 0.2, 0)}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>Signs spotted</div>
          <div style={{display: 'flex', gap: 12, marginLeft: 'auto'}}>
            <Check at={0.55} />
            <Check at={0.9} />
            <Check at={null} />
          </div>
        </div>
        <div style={{...card, top: 580, padding: '20px 36px 14px', ...rise(t, 2.5, 1)}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 6}}>MY 3 BIGGEST WINS</div>
          {WINS.map((w, i) => (
            <div
              key={w.w}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                padding: '10px 0',
                borderTop: '2px solid #EEEAE4',
                opacity: interpolate(t, [w.at, w.at + 0.45], [0, 1], {...CL, easing: OUT}),
                translate: interpolate(t, [w.at, w.at + 0.55], ['40px 0px', '0px 0px'], {...CL, easing: OUT}),
              }}
            >
              <div style={{width: 44, height: 44, borderRadius: '50%', background: C.green, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
              <Underline color={C.green} strokeWidth={4} seed={i + 21} progress={interpolate(t, [w.at + 0.3, w.at + 0.75], [0, 1], {...CL, easing: INOUT})}>
                <span style={{fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.ink}}>{w.w}</span>
              </Underline>
            </div>
          ))}
        </div>
        <div style={{...card, top: 900, padding: '20px 36px', display: 'flex', alignItems: 'center', gap: 22, ...rise(t, 4.4, 2)}}>
          <div style={{width: 76, height: 76, borderRadius: 18, background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1.05}}>
            <div>THU</div>
            <div style={{fontSize: 30}}>9:30</div>
          </div>
          <div>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.ink}}>15 min with Priya</div>
            <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 26, color: C.muted, marginTop: 2}}>{"Your boss's boss (VP)"}</div>
          </div>
          <div style={{position: 'relative', marginLeft: 'auto', width: 120, height: 50, borderRadius: 999, overflow: 'hidden', background: '#F1ECE4', scale: String(interpolate(t, [5.4, 5.55, 5.8], [1, 0.92, 1], {...CL, easing: [OUT, OUT]}))}}>
            <div style={{position: 'absolute', inset: 0, background: C.green, opacity: sent > 0 ? 1 : 0, scale: `${sent} 1`, transformOrigin: 'left center'}} />
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 24, color: sent > 0.5 ? C.white : C.ink}}>{sent > 0.5 ? 'SENT' : 'SEND'}</div>
          </div>
        </div>
      </Push>
      <Sfx at={0.55} name="click" volume={0.4} />
      <Sfx at={0.9} name="click" volume={0.4} />
      {WINS.map((w) => (
        <Sfx key={w.w} at={w.at} name="blip" volume={0.26} />
      ))}
      <Sfx at={4.4} name="pop" volume={0.35} />
      <Sfx at={5.5} name="send" volume={0.38} />
      <Caps
        top={1290}
        caps={[
          {text: 'Spot two, and move.', start: 0.44, end: 2.4, key: 'move.', se: 2.12},
          {text: "Write down your three biggest wins, and get fifteen minutes with your boss's boss.", start: 2.56, end: 6.75, key: 'wins,', se: 6.45},
        ]}
      />
    </Paper>
  );
};

import React from 'react';
import {Easing, interpolate} from 'remotion';
import {StrikeThrough, Underline} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx, TypeClicks, typedText} from '../components';
import {CL, Caps, INOUT, Label, Mark, Paper, Pill, Push, card, ez, useT} from './kit';

/* 3. Move 1: Effort vs Evidence. The vague line "I worked hard on the launch." is struck through, then the evidence line
   types in below and its numbers get underlined, with two result chips: "2 weeks early" and "Tickets down 33%". */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const L1 = 'Shipped the launch 2 weeks early.';
const L2 = 'Cut support tickets by a third.';
const STEPS1 = [{text: L1, from: 5.5, to: 6.9, mode: 'type' as const}];
const STEPS2 = [{text: L2, from: 7.5, to: 8.7, mode: 'type' as const}];
const lbl: React.CSSProperties = {fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2};
export const Move1: React.FC = () => {
  const {f, t} = useT();
  const form = ez(t, 0.15, 0.5);
  const effort = interpolate(t, [1.4, 1.75], [0, 1], {...CL, easing: POP});
  const evid = interpolate(t, [2.1, 2.45], [0, 1], {...CL, easing: POP});
  const strike = interpolate(t, [4.2, 4.9], [0, 1], {...CL, easing: INOUT});
  const u1 = interpolate(t, [7.0, 7.5], [0, 1], {...CL, easing: INOUT});
  const u2 = interpolate(t, [8.8, 9.3], [0, 1], {...CL, easing: INOUT});
  const chip1 = interpolate(t, [7.0, 7.35], [0, 1], {...CL, easing: POP});
  const chip2 = interpolate(t, [8.8, 9.15], [0, 1], {...CL, easing: POP});
  const t1 = typedText(f, STEPS1);
  const t2 = typedText(f, STEPS2);
  const caret = Math.floor(t * 2.5) % 2 === 0 ? '|' : '';
  const line: React.CSSProperties = {fontFamily: SANS, fontWeight: 800, fontSize: 38, lineHeight: 1.25, color: C.ink, minHeight: 48};
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Evidence, not effort" />
        <Pill p={effort} bg={C.red} size={28} style={{left: 70, top: 440}}>
          Effort: forgotten
        </Pill>
        <Pill p={evid} bg={C.green} size={28} style={{left: 390, top: 440}}>
          Evidence: remembered
        </Pill>
        <div style={{...card, top: 530, height: 490, padding: '30px 40px', boxSizing: 'border-box', opacity: form, translate: `0px ${(1 - form) * 40}px`}}>
          <div style={{...lbl, color: C.red}}>BEFORE</div>
          <div style={{marginTop: 14, ...line, color: '#5A5246'}}>
            <StrikeThrough color={C.red} strokeWidth={5} iterations={1} seed={12} progress={strike}>
              <span>"I worked hard on the launch."</span>
            </StrikeThrough>
          </div>
          <div style={{height: 2, background: '#EEEAE4', margin: '30px 0 26px'}} />
          <div style={{...lbl, color: C.green}}>AFTER</div>
          <div style={{marginTop: 18, border: '3px solid #EEEAE4', borderRadius: 22, padding: '20px 24px', minHeight: 170, boxSizing: 'border-box'}}>
            <div style={line}>
              {t1.length === L1.length ? (
                <>
                  Shipped the launch{' '}
                  <Underline color={C.green} strokeWidth={5} iterations={1} seed={4} progress={u1}>
                    <span>2 weeks early.</span>
                  </Underline>
                </>
              ) : (
                <>
                  {t1 || <span style={{color: '#C9C2B8'}}>What changed because of you?</span>}
                  {t >= 5.5 && caret}
                </>
              )}
            </div>
            <div style={{...line, marginTop: 10}}>
              {t2.length === L2.length ? (
                <>
                  Cut support tickets{' '}
                  <Underline color={C.green} strokeWidth={5} iterations={1} seed={8} progress={u2}>
                    <span>by a third.</span>
                  </Underline>
                </>
              ) : (
                <>
                  {t2}
                  {t >= 7.5 && caret}
                </>
              )}
            </div>
          </div>
          <div style={{display: 'flex', gap: 16, marginTop: 24}}>
            <div style={{opacity: chip1, scale: String(0.85 + 0.15 * chip1), transformOrigin: 'left center', background: 'rgba(46,158,91,0.14)', color: C.green, fontFamily: SANS, fontWeight: 900, fontSize: 26, padding: '8px 18px', borderRadius: 999, whiteSpace: 'nowrap'}}>
              Launch: 2 weeks early
            </div>
            <div style={{opacity: chip2, scale: String(0.85 + 0.15 * chip2), transformOrigin: 'left center', background: 'rgba(46,158,91,0.14)', color: C.green, fontFamily: SANS, fontWeight: 900, fontSize: 26, padding: '8px 18px', borderRadius: 999, whiteSpace: 'nowrap'}}>
              Tickets: down 33%
            </div>
          </div>
        </div>
      </Push>
      <Sfx at={1.4} name="pop" volume={0.2} />
      <Sfx at={2.1} name="pop" volume={0.2} />
      <Sfx at={4.2} name="snip" volume={0.22} />
      <TypeClicks steps={STEPS1} />
      <TypeClicks steps={STEPS2} />
      <Sfx at={7.0} name="blip" volume={0.2} />
      <Sfx at={8.8} name="blip" volume={0.2} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: write evidence, not effort.', start: 0.53, end: 3.5, key: 'evidence', se: 3.06},
          {text: 'Not "I worked hard on the launch."', start: 3.64, end: 5.4, key: 'hard', se: 5.13},
          {text: 'Write "I shipped the launch two weeks early', start: 5.51, end: 7.42, key: 'two weeks early', se: 7.32},
          {text: 'and cut support tickets by a third."', start: 7.51, end: 9.9, key: 'third', se: 9.12},
        ]}
      />
    </Paper>
  );
};

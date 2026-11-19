import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle, Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, DANA, INOUT, Mark, Paper, Pill, YOU, card, ez, useT} from './kit';

/* 1. Hook: your self review form is on screen from frame 0 with a red "Due Friday" pill. Your modest line types in.
   Then Dana's review of you slides in below: the same sentence, pasted word for word, and the rating is circled. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const LINE = 'I helped out where I could.';
const lbl: React.CSSProperties = {fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted};
export const Hook: React.FC = () => {
  const {t} = useT();
  const form = interpolate(t, [0, 0.45], [0.4, 1], {...CL, easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const due = interpolate(t, [0.5, 0.85], [0, 1], {...CL, easing: POP});
  const typedN = Math.round(interpolate(t, [0.3, 3.2], [3, LINE.length], CL));
  const modest = interpolate(t, [2.4, 3.1], [0, 1], {...CL, easing: INOUT});
  const boss = ez(t, 3.7, 0.55);
  const pasted = interpolate(t, [4.7, 5.0], [0, 1], {...CL, easing: POP});
  const copy = interpolate(t, [5.0, 5.35], [0, 1], {...CL, easing: POP});
  const ring = interpolate(t, [5.6, 6.2], [0, 1], {...CL, easing: INOUT});
  const caret = Math.floor(t * 2.5) % 2 === 0 && t < 3.6 ? '|' : '';
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 400, z: 1.07},
          {t: 2.8, x: 540, y: 420, z: 1.0},
          {t: 4.6, x: 540, y: 820, z: 1.03},
          {t: 6.6, x: 540, y: 900, z: 1.06},
        ]}
      >
        {/* your form */}
        <div style={{...card, top: 190, height: 430, padding: '30px 40px', boxSizing: 'border-box', opacity: form, translate: `0px ${(1 - form) * 30}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 44, color: C.ink}}>My self review</div>
            <div style={{opacity: due, scale: String(0.85 + 0.15 * due), background: C.red, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, padding: '8px 20px', borderRadius: 999, whiteSpace: 'nowrap'}}>Due Friday</div>
          </div>
          <div style={{...lbl, marginTop: 28}}>MY BIGGEST WINS THIS YEAR</div>
          <div style={{marginTop: 18, border: '3px solid #EEEAE4', borderRadius: 22, padding: '22px 26px', fontFamily: SANS, fontWeight: 800, fontSize: 42, color: C.ink, minHeight: 66}}>
            <Highlight color="rgba(224,169,59,0.45)" iterations={1} seed={5} padding={{left: 4, right: 4, top: 0, bottom: 0}} progress={modest}>
              <span>{LINE.slice(0, typedN)}</span>
            </Highlight>
            {caret}
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 22}}>
            <Av i="YOU" bg={YOU.shirt} size={48} fg={C.ink} />
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.muted}}>Draft saved</div>
          </div>
        </div>
        {/* Dana's review of you */}
        <div style={{...card, top: 680, height: 420, padding: '30px 40px', boxSizing: 'border-box', opacity: boss, translate: `0px ${(1 - boss) * 60}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, paddingBottom: 20, borderBottom: '2px solid #EEEAE4'}}>
            <Av i="DA" bg={DANA.shirt} size={58} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>Dana's review of you</div>
          </div>
          <div style={{...lbl, marginTop: 26}}>SUMMARY</div>
          <div style={{marginTop: 14, height: 64, display: 'flex', alignItems: 'center'}}>
            {pasted > 0.01 ? (
              <div style={{opacity: pasted, fontFamily: SANS, fontWeight: 800, fontSize: 40, color: C.ink}}>"{LINE}"</div>
            ) : (
              <div style={{width: '100%', height: 60, borderRadius: 18, border: '3px dashed #E2DBD0'}} />
            )}
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 70, marginTop: 34}}>
            <div style={lbl}>RATING</div>
            <Circle color={C.red} strokeWidth={5} iterations={1} seed={9} padding={{top: 6, bottom: 6, left: 8, right: 8}} progress={ring}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink, whiteSpace: 'nowrap', padding: '0 4px'}}>Meets expectations</div>
            </Circle>
          </div>
          <Pill p={copy} bg={C.ink} size={26} style={{right: 40, top: 118}}>
            Copied word for word
          </Pill>
        </div>
      </Camera>
      <Sfx at={0.5} name="ping" volume={0.22} />
      <Sfx at={2.4} name="snip" volume={0.14} />
      <Sfx at={3.7} name="whoosh" volume={0.16} />
      <Sfx at={4.7} name="click" volume={0.2} />
      <Sfx at={5.0} name="pop" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Your self review is due Friday.', start: 0.24, end: 2.15, key: 'friday', se: 1.87},
          {text: "You're going to be modest.", start: 2.2, end: 3.65, key: 'modest', se: 3.52},
          {text: 'And your boss is going to copy it word for word.', start: 3.7, end: 7.2, key: 'copy word', se: 6.54},
        ]}
      />
    </Paper>
  );
};

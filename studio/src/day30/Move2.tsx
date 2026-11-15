import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle, Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, DANA, INOUT, Label, Mark, Paper, Pill, Push, RAJ, card, ez, useT} from './kit';

/* 4. Move 2: the one page handover doc you write yourself. "CC: Dana (boss)" gets highlighted,
   a "1 page" pill lands, then DONE, IN PROGRESS and YOURS WHEN BACK fill in, and the last one is circled. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const SECTIONS = [
  {head: 'DONE', color: C.green, line: 'Invoice fix shipped Friday', at: 6.14},
  {head: 'IN PROGRESS', color: C.amber, line: 'Report export, 60% there', at: 6.95},
  {head: 'YOURS WHEN BACK', color: C.red, line: 'Acme renewal call, Thu 15th', at: 7.85},
];
export const Move2: React.FC = () => {
  const {t} = useT();
  const doc = ez(t, 0.2, 0.55);
  const cc = interpolate(t, [3.3, 3.9], [0, 1], {...CL, easing: INOUT});
  const page = interpolate(t, [5.22, 5.55], [0, 1], {...CL, easing: POP});
  const ring = interpolate(t, [8.6, 9.2], [0, 1], {...CL, easing: INOUT});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="2/3" title="Write the handover" />
        <div style={{...card, top: 440, height: 650, padding: '30px 44px', boxSizing: 'border-box', opacity: doc, translate: `0px ${(1 - doc) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.muted}}>HANDOVER DOC</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 46, color: C.ink, marginTop: 8}}>While I'm out</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 20}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted}}>To:</div>
              <Av i="SA" bg={RAJ.shirt} size={46} />
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>Sam</div>
            </div>
            <Highlight color="rgba(224,169,59,0.85)" iterations={1} seed={8} padding={{left: 10, right: 10, top: 2, bottom: 2}} progress={cc}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px'}}>
                <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted}}>CC:</div>
                <Av i="DA" bg={DANA.shirt} size={46} />
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink, whiteSpace: 'nowrap'}}>Dana (boss)</div>
              </div>
            </Highlight>
          </div>
          <div style={{height: 2, background: '#EEEAE4', marginTop: 24}} />
          <div style={{display: 'flex', flexDirection: 'column', gap: 26, marginTop: 26}}>
            {SECTIONS.map((sec, i) => {
              const p = interpolate(t, [sec.at, sec.at + 0.4], [0, 1], {...CL, easing: INOUT});
              const head = <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 2, color: sec.color, padding: '0 6px'}}>{sec.head}</div>;
              return (
                <div key={sec.head}>
                  {i === 2 ? (
                    <div style={{display: 'inline-block'}}>
                      <Circle color={C.red} strokeWidth={5} iterations={1} seed={12} padding={{top: 6, bottom: 6, left: 14, right: 14}} progress={ring}>
                        {head}
                      </Circle>
                    </div>
                  ) : (
                    head
                  )}
                  <div style={{position: 'relative', height: 56, marginTop: 8}}>
                    <div style={{position: 'absolute', left: 0, top: 18, height: 20, width: 560, borderRadius: 10, background: '#EEEAE4', opacity: 1 - p}} />
                    <div style={{position: 'absolute', left: 0, top: 4, fontFamily: SANS, fontWeight: 800, fontSize: 38, color: C.ink, whiteSpace: 'nowrap', opacity: p, translate: `${(1 - p) * 24}px 0px`}}>{sec.line}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <Pill p={page} bg={C.ink} size={26} style={{right: 44, top: 30}}>
            1 page
          </Pill>
        </div>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={3.3} name="whoosh" volume={0.14} />
      <Sfx at={5.22} name="pop" volume={0.26} />
      {SECTIONS.map((sec) => (
        <Sfx key={sec.head} at={sec.at} name="click" volume={0.22} />
      ))}
      <Sfx at={8.6} name="snip" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: write the handover doc yourself, and send it to your boss too.', start: 0.47, end: 5.1, key: 'handover boss', se: 4.68},
          {text: 'One page.', start: 5.22, end: 6.02, key: 'one page', se: 5.64},
          {text: "What's done, what's in progress, and what's yours when you return.", start: 6.14, end: 9.9, key: 'yours return', se: 9.18},
        ]}
      />
    </Paper>
  );
};

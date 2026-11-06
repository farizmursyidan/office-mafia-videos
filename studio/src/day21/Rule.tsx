import React from 'react';
import {interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Mark, Night, OUT, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: two identical folders, one hides a promotion, the other a parking spot. */
const Folder: React.FC<{left: number; open: number; close: number; idx: number; children: React.ReactNode}> = ({left, open, close, idx, children}) => {
  const {t} = useT();
  const q = ez(t, 0.4 + idx * 0.2, 0.5);
  const lift = interpolate(t, [open, open + 0.45], [0, 1], {...CL, easing: INOUT}) * (1 - interpolate(t, [close, close + 0.45], [0, 1], {...CL, easing: INOUT}));
  return (
    <div style={{position: 'absolute', left, top: 600, width: 440, height: 560, opacity: q, translate: `0px ${(1 - q) * 40}px`}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 300, borderRadius: 24, background: C.nightSoft, border: '3px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: lift, boxSizing: 'border-box'}}>{children}</div>
      <div style={{position: 'absolute', left: 0, top: 262 - 0 + (1 - lift) * -120 + 0, width: 190, height: 50, background: '#C99A3E', borderRadius: '16px 16px 0 0'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 310 + (1 - lift) * -120, height: 230, background: C.amber, borderRadius: '0 22px 22px 22px', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 30px', boxSizing: 'border-box'}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 56, lineHeight: 1.06, color: C.ink}}>SPECIAL PROJECT</div>
      </div>
    </div>
  );
};
export const Rule: React.FC = () => {
  const {t} = useT();
  const day = ez(t, 6.3, 0.4);
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 210, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.3)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26, height: 200}}>
          <div style={{position: 'absolute', top: 66, left: 0, right: 0, opacity: 1 - ez(t, 6.0, 0.25)}}>
            <Reveal at={2.2} se={5.59} size={84}>
              Promotion or parking spot?
            </Reveal>
          </div>
          {t >= 6.05 && (
            <div style={{position: 'absolute', top: 66, left: 0, right: 0}}>
              <Reveal at={6.17} se={7.4} size={84} color={C.amber} italic mark={{word: 'same', color: C.white, at: 6.9}}>
                They look the same on day one.
              </Reveal>
            </div>
          )}
        </div>
      </div>
      <Folder left={80} open={2.2} close={6.17} idx={0}>
        <div style={{textAlign: 'center'}}>
          <svg width={90} height={80} viewBox="0 0 90 80" style={{display: 'block', margin: '0 auto'}}>
            <path d="M45 4 L84 44 H60 V76 H30 V44 H6 Z" fill={C.green} />
          </svg>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 44, color: C.green, marginTop: 6}}>PROMOTION</div>
        </div>
      </Folder>
      <Folder left={560} open={4.01} close={6.17} idx={1}>
        <div style={{textAlign: 'center'}}>
          <div style={{width: 100, height: 100, margin: '0 auto', background: '#3F6FB5', borderRadius: 16, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 76, lineHeight: '100px'}}>P</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: '#8FB4E8', marginTop: 10, whiteSpace: 'nowrap'}}>PARKING SPOT</div>
        </div>
      </Folder>
      <div style={{position: 'absolute', left: 0, right: 0, top: 1110, textAlign: 'center', opacity: day, translate: `0px ${(1 - day) * 20}px`}}>
        <span style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, letterSpacing: 4, color: C.white}}>DAY ONE: SAME FOLDER</span>
      </div>
      <Sfx at={2.2} name="click" volume={0.28} />
      <Sfx at={4.01} name="click" volume={0.28} />
      <Sfx at={6.17} name="pop" volume={0.32} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.26, end: 2.1, key: 'rule', se: 1.72},
          {text: 'Some projects are promotions.', start: 2.2, end: 3.9, key: 'promotions', se: 3.77},
          {text: 'Others are parking spots.', start: 4.01, end: 6.05, key: 'parking', se: 5.59},
          {text: 'And they look the same on day one.', start: 6.17, end: 8.3, key: 'same', se: 7.4},
        ]}
      />
    </Night>
  );
};

import React from 'react';
import {interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {CL, Caps, INOUT, Mark, Night, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: two columns of work that fill up in turn and never overlap. */
const RUN = ['Meeting notes', 'Onboarding docs', 'Booking rooms', 'Birthday cards'];
const PRO = ['Client demo', 'VP update', 'Revenue project', 'Big launch'];
const Col: React.FC<{left: number; head: string; items: string[]; at: number; hot?: boolean; top: number}> = ({left, head, items, at, hot, top}) => {
  const {t} = useT();
  const p = ez(t, hot ? 1.0 : 0.5, 0.5);
  return (
    <div style={{position: 'absolute', left, top, width: 430, height: 560, boxSizing: 'border-box', padding: '26px 26px', borderRadius: 26, background: hot ? C.amber : C.nightSoft, border: hot ? 'none' : '3px solid rgba(255,255,255,0.14)', opacity: p, translate: `0px ${(1 - p) * 40}px`}}>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, lineHeight: 1.12, letterSpacing: 2, color: hot ? C.ink : C.muted, height: 92}}>{head}</div>
      {items.map((w, i) => {
        const q = ez(t, at + i * 0.22, 0.4);
        return (
          <div key={w} style={{marginTop: 16, height: 86, borderRadius: 16, background: hot ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.08)', color: hot ? C.ink : C.white, fontFamily: SANS, fontWeight: 800, fontSize: 38, display: 'flex', alignItems: 'center', padding: '0 20px', whiteSpace: 'nowrap', opacity: q, translate: `${(1 - q) * -20}px 0px`}}>
            {w}
          </div>
        );
      })}
    </div>
  );
};
export const Rule: React.FC = () => {
  const {t} = useT();
  const drop = interpolate(t, [4.8, 5.3], [0, 1], {...CL, easing: INOUT});
  const top = 300 + drop * 200;
  const ne = ez(t, 5.5, 0.4);
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 210, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.4)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26}}>
          <Reveal at={5.23} se={6.29} size={92} mark={{word: 'same.', color: C.amber, at: 6.0}}>
            {"They're almost never the same."}
          </Reveal>
        </div>
      </div>
      <Col left={80} top={top} at={2.11} head="KEEPS THE TEAM RUNNING" items={RUN} />
      <Col left={570} top={top} at={3.66} head="GETS YOU PROMOTED" items={PRO} hot />
      <div style={{position: 'absolute', left: 494, top: top + 240, width: 92, height: 92, borderRadius: '50%', background: C.white, color: C.red, fontFamily: SANS, fontWeight: 900, fontSize: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: ne, scale: String(0.7 + ne * 0.3), boxShadow: '0 12px 30px rgba(0,0,0,0.4)'}}>≠</div>
      <Sfx at={2.11} name="click" volume={0.28} />
      <Sfx at={3.66} name="click" volume={0.28} />
      <Sfx at={5.5} name="hit" volume={0.4} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.48, end: 2.0, key: 'rule', se: 1.68},
          {text: 'Some work keeps the team running.', start: 2.11, end: 3.55, key: 'running', se: 3.36},
          {text: 'Other work gets you promoted.', start: 3.66, end: 5.1, key: 'promoted', se: 4.75},
          {text: "They're almost never the same.", start: 5.23, end: 7.1, key: 'never', se: 6.29},
        ]}
      />
    </Night>
  );
};

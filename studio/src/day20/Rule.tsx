import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Mark, Night, OUT, ez, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: the boss only signs what is on the table, and you are not on it. */
const CASES = [
  {i: 'RA', bg: '#5B8C5A', n: 'Raj', at: 4.75},
  {i: 'ME', bg: '#9A5BB0', n: 'Mei', at: 5.3},
  {i: 'TO', bg: '#4F7F8C', n: 'Tom', at: 5.85},
];
const Row: React.FC<{i: string; bg: string; n: string; at: number; idx: number}> = ({i, bg, n, at, idx}) => {
  const {t} = useT();
  const q = ez(t, 0.8 + idx * 0.25, 0.45);
  const st = interpolate(t, [at, at + 0.3], [0, 1], {...CL, easing: Easing.bezier(0.3, 1.5, 0.5, 1)});
  return (
    <div style={{marginTop: 12, height: 100, borderRadius: 18, background: 'rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', gap: 20, padding: '0 22px', opacity: q, translate: `${(1 - q) * -30}px 0px`, position: 'relative'}}>
      <Av i={i} bg={bg} size={72} />
      <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 40, color: C.white, whiteSpace: 'nowrap'}}>{n}</div>
      <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 30, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap'}}>promotion case</div>
      {st > 0 && (
        <div style={{position: 'absolute', right: 20, top: 26, opacity: interpolate(st, [0, 0.4], [0, 1], CL), rotate: '-3deg', scale: String(interpolate(t, [at, at + 0.3], [1.5, 1], {...CL, easing: OUT}))}}>
          <div style={{border: `4px solid ${C.green}`, color: C.green, background: C.night, fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 2, padding: '2px 12px', borderRadius: 10}}>APPROVED</div>
        </div>
      )}
    </div>
  );
};
export const Rule: React.FC = () => {
  const {t} = useT();
  const drop = interpolate(t, [6.6, 7.1], [0, 1], {...CL, easing: INOUT});
  const top = 300 + drop * 195;
  const table = ez(t, 0.45, 0.5);
  const you = ez(t, 7.5, 0.45);
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 210, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.4)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{marginTop: 26, maxWidth: 740}}>
          <Reveal at={7.1} se={8.81} size={92} mark={{word: 'it.', color: C.amber, at: 8.5}}>
            {"If you never ask, you're not on it."}
          </Reveal>
        </div>
      </div>
      <div style={{position: 'absolute', left: 80, right: 80, top, height: 450, boxSizing: 'border-box', padding: '24px 24px', borderRadius: 26, background: C.nightSoft, border: '3px solid rgba(255,255,255,0.14)', opacity: table, translate: `0px ${(1 - table) * 40}px`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, letterSpacing: 3, color: C.amber, height: 48}}>{"ON THE BOSS'S TABLE"}</div>
        {CASES.map((c, i) => (
          <Row key={c.n} {...c} idx={i} />
        ))}
      </div>
      <div style={{position: 'absolute', left: 80, right: 80, top: top + 472, height: 130, boxSizing: 'border-box', borderRadius: 22, border: `4px dashed ${C.muted}`, display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px', opacity: you, translate: `0px ${(1 - you) * 30}px`}}>
        <Av i="YOU" bg={C.amber} fg={C.ink} size={84} />
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 40, color: C.white, whiteSpace: 'nowrap'}}>Still waiting. No case.</div>
      </div>
      <Sfx at={2.33} name="click" volume={0.28} />
      <Sfx at={4.75} name="hit" volume={0.3} />
      <Sfx at={5.3} name="hit" volume={0.3} />
      <Sfx at={5.85} name="hit" volume={0.3} />
      <Sfx at={7.5} name="pop" volume={0.32} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.33, end: 2.2, key: 'rule', se: 1.62},
          {text: "Bosses don't hand out promotions.", start: 2.33, end: 4.3, key: 'promotions', se: 3.9},
          {text: 'They approve the ones already on the table.', start: 4.42, end: 6.95, key: 'table', se: 6.42},
          {text: "If you never ask, you're not on it.", start: 7.1, end: 9.3, key: 'ask', se: 8.81},
        ]}
      />
    </Night>
  );
};

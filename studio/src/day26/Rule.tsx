import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Mark, Night, Pill, ez, mix, useT} from './kit';
import {Reveal} from './Outro';

/* 2. The rule: nine coworkers start as individuals, then slide into three groups with labels. Yours gets judged as one. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
type P = {i: string; bg: string; fg?: string; g: number; o: [number, number]};
const GROUPS = [
  {name: 'LUNCH CREW', cx: 250, cy: 215, color: C.amber, labelY: 20},
  {name: 'OLD GUARD', cx: 710, cy: 215, color: '#6FA0D8', labelY: 20},
  {name: 'HAPPY HOUR', cx: 650, cy: 510, color: '#7FB287', labelY: 650},
];
const PEOPLE: P[] = [
  {i: 'YOU', bg: C.amber, fg: C.ink, g: 0, o: [-60, -60]},
  {i: 'SA', bg: '#6C6F7D', g: 0, o: [60, -60]},
  {i: 'ME', bg: '#9A5BB0', g: 0, o: [-60, 60]},
  {i: 'TO', bg: '#4F7F8C', g: 0, o: [60, 60]},
  {i: 'KA', bg: '#2F3A4F', g: 1, o: [-60, -50]},
  {i: 'BO', bg: '#7A5C3E', g: 1, o: [60, -50]},
  {i: 'LI', bg: '#5B8C5A', g: 1, o: [0, 60]},
  {i: 'JO', bg: '#B5523F', g: 2, o: [-60, 0]},
  {i: 'AL', bg: '#3F6FB5', g: 2, o: [60, 0]},
];
/* start: a loose 3x3 grid, each person placed near their group so no paths cross */
const GRID = [
  [160, 110],
  [480, 110],
  [160, 340],
  [480, 340],
  [800, 110],
  [800, 340],
  [800, 570],
  [160, 570],
  [480, 570],
];
const SIZE = 96;
export const Rule: React.FC = () => {
  const {t} = useT();
  const join = interpolate(t, [3.85, 4.9], [0, 1], {...CL, easing: INOUT});
  const judged = interpolate(t, [5.4, 5.75], [0, 1], {...CL, easing: POP});
  const dim = interpolate(t, [5.3, 5.7], [0, 1], CL);
  return (
    <Night>
      <Mark dark />
      <div style={{position: 'absolute', top: 210, left: 80, right: 80}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.amber, opacity: ez(t, 0.3)}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{position: 'relative', marginTop: 30, height: 120}}>
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, opacity: 1 - ez(t, 3.8, 0.25)}}>
            <Reveal at={2.16} se={3.62} size={92}>
              Not people.
            </Reveal>
          </div>
          {t >= 3.85 && (
            <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
              <Reveal at={3.96} se={5.09} size={92} color={C.amber} italic mark={{word: 'Groups.', color: C.white, at: 4.9}}>
                Groups.
              </Reveal>
            </div>
          )}
        </div>
      </div>
      <div style={{position: 'absolute', left: 60, right: 60, top: 470, height: 690}}>
        {GROUPS.map((g, k) => {
          const dimmed = k === 0 ? 0 : dim;
          return (
            <React.Fragment key={g.name}>
              <div
                style={{
                  position: 'absolute',
                  left: g.cx - 140,
                  top: g.cy - 140,
                  width: 280,
                  height: 280,
                  borderRadius: '50%',
                  border: `5px solid ${g.color}`,
                  background: 'rgba(255,255,255,0.04)',
                  boxSizing: 'border-box',
                  opacity: join * (1 - 0.6 * dimmed),
                  scale: String(mix(0.7, 1, join)),
                }}
              />
              <div style={{position: 'absolute', left: g.cx - 160, width: 320, top: g.labelY, textAlign: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 3, color: g.color, opacity: ez(t, 4.6, 0.4) * (1 - 0.6 * dimmed)}}>{g.name}</div>
            </React.Fragment>
          );
        })}
        {PEOPLE.map((p, k) => {
          const g = GROUPS[p.g];
          const x = mix(GRID[k][0], g.cx + p.o[0], join);
          const y = mix(GRID[k][1], g.cy + p.o[1], join) + Math.sin(t * 1.6 + k) * 4 * (1 - join);
          const enter = ez(t, 0.1 + k * 0.07, 0.45);
          return (
            <div key={p.i} style={{position: 'absolute', left: x - SIZE / 2, top: y - SIZE / 2, opacity: enter * (p.g === 0 ? 1 : 1 - 0.6 * dim), scale: String(mix(0.6, 1, enter))}}>
              <Av i={p.i} bg={p.bg} fg={p.fg} size={SIZE} />
            </div>
          );
        })}
        <Pill p={judged} bg={C.red} size={30} style={{left: 115, top: 380}}>
          JUDGED AS ONE
        </Pill>
      </div>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={3.9} name="whoosh" volume={0.2} />
      <Sfx at={5.4} name="hit" volume={0.3} />
      <Caps
        top={1290}
        dark
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.31, end: 2.08, key: 'rule', se: 1.69},
          {text: "Leadership doesn't see people.", start: 2.16, end: 3.9, key: 'people', se: 3.62},
          {text: 'It sees groups.', start: 3.96, end: 5.3, key: 'groups', se: 5.09},
          {text: 'And you get judged by yours.', start: 5.36, end: 7.1, key: 'judged', se: 6.48},
        ]}
      />
    </Night>
  );
};

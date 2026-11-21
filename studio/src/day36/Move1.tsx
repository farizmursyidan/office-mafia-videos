import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, Paper, Pill, Push, TOM, YOU, card, ez, useT} from './kit';

/* 3. Move 1: the kickoff doc. "Owners" lines type themselves in as the voice reads them ("Deck: Dan", "Data: You"),
   each with an avatar. Then the doc gets shared with the whole team (8 avatars) and Dan's name gets circled. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const LINES = [
  {task: 'Deck', who: 'Dan', i: 'DA', bg: TOM.shirt, fg: C.white, at: 4.8},
  {task: 'Data', who: 'You', i: 'YOU', bg: YOU.shirt, fg: C.ink, at: 6.0},
  {task: 'Client section', who: 'Dan', i: 'DA', bg: TOM.shirt, fg: C.white, at: 6.8},
];
const TEAM = ['#6C9BD8', '#B5523F', '#5B8C5A', '#9A5BB0', '#2F3A4F', '#3F6FB5', TOM.shirt, YOU.shirt];
const typed = (s: string, t: number, at: number, cps = 22) => s.slice(0, Math.max(0, Math.floor((t - at) * cps)));

export const Move1: React.FC = () => {
  const {t} = useT();
  const doc = ez(t, 0.15, 0.5);
  const shared = ez(t, 7.3, 0.5);
  const ring = interpolate(t, [8.0, 8.6], [0, 1], {...CL, easing: INOUT});
  const pill = interpolate(t, [8.4, 8.75], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Put names on the work" />
        <div style={{...card, top: 440, height: 660, padding: '30px 44px', boxSizing: 'border-box', opacity: doc, translate: `0px ${(1 - doc) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 18, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{width: 40, height: 50, borderRadius: 6, background: '#6C9BD8'}} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>Kickoff: Client pitch</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted}}>Day 1 of the project</div>
            </div>
          </div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted, marginTop: 24}}>OWNERS</div>
          {LINES.map((l, k) => {
            const p = ez(t, l.at, 0.3);
            const text = `${l.task}: ${l.who}`;
            const shown = typed(text, t, l.at);
            const nameP = interpolate(t, [l.at + 0.3, l.at + 0.6], [0, 1], {...CL, easing: POP});
            return (
              <div key={k} style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 20, height: 64, opacity: p}}>
                <div style={{width: 10, height: 10, borderRadius: 5, background: C.ink}} />
                <div style={{flex: 1, fontFamily: SANS, fontWeight: 800, fontSize: 40, color: C.ink, whiteSpace: 'nowrap'}}>
                  {k === 0 ? (
                    <Circle color={C.amber} strokeWidth={5} iterations={1} seed={4} padding={{top: 6, bottom: 6, left: 14, right: 14}} progress={ring}>
                      <span>{shown}</span>
                    </Circle>
                  ) : (
                    shown
                  )}
                  {shown.length < text.length && t > l.at && <span style={{color: C.amber}}>|</span>}
                </div>
                <div style={{opacity: nameP, scale: String(0.7 + 0.3 * nameP)}}>
                  <Av i={l.i} bg={l.bg} size={58} fg={l.fg} />
                </div>
              </div>
            );
          })}
          {/* shared with the team */}
          <div style={{position: 'absolute', left: 44, right: 44, bottom: 34, opacity: shared, translate: `0px ${(1 - shared) * 20}px`}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted, marginBottom: 14}}>SHARED WITH THE TEAM</div>
            <div style={{display: 'flex'}}>
              {TEAM.map((bg, k) => {
                const q = interpolate(t, [7.4 + k * 0.08, 7.7 + k * 0.08], [0, 1], {...CL, easing: POP});
                return (
                  <div key={k} style={{marginLeft: k ? -14 : 0, opacity: q, scale: String(0.6 + 0.4 * q), border: '4px solid white', borderRadius: '50%'}}>
                    <Av i="" bg={bg} size={60} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Pill p={pill} bg={C.green} size={28} style={{right: 120, top: 1000}}>
          Everyone can see it
        </Pill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.22} />
      {LINES.map((l) => (
        <Sfx key={l.at} at={l.at + 0.3} name="pop" volume={0.16} />
      ))}
      <Sfx at={7.3} name="whoosh" volume={0.14} />
      <Sfx at={8.0} name="snip" volume={0.18} />
      <Sfx at={8.4} name="ping" volume={0.2} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: put names on the work from day one.', start: 0.52, end: 3.25, key: 'names', se: 2.96},
          {text: 'In the kickoff doc, write "Deck: Dan. Data: you."', start: 3.33, end: 7.15, key: 'kickoff doc', se: 6.81},
          {text: 'Now everyone can see who owns what.', start: 7.25, end: 9.8, key: 'owns', se: 9.37},
        ]}
      />
    </Paper>
  );
};

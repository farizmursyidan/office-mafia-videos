import React from 'react';
import {Easing, interpolate} from 'remotion';
import {CrossedOff, Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, DANA, INOUT, Label, Mark, Paper, Pill, Push, RAJ, card, ez, useT} from './kit';

/* 3. Move 1: a small org chart gets crossed off ("Not the org chart"). Below, a "When something breaks" card counts
   who people actually message: Raj from IT ops wins by a mile and gets circled, then a coffee invite for week one pops in. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const BOX: React.CSSProperties = {background: '#F1EEE9', borderRadius: 14, padding: '8px 18px', fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.ink, whiteSpace: 'nowrap'};
const ROWS = [
  {i: 'RA', bg: RAJ.shirt, name: 'Raj, IT ops', n: 23},
  {i: 'DA', bg: DANA.shirt, name: 'Your manager', n: 4},
  {i: 'VP', bg: '#2F3A4F', name: 'The VP', n: 1},
];
export const Move1: React.FC = () => {
  const {t} = useT();
  const org = ez(t, 0.15, 0.5);
  const cross = interpolate(t, [3.8, 4.5], [0, 1], {...CL, easing: INOUT});
  const asked = ez(t, 4.9, 0.5);
  const grow = interpolate(t, [5.4, 7.0], [0, 1], {...CL, easing: INOUT});
  const ring = interpolate(t, [7.0, 7.6], [0, 1], {...CL, easing: INOUT});
  const coffee = interpolate(t, [8.0, 8.4], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="1/3" title="Find who people ask" />
        {/* org chart */}
        <div style={{...card, top: 440, height: 200, padding: '22px 40px', boxSizing: 'border-box', opacity: org, translate: `0px ${(1 - org) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted}}>ORG CHART</div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 16}}>
            <CrossedOff color={C.red} strokeWidth={6} iterations={1} seed={7} progress={cross}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '0 20px'}}>
                <div style={BOX}>VP</div>
                <div style={{display: 'flex', gap: 30}}>
                  <div style={BOX}>Manager</div>
                  <div style={BOX}>Manager</div>
                  <div style={BOX}>You</div>
                </div>
              </div>
            </CrossedOff>
          </div>
        </div>
        {/* who actually gets messaged */}
        <div style={{...card, top: 680, height: 440, padding: '26px 40px', boxSizing: 'border-box', opacity: asked, translate: `0px ${(1 - asked) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.ink}}>When something breaks</div>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted}}>MESSAGES</div>
          </div>
          {ROWS.map((r, k) => (
            <div key={r.i} style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 20}}>
              <Av i={r.i} bg={r.bg} size={52} />
              <div style={{width: 230, fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.ink, whiteSpace: 'nowrap'}}>
                {k === 0 ? (
                  <Circle color={C.amber} strokeWidth={5} iterations={1} seed={3} padding={{top: 4, bottom: 4, left: 10, right: 10}} progress={ring}>
                    <span>{r.name}</span>
                  </Circle>
                ) : (
                  r.name
                )}
              </div>
              <div style={{flex: 1, height: 22, borderRadius: 11, background: '#EEEAE4', overflow: 'hidden'}}>
                <div style={{height: '100%', width: `${(r.n / 23) * 100 * grow}%`, background: k === 0 ? C.amber : '#C9C2B8', borderRadius: 11}} />
              </div>
              <div style={{width: 50, textAlign: 'right', fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>{Math.round(r.n * grow)}</div>
            </div>
          ))}
          <div style={{position: 'absolute', left: 40, right: 40, bottom: 28, display: 'flex', alignItems: 'center', gap: 16, opacity: coffee, translate: `0px ${(1 - coffee) * 20}px`, background: 'rgba(46,158,91,0.12)', borderRadius: 18, padding: '14px 20px'}}>
            <div style={{width: 12, alignSelf: 'stretch', borderRadius: 6, background: C.green}} />
            <div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>Coffee with Raj</div>
              <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted}}>Week 1, Thursday 10:00</div>
            </div>
          </div>
        </div>
        <Pill p={coffee} bg={C.green} size={26} style={{right: 110, top: 1036}}>
          Booked
        </Pill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.22} />
      <Sfx at={3.8} name="snip" volume={0.22} />
      <Sfx at={4.9} name="whoosh" volume={0.14} />
      <Sfx at={7.0} name="snip" volume={0.18} />
      <Sfx at={8.0} name="ping" volume={0.22} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move one: find out who people actually ask.', start: 0.46, end: 3.75, key: 'actually ask', se: 3.39},
          {text: 'Not the org chart.', start: 3.79, end: 5.0, key: 'org chart', se: 4.45},
          {text: 'Notice who everyone messages when something breaks,', start: 5.05, end: 7.38, key: 'breaks', se: 7.27},
          {text: 'and buy that person coffee in week one.', start: 7.42, end: 9.9, key: 'coffee', se: 9.15},
        ]}
      />
    </Paper>
  );
};

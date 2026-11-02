import React from 'react';
import {interpolate} from 'remotion';
import {Highlight} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CALL, CL, Camera, Caps, INOUT, Label, Mark, Paper, Tile, card, ez, useT} from './kit';

/* 4. Move 2: line up an ally. Quick chat before the meeting, then Mei does the stepping in on the call. */
const Line: React.FC<{at: number; me?: boolean; children: React.ReactNode}> = ({at, me, children}) => {
  const {t} = useT();
  const p = ez(t, at, 0.45);
  return (
    <div style={{display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start', gap: 14, alignItems: 'flex-end', marginTop: 16, opacity: p, translate: `0px ${(1 - p) * 24}px`}}>
      {!me && <Av i="ME" bg="#9A5BB0" size={60} />}
      <div style={{background: me ? C.amber : '#F1ECE4', color: C.ink, fontFamily: SANS, fontWeight: 700, fontSize: 36, lineHeight: 1.2, padding: '14px 22px', borderRadius: 22, maxWidth: 680}}>{children}</div>
      {me && <Av i="YOU" bg={C.ink} size={60} />}
    </div>
  );
};

export const Move2: React.FC = () => {
  const {t} = useT();
  const call = ez(t, 4.7, 0.55);
  return (
    <Paper>
      <Camera
        shots={[
          {t: 0, x: 540, y: 560, z: 1.04},
          {t: 4.3, x: 540, y: 560, z: 1.0},
          {t: 5.3, x: 540, y: 1000, z: 1.0},
          {t: 10.2, x: 540, y: 1000, z: 1.05},
        ]}
      >
        <div style={{...card, top: 425, height: 330, padding: '20px 32px', boxSizing: 'border-box'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 12, borderBottom: '2px solid #EEEAE4'}}>
            <Av i="ME" bg="#9A5BB0" size={48} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>Mei</div>
            <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 800, fontSize: 24, color: C.muted, letterSpacing: 2}}>BEFORE THE MEETING</div>
          </div>
          <Line at={1.7} me>
            If Mark cuts me off, step in?
          </Line>
          <Line at={3.5}>{"On it."}</Line>
        </div>
        <div style={{position: 'absolute', left: 50, right: 50, top: 785, height: 365, background: CALL, borderRadius: 30, padding: 18, boxSizing: 'border-box', opacity: call, translate: `0px ${(1 - call) * 50}px`, boxShadow: '0 30px 70px rgba(60,45,20,0.28)'}}>
          <div style={{display: 'flex', gap: 14}}>
            <Tile name="Mark" i="MA" bg="#3F6FB5" h={160} dim={ez(t, 7.75, 0.4)} />
            <Tile name="Mei" i="ME" bg="#9A5BB0" h={160} ring={C.amber} />
            <Tile name="You" i="YOU" bg={C.amber} fg={C.ink} h={160} />
          </div>
          <div style={{marginTop: 14, background: '#2A2A33', borderRadius: 18, padding: '14px 22px', height: 136, boxSizing: 'border-box', fontFamily: SANS, fontWeight: 700, fontSize: 36, lineHeight: 1.2, color: C.white, position: 'relative'}}>
            <span style={{color: '#CFA8DE', fontWeight: 900}}>MEI </span>
            <span style={{opacity: ez(t, 5.57, 0.35)}}>
              {'Wait, I want to hear '}
              <Highlight color="rgba(224,169,59,0.55)" iterations={1} seed={9} progress={interpolate(t, [6.5, 7.0], [0, 1], {...CL, easing: INOUT})}>
                <span>the rest of that.</span>
              </Highlight>
            </span>
            <div style={{position: 'absolute', right: 18, bottom: 14, opacity: ez(t, 7.75, 0.4), translate: `0px ${(1 - ez(t, 7.75, 0.4)) * 10}px`, background: C.green, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 1, padding: '6px 18px', borderRadius: 999, whiteSpace: 'nowrap'}}>MARK BACKS OFF</div>
          </div>
        </div>
      </Camera>
      <Mark />
      <Label n="2/3" title="Line up an ally" />
      <Sfx at={1.7} name="send" volume={0.3} />
      <Sfx at={3.5} name="ping" volume={0.3} />
      <Sfx at={5.57} name="pop" volume={0.3} />
      <Sfx at={7.75} name="blip" volume={0.3} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move two: line up an ally.', start: 0.68, end: 3.05, key: 'ally', se: 2.71},
          {text: 'Before the meeting, ask a friend to step in.', start: 3.13, end: 5.5, key: 'friend', se: 5.15},
          {text: '"Wait, I want to hear the rest of that."', start: 5.57, end: 7.68, key: 'rest', se: 7.35},
          {text: 'It lands harder from someone else.', start: 7.74, end: 10.1, key: 'harder', se: 9.13},
        ]}
      />
    </Paper>
  );
};

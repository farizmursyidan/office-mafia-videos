import React from 'react';
import {interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Person} from '../characters';
import {Bub, CL, Caps, DANA, Label, Mark, Paper, Pill, Push, YOU, card, ez, useT} from './kit';

/* 5. Move 3: a video call at 9:58. You and your boss are the only ones in, so you get two minutes of hallway talk before everyone else joins. */
const Tile: React.FC<{p: number; name: string; person?: React.ComponentProps<typeof Person>; bg: string; waiting?: number; talk?: number}> = ({p, name, person, bg, waiting, talk = 0}) => (
  <div style={{position: 'relative', width: 420, height: 240, borderRadius: 22, overflow: 'hidden', background: bg, opacity: p, scale: String(0.94 + 0.06 * p), border: talk > 0 ? `5px solid ${C.green}` : '5px solid transparent', boxSizing: 'border-box'}}>
    {person && (
      <svg width={410} height={230} viewBox="-190 -380 380 213" preserveAspectRatio="xMidYMid slice" style={{position: 'absolute', left: 0, top: 0}}>
        <Person {...person} />
      </svg>
    )}
    {waiting !== undefined && waiting > 0 && (
      <div style={{opacity: waiting, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 28, color: 'rgba(255,255,255,0.5)'}}>Not joined yet</div>
    )}
    <div style={{position: 'absolute', left: 14, bottom: 12, background: 'rgba(0,0,0,0.55)', color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 24, padding: '4px 12px', borderRadius: 8, whiteSpace: 'nowrap'}}>{name}</div>
  </div>
);
export const Move3: React.FC = () => {
  const {t} = useT();
  const win = ez(t, 0.3, 0.5);
  const me = ez(t, 0.8, 0.4);
  const dana = ez(t, 3.4, 0.45);
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const youTalk = t > 4.6 && t < 5.9 ? 1 : 0;
  const danaTalk = t > 5.9 && t < 7.4 ? 1 : 0;
  const nod = (on: number, k: number) => (on ? Math.sin(t * 8 + k) * 2.5 : 0);
  const clock = t < 6.6 ? '9:58' : '9:59';
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Show up early" />
        <div style={{...card, top: 440, height: 620, background: '#1E1F24', padding: '22px 30px', boxSizing: 'border-box', opacity: win, translate: `0px ${(1 - win) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', height: 56, marginBottom: 18}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.white}}>Weekly sync</div>
            <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12}}>
              <div style={{width: 14, height: 14, borderRadius: '50%', background: C.red, opacity: 0.6 + 0.4 * Math.sin(t * 4)}} />
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: C.amber}}>{clock}</div>
              <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 24, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap'}}>starts 10:00</div>
            </div>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: '420px 420px', gap: 20}}>
            <Tile p={me} name="You" bg="#E8E1D6" talk={youTalk} person={{x: 0, y: 0, facing: 1, bob: breathe(0) + nod(youTalk, 0), ...YOU}} />
            <Tile p={dana} name="Dana (boss)" bg="#DCE4EE" talk={danaTalk} person={{x: 0, y: 0, facing: -1, bob: breathe(1) + nod(danaTalk, 1), ...DANA}} />
            <Tile p={win} name="Raj" bg="#2B2C33" waiting={1 - ez(t, 4.4, 0.25)} />
            <Tile p={win} name="Mei" bg="#2B2C33" waiting={1 - ez(t, 5.7, 0.25)} />
          </div>
        </div>
        <Bub at={4.6} left={100} top={790} width={420} tail="none" size={36}>
          How did the client call go?
        </Bub>
        <Bub at={5.9} left={548} top={870} width={400} tail="none" size={34} dark>
          Better than expected. Can I loop you in?
        </Bub>
        <Pill p={ez(t, 6.8, 0.35)} bg={C.green} size={32} style={{left: 90, top: 1090}}>
          YOUR HALLWAY NOW
        </Pill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.28} />
      <Sfx at={0.8} name="ping" volume={0.26} />
      <Sfx at={3.4} name="ping" volume={0.3} />
      <Sfx at={4.6} name="pop" volume={0.3} />
      <Sfx at={5.9} name="pop" volume={0.3} />
      <Sfx at={6.8} name="ping" volume={0.32} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: show up early on video calls.', start: 0.58, end: 3.3, key: 'early', se: 3.13},
          {text: 'Join two minutes before the start and talk to whoever is there.', start: 3.37, end: 6.65, key: 'two minutes', se: 6.28},
          {text: "That's your hallway now.", start: 6.74, end: 8.2, key: 'hallway', se: 7.79},
        ]}
      />
    </Paper>
  );
};

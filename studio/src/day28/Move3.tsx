import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Desk, Person, Plant} from '../characters';
import {Bub, CL, Caps, DANA, INOUT, Label, Mark, Moon, Paper, Pill, Push, Sun, YOU, card, ez, useT} from './kit';

/* 5. Move 3: in the one on one, you say your hours once: "After seven I'm offline. Call me if something's on fire." Below, your day bar splits into ONLINE until 7 and OFFLINE after, with "Calls only" for fires. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
export const Move3: React.FC = () => {
  const {t} = useT();
  const breathe = (k: number) => Math.sin(t * 2.4 + k) * 2;
  const room = ez(t, 0.2, 0.5);
  const hours = ez(t, 0.5, 0.5);
  const chip = interpolate(t, [4.32, 4.7], [0, 1], {...CL, easing: POP});
  const online = interpolate(t, [1.2, 2.6], [0, 1], {...CL, easing: INOUT});
  const offline = interpolate(t, [5.7, 6.5], [0, 1], {...CL, easing: INOUT});
  const calls = interpolate(t, [7.35, 7.7], [0, 1], {...CL, easing: POP});
  const talking = t > 5.6 && t < 8.6;
  const line2 = interpolate(t, [7.31, 7.65], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Say your hours once" />
        {/* one on one */}
        <div style={{...card, top: 440, height: 490, overflow: 'hidden', background: '#F6F2EC', opacity: room, translate: `0px ${(1 - room) * 40}px`}}>
          <svg width={940} height={490} style={{position: 'absolute', left: 0, top: 0}}>
            <rect x={0} y={410} width={940} height={80} fill="#DDD5C8" />
            <Plant x={70} y={410} />
            <Desk x={470} y={360} w={340} />
            <Person x={270} y={440} scale={0.8} facing={1} sitting bob={breathe(0)} armL={talking ? 66 + Math.sin(t * 5) * 4 : 10} {...YOU} />
            <Person x={670} y={440} scale={0.8} facing={-1} sitting bob={breathe(2)} badge="BOSS" {...DANA} />
          </svg>
          <div style={{position: 'absolute', right: 30, top: 24, opacity: 1 - ez(t, 5.4, 0.3)}}>
            <Pill p={chip} bg={C.ink} size={26} style={{position: 'relative'}}>
              1:1 with Dana, Tue 10 AM
            </Pill>
          </div>
        </div>
        {t >= 5.6 ? (
          <Bub at={5.65} left={96} top={470} width={600} tail="left" size={36}>
            After seven I'm offline.
            <div style={{opacity: line2, height: line2 > 0 ? 'auto' : 0, overflow: 'hidden'}}>Call me if something's on fire.</div>
          </Bub>
        ) : null}
        {/* hours */}
        <div style={{...card, top: 950, height: 230, padding: '24px 40px', boxSizing: 'border-box', opacity: hours, translate: `0px ${(1 - hours) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <Sun size={30} />
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.muted}}>9 AM</div>
            </div>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.ink}}>7 PM</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: C.muted}}>11 PM</div>
              <Moon size={28} />
            </div>
          </div>
          <div style={{position: 'relative', height: 70, marginTop: 16, borderRadius: 18, background: '#EEEAE4', overflow: 'hidden'}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${60 * online}%`, background: C.green, display: 'flex', alignItems: 'center', paddingLeft: 22, boxSizing: 'border-box'}}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.white, opacity: online, whiteSpace: 'nowrap'}}>ONLINE</div>
            </div>
            <div style={{position: 'absolute', left: '60%', top: 0, bottom: 0, width: `${40 * offline}%`, background: C.night, display: 'flex', alignItems: 'center', paddingLeft: 20, boxSizing: 'border-box'}}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.white, opacity: offline, whiteSpace: 'nowrap'}}>OFFLINE</div>
            </div>
          </div>
        </div>
        <Pill p={calls} bg={C.red} size={28} style={{left: 640, top: 1110}}>
          Fires: call me
        </Pill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.26} />
      <Sfx at={4.32} name="click" volume={0.24} />
      <Sfx at={5.65} name="pop" volume={0.3} />
      <Sfx at={5.7} name="lock" volume={0.22} />
      <Sfx at={7.35} name="ring" volume={0.2} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: say your hours once, out loud.', start: 0.77, end: 4.2, key: 'hours', se: 3.77},
          {text: 'In your next one on one:', start: 4.32, end: 5.6, key: 'next', se: 5.41},
          {text: '"After seven I\'m offline.', start: 5.65, end: 7.25, key: 'offline', se: 6.89},
          {text: 'Call me if something\'s on fire."', start: 7.31, end: 9.3, key: 'fire', se: 8.44},
        ]}
      />
    </Paper>
  );
};

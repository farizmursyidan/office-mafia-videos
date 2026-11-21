import React from 'react';
import {Easing, interpolate} from 'remotion';
import {Circle} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, DANA, INOUT, Label, Mark, Msg, Paper, Pill, Push, TOM, YOU, card, ez, useT} from './kit';

/* 5. Move 3: the tracker row "Client section" switches owner from Dan to You (circled). Then in the team channel
   your post lands: "I finished the client section so we hit Thursday." Reactions count up and the manager replies. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
export const Move3: React.FC = () => {
  const {t} = useT();
  const tracker = ez(t, 0.15, 0.5);
  const swap = interpolate(t, [1.9, 2.4], [0, 1], {...CL, easing: INOUT});
  const ring = interpolate(t, [2.5, 3.1], [0, 1], {...CL, easing: INOUT});
  const chan = ez(t, 3.3, 0.5);
  const post = ez(t, 4.0, 0.45);
  const reacts = Math.round(interpolate(t, [5.0, 6.0], [0, 7], CL));
  const reactP = interpolate(t, [5.0, 5.3], [0, 1], {...CL, easing: POP});
  const reply = ez(t, 6.0, 0.45);
  const seen = interpolate(t, [6.5, 6.85], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Say it out loud" />
        {/* project tracker */}
        <div style={{...card, top: 440, height: 190, padding: '24px 40px', boxSizing: 'border-box', opacity: tracker, translate: `0px ${(1 - tracker) * 40}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted}}>PROJECT TRACKER</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 20, marginTop: 22}}>
            <div style={{flex: 1, fontFamily: SANS, fontWeight: 900, fontSize: 38, color: C.ink}}>Client section</div>
            <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 26, color: C.muted, marginRight: 24}}>Owner</div>
            <div style={{position: 'relative', width: 190, height: 64}}>
              <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 12, opacity: 1 - swap, translate: `0px ${-swap * 30}px`}}>
                <Av i="DA" bg={TOM.shirt} size={54} />
                <span style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>Dan</span>
              </div>
              <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 12, opacity: swap, translate: `0px ${(1 - swap) * 30}px`}}>
                <Circle color={C.amber} strokeWidth={5} iterations={1} seed={9} padding={{top: 2, bottom: 2, left: 8, right: 12}} progress={ring}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                    <Av i="YOU" bg={YOU.shirt} size={54} fg={C.ink} />
                    <span style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>You</span>
                  </div>
                </Circle>
              </div>
            </div>
          </div>
        </div>
        {/* team channel */}
        <div style={{...card, top: 670, height: 440, padding: '26px 40px', boxSizing: 'border-box', opacity: chan, translate: `0px ${(1 - chan) * 40}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}># client-pitch</div>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted}}>8 MEMBERS</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16, marginTop: 22}}>
            <Msg p={post} out size={34}>
              I finished the client section so we hit Thursday.
            </Msg>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 10, opacity: reactP, scale: String(0.8 + 0.2 * reactP), transformOrigin: 'right center'}}>
              <div style={{background: 'rgba(46,158,91,0.14)', color: C.green, fontFamily: SANS, fontWeight: 900, fontSize: 26, padding: '6px 16px', borderRadius: 999}}>Thanks +{reacts}</div>
            </div>
            <div style={{display: 'flex', alignItems: 'flex-end', gap: 14, opacity: reply, translate: `0px ${(1 - reply) * 20}px`}}>
              <Av i="MG" bg={DANA.shirt} size={50} />
              <Msg p={1} size={32}>
                Great save. Let's talk about this.
              </Msg>
            </div>
          </div>
        </div>
        <Pill p={seen} bg={C.green} size={26} style={{left: 110, top: 1136}}>
          Seen by the whole team
        </Pill>
      </Push>
      <Sfx at={0.3} name="blip" volume={0.22} />
      <Sfx at={1.9} name="click" volume={0.2} />
      <Sfx at={2.5} name="snip" volume={0.18} />
      <Sfx at={4.0} name="send" volume={0.2} />
      <Sfx at={5.0} name="pop" volume={0.16} />
      <Sfx at={6.0} name="blip" volume={0.2} />
      <Sfx at={6.5} name="ping" volume={0.2} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: if you step in, say it out loud.', start: 0.81, end: 3.85, key: 'out loud', se: 3.55},
          {text: 'Post "I finished the client section so we hit Thursday."', start: 3.95, end: 7.3, key: 'finished', se: 6.53},
        ]}
      />
    </Paper>
  );
};

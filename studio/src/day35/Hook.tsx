import React from 'react';
import {Easing, interpolate} from 'remotion';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Camera, Caps, DANA, Mark, Msg, Paper, Pill, PRIYA, TOM, card, ez, useT} from './kit';

/* 1. Hook: the team channel is on screen from frame 0 with "Say hi to our new hire, Alex!" and friendly replies stacking up.
   Then a private DM between Priya and Tom slides in below: "Thoughts on the new hire?" "Nice. Seems junior though."
   and a red "Already ranked" pill. */
const POP = Easing.bezier(0.3, 1.5, 0.5, 1);
const lbl: React.CSSProperties = {fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: C.muted};
const Row: React.FC<{p: number; i: string; bg: string; name: string; children: React.ReactNode}> = ({p, i, bg, name, children}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 20, opacity: p, translate: `0px ${(1 - p) * 24}px`}}>
    <Av i={i} bg={bg} size={56} />
    <div>
      <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, color: C.muted}}>{name}</div>
      <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink}}>{children}</div>
    </div>
  </div>
);
export const Hook: React.FC = () => {
  const {t} = useT();
  const team = interpolate(t, [0, 0.4], [0.85, 1], {...CL, easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const day1 = interpolate(t, [0.25, 0.6], [0, 1], {...CL, easing: POP});
  const r1 = ez(t, 1.8, 0.45);
  const r2 = ez(t, 2.4, 0.45);
  const r3 = ez(t, 3.0, 0.45);
  const dm = ez(t, 4.2, 0.55);
  const m1 = ez(t, 4.6, 0.4);
  const m2 = ez(t, 5.5, 0.4);
  const ranked = interpolate(t, [6.1, 6.45], [0, 1], {...CL, easing: POP});
  return (
    <Paper>
      <Mark />
      <Camera
        shots={[
          {t: 0, x: 540, y: 420, z: 1.06},
          {t: 3.4, x: 540, y: 460, z: 1.0},
          {t: 5.0, x: 540, y: 900, z: 1.03},
          {t: 7.4, x: 540, y: 950, z: 1.06},
        ]}
      >
        {/* team channel */}
        <div style={{...card, top: 190, height: 470, padding: '28px 40px', boxSizing: 'border-box', scale: String(team)}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 18, borderBottom: '2px solid #EEEAE4'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.ink}}># team</div>
            <div style={{opacity: day1, scale: String(0.85 + 0.15 * day1), background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 26, padding: '8px 20px', borderRadius: 999, whiteSpace: 'nowrap'}}>Your day 1</div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 22}}>
            <Av i="DA" bg={DANA.shirt} size={56} />
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>Say hi to our new hire, Alex!</div>
          </div>
          <Row p={r1} i="PR" bg={PRIYA.shirt} name="Priya">
            So glad you're here!
          </Row>
          <Row p={r2} i="TO" bg={TOM.shirt} name="Tom">
            Welcome aboard!
          </Row>
          <Row p={r3} i="SA" bg="#6C9BD8" name="Sam">
            Ask me anything, anytime.
          </Row>
        </div>
        {/* private DM */}
        <div style={{...card, top: 710, height: 400, padding: '28px 40px', boxSizing: 'border-box', background: '#1C1C1C', opacity: dm, translate: `0px ${(1 - dm) * 60}px`}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 18, borderBottom: '2px solid #2E2E2E'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
              <Av i="PR" bg={PRIYA.shirt} size={46} />
              <Av i="TO" bg={TOM.shirt} size={46} />
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.white}}>Private chat</div>
            </div>
            <div style={{...lbl, color: '#8A8379'}}>NOT YOU</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 18, marginTop: 26}}>
            <Msg p={m1} dark size={36}>
              Thoughts on the new hire?
            </Msg>
            <Msg p={m2} out size={36}>
              Nice. Seems junior though.
            </Msg>
          </div>
        </div>
        <Pill p={ranked} bg={C.red} size={28} style={{left: 100, top: 1040}}>
          Already ranked
        </Pill>
      </Camera>
      <Sfx at={0.25} name="ping" volume={0.22} />
      <Sfx at={1.8} name="pop" volume={0.16} />
      <Sfx at={2.4} name="pop" volume={0.16} />
      <Sfx at={3.0} name="pop" volume={0.16} />
      <Sfx at={4.2} name="whoosh" volume={0.16} />
      <Sfx at={4.6} name="blip" volume={0.2} />
      <Sfx at={5.5} name="blip" volume={0.2} />
      <Sfx at={6.1} name="hit" volume={0.2} />
      <Caps
        top={1290}
        caps={[
          {text: 'You just started a new job.', start: 0.22, end: 1.8, key: 'new job', se: 1.41},
          {text: 'Everyone is being really nice.', start: 1.86, end: 4.2, key: 'nice', se: 3.79},
          {text: "And they've already decided where you rank.", start: 4.26, end: 7.2, key: 'rank', se: 6.45},
        ]}
      />
    </Paper>
  );
};

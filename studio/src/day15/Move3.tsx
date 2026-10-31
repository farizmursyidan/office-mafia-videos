import React from 'react';
import {interpolate} from 'remotion';
import {CrossedOff} from '@remotion/rough-notation';
import {C, SANS} from '../theme';
import {Sfx} from '../components';
import {Av, CL, Caps, INOUT, Label, Mark, Paper, Push, ez, float, useT} from './kit';

/* 5. Move 3: learn how they want bad news. Quick message or a 2 minute call. Never a surprise in the big meeting. */
const box: React.CSSProperties = {position: 'absolute', top: 440, width: 445, height: 330, background: C.white, borderRadius: 30, boxShadow: '0 24px 60px rgba(60,45,20,0.16)', padding: '22px 26px', boxSizing: 'border-box'};

const Phone: React.FC<{ring: number}> = ({ring}) => (
  <svg width={70} height={70} viewBox="0 0 24 24" style={{rotate: `${Math.sin(ring * 30) * 10}deg`}}>
    <path fill={C.white} d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </svg>
);

export const Move3: React.FC = () => {
  const {t} = useT();
  const msg = ez(t, 3.75, 0.5);
  const call = ez(t, 5.0, 0.5);
  const sur = ez(t, 6.7, 0.5);
  const secs = Math.floor(interpolate(t, [5.4, 8.6], [0, 118], CL));
  const ringing = t > 5.0 && t < 5.5 ? t : 0;
  return (
    <Paper>
      <Push>
        <Mark />
        <Label n="3/3" title="Bad news, their way" />
        {/* quick message */}
        <div style={{...box, left: 70, opacity: msg, translate: `0px ${(1 - msg) * 50 + float(t)}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 3, color: C.muted}}>QUICK MESSAGE</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 18}}>
            <Av i="YOU" bg={C.amber} fg={C.ink} size={56} />
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, color: C.muted}}>to Mark</div>
          </div>
          <div style={{marginTop: 16, background: '#F1ECE4', borderRadius: 22, padding: '14px 20px', fontFamily: SANS, fontWeight: 700, fontSize: 30, lineHeight: 1.22, color: C.ink}}>
            Heads up: launch slips 2 days. Fix is in.
          </div>
        </div>
        {/* 2 minute call */}
        <div style={{...box, left: 565, background: C.ink, opacity: call, translate: `0px ${(1 - call) * 50 + float(t, 2)}px`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 3, color: 'rgba(255,255,255,0.6)'}}>2 MIN CALL</div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 26}}>
            <div style={{width: 120, height: 120, borderRadius: '50%', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 ${10 + 6 * Math.sin(t * 5)}px rgba(46,158,91,0.25)`}}>
              <Phone ring={ringing} />
            </div>
          </div>
          <div style={{textAlign: 'center', marginTop: 22, fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.white}}>
            {`${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`}
          </div>
        </div>
        {/* the surprise */}
        <div style={{position: 'absolute', left: 70, right: 70, top: 830, display: 'flex', justifyContent: 'center', opacity: sur, translate: `0px ${(1 - sur) * 50}px`}}>
          <CrossedOff color={C.red} strokeWidth={7} seed={5} progress={interpolate(t, [7.2, 7.8], [0, 1], {...CL, easing: INOUT})}>
            <div style={{background: C.white, borderRadius: 30, padding: '30px 70px', boxShadow: '0 24px 60px rgba(60,45,20,0.16)', textAlign: 'center'}}>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 3, color: C.muted}}>IN THE BIG MEETING</div>
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 96, color: C.red, marginTop: 6, letterSpacing: 2}}>SURPRISE!</div>
            </div>
          </CrossedOff>
        </div>
      </Push>
      <Sfx at={3.75} name="ping" volume={0.3} />
      <Sfx at={5.0} name="ring" volume={0.25} />
      <Sfx at={6.7} name="pop" volume={0.3} />
      <Sfx at={7.2} name="snip" volume={0.35} />
      <Caps
        top={1290}
        caps={[
          {text: 'Move three: learn how they want bad news.', start: 0.6, end: 3.6, key: 'bad', se: 3.5},
          {text: 'Some want a quick message, some want a two minute call.', start: 3.7, end: 6.6, key: 'quick', se: 6.22},
          {text: 'Nobody wants a surprise.', start: 6.65, end: 8.9, key: 'surprise.', se: 7.76},
        ]}
      />
    </Paper>
  );
};

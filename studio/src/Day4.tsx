import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, SANS, s} from './theme';
import {Avatar, Bubble, Captions, ChatCard, King, Scene, SerifLine, Sfx, StepLabel, Watermark} from './components';

/* Scene timeline (seconds, global), synced to public/voice/day4.wav */
export const SCENES4 = {
  hook: [0, 5.45],
  thanked: [5.45, 10.5],
  process: [10.5, 21.95],
  boss: [21.95, 31.5],
  money: [31.5, 41.2],
  punch: [41.2, 45.7],
  end: [45.7, 54.0],
} as const;
export const DAY4_DURATION = SCENES4.end[1];

const Seq: React.FC<{k: keyof typeof SCENES4; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES4[k];
  return (
    <Sequence from={s(a)} durationInFrames={s(b - a)}>
      {children}
    </Sequence>
  );
};

const useT = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return {f, fps, t: f / fps};
};
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const LockIcon: React.FC<{size?: number; color?: string}> = ({size = 40, color = C.ink}) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 100 120">
    <path d="M28 52 V36 a22 22 0 0 1 44 0 V52" fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" />
    <rect x="14" y="50" width="72" height="62" rx="14" fill={color} />
  </svg>
);

/* ---------- 1. Hook: headcount spreadsheet ---------- */
const ROWS = [
  {name: 'A. Putri', role: 'Analyst', cost: '$68k'},
  {name: 'J. Tan', role: 'Coordinator', cost: '$54k'},
  {name: 'You', role: 'Specialist', cost: '$72k'},
  {name: 'M. Ruiz', role: 'Analyst', cost: '$66k'},
  {name: 'K. Lim', role: 'Associate', cost: '$49k'},
];
const Hook: React.FC = () => {
  const {f, fps, t} = useT();
  const youRow = 2;
  const cursorRow = interpolate(t, [1.0, 2.5], [0, youRow], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const highlight = interpolate(t, [2.5, 2.8], [0, 1], clamp);
  const flick = t >= 3.3 && t < 4.4 ? (Math.floor((t - 3.3) / 0.22) % 2 === 0 ? 'Keep' : 'Review') : t >= 4.4 ? 'Review?' : 'Keep';
  const shake = t >= 4.4 && t < 4.7 ? Math.sin(f * 2.2) * 6 : 0;
  const rowH = 104;
  const top = 470;
  return (
    <Scene bg={C.paper} dur={5.45} whoosh={false}>
      <Watermark />
      <div style={{position: 'absolute', top: 330, left: 70, right: 70, background: C.white, borderRadius: 30, boxShadow: '0 30px 70px rgba(60,45,20,0.18)', overflow: 'hidden'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '24px 30px', background: '#1F6E43', color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 32}}>
          <div style={{width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24}}>X</div>
          FY27 Headcount Review
        </div>
        <div style={{display: 'flex', background: '#F2EFE9', fontFamily: SANS, fontWeight: 800, fontSize: 28, color: C.muted, padding: '16px 30px'}}>
          <div style={{flex: 1.3}}>NAME</div>
          <div style={{flex: 1.3}}>ROLE</div>
          <div style={{flex: 0.8}}>COST</div>
          <div style={{flex: 1}}>DECISION</div>
        </div>
        {ROWS.map((r, i) => {
          const sp = spring({frame: f - s(0.1 + i * 0.12), fps, config: {damping: 16}});
          const isYou = i === youRow;
          return (
            <div
              key={r.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: rowH,
                padding: '0 30px',
                borderTop: '2px solid #EEEAE4',
                fontFamily: SANS,
                fontSize: 36,
                fontWeight: isYou ? 800 : 500,
                color: C.ink,
                background: isYou ? `rgba(224,169,59,${0.35 * highlight})` : 'transparent',
                opacity: sp,
                transform: `translateY(${(1 - sp) * 20}px) translateX(${isYou ? shake : 0}px)`,
              }}
            >
              <div style={{flex: 1.3}}>{r.name}</div>
              <div style={{flex: 1.3}}>{r.role}</div>
              <div style={{flex: 0.8}}>{r.cost}</div>
              <div style={{flex: 1}}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 18px',
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 30,
                    background: isYou && t >= 3.3 ? (flick === 'Keep' ? '#DDEFE3' : '#F6DCDA') : '#DDEFE3',
                    color: isYou && t >= 3.3 ? (flick === 'Keep' ? C.green : C.red) : C.green,
                  }}
                >
                  {isYou ? flick : 'Keep'} ▾
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* cursor */}
      {t >= 0.9 && (
        <svg width="54" height="64" viewBox="0 0 24 28" style={{position: 'absolute', left: 860, top: top + 18 + cursorRow * rowH + 40}}>
          <path d="M2 2 L2 22 L8 16 L12 26 L16 24 L12 14 L20 14 Z" fill={C.ink} stroke={C.white} strokeWidth={1.5} />
        </svg>
      )}
      {[1.2, 1.7, 2.2, 2.6].map((a) => (
        <Sfx key={a} at={a} name="click" volume={0.2} />
      ))}
      <Sfx at={4.4} name="hit" volume={0.7} />
      <Captions
        top={1180}
        caps={[
          {text: 'Every year, someone opens a spreadsheet with your name in it.', start: 0.25, end: 3.2, key: 'spreadsheet', se: 3.08},
          {text: 'And decides if you stay.', start: 3.26, end: 5.45, key: 'stay.', se: 4.52},
        ]}
      />
    </Scene>
  );
};

/* ---------- 2. Thanked vs protected ---------- */
const Thanked: React.FC = () => {
  const {f, fps, t} = useT();
  const left = spring({frame: f - s(0.2), fps, config: {damping: 14}});
  const right = spring({frame: f - s(1.95), fps, config: {damping: 14}});
  const lock = spring({frame: f - s(3.6), fps, config: {damping: 10, stiffness: 220}});
  const dimLeft = interpolate(t, [1.95, 2.4], [1, 0.45], clamp);
  const card: React.CSSProperties = {
    flex: 1,
    background: C.white,
    borderRadius: 30,
    padding: '34px 30px',
    boxShadow: '0 24px 60px rgba(60,45,20,0.16)',
    minHeight: 520,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  };
  const label = (text: string, color: string) => (
    <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 40, letterSpacing: 2, color}}>{text}</div>
  );
  return (
    <Scene bg={C.paper} dur={5.05}>
      <Watermark />
      <div style={{position: 'absolute', top: 360, left: 60, right: 60, display: 'flex', gap: 30}}>
        <div style={{...card, opacity: left * dimLeft, transform: `translateY(${(1 - left) * 60}px)`}}>
          {label('VALUABLE', C.muted)}
          <div style={{display: 'flex', gap: 16, alignItems: 'center'}}>
            <Avatar initials="M" color="#5163B8" size={64} />
            <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 30, color: C.muted}}>Manager</div>
          </div>
          <div style={{background: '#F1EEE9', borderRadius: 28, borderBottomLeftRadius: 8, padding: '22px 26px', fontFamily: SANS, fontSize: 38, lineHeight: 1.25, color: C.ink}}>
            great job on this, thanks!!
          </div>
          <div style={{marginTop: 'auto', fontFamily: SANS, fontWeight: 700, fontSize: 32, color: C.muted}}>= you get thanked</div>
        </div>
        <div style={{...card, opacity: right, transform: `translateY(${(1 - right) * 60}px)`, border: `5px solid ${C.amber}`}}>
          {label('INDISPENSABLE', '#B07D1E')}
          <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 28, color: C.muted}}>FY27 Headcount Review</div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(224,169,59,0.25)', borderRadius: 18, padding: '22px 22px'}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 38, color: C.ink}}>You</div>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span style={{padding: '6px 16px', borderRadius: 12, background: '#DDEFE3', color: C.green, fontFamily: SANS, fontWeight: 800, fontSize: 30}}>Keep</span>
              <div style={{transform: `scale(${lock})`, opacity: lock}}>
                <LockIcon size={38} color={C.ink} />
              </div>
            </div>
          </div>
          <div style={{marginTop: 'auto', fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.ink}}>= you get protected</div>
        </div>
      </div>
      <Sfx at={0.2} name="ping" volume={0.5} />
      <Sfx at={1.95} name="pop" volume={0.35} />
      <Sfx at={3.6} name="lock" volume={0.55} />
      <Captions
        top={1180}
        caps={[
          {text: 'Being valuable gets you thanked.', start: 0.16, end: 1.94, key: 'thanked.', se: 1.54},
          {text: 'Being indispensable gets you protected.', start: 1.95, end: 5.05, key: 'protected.', se: 4.01},
        ]}
      />
    </Scene>
  );
};

/* ---------- 3. Own a process, not a task ---------- */
const Process: React.FC = () => {
  const {f, fps, t} = useT();
  const cardIn = spring({frame: f - s(0.4), fps, config: {damping: 14}});
  const drag = interpolate(t, [5.5, 6.35], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const phaseA = interpolate(t, [6.5, 6.9], [1, 0], clamp);
  const phaseB = interpolate(t, [6.72, 7.1], [0, 1], clamp);
  const steps = ['Data in', 'Checks', 'Exceptions', 'Sign-off'];
  const notes = [
    {text: 'history', at: 7.8, x: 80, y: 690},
    {text: 'edge cases', at: 8.58, x: 690, y: 690},
    {text: 'judgment', at: 9.6, x: 395, y: 900},
  ];
  return (
    <Scene bg={C.paper} dur={11.45}>
      <Watermark />
      <StepLabel n="1/3" title="Own a process, not a task" />
      {/* Phase A: the task gets reassigned */}
      <div style={{opacity: phaseA}}>
        <div style={{position: 'absolute', top: 520, left: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
          <Avatar initials="You" color={C.ink} size={130} />
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.ink}}>You</div>
        </div>
        <div style={{position: 'absolute', top: 520, right: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
          <Avatar initials="N" color="#8A6FB8" size={130} />
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.ink}}>New hire</div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 760,
            left: interpolate(drag, [0, 1], [70, 470]),
            width: 540,
            background: C.white,
            borderRadius: 26,
            padding: '26px 30px',
            boxShadow: `0 ${20 + drag * 20}px ${50 + drag * 30}px rgba(60,45,20,0.2)`,
            transform: `scale(${(0.9 + 0.1 * cardIn) * (1 + 0.04 * Math.sin(drag * Math.PI))}) rotate(${Math.sin(drag * Math.PI) * 4}deg)`,
            opacity: cardIn,
            borderLeft: `12px solid ${C.muted}`,
          }}
        >
          <div style={{fontFamily: SANS, fontSize: 26, fontWeight: 800, color: C.muted, letterSpacing: 2}}>TASK</div>
          <div style={{fontFamily: SANS, fontSize: 42, fontWeight: 800, color: C.ink, marginTop: 6}}>Weekly sales report</div>
          <div style={{fontFamily: SANS, fontSize: 30, fontWeight: 600, color: C.muted, marginTop: 8}}>
            Assigned to: <b style={{color: C.ink}}>{drag > 0.6 ? 'New hire' : 'You'}</b>
          </div>
        </div>
      </div>
      {/* Phase B: the process map routed through you */}
      <div style={{opacity: phaseB}}>
        <div style={{position: 'absolute', top: 470, left: 70, right: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          {steps.map((st, i) => {
            const sp = spring({frame: f - s(6.8 + i * 0.15), fps, config: {damping: 14}});
            return (
              <div key={st} style={{width: 210, padding: '22px 0', textAlign: 'center', borderRadius: 20, background: C.white, border: `3px solid ${C.ink}`, fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.ink, opacity: sp, transform: `scale(${0.8 + 0.2 * sp})`}}>
                {st}
              </div>
            );
          })}
        </div>
        <svg width={1080} height={1920} style={{position: 'absolute', top: 0, left: 0}}>
          {[0, 1, 2, 3].map((i) => {
            const x = 70 + 105 + i * ((940 - 210) / 3);
            const d = interpolate(t, [7.0 + i * 0.12, 7.4 + i * 0.12], [0, 1], clamp);
            return <line key={i} x1={x} y1={545} x2={x + (540 - x) * d} y2={545 + (770 - 545) * d} stroke={C.amber} strokeWidth={7} strokeLinecap="round" />;
          })}
        </svg>
        <div style={{position: 'absolute', top: 700, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
          <div style={{width: 200, height: 140, borderRadius: 28, background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)'}}>
            You
          </div>
        </div>
        {notes.map((n) => {
          const sp = spring({frame: f - s(n.at), fps, config: {damping: 11, stiffness: 200}});
          if (t < n.at) return null;
          return (
            <div key={n.text} style={{position: 'absolute', left: n.x, top: n.y + 40, padding: '16px 28px', borderRadius: 999, background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 40, transform: `scale(${sp}) rotate(-2deg)`, boxShadow: '0 12px 30px rgba(224,169,59,0.45)'}}>
              {n.text}
            </div>
          );
        })}
      </div>
      <Sfx at={5.5} name="whoosh" volume={0.45} />
      <Sfx at={6.4} name="pop" volume={0.3} />
      {notes.map((n) => (
        <Sfx key={n.text} at={n.at} name="pop" volume={0.4} />
      ))}
      <Captions
        top={1190}
        caps={[
          {text: 'Move one: own a process, not a task.', start: 0.18, end: 3.54, key: 'process,', se: 3.11},
          {text: 'Tasks get reassigned in an afternoon.', start: 3.55, end: 6.7, key: 'reassigned', se: 5.43},
          {text: 'Processes come with history, edge cases, and judgment nobody else has.', start: 6.72, end: 11.45, key: 'judgment', se: 11.2},
        ]}
      />
    </Scene>
  );
};

/* ---------- 4. Make your boss look prepared ---------- */
const Boss: React.FC = () => {
  const {f, fps, t} = useT();
  const cal = spring({frame: f - s(0.4), fps, config: {damping: 14}});
  return (
    <Scene bg={C.paper} dur={9.55}>
      <Watermark />
      <StepLabel n="2/3" title="Make your boss look prepared" />
      <div
        style={{
          position: 'absolute',
          top: 470,
          left: 70,
          right: 70,
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          background: '#E3E8F7',
          borderLeft: '14px solid #5163B8',
          borderRadius: 22,
          padding: '20px 28px',
          opacity: cal,
          transform: `translateY(${(1 - cal) * 40}px)`,
        }}
      >
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: '#2F3E86'}}>10:00</div>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink}}>Leadership review</div>
        <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 600, fontSize: 28, color: '#5163B8'}}>Your manager</div>
      </div>
      <ChatCard name="Daniel" sub="Your manager" initials="D" color="#5163B8" top={620} minHeight={480}>
        <Bubble at={3.4} out>
          <div style={{fontSize: 30, opacity: 0.6, marginBottom: 6}}>9:40 · before your 10:00</div>
          • Q3 numbers on track
          <br />• Vendor delay, about 1 week
          <br />• <span style={{color: C.amber, fontWeight: 800}}>Risk:</span> they may question the budget ask
        </Bubble>
        <Bubble at={7.0}>you just saved me in there</Bubble>
      </ChatCard>
      <Captions
        top={1310}
        caps={[
          {text: 'Move two: make your boss look prepared.', start: 0.2, end: 3.05, key: 'prepared.', se: 2.59},
          {text: 'Send the short summary before their big meeting, not after.', start: 3.06, end: 6.37, key: 'before', se: 5.94},
          {text: 'People never forget who saved them from getting embarrassed.', start: 6.38, end: 9.55, key: 'never', se: 9.07},
        ]}
      />
    </Scene>
  );
};

/* ---------- 5. Attach your work to money ---------- */
const Money: React.FC = () => {
  const {f, fps, t} = useT();
  const cols = [
    {label: 'MAKES\nMONEY', at: 3.6},
    {label: 'PROTECTS\nMONEY', at: 4.48},
    {label: 'SPENDS\nMONEY', at: 5.45},
  ];
  const red = interpolate(t, [7.75, 8.0], [0, 1], clamp);
  const cut = interpolate(t, [7.9, 8.35], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const fall = interpolate(t, [8.35, 9.2], [0, 1], {...clamp, easing: Easing.in(Easing.quad)});
  const card = spring({frame: f - s(8.6), fps, config: {damping: 13}});
  const colW = 290;
  const gap = 25;
  const left0 = 70;
  return (
    <Scene bg={C.paper} dur={9.7}>
      <Watermark />
      <StepLabel n="3/3" title="Attach your work to money" />
      {cols.map((c, i) => {
        const sp = spring({frame: f - s(c.at), fps, config: {damping: 13}});
        const isSpend = i === 2;
        const x = left0 + i * (colW + gap);
        return (
          <div
            key={c.label}
            style={{
              position: 'absolute',
              top: 500,
              left: x,
              width: colW,
              height: 560,
              borderRadius: 28,
              background: isSpend ? `rgb(${255 - 7 * red},${255 - 38 * red},${255 - 41 * red})` : C.white,
              border: `4px solid ${isSpend && red > 0.5 ? C.red : '#DDD6CB'}`,
              opacity: sp * (isSpend ? 1 - fall * 0.6 : 1),
              transform: `translateY(${(1 - sp) * 60 + (isSpend ? fall * 140 : 0)}px) rotate(${isSpend ? fall * 6 : 0}deg)`,
              padding: '30px 20px',
              boxShadow: '0 20px 50px rgba(60,45,20,0.14)',
              whiteSpace: 'pre-line',
              textAlign: 'center',
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: 40,
              lineHeight: 1.1,
              color: isSpend && red > 0.5 ? C.red : C.ink,
            }}
          >
            {c.label}
            {i === 1 && t >= 8.6 && (
              <div
                style={{
                  marginTop: 40,
                  background: C.amber,
                  borderRadius: 20,
                  padding: '20px 14px',
                  fontSize: 30,
                  fontWeight: 800,
                  lineHeight: 1.25,
                  textAlign: 'left',
                  whiteSpace: 'normal',
                  transform: `translateX(${(1 - card) * -320}px)`,
                  opacity: card,
                }}
              >
                Your project
                <div style={{fontWeight: 600, fontSize: 28, marginTop: 6}}>saves the team 12 hours a week</div>
              </div>
            )}
          </div>
        );
      })}
      {/* cut line across the SPENDS column */}
      {t >= 7.9 && (
        <svg width={1080} height={1920} style={{position: 'absolute', top: 0, left: 0}}>
          <line
            x1={left0 + 2 * (colW + gap) - 20}
            y1={760}
            x2={left0 + 2 * (colW + gap) - 20 + (colW + 40) * cut}
            y2={720}
            stroke={C.red}
            strokeWidth={8}
            strokeDasharray="22 14"
            opacity={1 - fall}
          />
        </svg>
      )}
      {cols.map((c) => (
        <Sfx key={c.label} at={c.at} name="pop" volume={0.4} />
      ))}
      <Sfx at={7.9} name="snip" volume={0.7} />
      <Sfx at={8.6} name="send" volume={0.4} />
      <Captions
        top={1190}
        caps={[
          {text: 'Move three: attach your work to money.', start: 0.33, end: 2.8, key: 'money.', se: 2.26},
          {text: 'Every team either makes money, protects money, or spends it.', start: 2.82, end: 6.9, key: 'spends', se: 6.05},
          {text: 'Guess which one gets cut first.', start: 6.91, end: 9.7, key: 'cut', se: 8.26},
        ]}
      />
    </Scene>
  );
};

/* ---------- 6. Punch line ---------- */
const Punch: React.FC = () => (
  <Scene bg={C.night} dur={4.5}>
    <Watermark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 30}}>
      <SerifLine at={0.23} size={130}>
        Effort makes you tired.
      </SerifLine>
      <SerifLine at={2.31} size={140} color={C.amber} italic>
        Position makes you safe.
      </SerifLine>
    </AbsoluteFill>
    <Sfx at={0.23} name="pop" volume={0.3} />
    <Sfx at={2.31} name="pop" volume={0.4} />
  </Scene>
);

/* ---------- 7. End card ---------- */
const End: React.FC = () => {
  const {f, fps} = useT();
  const brand = spring({frame: f - s(4.5), fps, config: {damping: 14}});
  const qOut = interpolate(f, [s(4.2), s(4.5)], [1, 0], clamp);
  return (
    <Scene bg={C.night} dur={8.3}>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut}}>
        <SerifLine at={0.31} size={112}>
          What would actually break if you left tomorrow?
        </SerifLine>
        <div style={{marginTop: 40}}>
          <SerifLine at={3.32} size={64} color={C.amber} italic>
            Tell me in the comments.
          </SerifLine>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: brand, transform: `scale(${0.9 + 0.1 * brand})`}}>
        <King size={130} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: 14, color: C.white, marginTop: 36}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={4.5} name="pop" volume={0.4} />
    </Scene>
  );
};

export const Day4: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day4.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music_day4.wav')}
      volume={(f) => interpolate(f, [0, s(51.7), s(52.3), s(DAY4_DURATION)], [0.13, 0.13, 0.32, 0.32], clamp)}
    />
    <Seq k="hook"><Hook /></Seq>
    <Seq k="thanked"><Thanked /></Seq>
    <Seq k="process"><Process /></Seq>
    <Seq k="boss"><Boss /></Seq>
    <Seq k="money"><Money /></Seq>
    <Seq k="punch"><Punch /></Seq>
    <Seq k="end"><End /></Seq>
  </AbsoluteFill>
);

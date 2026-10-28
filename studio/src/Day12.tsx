import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, SANS, s} from './theme';
import {Bubble, Captions, ChatCard, King, Scene, SerifLine, Sfx, StepLabel, Typing, Watermark} from './components';
import {Desk, Person} from './characters';

/* Scene timeline (seconds, global), synced to public/voice/day12.wav */
export const SCENES12 = {
  hook: [0, 6.0],
  how: [6.0, 12.8],
  move1: [12.8, 20.4],
  move2: [20.4, 29.2],
  move3: [29.2, 37.9],
  punch: [37.9, 44.0],
  end: [44.0, 53.0],
} as const;
export const DAY12_DURATION = SCENES12.end[1];

const Seq: React.FC<{k: keyof typeof SCENES12; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES12[k];
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
const card: React.CSSProperties = {
  position: 'absolute',
  left: 70,
  right: 70,
  background: C.white,
  borderRadius: 34,
  boxShadow: '0 30px 70px rgba(60,45,20,0.18)',
};

const YOU = {shirt: C.amber, hair: '#1E1A17', hairStyle: 'short' as const, skin: '#C99267', pants: '#2B2B33'};
const DANA = {shirt: '#3F6FB5', hair: '#3A2A20', hairStyle: 'bun' as const, skin: '#E2B48C', pants: '#2A2A33'};
const SAM = {shirt: '#3F7D5C', hair: '#2A211C', hairStyle: 'long' as const, skin: '#B88158', pants: '#2B2B33'};

const Fg: React.FC<{children: React.ReactNode; k?: number}> = ({children, k = 1.45}) => (
  <g transform={`translate(540 1180) scale(${k}) translate(-540 -1180)`}>{children}</g>
);

const Backdrop: React.FC = () => (
  <g>
    <rect x={0} y={0} width={1080} height={1180} fill="#E7E1D7" />
    <rect x={0} y={1080} width={1080} height={100} fill="#DDD5C8" />
    <rect x={0} y={1180} width={1080} height={740} fill="#D6CCBD" />
    <rect x={0} y={1180} width={1080} height={10} fill="#C7BBA9" />
  </g>
);

const Chip: React.FC<{at: number; left: number; top: number; bg: string; fg?: string; children: React.ReactNode}> = ({at, left, top, bg, fg = C.white, children}) => {
  const {f, fps, t} = useT();
  if (t < at) return null;
  const sp = spring({frame: f - s(at), fps, config: {damping: 11, stiffness: 220}});
  return (
    <div style={{position: 'absolute', left, top, opacity: sp, transform: `scale(${0.8 + 0.2 * sp})`, transformOrigin: 'left center'}}>
      <div style={{background: bg, color: fg, fontFamily: SANS, fontWeight: 900, fontSize: 32, padding: '10px 24px', borderRadius: 999, letterSpacing: 1}}>{children}</div>
    </div>
  );
};

const SpeechBubble: React.FC<{at: number; left: number; top: number; width: number; tail: 'left' | 'right'; dark?: boolean; children: React.ReactNode}> = ({
  at,
  left,
  top,
  width,
  tail,
  dark,
  children,
}) => {
  const {f, fps} = useT();
  if (f < s(at)) return null;
  const sp = spring({frame: f - s(at), fps, config: {damping: 13, stiffness: 190}});
  const bg = dark ? C.ink : C.white;
  return (
    <div style={{position: 'absolute', left, top, width, opacity: sp, transform: `scale(${0.85 + 0.15 * sp})`, transformOrigin: tail === 'left' ? 'left bottom' : 'right bottom'}}>
      <div style={{background: bg, color: dark ? C.white : C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 40, lineHeight: 1.2, padding: '22px 30px', borderRadius: 30, boxShadow: '0 16px 40px rgba(60,45,20,0.18)'}}>{children}</div>
      <div style={{position: 'absolute', bottom: -22, [tail]: 60, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: `26px solid ${bg}`}} />
    </div>
  );
};

/* ---------- 1. Hook: every yes piles onto your plate ---------- */
const PLATE = [
  {task: 'Q4 launch', extra: false, at: 0.3},
  {task: 'Client renewals', extra: false, at: 0.3},
  {task: '+ Vendor report', extra: true, at: 1.2},
  {task: '+ Board deck', extra: true, at: 1.8},
  {task: '+ Intern onboarding', extra: true, at: 2.4},
];
const Hook: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.2), fps, config: {damping: 14}});
  const hand = interpolate(t, [0.9, 1.3], [0, 70], clamp);
  const stamp = spring({frame: f - s(3.6), fps, config: {damping: 10, stiffness: 240}});
  return (
    <Scene bg={C.paper} dur={6.0} whoosh={false}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Backdrop />
        <Fg k={1.05}>
          <Person x={380} y={1180} facing={1} sitting {...YOU} />
          <Desk x={590} y={1080} w={260} laptop />
          <Person x={820} y={1180} facing={-1} armL={hand} {...DANA} />
        </Fg>
      </svg>
      <Watermark />
      <div style={{...card, top: 400, padding: '20px 36px 18px', opacity: inn, transform: `translateY(${(1 - inn) * 40}px)`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted}}>YOUR PLATE</div>
          {t >= 3.6 ? (
            <div style={{background: C.red, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, padding: '6px 18px', borderRadius: 999, letterSpacing: 1, transform: `scale(${0.8 + 0.2 * stamp})`, opacity: stamp}}>{'JOB: "NOT FULL"'}</div>
          ) : (
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: t >= 2.4 ? C.red : C.muted}}>{t >= 2.4 ? '5 tasks' : t >= 1.8 ? '4 tasks' : t >= 1.2 ? '3 tasks' : '2 tasks'}</div>
          )}
        </div>
        {PLATE.map((p, i) => {
          const sp = spring({frame: f - s(p.at), fps, config: {damping: 12}});
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '9px 0', borderTop: '2px solid #EEEAE4', marginTop: i ? 0 : 10, opacity: t >= p.at ? sp : 0, transform: `translateX(${(1 - sp) * 40}px)`}}>
              <div style={{width: 22, height: 22, borderRadius: 6, border: `4px solid ${p.extra ? C.red : C.ink}`}} />
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 34, color: p.extra ? C.red : C.ink}}>{p.task}</div>
              {p.extra && <div style={{marginLeft: 'auto', fontFamily: SANS, fontWeight: 700, fontSize: 24, color: C.muted}}>{'"quick one"'}</div>}
            </div>
          );
        })}
      </div>
      {PLATE.filter((p) => p.extra).map((p, i) => (
        <Sfx key={i} at={p.at} name="blip" volume={0.35} />
      ))}
      <Sfx at={3.6} name="hit" volume={0.45} />
      <Captions
        top={1270}
        caps={[
          {text: 'Every time you say yes to extra work,', start: 0.44, end: 3.1, key: 'yes', se: 2.77},
          {text: "you tell your boss your real job wasn't full.", start: 3.14, end: 6.0, key: 'full.', se: 5.45},
        ]}
      />
    </Scene>
  );
};

/* ---------- 2. The rule: promoted people say no better ---------- */
const How: React.FC = () => {
  const {f, fps, t} = useT();
  const a = spring({frame: f - s(2.14), fps, config: {damping: 14}});
  const b = spring({frame: f - s(5.19), fps, config: {damping: 12}});
  const col = (label: string, big: string, small: string, hi: boolean, sp: number, show: boolean) => (
    <div style={{flex: 1, background: hi ? C.amber : C.nightSoft, border: hi ? 'none' : '3px solid #2E2E2E', borderRadius: 30, padding: '26px 28px', opacity: show ? sp : 0, transform: `translateY(${(1 - sp) * 40}px)`}}>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 2, color: hi ? C.ink : C.muted}}>{label}</div>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 64, color: hi ? C.ink : C.white, marginTop: 16}}>{big}</div>
      <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 32, color: hi ? C.ink : C.muted, marginTop: 8}}>{small}</div>
    </div>
  );
  return (
    <Scene bg={C.night} dur={6.8}>
      <Watermark dark />
      <div style={{position: 'absolute', top: 240, left: 80, right: 80, fontFamily: SANS}}>
        <div style={{fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{fontWeight: 900, fontSize: 76, lineHeight: 1.05, color: C.white, marginTop: 14}}>Promoted people say no better</div>
      </div>
      <div style={{position: 'absolute', top: 640, left: 70, right: 70, display: 'flex', gap: 30}}>
        {col('SAYS YES TO ALL', '12', 'projects, 0 finished', false, a, t >= 2.14)}
        {col('SAYS NO WELL', '3', 'projects, all shipped', true, b, t >= 5.19)}
      </div>
      <Sfx at={2.14} name="pop" volume={0.35} />
      <Sfx at={5.19} name="hit" volume={0.4} />
      <Captions
        dark
        top={1250}
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.61, end: 2.1, key: 'nobody', se: 1.81},
          {text: "The people who get promoted don't say yes more.", start: 2.14, end: 5.15, key: 'promoted', se: 4.93},
          {text: 'They say no better.', start: 5.19, end: 6.8, key: 'better.', se: 6.46},
        ]}
      />
    </Scene>
  );
};

/* ---------- 3. Move 1: don't say no, say which ---------- */
const Move1: React.FC = () => (
  <Scene bg={C.paper} dur={7.6}>
    <Watermark />
    <StepLabel n="1/3" title="Don't say no. Say which." />
    <ChatCard name="Dana" sub="Your manager" initials="D" color="#3F6FB5" top={430} minHeight={600}>
      <Bubble at={0.5}>Can you take the vendor report?</Bubble>
      <Bubble at={3.58} out>
        Sure. Which of my 3 projects should slip?
      </Bubble>
      <Typing from={6.0} to={6.7} />
      <Bubble at={6.7}>Oh. Ask Raj instead.</Bubble>
    </ChatCard>
    <Captions
      top={1290}
      caps={[
        {text: "Move one: don't say no, say which.", start: 0.41, end: 3.55, key: 'which.', se: 3.22},
        {text: 'Sure, I can take the vendor report.', start: 3.58, end: 5.6, key: 'vendor', se: 5.42},
        {text: 'Which of my three projects should slip?', start: 5.63, end: 7.6, key: 'slip?', se: 7.15},
      ]}
    />
  </Scene>
);

/* ---------- 4. Move 2: put a price on it ---------- */
const Move2: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.4), fps, config: {damping: 15}});
  const add = spring({frame: f - s(2.97), fps, config: {damping: 12}});
  const cost = spring({frame: f - s(4.64), fps, config: {damping: 12}});
  const ask = spring({frame: f - s(6.92), fps, config: {damping: 12}});
  const moved = t >= 5.4;
  const row = (label: string, color: string, body: React.ReactNode, sp: number, show: boolean) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 24, padding: '18px 0', borderTop: '2px solid #EEEAE4', opacity: show ? sp : 0, transform: `translateY(${(1 - sp) * 24}px)`}}>
      <div style={{width: 110, flexShrink: 0, textAlign: 'center', background: color, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 2, borderRadius: 999, padding: '8px 0'}}>{label}</div>
      <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink}}>{body}</div>
    </div>
  );
  return (
    <Scene bg={C.paper} dur={8.8}>
      <Watermark />
      <StepLabel n="2/3" title="Put a price on it" />
      <div style={{...card, top: 440, padding: '22px 36px 26px', opacity: inn, transform: `translateY(${(1 - inn) * 50}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 10}}>THE TRADE</div>
        {row('ADD', C.green, '+ Board deck, due Thursday', add, t >= 2.97)}
        {row(
          'COST',
          C.red,
          <span>
            Launch moves{' '}
            <span style={{textDecoration: moved ? 'line-through' : 'none', color: moved ? C.muted : C.ink}}>Fri</span>
            {moved && <span style={{color: C.red}}> Mon</span>}
          </span>,
          cost,
          t >= 4.64,
        )}
      </div>
      {t >= 6.92 && (
        <div style={{position: 'absolute', top: 860, left: 70, right: 70, opacity: ask, transform: `translateY(${(1 - ask) * 30}px)`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 2, color: C.muted, marginBottom: 16}}>{"DANA'S CALL"}</div>
          <div style={{display: 'flex', gap: 26}}>
            <div style={{flex: 1, textAlign: 'center', background: C.white, border: `4px solid ${C.ink}`, borderRadius: 24, padding: '20px 0', fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>Worth it</div>
            <div style={{flex: 1, textAlign: 'center', background: t >= 7.9 ? C.ink : C.white, border: `4px solid ${C.ink}`, borderRadius: 24, padding: '20px 0', fontFamily: SANS, fontWeight: 900, fontSize: 36, color: t >= 7.9 ? C.white : C.ink}}>Keep Friday</div>
          </div>
        </div>
      )}
      <Sfx at={2.97} name="pop" volume={0.4} />
      <Sfx at={4.64} name="hit" volume={0.4} />
      <Sfx at={6.92} name="blip" volume={0.35} />
      <Sfx at={7.9} name="click" volume={0.5} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move two: put a price on it.', start: 0.51, end: 2.93, key: 'price', se: 2.63},
          {text: 'Yes, I can build the deck.', start: 2.97, end: 4.6, key: 'deck.', se: 4.45},
          {text: "It means Friday's launch moves to Monday.", start: 4.64, end: 6.88, key: 'Monday.', se: 6.51},
          {text: "Let them decide if it's worth it.", start: 6.92, end: 8.8, key: 'decide', se: 8.26},
        ]}
      />
    </Scene>
  );
};

/* ---------- 5. Move 3: no to the task, yes to the person ---------- */
const Move3: React.FC = () => {
  const {f, fps, t} = useT();
  const walk = interpolate(t, [0.3, 1.6], [0, 1], clamp);
  const walking = t >= 0.3 && t < 1.6;
  const point = interpolate(t, [5.62, 6.0], [0, 70], clamp);
  return (
    <Scene bg={C.paper} dur={8.7}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Backdrop />
        <Fg k={1.25}>
          <Desk x={640} y={1080} w={260} laptop screenGlow={t >= 5.62 ? 1 : 0} />
          <Person x={800} y={1180} facing={-1} sitting {...SAM} />
          <Person x={180 + 220 * walk} y={1180} facing={1} walk={walking ? f / 3.2 : undefined} armL={point} {...YOU} />
        </Fg>
      </svg>
      <Watermark />
      <StepLabel n="3/3" title="No to the task. Yes to the person." />
      <Chip at={1.4} left={600} top={470} bg={C.red}>
        Own it: no
      </Chip>
      <Chip at={2.6} left={600} top={550} bg={C.green}>
        Help Sam: yes
      </Chip>
      <SpeechBubble at={5.62} left={80} top={590} width={470} tail="right" dark>
        {"20 minutes. Here's how I'd start."}
      </SpeechBubble>
      <Sfx at={1.4} name="hit" volume={0.4} />
      <Sfx at={2.6} name="pop" volume={0.4} />
      <Sfx at={5.62} name="pop" volume={0.4} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move three: say no to the task, yes to the person.', start: 0.53, end: 4.4, key: 'person.', se: 3.89},
          {text: "I can't own this,", start: 4.45, end: 5.58, key: 'own', se: 5.48},
          {text: "but I'll spend twenty minutes showing Sam how I'd start.", start: 5.62, end: 8.7, key: 'twenty', se: 8.15},
        ]}
      />
    </Scene>
  );
};

/* ---------- 6. Punch line ---------- */
const Punch: React.FC = () => (
  <Scene bg={C.night} dur={6.1}>
    <Watermark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 34}}>
      <SerifLine at={0.84} size={108}>
        Saying yes to everything makes you helpful.
      </SerifLine>
      <SerifLine at={3.24} size={108} color={C.amber} italic>
        Saying no well makes you senior.
      </SerifLine>
    </AbsoluteFill>
    <Sfx at={0.84} name="pop" volume={0.3} />
    <Sfx at={3.24} name="pop" volume={0.4} />
  </Scene>
);

/* ---------- 7. End card ---------- */
const End: React.FC = () => {
  const {f, fps} = useT();
  const brand = spring({frame: f - s(3.61), fps, config: {damping: 14}});
  const qOut = interpolate(f, [s(3.3), s(3.61)], [1, 0], clamp);
  return (
    <Scene bg={C.night} dur={9.0}>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut, gap: 30}}>
        <SerifLine at={0.69} size={104}>
          {"What's one task you wish you'd said no to?"}
        </SerifLine>
        <SerifLine at={2.73} size={64} color={C.amber} italic>
          Tell me in the comments.
        </SerifLine>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: brand, transform: `scale(${0.9 + 0.1 * brand})`}}>
        <King size={130} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: 14, color: C.white, marginTop: 36}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={3.61} name="pop" volume={0.4} />
    </Scene>
  );
};

export const Day12: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day12.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music_day12.wav')}
      volume={(f) => interpolate(f, [0, s(49.3), s(49.9), s(DAY12_DURATION)], [0.13, 0.13, 0.32, 0.32], clamp)}
    />
    <Seq k="hook"><Hook /></Seq>
    <Seq k="how"><How /></Seq>
    <Seq k="move1"><Move1 /></Seq>
    <Seq k="move2"><Move2 /></Seq>
    <Seq k="move3"><Move3 /></Seq>
    <Seq k="punch"><Punch /></Seq>
    <Seq k="end"><End /></Seq>
  </AbsoluteFill>
);

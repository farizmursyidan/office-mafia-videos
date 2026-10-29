import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, SANS, s} from './theme';
import {Captions, King, Scene, SerifLine, Sfx, StepLabel, Watermark} from './components';
import {Desk, Person} from './characters';

/* Scene timeline (seconds, global), synced to public/voice/day13.wav */
export const SCENES13 = {
  hook: [0, 5.9],
  how: [5.9, 13.8],
  sign1: [13.8, 20.45],
  sign2: [20.45, 27.6],
  sign3: [27.6, 34.8],
  act: [34.8, 41.4],
  punch: [41.4, 47.0],
  end: [47.0, 55.5],
} as const;
export const DAY13_DURATION = SCENES13.end[1];

const Seq: React.FC<{k: keyof typeof SCENES13; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES13[k];
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

const Chip: React.FC<{at: number; left: number; top: number; bg: string; fg?: string; size?: number; children: React.ReactNode}> = ({at, left, top, bg, fg = C.white, size = 32, children}) => {
  const {f, fps, t} = useT();
  if (t < at) return null;
  const sp = spring({frame: f - s(at), fps, config: {damping: 11, stiffness: 220}});
  return (
    <div style={{position: 'absolute', left, top, opacity: sp, transform: `scale(${0.8 + 0.2 * sp})`, transformOrigin: 'left center'}}>
      <div style={{background: bg, color: fg, fontFamily: SANS, fontWeight: 900, fontSize: size, padding: '10px 24px', borderRadius: 999, letterSpacing: 1, whiteSpace: 'nowrap'}}>{children}</div>
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

/* ---------- 1. Hook: the reorg lands in November, the signs were there since August ---------- */
const MONTHS = [
  {m: 'AUG', at: 3.3},
  {m: 'SEP', at: 3.8},
  {m: 'OCT', at: 4.3},
];
const Hook: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.2), fps, config: {damping: 14}});
  const stamp = spring({frame: f - s(0.9), fps, config: {damping: 10, stiffness: 240}});
  const look = interpolate(t, [3.2, 3.6], [0, 70], clamp);
  return (
    <Scene bg={C.paper} dur={5.9} whoosh={false}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Backdrop />
        <Fg k={1.05}>
          <Person x={360} y={1180} facing={1} sitting {...YOU} />
          <Desk x={570} y={1080} w={260} laptop />
          <Person x={830} y={1180} facing={-1} armL={look} {...SAM} />
        </Fg>
      </svg>
      <Watermark />
      <div style={{...card, top: 410, padding: '22px 36px 28px', opacity: inn, transform: `translateY(${(1 - inn) * 40}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted}}>THIS YEAR</div>
        <div style={{display: 'flex', gap: 16, marginTop: 18}}>
          {MONTHS.map((mo) => {
            const sp = spring({frame: f - s(mo.at), fps, config: {damping: 11, stiffness: 220}});
            const on = t >= mo.at;
            return (
              <div key={mo.m} style={{flex: 1, height: 170, borderRadius: 22, background: '#F4F1EC', border: `3px solid ${on ? C.amber : '#E6E0D6'}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0'}}>
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.ink}}>{mo.m}</div>
                <div style={{width: 58, height: 58, borderRadius: '50%', background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: on ? sp : 0, transform: `scale(${on ? sp : 0})`}}>!</div>
              </div>
            );
          })}
          <div style={{flex: 1.35, height: 170, borderRadius: 22, background: t >= 0.9 ? C.red : '#F4F1EC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: t >= 0.9 ? C.white : C.ink}}>NOV</div>
            {t >= 0.9 && (
              <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, lineHeight: 1.1, textAlign: 'center', color: C.white, opacity: stamp, transform: `scale(${0.7 + 0.3 * stamp})`}}>
                REORG
                <br />
                ANNOUNCED
              </div>
            )}
          </div>
        </div>
      </div>
      <Chip at={4.6} left={110} top={705} bg={C.ink}>
        THE SIGNS: 3 MONTHS EARLIER
      </Chip>
      <Sfx at={0.9} name="hit" volume={0.45} />
      {MONTHS.map((mo) => (
        <Sfx key={mo.m} at={mo.at} name="blip" volume={0.35} />
      ))}
      <Sfx at={4.6} name="pop" volume={0.4} />
      <Captions
        top={1270}
        caps={[
          {text: 'A reorg is never a surprise.', start: 0.24, end: 2.5, key: 'surprise.', se: 2.14},
          {text: 'The people who survive it saw the signs three months earlier.', start: 2.58, end: 5.9, key: 'three months', se: 5.36},
        ]}
      />
    </Scene>
  );
};

/* ---------- 2. The rule: reorgs reward whoever the new boss knows ---------- */
const How: React.FC = () => {
  const {f, fps, t} = useT();
  const a = spring({frame: f - s(2.35), fps, config: {damping: 14}});
  const b = spring({frame: f - s(5.03), fps, config: {damping: 12}});
  const col = (label: string, big: string, small: string, hi: boolean, sp: number, show: boolean) => (
    <div style={{flex: 1, background: hi ? C.amber : C.nightSoft, border: hi ? 'none' : '3px solid #2E2E2E', borderRadius: 30, padding: '26px 28px', opacity: show ? sp : 0, transform: `translateY(${(1 - sp) * 40}px)`}}>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 2, color: hi ? C.ink : C.muted}}>{label}</div>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 64, color: hi ? C.ink : C.white, marginTop: 16}}>{big}</div>
      <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 32, color: hi ? C.ink : C.muted, marginTop: 8}}>{small}</div>
    </div>
  );
  return (
    <Scene bg={C.night} dur={7.9}>
      <Watermark dark />
      <div style={{position: 'absolute', top: 240, left: 80, right: 80, fontFamily: SANS}}>
        <div style={{fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{fontWeight: 900, fontSize: 76, lineHeight: 1.05, color: C.white, marginTop: 14}}>Reorgs reward who the new boss knows</div>
      </div>
      <div style={{position: 'absolute', top: 660, left: 70, right: 70, display: 'flex', gap: 30}}>
        {col('WORKS HARDEST', 'Moved', '60 hour weeks, name unknown', false, a, t >= 2.35)}
        {col('KNOWN TO NEW BOSS', 'Kept', 'two coffee chats, name known', true, b, t >= 5.03)}
      </div>
      <Sfx at={2.35} name="pop" volume={0.35} />
      <Sfx at={5.03} name="hit" volume={0.4} />
      <Captions
        dark
        top={1250}
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.46, end: 2.3, key: 'nobody', se: 1.75},
          {text: "Reorgs don't reward whoever works hardest.", start: 2.35, end: 4.98, key: 'hardest.', se: 4.88},
          {text: 'They reward whoever the new boss already knows.', start: 5.03, end: 7.9, key: 'knows.', se: 7.38},
        ]}
      />
    </Scene>
  );
};

/* ---------- 3. Sign 1: meetings vanish ---------- */
const CAL = [
  {day: 'MON', time: '10:00', name: 'Team standup', gone: 99},
  {day: 'TUE', time: '14:00', name: 'Leadership sync (weekly)', gone: 4.7},
  {day: 'WED', time: '11:00', name: 'Roadmap review', gone: 1.7},
  {day: 'THU', time: '16:00', name: 'Client check in', gone: 99},
];
const Sign1: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.3), fps, config: {damping: 15}});
  return (
    <Scene bg={C.paper} dur={6.65}>
      <Watermark />
      <StepLabel n="1/3" title="Meetings vanish" />
      <div style={{...card, top: 440, padding: '22px 36px 18px', opacity: inn, transform: `translateY(${(1 - inn) * 50}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 8}}>YOUR WEEK</div>
        {CAL.map((r) => {
          const g = interpolate(t, [r.gone, r.gone + 0.4], [0, 1], clamp);
          return (
            <div key={r.day} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '16px 0', borderTop: '2px solid #EEEAE4', opacity: 1 - 0.55 * g}}>
              <div style={{width: 80, fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.muted}}>{r.day}</div>
              <div style={{width: 6, alignSelf: 'stretch', borderRadius: 3, background: g > 0 ? C.red : C.amber}} />
              <div>
                <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink, textDecoration: g > 0.5 ? 'line-through' : 'none'}}>{r.name}</div>
                <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 26, color: C.muted, marginTop: 2}}>{g > 0.5 ? 'Canceled' : r.time}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Chip at={5.1} left={110} top={1000} bg={C.red}>
        Canceled. No reason given.
      </Chip>
      <Sfx at={1.7} name="snip" volume={0.45} />
      <Sfx at={4.7} name="snip" volume={0.45} />
      <Sfx at={5.1} name="hit" volume={0.4} />
      <Captions
        top={1290}
        caps={[
          {text: 'Sign one: meetings vanish without a reason.', start: 0.42, end: 3.38, key: 'vanish', se: 3.05},
          {text: 'Your weekly sync with leadership disappears from the calendar.', start: 3.42, end: 6.65, key: 'leadership', se: 6.19},
        ]}
      />
    </Scene>
  );
};

/* ---------- 4. Sign 2: new names on every budget email ---------- */
const MAILS = [
  {subj: 'Q1 budget draft', at: 3.0},
  {subj: 'Headcount plan', at: 3.9},
  {subj: 'Cost review, all teams', at: 4.8},
];
const Sign2: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.3), fps, config: {damping: 15}});
  return (
    <Scene bg={C.paper} dur={7.15}>
      <Watermark />
      <StepLabel n="2/3" title="New names show up" />
      <div style={{...card, top: 440, padding: '22px 36px 14px', opacity: inn, transform: `translateY(${(1 - inn) * 50}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 8}}>INBOX</div>
        {MAILS.map((m) => {
          const sp = spring({frame: f - s(m.at), fps, config: {damping: 12}});
          const on = t >= m.at;
          const hl = on ? interpolate(t, [m.at + 0.3, m.at + 0.6], [0, 1], clamp) : 0;
          return (
            <div key={m.subj} style={{padding: '16px 0', borderTop: '2px solid #EEEAE4', opacity: on ? sp : 0, transform: `translateX(${(1 - sp) * 40}px)`}}>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 36, color: C.ink}}>{m.subj}</div>
              <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 28, color: C.muted, marginTop: 6}}>
                CC: you, Dana,{' '}
                <span style={{background: `rgba(224,169,59,${0.55 * hl})`, color: C.ink, fontWeight: 800, padding: '2px 10px', borderRadius: 10}}>R. Kessler (consultant)</span>
              </div>
            </div>
          );
        })}
      </div>
      <Chip at={5.7} left={600} top={1010} bg={C.ink}>
        Who is this?
      </Chip>
      {MAILS.map((m) => (
        <Sfx key={m.subj} at={m.at} name="ping" volume={0.3} />
      ))}
      <Sfx at={5.7} name="pop" volume={0.4} />
      <Captions
        top={1290}
        caps={[
          {text: 'Sign two: new names show up.', start: 0.37, end: 2.76, key: 'names', se: 2.44},
          {text: "A consultant you've never met is suddenly CC'd on every budget email.", start: 2.8, end: 7.15, key: 'consultant', se: 6.67},
        ]}
      />
    </Scene>
  );
};

/* ---------- 5. Sign 3: your boss goes vague ---------- */
const Sign3: React.FC = () => {
  const {f, t} = useT();
  const walk = interpolate(t, [0.3, 1.5], [0, 1], clamp);
  const walking = t >= 0.3 && t < 1.5;
  const fog = interpolate(t, [5.4, 6.2], [0, 1], clamp);
  return (
    <Scene bg={C.paper} dur={7.2}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Backdrop />
        <Fg k={1.15}>
          <Desk x={660} y={1080} w={260} laptop />
          <Person x={820} y={1180} facing={-1} sitting {...DANA} />
          <Person x={170 + 230 * walk} y={1180} facing={1} walk={walking ? f / 3.2 : undefined} {...YOU} />
        </Fg>
      </svg>
      <Watermark />
      <StepLabel n="3/3" title="Your boss goes vague" />
      <SpeechBubble at={2.93} left={80} top={440} width={520} tail="left">
        {"What's next quarter?"}
      </SpeechBubble>
      <SpeechBubble at={4.3} left={480} top={575} width={520} tail="right" dark>
        {"Let's see how things shake out."}
      </SpeechBubble>
      {t >= 5.4 && (
        <div style={{position: 'absolute', left: 90, top: 600, opacity: fog}}>
          <div style={{display: 'flex', gap: 14}}>
            {['No dates', 'No names'].map((w) => (
              <div key={w} style={{background: C.red, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 28, padding: '8px 20px', borderRadius: 999, whiteSpace: 'nowrap'}}>{w}</div>
            ))}
          </div>
        </div>
      )}
      <Sfx at={2.93} name="pop" volume={0.4} />
      <Sfx at={4.3} name="pop" volume={0.4} />
      <Sfx at={5.4} name="hit" volume={0.35} />
      <Captions
        top={1290}
        caps={[
          {text: 'Sign three: your boss goes vague.', start: 0.5, end: 2.88, key: 'vague.', se: 2.53},
          {text: "Ask about next quarter and you hear, let's see how things shake out.", start: 2.93, end: 7.2, key: 'shake', se: 6.66},
        ]}
      />
    </Scene>
  );
};

/* ---------- 6. The move: spot two, then act ---------- */
const WINS = [
  {w: 'Cut churn 18%', at: 2.7},
  {w: 'Shipped billing v2 early', at: 3.1},
  {w: 'Saved $40k on vendors', at: 3.5},
];
const Act: React.FC = () => {
  const {f, fps, t} = useT();
  const top = spring({frame: f - s(0.3), fps, config: {damping: 15}});
  const wins = spring({frame: f - s(2.19), fps, config: {damping: 14}});
  const inv = spring({frame: f - s(4.4), fps, config: {damping: 13}});
  const sent = t >= 5.4;
  return (
    <Scene bg={C.paper} dur={6.6}>
      <Watermark />
      <StepLabel n="THE MOVE" title="Spot two? Move." />
      <div style={{...card, top: 430, padding: '18px 36px', display: 'flex', alignItems: 'center', gap: 22, opacity: top, transform: `translateY(${(1 - top) * 40}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.ink}}>Signs spotted</div>
        <div style={{display: 'flex', gap: 12, marginLeft: 'auto'}}>
          {[0.6, 0.9, 99].map((at, i) => (
            <div key={i} style={{width: 54, height: 54, borderRadius: 14, background: t >= at ? C.amber : '#F1ECE4', color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {t >= at ? '✓' : ''}
            </div>
          ))}
        </div>
      </div>
      <div style={{...card, top: 580, padding: '20px 36px 14px', opacity: t >= 2.19 ? wins : 0, transform: `translateY(${(1 - wins) * 40}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 6}}>MY 3 BIGGEST WINS</div>
        {WINS.map((w, i) => {
          const sp = spring({frame: f - s(w.at), fps, config: {damping: 12}});
          return (
            <div key={w.w} style={{display: 'flex', alignItems: 'center', gap: 18, padding: '10px 0', borderTop: '2px solid #EEEAE4', opacity: t >= w.at ? sp : 0, transform: `translateX(${(1 - sp) * 30}px)`}}>
              <div style={{width: 44, height: 44, borderRadius: '50%', background: C.green, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
              <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.ink}}>{w.w}</div>
            </div>
          );
        })}
      </div>
      {t >= 4.4 && (
        <div style={{...card, top: 900, padding: '20px 36px', display: 'flex', alignItems: 'center', gap: 22, opacity: inv, transform: `translateY(${(1 - inv) * 40}px)`}}>
          <div style={{width: 76, height: 76, borderRadius: 18, background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1.05}}>
            <div>THU</div>
            <div style={{fontSize: 30}}>9:30</div>
          </div>
          <div>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 34, color: C.ink}}>15 min with Priya</div>
            <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 26, color: C.muted, marginTop: 2}}>{"Your boss's boss (VP)"}</div>
          </div>
          <div style={{marginLeft: 'auto', background: sent ? C.green : '#F1ECE4', color: sent ? C.white : C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 26, padding: '10px 22px', borderRadius: 999}}>{sent ? 'SENT' : 'SEND'}</div>
        </div>
      )}
      <Sfx at={0.6} name="click" volume={0.45} />
      <Sfx at={0.9} name="click" volume={0.45} />
      {WINS.map((w) => (
        <Sfx key={w.w} at={w.at} name="blip" volume={0.3} />
      ))}
      <Sfx at={4.4} name="pop" volume={0.4} />
      <Sfx at={5.4} name="send" volume={0.4} />
      <Captions
        top={1290}
        caps={[
          {text: 'Spot two, and move.', start: 0.53, end: 2.15, key: 'move.', se: 1.78},
          {text: "Write down your three biggest wins, and get fifteen minutes with your boss's boss.", start: 2.19, end: 6.6, key: 'wins,', se: 6.04},
        ]}
      />
    </Scene>
  );
};

/* ---------- 7. Punch line ---------- */
const Punch: React.FC = () => (
  <Scene bg={C.night} dur={5.6}>
    <Watermark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 34}}>
      <SerifLine at={0.5} size={108}>
        Loyalty to the old chart gets you moved.
      </SerifLine>
      <SerifLine at={2.76} size={108} color={C.amber} italic>
        Visibility on the new one gets you kept.
      </SerifLine>
    </AbsoluteFill>
    <Sfx at={0.5} name="pop" volume={0.3} />
    <Sfx at={2.76} name="pop" volume={0.4} />
  </Scene>
);

/* ---------- 8. End card ---------- */
const End: React.FC = () => {
  const {f, fps} = useT();
  const brand = spring({frame: f - s(4.55), fps, config: {damping: 14}});
  const qOut = interpolate(f, [s(4.25), s(4.55)], [1, 0], clamp);
  return (
    <Scene bg={C.night} dur={8.5}>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut, gap: 30}}>
        <SerifLine at={0.49} size={100}>
          Have you ever seen a reorg coming before it was announced?
        </SerifLine>
        <SerifLine at={3.25} size={64} color={C.amber} italic>
          Tell me in the comments.
        </SerifLine>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: brand, transform: `scale(${0.9 + 0.1 * brand})`}}>
        <King size={130} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: 14, color: C.white, marginTop: 36}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={4.55} name="pop" volume={0.4} />
    </Scene>
  );
};

export const Day13: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day13.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music_day13.wav')}
      volume={(f) => interpolate(f, [0, s(53.1), s(53.7), s(DAY13_DURATION)], [0.13, 0.13, 0.32, 0.32], clamp)}
    />
    <Seq k="hook"><Hook /></Seq>
    <Seq k="how"><How /></Seq>
    <Seq k="sign1"><Sign1 /></Seq>
    <Seq k="sign2"><Sign2 /></Seq>
    <Seq k="sign3"><Sign3 /></Seq>
    <Seq k="act"><Act /></Seq>
    <Seq k="punch"><Punch /></Seq>
    <Seq k="end"><End /></Seq>
  </AbsoluteFill>
);

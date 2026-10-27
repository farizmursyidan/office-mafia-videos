import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, SANS, s} from './theme';
import {Avatar, Bubble, Captions, ChatCard, King, Scene, SerifLine, Sfx, StepLabel, TypeClicks, TypeStep, Typing, Watermark, typedText} from './components';
import {Desk, Person} from './characters';

/* Scene timeline (seconds, global), synced to public/voice/day11.wav */
export const SCENES11 = {
  hook: [0, 5.2],
  how: [5.2, 13.6],
  move1: [13.6, 24.6],
  move2: [24.6, 33.6],
  move3: [33.6, 43.4],
  punch: [43.4, 48.0],
  end: [48.0, 57.0],
} as const;
export const DAY11_DURATION = SCENES11.end[1];

const Seq: React.FC<{k: keyof typeof SCENES11; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES11[k];
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

const Chip: React.FC<{at: number; left: number; top: number; dark?: boolean; red?: boolean; children: React.ReactNode}> = ({at, left, top, dark, red, children}) => {
  const {f, fps, t} = useT();
  if (t < at) return null;
  const sp = spring({frame: f - s(at), fps, config: {damping: 11, stiffness: 220}});
  return (
    <div style={{position: 'absolute', left, top, opacity: sp, transform: `scale(${0.8 + 0.2 * sp})`, transformOrigin: 'left center'}}>
      <div style={{background: red ? C.red : dark ? C.ink : C.amber, color: dark || red ? C.white : C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 32, padding: '10px 24px', borderRadius: 999, letterSpacing: 1.5}}>
        {children}
      </div>
    </div>
  );
};

/* ---------- 1. Hook: the review meeting, the form was filled in months ago ---------- */
const Hook: React.FC = () => {
  const {f, fps, t} = useT();
  const doc = spring({frame: f - s(0.3), fps, config: {damping: 14}});
  const stamp = spring({frame: f - s(1.6), fps, config: {damping: 9, stiffness: 240}});
  return (
    <Scene bg={C.paper} dur={5.2} whoosh={false}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Backdrop />
        <Fg k={1.2}>
          <Person x={330} y={1180} facing={1} sitting {...YOU} />
          <Desk x={560} y={1080} w={260} laptop />
          <Person x={790} y={1180} facing={-1} sitting {...DANA} />
        </Fg>
      </svg>
      <Watermark />
      <div style={{...card, top: 420, padding: '26px 36px', opacity: doc, transform: `translateY(${(1 - doc) * 40}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted}}>PERFORMANCE REVIEW</div>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 44, color: C.ink, marginTop: 6}}>You, annual review</div>
        <div style={{display: 'flex', gap: 16, marginTop: 18, fontFamily: SANS, fontSize: 32}}>
          <div style={{color: C.muted, fontWeight: 600, width: 200}}>Rating</div>
          <div style={{color: C.ink, fontWeight: 800}}>Meets expectations</div>
        </div>
        <div style={{display: 'flex', gap: 16, marginTop: 10, fontFamily: SANS, fontSize: 32}}>
          <div style={{color: C.muted, fontWeight: 600, width: 200}}>Meeting</div>
          <div style={{color: C.ink, fontWeight: 800}}>Today, 2:00 PM</div>
        </div>
        <div style={{display: 'flex', gap: 16, marginTop: 10, fontFamily: SANS, fontSize: 32, alignItems: 'center'}}>
          <div style={{color: C.muted, fontWeight: 600, width: 200}}>Last edited</div>
          <div style={{color: t >= 1.6 ? C.red : C.ink, fontWeight: 800}}>July 14</div>
          {t >= 1.6 && (
            <div style={{marginLeft: 'auto', transform: `rotate(-4deg) scale(${1.25 - 0.25 * stamp})`, opacity: stamp}}>
              <div style={{border: `6px solid ${C.red}`, color: C.red, fontFamily: SANS, fontWeight: 900, fontSize: 36, padding: '4px 20px', borderRadius: 14, letterSpacing: 3, background: 'rgba(255,255,255,0.9)'}}>DECIDED IN JULY</div>
            </div>
          )}
        </div>
      </div>
      <Sfx at={1.6} name="hit" volume={0.45} />
      <Captions
        top={1270}
        caps={[
          {text: 'Your performance review was decided months ago.', start: 0.32, end: 3.07, key: 'months', se: 2.73},
          {text: 'The meeting is just where they read it to you.', start: 3.11, end: 5.2, key: 'read', se: 4.89},
        ]}
      />
    </Scene>
  );
};

/* ---------- 2. The rule: calibration happens without you ---------- */
const ROWS = [
  {name: 'Alex', rating: 'Top', color: '#3F7D5C', at: 2.6},
  {name: 'Jordan', rating: 'Meets', color: '#7A4E8C', at: 3.1},
  {name: 'You', rating: '?', color: C.amber, at: 3.6},
];
const How: React.FC = () => {
  const {f, fps, t} = useT();
  const room = spring({frame: f - s(2.05), fps, config: {damping: 14}});
  const notes = spring({frame: f - s(5.69), fps, config: {damping: 12}});
  return (
    <Scene bg={C.night} dur={8.4}>
      <Watermark dark />
      <div style={{position: 'absolute', top: 240, left: 80, right: 80, fontFamily: SANS}}>
        <div style={{fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{fontWeight: 900, fontSize: 76, lineHeight: 1.05, color: C.white, marginTop: 14}}>Your rating is argued without you</div>
      </div>
      {t >= 2.05 && (
        <div style={{position: 'absolute', top: 520, left: 70, right: 70, background: C.nightSoft, borderRadius: 34, padding: '24px 34px', opacity: room, transform: `translateY(${(1 - room) * 40}px)`, border: '3px solid #2E2E2E'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 3, color: C.muted}}>CALIBRATION, ROOM 4B</div>
            <div style={{display: 'flex', gap: 8}}>
              {['D', 'M', 'R'].map((x, i) => (
                <Avatar key={i} initials={x} color={['#3F6FB5', '#8E6845', '#5A5F68'][i]} size={54} />
              ))}
            </div>
          </div>
          {ROWS.map((r, i) => {
            const sp = spring({frame: f - s(r.at), fps, config: {damping: 13}});
            const you = r.name === 'You';
            return (
              <div key={i} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '14px 0', borderTop: '2px solid #2A2A2A', marginTop: i ? 0 : 14, opacity: t >= r.at ? sp : 0}}>
                <Avatar initials={r.name[0]} color={r.color} size={64} />
                <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 38, color: C.white, flex: 1}}>{r.name}</div>
                <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 34, color: you ? C.ink : C.white, background: you ? C.amber : '#2B2B2B', borderRadius: 999, padding: '6px 24px'}}>{r.rating}</div>
              </div>
            );
          })}
        </div>
      )}
      {t >= 5.69 && (
        <div style={{position: 'absolute', top: 975, left: 70, right: 70, background: C.white, borderRadius: 28, padding: '20px 32px', opacity: notes, transform: `translateY(${(1 - notes) * 30}px)`, borderLeft: `14px solid ${C.red}`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 2, color: C.muted}}>{"YOUR MANAGER'S EVIDENCE"}</div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 38, color: C.red, marginTop: 6}}>0 wins written down</div>
        </div>
      )}
      {ROWS.map((r, i) => (
        <Sfx key={i} at={r.at} name="blip" volume={0.3} />
      ))}
      <Sfx at={5.69} name="hit" volume={0.4} />
      <Captions
        dark
        top={1250}
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.38, end: 2.01, key: 'nobody', se: 1.53},
          {text: "Your rating gets argued in a calibration room you're not in.", start: 2.05, end: 5.65, key: 'calibration', se: 5.06},
          {text: 'Your manager needs ammunition to fight for you.', start: 5.69, end: 8.4, key: 'ammunition', se: 7.8},
        ]}
      />
    </Scene>
  );
};

/* ---------- 3. Move 1: keep a brag doc ---------- */
const WINS = [
  {d: 'Fri Sep 19', w: 'Closed 3 renewals, $40k', at: 3.4},
  {d: 'Fri Sep 26', w: 'Fixed billing bug, 120 tickets gone', at: 4.2},
];
const NEW_WIN = 'Cut onboarding from 2 weeks to 5 days';
const STEPS_M1: TypeStep[] = [{text: NEW_WIN, from: 6.0, to: 7.8, mode: 'type'}];
const Move1: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.4), fps, config: {damping: 15}});
  const cmp = spring({frame: f - s(8.57), fps, config: {damping: 12}});
  const typed = typedText(f, STEPS_M1);
  const caret = Math.floor(f / 15) % 2 === 0;
  return (
    <Scene bg={C.paper} dur={11.0}>
      <Watermark />
      <StepLabel n="1/3" title="Keep a brag doc" />
      <div style={{...card, top: 430, padding: '22px 36px 26px', opacity: inn, transform: `translateY(${(1 - inn) * 50}px)`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.ink}}>brag_doc</div>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, color: C.ink, background: C.amber, borderRadius: 999, padding: '6px 18px'}}>EVERY FRIDAY</div>
        </div>
        {WINS.map((w, i) => {
          const sp = spring({frame: f - s(w.at), fps, config: {damping: 13}});
          return (
            <div key={i} style={{display: 'flex', gap: 20, padding: '14px 0', borderTop: '2px solid #EEEAE4', marginTop: i ? 0 : 14, fontFamily: SANS, opacity: t >= w.at ? sp : 0}}>
              <div style={{width: 170, fontWeight: 700, fontSize: 28, color: C.muted, flexShrink: 0}}>{w.d}</div>
              <div style={{fontWeight: 700, fontSize: 32, color: C.ink}}>{w.w}</div>
            </div>
          );
        })}
        {t >= 5.79 && (
          <div style={{display: 'flex', gap: 20, padding: '14px 0', borderTop: '2px solid #EEEAE4', fontFamily: SANS}}>
            <div style={{width: 170, fontWeight: 700, fontSize: 28, color: C.muted, flexShrink: 0}}>Fri Oct 3</div>
            <div style={{fontWeight: 800, fontSize: 32, color: C.ink, minHeight: 80}}>
              {typed}
              {t < 7.9 && caret && <span>|</span>}
            </div>
          </div>
        )}
      </div>
      {t >= 8.57 && (
        <div style={{position: 'absolute', top: 960, left: 70, right: 70, display: 'flex', gap: 30, opacity: cmp, transform: `translateY(${(1 - cmp) * 30}px)`}}>
          <div style={{flex: 1, background: '#DCD5CA', borderRadius: 26, padding: '18px 24px', fontFamily: SANS}}>
            <div style={{fontWeight: 900, fontSize: 24, letterSpacing: 2, color: C.muted}}>MANAGER REMEMBERS</div>
            <div style={{fontWeight: 800, fontSize: 34, color: C.muted, marginTop: 6, filter: 'blur(1.5px)'}}>something in Q2?</div>
          </div>
          <div style={{flex: 1, background: C.ink, borderRadius: 26, padding: '18px 24px', fontFamily: SANS}}>
            <div style={{fontWeight: 900, fontSize: 24, letterSpacing: 2, color: C.amber}}>YOUR DOC</div>
            <div style={{fontWeight: 800, fontSize: 34, color: C.white, marginTop: 6}}>38 wins, dated</div>
          </div>
        </div>
      )}
      {WINS.map((w, i) => (
        <Sfx key={i} at={w.at} name="blip" volume={0.3} />
      ))}
      <TypeClicks steps={STEPS_M1} />
      <Sfx at={8.57} name="pop" volume={0.45} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move one: keep a brag doc.', start: 0.83, end: 3.15, key: 'brag', se: 2.69},
          {text: 'Every Friday, write one win with a number.', start: 3.19, end: 5.75, key: 'number.', se: 5.33},
          {text: 'Cut onboarding from two weeks to five days.', start: 5.79, end: 8.53, key: 'five', se: 8.02},
          {text: "Your manager forgets. The doc doesn't.", start: 8.57, end: 11.0, key: "doesn't.", se: 10.58},
        ]}
      />
    </Scene>
  );
};

/* ---------- 4. Move 2: ask in month nine ---------- */
const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const Move2: React.FC = () => {
  const {f, fps, t} = useT();
  const strip = spring({frame: f - s(0.3), fps, config: {damping: 15}});
  const nine = spring({frame: f - s(1.6), fps, config: {damping: 10, stiffness: 220}});
  const late = t >= 2.9;
  return (
    <Scene bg={C.paper} dur={9.0}>
      <Watermark />
      <StepLabel n="2/3" title="Ask in month nine" />
      <div style={{...card, top: 430, padding: '20px 26px', opacity: strip, transform: `translateY(${(1 - strip) * 40}px)`}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          {MONTHS.map((m, i) => {
            const isNine = i === 8 && t >= 1.6;
            const isDec = i === 11 && late;
            return (
              <div key={i} style={{width: 62, height: 84, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 34, background: isNine ? C.amber : isDec ? C.red : '#F1EEE9', color: isDec ? C.white : C.ink, transform: isNine ? `scale(${1 + 0.15 * nine})` : undefined}}>
                {m}
              </div>
            );
          })}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: SANS, fontWeight: 800, fontSize: 24}}>
          <div style={{color: C.muted}}>Jan</div>
          <div style={{display: 'flex', gap: 30}}>
            {t >= 1.6 && <div style={{color: '#9A6D10'}}>Sep: ask now</div>}
            {late && <div style={{color: C.red}}>Dec: too late</div>}
          </div>
        </div>
      </div>
      <ChatCard name="Dana" sub="Your manager" initials="D" color="#3F6FB5" top={660} minHeight={500}>
        <Bubble at={4.59} out>
          What gets me a top rating?
        </Bubble>
        <Typing from={5.4} to={5.95} />
        <Bubble at={5.95}>Own the Q4 launch.</Bubble>
        <Bubble at={6.9} out>
          Shipped, 2 weeks early.
        </Bubble>
      </ChatCard>
      <Sfx at={1.6} name="pop" volume={0.4} />
      <Sfx at={2.9} name="hit" volume={0.35} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move two: ask in month nine, not month twelve.', start: 1.02, end: 4.55, key: 'nine,', se: 4.06},
          {text: 'What would make this a top rating?', start: 4.59, end: 6.56, key: 'top', se: 5.99},
          {text: 'Then do exactly that, and tell them.', start: 6.6, end: 9.0, key: 'exactly', se: 8.28},
        ]}
      />
    </Scene>
  );
};

/* ---------- 5. Move 3: send the summary before calibration ---------- */
const SUMMARY = '3 wins:\n1. Onboarding: 2 weeks to 5 days\n2. Q4 launch: 2 weeks early\n3. Renewals: $40k closed';
const STEPS_M3: TypeStep[] = [{text: SUMMARY, from: 4.96, to: 7.1, mode: 'type'}];
const Move3: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.4), fps, config: {damping: 15}});
  const sent = t >= 7.63;
  const sentSp = spring({frame: f - s(7.63), fps, config: {damping: 12}});
  const chip = spring({frame: f - s(8.1), fps, config: {damping: 10, stiffness: 240}});
  const body = typedText(f, STEPS_M3);
  const caret = Math.floor(f / 15) % 2 === 0;
  const field = (label: string, value: React.ReactNode) => (
    <div style={{display: 'flex', gap: 20, padding: '14px 0', borderBottom: '2px solid #EEEAE4', fontFamily: SANS, fontSize: 32, alignItems: 'center'}}>
      <div style={{width: 130, color: C.muted, fontWeight: 600}}>{label}</div>
      <div style={{color: C.ink, fontWeight: 700}}>{value}</div>
    </div>
  );
  return (
    <Scene bg={C.paper} dur={9.8}>
      <Watermark />
      <StepLabel n="3/3" title="Send the summary first" />
      <div style={{...card, top: 430, padding: '16px 40px 26px', opacity: inn, transform: `translateY(${(1 - inn) * 60}px)`}}>
        {field('To', 'Dana')}
        {field('Subject', 'My year on one page')}
        <div style={{fontFamily: SANS, fontSize: 34, lineHeight: 1.4, color: C.ink, minHeight: 210, paddingTop: 16, whiteSpace: 'pre-wrap', fontWeight: 600}}>
          {body}
          {!sent && t >= 4.9 && t < 7.2 && caret && <span>|</span>}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 20, marginTop: 6}}>
          {sent && <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: C.green, opacity: sentSp}}>{'✓'} Sent Nov 28</div>}
          <div style={{padding: '14px 36px', borderRadius: 18, background: sent ? C.green : C.ink, color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 32}}>{sent ? 'Sent' : 'Send'}</div>
        </div>
      </div>
      {t >= 8.1 && (
        <div style={{position: 'absolute', top: 1060, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${chip})`}}>
          <div style={{background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 36, padding: '12px 28px', borderRadius: 999}}>Calibration: Dec 2. Ready to paste.</div>
        </div>
      )}
      <TypeClicks steps={STEPS_M3} />
      <Sfx at={7.63} name="send" volume={0.5} />
      <Sfx at={8.1} name="hit" volume={0.4} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move three: send your manager a summary before calibration.', start: 0.74, end: 4.92, key: 'before', se: 4.41},
          {text: 'Three wins, three numbers, one page.', start: 4.96, end: 7.59, key: 'one', se: 7.09},
          {text: 'Make it easy to copy and paste.', start: 7.63, end: 9.8, key: 'easy', se: 9.03},
        ]}
      />
    </Scene>
  );
};

/* ---------- 6. Punch line ---------- */
const Punch: React.FC = () => (
  <Scene bg={C.night} dur={4.6}>
    <Watermark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 34}}>
      <SerifLine at={0.68} size={116}>
        Hard work earns the rating.
      </SerifLine>
      <SerifLine at={2.61} size={116} color={C.amber} italic>
        A written record defends it.
      </SerifLine>
    </AbsoluteFill>
    <Sfx at={0.68} name="pop" volume={0.3} />
    <Sfx at={2.61} name="pop" volume={0.4} />
  </Scene>
);

/* ---------- 7. End card ---------- */
const End: React.FC = () => {
  const {f, fps} = useT();
  const brand = spring({frame: f - s(5.29), fps, config: {damping: 14}});
  const qOut = interpolate(f, [s(5.0), s(5.29)], [1, 0], clamp);
  return (
    <Scene bg={C.night} dur={9.0}>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut, gap: 30}}>
        <SerifLine at={0.68} size={100}>
          {"What's the worst surprise you've ever had in a performance review?"}
        </SerifLine>
        <SerifLine at={4.01} size={64} color={C.amber} italic>
          Tell me in the comments.
        </SerifLine>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: brand, transform: `scale(${0.9 + 0.1 * brand})`}}>
        <King size={130} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: 14, color: C.white, marginTop: 36}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={5.29} name="pop" volume={0.4} />
    </Scene>
  );
};

export const Day11: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day11.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music_day11.wav')}
      volume={(f) => interpolate(f, [0, s(54.9), s(55.5), s(DAY11_DURATION)], [0.13, 0.13, 0.32, 0.32], clamp)}
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

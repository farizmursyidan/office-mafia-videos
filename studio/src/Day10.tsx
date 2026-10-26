import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, SANS, s} from './theme';
import {Avatar, Bubble, Captions, ChatCard, King, Padlock, Scene, SerifLine, Sfx, StepLabel, Typing, Watermark} from './components';
import {Desk, Person} from './characters';

/* Scene timeline (seconds, global), synced to public/voice/day10.wav */
export const SCENES10 = {
  hook: [0, 6.4],
  how: [6.4, 12.9],
  move1: [12.9, 22.3],
  move2: [22.3, 32.4],
  move3: [32.4, 41.3],
  punch: [41.3, 46.3],
  end: [46.3, 55.0],
} as const;
export const DAY10_DURATION = SCENES10.end[1];

const Seq: React.FC<{k: keyof typeof SCENES10; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES10[k];
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
const PRIYA = {shirt: '#7A4E8C', hair: '#1E1A17', hairStyle: 'long' as const, skin: '#B88158', pants: '#2A2A33'};

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
/* the boss's office door, final-frame coordinates */
const BossDoor: React.FC<{x: number; label: string}> = ({x, label}) => (
  <g transform={`translate(${x} 0)`}>
    <rect x={-130} y={810} width={260} height={370} rx={8} fill="#8E6845" />
    <rect x={-110} y={830} width={220} height={350} fill="#B98A5E" />
    <circle cx={80} cy={1010} r={12} fill={C.amber} />
    <rect x={-100} y={752} width={200} height={44} rx={8} fill={C.ink} />
    <text x={0} y={782} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={22} fill={C.white}>
      {label}
    </text>
  </g>
);

const Chip: React.FC<{at: number; left: number; top: number; dark?: boolean; children: React.ReactNode}> = ({at, left, top, dark, children}) => {
  const {f, fps, t} = useT();
  if (t < at) return null;
  const sp = spring({frame: f - s(at), fps, config: {damping: 11, stiffness: 220}});
  return (
    <div style={{position: 'absolute', left, top, opacity: sp, transform: `scale(${0.8 + 0.2 * sp})`, transformOrigin: 'left center'}}>
      <div style={{background: dark ? C.ink : C.amber, color: dark ? C.white : C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 32, padding: '10px 24px', borderRadius: 999, letterSpacing: 1.5}}>
        {children}
      </div>
    </div>
  );
};

/* ---------- 1. Hook: the org chart vs the person at the door ---------- */
const OrgBox: React.FC<{label: string; hl?: boolean}> = ({label, hl}) => (
  <div style={{background: hl ? C.ink : '#F1EEE9', color: hl ? C.white : C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 26, padding: '10px 18px', borderRadius: 14, textAlign: 'center', minWidth: 120}}>{label}</div>
);
const Hook: React.FC = () => {
  const {f, fps, t} = useT();
  const org = spring({frame: f - s(0.3), fps, config: {damping: 14}});
  const cal = spring({frame: f - s(3.71), fps, config: {damping: 12}});
  const pulse = t >= 2.44 ? 0.5 + 0.5 * Math.sin((f - s(2.44)) / 4) : 0;
  return (
    <Scene bg={C.paper} dur={6.4} whoosh={false}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <Backdrop />
        <BossDoor x={930} label="SAM, VP SALES" />
        <Fg k={1.2}>
          <Person x={300} y={1180} facing={1} {...YOU} />
          <Person x={700} y={1180} facing={-1} sitting {...PRIYA} />
          <Desk x={640} y={1080} w={220} laptop />
        </Fg>
        {t >= 2.44 && <ellipse cx={540 + (680 - 540) * 1.2} cy={1180} rx={170} ry={28} fill={`rgba(224,169,59,${0.35 + 0.3 * pulse})`} />}
      </svg>
      <Watermark />
      {/* the official org chart */}
      <div style={{...card, top: 420, left: 60, right: 'auto', width: 470, padding: '22px 24px', opacity: org, transform: `translateY(${(1 - org) * 40}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 24, letterSpacing: 3, color: C.muted, marginBottom: 14}}>ORG CHART</div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>
          <OrgBox label="Sam, VP" hl />
          <div style={{width: 4, height: 16, background: '#CFC7BA'}} />
          <div style={{display: 'flex', gap: 14}}>
            <OrgBox label="Director" />
            <OrgBox label="Director" />
          </div>
          <div style={{width: 4, height: 16, background: '#CFC7BA'}} />
          <OrgBox label="You" />
        </div>
      </div>
      <Chip at={2.44} left={580} top={420} dark>
        NOT ON THE CHART
      </Chip>
      {t >= 3.71 && (
        <div style={{...card, top: 505, left: 580, right: 50, padding: '14px 22px', opacity: cal, transform: `scale(${0.85 + 0.15 * cal})`, transformOrigin: 'left top', borderLeft: `12px solid ${C.amber}`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, color: C.ink, marginBottom: 8}}>{"Sam's calendar"}</div>
          {['9:00 Board prep', '14:00 Busy'].map((r, i) => (
            <div key={i} style={{fontFamily: SANS, fontWeight: 600, fontSize: 24, color: C.muted, padding: '4px 0'}}>
              {r}
            </div>
          ))}
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, color: '#7A4E8C', marginTop: 6}}>Managed by Priya</div>
        </div>
      )}
      <Sfx at={2.44} name="hit" volume={0.45} />
      <Sfx at={3.71} name="pop" volume={0.45} />
      <Captions
        top={1270}
        caps={[
          {text: "The most powerful person in your office isn't on the org chart.", start: 0.33, end: 3.67, key: 'powerful', se: 3.38},
          {text: "It's whoever controls your boss's calendar.", start: 3.71, end: 6.4, key: 'calendar.', se: 5.81},
        ]}
      />
    </Scene>
  );
};

/* ---------- 2. The rule: every decision maker has a gatekeeper ---------- */
const How: React.FC = () => {
  const {f, fps, t} = useT();
  const row = spring({frame: f - s(0.4), fps, config: {damping: 15}});
  const gate = spring({frame: f - s(2.48), fps, config: {damping: 12}});
  const open = interpolate(t, [4.9, 5.3], [1, 0], clamp);
  const won = spring({frame: f - s(5.3), fps, config: {damping: 12}});
  const node = (label: string, el: React.ReactNode, color: string) => (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: 260}}>
      <div style={{width: 200, height: 200, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{el}</div>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 36, color: C.white, letterSpacing: 2}}>{label}</div>
    </div>
  );
  return (
    <Scene bg={C.night} dur={6.5}>
      <Watermark dark />
      <div style={{position: 'absolute', top: 240, left: 80, right: 80, fontFamily: SANS}}>
        <div style={{fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{fontWeight: 900, fontSize: 80, lineHeight: 1.03, color: C.white, marginTop: 14}}>Every door has a gatekeeper</div>
      </div>
      <div style={{position: 'absolute', top: 650, left: 30, right: 30, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', opacity: row}}>
        {node('YOU', <Avatar initials="Y" color={C.amber} size={120} />, '#2A2A2A')}
        <div style={{opacity: gate, transform: `scale(${0.7 + 0.3 * gate})`}}>
          {node('GATEKEEPER', <div style={{transform: 'scale(0.42)', marginTop: 10}}><Padlock closed={open} /></div>, '#2A2A2A')}
        </div>
        {node('BOSS', <King size={90} />, '#2A2A2A')}
      </div>
      {/* path line */}
      <div style={{position: 'absolute', top: 742, left: 250, width: 580, height: 12, borderRadius: 6, background: t >= 5.3 ? C.green : '#3A3A3A', opacity: row * (t >= 5.3 ? 0.5 + 0.5 * won : 1), zIndex: -1}} />
      {t >= 5.3 && (
        <div style={{position: 'absolute', top: 1010, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${won})`}}>
          <div style={{background: C.green, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 40, padding: '12px 30px', borderRadius: 999}}>Win them over. Door opens.</div>
        </div>
      )}
      <Sfx at={2.48} name="blip" volume={0.35} />
      <Sfx at={4.9} name="lock" volume={0.45} />
      <Captions
        dark
        top={1250}
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.59, end: 2.44, key: 'nobody', se: 1.89},
          {text: 'Every decision maker has a gatekeeper.', start: 2.48, end: 4.57, key: 'gatekeeper.', se: 4.15},
          {text: 'Win them over, or you never get in.', start: 4.61, end: 6.5, key: 'never', se: 6.0},
        ]}
      />
    </Scene>
  );
};

/* ---------- 3. Move 1: learn their name ---------- */
const PEOPLE = [
  {name: 'Priya', role: 'Executive assistant', initials: 'P', color: '#7A4E8C', at: 3.42},
  {name: 'Tom', role: 'Chief of staff', initials: 'T', color: '#3F6FB5', at: 4.45},
  {name: 'Lina', role: 'Books the meeting rooms', initials: 'L', color: '#3F7D5C', at: 5.35},
];
const Move1: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.3), fps, config: {damping: 15}});
  const msg = spring({frame: f - s(6.84), fps, config: {damping: 12}});
  return (
    <Scene bg={C.paper} dur={9.4}>
      <Watermark />
      <StepLabel n="1/3" title="Learn their name" />
      <div style={{...card, top: 440, padding: '24px 36px', opacity: inn, transform: `translateY(${(1 - inn) * 50}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 26, letterSpacing: 3, color: C.muted, marginBottom: 8}}>PEOPLE WHO OPEN DOORS</div>
        {PEOPLE.map((p, i) => {
          const sp = spring({frame: f - s(p.at), fps, config: {damping: 13}});
          const hl = t >= 6.84 && i === 0;
          return (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 24, padding: '16px 0', borderTop: i ? '2px solid #EEEAE4' : 'none', opacity: t >= p.at ? sp : 0.12, transform: `translateX(${(1 - (t >= p.at ? sp : 0)) * 30}px)`}}>
              <Avatar initials={p.initials} color={p.color} size={80} />
              <div style={{fontFamily: SANS, flex: 1}}>
                <div style={{fontWeight: 900, fontSize: 40, color: C.ink}}>{p.name}</div>
                <div style={{fontWeight: 600, fontSize: 28, color: C.muted}}>{p.role}</div>
              </div>
              {hl && <div style={{background: C.amber, borderRadius: 999, padding: '8px 18px', fontFamily: SANS, fontWeight: 900, fontSize: 26, color: C.ink}}>PEER</div>}
            </div>
          );
        })}
      </div>
      {t >= 6.84 && (
        <div style={{position: 'absolute', top: 1000, left: 110, right: 110, display: 'flex', justifyContent: 'flex-end', opacity: msg, transform: `translateY(${(1 - msg) * 30}px)`}}>
          <div style={{background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 600, fontSize: 40, lineHeight: 1.25, padding: '22px 30px', borderRadius: 34, borderBottomRightRadius: 10}}>
            Morning, Priya! How did the offsite go?
          </div>
        </div>
      )}
      {PEOPLE.map((p, i) => (
        <Sfx key={i} at={p.at} name="blip" volume={0.3} />
      ))}
      <Sfx at={6.84} name="send" volume={0.45} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move one: learn their name and use it.', start: 0.56, end: 3.38, key: 'name', se: 2.96},
          {text: 'The assistant, the chief of staff, the person who books the rooms.', start: 3.42, end: 6.8, key: 'assistant,', se: 6.63},
          {text: 'Treat them like a peer, not a receptionist.', start: 6.84, end: 9.4, key: 'peer,', se: 8.91},
        ]}
      />
    </Scene>
  );
};

/* ---------- 4. Move 2: make the job easy ---------- */
const Move2: React.FC = () => {
  const {f, fps, t} = useT();
  const cal = spring({frame: f - s(8.3), fps, config: {damping: 12}});
  return (
    <Scene bg={C.paper} dur={10.1}>
      <Watermark />
      <StepLabel n="2/3" title="Make their job easy" />
      <ChatCard name="Priya" sub="Executive assistant to Sam" initials="P" color="#7A4E8C" top={430} minHeight={520}>
        <Bubble at={2.78} out>
          <div>15 min with Sam this week?</div>
          {t >= 3.9 && <div style={{marginTop: 8, color: '#E8D5A8'}}>Agenda: Q1 pricing.</div>}
          {t >= 5.1 && <div style={{marginTop: 8, color: '#E8D5A8'}}>Tue 2pm or Thu 10am?</div>}
        </Bubble>
        <Typing from={6.9} to={7.7} />
        <Bubble at={7.75}>Thu 10am. Booked!</Bubble>
      </ChatCard>
      {t >= 8.3 && (
        <div style={{...card, top: 1010, left: 110, right: 110, padding: '18px 30px', display: 'flex', gap: 24, alignItems: 'center', borderLeft: `14px solid ${C.amber}`, opacity: cal, transform: `translateY(${(1 - cal) * -50}px)`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.muted, lineHeight: 1.1, textAlign: 'center'}}>
            THU
            <br />
            <span style={{fontSize: 40, color: C.ink}}>10:00</span>
          </div>
          <div style={{fontFamily: SANS}}>
            <div style={{fontWeight: 900, fontSize: 36, color: C.ink}}>15 min with Sam</div>
            <div style={{fontWeight: 600, fontSize: 26, color: C.muted}}>Booked by Priya</div>
          </div>
        </div>
      )}
      <Sfx at={3.9} name="blip" volume={0.3} />
      <Sfx at={5.1} name="blip" volume={0.3} />
      <Sfx at={8.3} name="pop" volume={0.45} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move two: make the job easy.', start: 0.5, end: 2.74, key: 'easy.', se: 2.63},
          {text: 'Ask for fifteen minutes, give the agenda, offer two time slots.', start: 2.78, end: 6.79, key: 'agenda,', se: 6.16},
          {text: 'Gatekeepers open doors for people who make their day simple.', start: 6.83, end: 10.1, key: 'simple.', se: 9.54},
        ]}
      />
    </Scene>
  );
};

/* ---------- 5. Move 3: never go around them ---------- */
const Door: React.FC<{closeAt: number}> = ({closeAt}) => {
  const {t} = useT();
  const c = interpolate(t, [closeAt, closeAt + 0.3], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return (
    <div style={{width: 240, height: 380, background: '#2A2A2A', borderRadius: 10, position: 'relative', overflow: 'hidden', border: '8px solid #8E6845'}}>
      <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, width: `${15 + 85 * c}%`, background: '#B98A5E'}} />
      {c > 0.95 && (
        <div style={{position: 'absolute', right: 22, top: 180, width: 26, height: 22, borderRadius: '50%', background: C.red}} />
      )}
    </div>
  );
};
const Move3: React.FC = () => {
  const {f, fps, t} = useT();
  const stamp = spring({frame: f - s(5.0), fps, config: {damping: 9, stiffness: 240}});
  const doors = spring({frame: f - s(6.04), fps, config: {damping: 14}});
  const chatFade = interpolate(t, [5.8, 6.1], [1, 0], clamp);
  return (
    <Scene bg={C.paper} dur={8.9}>
      <Watermark />
      <StepLabel n="3/3" title="Never go around them" />
      <div style={{opacity: chatFade, display: chatFade > 0 ? 'block' : 'none'}}>
        <ChatCard name="Sam" sub="VP Sales" initials="S" color={C.ink} top={430} minHeight={400}>
          <Bubble at={2.87} out>
            Hey Sam, quick one. Can I grab you today? Skipping the calendar.
          </Bubble>
          <Typing from={4.0} to={4.5} />
          <Bubble at={4.55}>Sure, come by.</Bubble>
        </ChatCard>
      </div>
      {t >= 5.0 && t < 6.1 && (
        <div style={{position: 'absolute', top: 1010, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `rotate(-6deg) scale(${1.4 - 0.4 * stamp})`, opacity: stamp}}>
          <div style={{border: `8px solid ${C.green}`, color: C.green, fontFamily: SANS, fontWeight: 900, fontSize: 64, padding: '8px 34px', borderRadius: 18, letterSpacing: 4, background: 'rgba(255,255,255,0.85)'}}>WORKS ONCE</div>
        </div>
      )}
      {t >= 6.04 && (
        <div style={{position: 'absolute', top: 600, left: 90, right: 90, display: 'flex', justifyContent: 'space-between', opacity: doors, transform: `translateY(${(1 - doors) * 40}px)`}}>
          <Door closeAt={6.7} />
          <Door closeAt={7.15} />
          <Door closeAt={7.6} />
        </div>
      )}
      <Sfx at={5.0} name="hit" volume={0.5} />
      <Sfx at={6.75} name="lock" volume={0.35} />
      <Sfx at={7.2} name="lock" volume={0.35} />
      <Sfx at={7.65} name="lock" volume={0.4} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move three: never go around them.', start: 0.53, end: 2.83, key: 'around', se: 2.39},
          {text: 'Messaging the boss directly to skip the line works once.', start: 2.87, end: 6.0, key: 'once.', se: 5.86},
          {text: 'After that, every door quietly closes.', start: 6.04, end: 8.9, key: 'closes.', se: 8.35},
        ]}
      />
    </Scene>
  );
};

/* ---------- 6. Punch line ---------- */
const Punch: React.FC = () => (
  <Scene bg={C.night} dur={5.0}>
    <Watermark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 34}}>
      <SerifLine at={0.53} size={116}>
        Titles decide who signs.
      </SerifLine>
      <SerifLine at={2.63} size={116} color={C.amber} italic>
        Gatekeepers decide who gets the meeting.
      </SerifLine>
    </AbsoluteFill>
    <Sfx at={0.53} name="pop" volume={0.3} />
    <Sfx at={2.63} name="pop" volume={0.4} />
  </Scene>
);

/* ---------- 7. End card ---------- */
const End: React.FC = () => {
  const {f, fps} = useT();
  const brand = spring({frame: f - s(3.93), fps, config: {damping: 14}});
  const qOut = interpolate(f, [s(3.65), s(3.93)], [1, 0], clamp);
  return (
    <Scene bg={C.night} dur={8.7}>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut, gap: 30}}>
        <SerifLine at={0.69} size={110}>
          {"Who's the real gatekeeper in your office?"}
        </SerifLine>
        <SerifLine at={2.67} size={64} color={C.amber} italic>
          Tell me in the comments.
        </SerifLine>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: brand, transform: `scale(${0.9 + 0.1 * brand})`}}>
        <King size={130} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: 14, color: C.white, marginTop: 36}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={3.93} name="pop" volume={0.4} />
    </Scene>
  );
};

export const Day10: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day10.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music_day10.wav')}
      volume={(f) => interpolate(f, [0, s(51.8), s(52.4), s(DAY10_DURATION)], [0.13, 0.13, 0.32, 0.32], clamp)}
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

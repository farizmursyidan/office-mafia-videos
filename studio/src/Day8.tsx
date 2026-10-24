import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, SANS, s} from './theme';
import {Bubble, Captions, ChatCard, King, Scene, SerifLine, Sfx, StepLabel, TypeClicks, TypeStep, Typing, Watermark, typedText} from './components';
import {Person} from './characters';

/* Scene timeline (seconds, global), synced to public/voice/day8.wav */
export const SCENES8 = {
  hook: [0, 7.3],
  how: [7.3, 14.2],
  move1: [14.2, 23.6],
  move2: [23.6, 34.2],
  move3: [34.2, 41.4],
  punch: [41.4, 46.3],
  end: [46.3, 54.8],
} as const;
export const DAY8_DURATION = SCENES8.end[1];

const Seq: React.FC<{k: keyof typeof SCENES8; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES8[k];
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
const MARK = {shirt: '#3F6FB5', hair: '#3A2A1E', hairStyle: 'short' as const, skin: '#E2B48C', pants: '#2B2B33'};
const DANA = {shirt: '#2F3E55', hair: '#5A3B22', hairStyle: 'bun' as const, skin: '#D9A77E', pants: '#2A2A33'};
const RAJ = {shirt: '#3F7D5C', hair: '#1E1A17', hairStyle: 'short' as const, skin: '#B88158', pants: '#2B2B33'};

const Fg: React.FC<{children: React.ReactNode; k?: number}> = ({children, k = 1.45}) => (
  <g transform={`translate(540 1180) scale(${k}) translate(-540 -1180)`}>{children}</g>
);
const fx = (x: number) => 540 + (x - 540) * 1.45;

const HallBackdrop: React.FC = () => (
  <g>
    <rect x={0} y={0} width={1080} height={1180} fill="#E7E1D7" />
    <rect x={0} y={1080} width={1080} height={100} fill="#DDD5C8" />
    <rect x={0} y={1180} width={1080} height={740} fill="#D6CCBD" />
    <rect x={0} y={1180} width={1080} height={10} fill="#C7BBA9" />
  </g>
);
/* Coffee station drawn in final-frame coordinates */
const CoffeeStation: React.FC<{x: number}> = ({x}) => (
  <g transform={`translate(${x} 0)`}>
    <rect x={-120} y={900} width={240} height={280} rx={8} fill="#B98A5E" />
    <rect x={-120} y={890} width={240} height={20} rx={6} fill="#A57A50" />
    <rect x={-70} y={700} width={140} height={190} rx={14} fill="#2E2E35" />
    <rect x={-52} y={720} width={104} height={50} rx={6} fill="#4A4A55" />
    <circle cx={-20} cy={745} r={8} fill={C.amber} />
    <circle cx={14} cy={745} r={8} fill="#7FB287" />
    <rect x={-22} y={800} width={44} height={60} rx={4} fill="#1C1C22" />
    <rect x={-14} y={830} width={28} height={30} rx={4} fill={C.white} />
  </g>
);
const SpeechBubble: React.FC<{at: number; out: number; left: number; top: number; width: number; tail: 'left' | 'right'; dark?: boolean; children: React.ReactNode}> = ({
  at,
  out,
  left,
  top,
  width,
  tail,
  dark,
  children,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (f < s(at) || f >= s(out)) return null;
  const sp = spring({frame: f - s(at), fps, config: {damping: 13, stiffness: 190}});
  const fade = interpolate(f, [s(out) - 5, s(out)], [1, 0], clamp);
  const bg = dark ? C.ink : C.white;
  return (
    <div style={{position: 'absolute', left, top, width, opacity: sp * fade, transform: `scale(${0.85 + 0.15 * sp})`, transformOrigin: tail === 'left' ? 'left bottom' : 'right bottom'}}>
      <div style={{background: bg, color: dark ? C.white : C.ink, fontFamily: SANS, fontWeight: 800, fontSize: 40, lineHeight: 1.2, padding: '22px 30px', borderRadius: 30, boxShadow: '0 16px 40px rgba(60,45,20,0.18)'}}>{children}</div>
      <div style={{position: 'absolute', bottom: -22, [tail]: 60, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: `26px solid ${bg}`}} />
    </div>
  );
};

/* ---------- 1. Hook: the decision happens in the hallway ---------- */
const Hook: React.FC = () => {
  const {f, fps, t} = useT();
  const youHl = spring({frame: f - s(5.0), fps, config: {damping: 12}});
  const danaArm = interpolate(t, [1.4, 1.7, 3.6, 3.9], [0, 55, 55, 0], clamp);
  const pulse = t >= 5.0 ? 0.5 + 0.5 * Math.sin((f - s(5.0)) / 4) : 0;
  return (
    <Scene bg={C.paper} dur={7.3} whoosh={false}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <HallBackdrop />
        {/* glass wall of the empty meeting room */}
        <g>
          <rect x={30} y={440} width={400} height={560} rx={10} fill="#CFDDE6" stroke="#B9C7D0" strokeWidth={10} />
          <rect x={30} y={700} width={400} height={8} fill="#B9C7D0" />
          <g transform="translate(230 975) scale(0.62)">
            <Person x={0} y={0} {...YOU} />
          </g>
          <rect x={100} y={905} width={260} height={16} rx={4} fill="#B98A5E" />
          <rect x={110} y={921} width={240} height={74} fill="#A57A50" />
          <rect x={30} y={440} width={400} height={560} rx={10} fill={`rgba(224,169,59,${0.25 * pulse})`} />
        </g>
        <CoffeeStation x={980} />
        <Fg>
          <Person x={640} y={1180} facing={1} armL={danaArm} {...DANA} />
          <Person x={790} y={1180} facing={-1} {...MARK} />
        </Fg>
      </svg>
      <Watermark />
      <SpeechBubble at={1.4} out={4.2} left={430} top={470} width={500} tail="left">
        {"Let's go with Mark's plan."}
      </SpeechBubble>
      {t >= 5.0 && (
        <div style={{position: 'absolute', left: 150, top: 380, opacity: youHl, transform: `scale(${youHl})`}}>
          <div style={{background: C.ink, color: C.white, fontFamily: SANS, fontWeight: 900, fontSize: 34, padding: '10px 24px', borderRadius: 999, letterSpacing: 2}}>YOU, STILL INSIDE</div>
        </div>
      )}
      <Sfx at={1.4} name="ping" volume={0.4} />
      <Sfx at={5.0} name="hit" volume={0.5} />
      <Captions
        top={1270}
        caps={[
          {text: 'The real decision in your office was made after the meeting.', start: 0.48, end: 3.95, key: 'after', se: 3.53},
          {text: "In the hallway. And you weren't there.", start: 4.02, end: 7.3, key: "weren't", se: 6.58},
        ]}
      />
    </Scene>
  );
};

/* ---------- 2. How it actually works ---------- */
const How: React.FC = () => {
  const {f, fps, t} = useT();
  const bar = spring({frame: f - s(0.4), fps, config: {damping: 15}});
  const ann = spring({frame: f - s(2.09), fps, config: {damping: 12}});
  const dec = spring({frame: f - s(4.23), fps, config: {damping: 11, stiffness: 220}});
  const seg = (label: string, flex: number, lit: number, color: string) => (
    <div style={{flex, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
      <div style={{width: '100%', height: 110, borderRadius: 20, background: lit > 0 ? color : '#2A2A2A', opacity: 0.35 + 0.65 * Math.max(lit, 0.0001), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 40, color: lit > 0.5 ? C.ink : C.white, letterSpacing: 2}}>
        {label}
      </div>
    </div>
  );
  return (
    <Scene bg={C.night} dur={6.9}>
      <Watermark dark />
      <div style={{position: 'absolute', top: 240, left: 80, right: 80, fontFamily: SANS}}>
        <div style={{fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber}}>HOW IT ACTUALLY WORKS</div>
        <div style={{fontWeight: 900, fontSize: 80, lineHeight: 1.03, color: C.white, marginTop: 14}}>Where decisions really happen</div>
      </div>
      <div style={{position: 'absolute', top: 640, left: 70, right: 70, display: 'flex', gap: 16, opacity: bar, transform: `translateY(${(1 - bar) * 40}px)`}}>
        {seg('BEFORE', 1, dec, C.amber)}
        {seg('MEETING', 1.2, t >= 2.09 ? 0.6 : 0, '#5A5A5A')}
        {seg('AFTER', 1, dec, C.amber)}
      </div>
      {t >= 2.09 && (
        <div style={{position: 'absolute', top: 790, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: ann, transform: `translateY(${(1 - ann) * 20}px)`}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 40, color: 'rgba(255,255,255,0.8)'}}>{'↑ announced'}</div>
        </div>
      )}
      {t >= 4.23 && (
        <div style={{position: 'absolute', top: 540, left: 70, right: 70, display: 'flex', justifyContent: 'space-between', opacity: dec}}>
          {['decided', 'decided'].map((d, i) => (
            <div key={i} style={{width: 280, textAlign: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 44, color: C.amber, transform: `scale(${dec})`}}>
              {d} {'↓'}
            </div>
          ))}
        </div>
      )}
      <Sfx at={2.09} name="blip" volume={0.35} />
      <Sfx at={4.23} name="hit" volume={0.5} />
      <Captions
        dark
        top={1250}
        caps={[
          {text: "Here's how it actually works.", start: 0.51, end: 2.05, key: 'actually', se: 1.44},
          {text: 'Meetings are where decisions get announced.', start: 2.09, end: 4.2, key: 'announced.', se: 3.87},
          {text: 'They get made before and after.', start: 4.23, end: 6.9, key: 'before after.', se: 5.89},
        ]}
      />
    </Scene>
  );
};

/* ---------- 3. Move 1: pre-wire ---------- */
const Move1: React.FC = () => {
  const {f, fps, t} = useT();
  const cal = spring({frame: f - s(6.97), fps, config: {damping: 12}});
  return (
    <Scene bg={C.paper} dur={9.4}>
      <Watermark />
      <StepLabel n="1/3" title="Pre-wire the decision" />
      <ChatCard name="Dana" sub="Head of Product" initials="D" color="#2F3E55" top={430} minHeight={420}>
        <Bubble at={2.42} out>
          {"Got 10 min before Thursday's meeting? Want your take on the budget idea first."}
        </Bubble>
        <Typing from={4.3} to={5.4} />
        <Bubble at={5.45}>Sure. 3pm works.</Bubble>
      </ChatCard>
      {t >= 6.97 && (
        <div style={{...card, top: 990, left: 110, right: 110, padding: '22px 30px', display: 'flex', gap: 24, alignItems: 'center', borderLeft: `14px solid ${C.amber}`, opacity: cal, transform: `translateY(${(1 - cal) * -60}px)`}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, color: C.muted, lineHeight: 1.1, textAlign: 'center'}}>
            WED
            <br />
            <span style={{fontSize: 44, color: C.ink}}>3:00</span>
          </div>
          <div style={{fontFamily: SANS}}>
            <div style={{fontWeight: 900, fontSize: 38, color: C.ink}}>1:1 with Dana</div>
            <div style={{fontWeight: 600, fontSize: 28, color: C.muted}}>Budget idea, before Thursday</div>
          </div>
        </div>
      )}
      <Sfx at={6.97} name="pop" volume={0.45} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move one: pre-wire.', start: 0.3, end: 2.38, key: 'pre-wire.', se: 1.77},
          {text: 'Before any meeting where you need a yes, talk to the decision maker alone first.', start: 2.42, end: 6.93, key: 'alone', se: 6.69},
          {text: 'Nobody likes being surprised in front of other people.', start: 6.97, end: 9.4, key: 'surprised', se: 8.82},
        ]}
      />
    </Scene>
  );
};

/* ---------- 4. Move 2: the meeting after the meeting ---------- */
const Move2: React.FC = () => {
  const {f, fps, t} = useT();
  // Mark and Raj leave to the left
  const leave = interpolate(t, [0.6, 3.0], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
  const leaving = t >= 0.6 && t < 3.0;
  // You and Dana walk to the coffee station
  const walk = interpolate(t, [3.9, 5.6], [0, 1], {...clamp, easing: Easing.inOut(Easing.quad)});
  const walking = t >= 3.9 && t < 5.6;
  const cup = t >= 5.9;
  const cupSp = spring({frame: f - s(5.9), fps, config: {damping: 12}});
  const door = interpolate(t, [0.2, 0.6], [0, 1], clamp);
  return (
    <Scene bg={C.paper} dur={10.6}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <HallBackdrop />
        {/* meeting room door */}
        <g>
          <rect x={40} y={560} width={280} height={620} rx={8} fill="#8E6845" />
          <rect x={60} y={580} width={240} height={600} fill={`rgba(40,30,20,${0.85})`} />
          <rect x={60} y={580} width={240 * (1 - 0.8 * door)} height={600} fill="#B98A5E" />
          <rect x={90} y={500} width={180} height={44} rx={8} fill={C.ink} />
          <text x={180} y={530} textAnchor="middle" fontFamily={SANS} fontWeight={800} fontSize={22} fill={C.white}>
            Q4 PLANNING
          </text>
        </g>
        <CoffeeStation x={960} />
        <Fg>
          {t < 3.1 && <Person x={260 - 420 * leave} y={1180} facing={-1} walk={leaving ? f / 3.2 : undefined} {...MARK} />}
          {t < 3.1 && <Person x={330 - 420 * leave} y={1180} facing={-1} walk={leaving ? f / 3.4 + 1 : undefined} {...RAJ} />}
          {t >= 3.6 && <Person x={240 + 340 * walk} y={1180} facing={1} walk={walking ? f / 3.2 : undefined} armL={t >= 8.4 ? 40 : 0} {...YOU} />}
          {t >= 3.6 && <Person x={330 + 360 * walk} y={1180} facing={walk >= 1 ? -1 : 1} walk={walking ? f / 3.3 + 1 : undefined} armL={cup ? 60 : 0} {...DANA} />}
        </Fg>
        {cup && (
          <g transform={`translate(${fx(690) - 95} ${975}) scale(${cupSp})`}>
            <rect x={-18} y={-40} width={36} height={44} rx={6} fill={C.white} />
            <rect x={-18} y={-30} width={36} height={10} fill={C.amber} />
          </g>
        )}
      </svg>
      <Watermark />
      <StepLabel n="2/3" title="The meeting after the meeting" />
      <SpeechBubble at={8.43} out={10.6} left={110} top={440} width={480} tail="right" dark>
        So what did you really think?
      </SpeechBubble>
      <SpeechBubble at={9.3} out={10.6} left={540} top={560} width={510} tail="left">
        Honestly? The timeline worries me.
      </SpeechBubble>
      <Sfx at={0.2} name="whoosh" volume={0.3} />
      <Sfx at={5.9} name="pop" volume={0.35} />
      <Sfx at={8.43} name="pop" volume={0.4} />
      <Sfx at={9.3} name="ping" volume={0.4} />
      <Captions
        top={1270}
        caps={[
          {text: 'Move two: stay for the meeting after the meeting.', start: 0.32, end: 3.85, key: 'after', se: 3.38},
          {text: 'Walk out with the most senior person.', start: 3.89, end: 5.68, key: 'senior', se: 5.31},
          {text: 'Grab a coffee. Ask one question:', start: 5.71, end: 8.4, key: 'coffee.', se: 7.62},
          {text: 'So what did you really think?', start: 8.43, end: 10.6, key: 'really', se: 9.71},
        ]}
      />
    </Scene>
  );
};

/* ---------- 5. Move 3: write the recap ---------- */
const RECAP = 'Recap from today: we agreed to launch the pilot in January. Owner: me. Next step: budget draft by Friday.';
const STEPS8: TypeStep[] = [{text: RECAP, from: 2.76, to: 4.7, mode: 'type'}];
const Move3: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.3), fps, config: {damping: 15}});
  const sent = t >= 5.15;
  const sentSp = spring({frame: f - s(5.15), fps, config: {damping: 12}});
  const chip = spring({frame: f - s(5.6), fps, config: {damping: 10, stiffness: 240}});
  const body = typedText(f, STEPS8);
  const caret = Math.floor(f / 15) % 2 === 0;
  const field = (label: string, value: React.ReactNode) => (
    <div style={{display: 'flex', gap: 20, padding: '16px 0', borderBottom: '2px solid #EEEAE4', fontFamily: SANS, fontSize: 32, alignItems: 'center'}}>
      <div style={{width: 120, color: C.muted, fontWeight: 600}}>{label}</div>
      <div style={{color: C.ink, fontWeight: 700}}>{value}</div>
    </div>
  );
  return (
    <Scene bg={C.paper} dur={7.2}>
      <Watermark />
      <StepLabel n="3/3" title="Write the recap" />
      <div style={{...card, top: 440, padding: '20px 40px 30px', opacity: inn, transform: `translateY(${(1 - inn) * 60}px)`}}>
        {field('To', 'Dana, Mark, Raj')}
        {field('Subject', 'Recap: Q4 planning')}
        <div style={{fontFamily: SANS, fontSize: 36, lineHeight: 1.35, color: C.ink, minHeight: 200, paddingTop: 20}}>
          {body}
          {!sent && t >= 2.7 && caret && <span>|</span>}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 20}}>
          {sent && <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.green, opacity: sentSp}}>{'✓'} Sent 10:52 AM</div>}
          <div style={{padding: '16px 38px', borderRadius: 18, background: sent ? C.green : C.ink, color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 32}}>{sent ? 'Sent' : 'Send'}</div>
        </div>
      </div>
      {t >= 5.6 && (
        <div style={{position: 'absolute', top: 1060, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${chip})`}}>
          <div style={{background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 36, padding: '12px 28px', borderRadius: 999}}>Meeting ended 10:15. Recap in 37 min.</div>
        </div>
      )}
      <TypeClicks steps={STEPS8} />
      <Sfx at={5.15} name="send" volume={0.5} />
      <Sfx at={5.6} name="hit" volume={0.45} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move three: write the recap.', start: 0.33, end: 2.72, key: 'recap.', se: 2.26},
          {text: 'Whoever writes the summary decides what was agreed.', start: 2.76, end: 5.1, key: 'decides', se: 4.7},
          {text: 'Send it within the hour.', start: 5.15, end: 7.2, key: 'hour.', se: 6.3},
        ]}
      />
    </Scene>
  );
};

/* ---------- 6. Punch line ---------- */
const Punch: React.FC = () => (
  <Scene bg={C.night} dur={4.9}>
    <Watermark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 34}}>
      <SerifLine at={0.44} size={124}>
        The meeting is the show.
      </SerifLine>
      <SerifLine at={2.22} size={124} color={C.amber} italic>
        The hallway is where the deal gets done.
      </SerifLine>
    </AbsoluteFill>
    <Sfx at={0.44} name="pop" volume={0.3} />
    <Sfx at={2.22} name="pop" volume={0.4} />
  </Scene>
);

/* ---------- 7. End card ---------- */
const End: React.FC = () => {
  const {f, fps} = useT();
  const brand = spring({frame: f - s(4.29), fps, config: {damping: 14}});
  const qOut = interpolate(f, [s(4.0), s(4.29)], [1, 0], clamp);
  return (
    <Scene bg={C.night} dur={8.5}>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut, gap: 30}}>
        <SerifLine at={0.44} size={104}>
          {"What's the biggest decision you've seen made outside a meeting?"}
        </SerifLine>
        <SerifLine at={3.13} size={64} color={C.amber} italic>
          Tell me in the comments.
        </SerifLine>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: brand, transform: `scale(${0.9 + 0.1 * brand})`}}>
        <King size={130} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: 14, color: C.white, marginTop: 36}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={4.29} name="pop" volume={0.4} />
    </Scene>
  );
};

export const Day8: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day8.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music_day8.wav')}
      volume={(f) => interpolate(f, [0, s(52.1), s(52.7), s(DAY8_DURATION)], [0.13, 0.13, 0.32, 0.32], clamp)}
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

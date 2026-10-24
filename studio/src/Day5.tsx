import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, SANS, s} from './theme';
import {Avatar, Bubble, Captions, ChatCard, King, Scene, SerifLine, Sfx, StepLabel, TypeClicks, TypeStep, Watermark, typedText} from './components';

/* Scene timeline (seconds, global), synced to public/voice/day5.wav */
export const SCENES5 = {
  hook: [0, 5.95],
  setup: [5.95, 8.45],
  sign1: [8.45, 17.9],
  sign2: [17.9, 27.85],
  sign3: [27.85, 38.5],
  fix: [38.5, 47.7],
  punch: [47.7, 52.5],
  end: [52.5, 61.8],
} as const;
export const DAY5_DURATION = SCENES5.end[1];

const Seq: React.FC<{k: keyof typeof SCENES5; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES5[k];
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

/* ---------- 1. Hook: project tracker ---------- */
const Hook: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.15), fps, config: {damping: 15}});
  const delayed = t >= 2.9;
  const owner = t >= 4.9;
  const flash = interpolate(t, [4.9, 5.1, 5.6], [0, 1, 0.35], clamp);
  const shake = t >= 2.9 && t < 3.2 ? Math.sin(f * 2.4) * 7 : 0;
  const row = (label: string, value: React.ReactNode, extra?: React.CSSProperties) => (
    <div style={{display: 'flex', alignItems: 'center', padding: '26px 0', borderTop: '2px solid #EEEAE4', fontFamily: SANS, fontSize: 38, ...extra}}>
      <div style={{width: 260, color: C.muted, fontWeight: 600}}>{label}</div>
      <div style={{flex: 1, color: C.ink, fontWeight: 700}}>{value}</div>
    </div>
  );
  return (
    <Scene bg={C.paper} dur={5.95} whoosh={false}>
      <Watermark />
      <div style={{...card, top: 330, padding: '36px 44px', opacity: inn, transform: `translateY(${(1 - inn) * 60}px) translateX(${shake}px)`}}>
        <div style={{fontFamily: SANS, fontSize: 28, fontWeight: 800, letterSpacing: 3, color: C.muted}}>PROJECT TRACKER</div>
        <div style={{fontFamily: SANS, fontSize: 64, fontWeight: 900, color: C.ink, margin: '8px 0 20px'}}>Project Atlas</div>
        {row(
          'Status',
          <span style={{padding: '8px 22px', borderRadius: 14, fontWeight: 900, background: delayed ? '#F6DCDA' : '#DDEFE3', color: delayed ? C.red : C.green}}>
            {delayed ? 'DELAYED' : 'On track'}
          </span>,
        )}
        {row('Deadline', 'Nov 30')}
        {row(
          'Owner',
          <div>
            <span style={{padding: '6px 16px', borderRadius: 12, background: owner ? `rgba(224,169,59,${0.3 + 0.5 * flash})` : 'transparent', fontWeight: 900}}>{owner ? 'You' : 'Team'}</span>
            {owner && <div style={{fontSize: 28, fontWeight: 600, color: C.muted, marginTop: 10}}>edited 6 weeks ago</div>}
          </div>,
        )}
      </div>
      <Sfx at={2.9} name="blip" volume={0.5} />
      <Sfx at={4.9} name="hit" volume={0.65} />
      <Captions
        top={1190}
        caps={[
          {text: 'Nobody becomes the scapegoat on the day the project fails.', start: 0.27, end: 4.0, key: 'scapegoat', se: 3.56},
          {text: 'You get picked weeks before.', start: 4.04, end: 5.95, key: 'weeks', se: 5.37},
        ]}
      />
    </Scene>
  );
};

/* ---------- 2. Setup card ---------- */
const Setup: React.FC = () => {
  const {f, fps} = useT();
  const sp = spring({frame: f - s(0.3), fps, config: {damping: 14}});
  return (
    <Scene bg={C.night} dur={2.5}>
      <Watermark dark />
      <AbsoluteFill style={{justifyContent: 'flex-start', padding: '400px 90px 0', transform: `scale(${0.92 + 0.08 * sp})`, opacity: sp}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 210, color: C.amber, lineHeight: 1}}>3 signs</div>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 96, color: C.white, lineHeight: 1.05, marginTop: 10}}>you're being set up</div>
        <div style={{display: 'flex', gap: 22, marginTop: 50}}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{width: 44, height: 44, borderRadius: '50%', border: `5px solid ${C.amber}`}} />
          ))}
        </div>
      </AbsoluteFill>
      <Captions dark top={1250} caps={[{text: "Here are three signs it's happening to you.", start: 0.46, end: 2.5, key: 'three', se: 2.16}]} />
    </Scene>
  );
};

/* ---------- 3. Sign 1: responsibility without authority ---------- */
const Sign1: React.FC = () => {
  const {f, fps, t} = useT();
  const resp = interpolate(t, [0.9, 3.0], [0.2, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const auth = interpolate(t, [0.9, 3.0, 3.6, 4.4], [0.2, 0.24, 0.24, 0.16], clamp);
  const phaseA = interpolate(t, [4.6, 4.95], [1, 0], clamp);
  const phaseB = interpolate(t, [4.75, 5.1], [0, 1], clamp);
  const bar = (label: string, v: number, color: string, at: number) => {
    const sp = spring({frame: f - s(at), fps, config: {damping: 15}});
    return (
      <div style={{opacity: sp, marginBottom: 50}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 42, color: C.ink, marginBottom: 16}}>{label}</div>
        <div style={{height: 70, borderRadius: 20, background: '#E2DBD0', overflow: 'hidden'}}>
          <div style={{height: '100%', width: `${v * 100}%`, background: color, borderRadius: 20}} />
        </div>
      </div>
    );
  };
  const rows = [
    {label: 'Choose the team', at: 6.35},
    {label: 'Set the budget', at: 7.43},
    {label: 'Move the deadline', at: 8.03},
  ];
  return (
    <Scene bg={C.paper} dur={9.45}>
      <Watermark />
      <StepLabel n="1/3" title="Responsibility, no authority" />
      <div style={{position: 'absolute', top: 540, left: 90, right: 90, opacity: phaseA}}>
        {bar('Responsibility', resp, C.amber, 0.6)}
        {bar('Authority', auth, C.muted, 2.4)}
      </div>
      <div style={{...card, top: 500, padding: '30px 40px', opacity: phaseB}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted, marginBottom: 10}}>YOUR ROLE ON PROJECT ATLAS</div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0', fontFamily: SANS, fontSize: 40, fontWeight: 800, color: C.ink}}>
          Accountable for outcome
          <span style={{color: C.green, fontSize: 52}}>{'✓'}</span>
        </div>
        {rows.map((r) => {
          const on = t >= r.at;
          const sp = spring({frame: f - s(r.at), fps, config: {damping: 10, stiffness: 240}});
          return (
            <div key={r.label} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0', borderTop: '2px solid #EEEAE4', fontFamily: SANS, fontSize: 40, fontWeight: 700, color: on ? C.ink : '#B9B2A7'}}>
              {r.label}
              <span style={{color: C.red, fontSize: 56, fontWeight: 900, transform: `scale(${on ? sp : 0})`, display: 'inline-block'}}>{'✕'}</span>
            </div>
          );
        })}
      </div>
      <Sfx at={4.85} name="pop" volume={0.4} />
      {rows.map((r) => (
        <Sfx key={r.label} at={r.at} name="blip" volume={0.35} />
      ))}
      <Captions
        top={1250}
        caps={[
          {text: "Sign one: your responsibility grows, but your authority doesn't.", start: 0.22, end: 4.84, key: 'authority', se: 4.41},
          {text: "You own the outcome, but you can't choose the team, the budget, or the deadline.", start: 4.85, end: 9.45, key: "can't", se: 8.68},
        ]}
      />
    </Scene>
  );
};

/* ---------- 4. Sign 2: nothing in writing ---------- */
const Sign2: React.FC = () => {
  const {f, fps, t} = useT();
  const banner = spring({frame: f - s(6.6), fps, config: {damping: 14}});
  const stamp = spring({frame: f - s(9.1), fps, config: {damping: 9, stiffness: 260}});
  const ringPulse = 1 + 0.03 * Math.sin(f / 2);
  return (
    <Scene bg={C.paper} dur={9.95}>
      <Watermark />
      <StepLabel n="2/3" title="Nothing in writing" />
      <ChatCard name="Vera" sub="Director" initials="V" color="#9B4F7A" top={480} minHeight={480}>
        <Bubble at={4.05}>just handle it</Bubble>
        <Bubble at={5.42}>no need to put it in the deck</Bubble>
      </ChatCard>
      {t >= 6.6 && (
        <div
          style={{
            position: 'absolute',
            top: 1000,
            left: 90,
            right: 90,
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            background: C.ink,
            borderRadius: 30,
            padding: '24px 30px',
            transform: `translateY(${(1 - banner) * 120}px) scale(${ringPulse})`,
            opacity: banner,
            boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
          }}
        >
          <Avatar initials="V" color="#9B4F7A" size={70} />
          <div style={{flex: 1, fontFamily: SANS, color: C.white}}>
            <div style={{fontWeight: 800, fontSize: 36}}>Vera is calling...</div>
            <div style={{fontWeight: 500, fontSize: 28, opacity: 0.7}}>Voice call</div>
          </div>
          <div style={{width: 70, height: 70, borderRadius: '50%', background: C.green}} />
        </div>
      )}
      {t >= 9.1 && (
        <div style={{position: 'absolute', top: 640, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
          <div
            style={{
              border: `10px solid ${C.red}`,
              color: C.red,
              fontFamily: SANS,
              fontWeight: 900,
              fontSize: 110,
              letterSpacing: 6,
              padding: '10px 40px',
              borderRadius: 20,
              transform: `rotate(-10deg) scale(${2.2 - 1.2 * stamp})`,
              opacity: Math.min(1, stamp * 1.5),
              background: 'rgba(237,232,224,0.85)',
            }}
          >
            NO RECORD
          </div>
        </div>
      )}
      <Sfx at={6.6} name="ring" volume={0.45} />
      <Sfx at={9.1} name="hit" volume={0.6} />
      <Captions
        top={1180}
        caps={[
          {text: 'Sign two: instructions stop coming in writing.', start: 0.45, end: 3.6, key: 'writing.', se: 3.49},
          {text: 'Just handle it. No need to put it in the deck.', start: 4.05, end: 7.0, key: 'deck.', se: 6.4},
          {text: "Ask yourself why they don't want a record.", start: 7.04, end: 9.95, key: 'record.', se: 9.51},
        ]}
      />
    </Scene>
  );
};

/* ---------- 5. Sign 3: the pronouns ---------- */
const MSGS = [
  {week: 'Week 1', before: "Great kickoff! Let's make ", word: 'our', after: ' project a win.', color: C.green, bg: '#DDEFE3', at: 3.43},
  {week: 'Week 6', before: "How's ", word: 'your', after: ' project going?', color: '#B07D1E', bg: 'rgba(224,169,59,0.35)', at: 5.79},
  {week: 'Week 10', before: "That's ", word: 'your call', after: ', not mine.', color: C.red, bg: '#F6DCDA', at: 7.89},
];
const Sign3: React.FC = () => {
  const {f, fps} = useT();
  return (
    <Scene bg={C.paper} dur={10.65}>
      <Watermark />
      <StepLabel n="3/3" title="The pronouns change" />
      {MSGS.map((m, i) => {
        const sp = spring({frame: f - s(m.at), fps, config: {damping: 14}});
        const hl = spring({frame: f - s(m.at + 0.6), fps, config: {damping: 18}});
        if (f < s(m.at)) return null;
        return (
          <div key={m.week} style={{...card, top: 480 + i * 215, padding: '26px 34px', display: 'flex', gap: 26, alignItems: 'center', opacity: sp, transform: `translateX(${(1 - sp) * -80}px)`}}>
            <div style={{width: 150, fontFamily: SANS, fontWeight: 900, fontSize: 32, color: C.muted, flexShrink: 0}}>{m.week}</div>
            <div style={{fontFamily: SANS, fontWeight: 500, fontSize: 40, lineHeight: 1.25, color: C.ink}}>
              {m.before}
              <span style={{background: `linear-gradient(transparent 0%, ${m.bg} 0%)`, backgroundSize: `${hl * 100}% 100%`, backgroundRepeat: 'no-repeat', color: m.color, fontWeight: 900, padding: '0 6px', borderRadius: 8}}>{m.word}</span>
              {m.after}
            </div>
            <Sfx at={m.at} name="ping" volume={0.45} />
          </div>
        );
      })}
      <Captions
        top={1250}
        caps={[
          {text: 'Sign three: listen to the pronouns.', start: 0.35, end: 3.4, key: 'pronouns.', se: 2.76},
          {text: "Week one, it's our project.", start: 3.43, end: 5.75, key: 'our', se: 5.27},
          {text: "Week six, it's your project.", start: 5.79, end: 7.85, key: 'your', se: 7.61},
          {text: "Week ten, it's your call.", start: 7.89, end: 10.65, key: 'call.', se: 9.51},
        ]}
      />
    </Scene>
  );
};

/* ---------- 6. The fix: the follow-up email ---------- */
const EMAIL = "Following up on our chat, my understanding is: I'll deliver phase 1 by Nov 30 with the current team. Let me know if that's wrong.";
const STEPS5: TypeStep[] = [{text: EMAIL, from: 4.37, to: 8.9, mode: 'type'}];
const Fix: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.3), fps, config: {damping: 15}});
  const sent = t >= 9.0;
  const sentSp = spring({frame: f - s(9.0), fps, config: {damping: 12}});
  const body = typedText(f, STEPS5);
  const caret = Math.floor(f / 15) % 2 === 0;
  const field = (label: string, value: string) => (
    <div style={{display: 'flex', gap: 20, padding: '18px 0', borderBottom: '2px solid #EEEAE4', fontFamily: SANS, fontSize: 32}}>
      <div style={{width: 110, color: C.muted, fontWeight: 600}}>{label}</div>
      <div style={{color: C.ink, fontWeight: 700}}>{value}</div>
    </div>
  );
  return (
    <Scene bg={C.paper} dur={9.2}>
      <Watermark />
      <div style={{position: 'absolute', top: 210, left: 72, fontFamily: SANS, fontWeight: 900, fontSize: 70, color: C.ink}}>The boring fix</div>
      <div style={{...card, top: 360, padding: '24px 40px 36px', opacity: inn, transform: `translateY(${(1 - inn) * 60}px)`}}>
        {field('To', 'Vera')}
        {field('Subject', 'Re: Project Atlas')}
        <div style={{fontFamily: SANS, fontSize: 40, lineHeight: 1.35, color: C.ink, minHeight: 330, paddingTop: 22}}>
          {body}
          {!sent && t >= 4.3 && caret && <span>|</span>}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 20}}>
          {sent && (
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.green, opacity: sentSp}}>
              {'✓'} Sent 4:12 PM
            </div>
          )}
          <div style={{padding: '18px 40px', borderRadius: 18, background: sent ? C.green : C.ink, color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 34, transform: `scale(${sent ? 0.95 + 0.05 * sentSp : 1})`}}>
            {sent ? 'Sent' : 'Send'}
          </div>
        </div>
      </div>
      <TypeClicks steps={STEPS5} />
      <Sfx at={9.0} name="send" volume={0.5} />
      <Captions
        top={1250}
        caps={[
          {text: 'The fix is boring.', start: 0.56, end: 2.2, key: 'boring.', se: 1.68},
          {text: 'After every call, send one line:', start: 2.22, end: 4.35, key: 'line:', se: 3.88},
          {text: "following up on our chat, my understanding is this. Let me know if that's wrong.", start: 4.37, end: 9.2, key: 'understanding', se: 8.9},
        ]}
      />
    </Scene>
  );
};

/* ---------- 7. Punch line ---------- */
const Punch: React.FC = () => (
  <Scene bg={C.night} dur={4.8}>
    <Watermark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 34}}>
      <SerifLine at={0.2} size={120}>
        Nobody can argue with a calm email.
      </SerifLine>
      <SerifLine at={2.78} size={120} color={C.amber} italic>
        And everybody knows what it does.
      </SerifLine>
    </AbsoluteFill>
    <Sfx at={0.2} name="pop" volume={0.3} />
    <Sfx at={2.78} name="pop" volume={0.4} />
  </Scene>
);

/* ---------- 8. End card ---------- */
const End: React.FC = () => {
  const {f, fps} = useT();
  const brand = spring({frame: f - s(5.5), fps, config: {damping: 14}});
  const qOut = interpolate(f, [s(5.2), s(5.5)], [1, 0], clamp);
  return (
    <Scene bg={C.night} dur={9.3}>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut, gap: 30}}>
        <SerifLine at={0.37} size={112}>
          Have you ever been set up like this?
        </SerifLine>
        <SerifLine at={2.43} size={84} color="rgba(255,255,255,0.8)">
          Which sign showed up first?
        </SerifLine>
        <SerifLine at={4.31} size={64} color={C.amber} italic>
          Tell me in the comments.
        </SerifLine>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: brand, transform: `scale(${0.9 + 0.1 * brand})`}}>
        <King size={130} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: 14, color: C.white, marginTop: 36}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={5.5} name="pop" volume={0.4} />
    </Scene>
  );
};

export const Day5: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day5.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music_day5.wav')}
      volume={(f) => interpolate(f, [0, s(59.5), s(60.1), s(DAY5_DURATION)], [0.13, 0.13, 0.32, 0.32], clamp)}
    />
    <Seq k="hook"><Hook /></Seq>
    <Seq k="setup"><Setup /></Seq>
    <Seq k="sign1"><Sign1 /></Seq>
    <Seq k="sign2"><Sign2 /></Seq>
    <Seq k="sign3"><Sign3 /></Seq>
    <Seq k="fix"><Fix /></Seq>
    <Seq k="punch"><Punch /></Seq>
    <Seq k="end"><End /></Seq>
  </AbsoluteFill>
);

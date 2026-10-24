import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, SANS, SERIF, s} from './theme';
import {
  Bubble,
  Captions,
  ChatCard,
  King,
  Notif,
  Padlock,
  Scene,
  SerifLine,
  Sfx,
  StepLabel,
  TypeClicks,
  TypeStep,
  Typing,
  Watermark,
  typedText,
} from './components';

/* Scene timeline (seconds, global) */
export const SCENES = {
  hook: [0, 3.05],
  notifs: [3.05, 8.2],
  punch: [8.2, 12.45],
  orgchart: [12.45, 24.95],
  sideways: [24.95, 35.2],
  vault: [35.2, 42.1],
  coffee: [42.1, 46.2],
  end: [46.2, 54.4],
} as const;
export const DAY3_DURATION = SCENES.end[1];

const Seq: React.FC<{k: keyof typeof SCENES; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES[k];
  return (
    <Sequence from={s(a)} durationInFrames={s(b - a)}>
      {children}
    </Sequence>
  );
};

/* ---------- 1. Hook ---------- */
const Hook: React.FC = () => (
  <Scene bg={C.paper} dur={3.05} whoosh={false}>
    <Watermark />
    <ChatCard name="Dana" sub="Marketing" initials="D" color="#C2693E" top={300} minHeight={640}>
      <Bubble at={0.15}>heard Mark is leaving</Bubble>
      <Bubble at={0.7}>last day is friday. don't say anything yet</Bubble>
      <Typing from={1.15} to={1.75} out />
      <Bubble at={1.75} out>
        wait. how do you ALWAYS know this stuff??
      </Bubble>
    </ChatCard>
    <Captions caps={[{text: 'Some people at work always know things first.', start: 0.23, end: 3.05, key: 'first.', se: 2.84}]} />
  </Scene>
);

/* ---------- 2. Notifications ---------- */
const Notifs: React.FC = () => (
  <Scene bg={C.night} dur={5.15}>
    <Watermark dark />
    <div style={{position: 'absolute', top: 200, width: '100%', textAlign: 'center', fontFamily: SANS, fontWeight: 300, fontSize: 150, color: 'rgba(255,255,255,0.92)'}}>
      9:41
    </div>
    <Notif at={0.15} index={0} app="Team chat" title="Dana" body="Mark's farewell lunch is Friday" color="#C2693E" letter="D" />
    <Notif at={0.87} index={1} app="Finance" title="Q4 budgets revised" body="Marketing: -20% effective now" color="#3F7D5C" letter="F" />
    <Notif at={2.3} index={2} app="Projects" title="Project Atlas" body="Status changed to: On hold" color="#5163B8" letter="P" />
    <Captions
      dark
      top={1200}
      caps={[
        {text: "Who's leaving.", start: 0.15, end: 0.86, key: 'leaving.', se: 0.59},
        {text: 'Which budget got cut.', start: 0.87, end: 2.29, key: 'cut.', se: 1.68},
        {text: 'Which project is quietly dead.', start: 2.3, end: 5.15, key: 'dead.', se: 4.81},
      ]}
    />
  </Scene>
);

/* ---------- 3. Typographic punch ---------- */
const Punch: React.FC = () => (
  <Scene bg={C.night} dur={4.25}>
    <Watermark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 20}}>
      <SerifLine at={0.25}>They're not lucky.</SerifLine>
      <SerifLine at={1.3}>They built a network.</SerifLine>
      <SerifLine at={2.72} color={C.amber} italic size={150}>
        On purpose.
      </SerifLine>
    </AbsoluteFill>
    <Sfx at={0.25} name="pop" volume={0.3} />
    <Sfx at={1.3} name="pop" volume={0.3} />
    <Sfx at={2.72} name="pop" volume={0.4} />
  </Scene>
);

/* ---------- 4. Org chart vs real map ---------- */
type Node = {id: string; label: string; x: number; y: number; formal?: boolean; w?: number};
const NODES: Node[] = [
  {id: 'ceo', label: 'CEO', x: 540, y: 520, formal: true},
  {id: 'dir', label: 'Director', x: 540, y: 670, formal: true},
  {id: 'mgr', label: 'Manager', x: 540, y: 820, formal: true},
  {id: 'you', label: 'You', x: 540, y: 975, formal: true},
  {id: 'ea', label: 'Exec Assistant', x: 230, y: 610, w: 330},
  {id: 'fin', label: 'Finance Analyst', x: 850, y: 745, w: 340},
  {id: 'vet', label: '12-year Veteran', x: 235, y: 880, w: 340},
];

const OrgChart: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const fadeFormal = interpolate(t, [2.6, 3.4], [1, 0.28], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pulseId = t >= 2.98 && t < 5.97 ? 'ea' : t >= 5.97 && t < 8.86 ? 'fin' : t >= 8.86 ? 'all' : null;
  const you = NODES.find((n) => n.id === 'you')!;
  const side = NODES.filter((n) => !n.formal);

  return (
    <Scene bg={C.paper} dur={12.5}>
      <Watermark />
      <StepLabel n="1/3" title="Forget the org chart" />
      <svg width={1080} height={1920} style={{position: 'absolute', top: 0, left: 0}}>
        {/* formal lines */}
        {['ceo', 'dir', 'mgr'].map((id, i) => {
          const a = NODES.find((n) => n.id === id)!;
          const b = NODES[i + 1];
          const draw = interpolate(t, [0.3 + i * 0.25, 0.6 + i * 0.25], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <line
              key={id}
              x1={a.x}
              y1={a.y + 40}
              x2={a.x}
              y2={a.y + 40 + (b.y - a.y - 80) * draw}
              stroke={C.ink}
              strokeWidth={5}
              opacity={fadeFormal}
            />
          );
        })}
        {/* real information lines */}
        {side.map((n, i) => {
          const start = 3.0 + i * 0.35;
          const draw = interpolate(t, [start, start + 0.6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
          const mx = (you.x + n.x) / 2 + (n.x < 540 ? -60 : 60);
          const my = (you.y + n.y) / 2 + 40;
          const d = `M${you.x} ${you.y} Q${mx} ${my} ${n.x} ${n.y}`;
          const len = 700;
          const travel = ((t * 0.55 + i * 0.33) % 1);
          const pt = (u: number) => {
            const x = (1 - u) * (1 - u) * you.x + 2 * (1 - u) * u * mx + u * u * n.x;
            const y = (1 - u) * (1 - u) * you.y + 2 * (1 - u) * u * my + u * u * n.y;
            return {x, y};
          };
          const dot = pt(1 - travel);
          return (
            <g key={n.id}>
              <path d={d} fill="none" stroke={C.amber} strokeWidth={8} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
              {draw >= 1 && <circle cx={dot.x} cy={dot.y} r={11} fill={C.ink} />}
            </g>
          );
        })}
      </svg>
      {NODES.map((n, i) => {
        const appearAt = n.formal ? 0.2 + i * 0.25 : 3.0 + (i - 4) * 0.35;
        const sp = spring({frame: f - s(appearAt), fps, config: {damping: 13}});
        const isPulse = !n.formal && (pulseId === n.id || pulseId === 'all');
        const pulse = isPulse ? 1 + 0.06 * Math.sin(f / 4) : 1;
        const isYou = n.id === 'you';
        const w = n.w ?? (isYou ? 220 : 260);
        return (
          <div
            key={n.id}
            style={{
              position: 'absolute',
              left: n.x - w / 2,
              top: n.y - 42,
              width: w,
              height: 84,
              borderRadius: 22,
              background: isYou ? C.ink : n.formal ? C.white : C.amber,
              color: isYou ? C.white : C.ink,
              border: n.formal && !isYou ? `3px solid ${C.ink}` : 'none',
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: sp * (n.formal && !isYou ? fadeFormal : 1),
              transform: `scale(${(0.7 + 0.3 * sp) * pulse})`,
              boxShadow: !n.formal ? '0 14px 30px rgba(224,169,59,0.45)' : 'none',
            }}
          >
            {n.label}
          </div>
        );
      })}
      {side.map((n, i) => (
        <Sfx key={n.id} at={3.0 + i * 0.35} name="pop" volume={0.35} />
      ))}
      <Captions
        top={1180}
        caps={[
          {text: 'Step one: forget the org chart.', start: 0.2, end: 2.97, key: 'forget', se: 2.4},
          {text: 'The executive assistant knows more than most directors.', start: 2.98, end: 5.96, key: 'assistant', se: 5.69},
          {text: 'Finance sees the reorg before the team does.', start: 5.97, end: 8.85, key: 'finance', se: 8.6},
          {text: "Information doesn't flow down. It flows sideways.", start: 8.86, end: 12.5, key: 'sideways.', se: 11.96},
        ]}
      />
    </Scene>
  );
};

/* ---------- 5. Ask sideways ---------- */
const STEPS: TypeStep[] = [
  {text: 'is there a layoff coming?', from: 0.4, to: 1.9, mode: 'type'},
  {text: 'is there a layoff coming?', from: 2.5, to: 3.05, mode: 'delete'},
  {text: 'hey, are we still hiring for the analyst role?', from: 3.25, to: 4.9, mode: 'type'},
];

const Sideways: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const sent = t >= 5.1;
  const draft = sent ? '' : typedText(f, STEPS);
  const tooDirect = t >= 1.95 && t < 3.1;
  const caret = Math.floor(f / 15) % 2 === 0;
  const hl = interpolate(t, [7.7, 8.2], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const footer = (
    <div style={{padding: '0 30px 30px'}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          background: '#F4F1EC',
          borderRadius: 999,
          padding: '22px 30px',
          border: tooDirect ? `4px solid ${C.red}` : '4px solid transparent',
        }}
      >
        <div style={{flex: 1, fontFamily: SANS, fontSize: 40, color: draft ? C.ink : C.muted, fontWeight: 500, minHeight: 50}}>
          {draft || 'Message Jess'}
          {!sent && draft && caret && <span style={{color: C.ink}}>|</span>}
        </div>
        <div style={{width: 64, height: 64, borderRadius: '50%', background: draft ? C.ink : '#CFC9C0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="30" height="30" viewBox="0 0 24 24"><path d="M3 12 L21 3 L14 21 L11 13 Z" fill="#fff" /></svg>
        </div>
      </div>
    </div>
  );

  return (
    <Scene bg={C.paper} dur={10.25}>
      <Watermark />
      <StepLabel n="2/3" title="Ask sideways" />
      <ChatCard name="Jess" sub="Talent team" initials="J" color="#5163B8" top={470} minHeight={560} footer={footer}>
        {tooDirect && (
          <div style={{alignSelf: 'center', fontFamily: SANS, fontWeight: 900, fontSize: 40, color: C.red, letterSpacing: 2, marginTop: 120}}>
            TOO DIRECT
          </div>
        )}
        <Bubble at={5.1} out>
          hey, are we still hiring for the analyst role?
        </Bubble>
        <Typing from={5.5} to={6.7} />
        <Bubble at={6.7}>
          honestly?{' '}
          <span style={{background: `linear-gradient(transparent 55%, rgba(224,169,59,${0.75 * hl}) 55%)`}}>everything's frozen until Q2</span>
        </Bubble>
      </ChatCard>
      <TypeClicks steps={STEPS} />
      <Sfx at={1.95} name="pop" volume={0.3} />
      <Captions
        top={1250}
        caps={[
          {text: 'Step two: ask sideways.', start: 0.28, end: 2.7, key: 'sideways.', se: 2.32},
          {text: 'Direct questions get defensive answers.', start: 2.71, end: 5.09, key: 'defensive', se: 5.0},
          {text: 'Sideways questions get honest ones.', start: 5.1, end: 7.7, key: 'honest', se: 7.1},
          {text: 'That one reply told you everything.', start: 7.72, end: 10.25, key: 'everything.', se: 9.76},
        ]}
      />
    </Scene>
  );
};

/* ---------- 6. Be a vault ---------- */
const Vault: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const lockIn = spring({frame: f - s(2.5), fps, config: {damping: 12, stiffness: 160}});
  const closed = interpolate(t, [4.45, 4.7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad)});
  const dim = interpolate(t, [2.5, 3.0], [1, 0.25], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bar = (w: number) => <span style={{display: 'inline-block', width: w, height: 30, background: '#555', borderRadius: 8, marginRight: 12, verticalAlign: 'middle'}} />;
  return (
    <Scene bg={C.night} dur={6.9}>
      <Watermark dark />
      <StepLabel n="3/3" title="Be a vault" dark />
      <div style={{opacity: dim}}>
        <ChatCard name="Priya" sub="Finance" initials="P" color="#3F7D5C" top={470} dark minHeight={520}>
          <Bubble at={0.35} dark>
            ok this stays between us, but...
          </Bubble>
          <Bubble at={1.2} dark>
            {bar(220)}
            {bar(140)}
            {bar(260)}
            <br />
            {bar(180)}
            {bar(300)}
          </Bubble>
        </ChatCard>
      </div>
      {t >= 2.5 && (
        <div style={{position: 'absolute', top: 520, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${0.6 + 0.4 * lockIn})`, opacity: lockIn}}>
          <Padlock closed={closed} />
        </div>
      )}
      <Sfx at={4.6} name="lock" volume={0.6} />
      <Captions
        dark
        top={1230}
        caps={[
          {text: 'Step three: be a vault.', start: 0.28, end: 2.55, key: 'vault.', se: 2.08},
          {text: 'Repeat one secret, and every door closes.', start: 2.56, end: 5.55, key: 'closes.', se: 5.14},
          {text: 'Quietly.', start: 5.57, end: 6.9, key: 'quietly.', se: 6.28},
        ]}
      />
    </Scene>
  );
};

/* ---------- 7. Coffee invite ---------- */
const Coffee: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = f / fps;
  const sp = spring({frame: f - s(0.2), fps, config: {damping: 14}});
  const accepted = t >= 2.95;
  const press = accepted ? spring({frame: f - s(2.95), fps, config: {damping: 10, stiffness: 260}}) : 0;
  const row = (label: string, value: string) => (
    <div style={{display: 'flex', gap: 24, fontFamily: SANS, fontSize: 38, marginTop: 18}}>
      <div style={{width: 170, color: C.muted, fontWeight: 600}}>{label}</div>
      <div style={{color: C.ink, fontWeight: 700}}>{value}</div>
    </div>
  );
  return (
    <Scene bg={C.paper} dur={4.1}>
      <Watermark />
      <div
        style={{
          position: 'absolute',
          top: 380,
          left: 70,
          right: 70,
          background: C.white,
          borderRadius: 40,
          boxShadow: '0 30px 70px rgba(60,45,20,0.18)',
          padding: '44px 48px',
          transform: `translateY(${(1 - sp) * 80}px)`,
          opacity: sp,
          borderLeft: `16px solid ${C.amber}`,
        }}
      >
        <div style={{fontFamily: SANS, fontSize: 28, fontWeight: 800, letterSpacing: 4, color: C.muted}}>INVITATION</div>
        <div style={{fontFamily: SANS, fontSize: 66, fontWeight: 900, color: C.ink, marginTop: 10}}>Coffee</div>
        {row('With', 'Priya, Finance')}
        {row('When', 'Thu, 10:00  ·  20 min')}
        {row('Agenda', 'None')}
        <div style={{display: 'flex', gap: 20, marginTop: 40}}>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '24px 0',
              borderRadius: 22,
              background: accepted ? C.green : C.ink,
              color: C.white,
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: 38,
              transform: `scale(${accepted ? 0.94 + 0.06 * press : 1})`,
            }}
          >
            {accepted ? 'Accepted  ✓' : 'Accept'}
          </div>
          <div style={{flex: 1, textAlign: 'center', padding: '24px 0', borderRadius: 22, background: '#F1EEE9', color: C.muted, fontFamily: SANS, fontWeight: 800, fontSize: 38}}>
            Decline
          </div>
        </div>
      </div>
      <Sfx at={2.95} name="send" volume={0.45} />
      <Captions
        top={1180}
        caps={[
          {text: 'This week: one coffee outside your team.', start: 0.34, end: 2.92, key: 'coffee', se: 2.54},
          {text: 'No agenda.', start: 2.93, end: 4.1, key: 'agenda.', se: 3.51},
        ]}
      />
    </Scene>
  );
};

/* ---------- 8. End card ---------- */
const End: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const brand = spring({frame: f - s(4.4), fps, config: {damping: 14}});
  const qOut = interpolate(f, [s(4.1), s(4.4)], [1, 0.0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Scene bg={C.night} dur={8.2}>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut}}>
        <SerifLine at={0.15} size={104}>
          Who's the person in your office who always knows first?
        </SerifLine>
        <div style={{marginTop: 40}}>
          <SerifLine at={3.2} size={64} color={C.amber} italic>
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
      <Sfx at={4.4} name="pop" volume={0.4} />
    </Scene>
  );
};

export const Day3: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day3.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music.wav')}
      volume={(f) =>
        interpolate(f, [0, s(52.3), s(52.9), s(DAY3_DURATION)], [0.13, 0.13, 0.32, 0.32], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
      }
    />
    <Seq k="hook"><Hook /></Seq>
    <Seq k="notifs"><Notifs /></Seq>
    <Seq k="punch"><Punch /></Seq>
    <Seq k="orgchart"><OrgChart /></Seq>
    <Seq k="sideways"><Sideways /></Seq>
    <Seq k="vault"><Vault /></Seq>
    <Seq k="coffee"><Coffee /></Seq>
    <Seq k="end"><End /></Seq>
  </AbsoluteFill>
);

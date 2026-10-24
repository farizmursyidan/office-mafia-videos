import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {C, SANS, s} from './theme';
import {Captions, King, Scene, SerifLine, Sfx, StepLabel, TypeClicks, TypeStep, Watermark, typedText} from './components';
import {Person} from './characters';

/* Scene timeline (seconds, global), synced to public/voice/day7.wav */
export const SCENES7 = {
  hook: [0, 6.1],
  rule: [6.1, 15.4],
  move1: [15.4, 24.5],
  move2: [24.5, 35.9],
  move3: [35.9, 45.5],
  punch: [45.5, 50.9],
  end: [50.9, 59.5],
} as const;
export const DAY7_DURATION = SCENES7.end[1];

const Seq: React.FC<{k: keyof typeof SCENES7; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES7[k];
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
const DANA = {shirt: '#2F3E55', hair: '#5A3B22', hairStyle: 'bun' as const, skin: '#D9A77E'};

/* Foreground scaler: characters grow upward from the floor line */
const Fg: React.FC<{children: React.ReactNode; k?: number}> = ({children, k = 1.45}) => (
  <g transform={`translate(540 1180) scale(${k}) translate(-540 -1180)`}>{children}</g>
);
const Table: React.FC<{x: number; w: number; children?: React.ReactNode}> = ({x, w, children}) => (
  <g transform={`translate(${x} 1036)`}>
    {children}
    <rect x={-w / 2} y={-14} width={w} height={22} rx={6} fill="#B98A5E" />
    <rect x={-w / 2 + 12} y={8} width={w - 24} height={150} fill="#A57A50" />
    <rect x={-w / 2 + 12} y={8} width={w - 24} height={10} fill="rgba(0,0,0,0.12)" />
  </g>
);
const RoomBackdrop: React.FC = () => (
  <g>
    <rect x={0} y={0} width={1080} height={1180} fill="#E7E1D7" />
    <rect x={0} y={1180} width={1080} height={740} fill="#D6CCBD" />
    <rect x={0} y={1180} width={1080} height={10} fill="#C7BBA9" />
  </g>
);
/* Wall screen with a chart and a credit footer */
const Screen: React.FC<{x: number; y: number; w: number; h: number; footer: string; footerHl?: number; grow?: number}> = ({x, y, w, h, footer, footerHl = 0, grow = 1}) => {
  const bars = [0.35, 0.5, 0.42, 0.68, 0.86];
  const chartH = h - 120;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-10} y={-10} width={w + 20} height={h + 20} rx={14} fill="#24242B" />
      <rect x={0} y={0} width={w} height={h} rx={6} fill="#F8F5EF" />
      <text x={24} y={44} fontFamily={SANS} fontWeight={900} fontSize={30} fill={C.ink}>
        Q3 Churn Analysis
      </text>
      {bars.map((b, i) => {
        const bh = chartH * b * grow;
        return <rect key={i} x={30 + i * ((w - 60) / bars.length)} y={64 + chartH - bh} width={(w - 60) / bars.length - 18} height={bh} rx={4} fill={i === bars.length - 1 ? C.red : '#9AA5B5'} />;
      })}
      <rect x={18} y={h - 46} width={w - 36} height={36} rx={8} fill={`rgba(224,169,59,${0.15 + 0.6 * footerHl})`} />
      <text x={32} y={h - 20} fontFamily={SANS} fontWeight={800} fontSize={24} fill={C.ink}>
        {footer}
      </text>
    </g>
  );
};
const Spotlight: React.FC<{x: number; opacity?: number}> = ({x, opacity = 1}) => (
  <g opacity={opacity}>
    <path d={`M${x - 50} 0 L${x + 50} 0 L${x + 190} 1180 L${x - 190} 1180 Z`} fill="rgba(255,214,130,0.22)" />
    <ellipse cx={x} cy={1188} rx={200} ry={28} fill="rgba(255,214,130,0.35)" />
  </g>
);
const CreditChip: React.FC<{x: number; y: number; pop?: number}> = ({x, y, pop = 1}) => (
  <div style={{position: 'absolute', left: x - 110, top: y, width: 220, display: 'flex', justifyContent: 'center', transform: `scale(${pop})`, opacity: Math.min(1, pop * 1.5)}}>
    <div style={{background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 34, letterSpacing: 4, padding: '10px 26px', borderRadius: 999, boxShadow: '0 12px 30px rgba(120,80,10,0.3)'}}>CREDIT</div>
  </div>
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

/* Final-frame x of a character placed at pre-scale x */
const fx = (x: number) => 540 + (x - 540) * 1.45;

/* ---------- 1. Hook: Mark presents your work ---------- */
const Hook: React.FC = () => {
  const {f, fps, t} = useT();
  const clapping = t >= 4.3 && t < 5.9;
  const cheer = clapping ? interpolate(t, [4.3, 4.55], [0, 1], clamp) * (168 + Math.sin((f - s(4.3)) / 2.5) * 8) : 0;
  const slump = interpolate(t, [4.6, 5.2], [0, -10], clamp);
  const footer = interpolate(t, [1.9, 2.3], [0, 1], clamp);
  const grow = interpolate(t, [0.3, 1.4], [0.2, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const markPoint = interpolate(t, [0.8, 1.1], [0, 1], clamp);
  return (
    <Scene bg={C.paper} dur={6.1} whoosh={false}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <RoomBackdrop />
        <Screen x={560} y={290} w={440} h={330} footer="Prepared by: Mark" footerHl={footer} grow={grow} />
        <Spotlight x={fx(780)} />
        <Fg>
          <Person x={780} y={1180} facing={-1} armL={markPoint * 75} {...MARK} />
          <Table x={380} w={420}>
            <Person x={-110} y={134} armR={cheer} {...DANA} />
            <Person x={110} y={134} lean={slump} {...YOU} />
          </Table>
        </Fg>
      </svg>
      <Watermark />
      <SpeechBubble at={4.4} out={6.1} left={40} top={480} width={460} tail="left">
        Great work, Mark!
      </SpeechBubble>
      <Sfx at={2.0} name="blip" volume={0.35} />
      <Sfx at={4.4} name="ping" volume={0.45} />
      <Captions
        top={1270}
        caps={[
          {text: 'Someone in your office is presenting your work right now.', start: 0.19, end: 4.4, key: 'your work', se: 3.84},
          {text: 'And getting thanked for it.', start: 4.43, end: 6.1, key: 'thanked', se: 5.56},
        ]}
      />
    </Scene>
  );
};

/* ---------- 2. The rule ---------- */
const BEATS = [
  {label: 'SAYS IT FIRST', at: 5.55},
  {label: 'OUT LOUD', at: 6.49},
  {label: 'IN THE RIGHT ROOM', at: 7.4},
];
const Rule: React.FC = () => {
  const {f, fps, t} = useT();
  const title = spring({frame: f - s(0.26), fps, config: {damping: 15}});
  const work = spring({frame: f - s(2.2), fps, config: {damping: 13}});
  const strike = interpolate(t, [3.7, 4.1], [0, 1], clamp);
  const workOut = interpolate(t, [4.6, 4.9], [1, 0.35], clamp);
  return (
    <Scene bg={C.night} dur={9.3}>
      <Watermark dark />
      <div style={{position: 'absolute', top: 240, left: 80, right: 80, opacity: title, transform: `translateY(${(1 - title) * 30}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber}}>THE UNWRITTEN RULE</div>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 84, lineHeight: 1.02, color: C.white, marginTop: 14}}>Credit goes to whoever...</div>
      </div>
      {t >= 2.2 && (
        <div style={{position: 'absolute', top: 500, left: 80, opacity: work * workOut, transform: `scale(${0.9 + 0.1 * work})`, transformOrigin: 'left center'}}>
          <div style={{position: 'relative', display: 'inline-block', fontFamily: SANS, fontWeight: 900, fontSize: 60, color: 'rgba(255,255,255,0.75)', padding: '10px 26px', border: '4px solid rgba(255,255,255,0.3)', borderRadius: 18}}>
            DID THE WORK
            <div style={{position: 'absolute', left: 14, top: '50%', height: 9, width: `${strike * 92}%`, background: C.red, borderRadius: 5}} />
          </div>
        </div>
      )}
      <div style={{position: 'absolute', top: 650, left: 80, right: 80, display: 'flex', flexDirection: 'column', gap: 26}}>
        {BEATS.map((b) => {
          const sp = spring({frame: f - s(b.at), fps, config: {damping: 11, stiffness: 220}});
          if (t < b.at) return null;
          return (
            <div key={b.label} style={{alignSelf: 'flex-start', background: C.amber, color: C.ink, fontFamily: SANS, fontWeight: 900, fontSize: 64, padding: '12px 30px', borderRadius: 18, transform: `translateX(${(1 - sp) * -80}px)`, opacity: sp}}>
              {b.label}
            </div>
          );
        })}
      </div>
      <Sfx at={2.2} name="pop" volume={0.35} />
      <Sfx at={3.7} name="snip" volume={0.4} />
      {BEATS.map((b) => (
        <Sfx key={b.label} at={b.at} name="hit" volume={0.4} />
      ))}
      <Captions
        dark
        top={1300}
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.26, end: 2.15, key: 'rule', se: 1.7},
          {text: "Credit doesn't go to whoever did the work.", start: 2.2, end: 4.65, key: 'credit', se: 4.24},
          {text: 'It goes to whoever says it first, out loud, in the right room.', start: 4.69, end: 9.3, key: 'first,', se: 8.25},
        ]}
      />
    </Scene>
  );
};

/* ---------- 3. Move 1: update before the meeting ---------- */
const EMAIL = 'Hi Dana, quick update before tomorrow: I finished the Q3 churn analysis. Key finding: most churn starts in month two. Happy to walk through it.';
const STEPS7: TypeStep[] = [{text: EMAIL, from: 3.5, to: 5.75, mode: 'type'}];
const Move1: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.3), fps, config: {damping: 15}});
  const sent = t >= 5.9;
  const sentSp = spring({frame: f - s(5.9), fps, config: {damping: 12}});
  const nameHl = interpolate(t, [6.4, 6.7], [0, 1], clamp);
  const stamp = spring({frame: f - s(7.55), fps, config: {damping: 9, stiffness: 240}});
  const body = typedText(f, STEPS7);
  const caret = Math.floor(f / 15) % 2 === 0;
  const field = (label: string, value: React.ReactNode) => (
    <div style={{display: 'flex', gap: 20, padding: '16px 0', borderBottom: '2px solid #EEEAE4', fontFamily: SANS, fontSize: 32, alignItems: 'center'}}>
      <div style={{width: 120, color: C.muted, fontWeight: 600}}>{label}</div>
      <div style={{color: C.ink, fontWeight: 700}}>{value}</div>
    </div>
  );
  return (
    <Scene bg={C.paper} dur={9.1}>
      <Watermark />
      <StepLabel n="1/3" title="Update before the meeting" />
      <div style={{...card, top: 440, padding: '20px 40px 30px', opacity: inn, transform: `translateY(${(1 - inn) * 60}px)`}}>
        {field(
          'From',
          <span style={{background: `rgba(224,169,59,${0.75 * nameHl})`, padding: '2px 12px', borderRadius: 10}}>You</span>,
        )}
        {field('To', 'Dana (your boss)')}
        {field('Subject', 'Q3 churn analysis: quick update')}
        <div style={{fontFamily: SANS, fontSize: 36, lineHeight: 1.35, color: C.ink, minHeight: 250, paddingTop: 20}}>
          {body}
          {!sent && t >= 3.4 && caret && <span>|</span>}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 20}}>
          {sent && (
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 32, color: C.green, opacity: sentSp, transform: `scale(${t >= 7.55 ? 1 + 0.12 * stamp : 1})`, background: t >= 7.55 ? 'rgba(46,158,91,0.14)' : 'transparent', padding: '6px 16px', borderRadius: 12}}>
              {'✓'} Sent Tue 9:42 PM
            </div>
          )}
          <div style={{padding: '16px 38px', borderRadius: 18, background: sent ? C.green : C.ink, color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 32}}>{sent ? 'Sent' : 'Send'}</div>
        </div>
      </div>
      <TypeClicks steps={STEPS7} />
      <Sfx at={5.9} name="send" volume={0.5} />
      <Sfx at={6.4} name="blip" volume={0.35} />
      <Sfx at={7.55} name="hit" volume={0.5} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move one: send the update before the meeting.', start: 0.21, end: 3.48, key: 'before', se: 3.11},
          {text: 'One short email to your boss the night before.', start: 3.51, end: 6.33, key: 'night', se: 5.76},
          {text: 'Now your name is on it, with a timestamp.', start: 6.37, end: 9.1, key: 'timestamp.', se: 8.21},
        ]}
      />
    </Scene>
  );
};

/* ---------- 4. Move 2: thank them in public ---------- */
const Move2: React.FC = () => {
  const {f, fps, t} = useT();
  const move = interpolate(t, [8.5, 9.4], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const spotX = fx(780) + (fx(490) - fx(780)) * move;
  const chipX = fx(780) + (fx(490) - fx(780)) * move;
  const chipY = 630 - 50 * Math.sin(move * Math.PI);
  const chipIn = spring({frame: f - s(0.6), fps, config: {damping: 12}});
  const raise = interpolate(t, [3.0, 3.3, 7.0, 7.4], [0, 1, 1, 0], clamp);
  const markArm = interpolate(t, [0, 0.3, 3.5, 4.2], [75, 75, 75, 0], clamp);
  const markSlump = interpolate(t, [9.2, 9.8], [0, -8], clamp);
  return (
    <Scene bg={C.paper} dur={11.4}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <RoomBackdrop />
        <Screen x={560} y={415} w={440} h={200} footer="Prepared by: Mark" />
        <Spotlight x={spotX} />
        <Fg>
          <Person x={780} y={1180} facing={-1} armL={markArm} lean={markSlump} {...MARK} />
          <Table x={380} w={420}>
            <Person x={-110} y={134} {...DANA} />
            <Person x={110} y={134} armR={raise * 172} {...YOU} />
          </Table>
        </Fg>
      </svg>
      <Watermark />
      <StepLabel n="2/3" title="Thank them in public" />
      <CreditChip x={chipX} y={chipY} pop={chipIn} />
      <SpeechBubble at={3.32} out={5.4} left={150} top={430} width={560} tail="left" dark>
        Thanks for sharing my analysis, Mark.
      </SpeechBubble>
      <SpeechBubble at={5.41} out={7.5} left={150} top={430} width={560} tail="left" dark>
        Happy to walk everyone through the method.
      </SpeechBubble>
      <Sfx at={3.32} name="pop" volume={0.4} />
      <Sfx at={8.5} name="whoosh" volume={0.35} />
      <Sfx at={9.4} name="ping" volume={0.45} />
      <Captions
        top={1270}
        caps={[
          {text: 'Move two: thank them in public.', start: 0.26, end: 3.28, key: 'public.', se: 2.91},
          {text: 'Thanks for sharing my analysis, Mark.', start: 3.32, end: 5.38, key: 'my', se: 5.16},
          {text: 'Happy to walk everyone through the method.', start: 5.41, end: 7.5, key: 'method.', se: 6.86},
          {text: 'Totally polite.', start: 7.58, end: 8.47, key: 'polite.', se: 8.29},
          {text: 'And now everyone knows whose work it was.', start: 8.5, end: 11.4, key: 'whose', se: 10.67},
        ]}
      />
    </Scene>
  );
};

/* ---------- 5. Move 3: present it yourself ---------- */
const AGENDA = [
  {item: 'Revenue update', who: 'Dana', mins: '10 min'},
  {item: 'Hiring plan', who: 'Raj', mins: '10 min'},
];
const Move3: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.3), fps, config: {damping: 15}});
  const added = spring({frame: f - s(4.6), fps, config: {damping: 13}});
  const aOut = interpolate(t, [6.05, 6.3], [1, 0], clamp);
  const bIn = interpolate(t, [6.15, 6.45], [0, 1], clamp);
  const point = interpolate(t, [6.6, 6.9], [0, 1], clamp);
  const chip = spring({frame: f - s(7.2), fps, config: {damping: 12}});
  const row = (n: number, item: string, who: string, mins: string, hl?: boolean, extra?: React.CSSProperties) => (
    <div style={{display: 'flex', alignItems: 'center', padding: '24px 0', borderTop: '2px solid #EEEAE4', fontFamily: SANS, fontSize: 38, background: hl ? 'rgba(224,169,59,0.25)' : 'transparent', margin: '0 -40px', paddingLeft: 40, paddingRight: 40, ...extra}}>
      <div style={{width: 50, color: C.muted, fontWeight: 800}}>{n}</div>
      <div style={{flex: 1, color: C.ink, fontWeight: 700}}>{item}</div>
      <div style={{width: 120, color: hl ? C.ink : C.muted, fontWeight: hl ? 900 : 600}}>{who}</div>
      <div style={{width: 120, textAlign: 'right', color: C.muted, fontWeight: 600}}>{mins}</div>
    </div>
  );
  return (
    <Scene bg={C.paper} dur={9.6}>
      {t >= 6.15 && (
        <svg width={1080} height={1920} style={{position: 'absolute', opacity: bIn}}>
          <RoomBackdrop />
          <Screen x={560} y={415} w={440} h={200} footer="Presented by: You" footerHl={1} />
          <Spotlight x={fx(780)} />
          <Fg>
            <Person x={780} y={1180} facing={-1} armL={point * 75} {...YOU} />
            <Table x={380} w={420}>
              <Person x={-110} y={134} {...DANA} />
              <Person x={110} y={134} {...MARK} />
            </Table>
          </Fg>
        </svg>
      )}
      <Watermark />
      <StepLabel n="3/3" title="Present it yourself" />
      <div style={{...card, top: 460, padding: '30px 40px 10px', opacity: inn * aOut, transform: `translateY(${(1 - inn) * 60}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: C.muted, marginBottom: 12}}>Q3 REVIEW · AGENDA</div>
        {AGENDA.map((a, i) => (
          <React.Fragment key={a.item}>{row(i + 1, a.item, a.who, a.mins)}</React.Fragment>
        ))}
        {t >= 4.6 && row(3, 'Churn analysis', 'You', '5 min', true, {opacity: added, transform: `translateY(${(1 - added) * 40}px)`})}
      </div>
      {t >= 7.2 && <CreditChip x={fx(780)} y={630} pop={chip} />}
      <Sfx at={4.6} name="pop" volume={0.45} />
      <Sfx at={6.15} name="whoosh" volume={0.35} />
      <Sfx at={7.2} name="ping" volume={0.45} />
      <Captions
        top={1270}
        caps={[
          {text: 'Move three: present it yourself, at least once.', start: 0.34, end: 4.05, key: 'yourself,', se: 3.6},
          {text: 'Ask for five minutes on the agenda.', start: 4.09, end: 6.25, key: 'five', se: 6.07},
          {text: 'The person who presents it is the person they remember.', start: 6.28, end: 9.6, key: 'remember.', se: 8.69},
        ]}
      />
    </Scene>
  );
};

/* ---------- 6. Punch line ---------- */
const Punch: React.FC = () => (
  <Scene bg={C.night} dur={5.4}>
    <Watermark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 34}}>
      <SerifLine at={0.38} size={120}>
        Doing the work makes you useful.
      </SerifLine>
      <SerifLine at={2.39} size={120} color={C.amber} italic>
        Being seen doing it makes you promotable.
      </SerifLine>
    </AbsoluteFill>
    <Sfx at={0.38} name="pop" volume={0.3} />
    <Sfx at={2.39} name="pop" volume={0.4} />
  </Scene>
);

/* ---------- 7. End card ---------- */
const End: React.FC = () => {
  const {f, fps} = useT();
  const brand = spring({frame: f - s(4.38), fps, config: {damping: 14}});
  const qOut = interpolate(f, [s(4.1), s(4.38)], [1, 0], clamp);
  return (
    <Scene bg={C.night} dur={8.6}>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut, gap: 30}}>
        <SerifLine at={0.4} size={112}>
          Has someone ever stolen your credit?
        </SerifLine>
        <SerifLine at={2.05} size={84} color="rgba(255,255,255,0.8)">
          What did you do about it?
        </SerifLine>
        <SerifLine at={3.19} size={64} color={C.amber} italic>
          Tell me in the comments.
        </SerifLine>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: brand, transform: `scale(${0.9 + 0.1 * brand})`}}>
        <King size={130} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: 14, color: C.white, marginTop: 36}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={4.38} name="pop" volume={0.4} />
    </Scene>
  );
};

export const Day7: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day7.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music_day7.wav')}
      volume={(f) => interpolate(f, [0, s(57.0), s(57.6), s(DAY7_DURATION)], [0.13, 0.13, 0.32, 0.32], clamp)}
    />
    <Seq k="hook"><Hook /></Seq>
    <Seq k="rule"><Rule /></Seq>
    <Seq k="move1"><Move1 /></Seq>
    <Seq k="move2"><Move2 /></Seq>
    <Seq k="move3"><Move3 /></Seq>
    <Seq k="punch"><Punch /></Seq>
    <Seq k="end"><End /></Seq>
  </AbsoluteFill>
);

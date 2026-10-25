import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, SANS, s} from './theme';
import {Avatar, Captions, King, Scene, SerifLine, Sfx, StepLabel, TypeClicks, TypeStep, Watermark, typedText} from './components';
import {OfficeBackdrop, Person} from './characters';

/* Scene timeline (seconds, global), synced to public/voice/day9.wav */
export const SCENES9 = {
  hook: [0, 6.75],
  rule: [6.75, 12.95],
  move1: [12.95, 22.3],
  move2: [22.3, 34.3],
  move3: [34.3, 44.5],
  punch: [44.5, 49.6],
  end: [49.6, 57.4],
} as const;
export const DAY9_DURATION = SCENES9.end[1];

const Seq: React.FC<{k: keyof typeof SCENES9; children: React.ReactNode}> = ({k, children}) => {
  const [a, b] = SCENES9[k];
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

const MARK = {shirt: '#3F6FB5', hair: '#3A2A1E', hairStyle: 'short' as const, skin: '#E2B48C', pants: '#2B2B33'};
const DANA = {shirt: '#2F3E55', hair: '#5A3B22', hairStyle: 'bun' as const, skin: '#D9A77E', pants: '#2A2A33'};
const PRIYA = {shirt: '#8A4B6B', hair: '#1E1A17', hairStyle: 'long' as const, skin: '#B88158', pants: '#2B2B33'};

/* One header row of an email: label + value */
const Field: React.FC<{label: string; children: React.ReactNode; hl?: number; color?: string}> = ({label, children, hl = 0, color = C.amber}) => (
  <div style={{position: 'relative', display: 'flex', gap: 20, padding: '16px 0', borderBottom: '2px solid #EEEAE4', fontFamily: SANS, fontSize: 34, alignItems: 'center'}}>
    <div style={{position: 'absolute', left: -20, right: -20, top: 4, bottom: 4, borderRadius: 14, background: color, opacity: 0.32 * hl}} />
    <div style={{position: 'relative', width: 130, color: C.muted, fontWeight: 600}}>{label}</div>
    <div style={{position: 'relative', color: C.ink, fontWeight: 700}}>{children}</div>
  </div>
);
const Pill: React.FC<{bg: string; color?: string; size?: number; children: React.ReactNode}> = ({bg, color = C.ink, size = 34, children}) => (
  <div style={{display: 'inline-block', background: bg, color, fontFamily: SANS, fontWeight: 900, fontSize: size, padding: '10px 26px', borderRadius: 999, letterSpacing: 1}}>{children}</div>
);

/* ---------- 1. Hook: everyone reads the CC line ---------- */
const PEEK = [
  {x: 230, at: 5.04, p: MARK},
  {x: 540, at: 5.3, p: DANA},
  {x: 850, at: 5.56, p: PRIYA},
];
const Hook: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.3), fps, config: {damping: 15}});
  const hl = t >= 3.3 ? 0.65 + 0.35 * Math.sin((f - s(3.3)) / 5) : 0;
  const tag = spring({frame: f - s(3.3), fps, config: {damping: 12}});
  return (
    <Scene bg={C.paper} dur={6.75} whoosh={false}>
      <svg width={1080} height={1920} style={{position: 'absolute'}}>
        <defs>
          <clipPath id="abovePartition9">
            <rect x={0} y={0} width={1080} height={1080} />
          </clipPath>
        </defs>
        <OfficeBackdrop />
        <g clipPath="url(#abovePartition9)">
          {PEEK.map(({x, at, p}) => {
            const rise = spring({frame: f - s(at), fps, config: {damping: 13, stiffness: 160}});
            return <Person key={x} x={x} y={1265 + (1 - rise) * 300} {...p} />;
          })}
        </g>
        {/* cubicle partition */}
        <rect x={0} y={1070} width={1080} height={110} fill="#9C8F7E" />
        <rect x={0} y={1060} width={1080} height={18} rx={6} fill="#867966" />
        {[360, 720].map((x) => (
          <rect key={x} x={x - 6} y={1060} width={12} height={120} fill="#867966" />
        ))}
      </svg>
      <Watermark />
      <div style={{...card, top: 430, padding: '16px 40px 20px', opacity: inn, transform: `translateY(${(1 - inn) * 60}px)`}}>
        <Field label="From">You</Field>
        <Field label="To">Raj</Field>
        <Field label="CC" hl={hl}>
          Dana, Mark, Priya
        </Field>
        <div style={{display: 'flex', gap: 20, padding: '16px 0 0', fontFamily: SANS, fontSize: 34}}>
          <div style={{width: 130, color: C.muted, fontWeight: 600}}>Subject</div>
          <div style={{color: C.ink, fontWeight: 700}}>Q3 numbers</div>
        </div>
      </div>
      {t >= 3.3 && (
        <div style={{position: 'absolute', top: 372, right: 100, opacity: tag, transform: `scale(${0.8 + 0.2 * tag})`, transformOrigin: 'right bottom'}}>
          <Pill bg={C.ink} color={C.white} size={30}>THE SECOND MESSAGE</Pill>
        </div>
      )}
      {PEEK.map(({x, at}) => {
        const sp = spring({frame: f - s(at + 0.3), fps, config: {damping: 12}});
        if (t < at + 0.3) return null;
        return (
          <div key={x} style={{position: 'absolute', top: 830, left: x - 110, width: 220, whiteSpace: 'nowrap', display: 'flex', justifyContent: 'center', opacity: sp, transform: `scale(${sp})`}}>
            <Pill bg={C.amber} size={26}>{'✓'} READ</Pill>
          </div>
        );
      })}
      <Sfx at={0.3} name="send" volume={0.35} />
      <Sfx at={3.3} name="hit" volume={0.45} />
      {PEEK.map(({at}) => (
        <Sfx key={at} at={at + 0.3} name="blip" volume={0.3} />
      ))}
      <Captions
        top={1270}
        caps={[
          {text: 'Every email you send at work has a second message hidden in the CC line.', start: 0.34, end: 5.0, key: 'CC', se: 4.57},
          {text: 'And everyone reads it.', start: 5.04, end: 6.75, key: 'everyone', se: 6.02},
        ]}
      />
    </Scene>
  );
};

/* ---------- 2. The rule: the CC line is for witnesses ---------- */
const Rule: React.FC = () => {
  const {f, fps, t} = useT();
  const box = spring({frame: f - s(0.3), fps, config: {damping: 15}});
  const info = spring({frame: f - s(1.89), fps, config: {damping: 14}});
  const strike = interpolate(t, [3.0, 3.5], [0, 1], clamp);
  const wit = spring({frame: f - s(4.29), fps, config: {damping: 11, stiffness: 200}});
  return (
    <Scene bg={C.night} dur={6.2}>
      <Watermark dark />
      <div style={{position: 'absolute', top: 240, left: 80, right: 80, fontFamily: SANS}}>
        <div style={{fontWeight: 900, fontSize: 30, letterSpacing: 6, color: C.amber}}>THE RULE NOBODY TELLS YOU</div>
        <div style={{fontWeight: 900, fontSize: 80, lineHeight: 1.03, color: C.white, marginTop: 14}}>What the CC line is really for</div>
      </div>
      <div style={{position: 'absolute', top: 620, left: 70, right: 70, background: C.nightSoft, borderRadius: 34, padding: '40px 50px', minHeight: 420, opacity: box, transform: `translateY(${(1 - box) * 40}px)`}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 56, color: C.muted, letterSpacing: 4}}>CC:</div>
        {t >= 1.89 && (
          <div style={{position: 'relative', display: 'inline-block', marginTop: 20, opacity: info * (1 - 0.45 * strike)}}>
            <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 72, color: C.white}}>information</div>
            <div style={{position: 'absolute', left: -8, top: '52%', height: 10, width: `${strike * 104}%`, background: C.red, borderRadius: 5}} />
          </div>
        )}
        {t >= 4.29 && (
          <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 30, opacity: wit, transform: `scale(${0.85 + 0.15 * wit})`, transformOrigin: 'left center'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 84, color: C.amber}}>witnesses</div>
            <div style={{display: 'flex', gap: 12}}>
              <Avatar initials="D" color="#2F3E55" size={76} />
              <Avatar initials="M" color="#3F6FB5" size={76} />
              <Avatar initials="P" color="#8A4B6B" size={76} />
            </div>
          </div>
        )}
      </div>
      <Sfx at={1.89} name="blip" volume={0.35} />
      <Sfx at={3.0} name="snip" volume={0.4} />
      <Sfx at={4.29} name="hit" volume={0.5} />
      <Captions
        dark
        top={1250}
        caps={[
          {text: "Here's the rule nobody tells you.", start: 0.26, end: 1.85, key: 'rule', se: 1.41},
          {text: "The CC line isn't for information.", start: 1.89, end: 4.25, key: 'information.', se: 3.94},
          {text: "It's for witnesses.", start: 4.29, end: 6.2, key: 'witnesses.', se: 5.14},
        ]}
      />
    </Scene>
  );
};

/* ---------- 3. Move 1: only CC up when it protects you ---------- */
const Move1: React.FC = () => {
  const {f, fps, t} = useT();
  const inn = spring({frame: f - s(0.4), fps, config: {damping: 15}});
  const bad = interpolate(t, [3.88, 4.3], [0, 1], clamp);
  const reply = spring({frame: f - s(6.59), fps, config: {damping: 13}});
  const war = spring({frame: f - s(7.6), fps, config: {damping: 10, stiffness: 240}});
  const sent = t >= 1.6;
  return (
    <Scene bg={C.paper} dur={9.35}>
      <Watermark />
      <StepLabel n="1/3" title="Only CC up to protect you" />
      <div style={{...card, top: 440, padding: '14px 40px 24px', opacity: inn, transform: `translateY(${(1 - inn) * 60}px)`}}>
        <Field label="To">Raj</Field>
        <Field label="CC" hl={bad} color={C.red}>
          {"Dana (Raj's boss)"}
        </Field>
        <Field label="Subject">Small typo on slide 4</Field>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 18}}>
          <div style={{padding: '14px 36px', borderRadius: 18, background: sent ? C.green : C.ink, color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 30}}>{sent ? '✓ Sent' : 'Send'}</div>
        </div>
      </div>
      {t >= 6.59 && (
        <div style={{...card, top: 840, left: 110, right: 110, padding: '24px 30px', display: 'flex', gap: 22, alignItems: 'center', opacity: reply, transform: `translateY(${(1 - reply) * 40}px)`}}>
          <Avatar initials="R" color="#3F7D5C" size={76} />
          <div style={{fontFamily: SANS}}>
            <div style={{fontWeight: 800, fontSize: 28, color: C.muted}}>Raj replied</div>
            <div style={{fontWeight: 700, fontSize: 38, color: C.ink}}>Thanks for looping in my boss.</div>
          </div>
        </div>
      )}
      {t >= 7.6 && (
        <div style={{position: 'absolute', top: 1060, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${war})`}}>
          <Pill bg={C.red} color={C.white} size={36}>You vs Raj. Forever.</Pill>
        </div>
      )}
      <Sfx at={1.6} name="send" volume={0.4} />
      <Sfx at={3.88} name="blip" volume={0.35} />
      <Sfx at={6.59} name="ping" volume={0.45} />
      <Sfx at={7.6} name="hit" volume={0.5} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move one: only CC up when it protects you.', start: 0.32, end: 3.85, key: 'protects', se: 3.3},
          {text: "Copying someone's boss on a small mistake doesn't fix it.", start: 3.88, end: 6.55, key: 'boss', se: 6.4},
          {text: 'It starts a war you will lose.', start: 6.59, end: 9.35, key: 'war', se: 8.42},
        ]}
      />
    </Scene>
  );
};

/* ---------- 4. Move 2: reply fast, calm, with facts ---------- */
const ANGRY = 'Seriously?? I sent it TWICE. Maybe check your inbox.';
const CALM = 'Hi Mark, I sent it Tuesday at 9:14. Attached again. The updated numbers are on page 2.';
const STEPS9: TypeStep[] = [
  {text: ANGRY, from: 6.7, to: 7.6, mode: 'type'},
  {text: ANGRY, from: 7.9, to: 8.4, mode: 'delete'},
  {text: CALM, from: 8.6, to: 10.3, mode: 'type'},
];
const Move2: React.FC = () => {
  const {f, fps, t} = useT();
  const inc = spring({frame: f - s(0.4), fps, config: {damping: 15}});
  const box = spring({frame: f - s(3.54), fps, config: {damping: 15}});
  const body = typedText(f, STEPS9);
  const angry = t >= 6.7 && t < 8.45;
  const att = spring({frame: f - s(10.0), fps, config: {damping: 12}});
  const sent = t >= 10.97;
  const chip = spring({frame: f - s(11.2), fps, config: {damping: 10, stiffness: 240}});
  const caret = Math.floor(f / 15) % 2 === 0;
  return (
    <Scene bg={C.paper} dur={12.0}>
      <Watermark />
      <StepLabel n="2/3" title="Reply fast, calm, factual" />
      <div style={{...card, top: 440, padding: '14px 40px 24px', opacity: inc, transform: `translateY(${(1 - inc) * 60}px)`}}>
        <Field label="From">Mark</Field>
        <Field label="CC" hl={t >= 1.2 ? 1 : 0}>
          Your manager
        </Field>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 40, color: C.ink, paddingTop: 18}}>Why is the report STILL late?</div>
      </div>
      {t >= 3.54 && (
        <div
          style={{
            ...card,
            top: 770,
            padding: '20px 36px 24px',
            border: `5px solid ${angry ? C.red : 'transparent'}`,
            opacity: box,
            transform: `translateY(${(1 - box) * 50}px)`,
          }}
        >
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, letterSpacing: 2, color: angry ? C.red : C.muted}}>{angry ? 'REPLY ALL' : 'REPLY'}</div>
          <div style={{fontFamily: SANS, fontSize: 36, lineHeight: 1.3, color: C.ink, minHeight: 140, paddingTop: 10}}>
            {body}
            {!sent && caret && <span>|</span>}
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{opacity: t >= 10.0 ? att : 0, background: '#F1EEE9', borderRadius: 14, padding: '10px 20px', fontFamily: SANS, fontWeight: 700, fontSize: 28, color: C.ink}}>
              report_v3.pdf
            </div>
            <div style={{padding: '14px 36px', borderRadius: 18, background: sent ? C.green : C.ink, color: C.white, fontFamily: SANS, fontWeight: 800, fontSize: 30}}>{sent ? '✓ Sent' : 'Send'}</div>
          </div>
        </div>
      )}
      {t >= 11.2 && (
        <div style={{position: 'absolute', top: 1140, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${chip})`}}>
          <Pill bg={C.amber} size={34}>Replied in 6 minutes</Pill>
        </div>
      )}
      <TypeClicks steps={STEPS9} />
      <Sfx at={0.4} name="ping" volume={0.45} />
      <Sfx at={10.0} name="pop" volume={0.35} />
      <Sfx at={10.97} name="send" volume={0.5} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move two: when someone CCs your manager to corner you,', start: 0.36, end: 3.5, key: 'manager', se: 3.25},
          {text: 'reply fast, calm, and with facts.', start: 3.54, end: 6.6, key: 'facts.', se: 5.98},
          {text: 'Never reply all angry.', start: 6.65, end: 8.5, key: 'angry.', se: 8.04},
          {text: 'Answer the question, attach the proof, done.', start: 8.55, end: 12.0, key: 'proof,', se: 10.97},
        ]}
      />
    </Scene>
  );
};

/* ---------- 5. Move 3: praise up, problems down ---------- */
const Move3: React.FC = () => {
  const {f, fps, t} = useT();
  const up = spring({frame: f - s(1.0), fps, config: {damping: 15}});
  const down = spring({frame: f - s(2.3), fps, config: {damping: 15}});
  const hlUp = t >= 4.12 && t < 6.66 ? 1 : 0;
  const hlDown = t >= 6.66 ? 1 : 0;
  const noInbox = spring({frame: f - s(8.2), fps, config: {damping: 10, stiffness: 240}});
  return (
    <Scene bg={C.paper} dur={10.2}>
      <Watermark />
      <StepLabel n="3/3" title="Praise up, problems down" />
      <div style={{...card, top: 440, padding: '20px 36px 24px', opacity: up * (hlDown ? 0.55 : 1), transform: `translateY(${(1 - up) * 50}px) scale(${hlUp ? 1.03 : 1})`, border: `5px solid ${hlUp ? C.amber : 'transparent'}`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 2, color: C.green}}>{'PRAISE ↑ UP'}</div>
          <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 28, color: C.muted}}>{"CC: Priya's boss"}</div>
        </div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 38, lineHeight: 1.3, color: C.ink, marginTop: 14}}>Huge thanks, Priya. The client loved your deck.</div>
      </div>
      {t >= 2.3 && (
        <div style={{...card, top: 760, padding: '20px 36px 24px', opacity: down * (hlUp ? 0.55 : 1), transform: `translateY(${(1 - down) * 50}px) scale(${hlDown ? 1.03 : 1})`, border: `5px solid ${hlDown ? C.amber : 'transparent'}`}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 2, color: C.red}}>{'PROBLEMS ↓ 1:1'}</div>
            <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 28, color: C.muted}}>No CC</div>
          </div>
          <div style={{display: 'flex', gap: 24, alignItems: 'center', marginTop: 16}}>
            <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 28, color: C.muted, lineHeight: 1.1, textAlign: 'center'}}>
              TUE
              <br />
              <span style={{fontSize: 42, color: C.ink}}>10:00</span>
            </div>
            <div style={{fontFamily: SANS}}>
              <div style={{fontWeight: 900, fontSize: 38, color: C.ink}}>Coffee with Priya</div>
              <div style={{fontWeight: 600, fontSize: 28, color: C.muted}}>The numbers on slide 4</div>
            </div>
          </div>
        </div>
      )}
      {t >= 8.2 && (
        <div style={{position: 'absolute', top: 1080, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${noInbox})`}}>
          <Pill bg={C.ink} color={C.white} size={34}>Fixed before it hit an inbox</Pill>
        </div>
      )}
      <Sfx at={1.0} name="send" volume={0.35} />
      <Sfx at={2.3} name="pop" volume={0.4} />
      <Sfx at={4.12} name="blip" volume={0.35} />
      <Sfx at={6.66} name="blip" volume={0.35} />
      <Sfx at={8.2} name="hit" volume={0.45} />
      <Captions
        top={1290}
        caps={[
          {text: 'Move three: send praise up, keep problems down.', start: 0.35, end: 4.08, key: 'up, down.', se: 3.56},
          {text: 'Thank a teammate with their boss on CC.', start: 4.12, end: 6.62, key: 'boss', se: 6.04},
          {text: 'Raise a problem one on one, before it hits an inbox.', start: 6.66, end: 10.2, key: 'one', se: 9.39},
        ]}
      />
    </Scene>
  );
};

/* ---------- 6. Punch line ---------- */
const Punch: React.FC = () => (
  <Scene bg={C.night} dur={5.1}>
    <Watermark dark />
    <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', gap: 34}}>
      <SerifLine at={0.49} size={124}>
        The To line asks for something.
      </SerifLine>
      <SerifLine at={2.73} size={124} color={C.amber} italic>
        {"The CC line says who's watching."}
      </SerifLine>
    </AbsoluteFill>
    <Sfx at={0.49} name="pop" volume={0.3} />
    <Sfx at={2.73} name="pop" volume={0.4} />
  </Scene>
);

/* ---------- 7. End card ---------- */
const End: React.FC = () => {
  const {f, fps} = useT();
  const brand = spring({frame: f - s(4.49), fps, config: {damping: 14}});
  const qOut = interpolate(f, [s(4.2), s(4.49)], [1, 0], clamp);
  return (
    <Scene bg={C.night} dur={7.8}>
      <AbsoluteFill style={{justifyContent: 'center', padding: '0 90px', opacity: qOut, gap: 30}}>
        <SerifLine at={0.61} size={104}>
          {"Has someone ever CC'd your boss to make you look bad?"}
        </SerifLine>
        <SerifLine at={3.34} size={64} color={C.amber} italic>
          Tell me in the comments.
        </SerifLine>
      </AbsoluteFill>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: brand, transform: `scale(${0.9 + 0.1 * brand})`}}>
        <King size={130} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, letterSpacing: 14, color: C.white, marginTop: 36}}>OFFICE MAFIA</div>
        <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: 'rgba(255,255,255,0.75)', marginTop: 40}}>Full playbook: link on the channel</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 36, color: C.amber, marginTop: 14}}>officemafia.gumroad.com</div>
      </AbsoluteFill>
      <Sfx at={4.49} name="pop" volume={0.4} />
    </Scene>
  );
};

export const Day9: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day9.wav')} volume={1} />
    <Audio
      src={staticFile('sfx/music_day9.wav')}
      volume={(f) => interpolate(f, [0, s(55.5), s(56.0), s(DAY9_DURATION)], [0.13, 0.13, 0.32, 0.32], clamp)}
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

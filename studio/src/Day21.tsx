import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {C, s} from './theme';
import {Sfx} from './components';
import {CL, INOUT} from './day21/kit';
import {Hook} from './day21/Hook';
import {Rule} from './day21/Rule';
import {Move1} from './day21/Move1';
import {Move2} from './day21/Move2';
import {Move3} from './day21/Move3';
import {End, Punch} from './day21/Outro';

/* Synced to public/voice/day21.wav. Scenes start at frames 0, 180, 423, 696, 942, 1239 and 1404.
   Every transition is 12 frames, so each sequence (except the last) runs 12 frames past the next scene's start. */
export const DAY21_DURATION = 55.4;
const TR = linearTiming({durationInFrames: 12, easing: INOUT});
export const CUTS21 = [6.0, 14.1, 23.2, 31.4, 41.3, 46.8];
export const SCENES21 = {Hook: 192, Rule: 255, Move1: 285, Move2: 258, Move3: 309, Punch: 177, End: 258};

const Progress: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', top: 0, left: 0, height: 10, background: C.amber, opacity: 0.9, width: `${interpolate(f, [0, s(DAY21_DURATION)], [0, 100], CL)}%`}} />;
};

export const Day21: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day21.wav')} volume={1} />
    <Audio src={staticFile('sfx/music_day21.wav')} volume={(f) => interpolate(f, [0, s(52.8), s(53.4), s(DAY21_DURATION)], [0.13, 0.13, 0.32, 0.32], CL)} />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={SCENES21.Hook}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={TR} />
      <TransitionSeries.Sequence name="Rule" durationInFrames={SCENES21.Rule}>
        <Rule />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({direction: 'from-left'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 1" durationInFrames={SCENES21.Move1}>
        <Move1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 2" durationInFrames={SCENES21.Move2}>
        <Move2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 3" durationInFrames={SCENES21.Move3}>
        <Move3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="Punch" durationInFrames={SCENES21.Punch}>
        <Punch />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="End" durationInFrames={SCENES21.End}>
        <End />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    {CUTS21.map((c) => (
      <Sfx key={c} at={c} name="whoosh" volume={0.22} />
    ))}
    <Progress />
  </AbsoluteFill>
);

import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {C, s} from './theme';
import {Sfx} from './components';
import {CL, INOUT} from './day25/kit';
import {Hook} from './day25/Hook';
import {Rule} from './day25/Rule';
import {Move1} from './day25/Move1';
import {Move2} from './day25/Move2';
import {Move3} from './day25/Move3';
import {End, Punch} from './day25/Outro';

/* Synced to public/voice/day25.wav. Scenes start at frames 0, 216, 405, 615, 861, 1104 and 1266.
   Every transition is 12 frames, so each sequence (except the last) runs 12 frames past the next scene's start. */
export const DAY25_DURATION = 51.0;
const TR = linearTiming({durationInFrames: 12, easing: INOUT});
export const CUTS25 = [7.2, 13.5, 20.5, 28.7, 36.8, 42.2];
export const SCENES25 = {Hook: 228, Rule: 201, Move1: 222, Move2: 258, Move3: 255, Punch: 174, End: 264};

const Progress: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', top: 0, left: 0, height: 10, background: C.amber, opacity: 0.9, width: `${interpolate(f, [0, s(DAY25_DURATION)], [0, 100], CL)}%`}} />;
};

export const Day25: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day25.wav')} volume={1} />
    <Audio src={staticFile('sfx/music_day25.wav')} volume={(f) => interpolate(f, [0, s(47.8), s(48.4), s(DAY25_DURATION)], [0.13, 0.13, 0.32, 0.32], CL)} />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={SCENES25.Hook}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={TR} />
      <TransitionSeries.Sequence name="Rule" durationInFrames={SCENES25.Rule}>
        <Rule />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({direction: 'from-left'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 1" durationInFrames={SCENES25.Move1}>
        <Move1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 2" durationInFrames={SCENES25.Move2}>
        <Move2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 3" durationInFrames={SCENES25.Move3}>
        <Move3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="Punch" durationInFrames={SCENES25.Punch}>
        <Punch />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="End" durationInFrames={SCENES25.End}>
        <End />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    {CUTS25.map((c) => (
      <Sfx key={c} at={c} name="whoosh" volume={0.22} />
    ))}
    <Progress />
  </AbsoluteFill>
);

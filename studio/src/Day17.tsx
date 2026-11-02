import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {C, s} from './theme';
import {Sfx} from './components';
import {CL, INOUT} from './day17/kit';
import {Hook} from './day17/Hook';
import {Rule} from './day17/Rule';
import {Move1} from './day17/Move1';
import {Move2} from './day17/Move2';
import {Move3} from './day17/Move3';
import {End, Punch} from './day17/Outro';

/* Synced to public/voice/day17.wav. Scenes start at 0, 5.5, 13.6, 21.9, 31.667, 40.0 and 45.6 s (frames 0, 165, 408, 657, 950, 1200, 1368).
   Every transition is 12 frames, so each sequence (except the last) runs 12 frames past the next scene's start. */
export const DAY17_DURATION = 55.0;
const TR = linearTiming({durationInFrames: 12, easing: INOUT});
export const CUTS17 = [5.5, 13.6, 21.9, 950 / 30, 40.0, 45.6];
export const SCENES17 = {Hook: 177, Rule: 255, Move1: 261, Move2: 305, Move3: 262, Punch: 180, End: 282};

const Progress: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', top: 0, left: 0, height: 10, background: C.amber, opacity: 0.9, width: `${interpolate(f, [0, s(DAY17_DURATION)], [0, 100], CL)}%`}} />;
};

export const Day17: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day17.wav')} volume={1} />
    <Audio src={staticFile('sfx/music_day17.wav')} volume={(f) => interpolate(f, [0, s(51.5), s(52.1), s(DAY17_DURATION)], [0.13, 0.13, 0.32, 0.32], CL)} />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={SCENES17.Hook}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={TR} />
      <TransitionSeries.Sequence name="Rule" durationInFrames={SCENES17.Rule}>
        <Rule />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({direction: 'from-left'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 1" durationInFrames={SCENES17.Move1}>
        <Move1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 2" durationInFrames={SCENES17.Move2}>
        <Move2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 3" durationInFrames={SCENES17.Move3}>
        <Move3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="Punch" durationInFrames={SCENES17.Punch}>
        <Punch />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="End" durationInFrames={SCENES17.End}>
        <End />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    {CUTS17.map((c) => (
      <Sfx key={c} at={c} name="whoosh" volume={0.22} />
    ))}
    <Progress />
  </AbsoluteFill>
);

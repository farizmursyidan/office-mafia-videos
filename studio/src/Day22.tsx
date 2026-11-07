import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {C, s} from './theme';
import {Sfx} from './components';
import {CL, INOUT} from './day22/kit';
import {Hook} from './day22/Hook';
import {Rule} from './day22/Rule';
import {Move1} from './day22/Move1';
import {Move2} from './day22/Move2';
import {Move3} from './day22/Move3';
import {End, Punch} from './day22/Outro';

/* Synced to public/voice/day22.wav. Scenes start at frames 0, 222, 450, 714, 969, 1239 and 1362.
   Every transition is 12 frames, so each sequence (except the last) runs 12 frames past the next scene's start. */
export const DAY22_DURATION = 53.0;
const TR = linearTiming({durationInFrames: 12, easing: INOUT});
export const CUTS22 = [7.4, 15.0, 23.8, 32.3, 41.3, 45.4];
export const SCENES22 = {Hook: 234, Rule: 240, Move1: 276, Move2: 267, Move3: 282, Punch: 135, End: 228};

const Progress: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', top: 0, left: 0, height: 10, background: C.amber, opacity: 0.9, width: `${interpolate(f, [0, s(DAY22_DURATION)], [0, 100], CL)}%`}} />;
};

export const Day22: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day22.wav')} volume={1} />
    <Audio src={staticFile('sfx/music_day22.wav')} volume={(f) => interpolate(f, [0, s(50.4), s(51.0), s(DAY22_DURATION)], [0.13, 0.13, 0.32, 0.32], CL)} />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={SCENES22.Hook}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={TR} />
      <TransitionSeries.Sequence name="Rule" durationInFrames={SCENES22.Rule}>
        <Rule />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({direction: 'from-left'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 1" durationInFrames={SCENES22.Move1}>
        <Move1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 2" durationInFrames={SCENES22.Move2}>
        <Move2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 3" durationInFrames={SCENES22.Move3}>
        <Move3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="Punch" durationInFrames={SCENES22.Punch}>
        <Punch />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="End" durationInFrames={SCENES22.End}>
        <End />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    {CUTS22.map((c) => (
      <Sfx key={c} at={c} name="whoosh" volume={0.22} />
    ))}
    <Progress />
  </AbsoluteFill>
);

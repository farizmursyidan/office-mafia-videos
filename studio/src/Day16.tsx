import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {C, s} from './theme';
import {Sfx} from './components';
import {CL, INOUT} from './day16/kit';
import {Hook} from './day16/Hook';
import {Rule} from './day16/Rule';
import {Move1} from './day16/Move1';
import {Move2} from './day16/Move2';
import {Move3} from './day16/Move3';
import {End, Punch} from './day16/Outro';

/* Synced to public/voice/day16.wav. Scenes start at 0, 5.967, 13.9, 22.4, 29.767, 38.0 and 44.0 s (frames 0, 179, 417, 672, 893, 1140, 1320).
   Every transition is 12 frames, so each sequence (except the last) runs 12 frames past the next scene's start. */
export const DAY16_DURATION = 53.0;
const TR = linearTiming({durationInFrames: 12, easing: INOUT});
export const CUTS16 = [179 / 30, 13.9, 22.4, 893 / 30, 38.0, 44.0];
export const SCENES16 = {Hook: 191, Rule: 250, Move1: 267, Move2: 233, Move3: 259, Punch: 192, End: 270};

const Progress: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', top: 0, left: 0, height: 10, background: C.amber, opacity: 0.9, width: `${interpolate(f, [0, s(DAY16_DURATION)], [0, 100], CL)}%`}} />;
};

export const Day16: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day16.wav')} volume={1} />
    <Audio src={staticFile('sfx/music_day16.wav')} volume={(f) => interpolate(f, [0, s(49.4), s(50.0), s(DAY16_DURATION)], [0.13, 0.13, 0.32, 0.32], CL)} />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={SCENES16.Hook}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={TR} />
      <TransitionSeries.Sequence name="Rule" durationInFrames={SCENES16.Rule}>
        <Rule />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({direction: 'from-left'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 1" durationInFrames={SCENES16.Move1}>
        <Move1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 2" durationInFrames={SCENES16.Move2}>
        <Move2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 3" durationInFrames={SCENES16.Move3}>
        <Move3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="Punch" durationInFrames={SCENES16.Punch}>
        <Punch />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="End" durationInFrames={SCENES16.End}>
        <End />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    {CUTS16.map((c) => (
      <Sfx key={c} at={c} name="whoosh" volume={0.22} />
    ))}
    <Progress />
  </AbsoluteFill>
);

import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {C, s} from './theme';
import {Sfx} from './components';
import {CL, INOUT} from './day33/kit';
import {Hook} from './day33/Hook';
import {Rule} from './day33/Rule';
import {Move1} from './day33/Move1';
import {Move2} from './day33/Move2';
import {Move3} from './day33/Move3';
import {End, Punch} from './day33/Outro';

/* Synced to public/voice/day33.wav. Scenes start at frames 0, 198, 414, 687, 1005, 1290 and 1437.
   Every transition is 12 frames, so each sequence (except the last) runs 12 frames past the next scene's start. */
export const DAY33_DURATION = 57.3;
const TR = linearTiming({durationInFrames: 12, easing: INOUT});
export const CUTS33 = [6.6, 13.8, 22.9, 33.5, 43.0, 47.9];
export const SCENES33 = {Hook: 210, Rule: 228, Move1: 285, Move2: 330, Move3: 297, Punch: 159, End: 282};

const Progress: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', top: 0, left: 0, height: 10, background: C.amber, opacity: 0.9, width: `${interpolate(f, [0, s(DAY33_DURATION)], [0, 100], CL)}%`}} />;
};

export const Day33: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day33.wav')} volume={1} />
    <Audio src={staticFile('sfx/music_day33.wav')} volume={(f) => interpolate(f, [0, s(54.0), s(54.6), s(DAY33_DURATION)], [0.13, 0.13, 0.32, 0.32], CL)} />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={SCENES33.Hook}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={TR} />
      <TransitionSeries.Sequence name="Rule" durationInFrames={SCENES33.Rule}>
        <Rule />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({direction: 'from-left'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 1" durationInFrames={SCENES33.Move1}>
        <Move1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 2" durationInFrames={SCENES33.Move2}>
        <Move2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Move 3" durationInFrames={SCENES33.Move3}>
        <Move3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="Punch" durationInFrames={SCENES33.Punch}>
        <Punch />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="End" durationInFrames={SCENES33.End}>
        <End />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    {CUTS33.map((c) => (
      <Sfx key={c} at={c} name="whoosh" volume={0.22} />
    ))}
    <Progress />
  </AbsoluteFill>
);

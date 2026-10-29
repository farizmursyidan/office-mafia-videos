import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {C, s} from './theme';
import {Sfx} from './components';
import {CL, INOUT} from './day13/kit';
import {Hook} from './day13/Hook';
import {Rule} from './day13/Rule';
import {Sign1} from './day13/Sign1';
import {Sign2} from './day13/Sign2';
import {Sign3} from './day13/Sign3';
import {Move} from './day13/Move';
import {End, Punch} from './day13/Outro';

/* Synced to public/voice/day13.wav. Scenes start at 0, 6.4, 14.0, 20.5, 27.2, 33.75, 40.5 and 45.9 s.
   Every transition is 12 frames, so each sequence (except the last) runs 12 frames past the next scene's start. */
export const DAY13_DURATION = 54.5;
const TR = linearTiming({durationInFrames: 12, easing: INOUT});
export const CUTS13 = [6.4, 14.0, 20.5, 27.2, 33.75, 40.5, 45.9];

const Progress: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', top: 0, left: 0, height: 10, background: C.amber, opacity: 0.9, width: `${interpolate(f, [0, s(DAY13_DURATION)], [0, 100], CL)}%`}} />;
};

export const Day13: React.FC = () => (
  <AbsoluteFill style={{background: C.night}}>
    <Audio src={staticFile('voice/day13.wav')} volume={1} />
    <Audio src={staticFile('sfx/music_day13.wav')} volume={(f) => interpolate(f, [0, s(51.7), s(52.3), s(DAY13_DURATION)], [0.13, 0.13, 0.32, 0.32], CL)} />
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={204}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={TR} />
      <TransitionSeries.Sequence name="Rule" durationInFrames={240}>
        <Rule />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({direction: 'from-left'})} timing={TR} />
      <TransitionSeries.Sequence name="Sign 1" durationInFrames={207}>
        <Sign1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Sign 2" durationInFrames={213}>
        <Sign2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="Sign 3" durationInFrames={209}>
        <Sign3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={TR} />
      <TransitionSeries.Sequence name="The move" durationInFrames={214}>
        <Move />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="Punch" durationInFrames={174}>
        <Punch />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={TR} />
      <TransitionSeries.Sequence name="End" durationInFrames={258}>
        <End />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    {CUTS13.map((c) => (
      <Sfx key={c} at={c} name="whoosh" volume={0.22} />
    ))}
    <Progress />
  </AbsoluteFill>
);

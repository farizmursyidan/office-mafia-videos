import React from 'react';
import {Composition, Folder} from 'remotion';
import './theme';
import {Day3, DAY3_DURATION} from './Day3';
import {Day4, DAY4_DURATION} from './Day4';
import {Day5, DAY5_DURATION} from './Day5';
import {Day6, DAY6_DURATION} from './Day6';
import {Day7, DAY7_DURATION} from './Day7';
import {Day8, DAY8_DURATION} from './Day8';
import {Day9, DAY9_DURATION} from './Day9';
import {Day10, DAY10_DURATION} from './Day10';
import {Day11, DAY11_DURATION} from './Day11';
import {Day12, DAY12_DURATION} from './Day12';
import {Day13, DAY13_DURATION} from './Day13';
import {Hook as D13Hook} from './day13/Hook';
import {Rule as D13Rule} from './day13/Rule';
import {Sign1 as D13Sign1} from './day13/Sign1';
import {Sign2 as D13Sign2} from './day13/Sign2';
import {Sign3 as D13Sign3} from './day13/Sign3';
import {Move as D13Move} from './day13/Move';
import {Punch as D13Punch, End as D13End} from './day13/Outro';
import {Day14, DAY14_DURATION, SCENES14} from './Day14';
import {Hook as D14Hook} from './day14/Hook';
import {Rule as D14Rule} from './day14/Rule';
import {Move1 as D14Move1} from './day14/Move1';
import {Move2 as D14Move2} from './day14/Move2';
import {Move3 as D14Move3} from './day14/Move3';
import {Punch as D14Punch, End as D14End} from './day14/Outro';
import {Day15, DAY15_DURATION, SCENES15} from './Day15';
import {Hook as D15Hook} from './day15/Hook';
import {Rule as D15Rule} from './day15/Rule';
import {Move1 as D15Move1} from './day15/Move1';
import {Move2 as D15Move2} from './day15/Move2';
import {Move3 as D15Move3} from './day15/Move3';
import {Punch as D15Punch, End as D15End} from './day15/Outro';
import {CharTest} from './CharTest';
import {FPS, s} from './theme';

export const Root: React.FC = () => (
  <>
    <Composition id="Day3" component={Day3} durationInFrames={s(DAY3_DURATION)} fps={FPS} width={1080} height={1920} />
    <Composition id="Day4" component={Day4} durationInFrames={s(DAY4_DURATION)} fps={FPS} width={1080} height={1920} />
    <Composition id="Day5" component={Day5} durationInFrames={s(DAY5_DURATION)} fps={FPS} width={1080} height={1920} />
    <Composition id="Day6" component={Day6} durationInFrames={s(DAY6_DURATION)} fps={FPS} width={1080} height={1920} />
    <Composition id="Day7" component={Day7} durationInFrames={s(DAY7_DURATION)} fps={FPS} width={1080} height={1920} />
    <Composition id="Day8" component={Day8} durationInFrames={s(DAY8_DURATION)} fps={FPS} width={1080} height={1920} />
    <Composition id="Day9" component={Day9} durationInFrames={s(DAY9_DURATION)} fps={FPS} width={1080} height={1920} />
    <Composition id="Day10" component={Day10} durationInFrames={s(DAY10_DURATION)} fps={FPS} width={1080} height={1920} />
    <Composition id="Day11" component={Day11} durationInFrames={s(DAY11_DURATION)} fps={FPS} width={1080} height={1920} />
    <Composition id="Day12" component={Day12} durationInFrames={s(DAY12_DURATION)} fps={FPS} width={1080} height={1920} />
    <Composition id="Day13" component={Day13} durationInFrames={s(DAY13_DURATION)} fps={FPS} width={1080} height={1920} />
    <Folder name="Day13-Scenes">
      <Composition id="D13-Hook" component={D13Hook} durationInFrames={204} fps={FPS} width={1080} height={1920} />
      <Composition id="D13-Rule" component={D13Rule} durationInFrames={240} fps={FPS} width={1080} height={1920} />
      <Composition id="D13-Sign1" component={D13Sign1} durationInFrames={207} fps={FPS} width={1080} height={1920} />
      <Composition id="D13-Sign2" component={D13Sign2} durationInFrames={213} fps={FPS} width={1080} height={1920} />
      <Composition id="D13-Sign3" component={D13Sign3} durationInFrames={209} fps={FPS} width={1080} height={1920} />
      <Composition id="D13-Move" component={D13Move} durationInFrames={214} fps={FPS} width={1080} height={1920} />
      <Composition id="D13-Punch" component={D13Punch} durationInFrames={174} fps={FPS} width={1080} height={1920} />
      <Composition id="D13-End" component={D13End} durationInFrames={258} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Composition id="Day14" component={Day14} durationInFrames={s(DAY14_DURATION)} fps={FPS} width={1080} height={1920} />
    <Folder name="Day14-Scenes">
      <Composition id="D14-Hook" component={D14Hook} durationInFrames={SCENES14.Hook} fps={FPS} width={1080} height={1920} />
      <Composition id="D14-Rule" component={D14Rule} durationInFrames={SCENES14.Rule} fps={FPS} width={1080} height={1920} />
      <Composition id="D14-Move1" component={D14Move1} durationInFrames={SCENES14.Move1} fps={FPS} width={1080} height={1920} />
      <Composition id="D14-Move2" component={D14Move2} durationInFrames={SCENES14.Move2} fps={FPS} width={1080} height={1920} />
      <Composition id="D14-Move3" component={D14Move3} durationInFrames={SCENES14.Move3} fps={FPS} width={1080} height={1920} />
      <Composition id="D14-Punch" component={D14Punch} durationInFrames={SCENES14.Punch} fps={FPS} width={1080} height={1920} />
      <Composition id="D14-End" component={D14End} durationInFrames={SCENES14.End} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Composition id="Day15" component={Day15} durationInFrames={s(DAY15_DURATION)} fps={FPS} width={1080} height={1920} />
    <Folder name="Day15-Scenes">
      <Composition id="D15-Hook" component={D15Hook} durationInFrames={SCENES15.Hook} fps={FPS} width={1080} height={1920} />
      <Composition id="D15-Rule" component={D15Rule} durationInFrames={SCENES15.Rule} fps={FPS} width={1080} height={1920} />
      <Composition id="D15-Move1" component={D15Move1} durationInFrames={SCENES15.Move1} fps={FPS} width={1080} height={1920} />
      <Composition id="D15-Move2" component={D15Move2} durationInFrames={SCENES15.Move2} fps={FPS} width={1080} height={1920} />
      <Composition id="D15-Move3" component={D15Move3} durationInFrames={SCENES15.Move3} fps={FPS} width={1080} height={1920} />
      <Composition id="D15-Punch" component={D15Punch} durationInFrames={SCENES15.Punch} fps={FPS} width={1080} height={1920} />
      <Composition id="D15-End" component={D15End} durationInFrames={SCENES15.End} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Composition id="CharTest" component={CharTest} durationInFrames={60} fps={FPS} width={1080} height={1920} />
  </>
);

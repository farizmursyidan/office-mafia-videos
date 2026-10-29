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
    <Composition id="CharTest" component={CharTest} durationInFrames={60} fps={FPS} width={1080} height={1920} />
  </>
);

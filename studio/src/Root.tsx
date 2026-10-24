import React from 'react';
import {Composition} from 'remotion';
import './theme';
import {Day3, DAY3_DURATION} from './Day3';
import {Day4, DAY4_DURATION} from './Day4';
import {Day5, DAY5_DURATION} from './Day5';
import {Day6, DAY6_DURATION} from './Day6';
import {Day7, DAY7_DURATION} from './Day7';
import {Day8, DAY8_DURATION} from './Day8';
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
    <Composition id="CharTest" component={CharTest} durationInFrames={60} fps={FPS} width={1080} height={1920} />
  </>
);

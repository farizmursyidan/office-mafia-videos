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
import {Day16, DAY16_DURATION, SCENES16} from './Day16';
import {Hook as D16Hook} from './day16/Hook';
import {Rule as D16Rule} from './day16/Rule';
import {Move1 as D16Move1} from './day16/Move1';
import {Move2 as D16Move2} from './day16/Move2';
import {Move3 as D16Move3} from './day16/Move3';
import {Punch as D16Punch, End as D16End} from './day16/Outro';
import {Day17, DAY17_DURATION, SCENES17} from './Day17';
import {Hook as D17Hook} from './day17/Hook';
import {Rule as D17Rule} from './day17/Rule';
import {Move1 as D17Move1} from './day17/Move1';
import {Move2 as D17Move2} from './day17/Move2';
import {Move3 as D17Move3} from './day17/Move3';
import {Punch as D17Punch, End as D17End} from './day17/Outro';
import {Day18, DAY18_DURATION, SCENES18} from './Day18';
import {Hook as D18Hook} from './day18/Hook';
import {Rule as D18Rule} from './day18/Rule';
import {Move1 as D18Move1} from './day18/Move1';
import {Move2 as D18Move2} from './day18/Move2';
import {Move3 as D18Move3} from './day18/Move3';
import {Punch as D18Punch, End as D18End} from './day18/Outro';
import {Day19, DAY19_DURATION, SCENES19} from './Day19';
import {Hook as D19Hook} from './day19/Hook';
import {Rule as D19Rule} from './day19/Rule';
import {Move1 as D19Move1} from './day19/Move1';
import {Move2 as D19Move2} from './day19/Move2';
import {Move3 as D19Move3} from './day19/Move3';
import {Punch as D19Punch, End as D19End} from './day19/Outro';
import {Day20, DAY20_DURATION, SCENES20} from './Day20';
import {Hook as D20Hook} from './day20/Hook';
import {Rule as D20Rule} from './day20/Rule';
import {Move1 as D20Move1} from './day20/Move1';
import {Move2 as D20Move2} from './day20/Move2';
import {Move3 as D20Move3} from './day20/Move3';
import {Punch as D20Punch, End as D20End} from './day20/Outro';
import {Day21, DAY21_DURATION, SCENES21} from './Day21';
import {Hook as D21Hook} from './day21/Hook';
import {Rule as D21Rule} from './day21/Rule';
import {Move1 as D21Move1} from './day21/Move1';
import {Move2 as D21Move2} from './day21/Move2';
import {Move3 as D21Move3} from './day21/Move3';
import {Punch as D21Punch, End as D21End} from './day21/Outro';
import {Day22, DAY22_DURATION, SCENES22} from './Day22';
import {Hook as D22Hook} from './day22/Hook';
import {Rule as D22Rule} from './day22/Rule';
import {Move1 as D22Move1} from './day22/Move1';
import {Move2 as D22Move2} from './day22/Move2';
import {Move3 as D22Move3} from './day22/Move3';
import {Punch as D22Punch, End as D22End} from './day22/Outro';
import {Day23, DAY23_DURATION, SCENES23} from './Day23';
import {Hook as D23Hook} from './day23/Hook';
import {Rule as D23Rule} from './day23/Rule';
import {Move1 as D23Move1} from './day23/Move1';
import {Move2 as D23Move2} from './day23/Move2';
import {Move3 as D23Move3} from './day23/Move3';
import {Punch as D23Punch, End as D23End} from './day23/Outro';
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
    <Composition id="Day16" component={Day16} durationInFrames={s(DAY16_DURATION)} fps={FPS} width={1080} height={1920} />
    <Folder name="Day16-Scenes">
      <Composition id="D16-Hook" component={D16Hook} durationInFrames={SCENES16.Hook} fps={FPS} width={1080} height={1920} />
      <Composition id="D16-Rule" component={D16Rule} durationInFrames={SCENES16.Rule} fps={FPS} width={1080} height={1920} />
      <Composition id="D16-Move1" component={D16Move1} durationInFrames={SCENES16.Move1} fps={FPS} width={1080} height={1920} />
      <Composition id="D16-Move2" component={D16Move2} durationInFrames={SCENES16.Move2} fps={FPS} width={1080} height={1920} />
      <Composition id="D16-Move3" component={D16Move3} durationInFrames={SCENES16.Move3} fps={FPS} width={1080} height={1920} />
      <Composition id="D16-Punch" component={D16Punch} durationInFrames={SCENES16.Punch} fps={FPS} width={1080} height={1920} />
      <Composition id="D16-End" component={D16End} durationInFrames={SCENES16.End} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Composition id="Day17" component={Day17} durationInFrames={s(DAY17_DURATION)} fps={FPS} width={1080} height={1920} />
    <Folder name="Day17-Scenes">
      <Composition id="D17-Hook" component={D17Hook} durationInFrames={SCENES17.Hook} fps={FPS} width={1080} height={1920} />
      <Composition id="D17-Rule" component={D17Rule} durationInFrames={SCENES17.Rule} fps={FPS} width={1080} height={1920} />
      <Composition id="D17-Move1" component={D17Move1} durationInFrames={SCENES17.Move1} fps={FPS} width={1080} height={1920} />
      <Composition id="D17-Move2" component={D17Move2} durationInFrames={SCENES17.Move2} fps={FPS} width={1080} height={1920} />
      <Composition id="D17-Move3" component={D17Move3} durationInFrames={SCENES17.Move3} fps={FPS} width={1080} height={1920} />
      <Composition id="D17-Punch" component={D17Punch} durationInFrames={SCENES17.Punch} fps={FPS} width={1080} height={1920} />
      <Composition id="D17-End" component={D17End} durationInFrames={SCENES17.End} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Composition id="Day18" component={Day18} durationInFrames={s(DAY18_DURATION)} fps={FPS} width={1080} height={1920} />
    <Folder name="Day18-Scenes">
      <Composition id="D18-Hook" component={D18Hook} durationInFrames={SCENES18.Hook} fps={FPS} width={1080} height={1920} />
      <Composition id="D18-Rule" component={D18Rule} durationInFrames={SCENES18.Rule} fps={FPS} width={1080} height={1920} />
      <Composition id="D18-Move1" component={D18Move1} durationInFrames={SCENES18.Move1} fps={FPS} width={1080} height={1920} />
      <Composition id="D18-Move2" component={D18Move2} durationInFrames={SCENES18.Move2} fps={FPS} width={1080} height={1920} />
      <Composition id="D18-Move3" component={D18Move3} durationInFrames={SCENES18.Move3} fps={FPS} width={1080} height={1920} />
      <Composition id="D18-Punch" component={D18Punch} durationInFrames={SCENES18.Punch} fps={FPS} width={1080} height={1920} />
      <Composition id="D18-End" component={D18End} durationInFrames={SCENES18.End} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Composition id="Day19" component={Day19} durationInFrames={s(DAY19_DURATION)} fps={FPS} width={1080} height={1920} />
    <Folder name="Day19-Scenes">
      <Composition id="D19-Hook" component={D19Hook} durationInFrames={SCENES19.Hook} fps={FPS} width={1080} height={1920} />
      <Composition id="D19-Rule" component={D19Rule} durationInFrames={SCENES19.Rule} fps={FPS} width={1080} height={1920} />
      <Composition id="D19-Move1" component={D19Move1} durationInFrames={SCENES19.Move1} fps={FPS} width={1080} height={1920} />
      <Composition id="D19-Move2" component={D19Move2} durationInFrames={SCENES19.Move2} fps={FPS} width={1080} height={1920} />
      <Composition id="D19-Move3" component={D19Move3} durationInFrames={SCENES19.Move3} fps={FPS} width={1080} height={1920} />
      <Composition id="D19-Punch" component={D19Punch} durationInFrames={SCENES19.Punch} fps={FPS} width={1080} height={1920} />
      <Composition id="D19-End" component={D19End} durationInFrames={SCENES19.End} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Composition id="Day20" component={Day20} durationInFrames={s(DAY20_DURATION)} fps={FPS} width={1080} height={1920} />
    <Folder name="Day20-Scenes">
      <Composition id="D20-Hook" component={D20Hook} durationInFrames={SCENES20.Hook} fps={FPS} width={1080} height={1920} />
      <Composition id="D20-Rule" component={D20Rule} durationInFrames={SCENES20.Rule} fps={FPS} width={1080} height={1920} />
      <Composition id="D20-Move1" component={D20Move1} durationInFrames={SCENES20.Move1} fps={FPS} width={1080} height={1920} />
      <Composition id="D20-Move2" component={D20Move2} durationInFrames={SCENES20.Move2} fps={FPS} width={1080} height={1920} />
      <Composition id="D20-Move3" component={D20Move3} durationInFrames={SCENES20.Move3} fps={FPS} width={1080} height={1920} />
      <Composition id="D20-Punch" component={D20Punch} durationInFrames={SCENES20.Punch} fps={FPS} width={1080} height={1920} />
      <Composition id="D20-End" component={D20End} durationInFrames={SCENES20.End} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Composition id="Day21" component={Day21} durationInFrames={s(DAY21_DURATION)} fps={FPS} width={1080} height={1920} />
    <Folder name="Day21-Scenes">
      <Composition id="D21-Hook" component={D21Hook} durationInFrames={SCENES21.Hook} fps={FPS} width={1080} height={1920} />
      <Composition id="D21-Rule" component={D21Rule} durationInFrames={SCENES21.Rule} fps={FPS} width={1080} height={1920} />
      <Composition id="D21-Move1" component={D21Move1} durationInFrames={SCENES21.Move1} fps={FPS} width={1080} height={1920} />
      <Composition id="D21-Move2" component={D21Move2} durationInFrames={SCENES21.Move2} fps={FPS} width={1080} height={1920} />
      <Composition id="D21-Move3" component={D21Move3} durationInFrames={SCENES21.Move3} fps={FPS} width={1080} height={1920} />
      <Composition id="D21-Punch" component={D21Punch} durationInFrames={SCENES21.Punch} fps={FPS} width={1080} height={1920} />
      <Composition id="D21-End" component={D21End} durationInFrames={SCENES21.End} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Composition id="Day22" component={Day22} durationInFrames={s(DAY22_DURATION)} fps={FPS} width={1080} height={1920} />
    <Folder name="Day22-Scenes">
      <Composition id="D22-Hook" component={D22Hook} durationInFrames={SCENES22.Hook} fps={FPS} width={1080} height={1920} />
      <Composition id="D22-Rule" component={D22Rule} durationInFrames={SCENES22.Rule} fps={FPS} width={1080} height={1920} />
      <Composition id="D22-Move1" component={D22Move1} durationInFrames={SCENES22.Move1} fps={FPS} width={1080} height={1920} />
      <Composition id="D22-Move2" component={D22Move2} durationInFrames={SCENES22.Move2} fps={FPS} width={1080} height={1920} />
      <Composition id="D22-Move3" component={D22Move3} durationInFrames={SCENES22.Move3} fps={FPS} width={1080} height={1920} />
      <Composition id="D22-Punch" component={D22Punch} durationInFrames={SCENES22.Punch} fps={FPS} width={1080} height={1920} />
      <Composition id="D22-End" component={D22End} durationInFrames={SCENES22.End} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Composition id="Day23" component={Day23} durationInFrames={s(DAY23_DURATION)} fps={FPS} width={1080} height={1920} />
    <Folder name="Day23-Scenes">
      <Composition id="D23-Hook" component={D23Hook} durationInFrames={SCENES23.Hook} fps={FPS} width={1080} height={1920} />
      <Composition id="D23-Rule" component={D23Rule} durationInFrames={SCENES23.Rule} fps={FPS} width={1080} height={1920} />
      <Composition id="D23-Move1" component={D23Move1} durationInFrames={SCENES23.Move1} fps={FPS} width={1080} height={1920} />
      <Composition id="D23-Move2" component={D23Move2} durationInFrames={SCENES23.Move2} fps={FPS} width={1080} height={1920} />
      <Composition id="D23-Move3" component={D23Move3} durationInFrames={SCENES23.Move3} fps={FPS} width={1080} height={1920} />
      <Composition id="D23-Punch" component={D23Punch} durationInFrames={SCENES23.Punch} fps={FPS} width={1080} height={1920} />
      <Composition id="D23-End" component={D23End} durationInFrames={SCENES23.End} fps={FPS} width={1080} height={1920} />
    </Folder>
    <Composition id="CharTest" component={CharTest} durationInFrames={60} fps={FPS} width={1080} height={1920} />
  </>
);

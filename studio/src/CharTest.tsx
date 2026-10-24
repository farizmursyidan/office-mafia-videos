import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Person, Desk, Plant, OfficeBackdrop} from './characters';
export const CharTest: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: '#EDE8E0'}}>
      <svg width={1080} height={1920}>
        <OfficeBackdrop />
        <Plant x={980} y={1180} />
        <Desk x={300} y={1060} laptop />
        <Person x={300} y={1180} sitting shirt="#8A6FB8" hair="#5A3B22" hairStyle="bun" armR={70} armL={60} />
        <Person x={700} y={1180} walk={f / 4} shirt="#3F6FB5" />
        <Person x={900} y={1180} armR={120} shirt="#C2693E" facing={-1} hairStyle="long" badge="M" />
      </svg>
    </AbsoluteFill>
  );
};

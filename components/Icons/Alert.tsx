import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
import { memo } from "react";
const SvgAlert = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12 17.937 22.75 12 22.75 1.25 17.937 1.25 12M11 16c0-.552.446-1 .995-1h.01c.55 0 .995.448.995 1s-.446 1-.995 1h-.01A1 1 0 0 1 11 16m0-4a1 1 0 1 0 2 0V8a1 1 0 1 0-2 0z"
      clipRule="evenodd"
    />
  </Svg>
);
const Memo = memo(SvgAlert);
export default Memo;

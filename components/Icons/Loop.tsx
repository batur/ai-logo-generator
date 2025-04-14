import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
import { memo } from "react";
const SvgLoop = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={props.color ?? "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2"
    />
  </Svg>
);
const Memo = memo(SvgLoop);
export default Memo;

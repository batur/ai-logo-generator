import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
import { memo } from "react";
const SvgCancel = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={props.color ?? "#000"}
      d="M13.46 12 19 17.54V19h-1.46L12 13.46 6.46 19H5v-1.46L10.54 12 5 6.46V5h1.46L12 10.54 17.54 5H19v1.46z"
    />
  </Svg>
);
const Memo = memo(SvgCancel);
export default Memo;

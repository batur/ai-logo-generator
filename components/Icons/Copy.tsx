import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
import { memo } from "react";
const SvgCopy = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={props.color || "#A1A1AA"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.667 8.6v2.8c0 2.333-.934 3.267-3.267 3.267H4.6c-2.333 0-3.267-.934-3.267-3.267V8.6c0-2.333.934-3.267 3.267-3.267h2.8c2.333 0 3.267.934 3.267 3.267"
    />
    <Path
      stroke={props.color || "#A1A1AA"}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.667 4.6v2.8c0 2.333-.934 3.267-3.267 3.267h-.733V8.6c0-2.333-.934-3.267-3.267-3.267H5.333V4.6c0-2.333.934-3.267 3.267-3.267h2.8c2.333 0 3.267.934 3.267 3.267"
    />
  </Svg>
);
const Memo = memo(SvgCopy);
export default Memo;

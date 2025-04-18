import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
import { memo } from "react";
const SvgStars = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={props.color ?? "#000"}
      d="M12 2.25a.75.75 0 0 1 .75.75c0 2.006 1.01 4.075 2.593 5.657S18.993 11.25 21 11.25a.75.75 0 0 1 0 1.5c-2.006 0-4.075 1.01-5.657 2.593S12.75 18.993 12.75 21a.75.75 0 0 1-1.5 0c0-2.006-1.01-4.075-2.593-5.657S5.007 12.75 3 12.75a.75.75 0 0 1 0-1.5c2.006 0 4.075-1.01 5.657-2.593S11.25 5.007 11.25 3a.75.75 0 0 1 .75-.75"
      opacity={0.4}
    />
    <Path
      fill={props.color ?? "#000"}
      d="M19.25 1.25c.213 0 .398.148.445.356l.235 1.04c.16.71.714 1.264 1.424 1.424l1.04.235a.456.456 0 0 1 0 .89l-1.04.235c-.71.16-1.264.714-1.424 1.424l-.235 1.04a.457.457 0 0 1-.89 0l-.235-1.04a1.89 1.89 0 0 0-1.424-1.424l-1.04-.235a.456.456 0 0 1 0-.89l1.04-.235a1.89 1.89 0 0 0 1.424-1.424l.235-1.04a.46.46 0 0 1 .445-.356m-14.5 14.5c.213 0 .398.148.445.356l.235 1.04c.16.71.714 1.264 1.424 1.424l1.04.235a.457.457 0 0 1 0 .89l-1.04.235c-.71.16-1.264.714-1.424 1.424l-.235 1.04a.456.456 0 0 1-.89 0l-.235-1.04a1.89 1.89 0 0 0-1.424-1.424l-1.04-.235a.457.457 0 0 1 0-.89l1.04-.235a1.89 1.89 0 0 0 1.424-1.424l.235-1.04a.456.456 0 0 1 .445-.356"
    />
  </Svg>
);
const Memo = memo(SvgStars);
export default Memo;

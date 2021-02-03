import { css, cx } from "@emotion/css";
import List from "./List";
import Popover from "./Popover";

const mgRootCss = css``;

const mgLabelCss = css`
  font-size: 1.5em;
  text-transform: lowercase;
  user-select: none;
  color: #444;
  width: 100%;
  display: block;
  text-align: center;
  transition: all 0.2s linear;
  text-shadow: 2px 2px #eee;

  &:hover {
    color: #222;
    cursor: pointer;
  }
`;

export default function MgSelect({
  name,
  label,
  options,
  value,
  onChange,
  className,
}) {
  return (
    <Popover body={<List options={options} onClick={onChange} value={value} />}>
      <label htmlFor={name} className={cx(mgLabelCss, className)}>
        {label} &gt; {value}
      </label>
    </Popover>
  );
}

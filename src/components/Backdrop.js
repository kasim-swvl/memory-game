import { css, cx } from "@emotion/css";
import IfThen from "./IfThen";

const rootCss = css`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const curtainCss = css`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: transparent;
  z-index: 3;
  transition: all 0.2s linear;
`;

const bodyCss = css`
  z-index: 4;
`;

const dimCss = css`
  background-color: rgba(255, 255, 255, 0.4);
`;

export default function Backdrop({ visible, children }) {
  return (
    <IfThen condition={visible}>
      <div className={rootCss}>
        <div className={cx(curtainCss, dimCss)}></div>
        <div className={bodyCss}>{children}</div>
      </div>
    </IfThen>
  );
}

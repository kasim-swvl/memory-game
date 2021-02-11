import { css, cx } from "@emotion/css";

const iconBtnCss = css`
  border: none;
  background: transparent;
  display: inline;
  padding: 0px;
  margin: 0px;
  font-size: 1em;
  cursor: pointer;
  outline: none;
`;

const btnCss = css`
  background-color: #8cb4f0;
  border: 2px solid #7090c0;
  font-size: 2em;
  line-height: 1.2em;
  border-radius: 4px;
  width: 100%;
  padding: 4px 16px;
  font-family: "Sigmar One", "Passion One", sans-serif;
  color: white;
  outline: none;
  transition: all 0.2s;
  cursor: pointer;
  letter-spacing: 2px;
  text-shadow: 2px 2px #333;

  &:hover {
    background-color: #98bcf2;
  }

  &:focus {
    box-shadow: 0px 0px 10px 4px #8cb4f0;
  }

  &:active {
    background-color: #7ea2d8;
  }
`;

const secondaryBtnCss = css`
  background-color: #f08ca0;
  border: 2px solid #c07080;
  &:hover {
    background-color: #f298aa;
  }
  &:focus {
    box-shadow: 0px 0px 10px 4px #f08ca0;
  }
  &:active {
    background-color: #d87e90;
  }
`;

export default function MgButton({
  autoFocus,
  children,
  onClick,
  type,
  className,
}) {
  return (
    <button
      autoFocus={autoFocus}
      onClick={onClick}
      className={cx(btnCss, className, type === "secondary" && secondaryBtnCss)}
    >
      {children}
    </button>
  );
}

export function IconButton({ children, onClick, className }) {
  return (
    <button className={cx(iconBtnCss, className)} onClick={onClick}>
      {children}
    </button>
  );
}

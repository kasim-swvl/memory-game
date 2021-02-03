import { css, cx } from "@emotion/css";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../utils/useOnClickOutside";

const rootCss = css`
  position: relative;
`;

const anchorCss = css``;

const bodyCss = css`
  position: absolute;
  display: block;
  width: 100%;
  white-space: nowrap;
  display: none;
  margin-top: 2px;
  border-radius: 8px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  z-index: 2;
`;

const openCss = css`
  display: initial;
`;

export default function Popover({
  body,
  children,
  open = false,
  display = "block",
  placement = "left",
  onClick,
}) {
  const [_open, _setOpen] = useState(open);
  const rootRef = useRef(null);
  const anchorRef = useRef(null);
  const bodyRef = useRef(null);
  const isOpen = open || _open;
  useOnClickOutside(rootRef, () => close());

  const getStyle = () => {
    return placement === "left" ? {} : { right: 0 };
  };

  const close = () => {
    _setOpen(false);
  };

  const handleClick = () => {
    if (onClick) onClick();
    else _setOpen(s => !s);
  };

  useEffect(() => {
    if (anchorRef.current) {
      anchorRef.current.bbox = anchorRef.current.getBoundingClientRect();
    }
  }, []);

  return (
    <div className={rootCss} ref={rootRef}>
      <div
        ref={anchorRef}
        style={{ display }}
        className={anchorCss}
        onClick={handleClick}
      >
        {children}
      </div>
      <div
        ref={bodyRef}
        style={getStyle()}
        className={cx(bodyCss, isOpen && openCss)}
      >
        {body}
      </div>
    </div>
  );
}

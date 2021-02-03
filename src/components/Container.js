import { css } from "@emotion/css";

export default function Container({ maxWidth = "md", children }) {
  const _maxWidth = () => {
    switch (maxWidth) {
      case "xl":
        return 1600;
      case "lg":
        return 1200;
      case "md":
        return 960;
      case "sm":
        return 750;
      case "xs":
        return 400;
      default:
        return 960;
    }
  };

  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
      `}
    >
      <div
        className={css`
          width: ${_maxWidth()}px;
          padding: 12px;
        `}
      >
        {children}
      </div>
    </div>
  );
}

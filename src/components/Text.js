import { createElement } from "react";

export default function Text({
  component = "div",
  children,
  className,
  style,
}) {
  return createElement(component, { className, style }, children);
}

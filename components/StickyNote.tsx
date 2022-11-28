import classNames from "classnames";
import React, { useEffect, useState } from "react";

import ContentEditable from "./ContentEditable";

import styles from "./StickyNote.module.scss";

const StickyNote: React.FC<Props> = ({
  selected,
  position = [0, 0],
  size = [200, 200],
  text,
  onSelectedChange,
  onPositionChange,
  onTextChange,
}) => {
  const [dragging, setDragging] = useState(false);
  const [mouseDownPosition, setMouseDownPosition] = useState([0, 0]);

  useEffect(() => {
    const mouseup = (e: MouseEvent) => setDragging(false);
    window.addEventListener("mouseup", mouseup);

    const mousemove = (e: MouseEvent) =>
      dragging
        ? onPositionChange &&
          onPositionChange([
            e.clientX - mouseDownPosition[0],
            e.clientY - mouseDownPosition[1],
          ])
        : undefined;
    window.addEventListener("mousemove", mousemove);

    return () => {
      window.removeEventListener("mouseup", mouseup);
      window.removeEventListener("mousemove", mousemove);
    };
  }, [dragging, mouseDownPosition, onPositionChange]);

  return (
    <div
      className={classNames(styles.container, {
        [styles.selected]: selected,
        [styles.dragging]: dragging,
      })}
      style={{
        top: position[1],
        left: position[0],
        width: size[0],
        height: size[1],
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setMouseDownPosition([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
        setDragging(true);
      }}
      onMouseUp={(e) => {
        onSelectedChange(true);
      }}
    >
      <ContentEditable
        selected={selected}
        text={text}
        onTextChange={onTextChange}
      />
      {!selected && <div className={styles.overlay} />}
    </div>
  );
};

interface Props {
  selected?: boolean;
  position?: [number, number];
  size?: [number, number];
  text?: string;
  onSelectedChange: (selected: boolean) => void;
  onTextChange?: (text: string) => void;
  onPositionChange?: (position: [number, number]) => void;
}

export default StickyNote;

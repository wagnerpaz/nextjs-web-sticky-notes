import * as React from "react";
import classNames from "classnames";

import styles from "./ContentEditable.module.scss";

export default class ContentEditable extends React.Component<Props> {
  private _root: HTMLDivElement; // Ref to the editable div
  private _mutationObserver: MutationObserver; // Modifications observer
  private _innerTextBuffer: string; // Stores the last printed value

  public componentDidMount() {
    this._root.innerText = this.props.text || "";

    this._mutationObserver = new MutationObserver(this.onContentChange);
    this._mutationObserver.observe(this._root, {
      childList: true, // To check for new lines
      subtree: true, // To check for nested elements
      characterData: true, // To check for text modifications
    });
    this._root.addEventListener("mousedown", (e) => {
      if (this.props.selected) {
        e.stopPropagation();
      }
    });
  }

  public render() {
    if (this._root?.contentEditable) {
      if (this.props.selected) {
        this._root.contentEditable = "true";
      } else {
        this._root.contentEditable = "false";
      }
    }
    return (
      <div
        ref={this.onRootRef}
        className={classNames(styles.container, {
          [styles.containerSelected]: this.props.selected,
        })}
      />
    );
  }

  private onContentChange: MutationCallback = (mutations: MutationRecord[]) => {
    mutations.forEach(() => {
      // Get the text from the editable div
      // (Use innerHTML to get the HTML)
      const { innerText } = this._root;

      // Content changed will be triggered several times for one key stroke
      if (!this._innerTextBuffer || this._innerTextBuffer !== innerText) {
        if (this.props.onTextChange) {
          this.props.onTextChange(innerText);
        }
        this._innerTextBuffer = innerText;
      }
    });
  };

  private onRootRef = (elt: HTMLDivElement) => {
    if (elt) {
      this._root = elt;
      elt.textContent = this._innerTextBuffer;
    }
  };
}

interface Props {
  selected?: boolean;
  text?: string;
  onTextChange?: (text: string) => void;
}

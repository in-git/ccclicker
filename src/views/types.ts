export type ProgramStatus = "stopped" | "running";
export type Mode = "longPress" | "auto";

export type IKeyboardEvent = {
  key: string;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
  isPress: boolean;
};
export interface ProgramConfig {
  shortcutKey: string;
  startKey: string;
  interval: number;
  mode: Mode;
  triggerKey: "left" | "right" | "middle"; // 触发按键
}
export interface ClickStatus {
  isRunning: boolean;
  isClicking: boolean;
  isTriggered: boolean;
  isLongPressKeyPressed: boolean;
}


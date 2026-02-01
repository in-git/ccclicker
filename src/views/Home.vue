<template>
  <div tabindex="0" autofocus
    class="outline-none w-[680px] h-[500px] mx-auto overflow-hidden flex flex-col bg-gray-100 gap-2" @keydown="start"
    @keyup="handleKeyUp" @contextmenu.prevent>
    <div class="w-full px-4 mx-auto flex-1 flex flex-col justify-between">
      <div class="flex flex-col items-center justify-between gap-2">
        <ModeSelector v-model="programConfig.mode" @change="handleModeChange" />
        <Settings @change="handleConfigChange" :config="programConfig" :clickStatus="clickStatus" />
      </div>
      <StartButton :isStart="clickStatus.isRunning" :isTriggered="comIsTriggered" />
    </div>

    <FooterVue :isTriggered="comIsTriggered" />
  </div>
</template>

<script setup lang="ts">
import { invoke } from "@tauri-apps/api/core";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { computed, onMounted, onUnmounted } from "vue";
import ModeSelector from "./components/ModeSelector.vue";
import StartButton from "./components/StartButton.vue";
import {
  clickStatus,
  defaultConfig,
  defClickStatus,
  programConfig,
} from "./data";
import FooterVue from "./footer/Footer.vue";
import Settings from "./settings/Settings.vue";
import { IKeyboardEvent } from "./types";

let intervalId: NodeJS.Timeout | undefined;
let unlisten: UnlistenFn | undefined = undefined;

async function loadConfig() {
  try {
    const savedConfig = await invoke<any>("load_config");
    programConfig.value = {
      ...defaultConfig,
      ...savedConfig,
    };
  } catch (error) {
    console.error("Failed to load config:", error);
  }
}

const parseHotkey = (hotkey: string) => {
  const parts = hotkey.split("+").map((p) => p.toLowerCase().trim());
  const key = parts[parts.length - 1];
  const ctrl = parts.includes("ctrl");
  const alt = parts.includes("alt");
  const shift = parts.includes("shift");
  const meta =
    parts.includes("meta") ||
    parts.includes("win") ||
    parts.includes("command");
  return { key, ctrl, alt, shift, meta };
};

const compareHotkeys = (configKey: string, event: IKeyboardEvent) => {
  const parsed = parseHotkey(configKey);
  return (
    parsed.key.toLowerCase() === event.key.toLowerCase() &&
    parsed.ctrl === event.ctrl &&
    parsed.alt === event.alt &&
    parsed.shift === event.shift &&
    parsed.meta === event.meta
  );
};

const start = () => {
  const targetKey = window.event as KeyboardEvent;
  runByKey({
    key: targetKey.key,
    ctrl: targetKey.ctrlKey,
    alt: targetKey.altKey,
    shift: targetKey.shiftKey,
    meta: targetKey.metaKey,
    isPress: true,
  });
};

const runByKey = (event: IKeyboardEvent) => {
  /* 启动键 */
  if (compareHotkeys(programConfig.value.startKey, event)) {
    window.event?.preventDefault();
    if (event.isPress) {
      changeStatus();
    }
    return
  }
  /* 触发键 */
  if (compareHotkeys(programConfig.value.shortcutKey, event)) {
    window.event?.preventDefault();
    if (!clickStatus.value.isRunning) {
      restartInterval();
      return;
    }
    if (programConfig.value.mode === "auto") {
      if (event.isPress) {
        clickStatus.value.isTriggered = !clickStatus.value.isTriggered;
      }
    } else {
      clickStatus.value.isLongPressKeyPressed = event.isPress;
    }
  }
};
const handleKeyUp = () => {
  const targetKey = window.event as KeyboardEvent;
  const event: IKeyboardEvent = {
    key: targetKey.key,
    ctrl: targetKey.ctrlKey,
    alt: targetKey.altKey,
    shift: targetKey.shiftKey,
    meta: targetKey.metaKey,
    isPress: false,
  };
  if (compareHotkeys(programConfig.value.shortcutKey, event)) {
    clickStatus.value.isLongPressKeyPressed = false;
  }
};
async function saveConfig() {
  try {
    await invoke("save_config", {
      config: {
        ...programConfig.value,
      },
    });
  } catch (error) {
    console.error("Failed to save config:", error);
  }
}

async function handleConfigChange() {
  await saveConfig();
  // 切换模式时停止当前操作
  restartInterval();
}

async function handleModeChange(mode: "longPress" | "auto") {
  clickStatus.value.isLongPressKeyPressed = false;
  programConfig.value.mode = mode;
  clickStatus.value = {
    ...defClickStatus,
  };
  await saveConfig();
  // 切换模式时停止当前操作
  restartInterval();
}

async function getKeyboardEvent() {
  try {
    await invoke("start_keyboard_listener");
    unlisten = await listen("keyboard-event", (event: any) => {
      const keyEvent = event.payload as IKeyboardEvent;
      runByKey(keyEvent);
    });
  } catch (error) {
    console.error("Failed to start keyboard listener:", error);
  }
}

async function stopKeyboardListener() {
  try {
    await invoke("stop_keyboard_listener");
  } catch (error) {
    console.error("Failed to stop keyboard listener:", error);
  }
}

function changeStatus() {
  clickStatus.value.isRunning = !clickStatus.value.isRunning;
  if (!clickStatus.value.isRunning) {
    clickStatus.value.isClicking = false;
    clickStatus.value.isTriggered = false;
  }
}

/* 触发按键 */
const emitMouseClick = () => {
  invoke("perform_mouse_click", { button: programConfig.value.triggerKey });
};

const runSetInterval = () => {
  intervalId = setInterval(() => {
    if (programConfig.value.mode === "auto") {
      if (clickStatus.value.isTriggered) {
        emitMouseClick();
      }
    } else {
      if (clickStatus.value.isLongPressKeyPressed) {
        emitMouseClick();
      }
    }
  }, programConfig.value.interval);
};

const stopInterval = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = undefined;
  }
};

const restartInterval = () => {
  stopInterval();
  runSetInterval();
};
onMounted(async () => {
  await loadConfig();
  await getKeyboardEvent();
  runSetInterval();
});

onUnmounted(async () => {
  unlisten?.();
  runSetInterval();
  await stopKeyboardListener();
  stopInterval();
});

const comIsTriggered = computed(() => {
  return (
    clickStatus.value.isTriggered || clickStatus.value.isLongPressKeyPressed
  );
});
</script>

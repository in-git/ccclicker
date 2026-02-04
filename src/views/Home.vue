<template>
  <div tabindex="0" autofocus class="home-app" @keydown="handleKeydown" @keyup="handleKeyUp" @contextmenu.prevent>
    <div class=" px-4 mx-auto flex-1 flex gap-2  w-full ">
      <StatusDisplay />
      <div class="flex flex-col items-center  gap-2 flex-1">
        <ModeSelector v-model="programConfig.mode" @change="handleModeChange" />
        <Settings @change="handleConfigChange" />
      </div>
    </div>

    <FooterVue :isTriggered="comIsTriggered" />
  </div>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/store/config';
import { compareHotkeys } from '@/utils';
import { invoke } from "@tauri-apps/api/core";
import { listen, UnlistenFn } from "@tauri-apps/api/event";
import { computed, onMounted, onUnmounted } from "vue";
import ModeSelector from "./components/ModeSelector.vue";
import StatusDisplay from "./components/StatusDisplay.vue";
import {
  clickStatus,
  defClickStatus,
} from "./data";
import FooterVue from "./footer/Footer.vue";
import Settings from "./settings/Settings.vue";
import { IKeyboardEvent } from "./types";

let intervalId: NodeJS.Timeout | undefined;
let unlisten: UnlistenFn | undefined = undefined;

const configStore = useConfigStore();
const programConfig = computed(() => configStore.config);

async function loadConfig() {
  try {
    const savedConfig = await invoke<any>("load_config");
    configStore.updateConfig(savedConfig);
  } catch (error) {
    console.error("Failed to load config:", error);
  }
}

const getBrowserKey = (): IKeyboardEvent => {
  const targetKey = window.event as KeyboardEvent;
  return {
    key: targetKey.key,
    ctrl: targetKey.ctrlKey,
    alt: targetKey.altKey,
    shift: targetKey.shiftKey,
    meta: targetKey.metaKey,
    isPress: true,
  }
}

const keydownEvent = (event: IKeyboardEvent) => {
  /* 启动键 */
  if (compareHotkeys(event, programConfig.value.startKey)) {
    window.event?.preventDefault();
    if (event.isPress) {
      changeStatus();
    }
    return
  }
  /* 触发键 */
  if (compareHotkeys(event, programConfig.value.shortcutKey)) {
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

const keyupEvent = (event: IKeyboardEvent) => {
  if (programConfig.value.mode === "auto") {
    return
  }
  else {
    if (compareHotkeys(event, programConfig.value.shortcutKey)) {
      clickStatus.value.isLongPressKeyPressed = false;
    }
  }
};

async function saveConfig() {
  try {
    await invoke("save_config", {
      config: programConfig.value,
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
  configStore.updateConfig({ mode });
  clickStatus.value = {
    ...defClickStatus,
  };
  await saveConfig();
  restartInterval();
}

async function getKeyboardEvent() {
  try {
    await invoke("start_keyboard_listener");
    unlisten = await listen("keyboard-event", (event: any) => {
      const keyEvent = event.payload as IKeyboardEvent;

      if (!keyEvent.isPress) {
        keyupEvent(keyEvent)
      } else {
        keydownEvent(keyEvent);
      }
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

const handleKeydown = () => keydownEvent(getBrowserKey());

const handleKeyUp = () => keyupEvent(getBrowserKey());

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


<style lang="scss" scoped>
.home-app {
  @apply outline-none w-[680px] h-[500px] mx-auto overflow-hidden flex flex-col bg-gray-100 gap-2 pt-0;
}
</style>
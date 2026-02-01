<template>
  <li>
    <div class="label">启停热键</div>
    <div class="cursor-pointer">
      <Popover
        @openChange="onOpenChange"
        trigger="click"
        placement="bottomRight"
        v-model:open="popVisible"
      >
        <KeySvg :modelValue="modelValue" />
        <template #content>
          <div>
            <div class="mb-2">请输入启停热键</div>
            <input
              ref="inputRef"
              @keydown="onKeyDown"
              @blur="confirm"
              placeholder="例如：Ctrl+Shift+S"
              type="text"
              v-model="hotkey"
              class="hotkey"
            />
          </div>
        </template>
      </Popover>
    </div>
  </li>
</template>

<script setup lang="ts">
import { message, Popover } from "ant-design-vue";

const inputRef = useTemplateRef<HTMLInputElement>("inputRef");
let key = "";

const popVisible = ref(false);
const hotkey = ref("");

defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [];
}>();

const onOpenChange = (vis: boolean) => {
  if (vis) {
    setTimeout(() => {
      hotkey.value = "";
      key = "";
      inputRef.value?.focus();
    }, 5);
  }
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Backspace") {
    hotkey.value = "";
    return;
  }
  if (e.key === "Enter") {
    confirm();
    return;
  }
  e.preventDefault();
  let prefix = "";
  if (e.ctrlKey) {
    prefix = "Ctrl+";
  }
  if (e.shiftKey) {
    prefix += "Shift+";
  }
  if (e.altKey) {
    prefix += "Alt+";
  }
  if (e.key.length <= 2) {
    key = e.key;
  }
  hotkey.value = prefix + key;
};

const confirm = () => {
  if (!key) {
    return;
  }
  emit("update:modelValue", hotkey.value);
  popVisible.value = false;
  message.success("设置成功");
  emit("change");
};
</script>

<style lang="scss" scoped>

.hotkey {
  border: 1px solid #d1d1d1;
  @apply text-center w-[140px] h-[32px] rounded;
}
</style>

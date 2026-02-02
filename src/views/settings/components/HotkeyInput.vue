<template>
    <li>
        <div class="label">{{ label }}</div>
        <div class="cursor-pointer">
            <Popover @openChange="onOpenChange" trigger="click" placement="bottomRight" v-model:open="popVisible">
                <slot :value="modelValue">
                    <div class="default-key-display">{{ modelValue || '未设置' }}</div>
                </slot>

                <template #content>
                    <div class="p-1">
                        <div class="mb-2 text-gray-500 text-xs">{{ placeholder }}</div>
                        <input ref="inputRef" readonly @keydown="onKeyDown" @blur="handleBlur" placeholder="按下热键"
                            type="text" v-model="hotkey" class="hotkey-input-field" />
                    </div>
                </template>
            </Popover>
        </div>
    </li>
</template>

<script setup lang="ts">
import { Popover, message } from "ant-design-vue";
import { ref, useTemplateRef } from 'vue';
const modelValue = defineModel<string>();
const props = defineProps<{
    label: string;
    placeholder?: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
    "change": [value: string];
}>();

const inputRef = useTemplateRef<HTMLInputElement>("inputRef");
const popVisible = ref(false);
const hotkey = ref("");
let currentMainKey = "";

const onOpenChange = (vis: boolean) => {
    if (vis) {
        // 每次打开清空上次录制状态，聚焦输入框
        hotkey.value = "";
        currentMainKey = "";
        setTimeout(() => inputRef.value?.focus(), 50);
    }
};

const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. 特殊键处理
    if (e.key === "Backspace") {
        hotkey.value = "";
        currentMainKey = "";
        return;
    }
    if (e.key === "Enter") {
        if (hotkey.value) confirm();
        return;
    }

    // 2. 识别修饰键
    const modifiers = [];
    if (e.ctrlKey) modifiers.push("Ctrl");
    if (e.shiftKey) modifiers.push("Shift");
    if (e.altKey) modifiers.push("Alt");
    if (e.metaKey) modifiers.push("Meta");

    // 3. 识别主键
    const isModifierOnly = ["Control", "Shift", "Alt", "Meta"].includes(e.key);
    if (!isModifierOnly) {
        let mainKey = e.key;
        if (mainKey === " ") mainKey = "Space";
        if (mainKey.length === 1) mainKey = mainKey.toUpperCase();
        currentMainKey = mainKey;
    } else {
        currentMainKey = "";
    }

    // 4. 拼接显示
    const prefix = modifiers.join("+");
    if (currentMainKey) {
        hotkey.value = prefix ? `${prefix}+${currentMainKey}` : currentMainKey;
    } else {
        hotkey.value = prefix;
    }
};

const handleBlur = () => {
    // 如果用户有输入则确认，否则直接关闭
    if (hotkey.value) {
        confirm();
    } else {
        popVisible.value = false;
    }
};

const confirm = () => {
    if (!hotkey.value) return;
    emit("update:modelValue", hotkey.value);
    emit("change", hotkey.value);
    popVisible.value = false;
    message.success("设置成功");
};
</script>

<style lang="scss" scoped>
.hotkey-input-field {
    border: 1px solid #d1d1d1;
    outline: none;
    @apply text-center w-[160px] h-[32px] rounded text-sm bg-gray-50;

    &:focus {
        @apply border-blue-400 ring-1 ring-blue-100;
    }
}

.default-key-display {
    @apply px-2 py-1 border rounded bg-white min-w-[60px] text-center;
}
</style>
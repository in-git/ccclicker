// 快捷键处理工具函数

export interface KeyboardEventData {
  key: string;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
}

// 标准化键值
export function normalizeKey(key: string): string {
  if (key === ' ') return 'Space';
  if (key.length === 1) return key.toUpperCase();
  return key;
}

// 标准化修饰键顺序
export function normalizeModifiers(modifiers: string[]): string[] {
  const order = ['Ctrl', 'Shift', 'Alt', 'Meta'];
  return order.filter(mod => modifiers.includes(mod));
}

// 将键盘事件转换为快捷键字符串
export function keyEventToHotkey(event: KeyboardEvent | KeyboardEventData): string {
  const modifiers: string[] = [];

  // 处理不同类型的事件对象
  if ('ctrlKey' in event) {
    // 标准 KeyboardEvent
    if (event.ctrlKey) modifiers.push('Ctrl');
    if (event.shiftKey) modifiers.push('Shift');
    if (event.altKey) modifiers.push('Alt');
    if (event.metaKey) modifiers.push('Meta');
  } else {
    // 自定义 KeyboardEventData
    if (event.ctrl) modifiers.push('Ctrl');
    if (event.shift) modifiers.push('Shift');
    if (event.alt) modifiers.push('Alt');
    if (event.meta) modifiers.push('Meta');
  }

  // 检查是否只是修饰键
  const isModifierOnly = ['Control', 'Shift', 'Alt', 'Meta'].includes(event.key);

  if (isModifierOnly) {
    return normalizeModifiers(modifiers).join('+');
  }

  const mainKey = normalizeKey(event.key);
  const normalizedModifiers = normalizeModifiers(modifiers);

  if (normalizedModifiers.length > 0) {
    return `${normalizedModifiers.join('+')}+${mainKey}`;
  }

  return mainKey;
}

// 解析快捷键字符串
export function parseHotkey(hotkey: string): { modifiers: string[], mainKey: string } {
  const parts = hotkey.split('+').map(p => p.trim());
  const modifiers: string[] = [];
  let mainKey = '';

  for (const part of parts) {
    if (['Ctrl', 'Shift', 'Alt', 'Meta'].includes(part)) {
      modifiers.push(part);
    } else {
      mainKey = part;
    }
  }

  return {
    modifiers: normalizeModifiers(modifiers),
    mainKey: normalizeKey(mainKey)
  };
}

// 格式化快捷键显示
export function formatHotkey(hotkey: string): string {
  if (!hotkey) return '';

  const { modifiers, mainKey } = parseHotkey(hotkey);

  if (mainKey) {
    return modifiers.length > 0 ? `${modifiers.join('+')}+${mainKey}` : mainKey;
  }

  return modifiers.join('+');
}

// 比较两个快捷键是否相同
export function compareHotkeys(event: KeyboardEventData, targetHotkey: string): boolean {
  if (!targetHotkey) return false;

  const eventHotkey = keyEventToHotkey(event);
  const normalizedTarget = formatHotkey(targetHotkey.toLowerCase());
  const normalizedEvent = formatHotkey(eventHotkey.toLowerCase());

  return normalizedEvent === normalizedTarget;
}

// 检查是否为系统键
export function isSystemKey(key: string): boolean {
  return ['Ctrl', 'Alt', 'Shift', 'Meta', 'Control'].includes(key);
}
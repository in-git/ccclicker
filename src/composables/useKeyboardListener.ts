import { invoke } from '@tauri-apps/api/core';
import { listen, UnlistenFn } from '@tauri-apps/api/event';
import { onUnmounted, ref } from 'vue';

export interface KeyEvent {
  key_code: number;
  key_name: string;
  event_type: string;
}

export function useKeyboardListener() {
  const isListening = ref(false);
  const lastKeyEvent = ref<KeyEvent | null>(null);
  let unlistenFn: UnlistenFn | null = null;

  const startListening = async () => {
    try {
      console.log('Starting keyboard listener...');
      await invoke('start_keyboard_listener');
      isListening.value = true;
      console.log('Keyboard listener started, setting up event listener...');

      unlistenFn = await listen<KeyEvent>('keyboard-event', (event) => {
        console.log('Received keyboard event:', event);
        lastKeyEvent.value = event.payload;
      });
      console.log('Event listener set up');
    } catch (error) {
      console.error('Failed to start keyboard listener:', error);
      throw error;
    }
  };

  const stopListening = async () => {
    try {
      console.log('Stopping keyboard listener...');
      await invoke('stop_keyboard_listener');
      isListening.value = false;

      if (unlistenFn) {
        await unlistenFn();
        unlistenFn = null;
      }
      console.log('Keyboard listener stopped');
    } catch (error) {
      console.error('Failed to stop keyboard listener:', error);
      throw error;
    }
  };

  const checkListening = async () => {
    const listening = await invoke<boolean>('is_listening');
    isListening.value = listening;
    return listening;
  };

  onUnmounted(() => {
    if (unlistenFn) {
      unlistenFn();
    }
  });

  return {
    isListening,
    lastKeyEvent,
    startListening,
    stopListening,
    checkListening,
  };
}

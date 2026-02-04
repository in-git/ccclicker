import { invoke } from '@tauri-apps/api/core'

export function useTray() {
  const showWindow = async () => {
    try {
      await invoke('show_window')
    } catch (error) {
      console.error('Failed to show window:', error)
    }
  }

  const hideWindow = async () => {
    try {
      await invoke('hide_window')
    } catch (error) {
      console.error('Failed to hide window:', error)
    }
  }

  const minimizeToTray = async () => {
    try {
      await invoke('minimize_to_tray')
    } catch (error) {
      console.error('Failed to minimize to tray:', error)
    }
  }

  return {
    showWindow,
    hideWindow,
    minimizeToTray
  }
}
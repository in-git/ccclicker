use rdev::{listen, Event, EventType, Key};
use serde::{Deserialize, Serialize};
use std::sync::atomic::{AtomicBool, Ordering};
use std::thread;
use tauri::{AppHandle, Emitter};

// 使用原子位掩码管理修饰键状态，避免 Mutex 锁竞争
static CTRL_PRESSED: AtomicBool = AtomicBool::new(false);
static ALT_PRESSED: AtomicBool = AtomicBool::new(false);
static SHIFT_PRESSED: AtomicBool = AtomicBool::new(false);
static META_PRESSED: AtomicBool = AtomicBool::new(false);
static LISTENER_RUNNING: AtomicBool = AtomicBool::new(false);

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct KeyboardEvent {
    pub key: String,
    pub ctrl: bool,
    pub alt: bool,
    pub shift: bool,
    pub meta: bool,
    #[serde(rename = "rawCombination")]
    pub raw_combination: String,
    #[serde(rename = "isPress")]
    pub is_press: bool,
}

#[tauri::command]
pub fn start_keyboard_listener(app: AppHandle) -> Result<(), String> {
    if LISTENER_RUNNING.swap(true, Ordering::SeqCst) {
        return Err("Listener already active".into());
    }

    thread::spawn(move || {
        // 使用 listen 的包装，确保出错时重置状态
        if let Err(e) = listen(move |event| {
            if !LISTENER_RUNNING.load(Ordering::Relaxed) {
                return;
            }
            handle_event(&app, event);
        }) {
            eprintln!("Rdev Error: {:?}", e);
            LISTENER_RUNNING.store(false, Ordering::SeqCst);
        }
    });

    Ok(())
}

#[tauri::command]
pub fn stop_keyboard_listener() {
    LISTENER_RUNNING.store(false, Ordering::SeqCst);
}

fn handle_event(app: &AppHandle, event: Event) {
    match event.event_type {
        EventType::KeyPress(key) => {
            update_modifier(key, true);

            // 只有非修饰键按下时才触发事件（避免 Ctrl+Ctrl 这种情况）
            if !is_modifier(key) {
                let modifiers = get_modifiers();
                let key_name = format!("{:?}", key);

                let payload = KeyboardEvent {
                    key: key_name.clone(),
                    ctrl: modifiers.0,
                    alt: modifiers.1,
                    shift: modifiers.2,
                    meta: modifiers.3,
                    raw_combination: build_combo_string(&key_name, modifiers),
                    is_press: true,
                };

                let _ = app.emit("keyboard-event", payload);
            }
        }
        EventType::KeyRelease(key) => {
            update_modifier(key, false);

            // 只有非修饰键释放时才也触发事件
            if !is_modifier(key) {
                let modifiers = get_modifiers();
                let key_name = format!("{:?}", key);

                let payload = KeyboardEvent {
                    key: key_name.clone(),
                    ctrl: modifiers.0,
                    alt: modifiers.1,
                    shift: modifiers.2,
                    meta: modifiers.3,
                    raw_combination: build_combo_string(&key_name, modifiers),
                    is_press: false,
                };

                let _ = app.emit("keyboard-event", payload);
            }
        }
        _ => {}
    }
}

#[inline(always)]
fn update_modifier(key: Key, pressed: bool) {
    match key {
        Key::ControlLeft | Key::ControlRight => CTRL_PRESSED.store(pressed, Ordering::Relaxed),
        Key::Alt | Key::AltGr => ALT_PRESSED.store(pressed, Ordering::Relaxed),
        Key::ShiftLeft | Key::ShiftRight => SHIFT_PRESSED.store(pressed, Ordering::Relaxed),
        Key::MetaLeft | Key::MetaRight => META_PRESSED.store(pressed, Ordering::Relaxed),
        _ => {}
    }
}

#[inline(always)]
fn is_modifier(key: Key) -> bool {
    matches!(
        key,
        Key::ControlLeft | Key::ControlRight | Key::Alt | Key::AltGr |
        Key::ShiftLeft | Key::ShiftRight | Key::MetaLeft | Key::MetaRight
    )
}

fn get_modifiers() -> (bool, bool, bool, bool) {
    (
        CTRL_PRESSED.load(Ordering::Relaxed),
        ALT_PRESSED.load(Ordering::Relaxed),
        SHIFT_PRESSED.load(Ordering::Relaxed),
        META_PRESSED.load(Ordering::Relaxed),
    )
}

fn build_combo_string(key_str: &str, mods: (bool, bool, bool, bool)) -> String {
    let mut combo = String::with_capacity(20);
    if mods.0 { combo.push_str("Ctrl+"); }
    if mods.2 { combo.push_str("Shift+"); }
    if mods.1 { combo.push_str("Alt+"); }
    if mods.3 { combo.push_str("Meta+"); }
    combo.push_str(key_str);
    combo
}
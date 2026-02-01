mod info;
mod keyboard;
mod mouse;
mod storage;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            info::get_app_info,
            mouse::perform_mouse_click,
            storage::save_config,
            storage::load_config,
            storage::reset_config,
            keyboard::start_keyboard_listener,
            keyboard::stop_keyboard_listener
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

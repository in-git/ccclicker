use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct AppInfo {
    pub name: String,
    pub version: String,
    pub description: String,
}

#[tauri::command]
pub fn get_app_info() -> AppInfo {
    AppInfo {
        name: "Auto Clicker".to_string(),
        version: "0.1.0".to_string(),
        description: "桌面自动连点器应用".to_string(),
    }
}

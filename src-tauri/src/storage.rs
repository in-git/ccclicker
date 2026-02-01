use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

#[derive(Serialize, Deserialize, Clone)]
pub struct AppConfig {
    pub shortcut_key: String,
    pub start_key: String,
    pub stop_key: String,
    pub interval: u32,
    pub mode: String,
}

impl Default for AppConfig {
    fn default() -> Self {
        AppConfig {
            shortcut_key: "F6".to_string(),
            start_key: "F3".to_string(),
            stop_key: "Ctrl+F3".to_string(),
            interval: 500,
            mode: "auto".to_string(),
        }
    }
}

fn get_config_path(app: &AppHandle) -> PathBuf {
    let app_data_dir = app.path().app_data_dir().unwrap_or_else(|_| {
        std::env::current_dir().unwrap()
    });
    app_data_dir.join("config.json")
}

#[tauri::command]
pub fn save_config(app: AppHandle, config: AppConfig) -> Result<(), String> {
    let config_path = get_config_path(&app);

    let config_dir = config_path.parent().ok_or("Invalid config path")?;
    if !config_dir.exists() {
        fs::create_dir_all(config_dir).map_err(|e| format!("Failed to create config directory: {}", e))?;
    }

    let config_json = serde_json::to_string_pretty(&config)
        .map_err(|e| format!("Failed to serialize config: {}", e))?;

    fs::write(&config_path, config_json)
        .map_err(|e| format!("Failed to write config: {}", e))?;

    Ok(())
}

#[tauri::command]
pub fn load_config(app: AppHandle) -> Result<AppConfig, String> {
    let config_path = get_config_path(&app);

    if !config_path.exists() {
        let default_config = AppConfig::default();
        let _ = save_config(app.clone(), default_config.clone());
        return Ok(default_config);
    }

    let config_content = fs::read_to_string(&config_path)
        .map_err(|e| format!("Failed to read config: {}", e))?;

    let config: AppConfig = serde_json::from_str(&config_content)
        .map_err(|e| format!("Failed to parse config: {}", e))?;

    Ok(config)
}

#[tauri::command]
pub fn reset_config(app: AppHandle) -> Result<AppConfig, String> {
    let default_config = AppConfig::default();
    save_config(app, default_config.clone())?;
    Ok(default_config)
}

use rdev::{simulate, Button, EventType};

#[tauri::command]
pub fn perform_mouse_click(button: String) -> Result<(), String> {
    let button = match button.as_str() {
        "left" => Button::Left,
        "right" => Button::Right,
        "middle" => Button::Middle,
        _ => Button::Left,
    };
    let click_event = EventType::ButtonPress(button);
    let release_event = EventType::ButtonRelease(button);
    if let Err(e) = simulate(&click_event) {
        return Err(format!("Failed to simulate mouse click: {:?}", e));
    }
    if let Err(e) = simulate(&release_event) {
        return Err(format!("Failed to simulate mouse click: {:?}", e));
    }

    Ok(())
}

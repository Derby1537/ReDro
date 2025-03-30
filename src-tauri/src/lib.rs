// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

mod controller;
use crate::controller::is_controller_connected;
use crate::bluetooth::get_drones;
use crate::bluetooth::is_drone_connected;
mod bluetooth;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, is_controller_connected, get_drones, is_drone_connected])
        .setup(|app| {
            let app_handle = app.handle().clone();
            std::thread::spawn(move || {
                controller::listen_for_controllers(app_handle);
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

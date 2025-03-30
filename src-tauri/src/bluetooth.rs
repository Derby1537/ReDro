use serde::{Deserialize, Serialize};
use tauri::command;

#[derive(Clone, Serialize, Deserialize)]
pub(crate) struct Drone {
    id: String,
    name: String,
}

#[command]
pub fn get_drones() -> Vec<Drone> {
    vec! [
        Drone { id: "drone_1".to_string(), name: "DRN2100".to_string() },
        Drone { id: "drone_2".to_string(), name: "DRN2120".to_string() },
        Drone { id: "drone_3".to_string(), name: "DRN1100".to_string() },
    ]
}

#[command]
pub fn is_drone_connected() -> bool {
    false
}

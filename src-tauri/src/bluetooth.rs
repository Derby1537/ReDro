use std::time::Duration;

use btleplug::api::{Central, Manager as _, Peripheral};
use btleplug::platform::Manager;
use serde::{Deserialize, Serialize};
use tauri::command;

#[derive(Clone, Serialize, Deserialize)]
pub(crate) struct Drone {
    id: String,
    name: String,
}

#[command]
pub async fn get_drones() -> Vec<Drone> {
    let manager = Manager::new().await.unwrap();
    let adapters = manager.adapters().await.unwrap();

    if adapters.is_empty() {
        println!("Bluetooth is not available");
        return vec![];
    }

    let central = adapters[0].clone();

    central.start_scan(Default::default()).await.unwrap();
    tokio::time::sleep(Duration::from_secs(5)).await;
    let peripherals = central.peripherals().await.unwrap();

    let mut drones = Vec::new();
    for peripheral in peripherals {
        if let Some(properties) = peripheral.properties().await.unwrap() {
            let name = properties.local_name.unwrap_or_else(|| "".to_string());
            let id = peripheral.id().to_string();
            println!("Dispositivo {:?} con nome {:?}", id, name);

            if name.starts_with("DRN") {
                drones.push(Drone { id, name });
            }
        }
    }

    drones
}

#[command]
pub async fn is_drone_connected() -> bool {
    let manager = Manager::new().await.unwrap();
    let adapters = manager.adapters().await.unwrap();

    if adapters.is_empty() {
        println!("Bluetooth is not available");
        return false;
    }

    let central = adapters[0].clone();
    //let peripherals = central.periph
    false
}

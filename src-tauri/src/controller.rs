use gilrs::{Gilrs, Event};
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, sync::{Arc, Mutex}};
use tauri::{AppHandle, Emitter};

lazy_static::lazy_static! {
    static ref GILRS_INSTANCE: Arc<Mutex<Gilrs>> = Arc::new(Mutex::new(Gilrs::new().unwrap()));
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ControllerConfig {
    mappings: HashMap<String, String>
}

fn default_mappings() -> ControllerConfig {
    let mut mappings = HashMap::new();
    mappings.insert("throttle".to_string(), "RightTrigger2".to_string());
    mappings.insert("yawLeft".to_string(), "leftTrigger".to_string());
    mappings.insert("yawRight".to_string(), "RightTrigger".to_string());
    mappings.insert("roll".to_string(), "LeftStickX".to_string());
    mappings.insert("pitch".to_string(), "LeftStickY".to_string());

    ControllerConfig { mappings }
}

pub fn listen_for_controllers(app: AppHandle) -> ! {
    let gilrs = GILRS_INSTANCE.clone();

    loop {
        let mut gilrs = gilrs.lock().unwrap();
        while let Some(Event { id: _, event, .. }) = gilrs.next_event() {
            match event {
                gilrs::EventType::ButtonPressed(button, _) => {
                    //println!("Pulsante {:?} premuto", button);
                    app.emit("button_pressed", format!("{:?}", button)).unwrap();
                },
                gilrs::EventType::ButtonChanged(button, value, _) => {
                    //println!("Pulsante {:?} premuto", button);
                    app.emit("button_changed", format!("{:?} {:?}", button, value)).unwrap();
                },
                gilrs::EventType::ButtonReleased(button, _) => {
                    //println!("Pulsante {:?} rilasciato", button);
                    app.emit("button_released", format!("{:?}", button)).unwrap();
                },
                gilrs::EventType::AxisChanged(axis, value, _) => {
                    //println!("Asse {:?} cambiato, nuovo valore: {:?}", axis, value);
                    app.emit("axis_changed", format!("{:?} {:?}", axis, value)).unwrap();
                },
                _ => {}
            }
        }

    }
}

#[tauri::command]
pub fn is_controller_connected() -> bool {
    let gilrs = GILRS_INSTANCE.lock().unwrap();
    gilrs.gamepads().count() > 0
}



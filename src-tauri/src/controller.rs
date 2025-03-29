use gilrs::{Gilrs, Event};
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Emitter};

lazy_static::lazy_static! {
    static ref GILRS_INSTANCE: Arc<Mutex<Gilrs>> = Arc::new(Mutex::new(Gilrs::new().unwrap()));
}

pub fn listen_for_controllers(app: AppHandle) -> ! {
    let gilrs = GILRS_INSTANCE.clone();

    loop {
        let mut gilrs = gilrs.lock().unwrap();
        while let Some(Event { id: _, event, .. }) = gilrs.next_event() {
            if let gilrs::EventType::ButtonPressed(button, _) = event {
                println!("Pulsante {:?} premuto", button);
                app.emit("button_pressed", format!("{:?}", button)).unwrap();

            }
            if let gilrs::EventType::ButtonReleased(button, _) = event {
                println!("Pulsante {:?} rilasciato", button);
                app.emit("button_released", format!("{:?}", button)).unwrap();
            }
        }

    }
}

#[tauri::command]
pub fn is_controller_connected() -> bool {
    let gilrs = GILRS_INSTANCE.lock().unwrap();
    gilrs.gamepads().count() > 0
}



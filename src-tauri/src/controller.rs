use gilrs::{Gilrs, Event, Button};
use tauri::{AppHandle, Emitter};

pub fn listen_for_controllers(app: AppHandle) -> ! {
    let mut gilrs = Gilrs::new().unwrap();

    if gilrs.gamepads().count() == 0 {
        app.emit("no_controller", ()).unwrap();
    }

    loop {
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

        if gilrs.gamepads().count() == 0 {
            app.emit("no_controller", ()).unwrap();
        }

    }
}



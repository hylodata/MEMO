import socket
import threading

# Define the nested menu structure. Maybe we can make this dynamic later?
menu_structure = {
    "Driver Menu": {
        "Social": {"action": "Show Social Options"},
        "Environmental": {
            "Acid Rain": {"action": "Show Acid Rain Years"},
            "Invasive Species": {"action": "Show Invasive Species Years"},
            "Biodiversity": {"action": "Show Biodiversity Years"},
            "Temperature": {"action": "Show Temperature Years"}, 
            "Precipitation": {
                "1980-1984": {"action": "Show Data for 1980-1984"},
                "1985-1989": {"action": "Show Data for 1985-1989"},
                "2000-2004": {"action": "Show Data for 2000-2004"},
                "2005-2009": {"action": "Show Data for 2005-2009"},
                "2010-2014": {"action": "Show Data for 2010-2014"},
            },
        },
        "Political": {"action": "Show Political Options"},
        "Demographic": {"action": "Show Demographic Options"},
        "Economic": {"action": "Show Economic Options"},
    }
}

# Dial state tracking.
dial_states = {}

def navigate_menu(dialID, direction):
    # Ensure the dial's state is initialized.
    if dialID not in dial_states:
        dial_states[dialID] = {"path": ["Driver Menu"], "selection": None, "history": []}

    state = dial_states[dialID]
    current_menu = get_current_menu(state["path"])

    if direction in ["CW", "CCW"]:
        # Handle cyclic navigation within the current menu.
        handle_navigation_within_menu(state, current_menu, direction)
    elif direction == "TE": 
        # Handle selection or deeper navigation.
        handle_selection(dialID, state, current_menu)
    elif direction == "BP":
        # Handle navigation back to the parent menu.
        handle_back_navigation(dialID, state)

    # Provide feedback on the current state.
    print_state(dialID, state)

def get_current_menu(path):
    # Traverse the menu structure according to the path.
    menu = menu_structure
    for step in path:
        menu = menu[step]
    return menu

def handle_selection(dialID, state, current_menu):
    selection = state["selection"]
    if selection and selection in current_menu:
        if "action" in current_menu[selection]:
            print(f"Dial {dialID} action: {current_menu[selection]['action']}")
        else:
            state["path"].append(selection)
            state["selection"] = list(current_menu[selection].keys())[0]
            state["history"].append(selection)
    else:
        state["selection"] = list(current_menu.keys())[0]

def handle_back_navigation(dialID, state):

    if len(state["path"]) > 1:
        # Remove the last entry in the path to move up in the menu hierarchy.
        state["path"].pop()
        # Update the current selection based on history.
        state["selection"] = state["history"].pop() if state["history"] else None
    else:
        print(f"Dial {dialID} is already at the root menu.")

def handle_navigation_within_menu(state, current_menu, direction):
    selections = list(current_menu.keys())
    current_index = selections.index(state["selection"]) if state["selection"] else -1
    if direction == "CW":
        new_index = (current_index + 1) % len(selections)
    else:  # CCW
        new_index = (current_index - 1) % len(selections)
    state["selection"] = selections[new_index]

def print_state(dialID, state):
    print(f"Dial {dialID} is now at {' > '.join(state['path'])}, hovering over {state['selection']}")

def start_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('0.0.0.0', 12345))
    server.listen(5)
    print("Server listening on port 12345...")

    while True:
        client_sock, address = server.accept()
        print(f"Accepted connection from {address[0]}:{address[1]}")
        threading.Thread(target=client_thread, args=(client_sock,)).start()

def client_thread(client_socket):
    try:
        buffer = ""  # Initialize a buffer to accumulate data
        while True:
            data = client_socket.recv(1024).decode()
            # Accumulate data in buffer
            buffer += data
            
            # Process each command separated by a newline or another chosen delimiter
            while "\n" in buffer:  # Assuming newline as the command delimiter
                message, buffer = buffer.split("\n", 1)  # Split on the first newline
                message = message.strip()
                if message:
                    try:
                        dialID, direction = message.split(',')
                        navigate_menu(dialID, direction)
                    except ValueError:
                        print(f"Error processing message: {message}")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        print("Connection closed.")
        client_socket.close()

if __name__ == "__main__":
    start_server()
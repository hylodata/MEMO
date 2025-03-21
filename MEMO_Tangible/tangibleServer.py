import asyncio
import websockets
import json

# Define the nested menu structure. Maybe we can make this dynamic later?
menu_structure = {
    "Driver Menu": {
        "Social": {"action": "Show Social Options"},
        "Environmental": {
            "Acid Rain": {"action": "Show Acid Rain Years"},
            "Invasive Species": {"action": "Show Invasive Species Years"},
            "Biodiversity": {"action": "Show Biodiversity Years"},
            "Migration": {"action": "Show NETRa1990"}, 
            "Precipitation": {
                "1985": {"action": "Show 1985 Precipitation"},
                "2010": {"action": "Show 2010 Precipitation"},
            },
        },
        "Political": {"action": "Show Political Options"},
        "Demographic": {"action": "Show Demographic Options"},
        "Economic": {"action": "Show Economic Options"},
    }
}

# Dial state tracking.
dial_states = {}
# Add a global set to track active connections. 
# A set is used here because it automatically handles uniqueness and allows for easy addition and removal of WebSocket connections.

# connected_websockets = set()
connected_websockets_dictionary = {}

async def send_message_to_all_clients(message):
    # Iterate over all WebSocket objects stored in the dictionary values
    for ws in connected_websockets_dictionary.values():
        # Use a try-except block to handle possible disconnections
        try:
            await ws.send(message)
        except websockets.exceptions.ConnectionClosed:
            continue  # If a connection is closed, just move on to the next

async def send_message_to_specific_client(dialID, message):
    # Check if the client exists in the dictionary
    if dialID in connected_websockets_dictionary:
        websocket = connected_websockets_dictionary[dialID]
        try:
            await websocket.send(message)
            print(f"Message sent to {dialID}")
        except websockets.exceptions.ConnectionClosed:
            print(f"Failed to send message to {dialID}: Connection is closed")
            # Optionally handle the closed connection, e.g., remove from dictionary
            del connected_websockets_dictionary[dialID]
    else:
        print(f"No client found with dialID: {dialID}")

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
    # print_state(dialID, state)

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
            # Prepare a message containing the action and send it to all clients
            action_message = {
                "type": "menuAction",
                "dialID": dialID,
                "action": current_menu[selection]['action']
            }
            asyncio.create_task(send_message_to_specific_client('mapBox',json.dumps(action_message)))
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

async def handle_dial(websocket, path):
    dialID = None  # Initialize dialID as None to detect new connection

    try:
        async for message in websocket:
            data = json.loads(message)
            
            # Check if this is the initial message with dialID
            if dialID is None and 'dialID' in data:
                dialID = data['dialID']
                
                # Add the WebSocket connection to the dictionary of active connections
                connected_websockets_dictionary[dialID] = websocket
                print(f"WebSocket for Dial {dialID} added to the dictionary")

                # Initialize state for new connection
                if dialID not in dial_states:
                    dial_states[dialID] = {"path": ["Driver Menu"], "selection": None, "history": []}
                    print(f"New dial connected: Dial {dialID}")
                else:
                    # Handle reconnection scenario or log a duplicate connection attempt
                    print(f"Dial {dialID} reconnected or duplicate connection attempt logged.")

            elif dialID is not None:
                # Process subsequent navigation commands
                event = data.get("event")
                if event:
                    navigate_menu(dialID, event)
                    
                    # Prepare and send the updated state to all clients
                    state = dial_states[dialID]
                    menu_state_message = {
                        "type": "menuStateUpdate",
                        "dialID": dialID,
                        "menuState": state
                    }
                    await send_message_to_all_clients(json.dumps(menu_state_message))
                    print_state(dialID, state)
                    print(connected_websockets_dictionary)
            else:
                # Handle cases where a message is received without a prior dialID initialization
                print("Received message without initial dialID setup.")

    except websockets.exceptions.ConnectionClosed:
        if dialID and dialID in connected_websockets_dictionary:
            # Remove the WebSocket connection from the dictionary if it's closed
            del connected_websockets_dictionary[dialID]
            print(f"WebSocket for Dial {dialID} removed due to closure")

async def main():
    async with websockets.serve(handle_dial, '0.0.0.0', 12345):
        print("WebSocket server running on ws://0.0.0.0:12345")
        await asyncio.Future()  # Run forever


if __name__ == "__main__":
    asyncio.run(main())
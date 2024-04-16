const menuDisplay = document.getElementById('menuDisplay');
const ws = new WebSocket('ws://localhost:12345');

ws.onopen = () => {
    console.log('Connected to the server');
    // Send an initial message if necessary, e.g., to identify this client
    ws.send(JSON.stringify({dialID: 'javaApp'}));};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(event.data);
    if (data.type === 'menuStateUpdate') {
        // Update the display with the new menu state
        const menuState = data.menuState;
        menuDisplay.innerHTML = `<strong>Dial ${data.dialID}</strong>: Now at ${menuState.path.join(' > ')}, hovering over ${menuState.selection}`;
        console.log(data.menuState);
    }
};

ws.onerror = (error) => {
    console.log('WebSocket Error: ', error);
    menuDisplay.innerText = 'WebSocket connection error. Please check the console for more details.';
};

ws.onclose = () => {
    console.log('Disconnected from the server');
    menuDisplay.innerText = 'Disconnected from the server.';
};

#include <WiFi.h>
#include <WiFiClient.h>
#include <M5Dial.h>
#include <ArduinoWebsockets.h>
#include <ArduinoJson.h>

const char* ssid = "AliCapsule";
const char* password = "synlab123";
const char* websocketServerHost = "ws://10.0.1.98:12345"; // WebSocket server address

using namespace websockets;
WebsocketsClient client;

//Encoder Logic
long oldPosition = -999;
String dialID = "02";
String clockW = "CW";
String counterClockW = "CCW";
String buttonPress = "BP";
String touchEnd = "TE";
String global_currentPath;
String global_selection;

int prev_x = -1;
int prev_y = -1;

static m5::touch_state_t prev_state;

void refreshScreen(){
    M5Dial.Display.clear();
    M5Dial.Display.setTextSize(0.5);
    M5Dial.Display.drawString(global_currentPath, M5Dial.Display.width() / 2, M5Dial.Display.height() / 2 - 30);
    M5Dial.Display.setTextSize(0.7);
    M5Dial.Display.drawString(global_selection, M5Dial.Display.width() / 2, M5Dial.Display.height() / 2 + 30);
}

void receiveAndParseEvent(String message) {
    // Create a DynamicJsonDocument
    DynamicJsonDocument doc(1024);

    // Parse the incoming JSON message
    DeserializationError error = deserializeJson(doc, message);
    
    if (error) { // Check for errors in parsing
        Serial.print("deserializeJson() failed: ");
        Serial.println(error.f_str());
        return;
    }

    // Extracting data from the JSON document
    // Assume "type", "dialID", and "menuState" are keys in your JSON structure
    const char* type = doc["type"]; // You can replace these keys with whatever your JSON structure uses
    int dialID = doc["dialID"];
    JsonObject menuState = doc["menuState"].as<JsonObject>();

    // Example on how to further extract nested information from "menuState"
    // This depends on how your menuState is structured, adjust accordingly
    JsonArray pathArray = menuState["path"].as<JsonArray>();
    String currentPath;
    if (!pathArray.isNull() && pathArray.size() > 0) {
        // Get the last element of the path array
        currentPath = pathArray[pathArray.size() - 1].as<String>();
        global_currentPath = currentPath; //make the local variable global
    }

    String selection = menuState["selection"]; // Assuming "selection" is a string
    global_selection = selection; //make the local 'selection' variable global
    JsonArray history = menuState["history"].as<JsonArray>(); // Assuming "history" is an array

    // Now you have the variables 'type', 'dialID', 'path', 'selection', and the 'history' array
    // Use these variables as needed in your code

    // Example output
    Serial.print("Type: ");
    Serial.println(type);
    Serial.print("Dial ID: ");
    Serial.println(dialID);
    Serial.print("Current Path: ");
    Serial.println(currentPath);
    Serial.print("Current Selection: ");
    Serial.println(selection);
    // To print the history, you'd iterate over the 'history' JsonArray if necessary
    refreshScreen();
}

void onMessageCallback(WebsocketsMessage message) {
    Serial.println("Received a message:");
    // Call your function to process the incoming message
    receiveAndParseEvent(message.data());
}

void sendEvent(const String& eventType) {
    // Construct the JSON payload
    DynamicJsonDocument jsonDoc(1024);
    jsonDoc["dialID"] = dialID;
    jsonDoc["event"] = eventType;
    String message;
    serializeJson(jsonDoc, message);

    // Send the message
    client.send(message);
    Serial.println("Sent: " + message);
    refreshScreen();
}

void reconnectWebSocket() {
    if(!client.available()) { // Check if the WebSocket client is not connected
        Serial.println("WebSocket disconnected. Attempting to reconnect...");
        bool connected = client.connect(websocketServerHost);
        if(connected) {
            Serial.println("Reconnected to WebSocket server.");
        } else {
            Serial.println("Failed to reconnect to WebSocket server.");
        }
    }
}

void setup() {
    auto cfg = M5.config();
    M5Dial.begin(cfg, true, false);
    M5Dial.Display.setTextColor(GREEN);
    M5Dial.Display.setTextDatum(middle_center);
    M5Dial.Display.setTextFont(&fonts::Orbitron_Light_32);
    M5Dial.Display.setTextSize(0.8);

    Serial.begin(115200);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    if (client.connect(websocketServerHost)) {
        Serial.println("Connected to WebSocket server");
        // Attach the message callback to handle incoming messages
        client.onMessage(onMessageCallback);
    } else {
        Serial.println("WebSocket connection failed.");
    }

    Serial.println("Connected to WebSocket server");

    refreshScreen();
}

void loop() {

    
    client.poll();

    // Attempt to reconnect if not connected
    if(!client.available()) {
        reconnectWebSocket();
        return; // Skip the rest of the loop if not connected
    }

    M5Dial.update();
    
    long newPosition = M5Dial.Encoder.read();
    static int counter = 0;
    if (newPosition != oldPosition) {

        counter++;

        if (counter % 4 == 0) {
            if (newPosition > oldPosition) {
                M5Dial.Speaker.tone(3000, 100);
                M5Dial.Display.clear(); 
                sendEvent(clockW);//send to server CW message    
            }

            if (newPosition < oldPosition) {
                M5Dial.Speaker.tone(2500, 100);
                M5Dial.Display.clear();
                M5Dial.Display.setTextSize(0.8);
                sendEvent(counterClockW); //send to server CounterClockW message    
            }
        }

        oldPosition = newPosition;

    }

    if (M5Dial.BtnA.wasPressed()) {
        M5Dial.Encoder.readAndReset();
        M5Dial.Speaker.tone(3600, 100);
        sendEvent(buttonPress);
    }

    //Example from M5Dial Touch 
    auto t = M5Dial.Touch.getDetail();
    if (prev_state != t.state) {
        prev_state == t.state;
        static constexpr const char* state_name[16] = {
            "none", "touch", "touch_end", "touch_begin",
            "___",  "hold",  "hold_end",  "hold_begin",
            "___",  "flick", "flick_end", "flick_begin",
            "___",  "drag",  "drag_end",  "drag_begin"};
        M5_LOGI("%s", state_name[t.state]);
         M5Dial.Display.fillRect(0, 0, M5Dial.Display.width(),
                                M5Dial.Display.height() / 2, BLACK);

        // M5Dial.Display.drawString(state_name[t.state],
        //                           M5Dial.Display.width() / 2,
        //                           M5Dial.Display.height() / 2 - 30);
        if (state_name[t.state] == "touch_end"){
            M5Dial.Speaker.tone(3200, 100);
            sendEvent(touchEnd); //send the TouchEnd command to the Python server.
        }
    }

    
    if (prev_x != t.x || prev_y != t.y) {
        // M5Dial.Display.fillRect(0, M5Dial.Display.height() / 2,
        //                         M5Dial.Display.width(),
        //                         M5Dial.Display.height() / 2, BLACK);
        // M5Dial.Display.drawString(
        //     "X:" + String(t.x) + " / " + "Y:" + String(t.y),
        //     M5Dial.Display.width() / 2, M5Dial.Display.height() / 2 + 30);
        prev_x = t.x;
        prev_y = t.y;
        M5Dial.Display.drawPixel(prev_x, prev_y);
    }


   

}
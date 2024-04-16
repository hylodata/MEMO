#include <WiFi.h>
#include <WiFiClient.h>
#include <M5Dial.h>
#include <ArduinoJson.h>

const char* ssid = "CastleOmalley";
const char* password = "sirfelix";
const char* host = "10.0.0.190";  // IP address of the Python server
const int port = 12345;

WiFiClient client;

//Encoder Logic
long oldPosition = -999;
String clockW = "CW";
String counterClockW = "CCW";
String buttonPress = "BP";
String touchEnd = "TE";

String dialID = "01";

int prev_x = -1;
int prev_y = -1;

static m5::touch_state_t prev_state;

void setup() {
    auto cfg = M5.config();
    M5Dial.begin(cfg, true, false);
    M5Dial.Display.setTextColor(GREEN);
    M5Dial.Display.setTextDatum(middle_center);
    M5Dial.Display.setTextFont(&fonts::Orbitron_Light_32);
    M5Dial.Display.setTextSize(1);

    Serial.begin(115200);

    WiFi.begin(ssid, password);

    //If the WIFI Status does not = connected, then we're gonna keep trying to connect...
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi...");
    }

    //We are connected to Wifi! 
    Serial.println("Connected to WiFi");

    //If we're unable to connect to the host (did u turn on the server?), stay here.
    if (!client.connect(host, port)) {
        Serial.println("Connection to server failed");
        return;
    }

    //We are connected to the server!
    Serial.println("Connected to server");

}


void sendClockW(){
    String messageClockW = dialID + "," + clockW; //DialID,CCW (ex: 01,CW)
    client.println(messageClockW);
}

void sendCounterClockW(){
    String messageCounterClockW = dialID + "," + counterClockW; //DialID,CCW (ex: 01,CCW)
    client.println(messageCounterClockW) ;
} 

void sendButtonPress(){
    String messageButtonPress = dialID + "," + buttonPress; //DialID,1 (ex: 01,BP)
    client.println(messageButtonPress);
    
}

void sendTouchEnd(){
    String messageTouchEnd = dialID + "," + touchEnd; //DialID,1 (ex: 01,TE)
    client.println(messageTouchEnd);
}

void loop() {

    // Make sure we are still connected to the server
  if (!client.connected()) {
    Serial.println("Disconnected from server. Reconnecting...");
    client.connect(host, port);
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
                Serial.print("CW. COUNTER:  ");
                Serial.println(counter);
                M5Dial.Display.drawString(clockW, M5Dial.Display.width() / 2, M5Dial.Display.height() / 2);
                sendClockW(); //send to server CW message    
            }

            if (newPosition < oldPosition) {
                M5Dial.Speaker.tone(2500, 100);
                M5Dial.Display.clear();
                Serial.print("CCW. COUNTER:  ");
                Serial.println(counter);
                M5Dial.Display.drawString(counterClockW, M5Dial.Display.width() / 2, M5Dial.Display.height() / 2);
                sendCounterClockW(); //send to server CounterClockW message    
            }
        }

        oldPosition = newPosition;

    }

    if (M5Dial.BtnA.wasPressed()) {
        M5Dial.Encoder.readAndReset();
        sendButtonPress();
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

        M5Dial.Display.drawString(state_name[t.state],
                                  M5Dial.Display.width() / 2,
                                  M5Dial.Display.height() / 2 - 30);
        if (state_name[t.state] == "touch_end"){
            sendTouchEnd(); //send the TouchEnd command to the Python server.
        }
    }

    
    if (prev_x != t.x || prev_y != t.y) {
        M5Dial.Display.setTextSize(1);
        M5Dial.Display.fillRect(0, M5Dial.Display.height() / 2,
                                M5Dial.Display.width(),
                                M5Dial.Display.height() / 2, BLACK);
        M5Dial.Display.drawString(
            "X:" + String(t.x) + " / " + "Y:" + String(t.y),
            M5Dial.Display.width() / 2, M5Dial.Display.height() / 2 + 30);
        prev_x = t.x;
        prev_y = t.y;
        M5Dial.Display.drawPixel(prev_x, prev_y);
    }

}
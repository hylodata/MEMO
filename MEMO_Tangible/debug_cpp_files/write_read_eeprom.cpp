#include <EEPROM.h>
#include <M5Dial.h>

// Define the EEPROM size
const int EEPROM_SIZE = 512;
String deviceID_global;

String readEEPROM(int start, int len) {
  EEPROM.begin(EEPROM_SIZE);
  char value[len + 1]; // Allocate memory for the string plus null terminator
  for (int i = 0; i < len; i++) {
    value[i] = char(EEPROM.read(start + i)); // Read each byte
  }
  value[len] = '\0'; // Set the null terminator at the end
  EEPROM.end();
  return String(value); // Now it correctly forms a string
}

void writeEEPROM(int start, String data) {
  EEPROM.begin(EEPROM_SIZE);
  for (int i = 0; i < data.length(); ++i) {
    EEPROM.write(start + i, data[i]);
  }
  // Write a null terminator to mark the end of the string
  EEPROM.write(start + data.length(), '\0');
  EEPROM.commit();
  EEPROM.end();
}

String localDeviceID() {
  String localID = "DIAL";
  localID += String("01");
  return localID;
}


void setup() {
  Serial.begin(115200);
  EEPROM.begin(EEPROM_SIZE);

  String deviceID = readEEPROM(0, 10); // Assuming this is your EEPROM read function

  // Check if the ID is empty or a placeholder
  if (deviceID == "" || deviceID == "0000000000") {
    deviceID = localDeviceID(); //grab the ID from the localDeviceID() function
    writeEEPROM(0, deviceID); // Store the new ID
    Serial.print("New ID assigned and stored: ");
    deviceID_global = deviceID;
  } else {
    Serial.print("Exisiting ID found:  ");
    deviceID_global = deviceID;
  }
  
  Serial.println(deviceID);
}

void loop() {
    //String deviceID_global = readEEPROM(0, 10);
    Serial.print("Read device ID: '");
    Serial.print(deviceID_global);
    Serial.println("'");

     if (deviceID_global == "" || deviceID_global == "0000000000") {
        Serial.println("theres no ID");
        delay(1000);
    }

delay(1000);
}
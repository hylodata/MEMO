#include <EEPROM.h>
#include <M5Dial.h>

// Define the EEPROM size
const int EEPROM_SIZE = 512;

void setup() {
  Serial.begin(115200);
  
  // Initialize EEPROM with the predefined size
  if (!EEPROM.begin(EEPROM_SIZE)) {
    Serial.println("Failed to initialise EEPROM");
    delay(1000);
    ESP.restart();
  }
  
  Serial.println("Initizliaing...");
  delay(1000);
  Serial.println("Initalizing... x2");
  delay(1000);
  Serial.println("Reading EEPROM content:");
  // Clean up EEPROM, not necessary if you want to keep the data
  // EEPROM.end();
}

void loop() {
  // Nothing to do here
  // Loop through each byte of the EEPROM
    Serial.println("END OF TRANSMISSION");

    for (int i = 0; i < EEPROM_SIZE; i++) {
    byte value = EEPROM.read(i);
    
    // Print the byte in HEX format
    Serial.print("0x");
    if (value < 0x10) Serial.print("0"); // Add leading zero for values less than 0x10
    Serial.print(value, HEX);
    Serial.print(" "); // Print a space between bytes for readability
    
    // Optionally, you can print a newline every 16 bytes for a cleaner output
    if ((i + 1) % 16 == 0) {
      Serial.println();
    }
  }
  
  Serial.println("END OF TRANSMISSION");

  delay(10000);
}
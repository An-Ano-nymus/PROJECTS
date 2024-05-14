#!pip install pytesseract
#!apt install tesseract-ocr

import matplotlib.pyplot as plt
import matplotlib.image as mpimg

import cv2
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r"D:\Raghav\EVOLUTION\tesseract-ocr\tesseract.exe"

def img_to_string(image_path):
    # Open the image
    image = cv2.imread(image_path)

    img = mpimg.imread(image_path)   #matploit to print image
    imgplot = plt.imshow(img)
    print(imgplot)


    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Use Tesseract to convert the image to text
    text = pytesseract.image_to_string(gray,lang='eng')

    # Return the text
    return text



image_path = r'D:\Raghav\EVOLUTION\datasets\imgTOstr\testocr.png'
text = img_to_string(image_path)
print(text)


import pyttsx3  # pip install pyttsx3
def str_to_speech(text):
    

    engine = pyttsx3.init()
    voices = engine.getProperty('voices')   # Returns a list of available speech voicing engines (say: english female)
    

    engine = pyttsx3.init()

    engine.say(text)

    engine.runAndWait()


#str_to_speech(text)

# from kivy.app import App
# from kivy.uix.button import Button

# class MyApp(App):
#     def build(self):
#         return Button(text='HELLO', on_press=self.say_hello)
    

#     def say_hello(self, instance):
#         print('Hello, Android!')

# if __name__ == '__main__':
#     MyApp().run()

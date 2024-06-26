import cv2
from matplotlib import pyplot as plt
from tensorflow.keras.models import load_model
import numpy as np




vid=cv2.VideoCapture(0) # 0 for the default webcam, or use a number to select which camera you have connected (e.g# Read image from file)


model = load_model(r'D:\Raghav\EVOLUTION\face_object_detection_model.keras')

classes=["mask","glasses","nothing on face","sunglasses","sunglasses_imagenet"]   #for idea of categories

while(True): 
      
    # Capture the video frame by frame 
    ret, frame = vid.read() 
    frame=cv2.flip(frame,1)
    img_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)


    stop_data = cv2.CascadeClassifier(r"D:\Raghav\EVOLUTION\env\Lib\site-packages\cv2\data\haarcascade_frontalface_default.xml")


    found = stop_data.detectMultiScale(img_gray,minSize =(5, 5))

    # Don't do anything if there's 
    # no sign
    amount_found = len(found)

    if amount_found != 0:
        
        # There may be more than one
        # sign in the image
        for (x, y, width, height) in found:
            
            # We draw a green rectangle around
            # every recognized sign
            face=frame[y:y+height+60, x:x+width+60]
            
            face=cv2.resize(face, (256,256))

            face = np.expand_dims(face, axis=0)  # Add batch dimension
            
            face = face.astype('float32') / 255.0  # Normalize the image

            prediction = model.predict(face)

            predicted_class = np.argmax(prediction)
            
            print("Predicted Classes:", predicted_class)


            cv2.rectangle(frame, (x, y), (x + height+20, y + width+20), (0, 255, 0), 2)
            
            cv2.putText(frame, classes[predicted_class], (x,y), cv2.FONT_HERSHEY_SIMPLEX ,1, (255,3,4), 2, cv2.LINE_AA)


    # Display the resulting frame 
    cv2.imshow('Camera', frame) 
      
    # the 'q' button is set as the 
    # quitting button you may use any 
    # desired button of your choice 
    if cv2.waitKey(1) & 0xFF == ord('q'): 
        break
  
# After the loop release the cap object 
vid.release() 
# Destroy all the windows 
cv2.destroyAllWindows() 






# # Opening image
# img = cv2.imread("image.jpg")

# # OpenCV opens images as BRG 
# # but we want it as RGB We'll 
# # also need a grayscale version
# img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)


# # Use minSize because for not 
# # bothering with extra-small 
# # dots that would look like STOP signs
# stop_data = cv2.CascadeClassifier('stop_data.xml')

# found = stop_data.detectMultiScale(img_gray, 
# 								minSize =(20, 20))

# # Don't do anything if there's 
# # no sign
# amount_found = len(found)

# if amount_found != 0:
	
# 	# There may be more than one
# 	# sign in the image
# 	for (x, y, width, height) in found:
		
# 		# We draw a green rectangle around
# 		# every recognized sign
# 		cv2.rectangle(img_rgb, (x, y), 
# 					(x + height, y + width), 
# 					(0, 255, 0), 5)
		
# # Creates the environment of 
# # the picture and shows it
# plt.subplot(1, 1, 1)
# plt.imshow(img_rgb)
# plt.show()

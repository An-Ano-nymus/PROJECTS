import cv2
from PIL import ImageGrab
from GAME_Control import ReleaseKey,PressKey,W,A,S,D
import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
import time
from getkeys import key_check



GAADIV_PATH=r'D:\Raghav\EVOLUTION\GOD_DEMON is BACK\Artificial INTELLIGENCE\GTA5 PYTHON AI\GAANDIV_GTA5.keras'

model=load_model(GAADIV_PATH)


direction=['left','straight','right']

def straight():

    PressKey(W)
    ReleaseKey(A)
    ReleaseKey(D)


def left():
    
    ReleaseKey(W)
    PressKey(A)
    ReleaseKey(D)
    ReleaseKey(A)


def right():
    
    ReleaseKey(W)
    PressKey(D)
    ReleaseKey(A)
    ReleaseKey(D)



def slow_ya_roll():
    ReleaseKey(W)
    ReleaseKey(A)
    ReleaseKey(D)





def main():

    
    for i in list(range(4))[::-1]:
        print(i + 1)
        time.sleep(1)

    paused = False
    while True:
        if not paused:
            screen = np.array(ImageGrab.grab(bbox=(0, 40, 800, 640)))
            screen = cv2.cvtColor(screen, cv2.COLOR_BGR2GRAY)
            
            
            cv2.imshow('AI VIEW',screen)
            screen = cv2.resize(screen, (160, 120))
            screen = screen.reshape(1, 160, 120, 1)


            try:
                prediction = model.predict(screen)
                print(prediction)
            except Exception as e:
                print(f"Error during prediction: {e}")


            predicted_class = np.argmax(prediction)
            
            turn_thresh = 0.75
            fwd_thresh = 0.70

            if prediction[1] > fwd_thresh:
                straight()
            elif prediction[0] > turn_thresh:
                left()
            elif prediction[2] > turn_thresh:
                right()
            else:
                straight()

            print(direction[predicted_class])




        keys = key_check()
        if 'T' in keys:
            if paused:
                paused = False
                print('Unpaused!')
                time.sleep(1)
            else:
                print('Pausing!')
                paused = True
                time.sleep(1)

        if cv2.waitKey(25) & 0xFF == ord('q'):
            cv2.destroyAllWindows()
            break





# def main():
    # last_time = time.time()
    # for i in list(range(4))[::-1]:
    #     print(i+1)
    #     time.sleep(1)

    # paused = False
    # while(True):
        
    #     if not paused:
    #         # 800x600 windowed mode
    #         screen =  np.array(ImageGrab.grab(bbox=(0,40,800,640)))
           
    #         print('loop took {} seconds'.format(time.time()-last_time))
    #         last_time = time.time()
    #         screen = cv2.cvtColor(screen, cv2.COLOR_BGR2GRAY)
    #         screen = cv2.resize(screen, (160,120))

    #         prediction = model.predict([screen.reshape(160,120,1)])
    #         print(prediction)

    #         turn_thresh = .75
    #         fwd_thresh = 0.70

    #         if prediction[1] > fwd_thresh:
    #             straight()
    #         elif prediction[0] > turn_thresh:
    #             left()
    #         elif prediction[2] > turn_thresh:
    #             right()
    #         else:
    #             straight()

    #     keys = key_check()

    #     # p pauses game and can get annoying.
    #     if 'T' in keys:
    #         if paused:
    #             paused = False
    #             time.sleep(1)
    #         else:
    #             paused = True
    #             ReleaseKey(A)
    #             ReleaseKey(W)
    #             ReleaseKey(D)
    #             time.sleep(1)






if __name__ == "__main__":
    main()

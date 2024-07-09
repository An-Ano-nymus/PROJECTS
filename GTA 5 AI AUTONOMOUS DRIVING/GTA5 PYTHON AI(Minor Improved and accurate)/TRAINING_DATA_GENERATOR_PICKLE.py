#create_training_data.py
import numpy as np
#from grabscreen import grab_screen        #can also use a 'from PIL import ImageGrab' to capture screen
from PIL import ImageGrab
import cv2
import time
from getkeys import key_check
import os
import pickle


def keys_to_output(keys):
    '''
    Convert keys to a ...multi-hot... array

    [A,W,D] boolean values.
    '''
    output = [0,0,0]
    
    if 'A' in keys:
        output[0] = 1
    elif 'D' in keys:
        output[2] = 1
    else:
        output[1] = 1
    return output


file_name = r'GOD_DEMON is BACK\Artificial INTELLIGENCE\GTA5 PYTHON AI\training_data.pkl'

if os.path.isfile(file_name):
    print('File exists, loading previous data!')
    with open(file_name, 'rb') as f:
        training_data = pickle.load(f)
else:
    print('File does not exist, starting fresh!')
    training_data = []


def main():
    for i in list(range(4))[::-1]:
        print(i + 1)
        time.sleep(1)

    paused = False
    while True:
        if not paused:
            screen = np.array(ImageGrab.grab(bbox=(0, 40, 800, 640)))
            cv2.imshow('WINDOW', screen)

            last_time = time.time()
            screen = cv2.cvtColor(screen, cv2.COLOR_BGR2GRAY)
            screen = cv2.resize(screen, (160, 120))
            keys = key_check()
            output = keys_to_output(keys)

            training_data.append([screen, output])
            
            if len(training_data) % 200 == 0:
                print(len(training_data))
                with open(file_name, 'wb') as f:
                    pickle.dump(training_data, f)

            print('Loop took {} seconds'.format(time.time() - last_time))
            last_time = time.time()

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

main()
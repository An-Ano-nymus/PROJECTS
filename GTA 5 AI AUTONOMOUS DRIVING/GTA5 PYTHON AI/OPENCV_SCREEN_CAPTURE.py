import numpy as np
from PIL import ImageGrab  #PIL IS USED FOR PYTHON IMAGE PROCESSING
import cv2  #IT is USED FOR VIDEO AND COMPUTER VISION RELATED TASK
import time
import pyautogui


from GAME_Control import PressKey,ReleaseKey,W,A,S,D



def draw_lines(img,lines):
    try:
        for line in lines:
            coords=line[0]
            cv2.line(img,(coords[0],coords[1]),(coords[2],coords[3]),(255,255,255),3)
    except Exception as e:
        pass


def count_down():
    for i in list(range(4))[::-1]:
        print(i+1,"...")
        time.sleep(1)
    print('GO')




def RegionOfInterest(img,vertices):
    mask=np.zeros_like(img)
    cv2.fillPoly(mask , vertices , 255)
    masked=cv2.bitwise_and(img,mask)
    return masked







def process_img(original_Image):

    processed_img=cv2.cvtColor(original_Image,cv2.COLOR_BGR2GRAY)
    processed_img=cv2.Canny(processed_img ,threshold1=100 , threshold2=300)     #USED FOR CONTRAST AND EDGE SHOWING      #CHANGE FOR MODEL ACCURACY

    # processed_img = cv2.GaussianBlur(processed_img, (3,3), 0 )             use if accuracy is low of lane finder

    vertices=np.array([[10,500],[10,300],[300,200],[500,200],[800,300],[800,500]])        #VERTEX FOR ONLY FOCUSING ON REQUIRED REGION OF ROAD #CHANGE FOR ACCURACY
    processed_img=RegionOfInterest(processed_img,[vertices])

    lines= cv2.HoughLinesP(processed_img,3,2*np.pi/180,180,np.array([]),100,15)                 #detect lines
    draw_lines(processed_img,lines)

    return processed_img






def main():
    
    last_time = time.time()
    
    while (True):

        screen = np.array(ImageGrab.grab (bbox=(0,40, 800, 600)))
        new_screen= process_img(screen)

        # printscreen_numpy = np.array (printscreen_pil.getdata(), dtype='uint8')

        print('Loop took {} seconds'.format(time.time()-last_time))

        last_time = time.time()

        cv2.imshow('CANNY_IMAGE',new_screen)
        #cv2.imshow('window1',cv2.cvtColor(screen ,cv2.COLOR_BGR2RGB ))





        if cv2.waitKey(25) & 0xFF == ord('q'):

            cv2.destroyAllWindows()

            break


main()
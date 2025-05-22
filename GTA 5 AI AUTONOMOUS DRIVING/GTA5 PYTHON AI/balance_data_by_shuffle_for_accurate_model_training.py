import pandas as pd
import numpy as np
import cv2
from random import shuffle
import pickle





train_data_path = r'GOD_DEMON is BACK\Artificial INTELLIGENCE\GTA5 PYTHON AI\training_data.pkl'
train_data=pd.read_pickle(train_data_path)

#test if train_data is correct size and format or not
# print(train_data[0][0])   #prints image data
# print(train_data[0][1])   #prints output data of keypress


# image_data=[]
# output_data=[]
# def all_image_array_print(image):
    
#     for i in range(len(image)):
#         image_data.append(image[i][0])
#         output_data.append(image[i][1])
        
        

# all_image_array_print(train_data)



data_frame_image_and_outputs=pd.DataFrame(train_data,columns=['  IMAGE   ','     OUTPUTS(A,W,D)     '])

print('SOME DATA of DATA FRAME \n', data_frame_image_and_outputs.head())

print('SHAPE OF DATA(length,dimensions )', data_frame_image_and_outputs.shape)

    



lefts = []
rights = []
forwards = []

shuffle(train_data)



#uses to check if data is consistent and not shuffled or shuffled
# def main():
    
    
#     i=0
#     while (True):

#         screen = np.array(train_data[i][0])
#         i+=1
#         cv2.imshow('window1',screen)



#         if cv2.waitKey(25) & 0xFF == ord('q'):

#             cv2.destroyAllWindows()

#             break
# main()






for data in train_data:
    img = data[0]
    choice = data[1]

    if choice == [1,0,0]:
        lefts.append([img,choice])
    elif choice == [0,1,0]:
        forwards.append([img,choice])
    elif choice == [0,0,1]:
        rights.append([img,choice])
    else:
        print('no matches')

print(len(lefts))
print(len(forwards))
print(len(rights))



file_name=r'GOD_DEMON is BACK\Artificial INTELLIGENCE\GTA5 PYTHON AI\training_data_shuffled.pkl'


with open(file_name, 'wb') as f:
    pickle.dump(train_data, f)





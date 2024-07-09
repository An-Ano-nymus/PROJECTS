import pandas as pd
import tensorflow as tf
import numpy as np
from tensorflow.keras import layers, models
import matplotlib.pyplot as plt
from GAANDIV_AI_MODEL_driver import GAANDIV

WIDTH = 160
HEIGHT = 120
Color_Channel = 1

training_data_path = r"D:\Raghav\EVOLUTION\GOD_DEMON is BACK\Artificial INTELLIGENCE\GTA5 PYTHON AI\training_data_shuffled.pkl"

data = pd.read_pickle(training_data_path)
# print(data[0][0])   # prints image data
# print(data[0][1])   # prints output data of keypress

# OUT OF 7800
train_data = data[:-500]
test_data = data[-500:]

X = np.array([i[0] for i in train_data]).reshape(-1, WIDTH, HEIGHT, Color_Channel)
Y = np.array([i[1] for i in train_data])

TEST_X = np.array([i[0] for i in test_data]).reshape(-1, WIDTH, HEIGHT, Color_Channel)
TEST_Y = np.array([i[1] for i in test_data])

model = GAANDIV(WIDTH, HEIGHT, Color_Channel)

model.fit(x=X, y=Y, epochs=15, validation_data=(TEST_X, TEST_Y), batch_size=128)

test_loss, test_acc = model.evaluate(TEST_X, TEST_Y, verbose=2)
print(test_acc)


model.save('D:\Raghav\EVOLUTION\GOD_DEMON is BACK\Artificial INTELLIGENCE\GTA5 PYTHON AI\GAANDIV_GTA5.keras')     #accuracy currently 71.4%
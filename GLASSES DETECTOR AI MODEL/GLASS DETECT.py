import tensorflow as tf
import numpy as np
import pandas
from tensorflow.keras import datasets, layers, models
import matplotlib.pyplot as plt



directory=r"D:\Raghav\EVOLUTION\datasets\GLASS_LOW_RESOLUTION\glasses-and-coverings"     #path to dataset

classes=["mask","glasses","nothing on face","sunglasses","sunglasses_imagenet"]   #for idea of categories




from tensorflow.keras.preprocessing.image import ImageDataGenerator


def split_data(directory, batch_size=32, validation_split=0.2):         #batch_size=training image at once instance,validation_split=train-test-split ratio which is 20% in this case
    # Create an ImageDataGenerator
    datagen = ImageDataGenerator(validation_split=0.2)

    # Load images from the directory
    train_generator = datagen.flow_from_directory(
        directory,
        target_size=(256, 256),      #dataset image size
        batch_size=32,
        class_mode='categorical',    #take classes according to number of directories
        subset='training'
    )

    test_generator = datagen.flow_from_directory(
        directory,
        target_size=(256, 256),      #dataset image size
        batch_size=32,
        class_mode='categorical',      #take classes according to number of directories
        subset='validation'
    )

    return train_generator, test_generator

# Example usage
train_generator, test_generator = split_data(directory)           #train_generator and test_generator has two value tuple of train_images and train_labels/classes




model = models.Sequential()
model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(256, 256, 3)))         #input_shape=(width,height,color_channel) only to be give in 1st layer
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))
model.add(layers.Conv2D(64, (3, 3), activation='relu'))

model.summary()     #give summary of each layer


model.add(layers.Flatten())
model.add(layers.Dense(64, activation='relu'))
model.add(layers.Dense(5))   #number of classes is 5


model.summary()



model.compile(optimizer='adam',
              loss=tf.keras.losses.CategoricalCrossentropy(from_logits=True),  # Use CategoricalCrossentropy for automatic label from number of folders 
              metrics=['accuracy'])


history = model.fit(train_generator, epochs=5, validation_data=test_generator)    #epochs = number of time data is trained and validation_data is testing ML model for accuracy



plt.plot(history.history['accuracy'], label='accuracy')
plt.plot(history.history['val_accuracy'], label = 'val_accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.ylim([0.5, 1])
plt.legend(loc='lower right')

test_loss, test_acc = model.evaluate(test_generator, verbose=2)

print(test_acc)

model.save('face_object_detection_model.keras')
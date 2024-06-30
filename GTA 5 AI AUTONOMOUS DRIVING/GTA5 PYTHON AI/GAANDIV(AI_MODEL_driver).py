import tensorflow as tf
import numpy as np
from tensorflow.keras import datasets, layers, models
import matplotlib.pyplot as plt




def GAANDIV(width=160,height=120,learning=0.002):
    """
    This function creates a Convolutional Neural Network (CNN) model for image classification.

    Parameters:
    width (int): The width of the input images. Default is 160.
    height (int): The height of the input images. Default is 120.
    learning (float): The learning rate for the optimizer. Default is 0.002.

    Returns:
    model (tf.keras.models.Sequential): The compiled CNN model.
    """

    # Create a Sequential model
    model = models.Sequential()

    # Add the first convolutional layer with 32 filters, kernel size 3x3, ReLU activation, and input shape
    model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(width, height, 1)))

    # Add a MaxPooling layer to reduce spatial dimensions
    model.add(layers.MaxPooling2D((2, 2)))

    # Add a second convolutional layer with 64 filters, kernel size 3x3, and BatchNormalization
    model.add(layers.Conv2D(64, (3, 3), use_bias=False))
    model.add(layers.BatchNormalization())
    model.add(layers.Activation("relu"))

    # Add another MaxPooling layer
    model.add(layers.MaxPooling2D((2, 2)))

    # Add three more convolutional layers with 64, 128, and 256 filters, respectively
    model.add(layers.Conv2D(64, (3, 3), activation='relu'))
    model.add(layers.Conv2D(128, (3, 3), activation='relu'))
    model.add(layers.Conv2D(256, (3, 3), activation='relu'))

    # Add another MaxPooling layer
    model.add(layers.MaxPooling2D((2, 2)))

    # Flatten the output from the convolutional layers to feed into the dense layers
    model.add(layers.Flatten())

    # Add two dense layers with 64 and 32 neurons, respectively, and ReLU activation
    model.add(layers.Dense(64, activation='relu'))

    # Add a Dropout layer to prevent overfitting
    model.add(layers.Dropout(0.5))

    model.add(layers.Dense(32, activation='relu'))

    # Add the final dense layer with the number of classes (3 in this case)
    model.add(layers.Dense(3))

    # Print a summary of the model
    model.summary()

    # Compile the model with Adam optimizer, CategoricalCrossentropy loss, and accuracy metric
    model.compile(optimizer='adam',
                  loss=tf.keras.losses.CategoricalCrossentropy(from_logits=True),
                  metrics=['accuracy'])

    # Return the compiled model
    return model





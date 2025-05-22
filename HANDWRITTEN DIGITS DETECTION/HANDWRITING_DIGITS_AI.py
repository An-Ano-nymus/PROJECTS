import pandas as pd
import tensorflow as tf
import numpy as np
from tensorflow import keras
from keras.preprocessing.image import load_img, img_to_array
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout


# gpus = tf.config.list_physical_devices('GPU')
# if gpus:
#   # Restrict TensorFlow to only use the first GPU
#   try:
#     tf.config.set_visible_devices(gpus[0], 'GPU')
#     logical_gpus = tf.config.list_logical_devices('GPU')
#     print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPU")
#   except RuntimeError as e:
#     # Visible devices must be set before GPUs have been initialized
#     print(e)


# Load the CSV file

csv_file_path = r'D:\Raghav\EVOLUTION\datasets\HANDWRITING\english.csv'
data = pd.read_csv(csv_file_path)

# Display the first few rows of the CSV
print(data.head())



# Parameters
image_size = (600, 450)  # You can adjust this size

# Function to load and preprocess images
def preprocess_image(image_path):
    image = load_img(image_path, target_size=image_size, color_mode='grayscale')    
    image = img_to_array(image)
    image = np.expand_dims(image, axis=-1)
    image = image / 255.0  # Normalize pixel values to [0, 1]
    return image

# Load and preprocess images
image_paths = [r"D:/Raghav/EVOLUTION/datasets/HANDWRITING/" + path for path in data['image'].values]
images = np.array([preprocess_image(image_path) for image_path in image_paths])

print(image_paths)

print(images)

print(f"Image shapes: {images.shape}")


# Encode labels
labels = data['label'].values
label_encoder = LabelEncoder()
encoded_labels = label_encoder.fit_transform(labels)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(images, encoded_labels, test_size=0.2, random_state=42)

# # Convert to numpy arrays
# X_train = tf.convert_to_tensor(X_train, dtype=tf.float32)
# X_test = tf.convert_to_tensor(X_test, dtype=tf.float32)
# y_train = tf.convert_to_tensor(y_train, dtype=tf.int64)
# y_test = tf.convert_to_tensor(y_test, dtype=tf.int64)



# Define the model
model = Sequential([


    Conv2D(32, (3, 3), activation='relu', input_shape=(image_size[0], image_size[1], 1)),
    MaxPooling2D((2, 2)),
    Dropout(0.25),


    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Dropout(0.25),


    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),



    Dense(len(label_encoder.classes_), activation='sigmoid')


])

# Compile the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

model.summary()


# Train the model
history = model.fit(X_train, y_train, epochs=10, validation_split=0.2, batch_size=32)

# Evaluate the model
test_loss, test_accuracy = model.evaluate(X_test, y_test)
print(f'Test accuracy: {test_accuracy}')


# Make predictions
predictions = model.predict(X_test)
predicted_labels = tf.argmax(predictions, axis=1)

# Decode the predicted labels
predicted_labels_decoded = label_encoder.inverse_transform(predicted_labels)




model.save('CHARACTER_RECOGNITION_AI.keras')  # 62-labels
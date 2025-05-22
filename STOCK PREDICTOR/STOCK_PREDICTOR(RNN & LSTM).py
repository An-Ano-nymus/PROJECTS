import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt

# Load the dataset
# file_path = r"D:\Raghav\EVOLUTION\datasets\STOCK_PRICES\APPLE_STOCK\apple_stock.csv"

file_path = r"D:\Raghav\EVOLUTION\datasets\TESLA_DATA_2023\Tasla_Stock_Updated_V2.csv"

df = pd.read_csv(file_path)

# Display the first few rows of the dataframe
print(df.head())

# Convert date column to datetime and sort by date
df['Date'] = pd.to_datetime(df['Date'])
df.sort_values('Date', inplace=True)

# Select the 'Close' column for prediction
data = df[['Close']].values

# Normalize the data
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(data)

# Prepare the dataset for RNN
def create_dataset(data, time_step=1):
    X, Y = [], []
    for i in range(len(data) - time_step - 1):
        a = data[i:(i + time_step), 0]
        X.append(a)
        Y.append(data[i + time_step, 0])
    return np.array(X), np.array(Y)

time_step = 100
X, y = create_dataset(scaled_data, time_step)

# Reshape input to be [samples, time steps, features]
X = X.reshape(X.shape[0], X.shape[1], 1)

# Split data into training and test sets
train_size = int(len(X) * 0.8)
test_size = len(X) - train_size
X_train, X_test = X[0:train_size], X[train_size:len(X)]
y_train, y_test = y[0:train_size], y[train_size:len(y)]

# Build the RNN model
model = tf.keras.Sequential([
    tf.keras.layers.LSTM(50, return_sequences=True, input_shape=(time_step, 1)),
    tf.keras.layers.LSTM(50),
    
    tf.keras.layers.Dense(30),
    tf.keras.layers.Dense(15),
    tf.keras.layers.Dense(1)
])

model.compile(optimizer='adam', loss='mean_squared_error',metrics=['accuracy'])

model.summary()

# Train the model
model.fit(X_train, y_train, epochs=8, batch_size=32, validation_data=(X_test, y_test))

# Predict and inverse the normalization
train_predict = model.predict(X_train)
test_predict = model.predict(X_test)

train_predict = scaler.inverse_transform(train_predict)
test_predict = scaler.inverse_transform(test_predict)

# Prepare for plotting
trainPredictPlot = np.empty_like(scaled_data)
trainPredictPlot[:, :] = np.nan
trainPredictPlot[time_step:len(train_predict) + time_step, :] = train_predict

testPredictPlot = np.empty_like(scaled_data)
testPredictPlot[:, :] = np.nan

# Calculate the correct start point for testPredictPlot
test_start_index = len(train_predict) + (time_step)

# Check if there's enough space for test predictions
if test_start_index + len(test_predict) <= len(testPredictPlot):
    
    testPredictPlot[test_start_index:test_start_index + len(test_predict), :] = test_predict
else:
    # Adjust the test predictions to fit the available space
    testPredictPlot[test_start_index:, :] = test_predict[:len(testPredictPlot) - test_start_index, :]


# Plot the results
plt.figure(figsize=(16, 8))
dates = df['Date']

# Use dates for x-axis
plt.plot(dates, scaler.inverse_transform(scaled_data), label='Actual Stock Price')
plt.plot(dates[time_step:len(train_predict) + time_step], trainPredictPlot[time_step:len(train_predict) + time_step], label='Train Prediction')
plt.plot(dates[test_start_index:test_start_index + len(test_predict)], testPredictPlot[test_start_index:test_start_index + len(test_predict)], label='Test Prediction')
plt.xlabel('Date')
plt.ylabel('Stock Price')
plt.legend()
plt.show()

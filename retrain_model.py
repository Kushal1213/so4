import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle
import os

# Load the dataset
dataset_path = os.path.join(os.path.dirname(__file__), 'dataset', 'Sleep_health_and_lifestyle_dataset.csv')
df = pd.read_csv(dataset_path)

print("Dataset loaded successfully")
print(f"Shape: {df.shape}")
print(f"\nColumns: {df.columns.tolist()}")

# Drop Person ID as it's not useful for prediction
df = df.drop('Person ID', axis=1)

# Encode categorical variables
label_encoders = {}

# Gender
df['Gender'] = LabelEncoder().fit_transform(df['Gender'])

# Occupation
occupation_encoder = LabelEncoder()
df['Occupation'] = occupation_encoder.fit_transform(df['Occupation'])
label_encoders['occupation'] = occupation_encoder

# BMI Category
bmi_mapping = {'Normal': 0, 'Normal Weight': 0, 'Overweight': 1, 'Obese': 1}
df['BMI Category'] = df['BMI Category'].map(bmi_mapping).fillna(0)

# Blood Pressure - extract systolic
df['Blood Pressure'] = df['Blood Pressure'].apply(lambda x: int(x.split('/')[0]))

# Encode target variable (Sleep Disorder)
# Replace 'None' with a proper label first
df['Sleep Disorder'] = df['Sleep Disorder'].fillna('No Disorder')
target_encoder = LabelEncoder()
df['Sleep Disorder'] = target_encoder.fit_transform(df['Sleep Disorder'])
label_encoders['target'] = target_encoder

print(f"\nTarget classes: {target_encoder.classes_}")

# Prepare features and target
feature_columns = ['Gender', 'Age', 'Occupation', 'Sleep Duration', 'Quality of Sleep', 
                   'Physical Activity Level', 'Stress Level', 'BMI Category', 
                   'Blood Pressure', 'Heart Rate', 'Daily Steps']

X = df[feature_columns]
y = df['Sleep Disorder']

print(f"\nFeature columns: {feature_columns}")
print(f"X shape: {X.shape}")
print(f"y shape: {y.shape}")

# Train Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

print("\nModel trained successfully")

# Save the model
model_path = os.path.join(os.path.dirname(__file__), 'app', 'model.pkl')
with open(model_path, 'wb') as f:
    pickle.dump(model, f)

print(f"Model saved to {model_path}")

# Save label encoders for reference
encoders_path = os.path.join(os.path.dirname(__file__), 'app', 'encoders.pkl')
with open(encoders_path, 'wb') as f:
    pickle.dump(label_encoders, f)

print(f"Encoders saved to {encoders_path}")

# Test prediction
test_sample = X.iloc[0:1]
prediction = model.predict(test_sample)
predicted_class = target_encoder.inverse_transform(prediction)[0]
print(f"\nTest prediction: {predicted_class}")
print(f"Actual class: {target_encoder.inverse_transform([y.iloc[0]])[0]}")
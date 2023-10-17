from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import base64

import dlib
import numpy as np
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Update your MongoDB connection details
MONGODB_HOST = 'karozisnas.duckdns.org'
MONGODB_PORT = 28018
MONGODB_DB = 'SDS-Project-4-Team-5'
MONGODB_USER = 'myUserAdmin'
MONGODB_PASS = 'Endless2-Drift-Turf.'

# Create a MongoClient instance with the new connection details
client = MongoClient(MONGODB_HOST, MONGODB_PORT, username=MONGODB_USER, password=MONGODB_PASS)
db = client[MONGODB_DB]
collection = db.model('User')


# Rest of your code remains the same
face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor("src/Models/shape_predictor_68_face_landmarks.dat")
face_recognizer = dlib.face_recognition_model_v1("src/Models/dlib_face_recognition_resnet_model_v1.dat")

# Rest of your code remains the same


def compute_embedding_from_image(image):
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    detected_faces = face_detector(image_rgb)
    if not detected_faces:
        return None

    shape = shape_predictor(image_rgb, detected_faces[0])
    embedding = face_recognizer.compute_face_descriptor(image_rgb, shape)
    return np.array(embedding)



@app.route('/login_with_face', methods=['POST'])
def login_with_face():
    try:
        encoded_data = request.form['image'].split(',')[1]
        image_data = base64.b64decode(encoded_data)
        image_np = np.frombuffer(image_data, dtype=np.uint8)
        image = cv2.imdecode(image_np, flags=1)

        embedding = compute_embedding_from_image(image)
        ...
    except Exception as e:
        print(f"Error encountered: {e}")
        return jsonify(status="error", message=str(e))

    if embedding is not None:
        all_users = collection.find({})
        for user in all_users:
            stored_embedding = np.array(user["embedding"])
            distance = np.linalg.norm(embedding - stored_embedding)

            if distance < 0.6:  # Threshold, might need fine-tuning
                return jsonify(status="success", username=user['username'])

    return jsonify(status="fail")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
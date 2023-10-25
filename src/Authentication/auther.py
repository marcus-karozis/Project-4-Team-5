from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import base64
import dlib
import numpy as np
from pymongo import MongoClient
from time import sleep

app = Flask(__name__)
CORS(app)

# MongoDB connection details
MONGODB_HOST = 'karozisnas.duckdns.org'
MONGODB_PORT = 28018
MONGODB_DB = 'SDS-Project-4-Team-5'
MONGODB_USER = 'myUserAdmin'
MONGODB_PASS = 'Endless2-Drift-Turf'

# Create a MongoClient instance with the new connection details
client = MongoClient(MONGODB_HOST, MONGODB_PORT, username=MONGODB_USER, password=MONGODB_PASS)
db = client[MONGODB_DB]
collection = db['users']

# Load face detector and recognizer
face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
face_recognizer = dlib.face_recognition_model_v1("dlib_face_recognition_resnet_model_v1.dat")

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
    sleep(2)
    try:
        encoded_data = request.form['image'].split(',')[1]
        image_data = base64.b64decode(encoded_data)
        image_np = np.frombuffer(image_data, dtype=np.uint8)
        image = cv2.imdecode(image_np, flags=1)

        embedding = compute_embedding_from_image(image)
        
    except Exception as e:
        print(f"Error encountered: {e}")
        return jsonify(status="error", message=str(e))

    if embedding is not None:
        all_users = collection.find({})
        user_count = collection.count_documents({})
        print(f"Found {user_count} users in the database")

        for user in all_users:
            # Defensive checks
            if "photo_string" not in user:
                print(f"User {user['_id']} has no photo_string.")
                continue
            elif not isinstance(user["photo_string"], list):
                print(f"photo_string for user {user['_id']} is not a list.")
                continue
            elif len(user["photo_string"]) == 0:
                print(f"photo_string for user {user['_id']} is empty.")
                continue
            
            # Extract the embedding from the user document
            stored_embedding = np.array(user["photo_string"], dtype=float)
            distance = np.linalg.norm(embedding - stored_embedding)

            if distance < 0.5:  # Adjusted threshold for enhanced security
                response_data = {
                    "status": "success",
                    "username": user['_id'],
                    "first_name": user['first_name'],
                    "last_name": user['last_name'],
                    "user_type": user['user_type']
                }

                # Return enrolment data only for students (user_type: 2)
                if user['user_type'] == 2:
                    response_data['enrolment'] = user['enrolment']
                    
                print(f"Password login successful for user: {user['_id']}") 
                return jsonify(response_data)

    return jsonify(status="fail")


@app.route('/login', methods=['POST'])
def login():
    try:
        # Extract the provided username and password from the request body
        data = request.json
        username = data['_id']
        password = data['password_cleartext']

        user = collection.find_one({'_id': username, 'password_cleartext': password})
        if user:
            print(f"Password login successful for user: {user['_id']}") 
            response_data = {
                "status": "success",
                "username": user['_id'],
                "first_name": user['first_name'],
                "last_name": user['last_name'],
                "user_type": user['user_type']
            }

            # Return enrolment data only for students (user_type: 2)
            if user['user_type'] == 2:
                response_data['enrolment'] = user['enrolment']

            return jsonify(response_data)
        else:
            return jsonify(status="fail", message="Invalid credentials")
    except Exception as e:
        print(f"Error encountered: {e}")
        return jsonify(status="error", message=str(e))


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

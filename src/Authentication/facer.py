import cv2
import dlib
import numpy as np

# Dlib setup
face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
face_recognizer = dlib.face_recognition_model_v1("dlib_face_recognition_resnet_model_v1.dat")

def capture_image_from_webcam():
    cap = cv2.VideoCapture(0)
    print("Press 'c' to capture image or 'q' to exit...")
    while True:
        ret, frame = cap.read()
        cv2.imshow('Capture Image', frame)
        key = cv2.waitKey(1)
        if key == ord('c'):
            break
        elif key == ord('q'):
            return None
    cap.release()
    cv2.destroyAllWindows()
    return frame

def extract_embedding_from_image(image):
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    detected_faces = face_detector(image_rgb)
    if not detected_faces:
        return None

    shape = shape_predictor(image_rgb, detected_faces[0])
    embedding = face_recognizer.compute_face_descriptor(image_rgb, shape)
    return np.array(embedding)

def get_face_id():
    username = input("Enter a name or identifier for the person (for display purposes): ")

    image = capture_image_from_webcam()
    if image is None:
        print("No image captured!")
        return

    embedding = extract_embedding_from_image(image)
    if embedding is None:
        print("No face detected!")
        return

    # Convert each element of the embedding to a string and join them with a comma and space
    embedding_str = ', '.join(map(str, embedding))

    print(f"Face ID for {username} is:")
    print(embedding_str)

def main():
    while True:
        print("\nOptions:")
        print("1: Get Face ID")
        print("2: Exit")
        choice = input("Enter your choice: ")

        if choice == "1":
            get_face_id()
        elif choice == "2":
            print("Exiting...")
            break

if __name__ == "__main__":
    main()

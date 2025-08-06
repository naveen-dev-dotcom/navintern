import cv2
from deepface import DeepFace
from collections import Counter

def get_video_emotion(video_path):
    cap = cv2.VideoCapture(video_path)
    emotion_counter = Counter()

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        try:
            result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
            dominant = result[0]['dominant_emotion']
            emotion_counter[dominant] += 1
        except:
            continue

    cap.release()
    if emotion_counter:
        return {
            "dominant_emotion": emotion_counter.most_common(1)[0][0],
            "emotions": dict(emotion_counter)
        }
    else:
        return {"dominant_emotion": "undetected", "emotions": {}}

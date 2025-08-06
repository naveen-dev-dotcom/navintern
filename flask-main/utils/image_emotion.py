from deepface import DeepFace


def get_image_emotion(image_path):
    """
    Analyze an image for facial emotions and return a JSON-serializable dict containing:
      - dominant_emotion: the emotion with the highest confidence
      - emotions: a dict of all emotions with confidence scores (native Python floats)
    """
    try:
        # Run DeepFace analysis
        result = DeepFace.analyze(
            img_path=image_path,
            actions=['emotion'],
            enforce_detection=False
        )

        # Extract emotion scores (they may be numpy types)
        raw_emotions = result[0]['emotion']
        # Convert to native Python floats for JSON serialization
        emotions = {emotion: float(confidence) for emotion, confidence in raw_emotions.items()}

        # Determine dominant emotion
        dominant_emotion = result[0]['dominant_emotion']

        # Sort emotions by confidence descending
        sorted_emotions = dict(
            sorted(emotions.items(), key=lambda item: item[1], reverse=True)
        )

        return {
            "dominant_emotion": dominant_emotion,
            "emotions": sorted_emotions
        }

    except Exception as e:
        # Return error message as JSON-serializable dict
        return {"error": str(e)}

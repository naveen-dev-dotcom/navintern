from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pydub import AudioSegment
from utils.extract_audio import extract_audio
from utils.video_emotion import get_video_emotion
from utils.audio_emotion import get_audio_emotion
from utils.transcribe import transcribe_audio
from utils.image_emotion import get_image_emotion

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'video' not in request.files:
        return jsonify({"error": "No file provided. Please upload a video (.mp4) or audio (.wav/.mp3/.ogg) file using 'video' key."}), 400

    file = request.files['video']
    filename = file.filename.lower()
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    result = {}

    try:
        if filename.endswith('.mp4'):
            # Extract audio from video
            audio_path = file_path.rsplit('.', 1)[0] + ".wav"
            extract_audio(file_path, audio_path)
            result["video_emotion"] = get_video_emotion(file_path)

        elif filename.endswith('.mp3'):
            audio_path = file_path.rsplit('.', 1)[0] + ".wav"
            sound = AudioSegment.from_file(file_path)
            sound.export(audio_path, format="wav")

        elif filename.endswith('.ogg'):
            audio_path = file_path.rsplit('.', 1)[0] + ".wav"
            sound = AudioSegment.from_file(file_path)
            sound.export(audio_path, format="wav")

        elif filename.endswith('.wav'):
            audio_path = file_path

        else:
            return jsonify({"error": "Unsupported file type. Please upload a .mp4, .wav, .mp3, or .ogg file."}), 400

        # Audio emotion and transcription
        result["audio_emotion"] = get_audio_emotion(audio_path)
        result["transcript"] = transcribe_audio(audio_path)

        return jsonify(result)

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500



@app.route('/analyze-image', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided."}), 400

    image_file = request.files['image']
    filename = image_file.filename.lower()

    if not (filename.endswith('.jpg') or filename.endswith('.jpeg') or filename.endswith('.png')):
        return jsonify({"error": "Unsupported image type. Please upload a .jpg, .jpeg, or .png file."}), 400

    image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
    image_file.save(image_path)

    try:
        emotion = get_image_emotion(image_path)
        return jsonify({"image_emotion": emotion})
    except Exception as e:
        return jsonify({"error": f"Image emotion detection failed: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)

import whisper

def transcribe_audio(audio_path):
    model = whisper.load_model("base")  # Can be "small", "medium", etc.
    result = model.transcribe(audio_path)
    return result["text"]

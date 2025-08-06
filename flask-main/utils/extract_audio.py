from pydub import AudioSegment

def extract_audio(video_path, audio_path):
    audio = AudioSegment.from_file(video_path)  # auto-detect format
    audio = audio.set_channels(1)               # mono
    audio = audio.set_frame_rate(16000)         # 16kHz for emotion models
    audio.export(audio_path, format="wav")

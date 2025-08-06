import torch
import torchaudio
from transformers import Wav2Vec2Processor, Wav2Vec2ForSequenceClassification
import torch.nn.functional as F

def get_audio_emotion(audio_path):
    model_name = "audeering/wav2vec2-large-robust-12-ft-emotion-msp-dim"
    model = Wav2Vec2ForSequenceClassification.from_pretrained(model_name)
    processor = Wav2Vec2Processor.from_pretrained(model_name)

    waveform, sr = torchaudio.load(audio_path)
    if sr != 16000:
        resampler = torchaudio.transforms.Resample(sr, 16000)
        waveform = resampler(waveform)

    inputs = processor(waveform[0], sampling_rate=16000, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits
        probs = F.softmax(logits, dim=1).squeeze().tolist()

    labels = list(model.config.id2label.values())
    emotions = {label: float(probs[i]) * 100 for i, label in enumerate(labels)}
    dominant = labels[int(torch.argmax(logits))]
    return {"dominant_emotion": dominant, "emotions": emotions}

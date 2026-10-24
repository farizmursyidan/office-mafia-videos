import sys, subprocess, re, numpy as np, soundfile as sf, sherpa_onnx
wav = sys.argv[1]
import os
d = os.environ.get("ASR_MODEL_DIR", os.path.expanduser("~/asr/sherpa-onnx-whisper-small.en")) + "/"
rec = sherpa_onnx.OfflineRecognizer.from_whisper(encoder=d+"small.en-encoder.int8.onnx", decoder=d+"small.en-decoder.int8.onnx", tokens=d+"small.en-tokens.txt", language="en", task="transcribe", num_threads=4)
audio, sr = sf.read(wav, dtype="float32")
out = subprocess.run(["ffmpeg","-i",wav,"-af","silencedetect=noise=-40dB:d=0.12","-f","null","-"],capture_output=True,text=True).stderr
st=[float(x) for x in re.findall(r"silence_start: ([0-9.]+)",out)]; en=[float(x) for x in re.findall(r"silence_end: ([0-9.]+)",out)]
dur=len(audio)/sr
# speech segments between silences
bounds=[]; prev=0.0
for a,b in zip(st,en):
    if a>prev+0.05: bounds.append((prev,a))
    prev=b
if dur>prev+0.05: bounds.append((prev,dur))
if sr!=16000:
    import scipy.signal as ss
    audio=ss.resample_poly(audio,16000,sr); sr=16000
for a,b in bounds:
    seg=audio[int(max(0,a-0.05)*sr):int((b+0.05)*sr)]
    s=rec.create_stream(); s.accept_waveform(sr,seg); rec.decode_stream(s)
    print(f"{a:6.2f} {b:6.2f}  {s.result.text.strip()}")

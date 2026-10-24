"""Insert silences into a voice WAV and remap timestamps.

usage: python3 pad_voice.py in.wav out.wav "t1:p1,t2:p2,..." [times...]
Each t:p inserts p seconds of silence at t seconds (in the input). Extra args are
input times to print remapped to output times.
"""
import sys, numpy as np
from scipy.io import wavfile
sr, x = wavfile.read(sys.argv[1])
ins = sorted((float(a), float(b)) for a, b in (s.split(':') for s in sys.argv[3].split(',') if s))
out, prev = [], 0
for at, p in ins:
    i = int(at * sr); out += [x[prev:i], np.zeros(int(p * sr), dtype=x.dtype)]; prev = i
out.append(x[prev:]); y = np.concatenate(out)
wavfile.write(sys.argv[2], sr, y)
m = lambda t: round(t + sum(p for at, p in ins if at <= t), 2)
for t in sys.argv[4:]:
    print(t, '->', m(float(t)))
print('total', round(len(y) / sr, 2))

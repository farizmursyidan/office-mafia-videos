"""Extra sound effects for Day 4: a scissor snip and a low hit."""
import numpy as np, os
from scipy.io import wavfile
from scipy.signal import butter, sosfilt
SR = 48000
OUT = os.path.join(os.path.dirname(__file__), "public", "sfx")
rng = np.random.default_rng(11)
def env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(t / max(a, 1e-4), 1.0) * np.exp(-t / d)
def write(name, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.89
    wavfile.write(os.path.join(OUT, name), SR, (x * 32767).astype(np.int16))
hp = lambda x, f: sosfilt(butter(2, f, "high", fs=SR, output="sos"), x)
# snip: two quick metallic clicks
n = int(0.35 * SR); t = np.arange(n) / SR
blade = hp(rng.standard_normal(n), 3500) * env(n, 0.0005, 0.012)
ring = np.sin(2 * np.pi * 4200 * t) * env(n, 0.0005, 0.02) * 0.3
snip = blade + ring
snip += np.roll(blade * 0.8 + ring * 0.6, int(0.09 * SR))
write("snip.wav", snip)
# hit: low cinematic thud
n = int(1.0 * SR); t = np.arange(n) / SR
f = 42 + 60 * np.exp(-t * 9)
hit = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.35)
hit += sosfilt(butter(2, 400, "low", fs=SR, output="sos"), rng.standard_normal(n)) * env(n, 0.001, 0.05) * 0.4
write("hit.wav", hit)
print("ok")
# ring: soft two-tone phone ring, two bursts
n = int(1.4 * SR); t = np.arange(n) / SR
tone = (np.sin(2 * np.pi * 880 * t) + 0.7 * np.sin(2 * np.pi * 1100 * t))
gate = (((t % 0.5) < 0.38) & (t < 1.3)).astype(float)
gate = np.convolve(gate, np.ones(200) / 200, mode="same")
trem = 0.6 + 0.4 * np.sin(2 * np.pi * 20 * t)
write("ring.wav", tone * gate * trem * 0.6)
# blip: short descending error tone
n = int(0.35 * SR); t = np.arange(n) / SR
f = 520 - 260 * (t / 0.35)
write("blip.wav", np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.12))
print("extra ok")

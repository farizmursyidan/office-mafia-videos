"""Synthesize the music bed and UI sound effects for the Office Mafia Shorts.

Everything is generated from scratch with numpy, so there are no licensing issues.
Outputs go to public/sfx/.
"""
import numpy as np
from scipy.signal import butter, sosfilt
from scipy.io import wavfile
import os, sys

SR = 48000
OUT = os.path.join(os.path.dirname(__file__), "public", "sfx")
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x)


def env(n, a, d):
    t = np.arange(n) / SR
    e = np.minimum(t / max(a, 1e-4), 1.0) * np.exp(-t / d)
    return e


def write(name, x, stereo=False):
    x = np.asarray(x, dtype=np.float64)
    peak = np.max(np.abs(x)) + 1e-9
    x = x / peak * 0.89
    if stereo and x.ndim == 1:
        x = np.stack([x, x], axis=1)
    wavfile.write(os.path.join(OUT, name), SR, (x * 32767).astype(np.int16))


# ---------------- UI sound effects ----------------
def ping():
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    x = (np.sin(2 * np.pi * 1318.5 * t) * env(n, 0.002, 0.12)
         + 0.6 * np.sin(2 * np.pi * 1975.5 * t) * env(n, 0.002, 0.09) * (t > 0.07)
         + 0.25 * np.sin(2 * np.pi * 2637 * t) * env(n, 0.002, 0.05))
    return x


def whoosh():
    n = int(0.42 * SR)
    noise = rng.standard_normal(n)
    t = np.arange(n) / SR
    shape = np.sin(np.pi * np.clip(t / 0.42, 0, 1)) ** 2
    # sweep a band from low to high
    out = np.zeros(n)
    seg = n // 12
    for i in range(12):
        lo = 300 + i * 220
        s = slice(i * seg, (i + 1) * seg if i < 11 else n)
        out[s] = bp(noise, lo, lo * 2.2)[s]
    return out * shape


def click():
    n = int(0.03 * SR)
    x = hp(rng.standard_normal(n), 2500) * env(n, 0.0005, 0.006)
    t = np.arange(n) / SR
    x += 0.4 * np.sin(2 * np.pi * 900 * t) * env(n, 0.0005, 0.004)
    return x


def send():
    n = int(0.25 * SR)
    t = np.arange(n) / SR
    f = 600 + 900 * t / 0.25
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env(n, 0.003, 0.06)


def lock():
    n = int(0.5 * SR)
    t = np.arange(n) / SR
    thunk = np.sin(2 * np.pi * (140 * np.exp(-t * 18) + 60) * t) * env(n, 0.001, 0.08)
    clk = hp(rng.standard_normal(n), 3000) * env(n, 0.0005, 0.01)
    clk2 = np.roll(clk, int(0.06 * SR)) * 0.7
    return thunk + 0.5 * clk + 0.4 * clk2


def pop():
    n = int(0.12 * SR)
    t = np.arange(n) / SR
    f = 380 + 500 * np.exp(-t * 40)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.035)


for name, fn in [("ping.wav", ping), ("whoosh.wav", whoosh), ("click.wav", click),
                 ("send.wav", send), ("lock.wav", lock), ("pop.wav", pop)]:
    write(name, fn())


# ---------------- Music bed: mellow lo-fi electric piano + soft drums ----------------
def music(total_sec, bpm=84, drums_off=()):
    n_total = int(total_sec * SR)
    L = np.zeros(n_total)
    R = np.zeros(n_total)
    beat = 60.0 / bpm
    bar = beat * 4

    def add(sig, start, pan=0.0, gain=1.0):
        i = int(start * SR)
        if i >= n_total:
            return
        sig = sig[: n_total - i] * gain
        L[i:i + len(sig)] += sig * (1 - max(pan, 0))
        R[i:i + len(sig)] += sig * (1 + min(pan, 0))

    def midi(m):
        return 440.0 * 2 ** ((m - 69) / 12)

    def ep_note(freq, dur, vel=1.0):
        n = int((dur + 1.2) * SR)
        t = np.arange(n) / SR
        idx = 1.8 * np.exp(-t * 6)  # FM index decays: bright attack, mellow tail
        mod = np.sin(2 * np.pi * freq * t)
        car = np.sin(2 * np.pi * freq * t + idx * mod)
        tine = 0.08 * np.sin(2 * np.pi * freq * 7.1 * t) * np.exp(-t * 30)
        amp = np.exp(-t * 1.1) * np.minimum(t / 0.004, 1)
        rel = np.clip((dur + 0.25 - t) / 0.25, 0, 1)
        trem = 1 + 0.12 * np.sin(2 * np.pi * 4.5 * t)
        return (car + tine) * amp * rel * trem * vel

    # Am9, Fmaj7, Cmaj7/E, G6 voicings (midi)
    prog = [
        [45, 57, 60, 64, 67, 71],
        [41, 57, 60, 64, 69],
        [40, 55, 59, 64, 67],
        [43, 55, 59, 62, 64],
    ]
    n_bars = int(np.ceil(total_sec / bar))
    for b in range(n_bars):
        chord = prog[b % 4]
        t0 = b * bar
        # bass note on 1, a soft re-hit on the "and" of 3
        for k, m in enumerate(chord):
            f = midi(m)
            if k == 0:
                add(lp(ep_note(f, bar * 0.9, 0.9), 900), t0, 0, 0.55)
            else:
                strum = 0.012 * k
                pan = (-0.35 + 0.7 * (k / len(chord)))
                add(ep_note(f, beat * 2.4, 0.5), t0 + strum, pan, 0.30)
                add(ep_note(f, beat * 1.2, 0.35), t0 + beat * 2.5 + strum, pan, 0.22)

    # Drums
    def kick():
        n = int(0.5 * SR)
        t = np.arange(n) / SR
        f = 48 + 90 * np.exp(-t * 28)
        return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.16)

    def snare():
        n = int(0.3 * SR)
        t = np.arange(n) / SR
        body = np.sin(2 * np.pi * 190 * t) * env(n, 0.001, 0.05)
        nz = bp(rng.standard_normal(n), 1200, 6000) * env(n, 0.001, 0.07)
        return 0.5 * body + 0.6 * nz

    def hat():
        n = int(0.08 * SR)
        return hp(rng.standard_normal(n), 7000) * env(n, 0.0005, 0.018)

    def drums_on(t):
        return not any(a <= t < b for a, b in drums_off)

    swing = 0.06 * beat
    n_beats = int(total_sec / beat)
    for i in range(n_beats):
        t = i * beat
        if not drums_on(t):
            continue
        pos = i % 4
        if pos in (0,) or (pos == 2 and (i // 4) % 2 == 1):
            add(kick(), t, 0, 0.75)
        if pos == 2 and (i // 4) % 2 == 0:
            add(kick(), t + beat * 0.5, 0, 0.45)
        if pos in (1, 3):
            add(snare(), t + 0.01, 0.05, 0.28)
        add(hat(), t, 0.25, 0.13)
        add(hat(), t + beat / 2 + swing, 0.25, 0.09)

    mix = np.stack([L, R], axis=1)
    # lo-fi colour: gentle low-pass, soft saturation, a little vinyl noise
    mix = np.stack([lp(mix[:, 0], 5200), lp(mix[:, 1], 5200)], axis=1)
    mix = np.tanh(mix * 1.3) / 1.3
    vinyl = lp(rng.standard_normal(n_total), 3000) * 0.004
    crackle = (rng.random(n_total) > 0.9996) * rng.standard_normal(n_total) * 0.06
    mix += np.stack([vinyl + crackle, vinyl + crackle], axis=1)
    # fade in/out
    fade_in = np.clip(np.arange(n_total) / (1.0 * SR), 0, 1)
    fade_out = np.clip((n_total - np.arange(n_total)) / (2.5 * SR), 0, 1)
    mix *= (fade_in * fade_out)[:, None]
    return mix


if __name__ == "__main__":
    # usage: python3 make_audio.py <seconds> [output_name] [drums_off_start] [drums_off_end]
    total = float(sys.argv[1]) if len(sys.argv) > 1 else 58.0
    name = sys.argv[2] if len(sys.argv) > 2 else "music.wav"
    off = ((float(sys.argv[3]), float(sys.argv[4])),) if len(sys.argv) > 4 else ((8.2, 12.45),)
    write(name, music(total, drums_off=off), stereo=True)
    print("audio written to", OUT)

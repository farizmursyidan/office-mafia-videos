"""Generate a voiceover with Gemini TTS (same voice/model as AI Studio).

usage: python3 gemini_tts.py <script.txt> <out.wav> [voice] [model]
Reads the API key from $GEMINI_API_KEY or /root/.secrets/gemini_key. Never commit the key.
"""
import base64, json, os, sys, wave, urllib.request

STYLE = ("Read this like a sharp friend explaining office politics over coffee. Male, early 30s, relaxed and confident, "
         "a little conspiratorial. Never sound like an announcer or a movie trailer. Natural conversational pace, around "
         "160 words per minute: slightly faster through lists, slower on the punchlines. Warm, steady energy. Natural "
         "pauses between sections only, not after every sentence.")

def main():
    script = open(sys.argv[1]).read().strip()
    out = sys.argv[2]
    voice = sys.argv[3] if len(sys.argv) > 3 else "Zubenelgenubi"
    model = sys.argv[4] if len(sys.argv) > 4 else "gemini-3.8-flash-tts"
    key = os.environ.get("GEMINI_API_KEY") or open("/root/.secrets/gemini_key").read().strip()
    body = {
        "contents": [{"parts": [{"text": (
            "# AUDIO PROFILE: Office Mafia narrator\n\n"
            "## THE SCENE: A sharp friend explaining office politics over coffee\n\n"
            f"### DIRECTOR'S NOTES\n{STYLE}\n\n#### TRANSCRIPT\n{script}")}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}},
        },
    }
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
        data=json.dumps(body).encode(), headers={"Content-Type": "application/json", "x-goog-api-key": key})
    try:
        resp = json.load(urllib.request.urlopen(req, timeout=300))
    except urllib.error.HTTPError as e:
        sys.exit(f"Gemini error {e.code}: {e.read().decode()[:600]}")
    part = resp["candidates"][0]["content"]["parts"][0]["inlineData"]
    pcm = base64.b64decode(part["data"])
    if pcm[:4] == b"RIFF":  # already a complete WAV file
        open(out, "wb").write(pcm)
        import wave as _w
        with _w.open(out) as r:
            print(f"wrote {out}: {r.getnframes() / r.getframerate():.2f}s at {r.getframerate()} Hz")
        return
    rate = 24000
    for tok in part.get("mimeType", "").split(";"):
        if tok.strip().startswith("rate="):
            rate = int(tok.strip()[5:])
    with wave.open(out, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate); w.writeframes(pcm)
    print(f"wrote {out}: {len(pcm) / 2 / rate:.2f}s at {rate} Hz ({part.get('mimeType')})")

if __name__ == "__main__":
    main()

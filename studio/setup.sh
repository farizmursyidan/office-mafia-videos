#!/bin/bash
# One-time setup for a fresh workspace. Run from studio/: bash setup.sh
set -e
cd "$(dirname "$0")"
npm ci --no-audit --no-fund
pip install --break-system-packages -q numpy scipy soundfile sherpa-onnx
if [ ! -f ~/asr/sherpa-onnx-whisper-small.en/small.en-encoder.int8.onnx ]; then
  mkdir -p ~/asr && cd ~/asr
  curl -sSL -o m.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-small.en.tar.bz2
  tar xjf m.tar.bz2 && rm m.tar.bz2
fi
cd - >/dev/null
python3 make_sfx_extra.py >/dev/null
which ffmpeg >/dev/null && echo "setup ok"

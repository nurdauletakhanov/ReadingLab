#!/usr/bin/env python3
"""Import a rendered walkthrough into the site.

Usage:
  python3 scripts/import_video.py <src.mp4> <src.srt> <slug> [--height 720] [--crf 27]

What it does:
  1. Re-encodes the video for the web into public/videos/<slug>/<slug>.mp4
     (h264, capped at --height, 15 fps, mono 64k AAC, faststart).
  2. Grabs a poster frame into public/videos/<slug>/poster.jpg.
  3. Copies the SRT verbatim to src/content/videos/<slug>.srt.
  4. Writes src/content/videos/<slug>.yaml with a stub if it does not exist yet.
Chapters and key results are authored by hand in that yaml.
"""
import argparse
import json
import pathlib
import shutil
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent


def run(cmd):
    print("+", " ".join(str(c) for c in cmd), flush=True)
    subprocess.run(cmd, check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("srt")
    ap.add_argument("slug")
    ap.add_argument("--height", type=int, default=720)
    ap.add_argument("--crf", type=int, default=27)
    a = ap.parse_args()

    out_dir = ROOT / "public" / "videos" / a.slug
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / f"{a.slug}.mp4"
    poster = out_dir / "poster.jpg"

    run([
        "ffmpeg", "-y", "-loglevel", "error", "-stats", "-i", a.src,
        "-vf", f"scale=-2:'min({a.height},ih)',fps=15,format=yuv420p",
        "-c:v", "libx264", "-preset", "slow", "-crf", str(a.crf), "-tune", "animation",
        "-profile:v", "high", "-level", "4.0",
        "-c:a", "aac", "-ac", "1", "-b:a", "64k",
        "-movflags", "+faststart", str(out),
    ])
    run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "3", "-i", str(out),
         "-frames:v", "1", "-q:v", "3", str(poster)])

    srt_dst = ROOT / "src" / "content" / "videos" / f"{a.slug}.srt"
    srt_dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy(a.srt, srt_dst)

    probe = json.loads(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", str(out)
    ]))
    dur = round(float(probe["format"]["duration"]))
    mb = out.stat().st_size / 1e6
    print(f"{out.relative_to(ROOT)}: {mb:.1f} MB, {dur}s")
    if mb > 15:
        print("WARNING: over 15 MB. Re-run with --crf 30 or --height 480.", file=sys.stderr)

    yaml_dst = ROOT / "src" / "content" / "videos" / f"{a.slug}.yaml"
    if not yaml_dst.exists():
        yaml_dst.write_text(f"""title: "{a.slug}"
eyebrow: Paper walkthrough
session: 0
summary: ""
paper:
  authors: ""
  title: ""
  year: 2000
mp4: videos/{a.slug}/{a.slug}.mp4
srt: {a.slug}.srt
poster: videos/{a.slug}/poster.jpg
durationSec: {dur}
chapters:
  - {{ title: Introduction, at: 0 }}
keyResults: []
""")
        print(f"wrote stub {yaml_dst.relative_to(ROOT)} - fill in title, paper, chapters")
    else:
        print(f"{yaml_dst.relative_to(ROOT)} exists; not touched (durationSec is {dur})")


if __name__ == "__main__":
    main()

#!/usr/bin/env bash
# Kontaktní list: mřížka rovnoměrně rozložených snímků z videa s časem v rohu.
# Použití: kontaktni-list.sh video.mp4 [sloupce=4] [řádky=4] [šířka_dlaždice=480] [výstup.png]
set -euo pipefail

in="${1:?Zadej cestu k videu}"
cols="${2:-4}"; rows="${3:-4}"; w="${4:-480}"
out="${5:-${in%.*}-list.png}"
n=$((cols * rows))

frames=$(ffprobe -v error -select_streams v:0 -count_packets \
  -show_entries stream=nb_read_packets -of csv=p=0 "$in")
step=$(( frames / n )); [ "$step" -lt 1 ] && step=1

sel="select='not(mod(n\,${step}))',scale=${w}:-2"
stamp="drawtext=text='%{pts\:hms}':x=8:y=8:fontsize=20:fontcolor=white:box=1:boxcolor=black@0.6:boxborderw=4"
tile="tile=${cols}x${rows}:padding=4:color=white"

# Čas v rohu potřebuje písmo; když chybí, vznikne list bez času.
if ! ffmpeg -v error -y -i "$in" -vf "${sel},${stamp},${tile}" -frames:v 1 -fps_mode vfr "$out" 2>/dev/null; then
  ffmpeg -v error -y -i "$in" -vf "${sel},${tile}" -frames:v 1 -fps_mode vfr "$out"
fi
echo "$out (${frames} snímků, každý ${step}.)"

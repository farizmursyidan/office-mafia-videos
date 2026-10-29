# Office Mafia daily Short: runbook

This is the procedure for producing one Office Mafia YouTube Short / TikTok per day, end to end,
without human input. Account IDs and the Gemini API key are given in the scheduled task's prompt,
never in this public repo.

## 0. Setup (fresh workspace)

```bash
cd ~/office-mafia-videos/studio && bash setup.sh
mkdir -p /root/.secrets && chmod 700 /root/.secrets
# write the Gemini key from the task prompt to /root/.secrets/gemini_key (chmod 600). Never commit it.
```

Chromium for rendering: `/opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell`
(find the exact path with `ls -d /opt/pw-browsers/chromium_headless_shell-*`). Machine has 2 CPU cores:
never run renders in parallel.

## 1. Refresh stats for earlier videos (Notion)

Before making the new video, update every earlier row in the Notion Videos data source:
- Metricool `getScheduledPosts` from the first Publish date to now: posts with status PUBLISHED give the
  public YouTube, TikTok and Instagram URLs. Set Status "Published" once at least the YouTube post is live
  (never change a row whose Status is "Archived"), and fill YouTube URL, TikTok URL, Instagram URL.
- Metricool analytics (`getAnalyticsDataByMetrics`, range = first Publish date to today):
  - TikTok per video: TKPO03 (url), TKPO07 views, TKPO08 likes, TKPO10 shares. Match rows by video id in the URL.
  - Instagram reels: IGRE06 (url), IGRE23 views. Match by URL or publish date.
  - YouTube per video: YTVV05 (url), YTVV06 views, YTVV11 comments, YTVV08 avg view duration. Write to
    Views and Comments only when the value is not null. Metricool's YouTube per-video numbers can lag or
    stay empty; never overwrite a number someone typed in with an empty value.
  - Do not fetch youtube.com pages directly (YouTube blocks automated reads).
- Set "Stats updated" to today on every row you refreshed.

## 2. Pick the day number, topic and post time

- Query the Notion Videos data source. Day N = highest `Day` + 1.
- Read every existing Title and Hook so the new topic does not repeat one already covered.
- Post time: 20:45 Asia/Jakarta on the day after the latest `Publish date` in Notion
  (videos are always made one day ahead). If that moment is less than 2 hours away or already past,
  use the next day at 20:45.

## 3. Write the script (brand rules)

Voice: a sharp friend explaining office politics over coffee. Practical, slightly conspiratorial, never
preachy, never motivational-poster. English only.

Hard rules:
- No em dashes or en dashes anywhere (script, titles, descriptions, captions, code strings).
- 125 to 150 words, so the final video lands at 50 to 58 seconds. Must stay under 60 s.
- No pause tags like `<short pause>` (TTS reads them aloud). Pauses are added in the edit.
- Structure:
  1. Hook (1 to 3 very short sentences, under 2.5 s each). Talk to "you", make it about something happening
     to the viewer right now, and end on tension, e.g. "Your company is planning a reorg right now. Your boss
     already knows. You'll be the last to know." Avoid generic openers ("X is never a surprise", "Here's why").
     The first frame must already show the hook's main visual (no empty card fading in), with motion within 0.5 s.
  2. One line of context or "the rule nobody tells you"
  3. Three numbered moves ("Move one: ...", or "Rule one", "Sign one"), each with one concrete, specific example
  4. Punch line: two short contrasting sentences
  5. Question for the comments, then: "Tell me in the comments. The full playbook is linked on the channel."
- Topics so far are listed in Notion. Good territory: credit, visibility, managers, meetings, promotions,
  office alliances, gatekeepers, reorgs, performance reviews, difficult coworkers, email politics, saying no.

Save the script to `studio/scripts/dayN.txt`.

Create the Notion row (Videos data source) with: Title "Day N: <Name>", Day, Status "Script ready",
Tool "Remotion", Voice "Zubenelgenubi", Hook, YouTube title (under 60 chars, curiosity-driven),
Description (hook, the 3 moves as a list, the comment question, then exactly:
"The full office politics playbook:\nhttps://officemafia.gumroad.com/l/officemafiaebook\n\nDaily office politics on Threads: @officemafia99\n\n#officepolitics #careeradvice #corporatelife #worktips #shorts"),
and page content with the voiceover text and a scene plan table. Follow the Day 8 page as the template.

## 4. Voice

```bash
cd ~/office-mafia-videos/studio
python3 tools/gemini_tts.py scripts/dayN.txt public/voice/dayN_raw.wav
python3 tools/asr_segments.py public/voice/dayN_raw.wav
```

- Compare the transcript with the script. Segment-level ASR splits words oddly; if a line looks wrong,
  re-transcribe that time range as one chunk before concluding the voice is wrong. If the voice truly
  skipped, repeated or misread words, or read the director's notes aloud, regenerate once.
- Add pauses with `tools/pad_voice.py`: about 0.3 to 0.5 s before each Move and before the punch line,
  0.5 s before the closing question. Keep the total voice under 56 s. The tool prints remapped times
  for every timestamp you pass; use those for scene and caption timing.

## 5. Build the video (Remotion)

- Copy `src/Day8.tsx` to `src/DayN.tsx` as the starting point, rename `SCENES8`/`DAY8_DURATION`/`Day8`,
  register it in `src/Root.tsx`.
- Motion style (owner feedback, Day 13): smooth, not bouncy. Use `src/Day13.tsx` as the reference for motion:
  eased entrances (`ez` helper, expo ease out) instead of low-damping springs, crossfades between scenes
  (each Sequence runs 0.35 s past its end under the next scene), staggered rows, strike-throughs and
  highlights that draw across instead of popping, gentle idle float or breathing, word-by-word serif reveals,
  a drifting glow on dark cards, and a thin progress bar at the top.
- Every scene must show something specific to the script, not just text. Mix:
  - animated character scenes (Person, Fg scaler, Table/desk, CoffeeStation, Screen, Spotlight from
    Day6 to Day8),
  - UI mockups (ChatCard + Bubble, email compose with typedText/TypeClicks, calendar cards, trackers),
  - dark cards for the rule and the punch line (SerifLine), and the standard End card.
- Scene boundaries sit in the silences between sections. Captions: one entry per spoken sentence with
  `start` = speech start, `se` = speech end, `end` = just before the next caption.
- Layout rules learned the hard way: StepLabel occupies y 210 to 400; keep scene content between 420
  and 1180; captions at top 1250 to 1290. Arms with large angles (over ~120) cover faces; use pointing
  arms around 60 to 80 degrees, or a straight raised hand around 170. `armL` on a `facing={-1}` person points
  left. Clapping does not read in this style.
- Music: `python3 make_audio.py <total_seconds> music_dayN.wav <punch_start> <punch_end>` (drums drop
  out during the punch line). Music volume 0.13, rising to 0.32 after the voice ends.

Check before the full render:
```bash
node stills.mjs DayN out/sN <frame> <frame> ...   # 12 to 16 frames across all scenes
```
Make a contact sheet with PIL and look at it. Fix overlaps, clipped text, characters covering bubbles
or the reverse, then re-check the frames you changed.

Render and normalize:
```bash
npx remotion render src/index.ts DayN out/dayN_raw.mp4 --browser-executable=<chromium> --crf=18 --log=error
./normalize.sh out/dayN_raw.mp4 out/Office_Mafia_DayN_<Name_With_Underscores>.mp4
```
Verify: duration under 60 s, loudness about -14 LUFS (`ffmpeg -i f -af ebur128=peak=true -f null -`),
and look at a 14-frame contact sheet of the final MP4.

## 6. Publish

1. Copy the MP4 to the repo root, commit ("Add Day N: <Name>"), push. Confirm
   `https://raw.githubusercontent.com/farizmursyidan/office-mafia-videos/main/<file>.mp4` returns 200.
2. Metricool (blogId and timezone in the task prompt): three scheduled posts (YouTube, TikTok, Instagram) at the chosen time, media =
   the raw GitHub URL.
   - YouTube: provider youtube, text = the Notion Description, firstCommentText =
     "The full office politics playbook: https://officemafia.gumroad.com/l/officemafiaebook",
     youtubeData {title, type "short", privacy "public", tags (5), category "EDUCATION",
     madeForKids false, isAiGeneratedContent false}.
   - TikTok: provider tiktok, a shorter caption (hook, one line, the question with a pointing-down emoji,
     "Full office politics playbook: link in bio", hashtags #officepolitics #careeradvice #corporatelife
     #worktok #career), tiktokData {privacyOption "PUBLIC_TO_EVERYONE", title, all toggles false}.
   - Instagram: provider instagram, the same caption style as TikTok but with hashtags
     #officepolitics #careeradvice #corporatelife #worklife #career,
     instagramData {type "REEL", showReelOnFeed true, isAiGenerated false}. Same time as the others.
   - If Metricool returns "Failed to normalize media", wait a minute and retry once.
3. Update the Notion row: Status "Scheduled", Duration (s), Publish date (datetime, +07:00),
   Pinned comment checked, Learnings (one line on anything that went wrong or was learned).

## 7. Safety rules

- Never schedule a video that failed any check. If something cannot be fixed, set the Notion row's
  Status to "Script ready" or "Rendered", write the problem in Learnings, and stop.
- Never commit the API key or anything from /root/.secrets.
- Do not delete files from the repo or posts from Metricool.

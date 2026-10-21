The supplied Orthotrack motion film is installed as orthotrack-motion.mp4 (10 seconds, 1280 x 720, optimised to 4.9 MB with fast-start streaming).

Replace that file or set media.story.video in src/lib/content.ts to update the expanding film. The poster is set by media.story.poster.

ExpandingFilm in src/components/scroll-experience.tsx contains the GSAP scroll expansion, visibility-based playback, pause control, and separate native video player.

The installed film is an H.264 encode of the original 12.1 MB source; the original in Downloads is unchanged. Preserve centre-safe framing for the portrait crop on phones. If adding speech, provide captions in the video or add a WebVTT track.

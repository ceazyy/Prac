# Background Video Setup

## Required Video File

To display the background video on the homepage, you need to add the following video file:

**File Name:** `bnr-video.mp4`
**Location:** `assets/images/bnr-video.mp4`

## Video Specifications

The video should meet these requirements:
- **Format:** MP4 (H.264 codec recommended)
- **Resolution:** 1920x1080 or higher (Full HD minimum)
- **Aspect Ratio:** 16:9 
- **Duration:** 10-30 seconds (will loop automatically)
- **Size:** Under 10MB for optimal loading
- **Audio:** No audio needed (video will be muted)

## Optional WebM Version

For better browser compatibility, you can also add:
**File Name:** `bnr-video.webm`
**Location:** `assets/images/bnr-video.webm`

## Fallback Behavior

If the video files are not present, the website will automatically fall back to:
- Animated gradient backgrounds
- Smooth color transitions
- Floating visual effects

This ensures the website works perfectly even without the video files.

## How to Add the Video

1. Obtain the `bnr-video.mp4` file from the original Crayons Network website
2. Place it in the `assets/images/` directory
3. Refresh the website - the video will automatically load and play

## Source Reference

The video implementation is based on the original Crayons Network website:
- Original path: `assets/images/bnr-video.mp4`
- Video attributes: autoplay, loop, muted, playsinline
- Used as full-screen background with overlay effects 
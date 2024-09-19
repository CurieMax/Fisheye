export function mediaFactory(media) {
  const mediaSrc = media.src;
  const fileType = mediaSrc.split('.').pop().toLowerCase();

  // Check if it's a video based on the file extension
  if (fileType === "mp4" || fileType === "webm" || fileType === "ogg") {
    return { type: "video", src: mediaSrc };
  } else {
    return { type: "image", src: mediaSrc };
  }
}
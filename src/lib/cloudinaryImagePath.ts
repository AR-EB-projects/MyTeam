export function extractUploadPathFromCloudinaryUrl(url: string): string {
  const marker = "/upload/";
  const markerIndex = url.indexOf(marker);
  if (markerIndex === -1) {
    return url.trim();
  }
  return url.slice(markerIndex + marker.length).trim();
}

export function buildCloudinaryUrlFromUploadPath(
  uploadPath: string,
  cloudName: string,
): string {
  return `https://res.cloudinary.com/${cloudName}/image/upload/${uploadPath}`;
}

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
  transformations?: string,
): string {
  const cleanTransforms = transformations?.trim().replace(/\/+$/g, "") ?? "";
  const transformSegment = cleanTransforms ? `${cleanTransforms}/` : "";
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformSegment}${uploadPath}`;
}

export function applyCloudinaryTransformToUrl(url: string, transformations: string): string {
  const cleanUrl = url.trim();
  const cleanTransforms = transformations.trim().replace(/^\/+|\/+$/g, "");
  if (!cleanUrl || !cleanTransforms) {
    return cleanUrl;
  }

  const marker = "/image/upload/";
  const markerIndex = cleanUrl.indexOf(marker);
  if (markerIndex === -1) {
    return cleanUrl;
  }

  const prefix = cleanUrl.slice(0, markerIndex + marker.length);
  const suffix = cleanUrl.slice(markerIndex + marker.length).replace(/^\/+/, "");
  if (!suffix) {
    return cleanUrl;
  }

  if (suffix.startsWith(`${cleanTransforms}/`)) {
    return cleanUrl;
  }

  return `${prefix}${cleanTransforms}/${suffix}`;
}

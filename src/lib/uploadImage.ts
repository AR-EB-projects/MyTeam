export interface UploadImageResponse {
  secure_url: string;
  public_id: string;
}

export type UploadImageType = "player" | "club";

const MAX_UPLOAD_BYTES = 9 * 1024 * 1024; // 9 MB — stays under Cloudinary free plan's 10 MB raw upload limit

export function validateImageFile(file: File): string | null {
  if (file.size > MAX_UPLOAD_BYTES) {
    return `Снимката е твърде голяма (${(file.size / 1024 / 1024).toFixed(1)} MB). Максималният размер е 9 MB.`;
  }
  return null;
}

export async function uploadImage(
  file: File,
  type: UploadImageType,
  name: string,
): Promise<UploadImageResponse> {
  const sizeError = validateImageFile(file);
  if (sizeError) throw new Error(sizeError);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("name", name);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = "Грешка при качване на снимката";
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }

  return (await response.json()) as UploadImageResponse;
}

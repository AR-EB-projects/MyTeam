export interface UploadImageResponse {
  secure_url: string;
  public_id: string;
}

export type UploadImageType = "player" | "club";

export async function uploadImage(
  file: File,
  type: UploadImageType,
  name: string,
): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("name", name);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  return (await response.json()) as UploadImageResponse;
}

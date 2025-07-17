import { API_URL } from "@/constants";

export async function sendFileInChunksHttp(file, uniqueUrl, randomFileId, onProgress, senderName) {
  const CHUNK_SIZE = 1 * 1024 * 1024;
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  const fileId = randomFileId;

  for (let index = 0; index < totalChunks; index++) {
    const start = index * CHUNK_SIZE;
    const end = Math.min(file.size, start + CHUNK_SIZE);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("fileId", fileId);
    formData.append("chunkIndex", index.toString());
    formData.append("totalChunks", totalChunks.toString());
    formData.append("uniqueUrl", uniqueUrl);
    formData.append("filename", file.name);
    formData.append("size", file.size);
    if (senderName) {
      formData.append("senderName", senderName);
    }

    const res = await fetch(`${API_URL}/api/uploads/chunk`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "업로드 실패");
    }

    const result = await res.json();
    onProgress(result.progress, fileId);
  }

  await fetch(`${API_URL}/api/uploads/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileId,
      fileName: file.name,
      totalChunks,
      size: file.size,
      uniqueUrl,
      senderName,
    }),
  });
}

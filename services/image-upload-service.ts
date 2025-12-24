import { API_URL } from "@/constants/config";
import axios from "axios";

interface UploadResponse {
  success: boolean;
  data: {
    url: string;
    key: string;
    size: number;
    contentType: string;
  };
}

export default function getImageUploadService({ token }: { token: string }) {
  const client = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  function handleServiceError(error: unknown, defaultMessage: string): never {
    console.error(defaultMessage, error);
    throw new Error(
      " Ocurrió un error al conectar con el servidor. Intenta más tarde."
    );
  }

  async function uploadImage(imageData: FormData): Promise<string> {
    try {
      const response = await client.post<UploadResponse>("/images", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data.url;
    } catch (error) {
      handleServiceError(error, "Error uploading image:");
    }
  }

  return {
    uploadImage,
  };
}

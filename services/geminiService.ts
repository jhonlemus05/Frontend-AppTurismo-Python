import { GroundingChunk } from '../types';

const BACKEND_ENDPOINT = (import.meta.env.VITE_BACKEND_URL || 'https://backend-appturismo-python.onrender.com') + '/api/chat';

export async function runChat(prompt: string, location: { latitude: number; longitude: number } | null) {
  try {
    const backendResponse = await fetch(BACKEND_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt, location }),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({ error: backendResponse.statusText }));
      throw new Error(`Error del servidor: ${errorData.error || 'Error desconocido'}`);
    }

    const { response } = await backendResponse.json();

    const responseText = response || "No he recibido una respuesta válida de mi servidor.";

    return {
      responseText,
      placesInfo: [],
      mapLinks: []
    };

  } catch (error: any) {
    console.error('Error in runChat function:', error);
    return {
      responseText: `Lo siento, tengo problemas para conectarme con mi servidor. Por favor, asegúrate de que esté en funcionamiento e inténtalo de nuevo. (${error.message || error})`,
      placesInfo: [],
      mapLinks: [],
    };
  }
}

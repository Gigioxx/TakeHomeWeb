// Cache for watermarked images to avoid repeated requests
const watermarkedImageCache = new Map<string, string>();

/**
 * Watermarks an image by sending it to the watermark service
 * @param imageUrl - The original image URL
 * @returns Promise that resolves to the watermarked image data URL
 */
export async function watermarkImage(imageUrl: string): Promise<string> {
  // Check if we already have this image watermarked in cache
  if (watermarkedImageCache.has(imageUrl)) {
    return watermarkedImageCache.get(imageUrl)!;
  }

  try {
    // Fetch the original image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    // Get the image bytes
    const imageBytes = await imageResponse.arrayBuffer();
    
    // Send to watermark service
    const watermarkResponse = await fetch('https://us-central1-copilot-take-home.cloudfunctions.net/watermark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': imageBytes.byteLength.toString(),
      },
      body: imageBytes,
    });

    if (!watermarkResponse.ok) {
      throw new Error(`Watermark service failed: ${watermarkResponse.statusText}`);
    }

    // Get the watermarked image bytes
    const watermarkedBytes = await watermarkResponse.arrayBuffer();
    
    // Convert to data URL for use in img src
    const blob = new Blob([watermarkedBytes], { type: 'image/jpeg' });
    const dataUrl = URL.createObjectURL(blob);
    
    // Cache the result
    watermarkedImageCache.set(imageUrl, dataUrl);
    
    return dataUrl;
  } catch (error) {
    console.error('Error watermarking image:', error);
    // Return original image URL as fallback
    return imageUrl;
  }
}


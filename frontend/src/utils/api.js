export async function fetchWithRetry(url, options = {}, retries = 3, delayMs = 4000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        errorType: 'official',
        message: 'Official result website returned an error. Try again later.'
      };
    }

    return { success: true, data };
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      return fetchWithRetry(url, options, retries - 1, delayMs);
    }

    return {
      success: false,
      errorType: 'backend',
      message: 'Server is waking up or unavailable. Please try again.'
    };
  }
}

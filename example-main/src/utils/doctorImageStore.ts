// Utility for storing and managing custom doctor profile photos in local storage

const STORAGE_KEY = 'custom_doctor_images_v1';

export const getCustomDoctorImages = (): Record<string, string> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const setCustomDoctorImage = (doctorId: string, dataUrl: string): void => {
  try {
    const current = getCustomDoctorImages();
    current[doctorId] = dataUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    // Dispatch custom event to notify components
    window.dispatchEvent(new Event('doctor-images-updated'));
  } catch (err) {
    console.error('Failed to save doctor image:', err);
  }
};

export const resetDoctorImages = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('doctor-images-updated'));
  } catch (err) {
    console.error('Failed to reset doctor images:', err);
  }
};

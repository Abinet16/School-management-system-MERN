import { useState } from 'react';
const REACT_APP_BASE_URL = "http://localhost:5000"  // Your API client

export const useSubmitComplaint = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitComplaint = async (formData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('urgency', formData.urgency);
      if (formData.attachment) {
        formDataToSend.append('attachment', formData.attachment);
      }

      const response = await REACT_APP_BASE_URL.post('/complaints', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitComplaint, isLoading, error };
};
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { OutingDisplay } from "../component/outingDisplay/outingdisplay";
import { Loader2 } from "lucide-react";

export const OutingPage = () => {
  const [outing, setOuting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { outingId } = useParams();

  useEffect(() => {
    const fetchOuting = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/outings/${outingId}`);
        console.log('Outing Data:', response.data);
        setOuting(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching outing:', error);
        
        if (error.response) {
          setError({
            message: error.response.data.message || 'Failed to fetch outing',
            status: error.response.status
          });
        } else if (error.request) {
          setError({
            message: 'No response received from server',
            status: null
          });
        } else {
          setError({
            message: 'Error setting up the request',
            status: null
          });
        }
        setLoading(false);
      }
    };

    if (outingId) {
      fetchOuting();
    }
  }, [outingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Outing</h2>
        <p className="text-gray-700 mb-2">Status: {error.status || 'Unknown'}</p>
        <p className="text-gray-600">{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!outing) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-600">Outing Not Found</h2>
      </div>
    );
  }

  return (
    <div>
      <OutingDisplay outing={outing} />
    </div>
  );
};

export default OutingPage;
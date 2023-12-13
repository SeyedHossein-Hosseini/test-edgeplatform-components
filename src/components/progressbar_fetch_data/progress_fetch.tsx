// YourComponent.tsx

import React, { useState, useEffect } from 'react';
import ProgressBar from './Progressbar';

const YourComponent: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const totalSize = parseInt(response.headers.get('Content-Length') || '0', 10);
        let loadedSize = 0;

        const reader = response.body!.getReader();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          loadedSize += value!.length;
          setProgress((loadedSize / totalSize) * 100);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <ProgressBar percentage={progress} />
      ) : (
        <div>
          {/* Render your fetched data here */}
        </div>
      )}
    </div>
  );
};

export default YourComponent;
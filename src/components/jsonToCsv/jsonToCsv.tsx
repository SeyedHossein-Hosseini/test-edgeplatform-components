import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';



export const convertJsonToCsv = (jsonData: any[]): string => {
  const csv = Papa.unparse(jsonData);
  return csv;
};



const JsonToCsv: React.FC = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");


    // Fetch JSON data from your API or local file
    const fetchData = async () => {
        try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await response.json();
        setJsonData(data);
        } catch (error) {
        console.error('Error fetching JSON data:', error);
        }
    };

    

  return (
    <div>
    <input type="text" placeholder='Enter a name' value={input} onChange={(e) => setInput(e.target.value)}/>
      
        <CSVLink
          data={jsonData}
          filename={input}
          onClick={fetchData}
          target="_blank"
        >
          Download CSV
        </CSVLink>
      
    </div>
  );
};

export default JsonToCsv;

// https://www.npmjs.com/package/react-csv?activeTab=readme
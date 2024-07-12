import React, { useState } from 'react';
import Papa from 'papaparse';
import './CSVReader.css';

interface StaffData {
  StaffID: string;
  StaffName: string;
  Position: string;
  Password: string;
}

const CSVReader: React.FC = () => {
  const [data, setData] = useState<StaffData[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<StaffData>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const parsedData = result.data.map((row) => ({
            ...row,
            Password: generatePassword(),
          }));
          setData(parsedData);
        },
      });
    }
  };

  const generatePassword = () => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    // <div className="CSVReader">
    //   <h1>CSV File Reader</h1>
    //   <input type="file" accept=".csv" onChange={handleFileUpload} />
    //   <Table data={data} />
    //   {data.length > 0 && (
    //     <button onClick={downloadJSON}>Download JSON</button>
    //   )}
    // </div>

    <div className="CSVReader">
      {/* <h1>CSV File Reader</h1> */}
      <label className="mb-3 block text-black dark:text-white">
        Attach CSV file
      </label>
      <input
        type="file" accept=".csv" onChange={handleFileUpload}
        className="w-full md:w-6/12 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:ring-2 focus:ring-primary focus:ring-opacity-50 py-3 px-5 hover:bg-primary hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:hover:bg-opacity-10 dark:focus:border-primary dark:focus:ring-2 dark:focus:ring-primary dark:focus:ring-opacity-50"
      />
      <Table data={data} />
      {data.length > 0 && (
        <button onClick={downloadJSON} className="mt-4 bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
          Download JSON
        </button>
      )}
    </div>

  );
};

interface TableProps {
  data: StaffData[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-800">
              {headers.map((header) => (
                <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {(row as any)[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default CSVReader;

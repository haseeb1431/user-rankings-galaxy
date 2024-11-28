import Papa from 'papaparse';

interface LeaderboardData {
  user_id: string;
  country_code: string;
  device_type: string;
  date: string;
  pnc: string | null;
  num_sessions: number;
  sum_eco_score: number;
  rolling_count: number;
  rolling_score: number;
  rolling_average: number;
  rank: number;
  percentage_rank: number;
}

export const readCSV = async (filePath: string): Promise<LeaderboardData[]> => {
  const response = await fetch(filePath);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        resolve(results.data as LeaderboardData[]);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

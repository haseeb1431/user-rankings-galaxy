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

export const readCSV = async (file: File): Promise<LeaderboardData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
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

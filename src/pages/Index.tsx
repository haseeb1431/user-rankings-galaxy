import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderboardEntry from "@/components/LeaderboardEntry";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { readCSV } from "@/lib/csvReader";

// Mock data for the current user (we'll only show this one)
const CURRENT_USER = {
  name: "Alex Thompson",
  score: 2500,
  rank: 1,
  avatar: "https://i.pravatar.cc/150?img=1"
};

const MOCK_BADGES = [
  { id: 1, name: "Water Saver", description: "Saved 1000L of water", icon: "💧", img:"water-saver.jpeg" },
  { id: 2, name: "Carbon Reducer", description: "Reduced 1000kg of CO2", icon: "🌱" ,img:"carbon-reducer.jpeg"},
  { id: 3, name: "Eco Champion", description: "Eco User of the Month", icon: "🌍" ,img:"eco-champion.jpeg"},
];

const MOCK_AWARDS = [
  { id: 1, name: "Electrolux Gift Voucher", description: "100 SEK", icon: "🎁" },
  { id: 2, name: "Super Beta Tester", description: "Early Access Program", icon: "🔍" }
];

const Index = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await readCSV("/src/data/eco_usage_data.csv");
      setLeaderboardData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 text-xs font-semibold bg-white/10 rounded-full text-white/60">
            Profile
          </span>
          <h1 className="text-4xl font-bold text-white">Your Progress</h1>
          <p className="text-white/60">Track your achievements</p>
        </div>

        <Tabs defaultValue="ranks" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ranks">Rank</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="awards">Awards</TabsTrigger>
          </TabsList>

          <TabsContent value="ranks" className="space-y-3">
            <div className="text-center mb-4">
              <p className="text-white/60">Your current ranking</p>
            </div>
            <LeaderboardEntry
              rank={CURRENT_USER.rank}
              name={CURRENT_USER.name}
              score={CURRENT_USER.score}
              avatar={CURRENT_USER.avatar}
            />

            {/* {leaderboardData.map((entry, index) => (
              <LeaderboardEntry
                key={index}
                rank={entry.rank}
                name={entry.user_id}
                score={entry.sum_eco_score}
                avatar={CURRENT_USER.avatar} // Placeholder avatar
              />
            ))} */}
          </TabsContent>

          <TabsContent value="badges" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_BADGES.map((badge) => (
              <div
                key={badge.id}
                className="p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              >
                <div className="flex items-center gap-3">
                  <img src={`/images/${badge.img}`} className=" rounded-full" />
                  {/* <span className="text-3xl">{badge.icon}</span> */}
                  {/* <div>
                    <h3 className="font-semibold text-white">{badge.name}</h3>
                    <p className="text-sm text-white/60">{badge.description}</p>
                  </div> */}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="awards" className="space-y-4">
            {MOCK_AWARDS.map((award) => (
              <div
                key={award.id}
                className="p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-300 hover:scale-[1.02] animate-fade-in flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{award.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white">{award.name}</h3>
                    <p className="text-sm text-white/60">
                      {award.description}
                    </p>
                  </div>
                </div>
                <Trophy className="w-5 h-5 text-leader-gold" />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

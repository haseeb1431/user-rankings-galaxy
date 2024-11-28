import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface LeaderboardEntryProps {
  rank: number;
  name: string;
  score: number;
  avatar?: string;
}

const LeaderboardEntry = ({ rank, name, score, avatar }: LeaderboardEntryProps) => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-leader-gold";
      case 2:
        return "text-leader-silver";
      case 3:
        return "text-leader-bronze";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div
      className={cn(
        "group relative flex items-center justify-between p-4 rounded-lg",
        "backdrop-blur-sm bg-white/10 border border-white/20",
        "transition-all duration-300 hover:scale-[1.02]",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${rank * 100}ms` }}
    >
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "text-2xl font-bold w-8 text-center",
            getRankColor(rank)
          )}
        >
          {rank}
        </span>
        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-white/60" />
          )}
        </div>
        <span className="font-medium text-white">{name}</span>
      </div>
      <span className="text-lg font-semibold text-white/80">{score}</span>
    </div>
  );
};

export default LeaderboardEntry;
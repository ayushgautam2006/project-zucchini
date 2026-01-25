import { ChevronDown, ChevronRight, CheckCircle, Clock, Crown } from "lucide-react";
import type { Team } from "@/lib/api";

interface TeamCardProps {
  team: Team;
  isExpanded: boolean;
  onToggle: () => void;
}

export function TeamCard({ team, isExpanded, onToggle }: TeamCardProps) {
  const leader = team.members.find((m) => m.isTeamLeader);
  const allNitrStudents = team.members.every((m) => m.isNitrStudent);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-800/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-zinc-400" />
          ) : (
            <ChevronRight className="h-5 w-5 text-zinc-400" />
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{leader?.name || "Team"}</span>
              <span className="text-xs font-mono bg-zinc-800 px-2 py-1 rounded text-zinc-400">
                {team.teamId.slice(0, 8)}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                Moot Court
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  team.studentType === "COLLEGE"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {team.studentType}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400">{team.members.length} members</span>
          {allNitrStudents ? (
            <span className="text-xs font-medium px-2 py-1 rounded bg-zinc-700 text-zinc-300">
              N/A
            </span>
          ) : team.isPaymentVerified ? (
            <span className="text-xs font-medium px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Paid
            </span>
          ) : (
            <span className="text-xs font-medium px-2 py-1 rounded bg-amber-500/20 text-amber-400 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Pending
            </span>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-zinc-800 divide-y divide-zinc-800">
          {team.members.map((member) => (
            <div key={member.id} className="p-4 bg-zinc-950/50">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {member.isTeamLeader && <Crown className="h-4 w-4 text-amber-400" />}
                    <span className="font-medium text-zinc-100">{member.name}</span>
                    {member.isTeamLeader && (
                      <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">
                        Leader
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-400 mt-1">{member.email}</p>
                  <p className="text-sm text-zinc-500">{member.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">{member.institute}</p>
                  <p className="text-sm text-zinc-500">
                    {member.city}, {member.state}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

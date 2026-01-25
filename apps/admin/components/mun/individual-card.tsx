import { User } from "lucide-react";
import type { TeamMember } from "@/lib/api";

interface IndividualCardProps {
  member: TeamMember;
}

export function IndividualCard({ member }: IndividualCardProps) {
  const committeeLabels: Record<string, string> = {
    UNHRC: "UNHRC",
    UNGA_DISEC: "UNGA DISEC",
    ECOSOC: "ECOSOC",
    AIPPM: "AIPPM",
    IP_PHOTOGRAPHER: "IP - Photo",
    IP_JOURNALIST: "IP - Journal",
    UNSC_OVERNIGHT_CRISIS: "UNSC Crisis",
    AIPPM_OVERNIGHT_CRISIS: "AIPPM Crisis",
  };
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-full p-2 bg-orange-500/20 text-orange-400">
            <User className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{member.name}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">
                {committeeLabels[member.committeeChoice] || member.committeeChoice}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  member.studentType === "COLLEGE"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {member.studentType}
              </span>
            </div>
            <p className="text-sm text-zinc-400 mt-1">{member.email}</p>
            <p className="text-sm text-zinc-500">{member.phone}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-400">{member.institute}</p>
          <p className="text-sm text-zinc-500">
            {member.city}, {member.state}
          </p>
          {member.isNitrStudent ? (
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-zinc-700 text-zinc-300 inline-block mt-2">
              NITR - N/A
            </span>
          ) : (
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 inline-block mt-2">
              Payment Required
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

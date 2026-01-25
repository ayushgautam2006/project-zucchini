"use client";

import { useState, useCallback, useMemo } from "react";
import { Users, Clock, Gavel, User, Search } from "lucide-react";
import Header from "@/components/header";
import { DataTable } from "@/components/ui/data-table/data-table";
import { munColumns, MunRegistration } from "@/components/ui/data-table/mun-columns";
import { MunRegistrationModal } from "@/components/mun-registration-modal";
import { useMunTeams, useMunRegistrations } from "@/lib/queries";
import { useDebouncedSearch } from "@/lib/hooks/use-debounced-search";
import { searchMunUsers } from "@/lib/api";
import type { Team, TeamMember } from "@/lib/api";
import { StatCard } from "@/components/stat-card";
import { TeamCard } from "@/components/mun/team-card";
import { IndividualCard } from "@/components/mun/individual-card";
import { ViewToggle } from "@/components/mun/view-toggle";

export default function MunPage() {
  const { data: teamsData, isLoading: teamsLoading } = useMunTeams();
  const { data: registrationsData, isLoading: registrationsLoading } = useMunRegistrations();
  const [expandedTeams, setExpandedTeams] = useState<Set<string>>(new Set());
  const [view, setView] = useState<"cards" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegistration, setSelectedRegistration] = useState<MunRegistration | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = useCallback((registration: MunRegistration) => {
    setSelectedRegistration(registration);
    setModalOpen(true);
  }, []);

  const loading = teamsLoading || registrationsLoading;

  const allRegistrations = useMemo(
    () => (registrationsData?.registrations || []) as unknown as MunRegistration[],
    [registrationsData?.registrations]
  );

  const searchFields = useMemo(() => ["email", "name", "phone"] as (keyof MunRegistration)[], []);

  const handleDatabaseSearch = useCallback(async (query: string) => {
    const results = await searchMunUsers(query);
    return results as unknown as MunRegistration[];
  }, []);

  const {
    results: searchResults,
    isSearching,
    isFromDatabase,
  } = useDebouncedSearch({
    data: allRegistrations,
    searchQuery,
    searchFields,
    debounceMs: 400,
    minQueryLength: 2,
    onDatabaseSearch: handleDatabaseSearch,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  const stats = teamsData?.stats;
  const teams = (teamsData?.teams || []).filter(
    (t: Team) => t.teamId && t.committeeChoice === "MOOT_COURT"
  );
  const individuals = (registrationsData?.registrations || []).filter(
    (r: TeamMember) => !r.isTeamLeader || r.committeeChoice !== "MOOT_COURT"
  );

  const toggleTeam = (teamId: string) => {
    setExpandedTeams((prev) => {
      const next = new Set(prev);
      if (next.has(teamId)) {
        next.delete(teamId);
      } else {
        next.add(teamId);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen">
      <Header
        title="MUN Registrations"
        subtitle={
          stats
            ? `Total: ${stats.total} | Teams: ${teams.length} | Individuals: ${individuals.length}`
            : undefined
        }
        Icon={Gavel}
      />

      <main className="mx-auto px-6 py-8">
        {stats && (
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Participants"
              value={stats.total}
              icon={Users}
              color="bg-blue-500/20 text-blue-400"
            />
            <StatCard
              title="Moot Court Teams"
              value={teams.length}
              icon={Users}
              color="bg-purple-500/20 text-purple-400"
            />
            <StatCard
              title="Solo Registrations"
              value={individuals.length}
              icon={User}
              color="bg-orange-500/20 text-orange-400"
            />
            <StatCard
              title="Payment Pending"
              value={stats.pending}
              icon={Clock}
              color="bg-amber-500/20 text-amber-400"
            />
          </div>
        )}

        {/* View Toggle and Search */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <ViewToggle view={view} onViewChange={setView} />

          {view === "table" && (
            <div className="relative max-w-md w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-400"></div>
                </div>
              )}
            </div>
          )}
        </div>

        {view === "table" ? (
          <div className="max-w-[75rem] mx-auto">
            <p className="text-sm text-zinc-400 mb-3">
              💡 Click on a row to view full registration details
            </p>
            <DataTable
              columns={munColumns}
              data={searchResults}
              onRowClick={handleRowClick}
              exportable={true}
              exportFilename={`mun-${new Date().toISOString().split("T")[0]}`}
            />
          </div>
        ) : (
          <>
            {/* Moot Court Teams Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                Moot Court Teams
              </h2>
              <div className="space-y-4">
                {teams.map((team) => (
                  <TeamCard
                    key={team.teamId}
                    team={team}
                    isExpanded={expandedTeams.has(team.teamId)}
                    onToggle={() => toggleTeam(team.teamId)}
                  />
                ))}
                {teams.length === 0 && (
                  <div className="text-center py-8 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                    No Moot Court teams registered yet.
                  </div>
                )}
              </div>
            </div>

            {/* Solo Registrations Section */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                Solo Registrations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {individuals.map((member) => (
                  <IndividualCard key={member.id} member={member} />
                ))}
                {individuals.length === 0 && (
                  <div className="text-center py-8 text-zinc-500 border border-dashed border-zinc-800 rounded-xl col-span-2">
                    No solo registrations yet.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <MunRegistrationModal
        registration={selectedRegistration}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}

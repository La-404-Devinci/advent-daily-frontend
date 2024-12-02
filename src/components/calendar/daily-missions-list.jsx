import { useEffect, useMemo } from "react";
import useDailyChallengesStore from "../../store/dailyChallengesStore";
import getMeStore from "../../store/meStore";
import useProfileStore from "../../store/profileStore";
import MissionCard from "../mission-card";

const DailyMissionsList = () => {
    const { dailyChallenges, getDailyChallenges } = useDailyChallengesStore();
    const { me, getMe } = getMeStore();
    const { profiles, getProfile } = useProfileStore();

    useEffect(() => {
        getDailyChallenges();
    }, [getDailyChallenges]);

    // Get the user uuid
    useEffect(() => {
        getMe();
    }, [getMe]);

    useEffect(() => {
        if (me) getProfile(me);
    }, [me, getProfile]);

    const userChallengesHashMap = useMemo(() => {
        return (
            profiles[me]?.challenges?.reduce((acc, challenge) => {
                acc[challenge.id] = challenge;
                return acc;
            }, {}) || {}
        );
    }, [profiles, me]);

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-medium">Défis</h2>
            <ul className="flex flex-col gap-2">
                {dailyChallenges.length === 0 && (
                    <p className="text-gray-300 text-lg">Aucun défi aujourd&apos;hui.</p>
                )}
                {dailyChallenges.sort((a, b) => b.score - a.score).map((mission) => (
                    <MissionCard key={mission.id} mission={{ ...mission, finish: !!userChallengesHashMap[mission.id] }} />
                ))}
            </ul>
        </section>
    );
};

export default DailyMissionsList;

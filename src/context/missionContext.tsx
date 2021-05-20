import React, { createContext, useEffect, useState } from 'react';

export interface MissionContextType {
    completedMissions: string[];
    setCompletedMissions: React.Dispatch<React.SetStateAction<string[]>> | null;
}

export const defaultMissionContext: MissionContextType = {
    completedMissions: [],
    setCompletedMissions: null
}

export const MissionContext = createContext<MissionContextType>(defaultMissionContext);

const MissionProvider = ({ children }: any) => {
    const [completedMissions, setCompletedMissions] = useState<string[]>([]);

    useEffect(() => {
        setCompletedMissions([...(JSON.parse(localStorage.getItem("completedMissions") as string) as string[])]);
    }, [])

    useEffect(() => {
        localStorage.setItem("completedMissions", JSON.stringify(completedMissions));
    }, [completedMissions])

    return (
        <MissionContext.Provider value={{
            completedMissions,
            setCompletedMissions
        }}>
            {children}
        </MissionContext.Provider>
    )
}

export default MissionProvider
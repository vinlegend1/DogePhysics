import React, { createContext, useState } from 'react';

export interface StateContextType {
    isChapter: boolean;
    isMission: boolean;
    isNavActive: boolean;
    isCtrlActive: boolean;
    missionChapter: string;
    setIsChapter: React.Dispatch<React.SetStateAction<boolean>> | null;
    setIsMission: React.Dispatch<React.SetStateAction<boolean>> | null;
    setIsNavActive: React.Dispatch<React.SetStateAction<boolean>> | null;
    setIsCtrlActive: React.Dispatch<React.SetStateAction<boolean>> | null;
    setMissionChapter: React.Dispatch<React.SetStateAction<string>> | null;
}

export const defaultStateContext: StateContextType = {
    isChapter: true,
    isMission: false,
    isNavActive: true,
    isCtrlActive: false,
    setIsChapter: null,
    setIsCtrlActive: null,
    setIsMission: null,
    setIsNavActive: null,
    missionChapter: "",
    setMissionChapter: null
}

export const StateContext = createContext<StateContextType>(defaultStateContext);

const StateProvider = ({ children }: any) => {
    const [isChapter, setIsChapter] = useState(false);
    const [isMission, setIsMission] = useState(false);
    const [isNavActive, setIsNavActive] = useState(false);
    const [isCtrlActive, setIsCtrlActive] = useState(false);
    const [missionChapter, setMissionChapter] = useState("1.1 Free Fall");

    return (
        <StateContext.Provider value={{
            isChapter,
            isCtrlActive,
            isMission,
            isNavActive,
            missionChapter,
            setIsChapter,
            setIsCtrlActive,
            setIsMission,
            setIsNavActive,
            setMissionChapter
        }}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider
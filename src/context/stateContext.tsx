import React, { createContext, useState } from 'react';

export interface StateContextType {
    isChapter: boolean;
    isMission: boolean;
    isNavActive: boolean;
    isCtrlActive: boolean;
    setIsChapter: React.Dispatch<React.SetStateAction<boolean>> | null;
    setIsMission: React.Dispatch<React.SetStateAction<boolean>> | null;
    setIsNavActive: React.Dispatch<React.SetStateAction<boolean>> | null;
    setIsCtrlActive: React.Dispatch<React.SetStateAction<boolean>> | null;
}

export const defaultStateContext: StateContextType = {
    isChapter: true,
    isMission: false,
    isNavActive: true,
    isCtrlActive: false,
    setIsChapter: null,
    setIsCtrlActive: null,
    setIsMission: null,
    setIsNavActive: null
}

export const StateContext = createContext<StateContextType>(defaultStateContext);

const StateProvider = ({ children }: any) => {
    const [isChapter, setIsChapter] = useState(true);
    const [isMission, setIsMission] = useState(false);
    const [isNavActive, setIsNavActive] = useState(true);
    const [isCtrlActive, setIsCtrlActive] = useState(false);

    return (
        <StateContext.Provider value={{
            isChapter,
            isCtrlActive,
            isMission,
            isNavActive,
            setIsChapter,
            setIsCtrlActive,
            setIsMission,
            setIsNavActive
        }}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider
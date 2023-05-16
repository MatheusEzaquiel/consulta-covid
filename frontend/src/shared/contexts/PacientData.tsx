import { ReactNode, createContext, useCallback, useState } from "react";

interface IPacientData {
    idPatient: number;
    condition: number;
}

interface IPacientDataContext {
    pacientData: IPacientData;
    changePacientData: (newData: IPacientData) => void;
}


interface IPacientDataProps {
    children: ReactNode;
}

export const PacientDataContext = createContext<IPacientDataContext>({} as IPacientDataContext);

export const PacientDataContextProvider: React.FC<IPacientDataProps> = ({

    children,

    }) => {


    const [pacientData, setPacientData] = useState<IPacientData>({
        idPatient: 0,
        condition: 0,
    });
  
    const changePacientData = useCallback((newData: IPacientData) => {
        setPacientData(newData);
    }, []);
  
    return (
        <PacientDataContext.Provider value={{ pacientData, changePacientData }}>
            {children}
        </PacientDataContext.Provider>
    );
};
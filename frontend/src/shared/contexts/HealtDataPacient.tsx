import { ReactNode, createContext, useCallback, useState } from "react";

interface IHealthData {
    temperature: number;
    heartRate: number;
    respiratoryRate: number;
}

interface IHealthDataPacientContext {
    healthData: IHealthData;
    changeHealthData: (newData: IHealthData) => void;
}

interface IHealthDataProps {
    children: ReactNode;
}

export const HealthDataPacientContext = createContext<IHealthDataPacientContext>({} as IHealthDataPacientContext);

export const HealthDataPacientProvider: React.FC<IHealthDataProps> = ({

    children,

    }) => {

    const [healthData, setHealthData] = useState<IHealthData>({
        temperature: 0,
        heartRate: 0,
        respiratoryRate: 0,
    });
  
    const changeHealthData = useCallback((newData: IHealthData) => {
        setHealthData(newData);
    }, []);
  
    return (
        <HealthDataPacientContext.Provider value={{ healthData, changeHealthData }}>
            {children}
        </HealthDataPacientContext.Provider>
    );
};
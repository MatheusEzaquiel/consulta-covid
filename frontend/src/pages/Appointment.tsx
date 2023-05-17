import { useParams, Link } from "react-router-dom";

import { ControlledTabs } from "../shared/components/ControlledTabs";

export const Appointment = () =>{

    const { idPatient, idAppointment } = useParams();

    return (
        <>
            <h1>Página de Atendimento</h1>
            <ControlledTabs idPatient={Number(idPatient)} idAppointment={Number(idAppointment)}/>
  
        </>
    );
}
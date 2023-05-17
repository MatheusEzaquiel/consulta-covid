import { useParams, Link } from "react-router-dom";

import { ControlledTabs } from "../shared/components/ControlledTabs";

export const Appointment = () =>{

    const { id } = useParams();

    return (
        <>
            <h1>Página de Atendimento</h1>
            <ControlledTabs id={Number(id)}/>
  
        </>
    );
}
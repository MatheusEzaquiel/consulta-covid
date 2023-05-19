import { Button } from "react-bootstrap";

import { useParams, Link } from "react-router-dom";

import { ControlledTabs } from "../shared/components/Tabs/ControlledTabs";
import { TabDataUser } from "../shared/components/TabDataUser";

export const Appointment = () =>{

    const { idPatient, idAppointment } = useParams();

    return (
        <>
            <h1>Página de Atendimento</h1>

            <TabDataUser idPatient={Number(idPatient)}/>

            <ControlledTabs idPatient={Number(idPatient)} idAppointment={Number(idAppointment)}/>

            <Link to={`/dados-de-saude/${idPatient}`}>
                <Button size="lg">Nova Consulta</Button>
            </Link>
        </>
    );
}
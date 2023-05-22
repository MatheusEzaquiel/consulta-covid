import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import { useParams, Link } from "react-router-dom";

import { TabDataUser } from "../shared/components/Tabs/TabDataUser";
import { TabDataAppointments } from "../shared/components/Tabs/TabDataAppointments";

export const Appointment = () =>{

    const { idPatient, idAppointment } = useParams();

    return (
        <>
            <h1>Página de Atendimento</h1>

            <TabDataUser idPatient={Number(idPatient)}/>
            <TabDataAppointments idPatient={Number(idPatient)}/>

            <Link to={`/dados-de-saude/${idPatient}`}>
                <Button size="lg"  className="m-4">Nova Consulta <FaPlus size="20"/></Button> 
            </Link>
        </>
    );
}
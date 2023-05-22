import { Button, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import { useParams, Link } from "react-router-dom";

import { TabDataUser } from "../shared/components/Tabs/TabDataUser";
import { TabDataAppointments } from "../shared/components/Tabs/TabDataAppointments";

export const Appointment = () =>{

    const { idPatient, idAppointment } = useParams();

    return (
        <>
            <h1>Página de Atendimento</h1>

            <Row>
                <TabDataUser idPatient={Number(idPatient)}/>
            </Row>

            <Row>
                <TabDataAppointments idPatient={Number(idPatient)}/>
            </Row>

            
                <Link to={`/dados-de-saude/${idPatient}`}>
                    <Row className="justify-content-center">
                        <Button size="lg"  className="m-4 center">Nova Consulta <FaPlus size="20"/></Button>
                    </Row> 
                </Link>
            
        </>
    );
}
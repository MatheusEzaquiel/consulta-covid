import { Button, Card, Col, Container, Row } from "react-bootstrap";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { AppointmentsService, IAppointment } from "../../services/api/appointments/AppointmentService";

import { ApiException } from "../../services/api/ApiException";

interface IIdProps{
    idPatient: number
}

export const TabDataAppointments = ({idPatient}: IIdProps) => {

   
    const [appointments, setAppointments] = useState<IAppointment[]>([]);


    useEffect(() => {

        AppointmentsService.getAppointmentsByPatient(idPatient)
        .then((result) => {
    
            if (result instanceof ApiException) {
    
                alert(result.message);
    
            } else {
                console.log(result);
                setAppointments(result);
            }
    
           
        })

    }, []);

    return (
        <>
            <Container>
                <Row>

            
            {
                // eslint-disable-next-line array-callback-return
                appointments.map((appointment, index) => (
               
                    <Col>
                        <Card key="primary"  className="m-3">
                            <Card.Header><b>{index + 1}º consulta</b></Card.Header>
                            <Card.Body>
                                <Card.Title><h3>Condição: {appointment.condition}</h3></Card.Title>
                                <Card.Text>
                                    <p>Temperatura: {appointment.temperature}°</p>
                                    <p>Frequência Cardíaca: {appointment.heart_rate} bpm</p>
                                    <p>Frequência Respiratória: {appointment.respiratory_rate} rpm</p>
                                </Card.Text>
                                
                                <Link to={`/dados-de-saude/${idPatient}/${appointment.id}`}>
                                    <Button variant="outline-info">Editar Consulta</Button>    
                                </Link>

                            </Card.Body>
                        </Card>
                    </Col>

                    
                    
                   

                ))

            }

                </Row>
            </Container>

        </>
        
    )
    
}
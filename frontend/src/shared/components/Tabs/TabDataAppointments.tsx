import { Alert } from "react-bootstrap";

import { useEffect, useState } from "react";

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
         
            {
                // eslint-disable-next-line array-callback-return
                appointments.map((appointment, index) => (

                    <Alert key="primary" variant="primary">
                        <b>{index + 1}º consulta</b>
                        <h3>Condição: {appointment.condition}</h3>
                        <p>Temperatura: {appointment.temperature}°</p>
                        <p>Frequência Cardíaca: {appointment.heart_rate} bpm</p>
                        <p>Frequência Respiratória: {appointment.respiratory_rate} rpm</p>
                    </Alert>

                ))

            }

        </>
        
    )
    
}
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Button, Card } from 'react-bootstrap';

import { ApiException } from "../../services/api/ApiException";
import {IPatient, PatientsService } from "../../services/api/patients/PatientService";


interface IIdProps{
    idPatient: number
}


export const TabDataUser = ({idPatient}: IIdProps) => {
  
 
    const [patient, setPatient] = useState<IPatient>({
        id: 0,
        cpf: "",
        name: "",
        birthday: "",
        phone: "",
        image: null,
    });

    useEffect(() => {
        
        PatientsService.getById(idPatient)
        .then((data) => {

        
            if (data instanceof ApiException) {
                alert(data.message);
            } else if (Array.isArray(data) && data.length > 0) {
                setPatient(data[0]);
            }
        })

    }, []);

    return(

        <>
    
            <Card className="text-center m-auto mt-2">
            <Card.Header>Informações do Paciente</Card.Header>
            <Card.Body>
                <Card.Title></Card.Title>
                
                <Card.Text key={patient.id}>
                    <img src={`http://localhost/consulta-covid/backend/public/patients/${patient.image}`} className="resizeImage" />
                    <h2>{patient.name}</h2>
                    <p>CPF: {patient.cpf}</p>
                    <p>Telefone: {patient.phone}</p>

                </Card.Text>

            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
            </Card>
            
        </>
        
    )
}
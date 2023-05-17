    import { useEffect, useState } from "react";
    import { Link } from "react-router-dom";

    import { Button, Card } from 'react-bootstrap';

    import { ApiException } from "../services/api/ApiException";
    import {IPatient, PatientsService } from "../services/api/patients/PatientService";

   
    interface IIdProps{
        idPatient: number
        idAppointment: number;
    }


    export const TabDataUser = ({idPatient, idAppointment}: IIdProps) => {
      
     
        const [patient, setPatient] = useState<IPatient>({
            id: 0,
            cpf: "",
            name: "",
            birthday: "",
            phone: "",
            image: "",
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
        
                <Card className="text-center">
                <Card.Header>Informações do Usuário</Card.Header>
                <Card.Body>
                    <Card.Title></Card.Title>
                    
                    <Card.Text key={patient.id}>

                        <p>{patient.image}</p>
                        <h2>{patient.name}</h2>
                        <p>{patient.cpf}</p>
                        <p>{patient.phone}</p>

                    </Card.Text>
    
                    <Link to={`/dados-de-saude/${idPatient}/${idAppointment}`}>
                        <Button>Nova Consulta</Button>
                    </Link>


                </Card.Body>
                <Card.Footer className="text-muted"></Card.Footer>
                </Card>
                
            </>
            
        )
    }
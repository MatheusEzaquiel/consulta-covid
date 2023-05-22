import { useState, useEffect } from "react";

import { Alert, Button, Row, Table } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa"
import { ModalUser } from "./../shared/components/ModalUser";


import { Link } from "react-router-dom";

import { PatientsService, IPatient, IPatientAppointment } from "../shared/services/api/patients/PatientService";
import { ApiException } from "../shared/services/api/ApiException";



export const Home = () => {

    const [patients, setPatients] = useState<IPatientAppointment[]>([]);

    useEffect(() => {

        PatientsService.getAllJoin()
            .then((result) => {

                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    console.log(result);

                    var newResult = [result];
        
                    console.log(newResult);
                    setPatients(result);
                    
                }

              
        })
    
    }, [])

    const patientAge = (birthday:string): number => {
                
        const dateAtual = new Date();
        const dataBirthday = new Date(birthday);
        const difMiliseg = dateAtual.getTime() - dataBirthday.getTime();
        const difAnos = difMiliseg / ((1000 * 60 * 60 * 24 * 30))/12;
        return Math.floor(difAnos);

    }

    return (
        <>  
            <Row className="justify-content-center"> 
                <ModalUser></ModalUser>
            </Row>

            <Row>
                {patients.length === 0 ? (
                    <Alert variant="primary">Sem pacientes cadastrados!</Alert>
                ): (
                    <>
                        

                        <Table responsive className="mt-4">
                            <thead>
                            <tr>
                                <th>Condição</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th>Idade</th>
                                <th>Atendimento</th>
                            </tr>
                            </thead>
                            <tbody>

                                {patients.map((patient) => (
                                    <tr key={patient.id}> 
                                        <td>{patient.condition}</td>   
                                        <td>{patient.name}</td>
                                        <td>{patient.cpf.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')}</td>
                                        <td>{patient.phone.replace(/(\d{2})(\d)/, '($1)$2').replace(/(\d{5})(\d)/, '$1-$2')}</td>
                                        <td>{patientAge(patient.birthday)} anos</td>
                                        
                                
                                        <td>
                                        <Link to={`atendimento/${patient.id_patient}`}>
                                            <Button  className="BtnHome"><FaArrowRight /></Button>
                                        </Link>
                                        </td>
                                    </tr>
                                ))}
                            
                            </tbody>
                        </Table>
                    </>

                )}
                
            </Row>
         
        </>
    )
}
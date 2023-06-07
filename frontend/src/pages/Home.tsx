import { useState, useEffect } from "react";

import { Alert, Button, Row, Table } from "react-bootstrap";
import { ModalUser } from "./../shared/components/ModalUser";
import { TablePatients } from "../shared/components/TablePatients";

import { PatientsService, IPatientAppointment } from "../shared/services/api/patients/PatientService";
import { ApiException } from "../shared/services/api/ApiException";

export const Home = () => {

    const [patients, setPatients] = useState<IPatientAppointment[]>([]);

    useEffect(() => {

        getAllPatAppoint();

    }, [])

    const getAllPatAppoint= () => {
        
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
    
    }


    return (
        <>  
            <Row className="justify-content-center"> 
                <ModalUser getAllPatAppoint={getAllPatAppoint}></ModalUser>
            </Row>

            <Row>
                
                {patients.length === 0 ? (
                    <Alert variant="warning">Sem pacientes cadastrados!</Alert>
                ): (
                    <TablePatients patients={patients}/>
                )}
                   
            </Row>
         
        </>
    )
}
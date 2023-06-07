import { Button, Table } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa"

import { Link } from "react-router-dom";

import { IPatientAppointment } from "../services/api/patients/PatientService";


export const TablePatients = ({patients}: {patients: IPatientAppointment[]}) => {

    const patientAge = (birthday:string): number => {
                
        const dateAtual = new Date();
        const dataBirthday = new Date(birthday);
        const difMiliseg = dateAtual.getTime() - dataBirthday.getTime();
        const difAnos = difMiliseg / ((1000 * 60 * 60 * 24 * 30))/12;
        return Math.floor(difAnos);

    }
    
    return(
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
    );

}
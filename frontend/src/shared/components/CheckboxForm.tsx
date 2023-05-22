  import { Form, Button, Row, Container, Col } from "react-bootstrap";

import { useContext } from "react";
import React, { useState } from 'react';

import { Link, useParams, useNavigate } from "react-router-dom";

import { PacientDataContext } from "./../contexts/PacientData";
import { HealthDataPacientContext } from "./../contexts/HealtDataPacient";

import { AppointmentsService } from "../services/api/appointments/AppointmentService";
import { ApiException } from "../services/api/ApiException";


type Checkbox = {
  id: number;
  label: string;
  checked: boolean;
};



export const CheckboxForm = () => {


  const { idPatient, idAppointment } = useParams();
  const idPatientSelected = Number(idPatient);
  const idAppointmentSelected = Number(idAppointment);

 
  const navigate = useNavigate();

  const { pacientData, changePacientData} = useContext(PacientDataContext);
  const { healthData, changeHealthData} = useContext(HealthDataPacientContext);
  

  const [checkboxes, setCheckboxes] = useState<Checkbox[]>([
    { id: 1, label: 'Febre', checked: false },
    { id: 2, label: 'Coriza', checked: false },
    { id: 3, label: 'Nariz Entupido', checked: false },
    { id: 4, label: 'Cansaço', checked: false },
    { id: 5, label: 'Falta de olfato', checked: false },
    { id: 6, label: 'Dificuldade de locomoção', checked: false },
    { id: 7, label: 'Diarréia', checked: false },
    { id: 8, label: 'Tosse', checked: false },
    { id: 9, label: 'Dor de cabeça', checked: false },
    { id: 10, label: 'Dores no corpo', checked: false },
    { id: 11, label: 'Mal estar geral', checked: false },
    { id: 12, label: 'Dor de garganta', checked: false },
    { id: 13, label: 'Dificuldade de respirar', checked: false },
    { id: 14, label: 'Falta de paladar', checked: false },
  ]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, checkbox: Checkbox) => {

    const updatedCheckboxes = checkboxes.map((c) =>
      c.id === checkbox.id ? { ...c, checked: event.target.checked } : c
    );
    setCheckboxes(updatedCheckboxes);

  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const checkedCheckboxes = checkboxes.filter((c) => c.checked);
    

    //Update or Create appointment
    if(idAppointment) {

      try {

        AppointmentsService.updateById(idAppointmentSelected, 
        
          {
            condition: checkedCheckboxes.length,
            temperature: healthData.temperature,
            heart_rate: healthData.heartRate,
            respiratory_rate: healthData.respiratoryRate,
            id_patient: idPatientSelected,
          }
        );
      } catch(error: any) {
        return 'erro';
      }


    } else {
      try {
        AppointmentsService.create({

          condition: checkedCheckboxes.length,
          temperature: healthData.temperature,
          heart_rate: healthData.heartRate,
          respiratory_rate: healthData.respiratoryRate,
          id_patient: idPatientSelected,

        }).then((result) => {


          if (result instanceof ApiException){
              return result.message;
          }else{
              console.log("cadastrou");
          }
          
        })
      } catch(error: any) {
        return 'erro';
      }
    }

    navigate("/");

  };

  return (

    <>
    <Container>
      <Row className="justify-content-center">
        
        <Col></Col>
        
        <Col>
          <Form    onSubmit={handleSubmit}>

          


            
                {checkboxes.map((checkbox) => (

                    
                    <div key={checkbox.id}>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox" >
                            <Form.Check
                                type="checkbox" 
                                label={checkbox.label} 
                                id={checkbox.id.toString()}
                                name={checkbox.label}
                                checked={checkbox.checked}
                                onChange={(e) => handleCheckboxChange(e, checkbox)}
                            />
                        </Form.Group>
                    
                    </div>

                ))}

        
          <Button type="submit" variant="primary" size="lg">Finalizar</Button>
          </Form>
        </Col>

        <Col></Col>
      </Row>
    </Container>

    </>
  );
}
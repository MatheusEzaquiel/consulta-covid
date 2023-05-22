import { Container, Row } from "react-bootstrap";

import { CheckboxForm } from "./../shared/components/CheckboxForm";

import { TabDataUser } from "../shared/components/Tabs/TabDataUser";

import { useParams } from "react-router-dom";


export const Symptoms = () => {
    
    const { idPatient } = useParams();

    return(

        <Container>
            <Row className="justify-content-center">

                <TabDataUser idPatient={Number(idPatient)}/>

                
                    <h2 className="centerTxt m-4">Sintomas</h2>
    
                    <p  className="centerTxt mb-4">Marque os sintomas que o paciente apresenta</p>
                
                <CheckboxForm />
                
            </Row>
        </Container>

    );
}
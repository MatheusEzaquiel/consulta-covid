import { Form, Button, Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { CheckboxForm } from "./../shared/components/CheckboxForm";



export const Symptoms = () => {
    

    return(
        <div>
            <h2>Sintomas</h2>
            <p>Marque os sintomas que o paciente apresenta</p>
            
            <CheckboxForm/>
        </div>
        
    );
}
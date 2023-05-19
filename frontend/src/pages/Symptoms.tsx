import { CheckboxForm } from "./../shared/components/CheckboxForm";

import { TabDataUser } from "../shared/components/TabDataUser";

import { useParams } from "react-router-dom";


export const Symptoms = () => {
    
    const { idPatient } = useParams();

    return(

        <div>

            <TabDataUser idPatient={Number(idPatient)}/>
            <h2>Sintomas</h2>
  
            <p>Marque os sintomas que o paciente apresenta</p>
            
            <CheckboxForm />

        </div>

    );
}
import React, { useState } from 'react';
import { Form, Button, Row, Container, Col } from "react-bootstrap";

type Checkbox = {
  id: number;
  label: string;
  checked: boolean;
};

export const CheckboxForm = () => {
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
    console.log(`Foram marcados ${checkedCheckboxes.length} checkboxes`);

  };

  return (

    
    <Form    onSubmit={handleSubmit}>

        <Row>

        
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

        </Row>
    
      <Button type="submit" variant="primary">Finalizar</Button>
    </Form>
  );
}
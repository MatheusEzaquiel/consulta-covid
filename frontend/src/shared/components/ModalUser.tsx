import  { useState } from "react";

import { Form, Button, Modal } from "react-bootstrap";

import {IPatient, PatientsService} from "../services/api/patients/PatientService";
import { ApiException } from "./../services/api/ApiException";




export const ModalUser = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


     
  const [formData, setFormData] = useState <IPatient>({
    id: 0,
    cpf: "",
    name: "",
    birthday: "",
    phone: "",
    image: "" 
});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        PatientsService.create({

            cpf: formData.cpf,
            name: formData.name,
            birthday: formData.birthday,
            phone: formData.phone,
            image: formData.image[0],

        }).then((result) => {


            if (result instanceof ApiException){
                return result.message;
            }else{
                console.log("cadastrou");
            }
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setFormData({
        ...formData,
        [name]: value,
        });

        console.log(formData);
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>Cadastrar Paciente</Button>

        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Cadastro de Usuário</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nome completo"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            />
                    </Form.Group>
                
                    <Form.Group>
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="000.000.000-00"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleInputChange}
                            />
                        <Form.Text>Insira apenas números</Form.Text>
                    </Form.Group>
                
                    <Form.Group>
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="(00) 0 0000-0000"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        />
                        <Form.Text>Insira apenas números</Form.Text>
                    </Form.Group>
                
                    <Form.Group>
                        <Form.Label>Data de nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>Imagem de usuário</Form.Label>
                        <Form.Control
                            type="file"
                            size="sm"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            />
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Concordo com os termos do serviço" />
                    </Form.Group>

                    

                            
                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        
                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>
                
                    </Modal.Footer>
                
                    
                </Form>

            </Modal.Body>

            </Modal>



        </>
    );
}
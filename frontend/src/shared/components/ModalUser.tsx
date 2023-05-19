import  { useState } from "react";

import { Form, Button, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import {IPatient, PatientsService} from "../services/api/patients/PatientService";
import { ApiException } from "./../services/api/ApiException";

import { MaskedInput } from "./MaskedInput";

const cpfIsValid = require ('validar-cpf');




export const ModalUser = () => {


    //Show Form
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //CPF
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [image, setImage] = useState('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
       
        e.preventDefault();
      
        PatientsService.create({

            cpf: cpf,
            name: name,
            birthday: birthday,
            phone: phone,
            image: image,

        }).then((result) => {


            if (result instanceof ApiException){
                return result.message;
            }else{
                console.log("cadastrou");
            }
        })
      
        
       
    }


    return (
        <>
        <Button variant="primary" size="lg" onClick={handleShow}>Cadastrar Paciente <FaPlus size="20"/> </Button>

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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>CPF com máscara</Form.Label>

                        <MaskedInput 
                            value={cpf} 
                            onChange={(e) => setCpf(e.target.value)}
                            typeMask="999.999.999-99"
                        />

                        <Form.Text>Insira apenas números</Form.Text>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Telefone com máscara</Form.Label>

                        <MaskedInput 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                            typeMask="(99)99999-9999"
                        />

                        <Form.Text>Insira apenas números</Form.Text>
                    </Form.Group>
                       
                
                    <Form.Group>
                        <Form.Label>Data de nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </Form.Group>
                
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>Imagem de usuário</Form.Label>
                        <Form.Control
                            type="file"
                            size="sm"
                            name="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            />
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
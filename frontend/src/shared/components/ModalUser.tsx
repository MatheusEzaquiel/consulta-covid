import  { useState } from "react";

import { Form, Button, Modal} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import "./ModalUser.css";

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

    const [msgCreate, setMsgCreate] =  useState('');

    
    console.log(cpf);
    console.log(`É válido: ${cpfIsValid(cpf)}`);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
       
        e.preventDefault();
        
        if((cpfIsValid(cpf) === false) || ((cpf.length <= 0))) {

            setMsgCreate(`CPF inválido`);    

        }else if(Number(phone.length) !== 11) {

            setMsgCreate(`Número de telefone inválido`);
        
        }else{

            setMsgCreate('');

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
    
            setName('');    setCpf('');     setPhone('');   setBirthday('');    setImage('');
        }   
        
    }




    return (
        <>
        <Button variant="primary" size="lg" onClick={handleShow}>Cadastrar Paciente <FaPlus size="20"/> </Button>

        <Modal show={show} onHide={handleClose} animation={false}>

            <Modal.Header closeButton>
            <Modal.Title> Cadastro de Usuário </Modal.Title>
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
                            required
                            />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>CPF</Form.Label>

                        <MaskedInput
                            value={cpf} 
                            onChange={(e) => setCpf(e.target.value)}
                            typeMask="999.999.999-99"
                        />

                        <Form.Text><p className="textAlert">{(cpf.length > 0)  && (cpfIsValid(cpf) === false) ? "CPF inválido" : ""}</p></Form.Text>

                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Telefone</Form.Label>

                        <MaskedInput 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)}
                            typeMask="(99)99999-9999"
                        />
                    </Form.Group>
                       
                
                    <Form.Group>
                        <Form.Label>Data de nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
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
                            required
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

                <p className="textAlert centerTxt">{msgCreate}</p>

            </Modal.Body>

            </Modal>

    

        </>
    );
}
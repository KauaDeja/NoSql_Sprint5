import React, { useState } from 'react';
// Hooks do firebase
import { useFirebaseApp } from 'reactfire';


import { Container, Form, Button } from 'react-bootstrap'
import logo from '../../assets/img/Logo.svg';
import './index.css';



const Login = () => {
    // Para usar o hooks devemos criar a seguinte constante
    const firebase = useFirebaseApp();

    const logar = (event) => {
        event.preventDefault();

        console.log(`${email} - ${senha}`);

        // login de usuario existente
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(result => {
                localStorage.setItem('nyous', result.user.refreshToken);
                alert('Seja bem vindo');
                //navega para a página 
            })
            .catch(error => {
                alert('Email ou senha inválidos');
                console.error(error);
            })
    }

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <Container className='form-height'>
            <Form className='form-signin' onSubmit={event => logar(event)} >
                <div className='text-center'>
                    <img src={logo} alt='NYOUS' style={{ width: '64px' }} />
                </div>
                <br />
                <small>Informe os dados Abaixo</small>
                <hr />
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" placeholder="Informe o email" value={email} onChange={event => setEmail(event.target.value)} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Enviar
                    </Button>
                <br /><br />
                <a href='/cadastrar' style={{ marginTop: '30px' }}>Não tenho conta!</a>
            </Form>
        </Container>
    )
}

export default Login;
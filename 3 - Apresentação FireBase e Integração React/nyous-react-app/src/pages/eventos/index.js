import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Card } from 'react-bootstrap';
import { db, storage } from '../../utils/firebaseConfig';
import FileUploader from 'react-firebase-file-uploader';

const EventosPage = () => {
    // Criar os estados a serem utilizados
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [urlImagem, setUrlImagem] = useState('');

    const [eventos, setEventos] = useState([]);

    // Primeiro item a ser renderizado na pagina
    useEffect(() => {
        listarEventos();
    }, [])

    //Lista os eventos
    const listarEventos = () => {
        try {
            db.collection('eventos')
                .get()
                .then((result) => {
                    console.log(result.docs);
                    const data = result.docs.map(doc => { // map => vai percorrer todo o documento
                        return {
                            id: doc.id,
                            nome: doc.data().nome,
                            descricao: doc.data().descricao,
                            urlImagem : doc.data().urlImagem
                        }
                    })
                    // Define as informações encontradas
                    setEventos(data);
                })
                .catch(error => {
                    console.error(error)
                });

        } catch (error) {
            console.error(error)
        }
    }

    // Salva os eventos
    const salvar = (event) => {
        event.preventDefault();

        const evento = {
            nome: nome,
            descricao: descricao,
            urlImagem : urlImagem
        }
        // Se ele n existir, ou seja, seu id for = 0, adiciona um novo evento
        if (id === 0) {
            db.collection('eventos')
                .add(evento)
                .then(() => {
                    alert('Evento Cadastrado');
                    listarEventos();
                    limparCampos();
                })
                .catch(error => console.error(error));
        } else {
            db.collection('eventos')
                .doc(id)
                .set(evento)
                .then(() =>{
                    alert('Evento Alterado com Sucesso');
                    listarEventos();
                    limparCampos();
                })
        }
        const limparCampos = () => {
            setId(0);
            setNome('');
            setDescricao('');
            setUrlImagem('');
        }
    }

    //Remove os eventos
    const remover = (event) => {
        event.preventDefault();

        db.collection('eventos')
            .doc(event.target.value)
            .delete()
            .then(() =>{
                alert('Evento removido com sucesso')
                listarEventos();
            })
    }

    // Edita os eventos
    const editar = (event) => {
        try {
            db.collection('eventos')
                .doc(event.target.value)
                .get()
                .then(doc =>{
                    setId(doc.id);
                    setNome(doc.data().nome);
                    setDescricao(doc.data().descricao);
                    setUrlImagem(doc.data().urlImagem);
                });
        } catch (error) {
            console.error(error);
        }
    }

    const handleUploadError = error =>{
        console.error(error);
    }

    const handleUploadSuccess = filename =>{
        console.log('Sucesso upload: '+ filename);

        storage 
            .ref('imagens')
            .child(filename)
            .getDownloadURL()
            .then(url =>setUrlImagem(url))
            .catch(error =>console.error(error))
    }

    return (
        <div>
            <Container>
                <h1>Eventos</h1>
                <p>Gerencie os seus eventos</p>
                <Card>
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group>
                                {urlImagem && <img src={urlImagem} style={{widht:'200px'}} />}
                                <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius:4,cursor:'pointer'}}>
                                    Selecione a Imagem
                                <FileUploader
                                    hidden
                                    accept="image/*"
                                    name="urlImagem"
                                    randomizeFilename
                                    storageRef={storage.ref('imagens')}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                />
                                </label>
                            </Form.Group>
                            <Form.Group controlId="formBasicNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Nome do evento"></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicUrl">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} value={descricao} onChange={event => setDescricao(event.target.value)} />
                            </Form.Group>
                            <Button type="submit">Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            eventos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={item.urlImagem}  style={{widht:'100px'}}/></td>
                                        <td>{item.nome}</td>
                                        <td>{item.descricao}</td>
                                        <td>
                                            <Button variant="warning" value={item.id} onClick={event => editar(event)} >Editar</Button>
                                            <Button variant="danger" value={item.id} onClick={event => remover(event)} style={{ marginLeft: '40px' }}>Remover</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default EventosPage;
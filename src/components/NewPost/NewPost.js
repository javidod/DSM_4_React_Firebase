import React from 'react';
import axios from 'axios';


import {Form,Col, Button} from 'react-bootstrap';
import './NewPost.css';

class NewPost extends React.Component {
    state = {
        titulo: '',
        comentario: '',
        autor: ''
    }

    postDataHandler = () => {
        console.log(this.state.titulo);
        if (this.state.titulo == '' || this.state.comentario == '' ||this.state.autor == '' ) {
            alert('Rellena todos los campos, anda :D');
        }else{
                const data = {
                titulo: this.state.titulo,
                comentario: this.state.comentario,
                autor: this.state.autor
            };
            axios.post('https://fir-javier.firebaseio.com/comentarios.json', data)
                .then(response => {
                    alert('Comentario añadido');
                    window.location.replace('');
                });
        }
    }

    render () {
        return (
            <div className="NewPost">
                <h3>Añade un comentario</h3>
                <Form>
                    <Form.Row>
                        <Col>
                        <label>Título del comentario</label>
                        <Form.Control placeholder="Título" value={this.state.title} onChange={(event) => this.setState({titulo: event.target.value})} />
                        </Col>
                        <Col>
                        <label>Autor</label>
                        <Form.Control placeholder="Autor" value={this.state.autor} onChange={(event) => this.setState({autor: event.target.value})}/>
                        </Col>
                    </Form.Row>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comentario</Form.Label>
                    <Form.Control placeholder="Comentario" as="textarea" rows="4" value={this.state.content} onChange={(event) => this.setState({comentario: event.target.value})} />
                </Form.Group>
                <Button class="boton" variant="secondary" onClick={this.postDataHandler}>
                    Enviar comentario
                </Button>
                </Form>

            </div>
        );
    }
}

export default NewPost;
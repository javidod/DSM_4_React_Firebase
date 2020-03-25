import React from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import Comentarios from '../../components/Comentarios/Comentarios';
import './Blog.css';

import {NavDropdown,Form,FormControl, Nav, Button, Navbar} from 'react-bootstrap';

class Blog extends React.Component {
    state = {
        posts: [],
        comentarios: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        // Posts
        axios.get('https://fir-javier.firebaseio.com/productos.json')
            .then(response => {
                let posts = [];
                for (let key in response.data) {
                    posts.push({
                        ...response.data[key],
                        idb: key
                    });
                }
                posts = posts.slice(1, 4);
            console.log(posts);
                this.setState({ posts: posts });
            }).catch(error => {
                this.setState({ error: true });
            });
        // Comentarios
        axios.get('https://fir-javier.firebaseio.com/comentarios.json')
        .then(response => {
            let comentarios = [];
            for (let key in response.data) {
                comentarios.push({
                    ...response.data[key],
                    idb: key
                });
            }
            //console.log(comentarios);
            this.setState({ comentarios: comentarios });
        }).catch(error => {
            this.setState({ error: true });
        });
    }
    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }
    deleteUpdatePostHandler = (id) => {
        axios.delete('https://fir-javier.firebaseio.com/comentarios/' + id + '.json')
            .then(response => {
                console.log(response);
                alert('Comentario borrado');
                window.location.replace('');
            });
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        let comentarios = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            // Posts
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.idb}
                    articulo={post.articulo}
                    clicked={() => this.postSelectedHandler(post.idb)} />;
            });
            // Comentarios
            comentarios = this.state.comentarios.map(comentarios => {
                return <Comentarios
                    key={comentarios.idb}
                    comentario={comentarios.comentario}
                    autor={comentarios.autor}
                    titulo={comentarios.titulo}
                    clicked={() => this.deleteUpdatePostHandler(comentarios.idb)}
                   />;
            });
        }
        return (
            <div class = "container">
                <section>
                    <div class="row ">
                        <div class="col-sm" className="Cabecero">
                            <Navbar bg="dark" variant = "dark" expand="lg">
                            <Navbar.Brand href="#home">
                                <h2>ZAPATILLAS</h2>
                                <img
                                    alt="Logo pagina"
                                    src="https://firebasestorage.googleapis.com/v0/b/fir-javier.appspot.com/o/DSM_4_Firebase%2Flogo.png?alt=media&token=de0cf40f-7d4d-4ac3-9bdc-3e92cee4afe6"
                                    width="30"
                                    height="30"
                                />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                <NavDropdown title="Idiomas" id="basic-nav-dropdown" textAlign="right">
                                    <NavDropdown.Item href="#action/3.1">ES</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">FR</NavDropdown.Item>
                                </NavDropdown>
                                </Nav>
                                <Form inline>
                                    <FormControl type="text" placeholder="Buscar producto (ref)" className="mr-sm-2" />
                                    <Button variant="outline-success">Buscar</Button>
                                </Form>
                            </Navbar.Collapse>
                            </Navbar>
                         </div>
                    </div>
                </section>
                <section className="Posts">
                    {posts}
                </section>
                <section className="FullPosts">
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section className = "Comentarios">
                    {comentarios}
                </section>
                <section className = "NewPost">
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
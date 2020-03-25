import React from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends React.Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || this.state.loadedPost.idb !== this.props.id) {
                //axios.get('/posts.json?orderBy="id"&equalTo="' + this.props.id + '"')
                axios.get('https://fir-javier.firebaseio.com/productos.json?orderBy="$key"&equalTo="' + this.props.id + '"')
                    .then(response => {
                        console.log(response);
                        const posts = [];
                        for (let key in response.data) {
                            posts.push({
                                ...response.data[key],
                                idb: key
                            });
                        }
                        console.log(posts);
                        this.setState({ loadedPost: posts[0] });
                    });
            }
        }

    }

        render() {
        let post = <p style={{ textAlign: 'center' }}>Elige un producto!</p>;
        if (this.props.id) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.articulo}</h1>
                    <img width="400" height="400" src={this.state.loadedPost.imagen}></img>
                    
                    <p>{this.state.loadedPost.descripcion}</p>
                    <p class="Referencia">Ref: {this.state.loadedPost.referencia}</p>
                    <p class="Precio">{this.state.loadedPost.precio}</p>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;
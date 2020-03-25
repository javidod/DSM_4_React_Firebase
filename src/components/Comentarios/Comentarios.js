import React from 'react';
import axios from 'axios';

import './Comentarios.css';

const Comentarios = (props) => (
    <div className="FullPost" >
        <p><b>Autor: </b>{props.autor}</p>
        <p><b>Título:</b>{props.titulo}</p>
        <p>{props.comentario}</p> 
        <div className="Edit">
            <button onClick={props.clicked} className="Delete">Delete</button>
        </div>
    </div>
);

export default Comentarios;
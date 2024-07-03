import { conn } from "../db.js";

const getArtistas = async (_, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
   try {
   const [result, field] = await conn.query(
    'SELECT * FROM artistas'
   );
   res.send(result); 
   }
   catch(err){
    console.log(err); 
   }   
};

const getArtista = async (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
   const {id} = req.params;
   try{
    const [result, fields] = await conn.query(
        'SELECT id, nombre FROM artistas WHERE id = ?'
        [id]
    );
    res.send(result); 
   }
   catch (err) {
    console.log(err); 
   }
};

const createArtista = async (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */
   const {nombre} = req.body;
   try {
    const [result, field] = await conn.query(
        'INSERT INTO artistas (nombre) VALUES (?)'
        [nombre]); 

        res.send(result); 
   }
   catch (err){
    console.log(err); 
   }
};

const updateArtista = async (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
        const { id } = req.params;
        const { nombre } = req.body;
        try {
            const [result, field] = await conn.query(
                'UPDATE artistas SET nombre = ? WHERE id = ?',
            [nombre, id]);
        res.send(result); 
    
        }   catch (err) {
            console.log(err);
        }
};


    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params
    
    const deleteArtista = async (req, res) => {
        const { id } = req.params;
        try {
            const [result, field] = await conn.query(
            'DELETE FROM artistas WHERE id = ?',
             [id]
            );
        res.send(result); 
    
        }   catch (err) {
            console.log(err);
        }
};

const getAlbumesByArtista = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes
    const { id } = req.params;
    try {const [result, field] = await conn.query(
        'SELECT * FROM albumes WHERE artista_id = ?',
        [id]);
    res.send(result); 

    }   catch (err) {
        console.log(err);
    }
};

const getCancionesByArtista = async (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones

    const { id } = req.params;
    try {const [result, field] = await connection.query(
        `
            SELECT canciones.id, canciones.nombre, albumes.nombre AS nombre_album
            FROM canciones
            INNER JOIN albumes ON canciones.album_id = albumes.id
            WHERE albumes.artista_id = ?
        `,
        [id]);
    res.send(result); 

    }   catch (err) {
        console.log(err);
    }
};

const artistas = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};

export default artistas;



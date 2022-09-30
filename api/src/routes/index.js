const { Router, response } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');
const router = Router();

const { Pokemon, Type, Pokemon_Type } = require('../db')

async function getAllPokemons () {
    try {
        let request = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40')
        let allPokemons = await request.data.results.map(async p => {
            let subrequest = await axios.get(`${p.url}`)
            let i = subrequest.data
            let types = await i.types.map(t => t.type.name)
            let attack = await i.stats.filter(s => s.stat.name === 'attack')
            return {
            name: p.name,
            id: i.id,
            image: i.sprites.other['official-artwork'].front_default,
            types: types,
            attack: attack[0].base_stat
        }})
        return Promise.all(allPokemons);
    } catch (error) {
        return (error);
    }
}

async function getPokemon (parameter) {

//debe cubrir cuatro casos:

//  id (por params) de API   
//  id (por params) de Pokemon 
//  name (por query) de API
//  name (por query) de Pokemon
// (además cubre los casos de name por params)
//
//          declaro dos variables. en 'local' voy a alojar la data en caso de que sea un pokemon creado localmente. 
//          en 'request' voy a alojar la data en caso de que sea un pokemon traído de la API externa

            let local = [];
            let request = [];
        try {
            if (!!await Pokemon.findOne({where: {name: parameter}})) {
                local.push(await Pokemon.findOne({where: {name: parameter}, include: Type}));
            } else if (typeof parseInt(parameter) === 'number' && parseInt(parameter) > 950) {
                local.push(await Pokemon.findOne({where: {id: parseInt(parameter)}, include: Pokemon_Type}));
            } else if (!!await axios(`https://pokeapi.co/api/v2/pokemon/${parameter}`)) {
                request.push(await axios(`https://pokeapi.co/api/v2/pokemon/${parameter}`)) 
            }
            if (local.length > 0) {
                        let p = local[0].dataValues
                        let types = await p.types.map(t => t.type.name)
                        let pokemon = {
                        image: p.image,
                        name: p.name,
                        types: types,
                        include: Pokemon_Type,
                        id: p.id,
                        hp: p.hp, 
                        attack: p.attack, 
                        defense: p.defense, 
                        speed: p.speed, 
                        height: p.height, 
                        weight: p.weight
                    }
                    return pokemon
                } else if (request.length > 0) {
                    let p = await request[0].data
                    let types = await p.types.map(t => t.type.name)
                    let stats = p.stats.map(s => s.base_stat)
                    let pokemon = {
                        image: p.sprites.other['official-artwork'].front_default,
                        name: p.name, 
                        types: types,
                        id: p.id,
                        hp: stats[0], 
                        attack: stats[1], 
                        defense: stats[2], 
                        speed: stats[5], 
                        height: p.height, 
                        weight: p.weight
                    }
                    return pokemon;
            }
        } catch (error) {
            return 'Pokemon not found';
        }    
}

async function getTypes () {
    try {
        let request = await axios.get('https://pokeapi.co/api/v2/type')
        let types = await request.data.results.map(async t => {
            const {name} = t
            let subrequest = await axios.get(`${t.url}`)
            let id = subrequest.data.id
            let newType = await Type.create({id, name})
            // return {newType}
        })
        return Promise.all(types);
    } catch (error) {
        return 'Types not found';
    }
}

router.get('/pokemons/:id', async (req, res) => {
    const {id} = req.params
    try {
        const response = await getPokemon(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.get('/pokemons', async (req, res) => {
    const {name} = req.query
        try {
            if(name) {
                const response = await getPokemon(name)
                return res.status(200).json(response)
            }
                const response = await getAllPokemons()
                return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(404).send('Pokemon not found')
        } 
})

router.post('/pokemons', async (req, res) => {

    const {image, name, id, hp, attack, defense, speed, height, weight, types} = req.body
    if(!name || !id) {
        return res
        .status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Pokemon"})
    }
    try {
        const response = await Pokemon.create({
                image,
                name, 
                hp, 
                attack, 
                defense, 
                speed, 
                height, 
                weight,
                id,
                types,
        })
        return res.status(200).json('Pokemon created successfully')
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

router.get('/types', async (req, res) => {
    try {
        let result = await Type.findAll()
        if(result.length === 0) 
        {
            await getTypes()
            const result = await Type.findAll()
            return res.status(200).json(result)
        } 
        else 
        {
            const result = await Type.findAll()
            return res.status(200).json(result)
        }
    } catch (error) {
        console.log(error)
        return res.status(404).send(error)
    }
})

module.exports = router;

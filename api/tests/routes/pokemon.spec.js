/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);

const pokemon = {
  name: 'Pikachu',
  id: 955
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
    describe('GET /pokemons', () => {
      it('should get 200', () => {
        const response = agent.get('/pokemons')
        expect(response.status).to.equal(200)
      });
      it('should get all pokemons', () => {
        const response = agent.get('/pokemons')
        expect(response.data.length).to.equal(40)
      })
      it('should get a Pokeapi pokemon by name given by query', () => {
        const response = agent.get('/pokemons/?name=bulbasaur')
        expect(response.name).to.equal('bulbasaur')
      })
      it('should get a locally created pokemon by name given by query', () => {
        const response = agent.get('/pokemons/?name=Pikachu')
        console.log(response)
        expect(response.name).to.equal('Pikachu')
      })
      it('should get a Pokeapi pokemon by id given by params', () => {
        const response = agent.get('/pokemons/2')
        expect(response.name).to.equal()
      })
      it('should get a locally created pokemon by id given by params', () => {
        const response = agent.get('/pokemons/951')
        expect(response.name).to.equal('Pikachu')
      })
      it('if pokemon name does not exists returns an error message', () => {
        const response = agent.get('/pokemons/?name=sart')
        expect(response.error).to.equal('Pokemon not found')
      })
      it('if pokemon id does not exists returns an error message', () => {
        const response = agent.get('/pokemons/980')
        expect(response.name).to.equal('Pokemon not found')
      })
    });
    describe('POST /pokemons', () => {
      it('should add a new pokemon', () => {
        const response = agent.post('/pokemon/create')
        expect(response.status).toBe(200),
        expect(response.data).to.equal('Pokemon created successfully')
      })
      it('should give an error message: "Falta el parámetro `name`"', () => {
        const response = agent.post('/pokemon/create')
        expect(response.data.error).to.equal('Falta el parámetro `name`')
      })
      it('should give an error message: "Falta el parámetro `id`"', () => {
        const response = agent.post('/pokemon/create')
        expect(response.data.error).to.equal('Falta el parámetro `id`')
      })
    })
    describe('GET /types', () => {
      it('should get types list', () => {
        const response = agent.get('/types')
        expect(response.status).to.equal(200)
        expect(response.data.length).to.equal(20)
      })
    })
});
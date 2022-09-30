const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const PATH_ID = '/pokemons/:id';
const PATH_POKEMONS = '/pokemons'
const PATH_TYPES = '/types';

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';

// Lanza un útil mensaje de error si el res devuelve un status code distinto al esperado. El request method
// es usado para mejorar los mensajes de error

const expectStatus = (expected, res, method) => {
  if(expected === STATUS_SERVER_ERROR || expected === STATUS_NOT_FOUND) {
      //Asumimos que NO se espera el status STATUS_SERVER_ERROR o el
      //STATUS_NOT_FOUND; para estos casos están los mensajes customizados del Switch
      throw new Error(
          'The expected status should be something other than ' +
              `${STATUS_SERVER_ERROR} and ${STATUS_NOT_FOUND}`
      )
  }

  switch (res.status) {
      case STATUS_SERVER_ERROR:
          throw new Error(
          `El servidor arrojó un error durante la ejecución del request ${method} ${PATH} (status code ` +
          '500)'
          );
                                  //VER COMO SOLUCIONAR EL TEMA DEL PATH
      case STATUS_NOT_FOUND:
          throw new Error(
          `El handler para el request ${method} ${PATH} no se encuentra implementado (status ` +
          'code 404)'
          );


      default:
          if (expected !== res.status) {
          const msg = `Expected status ${expected} but got ${res.status} from ` +
              `${method} ${PATH}`;
          throw new Error(msg);
          }

          /* eslint no-unused-expressions: 0 */
          // This is the correct way to make the expectation, even though it seems odd.
          expect(res).to.be.json;

          if (expected === STATUS_USER_ERROR) {
          expect(res.body).to.have.property('error');
          }
  }
};

// Hace un request usando el método dado al path provisto. Si el body es dado,
// lo envía junto con el request. Chequea el status esperado.

const req = (method, status, body = null, path = PATH) => {
  const property = method.toLowerCase();
  let request = chai.request(app)[property](path);  //EN EL EJ ERA SERVER.SERVER

  if (body) {
      request = request.send(body);
  }

  return request
  .catch((err) => {
    // For status codes like 404, 500, and 422, the promise fails and contains
    // a response property in the error object. We want to rescue these cases
    // and return the response object normally. That way we can have a single
    // handler that checks status properly in all cases.
      if (err.response) {
          return err.response;
      }
      throw err;
  })
  .then((res) => {
      expectStatus(status, res, method);
      return res.body;
  });
};

describe('Request', () => {
    beforeEach(() => {

    })
})
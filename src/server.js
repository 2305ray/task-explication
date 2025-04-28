import http from 'node:http'
import { routes } from './routes.js';
import { json } from './middlewares/json.js';
import { extractQueryParams } from './utils/extract-query-params.js';




const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)


    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        const { query, ...params } = routeParams.groups

        req.params - params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(4000) 









//                                  ESTUDOS
/* //Arquivo principal que inicializa o servidor
import http from 'node:http';
import { randomUUID } from 'node:crypto'; // Gera IDs únicos
import { readCsvTasks } from '../stream/readCsv.js';//função com o csv 

let tasks = []; // lista de tarefas

//função q vai carregar o csv q tem as tarefas ao servidor

async function loadTasks() {
    try{
        tasks = await readCsvTasks(); //vai ler as tarefas lá o stream
        console.log('Tarefas carregadas do CSV');
    } catch (error) {
      console.error('Erro ao carregar tarefas do CSV:', error);
    }
}

// Chama a função para carregar as tarefas assim que o servidor for inicializado
loadTasks();

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // Rota para GET /tasks
    if (method === "GET" && url === '/tasks') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(tasks)); // Responde com a lista de tarefas
    }

    // o cliente faz requisição
    //os dados vão chegar em partes (chunks)
    //vai chegar como string
    //tranformar em objeto javascript com (JSON,parse)
    //criar uma taks com oq foi pedido: 
        // - `id` - Identificador único de cada task
        // - `title` - Título da task
        // - `description` - Descrição detalhada da task
        // - `completed_at` - Data de quando a task foi concluída. O valor inicial deve ser `null`
        // - `created_at` - Data de quando a task foi criada.
        // - `updated_at` - Deve ser sempre alterado para a data de quando a task foi atualizada.
    // depois salvar essa task no banco de dados
    //depois retornar essa task como resposta

    // Rota para POST /tasks
    if (method === 'POST' && url === '/tasks') {
         //fazer a requisição de um corpo - como POST- precisa ter onde guardar essas peças quando chegarem
        let body = "";

         //enviar os pedaços e juntar 
        //.on é um método de eventos que permite que o seu código escute eventos específicos e execute uma ação quando esses eventos acontecem.
        // o nome do evento vai se chamar dados e ele vai escutar a chunk 
        req.on('data', (chunk) => {
            body += chunk.toString(); // Vai juntar os pedaços em uma string
        });

        
        //vai ouvir o evento chamado end (q vai ser quando a info terminar de ser recebida)
        //função de callback, vai ser disparada quando terminar de recebe
        req.on('end', () => {
            try {
                const data = JSON.parse(body); // Transforma em objeto JS

                const newTask = {
                    id: randomUUID(),
                    title: data.title,
                    description: data.description,
                    completed_at: null,
                    created_at: new Date().toString(),
                    updated_at: new Date().toString(),
                };

                tasks.push(newTask); // Adiciona a nova tarefa à lista

                res.writeHead(201, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify(newTask)); // Responde com a nova tarefa criada
            } catch (error) {
                res.writeHead(400, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({ message: 'Erro ao processar arquivo JSON' }));
            }
        });

        return; // Para garantir que a execução não continue após o POST
    }

    // Caso a rota não exista
    res.writeHead(404);
    res.end('Rota não encontrada');
});

server.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
  });
  
 */
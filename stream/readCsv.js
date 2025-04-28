import fs from 'node:fs'; // Módulo do Node para acessar arquivos
import { parse } from 'csv-parse'; //  biblioteca externa que transforma cada linha do CSV em um objeto JavaScript. 
import fetch from 'node-fetch';


//Lê o CSV e já envia cada linha como uma requisição POST para a API. Não guarda em memória, nem cria campos adicionais.
//Usar for await...of para lidar com cada linha à medida que chega (programação assíncrona e streaming).
//Só envia title e description — espera que a API crie os outros campos.
//Usa csv-parse com fromLine: 2 (ignora o cabeçalho manualmente) e trata cada linha como um array de valores.

//caminho de onde está o arquivo csv
//Usando new URL, ele entende o caminho relativo ao próprio arquivo (readCsv.js), e não ao diretório de execução.
const filePath = new URL('./tasks.csv', import.meta.url);


//criar uma variavel de leitura (stream)
const stream = fs.createReadStream(filePath)

//configurar o parser do csv q ta sendo lido (intepretar dados brutos como o csv)
const csvParse = parse({
    delimiter: ',', // separador dos campos
    skipEmptyLines: true, // ignora linhas vazias
    fromLine: 2 // começa a ler a partir da linha 2 (pulando o cabeçalho)
  });
  

  //conectar a leitura ao parser
  //cada linha do CSV vai ser transformada e liberada para o JavaScript usar.
async function readTasks() {
    const linesParse = stream.pipe(csvParse);

     //esperar cada linha chegar antes de processar
     //cada line é um array de campos lidos
     for await (const line of linesParse) {
        //pegando os valores de cada linha
        const [title, description] = line;


        //ele vai esperar o servidor responder antes de fazer a requisição http
        await fetch('http://localhost:4000/tasks', {
            method: 'POST', //tipo de requisiçaõ
            headers: { //informando q estamos enviando um json
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ //transformando os dados em JSON
              title,
              description,
            })
          })
     }

}

//rodar a função
    readTasks()


    //promete q vai retornar depois de tantos ssegundos
    function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }






//                              ESTUDOS

/* //vai ler e retornar os arquivos ja formatados
export function readCsvTasks() {
    return new Promise((resolve, reject) => { // vai ler o arquivo e vai entregar o resultado com resolvido ou erro
        const tasks = []; // vai guardar as tasks q foram lidas

        // stream de leitura 
        const streamRedable = fs.createReadStream(filePath)

        //criar parser (intepretar dados brutos como o csv)
        const parser = parse({
            columns: true, //  usa a primeira linha do CSV como nome das chaves (ex: title, description);
            delimiter: ',', //  define que os campos estão separados por tabulação (\t);
            trim: true // remove espaços em branco no início/fim de cada valor.
        });

        //conectar a leitura com o intepretador de dado
        streamRedable.pipe(parser) 
        
        //quando ler as linhas com sucesso ele irá fazer
        .on('data', (row) => {
            const now = new Date().toString()//captura o momento atual em formato de string

            const task = {
                id: randomUUID(), // ID único
                title: row.title,
                description: row.description,
                completed_at: null,
                created_at: now,
                updated_at: now,
            };

            tasks.push(task) // agora q ja está formatado, é adicionado no array q vai guarda-lo
        })

        //quando terminar de ler o aqruivo ele fará
        .on('end', () => {
            resolve(tasks)// como prometido ele vai entregar o array com as tasks
        })

          // Se acontecer algum erro na leitura
      .on('error', (error) => {
        reject(error); // Disparamos o erro
      });
    });
} */
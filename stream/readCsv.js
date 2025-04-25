import fs from 'node:fs'; // Módulo do Node para acessar arquivos
import { parse } from 'csv-parse'; //  biblioteca externa que transforma cada linha do CSV em um objeto JavaScript. 
import { randomUUID } from 'node:crypto'; // Gera um ID único para cada tarefa


//ler o arquivo com stream
//usar o csv-parse para transfromar em um objeto
//completar os campos q faltam

//caminho de onde está o arquivo csv
//Usando new URL, ele entende o caminho relativo ao próprio arquivo (readCsv.js), e não ao diretório de execução.
const filePath = new URL('./tasks.csv', import.meta.url);


//vai ler e retornar os arquivos ja formatados
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
            const now = new Date().toString()//captura o momento atual em formato de stringify

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
}
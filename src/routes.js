import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'


const database =  new Database()

export const routes = [
    {
        method: 'POST',
        path: buildRoutePath('./tasks'), // pega a regex criada pro enderço de email e o caminho q vai tar
        handler: (req, res) => {
            const { title, description } = req.body

            if (!title) {
                return res.writehead(400).end(
                    JSON.stringify({ message: 'TITLE IS REQUIRED'}),
                )
            }

            if(!description) {
                res.writehead(400).end(
                    JSON.stringify({ message: 'DESCRIPTION IS REQUIRED'}),
                )
            }

            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            }

            database.insert('tasks', task)

            return res.writehead(201).end()
        }

    },

    {
        method: 'GET',
        path: buildRoutePath('./tasks'), // pega a regex criada pro enderço de email e o caminho q vai tar
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', {
                title: search,
                description: search
            })

            return res.edn(JSON.stringify(tasks))
        }
    },

    {
        method: 'PUT',
        path: buildRoutePath('./tasks'), // pega a regex criada pro enderço de email e o caminho q vai tar
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body

            if(!title && !description) {
                return res.writeHead(400).end(
                    JSON.stringify({ message: 'title or description are required' })
                  )
            }

            const [task] = database.select('tasks', {id})

            if (!task) {
                return res.writeHead(404).end()
            }

            database.update('tasks', id, {
                title: title ?? task.title,
                description: description ?? task.description,
                update_at: new Date()
            })

            return res.writeHead(204).end()
        }

    },

    {
        method: 'DELETE',
        path: buildRoutePath('./tasks'), // pega a regex criada pro enderço de email e o caminho q vai tar
        handler: (req, res) => {
            const { id } = req.params

            const [task] = database.select('tasks', {id})

            if (!task) {
                return res.writeHead(404).end()
              }

              database.delete('tasks', id)

              return res.writeHead(204).end()
        }
    },

    {
        method: 'PATCH',
        path: buildRoutePath('./tasks'), // pega a regex criada pro enderço de email e o caminho q vai tar
        handler: (req, res) => {
            const { id } = req.params

            const [task] = database.select('task', { id })

            if(!task) {
                return res.writeHead(404).end()
            }

            const isTaskCompleted = !!task.completed_at
            const completed_at = isTaskCompleted ? null : new Date()

            database.update('tasks', id, {completed_at})

            return res.writeHead(204).end()
        }
    },
    
]
import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users-router'
import clansRouter from './routes/clans-router'

const PORT = process.env.PORT || 4000
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Rotas do usuario */
app.use('/api', usersRouter)

/* Rotas dos clans */
app.use('/api', clansRouter)


app.use(cors({
    origin: ['http://localhost:3000']
}))
app.use((req: any, res: any) => {
    res.status(404)
})
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})
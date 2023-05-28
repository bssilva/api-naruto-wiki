import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users-router'

const PORT = process.env.PORT || 4000
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Rotas do usuario */
app.use('/api', usersRouter)


app.use(cors({
    origin: ['http://localhost:3000']
}))
app.use((req: any, res: any) => {
    res.status(404)
})
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})
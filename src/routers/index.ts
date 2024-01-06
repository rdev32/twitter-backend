import { Router } from 'express'
import documentation from './docs.router'
import accountsRouter from './accounts.router'
import postsRouter from './posts.router'
import commentsRouter from './comments.router'

const routes = Router()
const version = 'v1'

routes.use(`/api/${version}`, documentation)
routes.use(`/api/${version}`, accountsRouter)
routes.use(`/api/${version}`, postsRouter)
routes.use(`/api/${version}`, commentsRouter)

export default routes

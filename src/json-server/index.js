/* eslint-disable import/no-nodejs-modules */
import http from 'http'
import jsonServer from 'json-server'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
/* eslint-enable import/no-nodejs-modules */

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

// Middleware
server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// Задержка для имитации реального API
server.use(async (_req, _res, next) => {
  await new Promise(resolve => {
    setTimeout(resolve, 800)
  })
  next()
})

// GET все посты
server.get('/posts', (_req, res) => {
  try {
    const db = router.db
    const posts = db.get('posts').value()
    return res.json(posts)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// GET пост по ID
server.get('/posts/:id', (req, res) => {
  try {
    const db = router.db
    const post = db.get('posts').find({ postId: req.params.id }).value()

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    return res.json(post)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// POST создать новый пост
server.post('/posts', (req, res) => {
  try {
    const db = router.db
    const { description, images, preview, userId, userName, willBeDeletedIn } = req.body

    // Валидация обязательных полей
    if (!userId || !userName) {
      return res.status(400).json({
        message: 'userId and userName are required fields',
      })
    }

    const newPost = {
      postId: Date.now().toString(),
      description: description || '',
      images: images || [],
      preview: preview || {},
      userId,
      userName,
      willBeDeletedIn: willBeDeletedIn || null,
      createdAt: new Date().toISOString(),
    }

    db.get('posts').push(newPost).write()

    return res.status(201).json(newPost)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// PUT обновить пост полностью
server.put('/posts/:id', (req, res) => {
  try {
    const db = router.db
    const postId = req.params.id
    const updates = req.body

    // Находим пост
    const postIndex = db.get('posts').findIndex({ postId }).value()

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Обновляем пост
    const currentPost = db.get(`posts[${postIndex}]`).value()
    const updatedPost = {
      ...currentPost,
      ...updates,
      postId: postId,
      updatedAt: new Date().toISOString(),
    }

    db.set(`posts[${postIndex}]`, updatedPost).write()

    return res.json(updatedPost)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// PATCH частично обновить пост
server.patch('/posts/:id', (req, res) => {
  try {
    const db = router.db
    const postId = req.params.id
    const updates = req.body

    // Находим пост
    const postIndex = db.get('posts').findIndex({ postId }).value()

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Частично обновляем пост
    const currentPost = db.get(`posts[${postIndex}]`).value()
    const updatedPost = {
      ...currentPost,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    db.set(`posts[${postIndex}]`, updatedPost).write()

    return res.json(updatedPost)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// DELETE удалить пост
server.delete('/posts/:id', (req, res) => {
  try {
    const db = router.db
    const postId = req.params.id

    // Находим пост для удаления
    const post = db.get('posts').find({ postId }).value()

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    // Удаляем пост
    db.get('posts').remove({ postId }).write()

    return res.status(200).json({
      message: 'Post deleted successfully',
      deletedPost: post,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// Используем стандартный роутер для остальных запросов
server.use(router)

// Запуск сервера
const HTTP_PORT = 8080
const httpServer = http.createServer(server)

httpServer.listen(HTTP_PORT, () => {
  console.log(`Server is running on ${HTTP_PORT} port`)
})

// GET	/posts	Получить все посты
// GET	/posts/:id	Получить конкретный пост
// POST	/posts	Создать новый пост
// PUT	/posts/:id	Полностью обновить пост
// PATCH	/posts/:id	Частично обновить пост
// DELETE	/posts/:id	Удалить пост

// Создание поста POST:
// json
// POST http://localhost:8080/posts
//   Content-Type: application/json
//
// {
//   "description": "Мой новый пост",
//   "images": [{ "url": "image1.jpg" }, { "url": "image2.jpg" }],
//   "preview": { "url": "preview.jpg" },
//   "userId": "222",
//   "userName": "Tom"
// }

// PUT:
// json
// PUT http://localhost:8080/posts/1
//   Content-Type: application/json
//
// {
//   "description": "Обновленное описание",
//   "images": [{ "url": "new-image.jpg" }],
//   "preview": { "url": "new-preview.jpg" },
//   "userId": "222",
//   "userName": "Tom",
//   "willBeDeletedIn": null
// }

// PATCH:
// json
// PATCH http://localhost:8080/posts/1
//   Content-Type: application/json
//
// {
//   "description": "Новое описание"
// }

// DELETE:
// DELETE http://localhost:8080/posts/1

/* eslint-disable import/no-nodejs-modules */
import http from 'http'
import jsonServer from 'json-server'
import multer from 'multer'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
/* eslint-enable import/no-nodejs-modules */

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

// Настройка multer для обработки файлов
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

// Middleware
server.use(jsonServer.defaults({}))

// Задержка для имитации реального API
server.use(async (_req, _res, next) => {
  await new Promise(resolve => {
    setTimeout(resolve, 800)
  })
  next()
})

// ============================================
// POSTS ENDPOINTS
// ============================================

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

// POST создать новый пост - добавляем upload.array('files')
server.post('/posts', upload.array('files'), (req, res) => {
  try {
    const db = router.db

    // Теперь req.body содержит текстовые поля, req.files содержит файлы
    const { description, locations, existingFiles } = req.body
    const files = req.files

    console.log('Description:', description)
    console.log('Locations:', locations)
    console.log('Files:', files)
    console.log('Existing files:', existingFiles)

    let parsedLocations = []
    try {
      parsedLocations = locations ? JSON.parse(locations) : []
    } catch (e) {
      parsedLocations = []
    }

    // Проверяем наличие файлов
    const hasNewFiles = files && files.length > 0
    let existingFilesArray = []
    try {
      existingFilesArray = existingFiles ? JSON.parse(existingFiles) : []
    } catch (e) {
      existingFilesArray = []
    }

    const totalFiles = (hasNewFiles ? files.length : 0) + existingFilesArray.length

    if (totalFiles === 0) {
      return res.status(400).json({
        message: 'At least one file is required',
      })
    }

    if (!description || typeof description !== 'string') {
      return res.status(400).json({
        message: 'Description is required and must be a string',
      })
    }

    if (description.length > 500) {
      return res.status(400).json({
        message: 'Description must be less than 500 characters',
      })
    }

    // Создаем URL для новых файлов
    const newFileUrls = (files || []).map(file => ({
      url: `http://localhost:8080/uploads/${Date.now()}_${file.originalname}`,
      width: 490,
      height: 562,
      name: file.originalname,
      size: file.size,
      type: file.mimetype,
    }))

    // Существующие файлы
    const existingFileUrls = existingFilesArray.map(url => ({
      url: url,
      width: 490,
      height: 562,
    }))

    const allImages = [...newFileUrls, ...existingFileUrls]

    const newPost = {
      postId: Date.now().toString(),
      description: description,
      locations: parsedLocations,
      images: allImages,
      preview: {
        url: allImages[0]?.url || '',
        width: 234,
        height: 228,
      },
      userId: req.body.userId || 'anonymous',
      userName: req.body.userName || 'Anonymous',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      willBeDeletedIn: null,
    }

    db.get('posts').push(newPost).write()

    return res.status(201).json(newPost)
  } catch (error) {
    console.error('Error creating post:', error)
    return res.status(500).json({ message: error.message })
  }
})

// PUT обновить пост полностью
server.put('/posts/:id', (req, res) => {
  try {
    const db = router.db
    const postId = req.params.id
    const updates = req.body

    const postIndex = db.get('posts').findIndex({ postId }).value()

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const currentPost = db.get(`posts[${postIndex}]`).value()
    const updatedPost = {
      ...currentPost,
      ...updates,
      postId,
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

    const postIndex = db.get('posts').findIndex({ postId }).value()

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' })
    }

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

    const post = db.get('posts').find({ postId }).value()

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    db.get('posts').remove({ postId }).write()

    return res.status(200).json({
      message: 'Post deleted successfully',
      deletedPost: post,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// ============================================
// USERS ENDPOINTS
// ============================================

server.get('/users', (_req, res) => {
  try {
    const db = router.db
    const users = db.get('users').value()
    return res.json(users)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

server.get('/users/:id', (req, res) => {
  try {
    const db = router.db
    const user = db.get('users').find({ id: req.params.id }).value()

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json(user)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// ============================================
// LIKES ENDPOINTS
// ============================================

server.post('/posts/:id/like', (req, res) => {
  try {
    const db = router.db
    const postId = req.params.id
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' })
    }

    const postIndex = db.get('posts').findIndex({ postId }).value()

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const currentPost = db.get(`posts[${postIndex}]`).value()
    const likes = currentPost.likes || 0

    db.set(`posts[${postIndex}].likes`, likes + 1).write()

    return res.json({ likes: likes + 1 })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

server.post('/posts/:id/unlike', (req, res) => {
  try {
    const db = router.db
    const postId = req.params.id
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' })
    }

    const postIndex = db.get('posts').findIndex({ postId }).value()

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const currentPost = db.get(`posts[${postIndex}]`).value()
    const likes = currentPost.likes || 0

    if (likes > 0) {
      db.set(`posts[${postIndex}].likes`, likes - 1).write()
    }

    return res.json({ likes: Math.max(0, likes - 1) })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// ============================================
// COMMENTS ENDPOINTS
// ============================================

server.get('/posts/:id/comments', (req, res) => {
  try {
    const db = router.db
    const postId = req.params.id

    const post = db.get('posts').find({ postId }).value()

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    return res.json(post.comments || [])
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

server.post('/posts/:id/comments', (req, res) => {
  try {
    const db = router.db
    const postId = req.params.id
    const { userId, userName, text } = req.body

    if (!userId || !text) {
      return res.status(400).json({
        message: 'userId and text are required',
      })
    }

    const postIndex = db.get('posts').findIndex({ postId }).value()

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const newComment = {
      id: Date.now().toString(),
      userId,
      userName: userName || 'Anonymous',
      text,
      createdAt: new Date().toISOString(),
    }

    const currentComments = db.get(`posts[${postIndex}].comments`).value() || []
    db.set(`posts[${postIndex}].comments`, [...currentComments, newComment]).write()

    return res.status(201).json(newComment)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

server.delete('/posts/:postId/comments/:commentId', (req, res) => {
  try {
    const db = router.db
    const { postId, commentId } = req.params

    const postIndex = db.get('posts').findIndex({ postId }).value()

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const comments = db.get(`posts[${postIndex}].comments`).value() || []
    const commentIndex = comments.findIndex(c => c.id === commentId)

    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    comments.splice(commentIndex, 1)
    db.set(`posts[${postIndex}].comments`, comments).write()

    return res.status(200).json({ message: 'Comment deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

// ============================================
// SAVED POSTS ENDPOINTS
// ============================================

server.post('/posts/:id/save', (req, res) => {
  try {
    const db = router.db
    const postId = req.params.id
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' })
    }

    const postIndex = db.get('posts').findIndex({ postId }).value()

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' })
    }

    db.set(`posts[${postIndex}].isSaved`, true).write()

    return res.json({ message: 'Post saved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

server.post('/posts/:id/unsave', (req, res) => {
  try {
    const db = router.db
    const postId = req.params.id
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' })
    }

    const postIndex = db.get('posts').findIndex({ postId }).value()

    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' })
    }

    db.set(`posts[${postIndex}].isSaved`, false).write()

    return res.json({ message: 'Post unsaved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

server.get('/users/:userId/saved-posts', (req, res) => {
  try {
    const db = router.db
    const userId = req.params.userId

    const posts = db.get('posts').filter({ isSaved: true, userId }).value()

    return res.json(posts)
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

// ============================================
// API ENDPOINTS SUMMARY
// ============================================

// POSTS:
// GET    /posts                          - Получить все посты
// GET    /posts/:id                      - Получить конкретный пост
// POST   /posts                          - Создать новый пост
// PUT    /posts/:id                      - Полностью обновить пост
// PATCH  /posts/:id                      - Частично обновить пост
// DELETE /posts/:id                      - Удалить пост

// LIKES:
// POST   /posts/:id/like                 - Лайкнуть пост
// POST   /posts/:id/unlike               - Убрать лайк

// COMMENTS:
// GET    /posts/:id/comments             - Получить комментарии
// POST   /posts/:id/comments             - Добавить комментарий
// DELETE /posts/:postId/comments/:commentId - Удалить комментарий

// SAVED:
// POST   /posts/:id/save                 - Сохранить пост
// POST   /posts/:id/unsave               - Убрать сохранение
// GET    /users/:userId/saved-posts      - Получить сохраненные посты

// USERS:
// GET    /users                          - Получить всех пользователей
// GET    /users/:id                      - Получить пользователя по ID

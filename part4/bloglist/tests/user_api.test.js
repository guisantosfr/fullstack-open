const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers.map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())

  await Promise.all(promiseArray)
})

describe('Creating user', () => {
  const newUser = {
    username: 'user',
    name: 'user',
    password: 'password'
  }

  test('a new user can be added', async () => {
    await api.post('/api/users').send(newUser).expect(201)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user with existing username is not created', async () => {
    const newUser = helper.initialUsers[0]

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('user with invalid username is not created', async () => {
    const newUser = {
      username: 'us',
      name: 'user',
      password: 'password'
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('user with invalid password is not created', async () => {
    const newUser = {
      username: 'user',
      name: 'user',
      password: 'pa'
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('user with no username is not created', async () => {
    const newUser = {
      username: '',
      name: 'user',
      password: 'password'
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('user with no password is not created', async () => {
    const newUser = {
      username: 'user',
      name: 'user',
      password: ''
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((total, blog) => total + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let favoriteBlog = {}

  for (blog of blogs) {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes

      favoriteBlog.title = blog.title
      favoriteBlog.author = blog.author
      favoriteBlog.likes = blog.likes
    }
  }

  return favoriteBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
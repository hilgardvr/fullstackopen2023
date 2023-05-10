const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const res = blogs.reduce((sum, item) => {
        return sum + item.likes
    }, 0)
    return res
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(b => b.likes)
    const max = Math.max(...likes)
    const index = likes.indexOf(max)
    if (index < 0) {
        return index
    } else {
        return blogs[index]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
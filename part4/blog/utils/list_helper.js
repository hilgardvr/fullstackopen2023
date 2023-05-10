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

const mostBlogs = (blogs) => {
    let authors = {}
    blogs.forEach(element => {
        if (authors.hasOwnProperty(element.author)) {
            authors[element.author] += 1
        } else {
            authors[element.author] = 1
        }
    });
    let returnVal = {}
    for (const [key, val] of Object.entries(authors)) {
        if (returnVal.blogs && returnVal.blogs > val) {
            continue
        } else {
            returnVal.author = key
            returnVal.blogs = val
        }
    }
    return returnVal
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
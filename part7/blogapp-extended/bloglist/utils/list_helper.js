const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    let sum = 0;
    for (let i = 0; i < blogs.length; i++) {
      sum += blogs[i].likes;
    }
    return sum;
  }
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else if (blogs.length === 1) {
    return blogs[0];
  } else {
    let likes = [];
    blogs.map((blog) => {
      likes.push(blog.likes);
    });
    let highest = likes[0];
    for (let i = 0; i <= likes.length; i++) {
      if (likes[i] >= highest) {
        highest = likes[i];
      }
    }
    const index = likes.indexOf(highest);
    return blogs[index];
  }
};

const mostBlogs = (blogs) => {
  //array of authors
  const authors = [];
  blogs.map((blog) => {
    authors.push(blog.author);
  });

  //authors and number of their blogs
  const count = {};
  authors.forEach((author) => {
    count[author] = (count[author] || 0) + 1;
  });

  //find highest num of blogs
  const numBlog = Object.values(count);
  let highest = numBlog[0];
  for (let i = 0; i <= numBlog.length; i++) {
    if (numBlog[i] >= highest) {
      highest = numBlog[i];
    }
  }
  //find the author
  const author = Object.keys(count).find((key) => count[key] === highest);

  //return the result
  const result = {
    author: author,
    blogs: highest,
  };
  return result;
};

const mostLikes = (blogs) => {
  //find total likes per author received
  let likesPerAuthor = blogs.reduce((count, { author, likes }) => {
    count[author] = count[author] || 0;
    count[author] += likes;
    return count;
  }, {});
  //find author with the most likes
  let mostLikesAuthor = Object.keys(likesPerAuthor).sort(
    (a, b) => likesPerAuthor[b] - likesPerAuthor[a]
  )[0];
  const result = {
    author: mostLikesAuthor,
    likes: likesPerAuthor[mostLikesAuthor],
  };
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

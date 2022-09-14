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

module.exports = {
  dummy,
  totalLikes,
};

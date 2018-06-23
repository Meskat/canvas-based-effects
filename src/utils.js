const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

const randomColor = () => {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`;
};

module.exports = { randomIntFromRange, randomColor };

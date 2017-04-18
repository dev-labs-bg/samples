/**
 * Represent a Wish
 *
 * @param {String} name
 * @param {Number} price
 * @constructor
 */
let Wish = function(name, price) {
    this.id = new Date().valueOf();
    this.name = name;
    this.price = price;
};

/**
 * Get a wish's data
 *
 * @returns {{id: Wish.id, name: Wish.name, price: Wish.price}}
 */
Wish.prototype.get = function () {
    const { id, name, price } = this;

    return { id, name, price };
};
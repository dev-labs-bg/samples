let Wish = function(name, price) {
    this.id = new Date().valueOf();
    this.name = name;
    this.price = price;
};

Wish.prototype.get = function () {
    const { id, name, price } = this;

    return { id, name, price };
};
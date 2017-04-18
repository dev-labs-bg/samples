let WishesCollection = function() {
    this.wishes = [];
};

WishesCollection.prototype.add = function(Wish) {
    this.wishes.push(Wish);
};

WishesCollection.prototype.getAll = function() {
    return this.wishes;
};

WishesCollection.prototype.getSum = function() {
    let sum = 0;
    this.wishes.map( wish => sum += wish.price );

    return sum;
};

WishesCollection.prototype.remove = function(id) {
    this.wishes = this.wishes.filter( wish => wish.id !== id );
};
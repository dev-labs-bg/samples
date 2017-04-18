let WishesCollection = function() {
    this.wishes = [];
};


WishesCollection.prototype.add = function(wish) {
    this.wishes.push(wish);
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

WishesCollection.prototype.subscribe = function() {
    const self = this;

    $.Topic( "wish-add" ).subscribe( function({name, price}) {
        self.add(new Wish(name, price));
    });

    $.Topic( "wish-remove" ).subscribe( function(id) {
        self.remove(id);
    });
};
/**
 * Represent a collection of Wish objects
 *
 * @constructor
 */
let WishesCollection = function() {
    // Here we store the Wish objects
    this.wishes = [];
};

/**
 * Add a Wish
 *
 * @param {Wish} wish
 */
WishesCollection.prototype.add = function(wish) {
    this.wishes.push(wish);
};

/**
 * Get all Wishes
 *
 * @returns {Array}
 */
WishesCollection.prototype.getAll = function() {
    return this.wishes;
};

/**
 * Get the sum of all Wishes
 *
 * @returns {number}
 */
WishesCollection.prototype.getSum = function() {
    let sum = 0;
    this.wishes.map( wish => sum += wish.price );

    return sum;
};

/**
 * Remove a Wish by id
 *
 * @param {Number} id
 */
WishesCollection.prototype.remove = function(id) {
    this.wishes = this.wishes.filter( wish => wish.id !== id );
};

/**
 * Subscribe the collection to relevant topics
 */
WishesCollection.prototype.subscribe = function() {
    const self = this;

    // On a wish addition, add the wish to the collection
    $.Topic( "wish-add" ).subscribe( function({name, price}) {
        self.add(new Wish(name, price));
    });

    // On a wish remove, remove the wish from the collection
    $.Topic( "wish-remove" ).subscribe( function(id) {
        self.remove(id);
    });
};
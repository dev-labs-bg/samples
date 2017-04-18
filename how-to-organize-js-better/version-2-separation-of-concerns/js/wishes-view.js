/**
 * Hold the wish presentation logic
 *
 * Here we add, remove and list Wishes
 *
 * @param {WishesCollection} wishesCollection - where we manage our wishes
 * @param {Wish} Wish - reference to Wish constructor function,
 * in order to create a new wish on corresponding DOM event.
 * @constructor
 */
let WishesView = function(wishesCollection, Wish) {
    this.wishesCollection = wishesCollection;
    this.Wish = Wish;
};

/**
 * Init DOM events
 */
WishesView.prototype.initEvents = function () {
    const self = this;

    // Handle wish addition
    $('.wish-list .wish-add').on('click', function() {
        let name =  $('.wish-list input[name="name"]').val();
        let price =  parseFloat($('.wish-list input[name="price"]').val());

        // Create wish and it to the wishes collection
        let wish = new self.Wish(name, price);
        self.wishesCollection.add(wish);

        self.render();
    });

    // Handle wish remove
    $('.wish-list .wish-list-items').on('click', '.wish-remove', function() {
        let id = $(this).data('id');

        // Remove the wish from the collection
        self.wishesCollection.remove(id);
        self.render();
    });
};

/**
 * Update the DOM according to the wish collection
 */
WishesView.prototype.render = function () {
    const wishes = this.wishesCollection.getAll();

    $('.wish-list-items').html('');
    let html = '';

    // Build wishes html
    wishes.map(wish => {
        html += `<li>${wish.name} - ${wish.price} <a data-id="${wish.id}" data-name="${wish.name}" data-price="${wish.price}" class="wish-remove" href="javascript:;">(remove)</a></li>`;
    });

    // Update the wish list and the sum DOM elements
    $('.wish-list .wish-list-items').append(html);
    $('.wish-list .wish-list-sum').html(this.wishesCollection.getSum());
};
/**
 * Hold the wish presentation logic
 *
 * Here we add, remove and list Wishes
 *
 * @param {WishesCollection} wishesCollection - where we manage our wishes
 * @constructor
 */
let WishesView = function(wishesCollection) {
    this.wishesCollection = wishesCollection;
};

WishesView.prototype.initEvents = function () {
    this.publishers();
    this.subscribers();
};

/**
 * Publish messages on corresponding DOM events
 */
WishesView.prototype.publishers = function() {
    // Handle wish addition
    $('.wish-list .wish-add').on('click', function() {
        let name =  $('.wish-list input[name="name"]').val();
        let price =  parseFloat($('.wish-list input[name="price"]').val());

        // Publish a message with corresponding wish data, that a wish is being added
        $.Topic( "wish-add" ).publish( {name, price} );
    });

    // Handle wish remove
    $('.wish-list .wish-list-items').on('click', '.wish-remove', function() {
        let id = $(this).data('id');

        // Publish a message with corresponding wish data, that a wish is being removed
        $.Topic( "wish-remove" ).publish(id);
    });
};

/**
 * Subscribe wishes view to relevant topics
 */
WishesView.prototype.subscribers = function() {
    const self = this;

    $.Topic( "wish-add" ).subscribe( function({name, price}) {
        self.render();
    });

    $.Topic( "wish-remove" ).subscribe( function(name) {
        self.render();
    });
};

/**
 * Update the DOM according to the wish collection
 */
WishesView.prototype.render = function () {
    const wishes = this.wishesCollection.getAll();

    $('.wish-list .wish-list-items').html('');
    let html = '';

    // Build wishes html
    wishes.map(wish => {
        html += `<li>${wish.name} - ${wish.price} <a data-id="${wish.id}" data-name="${wish.name}" data-price="${wish.price}" class="wish-remove" href="javascript:;">(remove)</a></li>`;
    });

    // Update the wish list and the sum DOM elements
    $('.wish-list .wish-list-items').append(html);
    $('.wish-list .wish-list-sum').html(this.wishesCollection.getSum());
};
/**
 * Hold the wish quick submitter presentation logic
 *
 * Here we add a new wish
 *
 * @constructor
 */
let WishQuickSubmitterView = function() {};

WishQuickSubmitterView.prototype.initEvents = function () {
    this.publishers();
};

/**
 * Publish messages on corresponding DOM events
 */
WishQuickSubmitterView.prototype.publishers = function() {
    // Handle wish addition
    $('.wish-quick-submitter .wish-add').on('click', function() {
        let name =  $('.wish-quick-submitter input[name="name"]').val();
        let price =  parseFloat($('.wish-quick-submitter input[name="price"]').val());

        // Publish a message with corresponding wish data, that a wish is being added
        $.Topic( "wish-add" ).publish( {name, price} );
    });
};
let WishQuickSubmitterView = function() {};

WishQuickSubmitterView.prototype.initEvents = function () {
    this.publishers();
};

WishQuickSubmitterView.prototype.publishers = function() {
    $('.wish-quick-submitter .wish-add').on('click', function() {
        let name =  $('.wish-quick-submitter input[name="name"]').val();
        let price =  parseFloat($('.wish-quick-submitter input[name="price"]').val());
        $.Topic( "wish-add" ).publish( {name, price} );
    });
};
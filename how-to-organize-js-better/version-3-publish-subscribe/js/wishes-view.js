let WishesView = function(wishesCollection) {
    this.wishesCollection = wishesCollection;
};

WishesView.prototype.initEvents = function () {
    this.publishers();
    this.subscribers();
};

WishesView.prototype.publishers = function() {
    $('.wish-list .wish-add').on('click', function() {
        let name =  $('input[name="name"]').val();
        let price =  parseFloat($('input[name="price"]').val());
        $.Topic( "wish-add" ).publish( {name, price} );
    });

    $('.wish-list .wish-list-items').on('click', '.wish-remove', function() {
        let id = $(this).data('id');
        $.Topic( "wish-remove" ).publish(id);
    });
};

WishesView.prototype.subscribers = function() {
    const self = this;

    $.Topic( "wish-add" ).subscribe( function({name, price}) {
        self.render();
    });

    $.Topic( "wish-remove" ).subscribe( function(name) {
        self.render();
    });
};

WishesView.prototype.render = function () {
    const wishes = this.wishesCollection.getAll();

    $('.wish-list .wish-list-items').html('');
    let html = '';

    wishes.map(wish => {
        html += `<li>${wish.name} - ${wish.price} <a data-id="${wish.id}" data-name="${wish.name}" data-price="${wish.price}" class="wish-remove" href="javascript:;">(remove)</a></li>`;
});

    $('.wish-list .wish-list-items').append(html);
    $('.wish-list .wish-list-sum').html(this.wishesCollection.getSum());
};
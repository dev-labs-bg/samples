let WishesView = function(wishesCollection, Wish) {
    this.wishesCollection = wishesCollection;
    this.Wish = Wish;
};

WishesView.prototype.initEvents = function () {
    const self = this;

    $('.wish-list .wish-add').on('click', function() {
        let name =  $('.wish-list input[name="name"]').val();
        let price =  parseFloat($('.wish-list input[name="price"]').val());

        let wish = new self.Wish(name, price);
        self.wishesCollection.add(wish);

        self.render();
    });

    $('.wish-list .wish-list-items').on('click', '.wish-remove', function() {
        let id = $(this).data('id');
        self.wishesCollection.remove(id);
        self.render();
    });
};

WishesView.prototype.render = function () {
    const wishes = this.wishesCollection.getAll();

    $('.wish-list-items').html('');
    let html = '';

    wishes.map(wish => {
        html += `<li>${wish.name} - ${wish.price} <a data-id="${wish.id}" data-name="${wish.name}" data-price="${wish.price}" class="wish-remove" href="javascript:;">(remove)</a></li>`;
});

    $('.wish-list .wish-list-items').append(html);
    $('.wish-list .wish-list-sum').html(this.wishesCollection.getSum());
};
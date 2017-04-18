$(function() {
    const wishesView = new WishesView(new WishesCollection(), Wish);
    wishesView.initEvents();
});
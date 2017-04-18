$(function() {
    const wishesCollection = new WishesCollection();
    wishesCollection.subscribe();

    const wishesView = new WishesView(wishesCollection);
    wishesView.initEvents();

    const wishQuickSubmitterView = new WishQuickSubmitterView();
    wishQuickSubmitterView.initEvents();
});
$(function() {
    // Add a new wish
    $('.wish-list .wish-add').on('click', function() {
        let name =  $('.wish-list input[name="name"]').val();
        let price =  parseFloat($('.wish-list input[name="price"]').val());

        // Calculate wishes sum
        let sum = $('.wish-list .wish-list-sum').text();
        sum = sum ? parseFloat(sum) : 0;
        sum += price;

        // Update the wish list and the sum DOM elements
        $('.wish-list .wish-list-items').append(`<li>${name} - ${price} <a data-price="${price}" class="wish-remove" href="javascript:;">(remove)</a></li>`);
        $('.wish-list .wish-list-sum').html(sum);
    });

    // Remove already added wish
    $('.wish-list .wish-list-items').on('click', '.wish-remove', function() {
        // Calculate wishes sum
        let price = $(this).data('price');
        let sum = parseFloat($('.wish-list-sum').text()) - price;

        // Remove the wish from the DOM and update the sum
        $(this).parent().remove();
        $('.wish-list .wish-list-sum').text(sum);
    });
});
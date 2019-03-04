var stripe = Stripe('pk_test_hTfcmCAO9w9czLIJI3vdomHH');

var $form = $("#checkoutForm");

$form.submit(function (event) {
    $form.find('button').prop('disabled', true);
    // stripe.createToken('card', {
    //     // country: ,
    //     // currency: 'usd',
    //     // routing_number: '110000000',
    //     // account_number: '000123456789',
    //     // account_holder_name: 'Jenny Rosen',
    //     // account_holder_type: 'individual',
    //     number: $('#cardNumber').val(),
    //     cvc: $('#cvc').val(),
    //     exp_month: $('#expireMonth').val(),
    //     exp_year: $('#expireYear').val(),
    //     name: $('#cardHolderName').val()
    // }).then(function(result) {
    //
    //     // Handle result.error or result.token
    // });

    Stripe.card.createToken({
        number: $('#checkoutForm').val(),
        cvc: $('#checkoutFormcvc').val(),
        exp_month: $('#checkoutFormh').val(),
        exp_year: $('#checkoutForm').val(),
        name: $('#cardHolderName').val()
    }, stripeResponseHandler);
    return false;
});


function stripeResponseHandler(status, response) {
    if (response.error) { // Problem!

        // Show the errors on the form
        $('#chargeError').text(response.error.message);
        $('#chargeError').removeClass('d-none')

        $('button').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

        // Get the token ID:
        var token = response.id;

        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form:
        $form.get(0).submit();

    }
}
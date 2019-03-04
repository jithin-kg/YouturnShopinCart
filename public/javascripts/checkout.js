var Stripe = Stripe('pk_test_hTfcmCAO9w9czLIJI3vdomHH');

var $form = $("#checkoutForm");

$form.submit(function (event) {
    console.log("Its jquery");
    event.preventDefault();
    $form.find('button').prop('disabled', true);

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
//
// document.getElementById("checkoutBtn").onclick = function () {
//     console.log("hiiiiiiiiiii");
// }
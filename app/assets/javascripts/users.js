$(document).ready(function() {
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
  // Watch for a form submission:
  $("#form-submit-btn").click(function(event) {
    //Prevent form's default behavior so that it doesn't yet submit
    event.preventDefault();
    // this disables the button so that people dont try to click a million times
    $('input[type=submit]').prop('disabled', true);
    var error = false;
    // grab values from credit ard fields and store each in variables
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    if (!error) {
      // Get the Stripe token:
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  }); // form submission to stripe
  // stripe sends back a status and a response
  function stripeResponseHandler(status, response) {
    // Get a reference to the form:
    var f = $("#new_user");
    // Get the token from the response:
    var token = response.id;
    // Add the token to the form:
    f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
    // Finally, Submit the form to where it needs to go on our servers:
    f.get(0).submit(); 
  }
});

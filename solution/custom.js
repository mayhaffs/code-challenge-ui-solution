// IIFE - Immediately Invoked Function Expression
(function (custom) {
  // The global jQuery object is passed as a parameter
  custom(window.jQuery, window, document);
})(function ($, window, document) {
  // The $ is now locally scoped
  $(function () {
    // The DOM is ready!
    var $debitForm = $("#debit-form");
    var $checkingForm = $("#checking-form");
    var currentForm = "checking";
    var $typeOfAccount = $("#typeOfAccount");
    var $debitPhoto = $("#debit-photo");
    var $checkingPhoto = $("#checking-photo");

    function showDebit() {
      $checkingForm.addClass("d-none");
      $debitForm.removeClass("d-none");
      $checkingPhoto.addClass("d-none");
      $debitPhoto.removeClass("d-none");
      currentForm = "debit";
      $typeOfAccount.val("debit");
    }
    function showChecking() {
      $debitForm.addClass("d-none");
      $checkingForm.removeClass("d-none");
      $debitPhoto.addClass("d-none");
      $checkingPhoto.removeClass("d-none");
      currentForm = "checking";
      $typeOfAccount.val("checking");
    }

    $("input:radio").click(function (event) {
      var radioVal = event.target.id;
      if (currentForm !== radioVal) {
        if (radioVal === "checking") {
          showChecking();
        } else if (radioVal === "debit") {
          showDebit();
        }
      }
    });

    $("#form-submit").on("click", function (event) {
      $("#form-id").validate({
        rules: {
          loanAccountNumber: {
            required: true,
            number: true,
          },
          typeOfAccount: {
            required: true,
          },
          routingNumber: {
            required: true,
            number: true,
            maxlength: 9,
          },
          bankAccountNumber: {
            required: true,
            number: true,
          },
          confirmBankAccountNumber: {
            required: true,
            number: true,
          },
          cardNumber: {
            required: true,
            number: true,
          },
          nameOnCard: {
            required: true,
          },
          expirationDate: {
            required: true,
          },
          cvv: {
            required: true,
            number: true,
            maxlength: 3,
            minlength: 3,
          },
        },
        messages: {
          // email: {
          //   required: "We need your email address to contact you",
          //   email:
          //     "Your email address must be in the format of name@domain.com",
          // },
          loanAccountNumber: "Please enter a valid account number",
          typeOfAccount: "Please choose a type of account.",
          routingNumber: "Please enter routing number (9 digits)",
          bankAccountNumber: "Please enter a valid bank account number",
          confirmBankAccountNumber:
            "Please confirm your valid bank account number",
          cardNumber: "Please enter a valid card number",
          nameOnCard: "Please enter the name on card",
          expirationDate: "Please enter valid expiration date",
          cvv: "Please enter 3 digit cvv",
        },
        invalidHandler: function (event, validator) {
          // console.log(validator.numberOfInvalids());
        },
        highlight: function (element, errorClass, validClass) {
          $(element).addClass(errorClass).removeClass(validClass);
          $(element.form)
            .find("label[for=" + element.id + "]")
            .addClass("red");
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element).removeClass(errorClass).addClass(validClass);
          $(element.form)
            .find("label[for=" + element.id + "]")
            .removeClass("red");
        },
        submitHandler: function (form) {
          alert("Success! Thank you for your payment!");
          // console.log(getFormData($("#form-id")));
          event.preventDefault();
          form.submit();
        },
      });
    });
  });
  // The rest of your code goes here!
  var validations = {
    loanAccountNumber: "",
    typeOfAccount: "",
    routingNumber: "",
    bankAccountNumber: "",
    confirmBankAccountNumber: "",
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    cvv: "",
  };

  function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function (n, i) {
      indexed_array[n["name"]] = n["value"];
    });
    return indexed_array;
  }
});

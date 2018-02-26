// this page is the logic for the add donation/update donation modal

$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var donationId;
  // Sets a flag for whether or not we're updating a donation to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the donation id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?id=") !== -1) {
    donationId = url.split("=")[1];
    getDonationData(donationId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var descInput = $("#desc");
  var nameInput = $("#donation-name");
  var donationForm = $("#donation-form");
  var donationCategorySelect = $("#donation-category");
  // Giving the postCategorySelect a default value
  donationCategorySelect.val("What is our default category?");
  // Adding an event listener for when the form is submitted
  $(donationForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the donation if we are missing a name or description
    if (!nameInput.val().trim() || !descInput.val().trim()) {
      return;
    }
    // Constructing a newDonation object to hand to the database
    var newDonation = {
      name: donationNameInput.val().trim(),
      desc: descInput.val().trim(),
      category: donationCategorySelect.val()
    };

    console.log(newDonation);

    // If we're updating a donation run updateDonation
    // Otherwise run submitDonation to create a new donation
    if (updating) {
      newDonation.id = donationId;
      updateDonation(newDonation);
    }
    else {
      submitDonation(newDonation);
    }
  });

  // Submits a new donation and closes modal
  function submitDonation(Item) {
    $.post("/api/donations/", Donation, function() {
      //not changing pages here - just close modal
      //but this will reload page and display new donation
      window.location.href = "/donations";
    });
  }

  // Gets donation data if we're editing
  function getDonationData(id) {
    $.get("/api/donations/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        donationNameInput.val(data.name);
        descInput.val(data.desc);
        donationCategorySelect.val(data.category);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updateDonation(item) {
    $.ajax({
      method: "PUT",
      url: "/api/donations",
      data: item
    })
    .then(function() {
      window.location.href = "/donations";
    });
  }
});

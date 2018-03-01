$(document).ready(function () {


  //Greg's latest
  //================DONOR PROFILE DATA TO POPULATE DOM ============================================
  //===============================================================================================

  $.get("/api/user_data").then(function (data) {
    $(".user-name").text(data.name);
    $(".user-city").text(data.city);
    $(".user-state").text(data.state);
    $(".user-email").text(data.email);
    $(".user-phone").text(data.phone);
    $(".user-street").text(data.street);
    $(".user-zip").text(data.zip);
    console.log("The user data is: ", data);
  });



  //================DONOR PROFILE PAGE - WE HAVE OUR DONATIONS & A FORM TO ADD MORE================
  //===============================================================================================
  // myDonationsContainer holds all of our donated items
  var myDonationsContainer = $(".donations-container");
  
  // Click events for donation edit and delete buttons -call edit/deleted functions
  $(document).on("click", "button.delete", handleDonationDelete);
  // ***clicking edit will fire modal form
  $(document).on("click", "button.edit", handleDonationEdit);

  // hold individual items
  var donations;

  // Sets a flag for whether or not we're updating a donation to be false initially
  var updating = false;

  // grabs donations from the database and updates the view
  // if there are none, call displayEmptyDonations to show message to user
  function getDonations() {
    $.get("/api/donations/", function (data) {
      console.log("Donations", data);
      donations = data;
      if (!donations || !donations.length) {
        displayEmptyDonations();
      }
      else {
        initializeDonationsRows();
      }
    });
  }

  // Getting the list of user's donations
  //=====================================
  getDonations();

  // initializeDonationsRows handles appending all of our constructed donation HTML inside
  // myDonationsContainer
  function initializeDonationsRows() {
    myDonationsContainer.empty();
    var donationToAdd = [];
    for (var i = 0; i < donations.length; i++) {
      donationToAdd.push(createNewDonationRow(donations[i]));
    }
    myDonationsContainer.append(donationToAdd);
  }

  //============BUILD OUT INDIVIDUAL DONATIONS INTO .donations-container==========
  // construct a donation's HTML
  // need to work in image thumbnail
  //===========================================
  function createNewDonationRow(donation) {
    console.log(donation);
    console.log(donation.id);

      $('.donations-container').append(`
          <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="http://placehold.it/128x128" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Item:</strong> <small>${donation.name}</small><small style="float:right;">1m</small>
                <br>
                <small>${donation.description}</small>
              </p>
            </div>
            <nav class="level">
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="fa fa-edit" data="${donation.id}></i></span>Edit
                </a>
                <!-- <p>Edit</p> -->
              </div>
              <div class="level-right">
                  <a class="level-item">
                    <span class="icon is-small"><i class="fa fa-trash" data="${donation.id}></i></span>Delete
                  </a>
                </div>
            </nav>
          </div>
        </article>
      `); 
  };

  // Getting jQuery references to the name, description, image, form, and category select
  var nameInput = $("input#donation-name");
  var descriptionInput = $("textarea#donation-description");
  var imgUpload = $("donation-image");
  var donationForm = $("#donation-form");
  var donationCategorySelect = $("select#donation-category");
  var updating = false;

  //===========================Click Event - Submit Form==========================
  // contains logic for new donation and update existing donation
  donationForm.on("submit", function handleFormSubmit(event) {
    console.log('clicked form submit');
    console.log(nameInput.val() );
    console.log(descriptionInput.data() );
    console.log(donationCategorySelect.val() );

    event.preventDefault();
    // Wont submit the donation if we are missing a name or description
    if (!nameInput.val() || !descriptionInput.val()) {
      console.log('no name or description! try again');
      return;
    }
    // Constructing a newDonation object to hand to the database
    var newDonation = {
      name: nameInput.val(),
      description: descriptionInput.val(),
      item_categoryID: donationCategorySelect.val(),
      type: "material"
      //image: imgUpload //??????????????????????????
    };

    console.log("new donation is below");
    console.log(newDonation);

    // If we're updating a donation run updateDonation
    // Otherwise run submitDonation to create a new donation
    if (updating) {
      newDonation.id = id;
      updateDonation(newDonation);
    }
    else {
      submitDonation(newDonation);
    }
  
});
  //===========================END - Submit Form==========================


  // ===========================NEW DONATION==============================

  // Submits a new donation
  function submitDonation(Donation) {
    console.log("function submitDonation is running");
    $.post("/api/donations/", Donation, function() {
      // call getDonations to print all user donations to DOM
      getDonations();
    });
  }
  // ======================END - NEW DONATION========================


  //==========================UPDATE DONATION========================
  // figure out donation id we want to edit 
  function handleDonationEdit() {
    var currentDonation = $(this)
      .parent()
      .parent()
      .data("donation");
      getDonationData(currentDonation.id);
      //window.location.href = "#";
      //not sending to a new window - we're firing the modal form
      //window.location.href = "/cms?item_id=" + currentItem.id;
  }

  // Gets donation data if we're editing
  function getDonationData(id) {
    $.get("/api/donations/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our forms with its data
        donationNameInput.val(data.name);
        descriptionInput.val(data.description);
        donationCategorySelect.val(data.category);
        imgUpload //??????????????????????????
        // If we have a donation with this id, set a flag for us to know to update
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given donation, bring user to the donations page when done
  function updateDonation(item) {
    $.ajax({
      method: "PUT",
      url: "/api/donations/:uid",
      data: item
    })
    .then(function() {
      getDonations();
    });
  }
  //========================== END - UPDATE DONATION========================
 

  //==============================DELETE DONATION============================
  // figure out which donation we want to delete and then calls
  // deleteDonation
  function handleDonationDelete() {
    var currentDonation = $(this)
      .parent()
      .parent()
      .data("donation");
    deleteDonation(currentDonation.id);
  }

  // This function does an API call to delete donation
  // then calls function getDonations to re-write all remaining donations to DOM
  function deleteDonation(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/donations/" + id
    })
      .then(function () {
        getDonations();
      });
  }
  //==============================END - DELETE DONATION========================


  // displays a message when there are no donations to list on the DOM
  function displayEmptyDonations() {
    console.log("Donations do not exist");
    myDonationsContainer.empty();
    var messageDonor = $("<h2>");
    messageDonor.css({ "text-align": "center", "margin-top": "50px" });
    messageDonor.html("Local organizations are in need!, click <a href='#'>here (fire 'add-item' modal) </a> to post a donation.");
    myDonationsContainer.append(messageDonor);
  }







});
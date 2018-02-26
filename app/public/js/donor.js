$(document).ready(function() {
  /* global moment */
  // myItemsContainer holds all of our donated items
  var myDonationsContainer = $(".donation-container");
  var donationCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleDonationDelete);
  $(document).on("click", "button.edit", handleDonationEdit);
  donationCategorySelect.on("change", handleCategoryChange);
  var donations;

  // This function grabs donations from the database and updates the view
  function getDonations(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/donations" + categoryString, function(data) {
      console.log("Donations", data);
      posts = data;
      if (!donations || !donations.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deleteDonation(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/donations/" + id
    })
    .then(function() {
      getDonations(donationCategorySelect.val());
    });
  }

  // Getting the initial list of posts
  getDonations();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    myDonationsContainer.empty();
    var donationToAdd = [];
    for (var i = 0; i < donations.length; i++) {
      donationToAdd.push(createNewRow(donations[i]));
    }
    myDonationsContainer.append(donationToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(item) {
    var newDonationPanel = $("<div>");
    newDonationPanel.addClass("panel panel-default");
    var newIDonationPanelHeading = $("<div>");
    newDonationPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newDonationName = $("<h2>");
    var newDonationDate = $("<small>");
    var newDonationCategory = $("<h5>");
    newDonationCategory.text(donation.category);
    newDonationCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newDonationPanelBody = $("<div>");
    newDonationPanelBody.addClass("panel-body");
    var newDonationDesc = $("<p>");
    newDonationName.text(donation.name + " ");
    newDonationDesc.text(donation.desc);
    var formattedDate = new Date(donation.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newDonationDate.text(formattedDate);
    newDonationName.append(newDonationDate);
    newDonationPanelHeading.append(deleteBtn);
    newDonationPanelHeading.append(editBtn);
    newDonationPanelHeading.append(newDonationName);
    newDonationPanelHeading.append(newCategory);
    newDonationPanelBody.append(newDonationDesc);
    newDonationPanel.append(newDonationPanelHeading);
    newDonationPanel.append(newDonationPanelBody);
    newDonationPanel.data("item", item);
    return newDonationPanel;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handleDonationDelete() {
    var currentDonation = $(this)
      .parent()
      .parent()
      .data("donation");
    deleteDonation(currentDonation.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleDonationEdit() {
    var currentDonation = $(this)
      .parent()
      .parent()
      .data("donation");
      window.location.href = "#";
      //window.location.href = "/cms?item_id=" + currentItem.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    itemContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("Local organizations are in need!, click <a href='#'>here (fire 'add-item' modal) </a> to post an item.");
    itemContainer.append(messageh2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newDonationCategory = $(this).val();
    getDonations(newDonationCategory);
  }

});

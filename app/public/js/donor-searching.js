$(document).ready(function () {

  //This file just does a GET request to figure out which user is logged in
  //and updates the HTML on the page

  $.get("/api/user_data").then(function (data) {
    $(".user-name").text(data.name);
    console.log("The user name is: ", data);
  });

  //========================DONOR SEARCHES FOR ORGS HERE - SEARCH BY CATEGORY======================
  //===============================================================================================

  // orgRequestsContainer holds all of Org's requests
  var orgRequestsContainer = $(".requests-container");

  // Org category user selects from dropdown
  var orgCategorySelect = $("#category");

  // call function handleOrgCategoryChange on category change
  orgCategorySelect.on("change", handleOrgCategoryChange);

  // hold individual items
  var requests;

  // This function handles reloading new requests/needs when Org category changes
    function handleOrgCategoryChange() {
      var newOrgCategory = $(this).val();
      getRequests(newOrgCategory);
    }
  });

  // grabs Org requests/needs by category from database and updates the view
  //***Needs to be by catergoryID***
  // if there are none, call displayEmptyRequests to show message to user
  function getRequests(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/requests" + categoryString, function (data) {
      console.log("Requests", data);
      requests = data;
      if (!requests || !requests.length) {
        displayEmptyRequests();
      }
      else {
        initializeRequestsRows();
      }
    });
  }

  // initializeRequestsRows handles appending all of our constructed requests/needs HTML inside
  // orgNeedsContainer
  function initializeRequestsRows() {
    orgNeedsContainer.empty();
    var requestsToAdd = [];
    for (var i = 0; i < requests.length; i++) {
      requestsToAdd.push(createNewRequestRow(requests[i]));
    }
    orgNeedsContainer.append(requestsToAdd);
  }

  //============BUILD OUT INDIVIDUAL REQUETS INTO .requests-container==========
  // construct a request's HTML
  // need to work in image thumbnail
  // Need 'Claim It!' button
  //===========================================
  function createNewRequestRow(request) {
    var newRequestPanel = $("<div>");
    newRequestPanel.addClass("panel panel-default");
    var newRequestPanelHeading = $("<div>");
    newRequestPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newRequestName = $("<h2>");
    var newRequestDate = $("<small>");
    var newRequestCategory = $("<h5>");
    newRequestCategory.text("Category: " + request.category);
    newRequestCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
        "-15px"
    });
    var newRequestPanelBody = $("<div>");
    newRequestPanelBody.addClass("panel-body");
    var newRequestDescription = $("<p>");
    newRequestName.text(request.name + " ");
    newRequestDesc.text(request.description);
    var formattedDate = new Date(request.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newRequestDate.text(formattedDate);
    newRequestName.append(newRequestDate);
    newRequestPanelHeading.append(deleteBtn);
    newRequestPanelHeading.append(editBtn);
    newRequestPanelHeading.append(newRequestName);
    newRequestPanelHeading.append(newCategory);
    newRequestPanelBody.append(newRequestDescription);
    newRequestPanel.append(newRequestPanelHeading);
    newRequestPanel.append(newRequestPanelBody);
    newRequestPanel.data("request", request);
    return newRequestPanel;
  }


  // displays a message when there are no requests/needs to list on the DOM
  function displayEmptyRequests() {
    orgRequestsContainer.empty();
    var messageOrg = $("<h2>");
    messageOrg.css({ "text-align": "center", "margin-top": "50px" });
    messageOrg.html("Find a local organization in need. Search by category above.");
    orgRequestsContainer.append(messageOrg);
  }



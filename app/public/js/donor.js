$(document).ready(function() {
  /* global moment */
  // blogContainer holds all of our posts
  var myItemsContainer = $(".item-container");
  var itemCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleItemDelete);
  $(document).on("click", "button.edit", handleItemEdit);
  itemCategorySelect.on("change", handleCategoryChange);
  var items;

  // This function grabs posts from the database and updates the view
  function getItems(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/items" + categoryString, function(data) {
      console.log("Items", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deleteItem(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/items/" + id
    })
    .then(function() {
      getItems(itemCategorySelect.val());
    });
  }

  // Getting the initial list of posts
  getItems();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    myItemsContainer.empty();
    var itemsToAdd = [];
    for (var i = 0; i < items.length; i++) {
      itemsToAdd.push(createNewRow(items[i]));
    }
    myItemsContainer.append(itemsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(item) {
    var newItemPanel = $("<div>");
    newItemPanel.addClass("panel panel-default");
    var newItemPanelHeading = $("<div>");
    newItemPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newItemName = $("<h2>");
    var newItemDate = $("<small>");
    var newItemCategory = $("<h5>");
    newItemCategory.text(item.category);
    newItemCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newItemPanelBody = $("<div>");
    newItemPanelBody.addClass("panel-body");
    var newItemDesc = $("<p>");
    newItemName.text(item.name + " ");
    newItemDesc.text(item.desc);
    var formattedDate = new Date(item.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newItemDate.text(formattedDate);
    newItemName.append(newPostDate);
    newItemPanelHeading.append(deleteBtn);
    newItemPanelHeading.append(editBtn);
    newItemPanelHeading.append(newItemName);
    newItemPanelHeading.append(newItemCategory);
    newItemPanelBody.append(newItemDesc);
    newItemPanel.append(newItemPanelHeading);
    newItemPanel.append(newItemPanelBody);
    newItemPanel.data("item", item);
    return newItemPanel;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handleItemDelete() {
    var currentItem = $(this)
      .parent()
      .parent()
      .data("item");
    deleteItem(currentItem.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleItemEdit() {
    var currentItem = $(this)
      .parent()
      .parent()
      .data("post");
      window.location.href = "#";
      //window.location.href = "/cms?item_id=" + currentItem.id;
  }

  // This function displays a messgae when there are no posts
  function displayEmpty() {
    itemContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("Local organizations are in need!, click <a href='#'>here (fire 'add-item' modal) </a> to post an item.");
    itemContainer.append(messageh2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newItemCategory = $(this).val();
    getItems(newItemCategory);
  }

});

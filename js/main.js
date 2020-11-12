// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// Save Bookmark
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById("siteName").value;
  var siteURL = document.getElementById("siteURL").value;

  if (!validateForm(siteName, siteURL)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteURL,
  };

  //   Local Storange Test
  //   localStorage.setItem("test", "Hello World");
  //   console.log(localStorage.getItem("test"));
  //   localStorage.removeItem("test");
  //   console.log(localStorage.getItem("test"));

  // Test if bookmarks is null
  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from local storage and reset it back to local storage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById("myForm").reset();

  // Re-fetch bookmarks()
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  // Re-fetch bookmarks()
  fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from local storage and reset it back to local storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Get output id and build output
  var bookmarksResults = document.getElementById("bookmarksResults");
  bookmarksResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML +=
      '<div class="card bg-light text-dark card-body">' +
      "<h3>" +
      name +
      ' <div class="float-right"><a class="btn btn-info ml-4" href="' +
      url +
      '"target="_blank">Visit</a> ' +
      " <a onclick=\"deleteBookmark('" +
      url +
      '\')" class="btn btn-danger" href="#">Delete</a> ' +
      "</h3></div>" +
      "</div>";
  }
}

// Validate Form
function validateForm(siteName, siteURL) {
  if (!siteName || !siteURL) {
    alert("Please fill in the form");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteURL.match(regex) || siteURL.substring(0, 4) !== "http") {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}

console.log("script.js is connected");

//ajax for put request
//EDIT/UPDATE:
$(document).ready(function() {
  // selecting edit form
  $("#edit-restaurants").submit(function(e) {
    // preventing form from submitting
    e.preventDefault();

    // grabbing form data
    const data = $(this).serialize();
    //selecting the restaurant's id from hidden input
    const id = $("#restaurant-id").val();

    console.log(`Form data: ${data}`);
    console.log(
      "for some reason I am working when i am submitting a comment!!!!!!"
    );

    // PUT request to /restaurant/:restaurantId to add a restaurant
    $.ajax({
      url: `/restaurants/${id}/edit`,
      // url: `/restaurants/favorites/${id}`,
      data: data,
      type: "PUT",
      success: function(data) {
        console.log("response ", data);
        // redirecting to the restaurant's show page on success
        window.location.href = `/restaurants/${data.id}`;
        // window.location.href = `/restaurants/${data.id}`;
      },
      error: function(xhr, status, error) {
        // add error handler
      }
    });

    console.log("data:", data);
  });

  // delete button;
  $("#delete").click(function(e) {
    // selecting the restaurant's id from hidden input
    e.preventDefault();
    const id = $("#restaurant-id").val();
    console.log(`Deleting id: ${id}`);

    // Prompt user before deleting
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (confirm) {
      // execute if user selects okay
      $.ajax({
        url: `/restaurants/${id}`, // Path
        type: "DELETE",
        success: function(data) {
          console.log("deleting ", data);

          // redirect to restaurants list after deleting an individual restaurant
          window.location.href = "/restaurants";
        },
        error: function(xhr, status, error) {
          // add error handler
        }
      });
    }
  });

  // Selecting form that creates a new restaurant
  $("#new-restaurant").submit(function(e) {
    e.preventDefault();

    const data = $(this).serialize();
    console.log("data ", data);
    $.ajax({
      url: "/restaurants",
      data: data,
      type: "POST",
      success: function(data) {
        console.log("data received ", data);
        window.location.href = `/restaurants`;
      },
      error: function(xhr, status, error) {
        // add error handler
      }
    });
  });
  // });

  //creating a comment
  $("#new-comment").submit(function(e) {
    const id = $("#restaurant-id").val();
    e.preventDefault();
    console.log("i was clicked");
    const data = $(this).serialize();
    console.log("this is the data shitttttttt", data);
    console.log("data ", data);
    $.ajax({
      url: `/restaurants/${id}`,
      data: data,
      type: "POST",
      success: function(data) {
        console.log("this is the data shitttttttt", data);
        console.log("data received ", data);
        // window.location.href = `/restaurants`;
      },
      error: function(xhr, status, error) {
        // add error handler
      }
    });
  });
});

//New Comment: try 2
// $("#comment").click(function(e) {
//   //create comment function
//   // e.preventDefault();
//   // const new_comment = $("#text_comment").val();
//   // const res_id = $("#text_comment").data("res-id");
//   // const data = { comment: new_comment };
//   console.log("heyyyyyy");
//   // $.ajax({
//   //   url: `/restaurants/${id}/edit`, // Path
//   //   type: "POST",
//   //   data: data,
//   //   success: function(data) {
//   //     console.log("added", comment);
//   //     window.location.href = `/restaurants/${data.id}`;
//   //   },
//   //   error: function(xhr, status, error) {}
//   // });
// });

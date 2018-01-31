//ajax for put request

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
        window.location.href = `/restaurants/${data.id}`;
      },
      error: function(xhr, status, error) {
        // add error handler
      }
    });
  });
});

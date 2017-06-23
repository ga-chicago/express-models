// on click of submit button,
$('#submit').on('click', function(){
  //grab whatever is in each input field
  var name = $('#name').val();
  var type = $('#type').val();
  var region = $('#region').val();
  var vintage = $('#vintage').val();
  var organic = $('#organic').val();
  // build an object with the corresponding keys
  var newWine = {name: name,
                type: type,
                region: region,
                vintage: vintage,
                organic: organic};
  // take the object and post it to /wines
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/wines",
    data: newWine,
    success: function(response){
      window.location.reload();
    }
  });
});

// when the delete button is clicked
$('.delete').on('click', function(){
  // we need to grab the id of the wine that's being deleted
  var id = $(this).attr('id');
  // send a delete via ajax to /wines/id
  $.ajax({
    method: "DELETE",
    url: "http://localhost:3000/wines/" + id,
    success: function(response){
      window.location.reload();
    }
  })
})

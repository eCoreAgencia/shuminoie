function posts(){
  var storename = "shumi";
  var dataEntity = 'BP';
  var retrieveUrl = "http://api.vtex.com.br/"+storename+"/dataentities/"+dataEntity+"/documents/9be5948c-4c81-11e7-9522-0ac29dcf4bd8";

  $.ajax({
      headers: {
        'rest-range': 'resources=0-10',
        'accept': 'application/vnd.vtex.ds.v10+json',
        'content-type': 'application/json'
      },
      type: 'GET',
      url: retrieveUrl,
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        console.log(data);
      }
  });
}

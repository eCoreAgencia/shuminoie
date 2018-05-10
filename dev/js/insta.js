﻿$('#insta-app').each(function(){
	var Class = '';
	var elementClass = $(this).attr('class');
	if(elementClass){
		Class = elementClass;
	}
	$(this).replaceWith('<ul id="insta-app" class="'+Class+'"></ul>');
	var count = 16;
	var userId = '1657718611';
	var accessToken = '1657718611.4b09eb8.66504be972cb41e184a97bf07cea9434';
	$.ajax({
	    url: 'https://api.instagram.com/v1/users/'+userId+'/media/recent/?count='+count+'&access_token='+accessToken,
	    dataType: 'JSONP',
	    jsonpCallback: 'callback',
	    type: 'GET',
	}).done(function(data){
		var post = data.data;
		console.log(post);
		for(i=0; i< post.length; i++){
			var photo = '<li><a href="'+post[i].link+'"><img src="'+post[i].images.thumbnail.url+'"/></a></li>'
			$('#insta-app').append(photo);
		}
	});
});
$(window).load(function(){
	var appID = '809648459194472';
	var pageID = '483784728390278';
	var secret = '6a52b65ea46dd2c9471ab5c555becd2c';
	var accessToken = appID+'|'+secret;
	FB.api('/'+pageID+'?fields=posts.limit(4).order(reverse_chronological){id}', 'get',{
      access_token : accessToken,
    },function(response){
    	var posts = response.posts.data;
    	for(i=0; i < posts.length; i++){
    		var id = posts[i].id.split('_')[1];
			var article = '<div class="fb-post col-xs-12 col-sm-3" id="'+id+'" data-href="https://www.facebook.com/'+pageID+'/posts/'+id+'/" data-width="auto"></div>';
			$('#api-facebook-include').append(article);
		}
		FB.XFBML.parse(document.getElementById('api-facebook-include'));
    });
});
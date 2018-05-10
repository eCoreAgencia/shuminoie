$(window).load(function(){
	var appID = '809648459194472';
	var pageID = '483784728390278';
	var secret = '6a52b65ea46dd2c9471ab5c555becd2c';
	var pageAccessToken = 'EAACEdEose0cBAElmqIVKJa6qCqqJAH1sHN95sMdJ5Q4SiDm2ockvq9h8o9YcokCp6C5OlaKEpG2C6f59rnZBzWTsH5fOkkWlfdMkgKwuywleWOluJlASLjmKUjU6L9dW8rZCK9gTBZA18wLtFTqKq5ipaivZC5ZCBZCOuSS5GaxZARPgpxcPHSiFeZCfclLi7gjuvoxYqkZBzpwZDZD|shuminoie';
	FB.api('/'+pageID+'/feed', 'get',{
	  access_token : appID+'|'+secret,
	},function(post){
		post = post.data;
		console.log(post);
		for(i=0; i <= 3; i++){
			var id = post[i].id;
			var id = id.split('_')[1];
			miniPost = '<iframe src="http://www.facebook.com/plugins/post.php?href=https://www.facebook.com/shuminoie/posts/'+id+'&width=500&show_text=true&height=634&appId" width="500" height="525" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';
			$('#api-facebook-include').append(miniPost);
		}
	});
	$('#api-facebook-include iframe:nth-of-type(4)').nextAll().remove();
});
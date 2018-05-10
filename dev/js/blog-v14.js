function nomify(mes){
	switch(mes){
		case '01':
			return 'Janeiro';
			break;
		case '02':
			return 'Fevereiro';
			break;	
		case '03':
			return 'Março';
			break;
		case '04':
			return 'Abril';
			break;
		case '05':
			return 'Maio';
			break;
		case '06':
			return 'Junho';
			break;
		case '07':
			return 'Julho';
			break;
		case '08':
			return 'Agosto';
			break;
		case '09':
			return 'Setembro';
			break;
		case '10':
			return 'Outubro';
			break;
		case '11':
			return 'Novembro';
			break;
		case '12':
			return 'Dezembro';
			break;
		default:
			return "default";
	}
}

if($('body.home').length > 0){
	$.ajax(
		'/shumi/dataentities/BG/search/?_fields=_all',
		{
		headers: {
			Accept: 'application/vnd.vtex.ds.v10+json',
			'Content-Type': 'application/json',
		},
		type: 'GET'
		}).done(function (data, key, val) {
 
		$.each(data, function(key, val) {
			var fullPost = val.ConteudoPost;
			var excerpt = val.Resumo;
			var title = val.TituloPost;
			var postDate = val.createdIn.split('T')[0].split('-');;
			var mes = nomify(postDate[1].toString());
			var thumbnail;
			console.log(val.Thumbnail);
			if(val.Thumbnail){
				thumbnail = "http://shumi.vtexcrm.com.br/DynamicForm/GetFile?dataEntityInstanceId=BG-"+val.id+"&fileName="+val.Thumbnail;
				console.log('normal');
			}else{
				thumbnail = "/arquivos/bg-padrao-post-blog.jpg";
				console.log('yeah');
			}
			$('<article class="post-call"><div class="thumb"><img src="'+thumbnail+'"/><div class="postDate"><span class="day">'+postDate[2]+'</span><span class="month" >'+mes+'</span></div></div><h3 class="title-post">'+title+'</h3><p class="excerpt">'+excerpt+'</p><p class="full-post">'+fullPost+'</p></article>').appendTo('.post-contents');
			$('img[src*="null"]').remove();
			$('.shuminoblog .full-post').nextAll().remove();

			var body = $('body');
			body.on('click', '.shuminoblog article', function(event) {
				var myContentClone = $(this).clone();
				$('.modal .modal-content').remove();
				body.addClass('modal-active');
				$('<div class="modal-content"></div>').insertAfter('.close-modal');
				myContentClone.appendTo('.modal-content');
			});

		});
	})
}

if($('body.blog').length > 0){
	$.ajax(
		'/shumi/dataentities/BG/search/?_fields=_all',
		{
		headers: {
			Accept: 'application/vnd.vtex.ds.v10+json',
			'Content-Type': 'application/json',
		},
		type: 'GET'
		}).done(function (data, key, val) {

		var body = $('body');
		$('<section class="main-post"></section>').appendTo('#blog-area .container');
		$('<section class="more-post"></section>').insertAfter('.main-post');

		$.each(data, function(key, val) {

			var post = val.ConteudoPost;
			var fullPost = val.ConteudoPost;
			var excerpt = val.Resumo;
			var title = val.TituloPost;
			var postDate = val.createdIn.split('T')[0].split('-');;
			var mes = nomify(postDate[1].toString());
			var thumbnail;
			console.log(val.Thumbnail);
			if(val.Thumbnail){
				thumbnail = "http://shumi.vtexcrm.com.br/DynamicForm/GetFile?dataEntityInstanceId=BG-"+val.id+"&fileName="+val.Thumbnail;
				console.log('normal');
			}else{
				thumbnail = "/arquivos/bg-padrao-post-blog.jpg";
				console.log('yeah');
			}
			$('<article class="post-call"><div class="thumb"><img src="'+thumbnail+'"/><div class="postDate"><span class="day">'+postDate[2]+'</span><span class="month" >'+mes+'</span></div></div><h3 class="title-post">'+title+'</h3><p class="excerpt">'+excerpt+'</p><p class="full-post">'+fullPost+'</p></article>').appendTo('.more-post');
			$('img[src*="null"]').remove();
			$('#blog-area .full-post').nextAll().remove();

			// First Child Full Reading //
				var myFirst = $('#blog-area article.post-call').first().appendTo('.main-post');
				$('article.post-call h3.title-post').insertBefore('.thumb');
			// First Child Full Reading //

			body.on('click', '#blog-area article.post-call', function(event) {
				var myContentClone = $(this).clone();
				$('#blog-area .container .main-post article').fadeOut(function(){ $(this).remove(); });
				myContentClone.appendTo('.main-post').fadeIn();
				$('article.post-call h3.title-post').insertBefore('.thumb');
			});
		});
	})
}
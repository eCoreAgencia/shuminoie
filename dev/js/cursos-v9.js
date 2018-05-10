var storeName = 'shumi';
var dataEntity = 'CR';
function getCursos(inicio, fim, postid){
	var range = 'resources='+inicio+'-'+fim;
	var cursos;
	var url = '/shumi/dataentities/CR/search/?_fields=DiaCurso,MesCurso,AnoCurso,perma,HoraInicioCurso,HoraFimCurso,NomeCurso,fullCourse,PalestranteCurso';
	var _headers = {
			Accept: 'application/vnd.vtex.ds.v10+json',
			'Content-Type': 'application/json',
		}
	if(postid){
		url += '&_where=permaLink='+postid;
	}else{
		_headers["REST-Range"] = range;
	}
	$.ajax(
		url,
		{
		headers: _headers,
		type: 'GET',
		async: false
	}).done(function (data, key, val) {
		cursos = data;
	});
	return cursos;
}
function cursoRenderMini(curso,renderAt){
	for(i = 0; i < curso.length; i++){
		var DiaCurso = curso[i].DiaCurso;
		var MesCurso = curso[i].MesCurso;
		var AnoCurso = curso[i].AnoCurso;
		var perma = curso[i].permaLink;
		var HoraInicioCurso = curso[i].HoraInicioCurso;
		var HoraFimCurso = curso[i].HoraFimCurso;
		var NomeCurso = curso[i].NomeCurso;
		var fullCourse = cursos[i].FullCurso;
		var PalestranteCurso = curso[i].PalestranteCurso;
		if(curso[i].Thumbnail){
			thumbnail = "http://shumi.vtexcrm.com.br/DynamicForm/GetFile?dataEntityInstanceId=CR-"+curso[i].id+"&fileName="+curso[i].Thumbnail;
		}else{
			thumbnail = "/arquivos/bg-padrao-post-blog.jpg";
		}		
		$('<article id="'+perma+'" class="curso-box"><div class="header col-xs-12 col-sm-12 col-md-12"><img style="max-width: 205px;" src="'+thumbnail+'" /><span class="date"><strong>'+DiaCurso+'</strong><em>'+MesCurso+'</em><em>'+AnoCurso+'</em></span><div class="sobre"><h3>'+NomeCurso+'</h3><h4>'+PalestranteCurso+'</h4><span class="hour">Das '+HoraInicioCurso+' às '+HoraFimCurso+'</span></div></div><div class="full-course col-xs-12 col-sm-12 col-md-12">'+fullCourse+'</div></article>').appendTo('.'+renderAt);
		$('img[src*="null"]').remove();
	}
}
if($('body.home').length > 0){
	cursos = getCursos(0, 4);
	cursoRenderMini(cursos,'content-cursos');
	var body = $('body');
	body.on('click', '.content-cursos article', function(event) {
		var myContentClone = $(this).find('.full-course').clone();
		$('.modal .modal-content').remove();
		body.addClass('modal-active');
		$('<div class="modal-content"></div>').insertAfter('.close-modal');
		myContentClone.appendTo('.modal-content');
	});
}

if($('body.cursos').length > 0){
	var inicio = 0;
	var fim = 2; 
	var cursos = getCursos(inicio, fim);
	$('<section class="more-courses col-xs-12 col-sm-12 col-md-12"></section>').appendTo('section.cursos');
	$('<menu class="paginador"><button name="prev" data-start="'+inicio+'">Anterior</button><button name="next" data-start="'+fim+'">Próximo</button>').insertAfter('.more-courses');
	cursoRenderMini(cursos,'more-courses');
	$('section.cursos .more-courses .curso-box .header').click(function(){
		if($(this).hasClass('active')){
			$(this).addClass('closing');
			setTimeout(function(){
				$(this).removeClass('active');
				$(this).removeClass('closing');
			}.bind(this), 800);
		}else{
			$('.more-courses .curso-box').removeClass('active');
			$(this).addClass('active');
		}
	});
	$('menu.paginador').each(function(){
		var prev = $('button[name="prev"]');
		var next = $('button[name="next"]');
		prev.hide();
		prev.click(function(){
			var _fim = $(this).attr('data-start');
			var start = String(parseInt(_fim) - parseInt(fim));
			var posts = getPosts(start, _fim);
			$('article.curso-box').remove();
			cursoRenderMini(posts,'more-courses');
			next.attr('data-start', _fim);
			$(this).attr('data-start', start);
			if(start <= 0){
				$(this).hide();
			}
			if($('article.curso-box').length > 1){
				next.show();
			}
		});
		next.click(function(){
			var start = $(this).attr('data-start');
			var _fim = String(parseInt(start) + parseInt(fim));
			var posts = getPosts(start, _fim);
			$('article.curso-box').remove();
			cursoRenderMini(posts,'more-courses');
			prev.attr('data-start', start);
			$(this).attr('data-start', _fim);
			if(start > 0){
				prev.show();
			}
			if($('article.curso-box').length <= 1){
				$(this).hide();
			}
		})
	});
}
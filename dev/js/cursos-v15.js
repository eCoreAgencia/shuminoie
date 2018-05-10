var storeName = 'shumi';
var dataEntity = 'CR';

var courseDateTime = {
	getDate: function(data){
		data = data.split('-');
		var month;
		console.log('data',data);
		switch(data[1]){
			case '01':
				month = 'Janeiro';
				break;
			case '02':
				month = 'Fevereiro';
				break;
			case '03':
				month = 'Março';
				break;
			case '04':
				month = 'Abril';
				break;
			case '05':
				month = 'Maio';
				break;
			case '06':
				month = 'Junho';
				break;
			case '07':
				month = 'Julho';
				break;
			case '08':
				month = 'Agosto';
				break;
			case '09':
				month = 'Setembro';
				break;
			case '10':
				month = 'Outubro';
				break;
			case '11':
				month = 'Novembro';
				break;
			case '12':
				month = 'Dezembro';
				break;
		}
		return [data[2], month, data[0]];
	},
	getTime: function(data){
		data = data.split(':');
		return (data[1] == '00')? data[0].replace(/^0/g,'')+'hs': data[0]+':'+data[1];
	}
}
function getCursos(inicio, fim, postid){
	var range = 'resources='+inicio+'-'+fim;
	var cursos;
	var url = '/shumi/dataentities/CR/search/?_fields=id,DiaCurso,MesCurso,Thumbnail,courseStart,courseEnd,AnoCurso,permaLink,HoraInicioCurso,HoraFimCurso,NomeCurso,FullCurso,PalestranteCurso&_sort=courseStart ASC';
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
	$.each(curso, function(){
		var courseStart = this.courseStart.split('T');
		var startDate = courseDateTime.getDate(courseStart[0]); 
		var startTime = courseDateTime.getTime(courseStart[1].split('+')[0]);
		var courseEnd = this.courseEnd.split('T');
		var endTime = courseDateTime.getTime(courseEnd[1].split('+')[0]);
		var thumbnail = (this.Thumbnail)? "//shumi.vtexcrm.com.br/DynamicForm/GetFile?dataEntityInstanceId=CR-"+this.id+"&fileName="+this.Thumbnail : "/arquivos/bg-padrao-post-blog.jpg";
		if(!($('article#'+perma).length)){
			$('<article id="'+this.permaLink+'" class="curso-box"><div class="header col-xs-12 col-sm-12 col-md-12"><img style="max-width: 205px;" src="'+thumbnail+'" /><span class="date"><strong>'+startDate[0]+'</strong><em>'+startDate[1]+'</em><em>'+startDate[2]+'</em></span><div class="sobre"><h3>'+this.NomeCurso+'</h3><h4>'+this.PalestranteCurso+'</h4><span class="hour">Das '+startTime+' às '+endTime+'</span></div></div><div class="full-course col-xs-12 col-sm-12 col-md-12">'+this.FullCurso+'</div></article>').appendTo('.'+renderAt);
			$('img[src*="null"]').remove();
		}
	});
}
if($('body.home').length > 0){
	cursos = getCursos(0, 4);
	console.log('cursos', cursos);
	cursoRenderMini(cursos,'content-cursos');
	var body = $('body');
	body.on('click', '.content-cursos article', function(event) {
		var cursoId = $(this).attr('id');
		var url = '/cursos/#' + cursoId;
		window.location.href = url;
	});
}

if($('body.cursos').length > 0){
	var inicio = 0;
	var fim = 100; 
	$('<section class="more-courses col-xs-12 col-sm-12 col-md-12"></section>').appendTo('section.cursos');
	$('<menu class="paginador"><button name="prev" data-start="'+inicio+'">Anterior</button><button name="next" data-start="'+fim+'">Próximo</button>').insertAfter('.more-courses');
	if(window.location.href.indexOf("/#") >= 0){
		var perma = window.location.href.split('#')[1];
		var curso = getCursos(0,0,perma);
		cursoRenderMini(curso,'more-courses');
		$('article#'+perma+' .header').addClass('active');
	}
	var cursos = getCursos(inicio, fim);
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
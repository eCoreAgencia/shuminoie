function PreLancamento(){
	var _self = this;
	var startTime, finalTime;
	this.setStartTime = function(a){
		this.startTime = a;
	},
	this.setEndTime = function(a){
		this.finalTime = a;
	},
	this.calculateDistance = function(time1, time2){
		var distance = time1-time2;
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        if (days < 10) days = '0'+days;
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (hours < 10) hours = '0'+hours;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes < 10) minutes = '0'+minutes;
        return [days,hours,minutes];
	},
	this.getLaunchDate = function(productId, callback){
		$.ajax({
			url: '/api/catalog_system/pvt/products/ProductGet/'+productId,
			headers:{
				"Content-Type": 'application/json',
				"X-VTEX-API-AppKey": 'vtexappkey-admloja-IEZCMK',
				"X-VTEX-API-AppToken": 'FVZSVPLVYBRDNNDFTNFZODZPETLBOFDNQGGSPEVRJCBUHIHUVFOKPGZBWKNCEJHTYDNHHKQPRNPLCEIVLQFIRTYJGEWFQTNZUIWDVZNLPZSCQNYRCRQNEYBEFEACOLYY',
			},
			success: function(data){callback.success(data)},
			error: function(data){callback.error(data)},
		});
	},
	this.update = function(callback){
		var d = this.calculateDistance(finalTime, startTime);
		callback(d);
	}
}
var PreLancamento = new PreLancamento();
$('body.produto').each(function(){
	PreLancamento.getLaunchDate($('#___rc-p-id')[0].value, {success:function(data){
		if(Date.now() < (new Date(data.ReleaseDate))){
			var dateString = data.ReleaseDate.split('T')[0].split('-');
			$('.buy-box .buy-button').before('<p class="flag pre-venda">PRÉ-VENDA - produto disponível '+dateString[2]+'/'+dateString[1]+'/'+dateString[0]+'</p>');
		}
	}});
});
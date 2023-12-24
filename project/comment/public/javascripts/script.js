var valueHover = 0;
function calcSliderPos(e,maxV) {
		return (e.offsetX / e.target.clientWidth) *  parseInt(maxV,10);
	}
	
$(".starrate").on("click",function(){
	$(this).data('val',valueHover);
	$(this).addClass('saved')
	});
	
$(".starrate").on("mouseout",function(){
	upStars($(this).data('val'));
	});	
	
$(".starrate span.ctrl").on("mousemove",function(e) { 
	valueHover = Math.ceil(calcSliderPos(e,10)*2)/2;
	upStars(valueHover);
	});
	

function upStars(val) {
	
	var val = parseFloat(val);
	$("#score").html( val.toFixed(1) );
	
	var full = Number.isInteger(val);
	val = parseInt(val);
	var stars = $("#starrate i");
	
	stars.slice(0,val).attr("class" , "fas fa-fw fa-star" );
	if(!full) { 
		stars.slice(val,val+1).attr("class" , "fas fa-fw fa-star-half-alt" ); 
		val++ 
	}
	stars.slice(val,10).attr("class" , "far fa-fw fa-star" );
	
	

	
	}			
$(document).ready(function() {
	$(".starrate span.ctrl").width($(".starrate span.cont").width());
	$(".starrate span.ctrl").height($(".starrate span.cont").height());
});


$(document).ready(function () {
	const storeOptions = {
		'第一餐廳': ['大不同小吃坊', '山多利', '威肯居食屋', 'Food能量', '大葉', '腹愁者聯盟', '自助餐'],
		'第二餐廳': ['同樂豆花', '食在餐坊', '居媽媽美食館', '尚一品早餐店', '大葉', '自助餐'] ,
		'第三餐廳': ['小食光', '自助餐'],
		'第四餐廳': ['餐車']
	};
  
	$('#restaurant').change(function () {
		const selectedRestaurant = $(this).val();
		const storeSelect = $('#store');
	
		storeSelect.empty();
	
		if (selectedRestaurant !== '0') {
			const storeNames = storeOptions[selectedRestaurant];
			storeSelect.prop('disabled', false);
			storeSelect.append('<option value="" selected disabled>請選擇店名</option>');
	
			storeNames.forEach(function (storeName) {
				storeSelect.append(`<option value="${storeName}">${storeName}</option>`);
			});
		} else {
			storeSelect.prop('disabled', true);
		}
	});

	$('#restaurantFilter').change(function () {
		const selectedRestaurant = $(this).val();
		const storeSelect = $('#storeFilter');
	
		storeSelect.empty();
	
		if (selectedRestaurant !== '0') {
			const storeNames = storeOptions[selectedRestaurant];
			storeSelect.prop('disabled', false);
			storeSelect.append('<option value="" selected disabled>請選擇店名</option>');
			
			if (selectedRestaurant === '全部') {

			} else {

				storeNames.forEach(function (storeName) {
					storeSelect.append(`<option value="${storeName}">${storeName}</option>`);
				});
			}
		} else {
			storeSelect.prop('disabled', true);
		}
	
		$('#starFilter').trigger('change');
	});
	
	
	$.get('rates', function (rates) {
		$('#restaurantFilter, #storeFilter, #starFilter').change(function () {
			const selectedRestaurant = $('#restaurantFilter').val();
			const selectedStore = $('#storeFilter').val();
			const selectedStars = $('#starFilter').val();
			filterRates(rates, selectedRestaurant, selectedStore, selectedStars);
		});

        filterRates(rates, '全部', '', '');
    });
    
	function initTable(rates) {
		const rateList = $('#rate-list');
		rateList.empty(); // 清空表格內容
		rateList.append(`<tr><th>評分者</th><th>餐廳</th><th>店名</th><th>餐點</th><th>分數</th><th>評論</th></tr>`);
	
		rates.forEach(function (rate) {
			const numericScore = parseFloat(rate.score);
			const roundedScore = Math.ceil(numericScore * 2) / 2;
			let starHtml = '';
	
			for (let i = 1; i <= 10; i++) {
				if (i <= roundedScore) {
					starHtml += '<i class="fas fa-fw fa-star"></i>';
				} else if (i - 0.5 === roundedScore) {
					starHtml += '<i class="fas fa-fw fa-star-half-alt"></i>';
				} else {
					starHtml += '<i class="far fa-fw fa-star"></i>';
				}
			}
	
			rateList.append(`<tr>
				<td>${rate.name}</td>
				<td>${rate.restaurant}</td>
				<td>${rate.store}</td>
				<td>${rate.meal}</td>
				<td><div class="starrate" data-val="${roundedScore}" data-max="10">
					<span class="cont">${starHtml}</span>
				</div></td>
				<td>${rate.depiction}</td>
			</tr>`);
		});
	}

	function filterRates(rates, selectedRestaurant, selectedStore, selectedStars) {
		const filteredRates = rates.filter(function (rate) {
			const restaurantMatches = selectedRestaurant === '全部' || rate.restaurant === selectedRestaurant;
			const storeMatches = !selectedStore || rate.store === selectedStore;
			const starsMatches = !selectedStars || parseFloat(rate.score) >= parseFloat(selectedStars);
			return restaurantMatches && storeMatches && starsMatches;
		});
	
		initTable(filteredRates);
	}

	$('#add-rate-form').submit(function (event) {
		event.preventDefault(); //避免跳頁

		const name = $('#name').val();
		const restaurant = $('#restaurant').val();
		const store = $('#store').val();
		const meal = $('#meal').val();
		const score = $('#score').text();
		const depiction = $('#depiction').val();

		$.post('rates', { name, restaurant, store, meal, score, depiction }, function (newRate) {
			const numericScore = parseFloat(newRate.score);
			const roundedScore = Math.ceil(numericScore * 2) / 2;

			let starHtml = '';
			for (let i = 1; i <= 10; i++) {
				if (i <= roundedScore) {
					starHtml += '<i class="fas fa-fw fa-star"></i>';
				} else if (i - 0.5 === roundedScore) {
					starHtml += '<i class="fas fa-fw fa-star-half-alt"></i>';
				} else {
					starHtml += '<i class="far fa-fw fa-star"></i>';
				}
			}
	
			$('#add-rate-form')[0].reset();
			$('#restaurantFilter').trigger('change');
			$('#rate-list').append(`<tr><td>${newRate.name}</td>
										<td>${newRate.restaurant}</td>
										<td>${newRate.store}</td>
										<td>${newRate.meal}</td>
										<td><div class="starrate" data-val="${roundedScore}" data-max="10">
												<span class="cont">${starHtml}</span>
											</div></td>
										<td>${newRate.depiction}</td>
										</tr>`);
		});
	});
});

var divlinks = document.getElementById("divlinks");
function showMenu() {
	divlinks.style.right = "0";
}
function hideMenu() {
	divlinks.style.right = "-200px";
}
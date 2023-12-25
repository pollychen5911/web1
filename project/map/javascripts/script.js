/*顯示建築名稱*/
document.addEventListener('click', function(event) {
    if (event.target.tagName.toLowerCase() === 'area') {
        var x = event.clientX;
        var y = event.clientY;

        var locationDiv = document.getElementById('locationName');
        locationDiv.innerText = event.target.getAttribute('data-name');
        locationDiv.style.left = x - 25 + "px";
        locationDiv.style.top = y + -10 + "px";
        locationDiv.style.position = 'fixed';  
        locationDiv.style.display = 'block';
        locationDiv.classList.add('slide-animation');

        setTimeout(function () {
            locationDiv.classList.remove('slide-animation');
        }, 500);

        window.addEventListener('scroll', function() {
            locationDiv.style.display = 'none';
        });
    }
});


/*顯示建築名稱end*/

/*防跳對話框*/
window.alert = function() {
    
};
/*防跳對話框end*/

/*表格*/
const storeOptions = {
    '1': ['大不同小吃坊', '山多利', '威肯居食屋', 'Food能量', '大葉', '腹愁者聯盟', '自助餐'],
    '2': ['同樂豆花', '食在餐坊', '居媽媽美食館', '尚一品早餐店', '大葉', '自助餐'] ,
    '3': ['小食光', '自助餐'],
    '4': ['餐車']
};
function start(){
    display_introduction(0);
    restaurant=["r1", "r2", "r3", "r4"];
    for(let i = 0; i < 4; i++){
        restaurant[i]=document.getElementById("restaurant" + (i + 1));
        restaurant[i].addEventListener("click", function(){display_introduction(i + 1);}, false);
    }
  
}
function display_introduction(index) {
    const restaurantList = $('#restaurant-list');
    restaurantList.empty();
    restaurantList.append('<thead><tr><th>餐廳名稱</th></tr></thead>');
    
    const selectedOptions = storeOptions[index.toString()];

    if (selectedOptions) {
        selectedOptions.forEach(function (option) {
            restaurantList.append(`<tr><td>${option}</td></tr>`);
        });
    }
}


window.addEventListener("load", start, false);
/*表格end*/

/*card*/
$('.marker1').bind('click', function() {
	$('.card1').addClass('active');
	$('.marker1').addClass('inactive');
});
$('.marker2').bind('click', function() {
	$('.card2').addClass('active');
	$('.marker2').addClass('inactive');
});
$('.marker3').bind('click', function() {
	$('.card3').addClass('active');
	$('.marker3').addClass('inactive');
});
$('.marker4').bind('click', function() {
	$('.card4').addClass('active');
	$('.marker4').addClass('inactive');
});
$('.card1').bind('click', function() {
	$('.card1').removeClass('active');
	$('.marker1').removeClass('inactive');
});
$('.card2').bind('click', function() {
	$('.card2').removeClass('active');
	$('.marker2').removeClass('inactive');
});
$('.card3').bind('click', function() {
	$('.card3').removeClass('active');
	$('.marker3').removeClass('inactive');
});
$('.card4').bind('click', function() {
	$('.card4').removeClass('active');
	$('.marker4').removeClass('inactive');
});
/*card end*/
var divlinks = document.getElementById("divlinks");
function showMenu() {
    divlinks.style.right = "0";
}
function hideMenu() {
    divlinks.style.right = "-200px";
}


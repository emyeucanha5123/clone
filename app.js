const months = ["January","February","March",
			    "April","May","June",
			    "July","August","September",
			    "October","November","December"
			    ];
const weeksdays = [ "Sun","Mon","Tue",
					"Wed","Thu","Fri", "Sat"
				  ];

const colors = ['#2d6b5f', '#72e3a6', '#dff4c7', '#edbf98', '#ea3d36'];
const defaultColor = '#888';
let activeColor = '';
let year = 2021;




const yearP = document.querySelector('.year');
const moods = document.querySelectorAll('.mood');
const calendar = document.querySelector('#calendar');
const randomize = document.querySelector('#randomize');
const clear = document.querySelector('#clear');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');






const wdays = weeksdays.map( wday =>{
	const ret = `<div class="week_days">${wday}</div>`
	return ret;
}).join('\n');

// console.log(wdays);

function getDays(month){
	const date = new Date(year, month, 1);
	const days = [];
	while(date.getMonth() == month){
		days.push({"key": date.getDate(), "value": date.getDay()});
		date.setDate(date.getDate()+1);
	}
	while(days[0].value != '0'){
    days.unshift({"key": "", "value": days[0].value - 1 })
	}
	return days;
}

function daysmap(month) {
	const days = getDays(month);
	// console.log(days);
	const dd = days.map( day =>{
	const ret = 
		`${day.key ? `<div class="days"><span class="circle" style="background-color: rgb(136, 136, 136);">${day.key}</span></div>`:`<div class="days"></div>`}`;
	return ret;
}).join('\n');
	return dd;
}



let tmp;
moods.forEach( (mood, index) => {
	mood.addEventListener('click', function(e) {
		moods.forEach(function(elem) {
			if(elem.classList.contains('selected')){
				elem.classList.remove('selected');
				tmp = elem;
			}
		});

		if(tmp == mood){
			mood.classList.remove('selected');
			tmp = '';
		}else{
			mood.classList.add('selected');
		}
		if(activeColor == colors[index]){
			activeColor = defaultColor;
		}else{
			activeColor = colors[index];
		}

	});
});





next.addEventListener('click', () => {
	if(year<=2050){
		++year;	
		yearP.innerHTML = year;
		calen();
	}
	if(year == 2051){
		--year;	
		yearP.innerHTML = year;
		calen();	
	}
});

prev.addEventListener('click', () => {
	if(year >= 1950){
		year--;	
		yearP.innerHTML = year;
		calen();
	}
	if(year == 1949){
		++year;	
		yearP.innerHTML = year;
		calen();	
	}
	
});



function calen(){
	const cals = months.map((cal, index)=> {
	const newElem = `
		<div class="months month_${cal}">
			<h3>${cal}</h3>
			<div class="week_days_container">
				${wdays}
			</div>
			<div class="days_container">
				${daysmap(index)}
			</div>
		</div>
	`;
	return newElem;
	}).join('');
	calendar.innerHTML = cals;
	const circles = calendar.querySelectorAll('.circle');
	// console.log(circles);
	circles.forEach( circle => {

		circle.addEventListener('click', (e) => {
			if(activeColor == circle.style.backgroundColor.toString()){
				circle.style.backgroundColor = defaultColor;
			}
			if(activeColor){
				circle.style.backgroundColor = activeColor;
			}
		});
	});

	clear.addEventListener('click', function(e) {
		circles.forEach(circle => {
			circle.style.backgroundColor = defaultColor;
		});
	});

	randomize.addEventListener('click', function(e) {
		circles.forEach(circle => {
			circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
		});
	});

}


calen();
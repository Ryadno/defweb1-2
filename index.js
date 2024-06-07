const tarifs = document.querySelectorAll(".tarif");

let BASE = 5000
localStorage.setItem('summ', BASE);
let v = localStorage.getItem('summ');

const summ = document.getElementById("summ");
summ.innerHTML = `${v} ₽`;

btn1 = document.querySelector("#delivery>a:nth-child(1)");
btn2 = document.querySelector("#delivery>a:nth-child(2)");
thirdInput = document.querySelector("#first div div:nth-child(3) input");

thirdInput.addEventListener('input', (e) => {
    myKey = event.target.value.replace(/\D/g, ''); //Замена введеного символа на пустоту, если не цифра
	e.target.value = myKey;
});

for(let i=0;i<tarifs.length; i++){
	tarifs[i].addEventListener('change', ()=>{
		for(let j=0; j < 4; j++){
			btn1.click();
			if(i!=j){
				tarifs[j].checked = false;
			}
			switch(i){
				case 0:
					localStorage.setItem('summ', BASE+1800);
					summ.innerHTML = `${5000+1800} ₽`;
					break;
				case 1:
					localStorage.setItem('summ', BASE+3500);
					summ.innerHTML = `${5000+3500} ₽`;
					break;
				case 2:
					localStorage.setItem('summ', BASE+4500);
					summ.innerHTML = `${5000+4500} ₽`;
					break;
				case 3:
					localStorage.setItem('summ', BASE+1200);
					summ.innerHTML = `${5000+1200} ₽`;
					break;
				default:
					break;
			}
		}
	});
}

const pay_type = document.querySelectorAll(".pay_type > input")
for(let i=0;i<pay_type.length; i++){
	pay_type[i].addEventListener('change', ()=>{
		for(let j=0; j < 3; j++){
			if(i!=j){
				pay_type[j].checked = false;
			}
		}
	});
}
//zona = document.querySelector("#second>div:first-child");
strPay =  document.querySelector("#pay>p");
stay = document.querySelectorAll('.stay');
deliveryChecked = true;
btn1.addEventListener('click', ()=>{
	btn1.style.backgroundColor = 'black';
	btn1.style.color = 'white';
	btn2.style.backgroundColor = 'white';
	btn2.style.color = 'black';
	btn2.style.border = '1px solid black';
	strPay.innerHTML = "С учетом стоимости доставки";
	deliveryChecked= true;
})

btn2.addEventListener('click', ()=>{
	btn2.style.backgroundColor = 'black';
	btn2.style.color = 'white';
	btn1.style.backgroundColor = 'white';
	btn1.style.color = 'black';
	btn1.style.border = '1px solid black';
	//zona.style.display = 'none';
	strPay.innerHTML = "Без учета стоимости доставки";
	deliveryChecked= false;
	
	for(let i=0;i<tarifs.length; i++){
		tarifs[i].checked = false;
	}
	
	localStorage.setItem('summ', BASE);
	let v = localStorage.getItem('summ');
	summ.innerHTML = `${v} ₽`;
});

const finalBtn =  document.getElementById("final");
const inputData = document.querySelectorAll("#first input");
const firstDivDiv = document.querySelectorAll("#first div:nth-child(-n+2) div");
const payType = document.querySelectorAll(".pay_type input");
finalBtn.addEventListener('click', ()=>{
	firstDivDiv.forEach((e)=>{
		e.style.border = "1px solid grey";
	});
	payType.forEach((e)=>{
		e.style.outline = 'none';
	});
	tarifs.forEach((e)=>{
		e.style.outline = 'none';
	});
	let foundANYError = false;
	let foundErrors = false;
	let inputIndex = [];
	for(let i=0; i<inputData.length; i++){
		
		if(inputData[i].value == ""){
			foundErrors = true;
			foundANYError = true;
			inputIndex.push(i);
		}
	
	}
	const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9-._]*@[a-zA-Z0-9][a-zA-Z0-9.-]*[a-zA-Z0-9]$/; //Для email
	const phoneRegex = /^\d+$/; //Для номера
	
	if(!emailRegex.test(document.querySelector("#first div:first-child div:nth-child(2) input").value)){
		document.querySelector("#first div:first-child div:nth-child(2)").style.border = "1px solid red";
		foundANYError = true;
	}
	if(!phoneRegex.test(thirdInput.value)){
		document.querySelector("#first div div:nth-child(3)").style.border = "1px solid red";
		foundANYError = true;
	}
	if(deliveryChecked){
		let tarifFound = false;
		for(let i=0;i<tarifs.length; i++){
			if(tarifs[i].checked){
				tarifFound = true;
			}
		}
		if(!tarifFound){
			foundErrors = true;
			tarifs.forEach((e)=>{
				e.style.outline = '2px dashed red';
				e.style.outlineOffset = "12px";
				foundANYError = true;
			});
		}else{
			tarifs.forEach((e)=>{
				e.style.outline = 'none';
			});
		}
	}
	
	foundPayType =false;
	payType.forEach((e)=>{
		if(e.checked){
			foundPayType = true;
		}
	});
	if(!foundPayType){
		payType.forEach((e)=>{
			e.style.outline = '2px dashed red';
			e.style.outlineOffset = "12px";
			foundANYError = true;
		});
	}else{
		payType.forEach((e)=>{
			e.style.outline = 'none';
		});
	}
	
	if(foundErrors){
		inputIndex.forEach((e)=>{
			firstDivDiv[e].style.border = "1px solid red";
		});
	}
	if(!foundANYError){
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
		document.querySelector("#alert p").innerHTML = "Ваш заказ успешно оформлен!";
		document.getElementById("alert").classList.add('opened');
	}
	else{
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
		document.querySelector("#alert p").innerHTML = "Найдены ошибки";
		document.getElementById("alert").classList.add('opened');
	}
	setTimeout(()=>{
		document.getElementById("alert").classList.remove('opened');
	}, 2500)
});
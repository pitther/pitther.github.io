/*User Info*/
var userNameElem = document.getElementById('userName'),
	userInfoElem = document.getElementById('userInfo'),
 	userBalanceElem = document.getElementById('userBalance'),
 	userImageElem = document.getElementById('userImage'),
 	headerElem = document.getElementById('header'),
 	walletElem = document.getElementById('wallet'),
 	walletBonusElem = document.getElementById('walletBonus'),
 	redBetCell = document.getElementById('RedBetCell'),
 	blackBetCell = document.getElementById('BlackBetCell'),
 	greenBetCell = document.getElementById('GreenBetCell'),
 	placeBetPass = true,
 	PopularArabName = ["Abdelkader", "Ahmed", "Mohammed", "Ali", "Rachid", "Said", "Brahim", "Omar", "Djamel",
"Fahd", "Abdullah", "Abdulrahman", "Turki", "Bandar", "Yusuf", "Ibrahim"],
	rollPass = true,
	inputWager = document.getElementById("inputWager"),
	buttonRoll = document.getElementById('buttonRoll'),
	rouletteElem = document.getElementById('rouletteImage'),
	inputSum = 0;
	var user = {
		name: 'User',
		balance: 100.00
	}
var redBetCounter = 0,
	greenBetCounter = 0,
	blackBetCounter = 0,
	allBetSum = 0,
	redPotentialBet = 0,
	greenPotentialBet = 0,
	blackPotentialBet = 0;
	bufferUserBalance = user.balance;

var RollPx = 500,
	RollPxRand = 0,
	RollMax = 8400,
	RollMin = 7350,
	pointCounter = 0,
	pointRemant = 0,
	sqWidth = 70,
	rolledDelay = 0,
	shiftPx = 0,
	roundShifts = 0;

var winColor = '',
	winColorNumber,
	winClr;

var cellContainer = document.getElementById("CellContainer"),
	cellContainerFirstChild,
	cellContainerCount,
	winCell;

function roll(){
	placeBetPass = false;
	if (rollPass == true){
		RollPxRand = Math.floor(Math.random() * (RollMax - RollMin + 1)) + RollMin;
		RollPx -= RollPxRand;
		rouletteElem.style.backgroundPosition = RollPx + 'px 0px';
		winningColor(RollPxRand);
		rollPass = false;
		buttonRoll.innerHTML = '...';
		setTimeout('rolled()', 3900);
	}
}

function rolled(){
	jude();
	cellContainerCountCheck();
	addCell();
	firstChildCellPadding();
	placeBetPass = true;
	rollPass = true;
	buttonRoll.innerHTML = 'Roll';
}

function firstChildCellPadding(){
	cellContainer.children[0].style.marginLeft = '1px';
}

function addCell(){
	winCell = document.createElement('div');
	if (winColor == 'red'){
		winCell.className = 'historyCellRed';
	}
	else if (winColor == 'black'){
		winCell.className = 'historyCellBlack';
	}
	else if (winColor == 'green'){
		winCell.className = 'historyCellGreen';
	}
	winCell.innerHTML = winColorNumber;
	cellContainer.appendChild(winCell);
}

function cellContainerCountCheck(){
	cellContainerCount = cellContainer.childElementCount;
	if (cellContainerCount >= 22){
		cellContainerFirstChild = cellContainer.children[0];
		cellContainer.removeChild(cellContainerFirstChild);
	}
}

function am(money){
	if (typeof(money) == 'number'){
		user.balance += money;
		updateUserInfo();
		return true;
	}
	else{
		return false;
	}
}

function wallet(status, amount){
	if (status == 1){
		if (amount <= 10){
			walletBonusElem.innerHTML = amount + '$';
			walletBonusElem.value = amount;
			walletElem.style.display = 'block';
			walletBonusElem.style.display = 'block';
		}
		else
			return false;
	}
	else if (status == 0){
		walletElem.style.display = 'none';
		walletBonusElem.style.display = 'none';
	}
	else
		return false;
}

function winningColor(RollPxRand){
	var shifted = false;
	shiftPx += RollPxRand - RollMin;
	roundShifts = (shiftPx - shiftPx % sqWidth) / sqWidth;
	if (roundShifts >= 15){
		while (shifted == false){
			roundShifts -= 15;
			if (roundShifts < 15)
				shifted = true;
		}
	}
	switch (roundShifts){
		case 0:
			returnWinColor(1);
			break
		case 1:
			returnWinColor(14);
			break
		case 2:
			returnWinColor(2);
			break
		case 3:
			returnWinColor(13);
			break
		case 4:
			returnWinColor(3);
			break
		case 5:
			returnWinColor(12);
			break
		case 6:
			returnWinColor(4);
			break
		case 7:
			returnWinColor(11);
			break
		case 8:
			returnWinColor(5);
			break
		case 9:
			returnWinColor(10);
			break
		case 10:
			returnWinColor(6);
			break
		case 11:
			returnWinColor(9);
			break
		case 12:
			returnWinColor(7);
			break
		case 13:
			returnWinColor(8);
			break
		case 14:
			returnWinColor(0);
			break
	}
}

function returnWinColor(winClrNum){
	winColorNumber = winClrNum;
	if (0 == winColorNumber){
		winClr = 'green';
	}
	else if (7 >= winColorNumber){
		winClr = 'red';
	}
	else if (winColorNumber <= 15){
		winClr = 'black';
	}
	winColor = winClr;
}

function fastValid(){
	document.getElementById("formDialog").style.transform = "translate(0,-700px)";
	document.getElementById("dialogBG").style.display = "none";
	document.getElementById("container").style.display = "block";
	setUserInfo(user);
}

function valid(form){
	var passed = false;
	user.name = form.name.value;
	user.image = form.userProfileImage.value;
	if (user.name == null || user.name == ''){
		form.name.value = PopularArabName[Math.floor(Math.random() * (15 + 1))];
	}
	else if(user.name.length > 50){
		return false;
	}
	else{
		passed = true;
	}
	if (passed == true){
		fastValid();
	}
}

function setUserInfo(user) {
	document.getElementById("noUserImage").style.display="block";
	userNameElem.innerHTML = user.name;
	userBalanceElem.innerHTML = user.balance+'$';
	if (user.image == null || user.image == '')
		userImageElem.style.backgroundImage = 'url(images/noavatar.png)';
	else
		userImageElem.style.backgroundImage = 'url('+user.image+')';
}

function updateUserInfo(){
	user.balance = Math.round(user.balance * 100) / 100;
	userBalanceElem.innerHTML = user.balance + '$';
}

function userInfo(){
	var correct = false;
}

function inputButtonHelper(type){
	inputSum = inputWager.value;
	inputSum *= 1;

	if (type == 'MAX'){
		inputSum = user.balance;
	}
	else if (type == 'X2'){
		inputSum *= 2;
	}
	else if (type == '1000'){
		inputSum += 1000;
	}
	else if (type == '500'){
		inputSum += 500;
	}
	else if (type == '100'){
		inputSum += 100;
	}
	else if (type == '10'){
		inputSum += 10;
	}
	else if (type == '5'){
		inputSum += 5;
	}
	else if (type == 'CLEAR'){
		inputSum = '';
	}
	else if (type == 'X2.5'){
		inputSum *= 2.5;
	}
	inputWager.value = inputSum;
}

function validBet(wagerForm, type){
	var betValue = wagerForm.wagerBet.value;
	var betPass = false;
	betValue *= 1;
	if (betValue <= user.balance && betValue != 0 && betValue != '' && placeBetPass == true)
		betPass = true;
	else
		return false;

	if (betPass)
		placeBet(type, betValue);

}

function placeBet(type, betValue){
	if (type == 'red'){
		if (redBetCounter + betValue > user.balance || allBetSum + betValue > bufferUserBalance)
			return false;
		redBetCell.value *= 1;
		redBetCell.value += betValue;
		redBetCounter += betValue;
		allBetSum += betValue;
		user.balance -= betValue;
		updateUserInfo();
		redBetCell.innerHTML = redBetCounter;
	}
	else if (type == 'green'){
		if (greenBetCounter + betValue > user.balance || allBetSum + betValue > bufferUserBalance)
			return false;
		greenBetCell.value *= 1;
		greenBetCell.value += betValue;
		greenBetCounter += betValue;
		allBetSum += betValue;
		user.balance -= betValue;
		updateUserInfo();
		greenBetCell.innerHTML = greenBetCounter;
	}
	else if (type == 'black'){
		if (blackBetCounter + betValue > user.balance || allBetSum + betValue > bufferUserBalance)
			return false;
		blackBetCell.value *= 1;
		blackBetCell.value += betValue;
		blackBetCounter += betValue;
		allBetSum += betValue;
		user.balance -= betValue;
		updateUserInfo();
		blackBetCell.innerHTML = blackBetCounter;
	}
}

function jude(){
	if(winColor == 'red'){
		user.balance += redBetCounter*2;
	}
	else if(winColor == 'green'){
		user.balance += greenBetCounter*14;
	}
	else if(winColor == 'black'){
		user.balance += blackBetCounter*2;
	}
	updateUserInfo();
	resetGameVariables();
}

function resetGameVariables(){
	redBetCounter = 0;
	greenBetCounter = 0;
	blackBetCounter = 0;
	allBetSum = 0;
	redPotentialBet = 0;
	greenPotentialBet = 0;
	blackPotentialBet = 0;
	redBetCell.innerHTML = '';
	redBetCell.value = 0;
	greenBetCell.innerHTML = '';
	greenBetCell.value = 0;
	blackBetCell.innerHTML = '';
	blackBetCell.value = 0;
	bufferUserBalance = user.balance;
}

function speedRolling(quantity){

	for (var l = 0; l < quantity; l++){
		roll();
	}
}

function delateBet(type){
	if (placeBetPass == true){
		if (type == 'red'){
			allBetSum -= redBetCounter;
			user.balance += redBetCounter;
			redBetCell.value = 0;
			redBetCounter = 0;
			updateUserInfo();
			redBetCell.innerHTML = '';
		}
		else if (type == 'green'){
			allBetSum -= greenBetCounter;
			user.balance += greenBetCounter;
			greenBetCell.value = 0;
			greenBetCounter = 0;
			updateUserInfo();
			greenBetCell.innerHTML = '';
		}
		else if (type== 'black'){
			allBetSum -= blackBetCounter;
			user.balance += blackBetCounter;
			blackBetCell.value = 0;
			blackBetCounter = 0;
			updateUserInfo();
			blackBetCell.innerHTML = '';
		}
	}
	else
		return false;
}

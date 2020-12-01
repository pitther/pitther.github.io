	var turn = 0;
	var buffer = [0,0,0,0,0,0,0,0,0];
	var win = 0;
	var player = "";
	var pass = 1;
	var numMind = 0;
	var PVE = false;
	var PVP = true;
	var computersTurn = false;
	var pastNum = 0;
	var choosen = false;
	var buf = 0;
	var numPassed = false;
	var gameCounter = 0;
	var firstComputerTurned = false;

	var CounterPlayerTwoWinPVE = 0;
	var CounterPlayerOneWinPVE = 0;

	var CounterPlayerTwoWinPVP = 0;
	var CounterPlayerOneWinPVP = 0;

	var scoreTabPass = true;
	var scoreTab = document.getElementById("scoreCounter");


	function desidePVP(){
		PVP = true;
		PVE = false;
		scoreTab.innerHTML = CounterPlayerOneWinPVP+" : "+CounterPlayerTwoWinPVP;
		document.getElementById("PVPbutton").style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
		document.getElementById("PVPbutton").style.transform ="scale(0.95)";
		document.getElementById("PVEbutton").style.transform ="scale(1)";
		document.getElementById("PVEbutton").style.backgroundColor = "#333";
		document.getElementById("PVEbutton").style.boxShadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)";

		turn = 0;
		buffer = [0,0,0,0,0,0,0,0,0];
		win = 0;
		player ="";
		pass = 1;
		document.getElementById("playersTurn").innerHTML = "Player <span id='player'>Х</span> turn";
		for (var i = 0; i <= 8; i++)
		{
			elem = document.getElementById("field_"+i).style.backgroundImage = "none";
		}
		CounterPlayerTwoWinPVE = 0;
		CounterPlayerOneWinPVE = 0;

	}

	function desidePVE(){
		PVP = false;
		PVE = true;
		scoreTab.innerHTML = CounterPlayerOneWinPVE+" : "+CounterPlayerTwoWinPVE;
		document.getElementById("PVEbutton").style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)";
		document.getElementById("PVEbutton").style.transform = "scale(0.95)";
		document.getElementById("PVPbutton").style.transform = "scale(1)";
		document.getElementById("PVPbutton").style.backgroundColor = "#333";
		document.getElementById("PVPbutton").style.boxShadow = "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)";
		document.getElementById("playersTurn").innerHTML = "<span id='player'>Your</span> turn";

		turn = 0;
		buffer = [0,0,0,0,0,0,0,0,0];
		win = 0;
		player = "";
		pass = 1;
		document.getElementById("playersTurn").innerHTML = "Player <span id='player'>Х</span> turn";
		for (var i = 0; i <= 8; i++)
		{
			elem=document.getElementById("field_"+i).style.backgroundImage = "none";
		}
		CounterPlayerOneWinPVP = 0;
		CounterPlayerTwoWinPVP = 0;
	}

	function step(num){
		if (PVP == true){
		elem=document.getElementById("field_"+num);
		if (turn % 2 == 0 && buffer[num] == 0 && pass == 1){
			document.getElementById("playersTurn").innerHTML = "Player <span id = 'player'>О</span> turn";
			document.getElementById("playersTurnDiv").style.maxHeigth = "78px";
			elem.style.backgroundImage="url(images/hrest.svg)";
			turn++;
			buffer[num] = 1;
			player = "Х";
		}
		else if (turn % 2 != 0 && buffer[num] == 0 && pass == 1)
		{
			document.getElementById("playersTurn").innerHTML = "Player <span id='player'>Х</span> turn";
			document.getElementById("playersTurnDiv").style.maxHeigth = "78px";
			elem.style.backgroundImage = "url(images/null.svg)";
			turn++;
			buffer[num] = 2;
			player = "О";
		}
		if ( turn == 9 && win == 0){
			document.getElementById("playersTurn").innerHTML = "Draw<p id='restartText'>Click <span id='restart' onclick='restartGame()'>here</span> to restart</p>";
		}
		if (buffer[0] == 1 && buffer[1] == 1 && buffer[2] == 1 || buffer[0] == 2 && buffer[1] == 2 && buffer[2] == 2 || buffer[3] == 1 && buffer[4] == 1 && buffer[5]==1 || buffer[3]==2 && buffer[4]==2 && buffer[5]==2 || buffer[6]==1 && buffer[7]==1 && buffer[8]==1 || buffer[6]==2 && buffer[7]==2 && buffer[8]==2 || buffer[0]==1 && buffer[3]==1 && buffer[6]==1 || buffer[0]==2 && buffer[3]==2 && buffer[6]==2 || buffer[1]==1 && buffer[4]==1 && buffer[7]==1 || buffer[1]==2 && buffer[4]==2 && buffer[7]==2 || buffer[2]==1 && buffer[5]==1 && buffer[8]==1 || buffer[2]==2 && buffer[5]==2 && buffer[8]==2 || buffer[0]==1 && buffer[4]==1 && buffer[8]==1 || buffer[0]==2 && buffer[4]==2 && buffer[8]==2 || buffer[2]==1 && buffer[4]==1 && buffer[6]==1 || buffer[2]==2 && buffer[4]==2 && buffer[6]==2){
			win=1;
			if (turn % 2 == 0 && scoreTabPass == true){
				CounterPlayerTwoWinPVP++;
				scoreTabPass = false;
				scoreTab.innerHTML=CounterPlayerOneWinPVP+" : "+CounterPlayerTwoWinPVP;
			}
			else if (turn % 2 == 1 && scoreTabPass == true){
				CounterPlayerOneWinPVP++;
				scoreTabPass = false;
				scoreTab.innerHTML=CounterPlayerOneWinPVP+" : "+CounterPlayerTwoWinPVP;
			}
		}
		if (win==1){
			document.getElementById("playersTurn").innerHTML="Player <span id='player'>"+player+" </span> win!<p id='restartText'>Click <span id='restart' onclick='restartGame()'>here</span> to restart</p>";
			pass=0;
		}
		}
		else if(PVE=true){
			elem=document.getElementById("field_"+num);
			if (buffer[num] == 0 && pass == 1){
				buffer[num] = 1;
				turn++;
				computersTurn = true;
				elem.style.backgroundImage = "url(images/hrest.svg)";
			}
			/*alert("turn: "+turn+" pass: "+pass+" win: "+win);*/
			if (pass == 1){
			if (buffer[0]==1 && buffer[1]==1 && buffer[2]==1 || buffer[0]==2 && buffer[1]==2 && buffer[2]==2 || buffer[3]==1 && buffer[4]==1 && buffer[5]==1 || buffer[3]==2 && buffer[4]==2 && buffer[5]==2 || buffer[6]==1 && buffer[7]==1 && buffer[8]==1 || buffer[6]==2 && buffer[7]==2 && buffer[8]==2 || buffer[0]==1 && buffer[3]==1 && buffer[6]==1 || buffer[0]==2 && buffer[3]==2 && buffer[6]==2 || buffer[1]==1 && buffer[4]==1 && buffer[7]==1 || buffer[1]==2 && buffer[4]==2 && buffer[7]==2 || buffer[2]==1 && buffer[5]==1 && buffer[8]==1 || buffer[2]==2 && buffer[5]==2 && buffer[8]==2 || buffer[0]==1 && buffer[4]==1 && buffer[8]==1 || buffer[0]==2 && buffer[4]==2 && buffer[8]==2 || buffer[2]==1 && buffer[4]==1 && buffer[6]==1 || buffer[2]==2 && buffer[4]==2 && buffer[6]==2){
				win = 1;
				gameCounter++;
				document.getElementById("playersTurn").innerHTML="<span id='player'>You</span> win!<p id='restartText'>Click <span id='restart' onclick='restartGame()'>here</span> to restart</p>";
				pass=0;
				CounterPlayerOneWinPVE++;
				scoreTab.innerHTML=CounterPlayerOneWinPVE+" : "+CounterPlayerTwoWinPVE;
			}
			}
			if (win == 0 && turn == 9){
				document.getElementById("playersTurn").innerHTML="Draw<p id='restartText'>Click <span id='restart' onclick='restartGame()'>here</span> to restart</p>";
				pass=0;
				gameCounter++;
			}
			if (pass == 1 && computersTurn == true){
					turn++;
					if (buffer[4] == 0){
						numMind=4;
					}
					else if (turn == 2){
						while (choosen==false){
							buf=Math.floor(Math.random() * (8 - 0 + 1)) + 0;
							if (buffer[buf]!=1){
								choosen=true;
								numMind=buf;
							}
						}
					}
					choosen=false;
					if (true){
							if (buffer[0]==1 && buffer[1] == 1 && buffer[2]==0){
								numMind=2;
							}//
							if (buffer[0]==1 && buffer[2] == 1 && buffer[1]==0){
								numMind=1;
							}//
							if (buffer[0]==1 && buffer[3]==1 && buffer[6]==0){
								numMind=6;
							}//
							if (buffer[0]==1 && buffer[4]==1 && buffer[8]==0){
								numMind=8;
							}//
							if (buffer[0]==1 && buffer[8]==1 && buffer[4]==0){
								numMind=4;
							}//
							if (buffer[1]==1 && buffer[2]==1 && buffer[0]==0){
								numMind=0;
							}//
							if (buffer[1]==1 && buffer[4]==1 && buffer[7]==0){
								numMind=7;
							}//
							if (buffer[1]==1 && buffer[7]==1 && buffer[4]==0){
								numMind=4;
							}//
							if (buffer[2]==1 && buffer[5]==1 && buffer[8]==0){
								numMind=8;
							}//
							if (buffer[2]==1 && buffer[8]==1 && buffer[5]==0){
								numMind=5;
							}//
							if (buffer[2]==1 && buffer[4]==1 && buffer[6]==0){
								numMind=6;
							}//
							if (buffer[2]==1 && buffer[6]==1 && buffer[4]==0){
								numMind=4;
							}//
							if (buffer[3]==1 && buffer[6]==1 && buffer[0]==0){
								numMind=0;
							}//
							if (buffer[3]==1 && buffer[4]==1 && buffer[5]==0){
								numMind=5;
							}//
							if (buffer[3]==1 && buffer[5]==1 && buffer[4]==0){
								numMind=4;
							}//
							if (buffer[4]==1 && buffer[8]==1 && buffer[0]==0){
								numMind=0;
							}//
							if (buffer[4]==1 && buffer[6]==1 && buffer[2]==0){
								numMind=2;
							}//
							if (buffer[4]==1 && buffer[5]==1 && buffer[3]==0){
								numMind=3;
							}//
							if (buffer[4]==1 && buffer[7]==1 && buffer[1]==0){
								numMind=1;
							}//
							if (buffer[5]==1 && buffer[8]==1 && buffer[2]==0){
								numMind=2;
							}//
							if (buffer[6]==1 && buffer[0]==1 && buffer[3]==0){
								numMind=3;
							}//
							if (buffer[6]==1 && buffer[7]==1 && buffer[8]==0){
								numMind=8;
							}//
							if (buffer[6]==1 && buffer[8]==1 && buffer[7]==0){
								numMind=7;
							}//
							if (buffer[7]==1 && buffer[8]==1 && buffer[6]==0){
								numMind=6;
							}
						}
					else if (numMind == pastNum && turn == 4){
						if (buffer[0] == 2){
							if (buffer[4] == 0 && buffer[8] != 1){
								numMind=4;
							}
							else if (buffer[8] == 0 && buffer[4] != 1){
								numMind=8;
							}
							else if (buffer[1] == 0 && buffer[2] != 1){
								numMind=1;
							}
							else if (buffer[2] == 0 && buffer[0] != 1){
								numMind=2;
							}
							else if (buffer[3] == 0 && buffer[6] != 1){
								numMind=3;
							}
							else if (buffer[6] == 0 && buffer[3] != 1){
								numMind=6;
							}
						}
						else if (buffer[1] == 2){
							if (buffer[0] == 0 && buffer[2] != 1){
								numMind=0;
							}
							else if (buffer[2] == 0 && buffer[0] != 1){
								numMind=2;
							}
							else if (buffer[4] == 0 && buffer[7] != 1){
								numMind=4;
							}
							else if (buffer[7] == 0 && buffer[4] != 1){
								numMind=7;
							}
						}
						else if (buffer[2] == 2){
							if (buffer[4] == 0 && buffer[6] != 1){
								numMind=1;
							}
							else if (buffer[6] == 0 && buffer[4] != 1){
								numMind=4;
							}
							else if (buffer[0] == 0 && buffer[1] != 1){
								numMind=1;
							}
							else if (buffer[1] == 0 && buffer[0] != 1){
								numMind=0;
							}
							else if (buffer[5] == 0 && buffer[8] != 1){
								numMind=8;
							}
							else if (buffer[8] == 0 && buffer[5] != 1){
								numMind=5;
							}
						}
						else if (buffer[3] == 2){
							if (buffer[0] == 0 && buffer[6] != 1){
								numMind=6;
							}
							else if (buffer[6] == 0 && buffer[0] != 1){
								numMind=0;
							}
							else if (buffer[4] == 0 && buffer[5] != 1){
								numMind=5;
							}
							else if (buffer[5] == 0 && buffer[4] != 1){
								numMind=4;
							}
						}
						else if (buffer[4] == 2){
							if (buffer[0] == 0 && buffer[8] != 1){
								numMind=8;
							}
							else if (buffer[8] == 0 && buffer[0] != 1){
								numMind=0;
							}
							else if (buffer[2] == 0 && buffer[6] != 1){
								numMind=6;
							}
							else if (buffer[6] == 0 && buffer[2] != 1){
								numMind=2;
							}
							else if (buffer[1] == 0 && buffer[7] != 1){
								numMind=7;
							}
							else if (buffer[7] == 0 && buffer[1] != 1){
								numMind=1;
							}
							else if (buffer[3] == 0 && buffer[5] != 1){
								numMind=5;
							}
							else if (buffer[5] == 0 && buffer[3] != 1){
								numMind=3;
							}
						}
						else if (buffer[5] == 2){
							if (buffer[2] == 0 && buffer[8] != 1){
								numMind=8;
							}
							else if (buffer[8] == 0 && buffer[2] != 1){
								numMind=2;
							}
							else if (buffer[3] == 0 && buffer[4] != 1){
								numMind=4;
							}
							else if (buffer[4] == 0 && buffer[3] != 1){
								numMind=3;
							}
						}
						else if (buffer[6] == 2){
							if (buffer[0] == 0 && buffer[3] != 1){
								numMind=3;
							}
							else if (buffer[3] == 0 && buffer[0] != 1){
								numMind=0;
							}
							else if (buffer[2] == 0 && buffer[4] != 1){
								numMind=4;
							}
							else if (buffer[4] == 0 && buffer[2] != 1){
								numMind=2;
							}
							else if (buffer[8] == 0 && buffer[7] != 1){
								numMind=7;
							}
							else if (buffer[7] == 0 && buffer[8] != 1){
								numMind=8;
							}
						}
						else if (buffer[7] == 2){
							if (buffer[1] == 0 && buffer[4] != 1){
								numMind=4;
							}
							else if (buffer[4] == 0 && buffer[1] != 1){
								numMind=1;
							}
							else if (buffer[6] == 0 && buffer[8] != 1){
								numMind=8;
							}
							else if (buffer[8] == 0 && buffer[6] != 1){
								numMind=6;
							}
						}
						else if (buffer[8] == 2){
							if (buffer[0] == 0 && buffer[4] != 1){
								numMind=4;
							}
							else if (buffer[4] == 0 && buffer[0] != 1){
								numMind=0;
							}
							else if (buffer[2] == 0 && buffer[5] != 1){
								numMind=5;
							}
							else if (buffer[5] == 0 && buffer[2] != 1){
								numMind=2;
							}
							else if (buffer[6] == 0 && buffer[7] != 1){
								numMind=7;
							}
							else if (buffer[7] == 0 && buffer[6] != 1){
								numMind=6;
							}
						}
					}
						//////////////////////////////////////////////

						if (buffer[0]==2 && buffer[1] == 2){
							numMind=2;
						}
						else if (buffer[0]==2 && buffer[3]==2 && buffer[6]!=1){
							numMind=6;
						}
						else if (buffer[0]==2 && buffer[4]==2 && buffer[8]!=1 ){
							numMind=8;
						}
						else if (buffer[0]==2 && buffer[8]==2 && buffer[4]!=1){
							numMind=4;
						}
						else if (buffer[1]==2 && buffer[2]==2 && buffer[0]!=1){
							numMind=0;
						}
						else if (buffer[1]==2 && buffer[4]==2 && buffer[7]!=1){
							numMind=7;
						}
						else if (buffer[1]==2 && buffer[7]==2 && buffer[4]!=1){
							numMind=4;
						}
						else if (buffer[2]==2 && buffer[5]==2 && buffer[8]!=1){
							numMind=8;
						}
						else if (buffer[2]==2 && buffer[8]==2 && buffer[5]!=1){
							numMind=5;
						}
						else if (buffer[2]==2 && buffer[4]==2 && buffer[6]!=1){
							numMind=6;
						}
						else if (buffer[2]==2 && buffer[6]==2 && buffer[4]!=1){
							numMind=4;
						}
						else if (buffer[3]==2 && buffer[6]==2 && buffer[0]!=1){
							numMind=0;
						}
						else if (buffer[3]==2 && buffer[4]==2 && buffer[5]!=1){
							numMind=5;
						}
						else if (buffer[3]==2 && buffer[5]==2 && buffer[4]!=1){
							numMind=4;
						}
						else if (buffer[4]==2 && buffer[8]==2 && buffer[0]!=1){
							numMind=0;
						}
						else if (buffer[4]==2 && buffer[6]==2 && buffer[2]!=1){
							numMind=2;
						}
						else if (buffer[4]==2 && buffer[5]==2 && buffer[3]!=1){
							numMind=3;
						}
						else if (buffer[4]==2 && buffer[7]==2 && buffer[1]!=1){
							numMind=1;
						}
						else if (buffer[5]==2 && buffer[8]==2 && buffer[2]!=1){
							numMind=2;
						}
						else if (buffer[6]==2 && buffer[0]==2 && buffer[3]!=1){
							numMind=3;
						}
						else if (buffer[6]==2 && buffer[7]==2 && buffer[8]!=1){
							numMind=8;
						}
						else if (buffer[6]==2 && buffer[8]==2 && buffer[7]!=1){
							numMind=7;
						}
						else if (buffer[7]==2 && buffer[8]==2 && buffer[6]!=1){
							numMind=6;
						}
					if (buffer[numMind] != 0){
							do {
								buf=Math.floor(Math.random() * (8 - 0 + 1)) + 0;
								if (buffer[buf] != 1 && buffer[buf] != 2){
									choosen=true;
									numMind=buf;
								}
							} while (choosen==false);
					}
					if (win == 0 && turn == 8 && firstComputerTurned == true){
					document.getElementById("playersTurn").innerHTML="Draw<p id='restartText'>Click <span id='restart' onclick='restartGame()'>here</span> to restart</p>";
						pass=0;
						gameCounter++;
						firstComputerTurned=false;
					}
					pastNum=numMind;
					choosen=false;
					buffer[numMind]=2;
					document.getElementById("field_"+numMind).style.backgroundImage="url(images/null.svg)";
					computersTurn=false;
			}
	}


			if (buffer[0]==1 && buffer[1]==1 && buffer[2]==1 || buffer[0]==2 && buffer[1]==2 && buffer[2]==2 || buffer[3]==1 && buffer[4]==1 && buffer[5]==1 || buffer[3]==2 && buffer[4]==2 && buffer[5]==2 || buffer[6]==1 && buffer[7]==1 && buffer[8]==1 || buffer[6]==2 && buffer[7]==2 && buffer[8]==2 || buffer[0]==1 && buffer[3]==1 && buffer[6]==1 || buffer[0]==2 && buffer[3]==2 && buffer[6]==2 || buffer[1]==1 && buffer[4]==1 && buffer[7]==1 || buffer[1]==2 && buffer[4]==2 && buffer[7]==2 || buffer[2]==1 && buffer[5]==1 && buffer[8]==1 || buffer[2]==2 && buffer[5]==2 && buffer[8]==2 || buffer[0]==1 && buffer[4]==1 && buffer[8]==1 || buffer[0]==2 && buffer[4]==2 && buffer[8]==2 || buffer[2]==1 && buffer[4]==1 && buffer[6]==1 || buffer[2]==2 && buffer[4]==2 && buffer[6]==2){
				if (win != 1)
				{
				win=1;
				gameCounter++;
				document.getElementById("playersTurn").innerHTML="<span id='player'>Comuter</span> win!<p id='restartText'>Click <span id='restart' onclick='restartGame()'>here</span> to restart</p>";
				pass=0;
				firstComputerTurned=false;
				CounterPlayerTwoWinPVE++;
				scoreTab.innerHTML=CounterPlayerOneWinPVE+" : "+CounterPlayerTwoWinPVE;
				}
				}
		}

		function firstComputer(){
			numMind=4;
			buffer[numMind]=2;
			document.getElementById("field_"+numMind).style.backgroundImage="url(images/null.svg)";
			firstComputerTurned=true;
		}

		function restartGame(){
			turn=0;
			buffer = [0,0,0,0,0,0,0,0,0];
			win=0;
			player="";
			pass=1;
			document.getElementById("playersTurn").innerHTML="Player <span id='player'>Х</span> turn";

			scoreTabPass = true;
			for (var i=0;i<=8;i++)
			{
				elem=document.getElementById("field_"+i).style.backgroundImage="none";
			}

			if (gameCounter % 2 == 1){
				firstComputer();
			}

	}

	function start(){
		document.getElementById("dialog").style.transform="translate(0,-700px)";
		document.getElementById("dialog-container").style.opacity="0";
		document.body.style.backgroundColor="#E0E0E0";
		setTimeout('secstart()',100);
	}

	function secstart(){
		document.getElementById("hideField").style.display="block";
		setTimeout('thrstart()',100);
	}

	function thrstart(){
		document.getElementById("dialog-container").style.display="none";
	}

	function backToMenu(){
		document.getElementById("hideField").style.display="none";
		document.getElementById("dialog").style.transform="translate(0,0)";
		document.getElementById("dialog-container").style.opacity="1";
		document.getElementById("dialog-container").style.display="block";
		document.body.style.backgroundColor="#E0E0E0";
	}

	function resetGame(){
		CounterPlayerOneWinPVP=0;
		CounterPlayerTwoWinPVP=0;
		CounterPlayerTwoWinPVE=0;
		CounterPlayerOneWinPVE=0;
		scoreTab.innerHTML=CounterPlayerOneWinPVE+" : "+CounterPlayerTwoWinPVE;
	}

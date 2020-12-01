var f = {
	cell: [[1,2,3,4,5,6,7,8],
		  [1,2,3,4,5,6,7,8],
		  [1,2,3,4,5,6,7,8],
		  [1,2,3,4,5,6,7,8],
		  [1,2,3,4,5,6,7,8],
		  [1,2,3,4,5,6,7,8],
		  [1,2,3,4,5,6,7,8],
		  [1,2,3,4,5,6,7,8]],

	M: 7,
	N: 7,
};

var indexM = 0,
	indexN = 0,
	turn = 1,
	prev_i = 0,
	prev_j = 0,
	prev_p = false,
	p1_beat_counter = 0,
	p2_beat_counter = 0,
	only_beat = false,
	next_beat = false;
vis_draw_cells();
function vis_draw_cells(){
	p1_beat_counter = 0;
	p2_beat_counter = 0;
	turn = 1;
	var i,j;
	var b_w = 0;
	var container = document.getElementById('container');
		container.removeChild(document.getElementById('field_i'));
	var field = document.createElement('div');
		field.className = 'field';
		field.id = 'field_i';
		container.appendChild(field);	
	for (i = 0; i <= f.M; i++){
		b_w = i-1;
			for (j = 0; j <= f.N; j++){
			f.cell[i][j] = 0;
			b_w++;
			var cont = document.createElement('div');
				cont.className = 'cell_container';
				cont.id = 'cn'+i+j;		
			var cell = document.createElement('div');
				cell.id = 'c'+i+j;
			var hl = document.createElement('div');
				hl.className = 'hl';
				hl.id = 'h'+i+j;
			if (b_w % 2 == 0){
				cont.style.background='white';
			}
			else{
				cont.style.background='#444444';
			}

			if (i < 2  && b_w % 2 != 0){
				cell.className = 'cell-black';
				f.cell[i][j] = 2;
			}
			else if (i > 5 && b_w % 2 != 0){
				cell.className = 'cell-red';
				f.cell[i][j] = 1;
			}
			document.getElementById('field_i').appendChild(cont);
			cell.appendChild(hl);
			document.getElementById(cont.id).appendChild(cell);
			add_event(i,j);
			}
	}
}

function cell_click(i, j){
	if (f.cell[i][j] == 5){
		del_hl();
		cell_swap(prev_i, prev_j, i, j);
		change_turn();
	}else if (f.cell[i][j] == 6){
		del_hl();
		cell_beat(i,j);
		upd_score();
		check_next_beat(i,j);
		if (next_beat == true){	
			only_beat = true;
		}else{
			change_turn();
		}
	}
	if (f.cell[prev_i][prev_j] == turn && check_cell(i,j)|| f.cell[prev_i][prev_j] == turn + 2 && check_cell(i,j)){	
		del_hl();
	}
	if (check_cell(i,j)){
		del_hl();
		check_turn_possible(i,j);
		del_hl();
		console.log(only_beat);
		if (only_beat == false){
			check_turn_possible(i,j);
		}
		check_turn_beat(i,j);
		draw('this',i,j);
		prev_p = true;
	}
	else{
		del_hl();
		prev_p = false;
	}
	prev_i = i;
	prev_j = j;
	check_k();
}

function add_event(i, j){
	document.getElementById('cn'+i+j).onclick = function(){
  		cell_click(i, j);
	}
}

function check_turn_beat(i,j){
	if (f.cell[i][j] == 1 && i > 1 && turn == 1){
		if (f.cell[i-1][j-1] == 2 && f.cell[i-2][j-2] == 0 || f.cell[i-1][j-1] == 4 && f.cell[i-2][j-2] == 0){
			f.cell[i-2][j-2] = 6;
			draw('possible_beat',i-2,j-2);
			only_beat = true;
		}
		if(f.cell[i-1][j+1] == 2 && f.cell[i-2][j+2] == 0 || f.cell[i-1][j+1] == 4 && f.cell[i-2][j+2] == 0){
			f.cell[i-2][j+2] = 6;
			draw('possible_beat',i-2,j+2);
			only_beat = true;
		}
	}else if (f.cell[i][j] == 2 && i < 6 && turn == 2){
		if (f.cell[i+1][j+1] == 1 && f.cell[i+2][j+2] == 0 || f.cell[i+1][j+1] == 3 && f.cell[i+2][j+2] == 0){
			f.cell[i+2][j+2] = 6;
			draw('possible_beat',i+2,j+2);
			only_beat = true;
		}
		if(f.cell[i+1][j-1] == 1 && f.cell[i+2][j-2] == 0 || f.cell[i+1][j-1] == 3 && f.cell[i+2][j-2] == 0){
			f.cell[i+2][j-2] = 6;
			draw('possible_beat',i+2,j-2);
			only_beat = true;
		}
	}
}

function check_turn_possible(i,j){
	if (f.cell[i][j] == 1 && i != 0){
		if (f.cell[i-1][j-1] == 0){
			f.cell[i-1][j-1] = 5;
			draw('possible_turn',i-1,j-1);
		}
		if(f.cell[i-1][j+1] == 0){
			f.cell[i-1][j+1] = 5;
			draw('possible_turn',i-1,j+1);
		}
		else{return false}
	}else if (f.cell[i][j] == 2 && i < f.M){
		if (f.cell[i+1][j+1] == 0){
			f.cell[i+1][j+1] = 5;
			draw('possible_turn',i+1,j+1);
		}
		if(f.cell[i+1][j-1] == 0){
			f.cell[i+1][j-1] = 5;
			draw('possible_turn',i+1,j-1);
		}
		else{return false}
	}else if (f.cell[i][j] == 3 || f.cell[i][j] == 4){
		var shift = 0;
		while (true){
			shift++;	
			if (i+shift <= f.M && j+shift <= f.M && i+shift >= 0 && j+shift >=0   && f.cell[i+shift][j+shift] == 0){
				f.cell[i+shift][j+shift] = 5;
				draw('possible_turn',i+shift,j+shift);
			}else{
				break;
			}
		}
		shift = 0;
		while(true){
			shift++;
			if(i+shift <= f.M && j-shift <= f.M && i+shift >= 0 && j-shift >=0  && f.cell[i+shift][j-shift] == 0){
				f.cell[i+shift][j-shift] = 5;
				draw('possible_turn',i+shift,j-shift);
			}else{
				break;
			}
		}
		shift = 0;
		while (true){
			shift++;
			if (i-shift <= f.M && j-shift <= f.M && i-shift >= 0 && j-shift >=0 && f.cell[i-shift][j-shift] == 0){
				f.cell[i-shift][j-shift] = 5;
				draw('possible_turn',i-shift,j-shift);	
			}else{
				break;
			}
		}
		shift = 0;	
		while (true){
			shift++;
			if(i-shift <= f.M && j+shift <= f.M && i-shift >= 0 && j+shift >=0  && f.cell[i-shift][j+shift] == 0){
				f.cell[i-shift][j+shift] = 5;
				draw('possible_turn',i-shift,j+shift);
			}else{
				break;
			}
		}
	}
}	

function del_hl(){
	del_hl_pp();
	del_hl_beat();
	del_hl_t();
	for (i = 0; i <= f.M; i++)
		for (j = 0; j <= f.N; j++){
			if (f.cell[i][j] == 5 || f.cell[i][j] == 6){
				f.cell[i][j] = 0;
			}
	}
}



function del_hl_t(){
	for (i = 0; i <= f.M; i++)
		for (j = 0; j <= f.N; j++){
			if (document.getElementById('h'+i+j).className == 'hl-t'){
				document.getElementById('h'+i+j).className = 'hl';
			}
	}
}

function del_hl_beat(){
	for (i = 0; i <= f.M; i++)
		for (j = 0; j <= f.N; j++){
			if (f.cell[i][j] == 6){
				document.getElementById('h'+i+j).className = 'hl';
			}
	}
	return true;
	del_beat();
}

function del_pp(){
	for (i = 0; i <= f.M; i++)
		for (j = 0; j <= f.N; j++){
			if(f.cell[i][j] == 5){
				f.cell[i][j] = 0;
			}
	}
}

function del_hl_pp(){
	for (i = 0; i <= f.M; i++)
		for (j = 0; j <= f.N; j++){
			if (f.cell[i][j] == 5){
				document.getElementById('h'+i+j).className = 'hl';
			}
	}
	return true;
	del_pp();
}

function check_k(){
	var i,j;
	for (i = 0; i <= f.M; i++)
		for (j = 0; j <= f.N; j++){
			if (turn == 1 && i == 0 && f.cell[i][j] == 1){
				f.cell[i][j] = 3;
				document.getElementById('c'+i+j).className='cell-k-red';
			}else if (turn == 2 && i == 7 && f.cell[i][j] == 2){
				f.cell[i][j] = 4;
				document.getElementById('c'+i+j).className='cell-k-black';
			}
		}
}



function check_cell(i,j){
	if (turn == 1){
		if (f.cell[i][j] == 1 || f.cell[i][j] == 3){return true}
		else{return false}
	}else if(turn == 2){
		if (f.cell[i][j] == 2 || f.cell[i][j] == 4){return true}
		else{return false}
	}
}

function cell_swap(i,j,i2,j2){
	var Fcell = f.cell[i][j];
	f.cell[i][j] = 0;
	document.getElementById('c'+i+j).className = 'cell-none';
	f.cell[i2][j2] = Fcell;
	if (Fcell == 1){
		document.getElementById('c'+i2+j2).className = 'cell-red';
	}
	else if (Fcell == 2){
		document.getElementById('c'+i2+j2).className = 'cell-black';
	}
	else if (Fcell == 3){
		document.getElementById('c'+i2+j2).className = 'cell-k-red';
	}
	else if (Fcell == 4){
		document.getElementById('c'+i2+j2).className = 'cell-k-black';
	}
}

function cell_beat(i, j){
	if (turn == 1){
		if (f.cell[i+2][j+2] == 1 && f.cell[i+1][j+1] == 2 || f.cell[i+2][j+2] == 1 && f.cell[i+1][j+1] == 4){
			f.cell[i+2][j+2] = 0;
			f.cell[i+1][j+1] = 0;
			f.cell[i][j] = 1; 
			draw('1',i,j);
			draw('none',i+2,j+2);
			draw('none',i+1,j+1);
			p1_beat_counter++;
		}else if (f.cell[i+2][j-2] == 1 && f.cell[i+1][j-1] == 2 || f.cell[i+2][j-2] == 1 && f.cell[i+1][j-1] == 4){
			f.cell[i+2][j-2] = 0;
			f.cell[i+1][j-1] = 0;
			f.cell[i][j] = 1; 
			draw('1',i,j);
			draw('none',i+2,j-2);
			draw('none',i+1,j-1);
			p1_beat_counter++;
		}
	}else if (turn == 2){
		if (f.cell[i-2][j-2] == 2 && f.cell[i-1][j-1] == 1 || f.cell[i-2][j-2] == 2 && f.cell[i-1][j-1] == 4){
			f.cell[i-2][j-2] = 0;
			f.cell[i-1][j-1] = 0;
			f.cell[i][j] = 2; 
			draw('2',i,j);
			draw('none',i-2,j-2);
			draw('none',i-1,j-1);
			p2_beat_counter++;
		}else if (f.cell[i-2][j+2] == 2 && f.cell[i-1][j+1] == 1 || f.cell[i-2][j+2] == 2 && f.cell[i-1][j+1] == 4){
			f.cell[i-2][j+2] = 0;
			f.cell[i-1][j+1] = 0;
			f.cell[i][j] = 2; 
			draw('2',i,j);
			draw('none',i-2,j+2);
			draw('none',i-1,j+1);
			p2_beat_counter++;
		}
	}

}

function draw(type, i, j){
	var curr_cell = document.getElementById('c'+i+j);
	var curr_hl = document.getElementById('h'+i+j);
	if (type == 'this'){
		curr_hl.className = 'hl-t';
	}else if (type == 'possible_turn'){
		curr_hl.className = 'hl-p';
	}else if (type == 'possible_beat'){
		curr_hl.className = 'hl-b';
	}else if (type == '1'){
		curr_cell.className = 'cell-red';
	}else if (type == '2'){
		curr_cell.className = 'cell-black';
	}else if (type == 'none'){
		curr_cell.className = '.cell-none';
	}
	else{return false}
}

function beat_only(){
	for (i = 0; i <= f.M; i++)
		for (j = 0; j <= f.N; j++){
			check_turn_beat(i,j);
			if (f.cell[i][j] == 6){
				del_hl_beat();
				only_beat = true;
			}
		}
	only_beat = false;
}

function random(min, max) {
  return Math.floor(Math.random() * b(max - min)) + min;
}

 function change_turn(){
 	del_hl();
 	only_beat = false;
 	/*next_beat = false;
 	if(beat_only()){
 		only_beat = true;
 	}else{
 		only_beat = false;
 	}*/
	prev_i = 0;
	prev_j = 0;
	prev_p = false;
 	if (turn == 1){
			check_k();
			turn = 2; 
			document.getElementById('player_turn').innerHTML  = 'P2';
			document.getElementById('player_turn').style.color = '#444444';
		}
	else{
			check_k(i,j);
			turn = 1; 
			document.getElementById('player_turn').innerHTML  = 'P1';
			document.getElementById('player_turn').style.color = '#ff3d3d';
		}
 }

function check_next_beat(i,j){
	del_hl();
	check_turn_beat(i,j);
	if (beat_only() == true){
		next_beat = true;
	}else{
		next_beat = false;
	}
}

function upd_score(){
	document.getElementById('score-r').innerHTML = p1_beat_counter;
	document.getElementById('score-b').innerHTML = p2_beat_counter;
}

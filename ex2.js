
var answers_cnt = 0;
var difficulty = "easy";
var category = "9";
var type = "multiple";
var correct = "-1";

function update_difficulty(){
	if(answers_cnt < 2){
		difficulty = "easy";
		}
	else { if(answers_cnt < 4){
			 difficulty = "medium";
		 } else {
			difficulty = "hard";
			}
		}
}

function inc_cnt() { answers_cnt += 1; }

function gen_url() {
	var url = "https://opentdb.com/api.php?amount=1&category=" + category + "&difficulty=" +
			  difficulty + "&type=" + type;
		return url;
}

function gen_question() {
	update_difficulty();
	category = document.getElementById('category').value;
	type = document.getElementById('type').value;
	$.ajax({ 
		type: 'GET', 
		url: gen_url(), 
		data: { get_param: 'value' }, 
		dataType: 'json',
		success: function (data) { 
				console.log(data);
				$('#get_question').html(
					data.results[0].question
				)
				$('#score').html ('Correct answers in a row : '+answers_cnt+'<br>'+'Difficulty : '+difficulty);
				$('#answers_choice').html('');
				if ( type == "multiple") {
				var rand_num = Math.floor((Math.random() * 3));
				var inccorrect = 0;
				var length_incorrect = data.results[0].incorrect_answers.length + 1;
					for(var i=0;i<length_incorrect;i++){
						if(i == rand_num){
							$('#answers_choice').append('<button id="'+i+'" class="answers_show" onclick="check_answer('+i+')">'+data.results[0].correct_answer + '</button>')
							correct = i;
						}
						else {
							$('#answers_choice').append('<button id="'+i+'" class="answers_show" onclick="check_answer('+i+')">'+data.results[0].incorrect_answers[inccorrect] + '</button>')
							inccorrect += 1;
						}
						$('#answers_choice').append('<br>')
					}
				}
				else {
					var rand_num = Math.floor((Math.random() * 2));
					for(var i=0;i<2;i++){
						if(i == rand_num){
							$('#answers_choice').append('<button id="'+i+'" class="answers_show" onclick="check_answer('+i+')">'+data.results[0].correct_answer+'</button>')
							correct = i;
						}
						else {
							$('#answers_choice').append('<button id="'+i+'" class="answers_show" onclick="check_answer('+i+')">'+data.results[0].incorrect_answers[0] + '</button>')
						}
						$('#answers_choice').append('<br>')
					}
			}
			$('#sub_button').show();
			
		}
	}); 
}

function check_answer(id_button){
	if(id_button == correct){
		alert("Correct");
		inc_cnt();
	}
	else{
		answers_cnt = 0;
		alert("Incorrect");
		}
	gen_question();
}

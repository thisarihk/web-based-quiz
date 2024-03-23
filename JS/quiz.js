//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const rules_box = document.querySelector(".rules_box");
const exit_btn = rules_box.querySelector(".buttons .quit");
const continue_btn = rules_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const answers_list = document.querySelector(".answers_list");
const time_left = quiz_box.querySelector(".timer .timer_sec");

//if Start Quiz button clicked
start_btn.onclick = ()=>{
    rules_box.classList.add("showRules"); //shows the rules box
}

//if Exit button clicked
exit_btn.onclick = ()=>{
    rules_box.classList.remove("showRules"); //hides the rules box
}

//if Continue button clicked
continue_btn.onclick = ()=>{
    rules_box.classList.remove("showRules"); //hides the rules box
    quiz_box.classList.add("showQuiz"); //shows the quiz box
    showQuestions(0);
    quesCounter(1);
    startTimer(58);
}

//creating an array and passing the number, question, option, and answers

let questions = [
    {
        numb:1,
        question: "Who first added animations to film?",
        answer: "J.Stuart Blackton",
        options: [
            "J.Stuart Blackton",
            "Walt Disney",
            "Gustav Ucicky",
            "Edwin Porter",
        ]

    },
    {
        numb:2,
        question: "Who has won the most Oscars of all time?",
        answer: "Katharine Hepburn",
        options: [
            "Jack Nicholson", 
            "Katharine Hepburn",
            "Walter Brennan",
            "Meryl Streep",
        ]

    },
    {
        numb:3,
        question: "What is the world's first color movie ?",
        answer:  "A Visit to the Seaside",
        options: [
            "The Miracle",
            "The World, the Flesh and the Devil",
            "Little Lord Fauntleroy",
            "A Visit to the Seaside",
        ]

    },
    {
        numb:4,
        question:  "World's first movie?",
        answer: "The Story of the Kelly Gang",
        options: [
            "The Story of the Kelly Gang",
            "Roundhay Garden Scene ",
            "The Horse in Motion",
            "Pioneers",
        ]

    },
    {
        numb:5,
        question: "What is the first animated movie?",
        answer: "Fantasmagorie",
        options: [
            "Antz",
            "Tiny Toy",
            "Fantasmagorie",
            "Toy Story",
            
        ]

    },
    {
        numb:6,
        question: "What was the first Marvel film to win an Oscar?",
        answer: "Black Panther",
        options: [
            "Iron Man",
            "Black Panther",
            "The Avengers",
            "Captain America", 
        ]

    },
    {
        numb:7,
        question: "Which film has made the most money in history?",
        answer:  "Avatar",
        options: [
            "The Lion King",
            "Titanic",
            "Star Wars",
            "Avatar",
        ]

    },
    {
        numb:8,
        question:  "What is the most expensive movie ever made?",
        answer: "Pirates of the Caribbean",
        options: [
            "Pirates of the Caribbean",
            "Avatar",
            "Avengers",
            "Star Wars",
        ]

    },
    {
        numb:9,
        question: "How long were the early films?",
        answer: "A few minutes or less",
        options: [
            "Half an hour", 
            "A few minutes or less",
            "An hour",
            "None of the above",
        ]

    },
    {
        numb:10,
        question: "What is the world's first horror movie? ",
        answer: "The House of the Devil",
        options: [
            "The House of the Devil",
            "A Terrible Night",
            "The X-Ray Fiend",
            "The Bewitched Inn",
        ]

    },
]

let ques_count = 0;
let ques_numb =1;
let timeCounter;
let userScore = 0;
let timeLeft;

const next_btn = quiz_box.querySelector(".next_btn");
const results_box = document.querySelector(".results_box");
const restart_quiz = results_box.querySelector(".buttons .restart");

//getting questions and options from array
function showQuestions(index){
    const ques_text = document.querySelector(".ques_text");
    let que_tag = '<span>'+questions[index].numb + ". "+ questions[index].question +'</span>';
    let answer_tag = '<div class="option">'+ questions[index].options[0]+'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1]+'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2]+'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3]+'<span></span></div>';
    ques_text.innerHTML = que_tag;
    answers_list.innerHTML = answer_tag;
    const option = answers_list.querySelectorAll(".option");
    for (let i=0; i < option.length; i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

function optionSelected(answer){
    let userAns = answer.textContent;
    let correctAns = questions[ques_count].answer;
    let allAnswers = answers_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
    }else{
        answer.classList.add("incorrect");

        //if selected answer is incorrect shows the correct answer
        for (let i=0; i < allAnswers; i++){
           if(answers_list.children[i].textContent == correctAns){
                answers_list.children[i].setAttribute("class","option correct");
           }
        }
    }

    //once user selected disabling all options
    for (let i=0; i < allAnswers; i++){
        answers_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "Inline-block";
}


restart_quiz.onclick = ()=>{
    window.location.reload();
}

//if next button clicked 
next_btn.onclick = ()=>{
    if(ques_count < questions.length - 1){
        ques_count++;
        ques_numb++;
        showQuestions(ques_count);
        quesCounter(ques_numb);
        next_btn.style.display ="none";
    }else{
        showResultBox();
    }
}

function quesCounter(index){
    const ques_counter = quiz_box.querySelector(".ques_count");
    let quesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    ques_counter.innerHTML =  quesCountTag;
}

function startTimer(time){
    timeCounter = setInterval(timer,1000);
    function timer(){
        time_left.textContent = time;
        time--;
        timeLeft = time;
        if(time < 9){
            let addZero = time_left.textContent;
            time_left.textContent = "0"+ addZero;
        }
        if (time < 0){
            showResultBox();
        }
       
    }
}

function showResultBox(){
    quiz_box.classList.remove("showQuiz"); //hide the quiz box
    results_box.classList.add("showResults"); //shows the results box
    clearInterval(timeCounter);
    const scoreText = results_box.querySelector(".ques_info");
    let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> Correct.</span>';
    scoreText.innerHTML = scoreTag;
    const total_message = results_box.querySelector(".total_score");
    let totalTag = "<span>Score : <p>"+(userScore*10)+"</p></span>";
    total_message.innerHTML = totalTag;
    if(timeLeft>0){
        const completed_message = results_box.querySelector(".completed_message");
        let completedTag = "<span>You've completed the Quiz!</span>";
        completed_message.innerHTML = completedTag;
        const time_message = results_box.querySelector(".time_spent");
        let timeTag = "<span>You took : <p>"+(60-timeLeft)+" Seconds"+"</p></span>";
        time_message.innerHTML = timeTag;
    }else{
        const completed_message = results_box.querySelector(".completed_message");
        let completedTag = "<span>Time's up!</span>";
        completed_message.innerHTML = completedTag;
    }
    if(userScore > 7){
        const performance_message = results_box.querySelector(".performance");
        let performanceTag = "<span>Excellent, Keep it up.</span>";
       performance_message.innerHTML = performanceTag;
       results_box.style.background = "#9aeabc";
    }
    else if(userScore > 4){
        const performance_message = results_box.querySelector(".performance");
        let performanceTag = "<span>Well done, Keep going!</span>";
       performance_message.innerHTML = performanceTag;
       results_box.style.background = "#d9dd7f";
    } else {
        const performance_message = results_box.querySelector(".performance");
        let performanceTag = "<span>Don't give up, Try again!</span>";
        performance_message.innerHTML = performanceTag;
        results_box.style.background = "#ff9393";
    }
}



    

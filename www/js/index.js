(function() {
  var questions = [{
    question: "What is the package name of JSON?",
    choices: ["com.json","in.json","com.android.JSON","org.json"],
    correctAnswer: 3
  }, {
    question: "Mobile apps are a good choice for every company?",
    choices: ["True","False","always","never"],
    correctAnswer: 1
  }, {
    question: "What is a context in android?",
    choices: ["Intent","Content Provider","Broadcast receiver","None of the Above"],
    correctAnswer: 0
  }, {
    question: "On which thread services work in android?",
    choices: ["Worker Thread","Own Thread"," Main Thread","None of the above"],
    correctAnswer: 2
  }, {
    question: "How to store heavy structured data in android?",
    choices: ["Shared Preferences","Cursor","SQlite database","Not possible"],
    correctAnswer: 2
  }, {
    question: "What is singleton class in android?",
    choices: ["A class that can create only one object","Anonymous class","Java class","Manifest file"],
    correctAnswer: 0
  }, {
    question: "What is log message in android?",
    choices: ["Log message is used to debug a program","Same as printf()","Same as Toast()","None of the above"],
    correctAnswer: 0
  },{
    question: "When should you start considering mobile app development for your business?",
    choices: ["When your customers or employees ask for apps","When your mobile Web experience lacks features or offers a poor user experience","When competitors release their own mobile apps","Any of the above"],
    correctAnswer: 3
  },{
    question: "How many protection levels are available in the android permission tag?",
    choices: ["There are no permission tags available in android","Normal, kernel, application","Normal, dangerous, signature, and signatureOrsystem","None of the above"],
    correctAnswer: 2
  }, {
    question: "Can a class be immutable in android?",
    choices: ["No, it can't","Yes, Class can be immutable","Can't make the class as final class","None of the above"],
    correctAnswer: 1
  }, {
    question: "What is the size of long variable?",
    choices: ["8 bit","16 bit","32 bit","64 bit"],
    correctAnswer: 1
  },{
    question: "Which is used to parse an XML document in PHP?",
    choices: ["simplexml_load_string()","loadxml()","Both A and B","None of above"],
    correctAnswer: 2
  }, {
    question: "What kind of variables a class can consist of?",
    choices: ["class variables, instance variables","class variables, local variables, instance variables","class variables","class variables, local variables"],
    correctAnswer: 3
  }, {
    question: "What is the default value of byte variable?",
    choices: ["0","0.0","null","not defined"],
    correctAnswer: 0
  }, {
    question: "What is instance variable?",
    choices: ["Instance variables are static variables within a class but outside any method.","Instance variables are variables defined inside methods, constructors or blocks.","Instance variables are variables within a class but outside any method.","None of the above"],
    correctAnswer: 2
  }, {
    question: "What is JIT compiler?",
    choices: ["JIT improves the runtime performance of computer programs based on bytecode.","JIT is an application development framework","JIT is an implementation of the Java Virtual Machine which executes Java programs.","None of the above"],
    correctAnswer: 0
  }, {
    question: "What is function overriding?",
    choices: ["If a subclass uses a method that is already provided by its parent class, it is known as Method Overriding.","If a subclass provides a specific implementation of a method that is already provided by its parent class, it is known as Method Overriding.","Both of the above" , "None of the above"],
    correctAnswer: 1
  }, {
    question: "When static binding occurs?",
    choices: ["Static binding occurs during Compile time","Static binding occurs during load time","Static binding occurs during runtime","None of the above"],
    correctAnswer: 0
  }, {
    question: "What is Serialization?",
    choices: ["Serialization is the process of writing the state of an object to another object.","Serialization is the process of writing the state of an object to a byte stream.","Both of the above","None of the above"],
    correctAnswer: 1
  }, {
    question: "When finally block gets executed?",
    choices: ["Always when try block get executed, no matter exception occured or not.","Always when a method get executed, no matter exception occured or not.","Always when a try block get executed, if exception do not occur.","Only when exception occurs in try block code"],
    correctAnswer: 0
  }, {
    question: "Which of the following is true about String?",
    choices: ["String is mutable","String is immutable","String is a data type","None of the above"],
    correctAnswer: 1
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Result: ' + numCorrect + ' / ' +
                 questions.length);
    return score;
  }
})();
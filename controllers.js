var Controller = Controller || {};

Controller.start = function() {
    View.render( Database.questions );
};

Controller.submitAnswers = function () {
    View.disableSubmit();
    Scoring.submitAnswers(View.getAnswers());
    View.showScores(Scoring.getScores());
  
    
};



var Scoring = Scoring || {};

Scoring.scores = {};

Scoring.submitAnswers = function(answers) {
    Scoring.scores = {};
    if (answers === undefined) return;

    function addScoresForCategory(marks, num_questions) {
        return { marks: marks,
            num_questions: num_questions,
            percentage: 100 * marks / num_questions
        };
    }

    function getScoresForCategory(answers, name) {
        var marks = 0;
        var num_questions = Database.correct_answers[name].length;
        for (var i = 0; i < num_questions; i++) {
            var correct = Database.correct_answers[name][i];
            var attempt = answers[name][i];
            if ( correct === attempt )
                marks += 1;
        }
        Scoring.scores[name] = addScoresForCategory(marks, num_questions);
    }

    var category_names = Object.getOwnPropertyNames(Database.correct_answers);
    for (var c = 0; c < category_names.length; c++) {
        var name = category_names[c];
        getScoresForCategory(answers, name);
    }
};

Scoring.getScores = function(){
    return Scoring.scores;
};
Scoring.renderScores = function*(){

};
var View = View || {};

View.render = function( questions ) {
    View._state.reset();
    var names = Object.getOwnPropertyNames(questions);
    View._renderNavbar(names);
    View._renderTabs(names, questions);
};

View.disableSubmit = function() {
    var button = document.getElementById("submitbutton");
    button.disabled = true;
};

View.getAnswers = function() {
    var answers, nodes, name, questions,i, j;
    answers = {};
    nodes = document.getElementsByTagName("fieldset");
    n = 1;
    for (i = 0; i < nodes.length; i++) {
        name = nodes[i].id;
        answers[name] = [];
        questions = nodes[i].getElementsByTagName("h4");
        for (j = 0; j < questions.length; j++, n++) {
            answers[name][j] = View._getAnswer("Q" + n);
        }
    }
    return answers;
};

View.showScores = function(scores) {
    var names, i, name;
    console.log("View.showScores()");
    names = Object.getOwnPropertyNames(scores);
    for (i = 0; i < names.length; i++) {
        name = names[i];
        View._populateRow("summarytable",
            [name, scores[name].marks, scores[name].num_questions, scores[name].percentage + "%"]);
    }
};

View._state = {
    question_count: 1,
    navbar: true,
    tabs: true,
    reset: function() {
        this.question_count = 1;
        this.navbar = true;
        this.tabs = true;
    }
};

View._renderTabs = function(names, questions) {
    var i, name, tab, fields;
    var content = document.getElementById('content');
    for (i = 0; i < names.length; i++) {
        name = names[i];
        tab = View._appendTabTo(content, name);
        View._ifFirstMakeActive("tabs", tab);
        fields = View._appendFieldsetTo(tab, name);
        View._renderQuestions(fields, questions[name])
    }
};

View._ifFirstMakeActive = function(key, node) {
    if (View._state[key]) {
        node.className = node.className + ' active';
        View._state[key] = false;
    }
};

View._appendElement = function(parent, tagname) {
    var tag = document.createElement(tagname);
    parent.appendChild(tag);
    return tag;
};

View._renderQuestions = function(parent, questions) {
    for (var i = 0; i < questions.length; i++) {
        View._renderQuestionHeading(parent, (i+1) + '. ' + questions[i].q);
        View._renderChoices(parent, questions[i].choices);
        View._appendElement(parent, 'hr');
        View._state.question_count++;
    }
};

View._renderQuestionHeading = function(parent, text) {
    var heading = View._appendElement(parent, 'h4');
    heading.innerText = text;
};

View._renderChoices = function(parent, choices) {
    for (var j = 0; j < choices.length; j++) {
        View._renderAChoice(parent, choices[j]);
    }
};

View._renderAChoice = function(parent, choice) {
    var input, text;
    input = View._appendElement(parent, 'input');
    input.type = 'radio';
    input.name = 'Q' + View._state.question_count;
    input.value = choice;
    text = document.createTextNode(choice);
    parent.appendChild(text);
    View._appendElement(parent, 'br');
};

View._appendTabTo = function(parent, name) {
    var tab = document.createElement('div');
    tab.className = "tab-pane";
    tab.id = View._genTabName(name);
    parent.appendChild(tab);
    return tab;
};

View._appendFieldsetTo = function(parent, name) {
    var form, fieldset;
    form = document.createElement('form');
    parent.appendChild(form);
    fieldset = document.createElement('fieldset');
    form.appendChild(fieldset);
    fieldset.id = name;
    return fieldset;
};

View._renderNavbar = function(names) {
    var navbar, first, i, name, item;
    navbar = document.getElementById("navbar");
    first = true;
    for (i = 0; i < names.length; i++) {
        name = names[i];
        item = View._addNavbarItem(navbar, name);
        View._ifFirstMakeActive("navbar", item);
    }
};

View._addNavbarItem = function(navbar, name) {
    var item, link;
    item = document.createElement('li');
    navbar.appendChild(item);
    link = document.createElement('a');
    item.appendChild(link);
    link.href = '#' + View._genTabName(name);
    link.innerText = name;
    link.setAttribute('data-toggle','tab');
    return item;
};

View._genTabName = function(name) {
    return name + 'tab';
};



View._getAnswer = function(name) {
    var answers = document.getElementsByName(name);
    for (var i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
            return answers[i].value;
        }
    }
    return "";
};

View._insertRowOnTable = function(table_id, num_columns) {
    var table, row, cells, i;
    table = document.getElementById(table_id);
    row = table.insertRow(-1);
    cells = [];
    for (i = 0; i < num_columns; i++)
        cells[i] = row.insertCell(-1);
    return cells;
};

View._populateRow = function(table_id, data) {
    var cells = View._insertRowOnTable("summarytable", 4);
    for (var i = 0; i < data.length; i++)
        cells[i].innerHTML = data[i];
};


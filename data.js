var Database = Database || {};

Database.correct_answers = {
            math: ["130","40"],
            physics: ["8.10 m/s/s","a = 11.2 m/s/s and d = 79.8 m"],
            chemistry: ["protons and neutrons","molality"],
            technology: ["1880s","Field"]
        };

Database.questions = {
    math: [ {q:"60 + 70 = ?", choices:["130", "90","100","none"]},
            {q:"10 + 30 = ?", choices:["50", "20", "40", "none"]}],

    physics: [
        {q:"A car starts from rest and accelerates uniformly over a time of 5.21 seconds for a distance of 110 m. Determine the acceleration of the car.",
            choices:["9.10 m/s/s", "8.10 m/s/s", "10 m/s/s", "none"]},
        {q:"A race car accelerates uniformly from 18.5 m/s to 46.1 m/s in 2.47 seconds. Determine the acceleration of the car and the distance traveled",
            choices:["a = 11.2 m/s/s and d = 79.8 m", "a = 11.2 m/s/s and d = 90.8 m", "a = 20.2 m/s/s and d = 79.8 m", "none"]}],

    chemistry: [
        {q:"The nucleus of an atom consists of",
            choices:["electrons and neutrons", "electrons and protons", "protons and neutrons","none"]},
        {q:"The number of moles of solute present in 1 kg of a solvent is called its",
            choices:["molality","molarity","normality","none"]}],

    technology: [
        {q:"In which decade was the American Institute of Electrical Engineers (AIEE) founded?",
            choices:["1850s", "1880s", "1930s", "none"]},
        {q:"What is part of a database that holds only one type of information?",
            choices:["Report", "Field", "Record", "none"]}]
};

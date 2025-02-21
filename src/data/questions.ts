import { Question } from '../types';
import { shuffleArray } from '../utils/helpers';

// Create 4 different sets of questions
export const questionSets: { [key: number]: Question[] } = {
  1: [
    {
      question: "A and B can complete a task in 16 days, while A alone can complete it in 24 days. How long will B alone take?",
      options: ["32 days", "36 days", "48 days", "42 days"],
      correct: 2
    },
    {
      question: "A box contains 5 red, 7 green, and 8 blue balls. If one ball is drawn randomly, what is the probability that it is either red or green?",
      options: ["5/20", "7/20", "12/20", "8/15"],
      correct: 2
    },
    {
      question: "A car travels 360 km in 6 hours. If its speed is increased by 20%, how much time will it take to cover the same distance?",
      options: ["5 hours", "4.5 hours", "5.5 hours", "6 hours"],
      correct: 0
    },
    {
      question: "What will be the value of x after execution of: int x = 5; x = x++ + ++x;",
      options: ["11", "12", "10", "13"],
      correct: 1
    },
    {
      question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
      options: ["0°", "7.5°", "15°", "30°"],
      correct: 1
    },
    {
      question: "Which of the following is NOT a programming language?",
      options: ["Python", "Java", "HTML", "C++"],
      correct: 2
    },
    {
      question: "If all cats are animals and some are pets, which statement is true?",
      options: ["All pets are cats", "Some cats are pets", "All animals are pets", "Some pets are animals"],
      correct: 3
    },
    {
      question: "Which is NOT a valid way to initialize an array in C?",
      options: ["int arr[] = {1, 2, 3}", "int arr[3] = {1, 2}", "int arr[2] = {1, 2, 3}", "int arr[3] = {0}"],
      correct: 2
    },
    {
      question: "What does this C code print: for (int i = 1; i <= 3; i++) { printf('%d ', i); }",
      options: ["1 2 3", "1 2", "3 2 1", "1 1 1"],
      correct: 0
    },
    {
      question: "Find the missing number in the series: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "46"],
      correct: 1
    }
  ],

 
  2: [
    {
      question: "A jar contains 5 red, 6 blue, and 7 green balls. Two balls are drawn at random. What is the probability that at least one of them is red?",
      options: ["15/33", "18/33", "20/33", "25/33"],
      correct: 1
    },
    {
      question: "A and B can complete a task in 20 days and 30 days, respectively. They work together for 10 days, and then A leaves. How many more days will B take to finish the remaining work?",
      options: ["10 days", "12 days", "15 days", "20 days"],
      correct: 1
    },
    {
      question: "The sum of three consecutive numbers is 69. What are the numbers?",
      options: ["22, 23, 24", "23, 24, 25", "24, 25, 26", "25, 26, 27"],
      correct: 1
    },
    {
      question: "How many distinct 6-letter words can be formed using the letters of the word 'SCHOOL,' if the letter 'O' is used at least once?",
      options: ["360", "432", "540", "720"],
      correct: 1
    },
    {
      question: "Find the smallest number that leaves a remainder of 3 when divided by 5, 6, and 7, but leaves a remainder of 2 when divided by 8.",
      options: ["53", "83", "163", "243"],
      correct: 0
    },
    {
      question: "The ratio of the ages of two persons is 4:5. After 5 years, the ratio will be 5:6. What are their current ages?",
      options: ["20 and 25", "24 and 30", "28 and 35", "32 and 40"],
      correct: 1
    },
    {
      question: "What will be the output of: int a = 10, *ptr; ptr = &a; printf('%d', *ptr);",
      options: ["10", "0", "Random Value", "Error"],
      correct: 0
    },
    {
      question: "Which of the following is the time complexity of the merge sort algorithm?",
      options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
      correct: 1
    },
    {
      question: "What will be the output of: int a = 5, b = 3; printf('%d', a & b);",
      options: ["1", "5", "0", "3"],
      correct: 0
    },
    {
      question: "What is responsive web design?",
      options: ["Fast loading websites", "Websites that adapt to different screen sizes", "Interactive websites", "Animated websites"],
      correct: 1
    }
  ],

  3: [
    {
      question: "The average of 5 numbers is 20. If two numbers are removed, the average of the remaining becomes 18. What is the average of the removed numbers?",
      options: ["22", "34", "23", "46"],
      correct: 2
    },
    {
      question: "A father is 3 times as old as his son. In 10 years, he will be twice as old. What is the son's current age?",
      options: ["8", "10", "12", "4"],
      correct: 1
    },
    {
      question: "What will be the output of: char ch = 'A' + 2; printf('%c', ch);",
      options: ["A", "B", "C", "D"],
      correct: 2
    },
    {
      question: "The ratio of boys to girls in a class is 4:3. If there are 35 students, how many are girls?",
      options: ["20", "15", "10", "27"],
      correct: 1
    },
    {
      question: "If 3 workers can build a wall in 12 days, how long will it take 6 workers to build the same wall?",
      options: ["3 days", "6 days", "12 days", "24 days"],
      correct: 1
    },
    {
      question: "If 5 workers can complete a task in 10 days, how many workers are needed to complete the same task in 5 days?",
      options: ["5", "10", "15", "20"],
      correct: 1
    },
    {
      question: "Which of the following is a non-volatile memory type?",
      options: ["RAM", "ROM", "Cache", "Register"],
      correct: 1
    },
    {
      question: "What will be the output of switch(2) with cases 1,2,3 (no break after case 2)?",
      options: ["One", "TwoThree", "TwoDefault", "Three"],
      correct: 1
    },
    {
      question: "What is the output of: int a[3] = {10, 20, 30}; printf('%d', a[1]);",
      options: ["10", "20", "30", "Undefined"],
      correct: 1
    },
    {
      question: "If 'PENCIL' is coded as 'RGPENK,' how is 'ERASER' coded?",
      options: ["GTCTGP", "GTETGP", "GTBTHP", "GTDUGQ"],
      correct: 1
    }
  ],


 4: [
  {
    question: "At what time between 3 and 4 o'clock will the hour and minute hands overlap?",
    options: ["3:15", "3:16", "3:17", "3:18"],
    correct: 1
  },
  {
    question: "Rahul walks 10m north, turns left, walks 5m, then turns right and walks 10m. In which direction is he facing now?",
    options: ["North", "East", "South", "West"],
    correct: 0
  },
  {
    question: "Identify the missing element in the pattern: [2,4,6], [8,10,12], [14,?,18]",
    options: ["15", "16", "17", "20"], 
    correct: 1
  },
  {
    question: "What is the output: int a = 0; if(a = 5) printf('True'); else printf('False');",
    options: ["True", "False", "Nothing prints", "Compiler error"],
    correct: 0
  },
  {
    question: "What will print: int a=10,b=5,c=8; if(a>b) if(a>c) printf('A greatest'); else printf('C greatest'); else printf('B greatest');",
    options: ["A is greatest", "C is greatest", "B is greatest", "Nothing prints"],
    correct: 0
  },
  {
    question: "What's the syntax error: int score=85; if(score>=60) printf('Pass') else printf('Fail');",
    options: ["Missing parentheses", "Missing semicolon", "Incorrect else", "No error"],
    correct: 1
  },
  {
    question: "Pipe A fills a tank in 8 hours, B empties it in 12 hours. If both opened together, how long to fill?",
    options: ["16 hours", "24 hours", "18 hours", "20 hours"],
    correct: 1
  },
  {
    question: "If A is sister of B, B is daughter of C, C is wife of D, and D is brother of E, how is E related to A?",
    options: ["Uncle", "Grandfather", "Nephew", "Cousin"],
    correct: 0
  },
  {
    question: "Which of the following is similar to Nepal, Bhutan, Myanmar?",
    options: ["Pakistan", "Thailand", "Malaysia", "Indonesia"],
    correct: 0
  },
  {
    question: "A, B, C complete task in 10,12,15 days. Work 2 days together, C leaves. How long for A,B to finish?",
    options: ["2 days", "3 days", "4 days", "5 days"],
    correct: 1
  }
]
};

export const getQuestionsForMember = (memberNumber: number): Question[] => {
  const memberQuestions = questionSets[memberNumber];
  if (!memberQuestions) {
    throw new Error(`No questions found for member ${memberNumber}`);
  }

  // First make a deep copy and shuffle options for each question
  const questionsWithShuffledOptions = memberQuestions.map(q => {
    const correctAnswer = q.options[q.correct]; // Store the correct answer
    const shuffledOptions = shuffleArray([...q.options]); // Shuffle options
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswer); // Find new position of correct answer
    
    return {
      ...q,
      options: shuffledOptions,
      correct: newCorrectIndex // Update correct answer index
    };
  });
  
  // Then shuffle the questions themselves
  return shuffleArray(questionsWithShuffledOptions);
}; 
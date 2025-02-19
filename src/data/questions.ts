import { Question } from '../types';
import { shuffleArray } from '../utils/helpers';

// Create 4 different sets of questions
export const questionSets: { [key: number]: Question[] } = {
  1: [
    // Frontend Development Set
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
      correct: 0
    },
    {
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Color Style Sheets"],
      correct: 1
    },
    {
      question: "Which CSS property is used to change the text color?",
      options: ["text-color", "color", "font-color", "text-style"],
      correct: 1
    },
    {
      question: "What is the correct HTML element for the largest heading?",
      options: ["<heading>", "<h6>", "<head>", "<h1>"],
      correct: 3
    },
    {
      question: "What is the purpose of the alt attribute in HTML images?",
      options: ["Alternative text for screen readers", "Image alignment", "Image border", "Image size"],
      correct: 0
    },
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correct: 1
    },
    {
      question: "What is the box model in CSS?",
      options: ["A 3D design tool", "Content, padding, border, and margin", "A JavaScript framework", "A type of layout"],
      correct: 1
    },
    {
      question: "Which property is used to change the font of an element?",
      options: ["font-style", "text-font", "font-family", "text-style"],
      correct: 2
    },
    {
      question: "What does the z-index property do in CSS?",
      options: ["Changes zoom level", "Controls stacking order", "Adjusts opacity", "Sets element width"],
      correct: 1
    },
    {
      question: "What is responsive web design?",
      options: ["Fast loading websites", "Websites that adapt to different screen sizes", "Interactive websites", "Animated websites"],
      correct: 1
    }
  ],
  2: [
    // JavaScript Set
    {
      question: "What is JavaScript primarily used for?",
      options: ["Database management", "Server configuration", "Client-side scripting", "Network security"],
      correct: 2
    },
    {
      question: "What is the difference between let and var?",
      options: ["No difference", "Block scope vs function scope", "Speed of execution", "Memory usage"],
      correct: 1
    },
    {
      question: "What is a closure in JavaScript?",
      options: ["A way to end functions", "A function with access to its outer scope", "A type of loop", "An error handling method"],
      correct: 1
    },
    {
      question: "What is the purpose of the 'this' keyword?",
      options: ["References the current function", "References the current object", "References the parent element", "References the window object"],
      correct: 1
    },
    {
      question: "What is event bubbling?",
      options: ["Event propagation from child to parent", "Creating multiple events", "Stopping events", "Event animation"],
      correct: 0
    },
    {
      question: "What is a Promise in JavaScript?",
      options: ["A guarantee of code quality", "A way to handle asynchronous operations", "A type of function", "A debugging tool"],
      correct: 1
    },
    {
      question: "What is the purpose of async/await?",
      options: ["Make code run faster", "Handle promises more elegantly", "Create animations", "Manage memory"],
      correct: 1
    },
    {
      question: "What is the DOM?",
      options: ["Document Object Model", "Data Object Model", "Document Oriented Memory", "Digital Object Method"],
      correct: 0
    },
    {
      question: "What is JSON?",
      options: ["JavaScript Object Notation", "Java Script Online", "JavaScript Operation Node", "Java Source Object Network"],
      correct: 0
    },
    {
      question: "What is the purpose of localStorage?",
      options: ["Store data in browser", "Increase loading speed", "Manage server data", "Handle authentication"],
      correct: 0
    }
  ],
  3: [
    // Backend Development Set
    {
      question: "What is Node.js?",
      options: ["A web browser", "A database", "A JavaScript runtime environment", "A web framework"],
      correct: 2
    },
    {
      question: "What is Express.js?",
      options: ["A database", "A Node.js web framework", "A programming language", "A testing tool"],
      correct: 1
    },
    {
      question: "What is middleware in web development?",
      options: ["Database software", "Code that runs between request and response", "Frontend framework", "Testing tool"],
      correct: 1
    },
    {
      question: "What is the purpose of SQL?",
      options: ["Frontend styling", "Database management", "Server hosting", "Code compilation"],
      correct: 1
    },
    {
      question: "What is REST in API development?",
      options: ["A programming language", "An architectural style for APIs", "A database type", "A testing framework"],
      correct: 1
    },
    {
      question: "What is MongoDB?",
      options: ["NoSQL database", "SQL database", "Programming language", "Web server"],
      correct: 0
    },
    {
      question: "What is the purpose of JWT?",
      options: ["Database queries", "User authentication", "Server deployment", "Code compilation"],
      correct: 1
    },
    {
      question: "What is an ORM?",
      options: ["Object-Relational Mapping", "Online Resource Management", "Operating Room Monitor", "Output Response Method"],
      correct: 0
    },
    {
      question: "What is the role of a web server?",
      options: ["Store data", "Handle HTTP requests", "Write code", "Design websites"],
      correct: 1
    },
    {
      question: "What is caching in backend development?",
      options: ["Storing frequently accessed data", "Writing code", "Testing applications", "Managing databases"],
      correct: 0
    }
  ],
  4: [
    // DevOps and Tools Set
    {
      question: "What is Docker?",
      options: ["Container platform", "Programming language", "Database system", "Web server"],
      correct: 0
    },
    {
      question: "What is Git used for?",
      options: ["Database management", "Version control", "Server hosting", "Web development"],
      correct: 1
    },
    {
      question: "What is CI/CD?",
      options: ["Code Integration/Code Deployment", "Continuous Integration/Continuous Deployment", "Computer Interface/Computer Development", "Code Implementation/Code Design"],
      correct: 1
    },
    {
      question: "What is Kubernetes?",
      options: ["Container orchestration platform", "Programming language", "Database system", "Web framework"],
      correct: 0
    },
    {
      question: "What is AWS?",
      options: ["Web framework", "Cloud service provider", "Programming language", "Database system"],
      correct: 1
    },
    {
      question: "What is Jenkins?",
      options: ["Database", "Automation server", "Programming language", "Web framework"],
      correct: 1
    },
    {
      question: "What is the purpose of monitoring in DevOps?",
      options: ["Track system performance", "Write code", "Design websites", "Manage databases"],
      correct: 0
    },
    {
      question: "What is Infrastructure as Code (IaC)?",
      options: ["Writing backend code", "Managing infrastructure through code", "Frontend development", "Database design"],
      correct: 1
    },
    {
      question: "What is the purpose of load balancing?",
      options: ["Distribute network traffic", "Write code", "Store data", "Test applications"],
      correct: 0
    },
    {
      question: "What is the role of configuration management?",
      options: ["Write code", "Manage system configurations", "Design websites", "Test applications"],
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
export type Topic = {
  id: string;
  title: string;
  notes: string;
  practiceQuestions: string[];
};

export type CourseData = {
  title: string;
  description: string;
  topics: Topic[];
  youtubeSuggestions: {
    title: string;
    url: string;
  }[];
};

export const pythonCourseData: CourseData = {
  title: 'Python',
  description: 'Master Python for Data Science, Web Development, and AI.',
  topics: [
    {
      id: 'home',
      title: 'Python HOME',
      notes: `<p>Python is a popular programming language. It was created by Guido van Rossum, and released in 1991.</p>
              <p>It is used for:</p>
              <ul>
                <li>web development (server-side),</li>
                <li>software development,</li>
                <li>mathematics,</li>
                <li>system scripting.</li>
              </ul>`,
      practiceQuestions: [],
    },
    {
      id: 'intro',
      title: 'Python Intro',
      notes: `<p>Python is a high-level, interpreted, interactive and object-oriented scripting language. Python is designed to be highly readable. It uses English keywords frequently where as other languages use punctuation, and it has fewer syntactical constructions than other languages.</p>`,
      practiceQuestions: ['What does it mean for Python to be an "interpreted" language?', 'List two reasons why Python is considered beginner-friendly.'],
    },
    {
      id: 'get-started',
      title: 'Python Get Started',
      notes: `<p>To start using Python, you need a Python interpreter. You can download it from python.org. Once installed, you can write Python code in any text editor and run it from the command line using <code>python your_script_name.py</code>.</p>`,
      practiceQuestions: ['How do you run a Python script from the terminal?'],
    },
    {
      id: 'syntax',
      title: 'Python Syntax',
      notes: `<p>Python syntax can be executed by writing directly in the Command Line. Or by creating a python file on the server, using the .py file extension, and running it in the Command Line.</p>
              <p>The indentation in Python is very important. Python uses indentation to indicate a block of code.</p>
              <pre><code class="language-python">if 5 > 2:\n  print("Five is greater than two!")</code></pre>`,
      practiceQuestions: ['Why is indentation important in Python?', 'Correct the syntax error: `if 5 > 2: print("Hello")`'],
    },
    {
      id: 'variables',
      title: 'Python Variables',
      notes: `<p>Variables are containers for storing data values. In Python, you don't need to declare variables before using them.</p>
              <pre><code class="language-python">x = 5\ny = "John"\nprint(x)\nprint(y)</code></pre>`,
      practiceQuestions: ['Create a variable named `carName` and assign the value `Volvo` to it.', 'What is the difference between `x = 5` and `x == 5`?'],
    },
    {
        id: 'data-types',
        title: 'Python Data Types',
        notes: `<p>Variables can store data of different types, and different types can do different things. Python has the following data types built-in by default:</p>
                <ul>
                    <li>Text Type: <code>str</code></li>
                    <li>Numeric Types: <code>int</code>, <code>float</code>, <code>complex</code></li>
                    <li>Sequence Types: <code>list</code>, <code>tuple</code>, <code>range</code></li>
                    <li>Mapping Type: <code>dict</code></li>
                    <li>Set Types: <code>set</code>, <code>frozenset</code></li>
                    <li>Boolean Type: <code>bool</code></li>
                    <li>Binary Types: <code>bytes</code>, <code>bytearray</code>, <code>memoryview</code></li>
                </ul>`,
        practiceQuestions: ['What is the data type of `x = ["apple", "banana"]`?', 'How can you find the data type of a variable?']
    }
  ],
  youtubeSuggestions: [
    {
        "title": "Introduction to Python | Python for Beginners #1",
        "url": "https://www.youtube.com/watch?v=hEgO047GxaQ"
    },
    {
        "title": "Variables and Data Types | Python for Beginners #2",
        "url": "https://www.youtube.com/watch?v=F6v7koW2c8g"
    },
    {
        "title": "Operators in Python | Python for Beginners #3",
        "url": "https://www.youtube.com/watch?v=v5_A3T_340o"
    },
    {
        "title": "Type Casting in Python | Python for Beginners #4",
        "url": "https://www.youtube.com/watch?v=sS6g-pzmh8Y"
    },
    {
        "title": "User Input in Python | Python for Beginners #5",
        "url": "https://www.youtube.com/watch?v=gM1sAeS1A9Y"
    },
    {
        "title": "Conditional Statements in Python | Python for Beginners #6",
        "url": "https://www.youtube.com/watch?v=f2y2a9cK1s0"
    }
  ]
};

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

export const javaCourseData: CourseData = {
  title: 'JAVA',
  description: 'Build robust, enterprise-level applications with Java.',
  topics: [
    {
      id: 'home',
      title: 'Java HOME',
      notes: `<p>Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.</p>
              <p>It is a general-purpose programming language intended to let application developers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.</p>`,
      practiceQuestions: [],
    },
    {
      id: 'intro',
      title: 'Java Intro',
      notes: `<p>Java applications are typically compiled to bytecode that can run on any Java virtual machine (JVM) regardless of the underlying computer architecture. The syntax of Java is similar to C and C++, but has fewer low-level facilities than either of them.</p>`,
      practiceQuestions: ['What does "Write Once, Run Anywhere" (WORA) mean?', 'What is the JVM?'],
    },
    {
        id: 'variables',
        title: 'Java Variables',
        notes: `<p>Variables are containers for storing data values. In Java, there are different types of variables, for example:</p>
                <ul>
                    <li><code>String</code> - stores text, such as "Hello". String values are surrounded by double quotes</li>
                    <li><code>int</code> - stores integers (whole numbers), without decimals, such as 123 or -123</li>
                    <li><code>float</code> - stores floating point numbers, with decimals, such as 19.99 or -19.99</li>
                    <li><code>char</code> - stores single characters, such as 'a' or 'B'. Char values are surrounded by single quotes</li>
                    <li><code>boolean</code> - stores values with two states: true or false</li>
                </ul>
                <pre><code class="language-java">String name = "John";\nint myNum = 15;\nSystem.out.println(name + " is " + myNum);</code></pre>`,
        practiceQuestions: ['Declare an integer variable and assign it the value 10.', 'What is the difference between `int` and `float`?']
    },
  ],
  youtubeSuggestions: [
    {
        "title": "Java Tutorial for Beginners",
        "url": "https://www.youtube.com/watch?v=eIrMbAQSU34"
    },
    {
        "title": "Java Full Course for free ☕",
        "url": "https://www.youtube.com/watch?v=A74TOX803D0"
    },
  ]
};

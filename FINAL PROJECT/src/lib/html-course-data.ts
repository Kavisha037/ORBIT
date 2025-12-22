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

export const htmlCourseData: CourseData = {
  title: 'HTML',
  description: 'Master HTML, the backbone of every website.',
  topics: [
    {
      id: 'home',
      title: 'HTML HOME',
      notes: `<p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.</p>
              <p>It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.</p>`,
      practiceQuestions: [],
    },
    {
      id: 'intro',
      title: 'HTML Intro',
      notes: `<p>HTML describes the structure of a Web page. HTML consists of a series of elements. HTML elements tell the browser how to display the content.</p>`,
      practiceQuestions: ['What does HTML stand for?', 'What is the basic structure of an HTML document?'],
    },
    {
        id: 'elements',
        title: 'HTML Elements',
        notes: `<p>An HTML element is defined by a start tag, some content, and an end tag.</p>
                <pre><code class="language-html">&lt;tagname&gt;Content goes here...&lt;/tagname&gt;</code></pre>
                <p>The HTML element is everything from the start tag to the end tag. Some HTML elements have no content (like the &lt;br&gt; element). These elements are called empty elements. Empty elements do not have an end tag!</p>`,
        practiceQuestions: ['What is an HTML element?', 'Give an example of an empty element.']
    },
  ],
  youtubeSuggestions: [
    {
        "title": "HTML Full Course - Build a Website Tutorial",
        "url": "https://www.youtube.com/watch?v=pQN-pnXPa-w"
    },
    {
        "title": "HTML & CSS Full Course for free 🌎",
        "url": "https://www.youtube.com/watch?v=G3e-cpL7ofc"
    },
  ]
};

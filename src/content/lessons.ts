export type Question = {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};
export type Lesson = {
  id: string;
  kind: "grammar" | "sounds";
  title: string;
  subtitle: string;
  level: string;
  minutes: number;
  sections: { title: string; body: string; example?: string; ru?: string }[];
  questions: Question[];
};
export const lessons: Lesson[] = [
  {
    id: "ipa",
    kind: "sounds",
    title: "Транскрипция без страха",
    subtitle: "Буквы пишем. Звуки произносим.",
    level: "A1",
    minutes: 4,
    sections: [
      {
        title: "IPA — международный фонетический алфавит",
        body: "Символы между / / показывают звуки, а не буквы. Слово receipt пишется с p, но произносится /rɪˈsiːt/: p не звучит.",
        example: "receipt",
        ru: "чек",
      },
      {
        title: "Ударение и долгота",
        body: "ˈ стоит ПЕРЕД ударным слогом: /rɪˈpiːt/. ː означает долгий гласный. /iː/ в sheep длиннее и отличается по качеству от /ɪ/ в ship.",
        example: "Please repeat.",
        ru: "Пожалуйста, повторите.",
      },
      {
        title: "Как читать русские подсказки",
        body: "Заглавные буквы показывают ударение, удвоенные гласные — приблизительную долготу. Звёздочка напоминает: русского аналога звука нет. Озвучка использует британский английский; голос зависит от устройства.",
      },
    ],
    questions: [
      {
        prompt: "Что означает ˈ в /rɪˈpiːt/?",
        options: ["Ударение на следующий слог", "Пауза", "Немой звук"],
        answer: 0,
        explanation: "Знак стоит перед ударным слогом /piːt/.",
      },
      {
        prompt: "Что показывает ː?",
        options: ["Два слова", "Долгий гласный", "Ударение"],
        answer: 1,
        explanation: "/iː/ — долгий гласный, например в please.",
      },
      {
        prompt: "Произносится ли p в receipt?",
        options: ["Да", "Только быстро", "Нет"],
        answer: 2,
        explanation: "IPA /rɪˈsiːt/ не содержит /p/.",
      },
    ],
  },
  {
    id: "th",
    kind: "sounds",
    title: "Два звука th: /θ/ и /ð/",
    subtitle: "Think и this звучат по-разному.",
    level: "A1",
    minutes: 4,
    sections: [
      {
        title: "/θ/ — без голоса",
        body: "Слегка помести кончик языка между зубами и выдохни. Не прижимай язык сильно. Это не русское с и не т. Подсказка «С*» лишь напоминает о звуке.",
        example: "think, thank you, three",
        ru: "думать, спасибо, три",
      },
      {
        title: "/ð/ — с голосом",
        body: "Положение языка то же, но теперь включи голос. Положи пальцы на горло: почувствуешь вибрацию. Русское з тоже только приблизительная подсказка.",
        example: "this, that, although",
        ru: "это, то, хотя",
      },
    ],
    questions: [
      {
        prompt: "Какой звук в think?",
        options: ["/ð/", "/θ/", "/t/"],
        answer: 1,
        explanation: "Think начинается с глухого /θ/.",
      },
      {
        prompt: "В каком слове th звучит с голосом?",
        options: ["three", "thank", "this"],
        answer: 2,
        explanation: "This начинается со звонкого /ð/.",
      },
      {
        prompt: "Русское с точно передаёт /θ/?",
        options: [
          "Нет, это лишь подсказка",
          "Да, всегда",
          "Только в конце слова",
        ],
        answer: 0,
        explanation: "Для /θ/ кончик языка слегка находится между зубами.",
      },
    ],
  },
  {
    id: "vowels",
    kind: "sounds",
    title: "/æ/, /ɪ/ и /iː/",
    subtitle: "Cat, ship и sheep.",
    level: "A1",
    minutes: 4,
    sections: [
      {
        title: "/æ/ — открытый гласный",
        body: "В cat открой рот шире, чем для русского э. Язык впереди и низко. Русская подсказка «Э» не передаёт звук точно.",
        example: "cat, flat, thank",
        ru: "кот, квартира, благодарить",
      },
      {
        title: "Ship /ʃɪp/ и sheep /ʃiːp/",
        body: "/ɪ/ короткий и более расслабленный. /iː/ долгий, язык выше и впереди. Разница не только в длительности: меняется и качество звука.",
        example: "ship, sheep, please",
        ru: "корабль, овца, пожалуйста",
      },
    ],
    questions: [
      {
        prompt: "Какой гласный в cat?",
        options: ["/e/", "/ɑː/", "/æ/"],
        answer: 2,
        explanation: "Cat — /kæt/, с открытым /æ/.",
      },
      {
        prompt: "Где долгий /iː/?",
        options: ["ship", "sheep", "sit"],
        answer: 1,
        explanation: "Sheep — /ʃiːp/.",
      },
      {
        prompt: "Ship и sheep отличаются…",
        options: [
          "Только написанием",
          "Длительностью и качеством гласного",
          "Согласным в конце",
        ],
        answer: 1,
        explanation: "/ɪ/ и /iː/ — разные гласные.",
      },
    ],
  },
  {
    id: "w-ng",
    kind: "sounds",
    title: "/w/, /ŋ/ и слабое /ə/",
    subtitle: "Три звука для живой речи.",
    level: "A1",
    minutes: 5,
    sections: [
      {
        title: "/w/ — округли губы",
        body: "Начни с округлённых губ и быстро перейди к следующему гласному. Не касайся нижней губы зубами: так получается /v/.",
        example: "water, where, work",
        ru: "вода, где, работать",
      },
      {
        title: "/ŋ/ — носовой звук",
        body: "Задняя часть языка поднята, воздух идёт через нос. В sing /sɪŋ/ нет отдельного /g/ в конце. Подсказка «нг*» обозначает ОДИН звук.",
        example: "sing, meeting",
        ru: "петь, встреча",
      },
      {
        title: "/ə/ — шва",
        body: "Короткий расслабленный звук в безударных слогах. В about /əˈbaʊt/ первый гласный слабый; ударение падает на второй слог.",
        example: "about, a cup of tea",
        ru: "о / примерно; чашка чая",
      },
    ],
    questions: [
      {
        prompt: "Как произнести /w/?",
        options: [
          "Прижать губу к зубам",
          "Округлить губы и перейти к гласному",
          "Произнести русское в",
        ],
        answer: 1,
        explanation: "Для /w/ зубы не касаются нижней губы.",
      },
      {
        prompt: "В sing /sɪŋ/ есть отдельный /g/?",
        options: ["Нет", "Да", "Всегда два /g/"],
        answer: 0,
        explanation: "/ŋ/ — один носовой звук.",
      },
      {
        prompt: "/ə/ обычно встречается…",
        options: [
          "Только под ударением",
          "Только в конце фразы",
          "В безударных слогах",
        ],
        answer: 2,
        explanation: "Шва — короткий нейтральный безударный гласный.",
      },
    ],
  },
  {
    id: "be",
    kind: "grammar",
    title: "To be: кто ты и где ты",
    subtitle: "I am. You are. She is.",
    level: "A1",
    minutes: 4,
    sections: [
      {
        title: "В английском нужен глагол",
        body: "По-русски: «Я аналитик». По-английски: «I am an analyst». Am/is/are связывают человека с профессией, состоянием или местом. I → am; he/she/it → is; you/we/they → are.",
        example: "I am an analyst. She is at home.",
        ru: "Я аналитик. Она дома.",
      },
      {
        title: "Вопрос и отрицание",
        body: "В вопросе поставь am/is/are перед человеком. В отрицании добавь not после глагола. Do здесь не нужен.",
        example: "Are you ready? I am not tired.",
        ru: "Ты готов? Я не устал.",
      },
    ],
    questions: [
      {
        prompt: "I ___ an analyst.",
        options: ["is", "am", "are"],
        answer: 1,
        explanation: "С I используем am.",
      },
      {
        prompt: "Выбери вопрос: «Ты готов?»",
        options: ["Do you are ready?", "You ready?", "Are you ready?"],
        answer: 2,
        explanation: "Are ставим перед you.",
      },
      {
        prompt: "She ___ at home.",
        options: ["is", "am", "are"],
        answer: 0,
        explanation: "С she используем is.",
      },
    ],
  },
  {
    id: "simple",
    kind: "grammar",
    title: "Present Simple: обычно",
    subtitle: "Привычки, факты и регулярные действия.",
    level: "A1",
    minutes: 5,
    sections: [
      {
        title: "То, что происходит регулярно",
        body: "I work — я работаю. He works — он работает: для he/she/it добавляем -s (иногда -es). Это не обязательно действие прямо сейчас.",
        example: "I work with data. She works in a bank.",
        ru: "Я работаю с данными. Она работает в банке.",
      },
      {
        title: "Do и does помогают спросить",
        body: "Do для I/you/we/they, does для he/she/it. После does глагол без -s. Для отрицания: do not / does not (don’t / doesn’t).",
        example: "Does she work here? I do not agree.",
        ru: "Она здесь работает? Я не согласен.",
      },
    ],
    questions: [
      {
        prompt: "She ___ English every day.",
        options: ["study", "studies", "studying"],
        answer: 1,
        explanation: "С she: studies (y после согласной меняется на -ies).",
      },
      {
        prompt: "___ you work with SQL?",
        options: ["Are", "Does", "Do"],
        answer: 2,
        explanation: "Для вопроса с work и you нужен do.",
      },
      {
        prompt: "Does he ___ here?",
        options: ["work", "works", "working"],
        answer: 0,
        explanation:
          "Does уже несёт показатель третьего лица, поэтому work без -s.",
      },
    ],
  },
  {
    id: "continuous",
    kind: "grammar",
    title: "Present Continuous: сейчас",
    subtitle: "Am / is / are + глагол с -ing.",
    level: "A1",
    minutes: 4,
    sections: [
      {
        title: "Действие в процессе",
        body: "Если действие происходит сейчас или в текущий период, часто нужен Present Continuous: am/is/are + -ing. Для привычки выбираем Present Simple.",
        example: "I am learning English now. I study every day.",
        ru: "Я сейчас учу английский. Я занимаюсь каждый день.",
      },
      {
        title: "Не каждый глагол любит -ing",
        body: "Know, want, understand обычно используют в простой форме, когда описывают состояние. «I understand», а не «I am understanding».",
        example: "I want a coffee.",
        ru: "Я хочу кофе.",
      },
    ],
    questions: [
      {
        prompt: "Look! She ___ a book.",
        options: ["reads", "is reading", "read"],
        answer: 1,
        explanation: "Look указывает на действие сейчас: is reading.",
      },
      {
        prompt: "I ___ the answer.",
        options: ["am knowing", "knows", "know"],
        answer: 2,
        explanation: "Know в этом значении описывает состояние.",
      },
      {
        prompt: "We ___ working now.",
        options: ["are", "is", "do"],
        answer: 0,
        explanation: "Для we: are + working.",
      },
    ],
  },
  {
    id: "past",
    kind: "grammar",
    title: "Past Simple: что случилось",
    subtitle: "Вчера, в прошлом году, пять минут назад.",
    level: "A1",
    minutes: 5,
    sections: [
      {
        title: "Законченное прошлое",
        body: "Регулярные глаголы получают -ed: work → worked. Неправильные имеют особую форму: go → went, buy → bought. Формы нужно учить в контексте.",
        example: "I worked yesterday. I went home.",
        ru: "Я работал вчера. Я пошёл домой.",
      },
      {
        title: "Did + начальная форма",
        body: "В вопросе и отрицании используем did / did not и начальную форму: go, не went. У to be свои формы: was/were; вопрос Was he…? без did.",
        example: "Did you buy a ticket? I did not go.",
        ru: "Ты купил билет? Я не пошёл.",
      },
    ],
    questions: [
      {
        prompt: "Yesterday I ___ home early.",
        options: ["go", "went", "going"],
        answer: 1,
        explanation: "Go → went в Past Simple.",
      },
      {
        prompt: "Did you ___ the report?",
        options: ["finished", "finishing", "finish"],
        answer: 2,
        explanation: "После did нужна начальная форма.",
      },
      {
        prompt: "«Он был дома?»",
        options: [
          "Was he at home?",
          "Did he was at home?",
          "Is he at home yesterday?",
        ],
        answer: 0,
        explanation: "У to be в прошедшем вопрос строится с was/were.",
      },
    ],
  },
  {
    id: "future",
    kind: "grammar",
    title: "Будущее: will и going to",
    subtitle: "Решение сейчас или готовый план.",
    level: "A2",
    minutes: 5,
    sections: [
      {
        title: "Will: решение, обещание, прогноз",
        body: "Will + начальная форма. Удобно, когда решаешь в момент разговора или обещаешь. Эти значения — ориентир, не строгая граница всех употреблений.",
        example: "I will help you.",
        ru: "Я тебе помогу.",
      },
      {
        title: "Going to: намерение",
        body: "Am/is/are going to + глагол. Часто говорим так о заранее принятом решении или прогнозе по видимым признакам.",
        example: "I am going to move abroad.",
        ru: "Я собираюсь переехать за границу.",
      },
    ],
    questions: [
      {
        prompt: "I am ___ learn English this year.",
        options: ["will", "going to", "go"],
        answer: 1,
        explanation: "Am going to + learn — намерение.",
      },
      {
        prompt: "I will ___ you tomorrow.",
        options: ["calls", "calling", "call"],
        answer: 2,
        explanation: "После will — начальная форма call.",
      },
      {
        prompt: "She ___ going to travel.",
        options: ["is", "are", "will"],
        answer: 0,
        explanation: "She is going to travel.",
      },
    ],
  },
  {
    id: "perfect",
    kind: "grammar",
    title: "Present Perfect: связь с сейчас",
    subtitle: "Have / has + третья форма.",
    level: "A2",
    minutes: 6,
    sections: [
      {
        title: "Результат или опыт до настоящего",
        body: "I have lost my key — ключ сейчас потерян. I have visited Oslo — у меня есть такой опыт. Для завершённого времени yesterday нужен Past Simple: I lost my key yesterday.",
        example: "I have lost my key.",
        ru: "Я потерял ключ (и сейчас его нет).",
      },
      {
        title: "Как построить",
        body: "I/you/we/they → have; he/she/it → has. Далее V3: worked, been, seen, lost. For — длительность; since — точка начала. «I have worked here for two years» может означать, что работа продолжается.",
        example: "She has worked here since 2024.",
        ru: "Она работает здесь с 2024 года.",
      },
    ],
    questions: [
      {
        prompt: "She ___ visited Oslo.",
        options: ["have", "has", "is"],
        answer: 1,
        explanation: "С she используем has + V3.",
      },
      {
        prompt: "I have worked here ___ two years.",
        options: ["since", "at", "for"],
        answer: 2,
        explanation: "For — длительность, since — начальная точка.",
      },
      {
        prompt: "Выбери фразу с yesterday.",
        options: [
          "I bought a ticket yesterday.",
          "I have bought a ticket yesterday.",
          "I buy a ticket yesterday.",
        ],
        answer: 0,
        explanation: "Yesterday — завершённое время, используем Past Simple.",
      },
    ],
  },
  {
    id: "articles",
    kind: "grammar",
    title: "A, an и the",
    subtitle: "Один из многих или уже известный.",
    level: "A1",
    minutes: 5,
    sections: [
      {
        title: "A/an: один, пока не конкретный",
        body: "С исчисляемым существительным в единственном числе: a flat, an analyst. An выбирают перед гласным ЗВУКОМ: an hour, но a university.",
        example: "I am an analyst. I need a flat.",
        ru: "Я аналитик. Мне нужна квартира.",
      },
      {
        title: "The: понимаем, о чём речь",
        body: "I saw a flat. The flat was small. Сначала любая квартира, потом уже та самая. Когда говорим в целом, неисчисляемые и множественные часто без артикля: Water is important. Cats are animals.",
        example: "Please close the door.",
        ru: "Пожалуйста, закрой дверь (ту, о которой мы оба знаем).",
      },
    ],
    questions: [
      {
        prompt: "I am ___ analyst.",
        options: ["a", "an", "—"],
        answer: 1,
        explanation: "Analyst начинается с гласного звука.",
      },
      {
        prompt: "I saw a flat. ___ flat was small.",
        options: ["A", "An", "The"],
        answer: 2,
        explanation: "Теперь квартира уже известна собеседнику.",
      },
      {
        prompt: "___ water is important. (Вода вообще.)",
        options: ["Без артикля", "A", "An"],
        answer: 0,
        explanation: "Неисчисляемое water в общем смысле без артикля.",
      },
    ],
  },
  {
    id: "modals",
    kind: "grammar",
    title: "Can, could и should",
    subtitle: "Умение, вежливая просьба и совет.",
    level: "A2",
    minutes: 4,
    sections: [
      {
        title: "Can и could",
        body: "Can — могу/умею. Could you…? — вежливая просьба. После этих глаголов нет to и нет -s: she can speak.",
        example: "Could you speak slowly? I can help.",
        ru: "Не могли бы вы говорить медленно? Я могу помочь.",
      },
      {
        title: "Should — совет",
        body: "Should + начальная форма: стоит что-то сделать. Для отрицания should not (shouldn’t). Вопрос: Should I…?",
        example: "You should practise every day.",
        ru: "Тебе стоит практиковаться каждый день.",
      },
    ],
    questions: [
      {
        prompt: "She can ___ English.",
        options: ["to speak", "speak", "speaks"],
        answer: 1,
        explanation: "После can — глагол без to и -s.",
      },
      {
        prompt: "Вежливо попроси повторить.",
        options: [
          "You repeat!",
          "You should repeat.",
          "Could you repeat that, please?",
        ],
        answer: 2,
        explanation: "Could you…? — вежливая форма просьбы.",
      },
      {
        prompt: "«Тебе стоит практиковаться»",
        options: [
          "You should practise.",
          "You should to practise.",
          "You should practises.",
        ],
        answer: 0,
        explanation: "После should — начальная форма без to.",
      },
    ],
  },
];

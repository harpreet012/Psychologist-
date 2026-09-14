import { Article, FAQ, Mood, ProcessStep, Service, TrustPoint } from "@/types";

export const services: Service[] = [
  {
    slug: "anxiety-overthinking",
    title: "Anxiety & Overthinking",
    shortDescription: "Understand worry patterns and find steadier ways to respond.",
    icon: "Wind",
    whoItMayHelp: [
      "Your mind stays busy even when you want to rest",
      "Uncertainty, physical tension, or reassurance-seeking feels hard to manage",
      "You replay conversations or imagine worst-case outcomes",
    ],
    whatToExpect: [
      "A shared understanding of what keeps the cycle going",
      "Practical coping tools suited to your daily life",
      "Gradual work on avoidance, self-trust, and emotional regulation",
    ],
    longDescription:
      "Anxiety is not simply a matter of thinking too much. We explore the thoughts, emotions, body responses, and situations involved, then build practical ways to feel less controlled by the cycle.",
  },
  {
    slug: "emotional-difficulties",
    title: "Low Mood & Emotional Difficulties",
    shortDescription: "Make space for difficult emotions without being defined by them.",
    icon: "CloudSun",
    whoItMayHelp: [
      "You feel low, numb, irritable, or emotionally overwhelmed",
      "It has become difficult to feel motivated or connected",
      "You are carrying grief, disappointment, or a sense of being stuck",
    ],
    whatToExpect: [
      "A non-judgmental space to name what has been difficult",
      "Support understanding triggers, needs, and recurring patterns",
      "Small, realistic steps toward reconnection and stability",
    ],
    longDescription:
      "You do not need to have the perfect words before starting. Therapy can help you understand what your emotions may be communicating and build a more supportive relationship with yourself.",
  },
  {
    slug: "relationships-boundaries",
    title: "Relationships & Boundaries",
    shortDescription: "Understand relationship patterns and communicate more clearly.",
    icon: "HeartHandshake",
    whoItMayHelp: [
      "The same conflicts or misunderstandings keep returning",
      "It is difficult to express needs, say no, or tolerate disapproval",
      "A relationship change, breakup, or family concern feels hard to navigate",
    ],
    whatToExpect: [
      "Space to explore your experience without assigning blame",
      "Work on communication, needs, boundaries, and attachment patterns",
      "Choices guided by your values and circumstances",
    ],
    longDescription:
      "Our relationships often bring both comfort and difficulty. Counselling can help you notice the patterns you bring into connection, understand what you need, and practise clearer ways of relating.",
  },
  {
    slug: "self-esteem-identity",
    title: "Self-esteem & Identity",
    shortDescription: "Develop a kinder and more grounded sense of self.",
    icon: "Fingerprint",
    whoItMayHelp: [
      "Self-criticism or comparison shapes how you see yourself",
      "You rely heavily on approval or struggle to trust your choices",
      "You are trying to understand who you are outside expectations",
    ],
    whatToExpect: [
      "Curiosity about how your self-beliefs developed",
      "Tools for responding differently to the inner critic",
      "Work toward self-worth that is not dependent on performance",
    ],
    longDescription:
      "Self-esteem is not built through forced positivity. We look at the experiences and beliefs that shape your inner voice, while developing more balanced and compassionate ways of seeing yourself.",
  },
  {
    slug: "life-transitions",
    title: "Life Transitions & Decisions",
    shortDescription: "Find clarity when an old direction no longer fits.",
    icon: "Compass",
    whoItMayHelp: [
      "A career, education, relationship, or family transition feels unsettling",
      "You feel torn between your own needs and others' expectations",
      "Decision-making has become exhausting or confusing",
    ],
    whatToExpect: [
      "A structured space to slow down and see the whole picture",
      "Exploration of values, fears, and competing priorities",
      "Support making an informed choice rather than prescribing one",
    ],
    longDescription:
      "Transitions can disrupt our sense of certainty even when the change is wanted. Counselling offers space to process what is ending, understand what matters now, and approach the next step with greater clarity.",
  },
  {
    slug: "stress-burnout",
    title: "Stress, Burnout & Balance",
    shortDescription: "Respond to pressure before functioning becomes survival mode.",
    icon: "BatteryMedium",
    whoItMayHelp: [
      "You are functioning on the outside but feel depleted within",
      "Rest brings guilt, and your mind remains occupied by responsibilities",
      "Work, study, caregiving, or competing roles feel unsustainable",
    ],
    whatToExpect: [
      "A realistic look at demands, resources, and patterns of overextension",
      "Skills for recovery, boundaries, and nervous-system regulation",
      "A plan that respects real-life constraints rather than ideal routines",
    ],
    longDescription:
      "Burnout is not a personal failure. We examine the pressures around you and the patterns within your control, then work toward boundaries, recovery, and a rhythm that is more sustainable.",
  },
];

export const trustPoints: TrustPoint[] = [
  {
    icon: "ShieldCheck",
    title: "Privacy-conscious",
    description:
      "Confidentiality, its professional limits, and how your information is handled are discussed clearly.",
  },
  {
    icon: "HeartHandshake",
    title: "Collaborative",
    description:
      "Therapy is shaped with you—around your goals, context, pace, and feedback.",
  },
  {
    icon: "BadgeCheck",
    title: "Evidence-informed",
    description:
      "The work draws from established psychological approaches and ongoing professional learning.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Choose a live slot",
    description:
      "Select an available time checked directly against Anjali's Google Calendar.",
  },
  {
    number: "02",
    title: "Complete payment",
    description:
      "Your chosen time is held for 15 minutes while you pay securely through Razorpay.",
  },
  {
    number: "03",
    title: "Receive confirmation",
    description:
      "Verified payment confirms the session automatically and adds it to the practice calendar.",
  },
];

export const moods: Mood[] = [
  {
    id: "sad",
    emoji: "😔",
    label: "Low",
    message: "You do not have to force yourself to feel better immediately.",
    practice:
      "Pause and name the feeling as specifically as you can. Then ask: what would make the next hour 5% gentler?",
    href: "/services#emotional-difficulties",
    linkLabel: "Explore emotional support",
  },
  {
    id: "anxious",
    emoji: "😰",
    label: "Anxious",
    message: "A busy nervous system can make every thought feel urgent.",
    practice:
      "Look around and name five things you see, four you can touch, and three you can hear. Let your attention return to the room.",
    href: "/resources#breathing",
    linkLabel: "Try a short breathing pause",
  },
  {
    id: "stressed",
    emoji: "😣",
    label: "Stressed",
    message: "Stress often asks us to do everything at the same time.",
    practice:
      "Unclench your jaw, lower your shoulders, and choose only the next necessary task—not the entire list.",
    href: "/services#stress-burnout",
    linkLabel: "Explore stress support",
  },
  {
    id: "exhausted",
    emoji: "😴",
    label: "Exhausted",
    message: "Being depleted is information, not a character flaw.",
    practice:
      "Ask what can be reduced, postponed, or shared today. A small boundary can be more useful than a perfect routine.",
    href: "/services#stress-burnout",
    linkLabel: "Learn about burnout support",
  },
  {
    id: "confused",
    emoji: "😕",
    label: "Uncertain",
    message: "Clarity sometimes appears after we stop demanding an instant answer.",
    practice:
      "On paper, separate what you know, what you fear, and what you still need to learn. Treat these as three different lists.",
    href: "/services#life-transitions",
    linkLabel: "Explore decision support",
  },
  {
    id: "okay",
    emoji: "🙂",
    label: "Steady",
    message: "Steady moments are worth noticing, not taking for granted.",
    practice:
      "Notice one thing that is helping today—a person, habit, boundary, or choice. That is useful information for difficult days too.",
    href: "/resources",
    linkLabel: "Browse practical resources",
  },
];

export const faqs: FAQ[] = [
  {
    question: "What happens in the first session?",
    answer:
      "The first session is a conversation about what brings you to counselling, what you would like support with, and any questions you have. We may discuss relevant history and possible goals, but you choose what you are ready to share.",
  },
  {
    question: "Do I need to know exactly what is wrong before I book?",
    answer:
      "No. Many people begin with a general sense of feeling stuck, overwhelmed, disconnected, or unlike themselves. Part of the work can be finding clearer language for your experience.",
  },
  {
    question: "Are sessions available online and in person?",
    answer:
      "Online sessions are available. In-person availability in Rohtak is confirmed individually when you enquire, so the location and timing can be discussed before booking.",
  },
  {
    question: "How long is a session and how often will we meet?",
    answer:
      "A standard session is 50 minutes, followed by a 10-minute scheduling buffer. The current fee is shown before you reserve the slot. Frequency depends on your needs, availability, and the focus of the work rather than a fixed package.",
  },
  {
    question: "Is therapy confidential?",
    answer:
      "Privacy is central to counselling. The practical and professional limits of confidentiality—including situations involving serious safety concerns or legal requirements—are explained before or during the first session.",
  },
  {
    question: "When is my appointment confirmed?",
    answer:
      "Choosing a slot creates a temporary 15-minute hold. The appointment is confirmed only after Razorpay verifies successful payment; the website then adds it to Anjali's Google Calendar automatically. A first session does not commit you to ongoing therapy.",
  },
];

export const articles: Article[] = [
  {
    slug: "understanding-anxiety",
    title: "Understanding Anxiety Beyond ‘Just Overthinking’",
    category: "Anxiety",
    excerpt:
      "A practical look at how thoughts, body responses, uncertainty, and avoidance can keep anxiety going.",
    readTime: "6 min read",
    featured: true,
    sections: [
      {
        heading: "Anxiety is a whole-system response",
        paragraphs: [
          "Anxiety can show up as fast thoughts, but it can also appear as muscle tension, a racing heart, irritability, stomach discomfort, difficulty sleeping, or a strong need for certainty. These experiences can make ordinary situations feel unusually urgent.",
          "Rather than treating every anxious thought as a fact, it can help to notice the full pattern: what happened, what your mind predicted, what your body did, and what you felt compelled to do next.",
        ],
      },
      {
        heading: "Why avoidance brings short relief",
        paragraphs: [
          "Avoiding a feared situation, checking repeatedly, or asking for reassurance may lower discomfort for a moment. The difficulty is that short-term relief can teach the mind that the situation was dangerous and that avoidance was necessary.",
          "Change is usually gradual. It may involve learning to tolerate some uncertainty, approaching manageable situations step by step, and discovering that anxiety can rise and fall without controlling every decision.",
        ],
      },
      {
        heading: "A useful place to begin",
        paragraphs: [
          "The next time anxiety appears, try writing down the prediction your mind is making and the evidence you actually have right now. Then choose one small action based on your values rather than on the demand for perfect certainty.",
          "If anxiety is persistent, significantly disrupting daily life, or accompanied by safety concerns, consider seeking appropriate professional support.",
        ],
      },
    ],
  },
  {
    slug: "managing-overthinking",
    title: "Working With Overthinking Without Fighting Your Mind",
    category: "Mental Well-being",
    excerpt:
      "Why ordering yourself to stop thinking rarely helps—and what to try instead.",
    readTime: "5 min read",
    sections: [
      {
        heading: "Thinking and problem-solving are not always the same",
        paragraphs: [
          "Useful reflection usually produces new information, a decision, or a next step. Overthinking often circles the same material while promising that one more round will finally create certainty.",
          "A helpful question is: am I learning something new, or am I repeating the same question in a different form?",
        ],
      },
      {
        heading: "Give the thought a container",
        paragraphs: [
          "Write the concern down and set a short time to consider it deliberately. Separate what can be acted on today from what cannot be resolved yet. When the thought returns outside that time, remind yourself that it has a place to be revisited.",
          "This is not about suppressing thoughts. It is about choosing when and how much attention they receive.",
        ],
      },
      {
        heading: "Return to the present through action",
        paragraphs: [
          "Choose a concrete sensory or physical task: take a short walk, wash a cup slowly, stretch, or name what you can see and hear. The aim is not distraction forever; it is to help attention become flexible again.",
        ],
      },
    ],
  },
  {
    slug: "recognizing-burnout",
    title: "Recognising Burnout Before Everything Feels Urgent",
    category: "Stress",
    excerpt:
      "Burnout often builds quietly. These signs can help you notice when coping has turned into depletion.",
    readTime: "6 min read",
    sections: [
      {
        heading: "Burnout can hide behind functioning",
        paragraphs: [
          "You may still meet deadlines and respond to messages while feeling emotionally flat, resentful, forgetful, or unable to recover after rest. Functioning does not always mean that the current pace is sustainable.",
        ],
      },
      {
        heading: "Look for changes, not perfection",
        paragraphs: [
          "Notice whether sleep, patience, concentration, motivation, or physical tension has changed over time. Also notice whether activities that once restored you now feel like additional obligations.",
          "These signs can have many causes, so avoid diagnosing yourself from a checklist. Use them as information that your current demands and resources may need attention.",
        ],
      },
      {
        heading: "Recovery needs more than better productivity",
        paragraphs: [
          "A new planner cannot solve an impossible workload. Recovery may involve reducing demands, asking for support, setting boundaries, and allowing genuine non-productive rest alongside practical coping skills.",
        ],
      },
    ],
  },
  {
    slug: "healthy-relationships",
    title: "Healthier Relationships Through Clearer Communication",
    category: "Relationships",
    excerpt:
      "A simple framework for expressing needs without turning every disagreement into a verdict on the relationship.",
    readTime: "6 min read",
    sections: [
      {
        heading: "Describe before you interpret",
        paragraphs: [
          "Start with the specific event rather than a global conclusion. ‘We have changed plans three times this week’ creates a different conversation from ‘You never respect my time.’",
        ],
      },
      {
        heading: "Name the feeling and the need",
        paragraphs: [
          "Try linking your emotional response to the need underneath it: ‘I feel unsettled because predictability matters to me.’ This communicates your experience without claiming to know the other person's intention.",
        ],
      },
      {
        heading: "Make a request, not a hidden test",
        paragraphs: [
          "A clear request gives the other person something concrete to respond to. It also leaves room for negotiation. Boundaries describe what you will do to protect a need; they are not tools for controlling another person's choices.",
        ],
      },
    ],
  },
  {
    slug: "life-transitions",
    title: "Making Decisions When Every Option Feels Uncertain",
    category: "Life Transitions",
    excerpt:
      "A grounded way to separate values, fears, and missing information when you feel stuck between choices.",
    readTime: "5 min read",
    sections: [
      {
        heading: "Not all uncertainty can be solved in advance",
        paragraphs: [
          "Important choices rarely come with complete information. Waiting to feel no doubt at all can keep you stuck, because confidence often develops after a choice is tested rather than before it is made.",
        ],
      },
      {
        heading: "Separate three different questions",
        paragraphs: [
          "Ask: what facts do I know, what am I predicting, and what information can I still gather? Treating these as separate categories reduces the chance that fear will disguise itself as certainty.",
        ],
      },
      {
        heading: "Choose by values, not only by relief",
        paragraphs: [
          "The option that reduces anxiety fastest is not always the option that fits your longer-term values. Consider which choice moves you toward the kind of life and relationships you want, while still respecting your practical constraints.",
        ],
      },
    ],
  },
  {
    slug: "self-compassion",
    title: "Practising Self-compassion Without Avoiding Accountability",
    category: "Personal Growth",
    excerpt:
      "Kindness toward yourself can support honest change; it does not require pretending that mistakes do not matter.",
    readTime: "6 min read",
    sections: [
      {
        heading: "Self-criticism and accountability are different",
        paragraphs: [
          "Accountability identifies what happened, considers the impact, and supports repair. Harsh self-criticism often turns one action into a permanent identity: ‘I made a mistake’ becomes ‘I am a failure.’",
        ],
      },
      {
        heading: "Use the tone you would use with someone you respect",
        paragraphs: [
          "Imagine speaking to a person you care about who made the same mistake. You might be honest without being cruel. Try offering yourself the same combination of clarity and humanity.",
        ],
      },
      {
        heading: "Let compassion lead to a next step",
        paragraphs: [
          "Ask what repair, learning, or boundary is needed now. Self-compassion becomes practical when it helps you stay present enough to respond rather than collapse into shame or defensiveness.",
        ],
      },
    ],
  },
];

export const articleCategories = [
  "All",
  "Anxiety",
  "Mental Well-being",
  "Stress",
  "Relationships",
  "Life Transitions",
  "Personal Growth",
];

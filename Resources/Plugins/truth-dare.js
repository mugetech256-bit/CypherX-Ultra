const truthQuestions = [
  "What is your biggest fear?",
  "What is the most embarrassing thing you've ever done?",
  "Who was your first crush?",
  "What is your biggest secret?",
  "Have you ever lied to your best friend?",
  "What is something you've never told anyone?",
  "What is your most embarrassing moment in school?",
  "Have you ever cheated on a test?",
  "What is your guilty pleasure?",
  "What is the worst thing you've ever said to someone?",
  "Have you ever pretended to be sick to skip work/school?",
  "What is your biggest regret?",
  "Who do you have a crush on right now?",
  "What is the meanest thing you've ever done?",
  "Have you ever stolen anything?",
  "What is your biggest insecurity?",
  "What is the most childish thing you still do?",
  "Have you ever been caught doing something you shouldn't?",
  "What is your most unpopular opinion?",
  "What is something you're ashamed of?"
];

const dareChallenges = [
  "Send a voice note singing your favorite song",
  "Change your status to something embarrassing for 1 hour",
  "Send a funny selfie",
  "Text your crush (or someone random) a cheesy pickup line",
  "Do 20 push-ups and send a video",
  "Speak in an accent for the next 10 messages",
  "Share an embarrassing photo from your gallery",
  "Write a short poem about the person above you",
  "Change your profile picture to something funny for 1 day",
  "Send a voice note telling a joke",
  "Compliment everyone in the group",
  "Share your most used emoji and why",
  "Send a video of you dancing to any song",
  "Let someone in the group change your status for 24 hours",
  "Text your best friend 'I have something important to tell you' and wait 5 minutes before explaining it was a dare",
  "Send a screenshot of your recent calls list",
  "Post a story saying you're bored and tag 5 people",
  "Send a voice note of you trying to rap",
  "Share the last meme you saved",
  "Do a handstand and send proof (photo/video)"
];

module.exports = () => ({
  name: "Truth or Dare",
  triggers: ["truth", "dare", "truthordare", "tod"],
  description: "Play Truth or Dare game",
  category: "Games",
  react: "🎭",

  run: async ({ m, Cypher, command }) => {
    if (command === 'truth') {
      const question = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
      return m.reply(
        `🎭 *Truth Question*\n\n` +
        `@${m.sender.split('@')[0]}, answer honestly:\n\n` +
        `💭 ${question}`,
        { mentions: [m.sender] }
      );
    }

    if (command === 'dare') {
      const challenge = dareChallenges[Math.floor(Math.random() * dareChallenges.length)];
      return m.reply(
        `🎭 *Dare Challenge*\n\n` +
        `@${m.sender.split('@')[0]}, you must:\n\n` +
        `🎯 ${challenge}`,
        { mentions: [m.sender] }
      );
    }

    const isTruth = Math.random() < 0.5;
    if (isTruth) {
      const question = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
      return m.reply(
        `🎭 *Truth or Dare - TRUTH*\n\n` +
        `@${m.sender.split('@')[0]}, answer honestly:\n\n` +
        `💭 ${question}`,
        { mentions: [m.sender] }
      );
    } else {
      const challenge = dareChallenges[Math.floor(Math.random() * dareChallenges.length)];
      return m.reply(
        `🎭 *Truth or Dare - DARE*\n\n` +
        `@${m.sender.split('@')[0]}, you must:\n\n` +
        `🎯 ${challenge}`,
        { mentions: [m.sender] }
      );
    }
  }
});
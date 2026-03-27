const { pairSession } = require('../Functions/pair.js');

module.exports = () => ({
  name: "Pair Command",
  triggers: ["pair", "connect"],
  description: "Pair a new session from Session ID",
  react: "🔗",
  category: "Utility",
  restricted: true,

  run: async ({ m, args, Cypher }) => {
    try {
      if (!args.length) {
        return await Cypher.sendMessage(m.chat, { 
          text: "⚠️ Enter session id to pair\nExample:\n\n.pair CYPHER-X:~xxxxx or XPLOADER-BOT:~xxxxx"
        }, { quoted: m });
      }

      const sessionInput = args.join(' ').trim();

      if (!sessionInput.startsWith('CYPHER-X:~') && !sessionInput.startsWith('XPLOADER-BOT:~')) {
        return await Cypher.sendMessage(m.chat, { 
          text: "⚠️ Invalid session format.\nMust start with *CYPHER-X:~* or *XPLOADER-BOT:~*."
        }, { quoted: m });
      }

      await Cypher.sendMessage(m.chat, { 
        text: "🔄 Pairing session, please wait..."
      }, { quoted: m });

      await pairSession(sessionInput);

      await Cypher.sendMessage(m.chat, { 
        text: "✅ Session paired successfully!"
      }, { quoted: m });

    } catch (error) {
      console.error(error);
      await Cypher.sendMessage(m.chat, { 
        text: `❌ Failed to pair session: ${error.message}`
      }, { quoted: m });
    }
  }
});
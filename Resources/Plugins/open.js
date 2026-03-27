module.exports = () => ({
  name: "Open Group",
  triggers: ["open"],
  description: "Open the group (all members can send messages)",
  category: "Group Admin",
  react: "🔓",
  owner: true,

  run: async ({ m, Cypher }) => {
    if (!m.isGroup) {
      return m.reply("⚠️ *This command can only be used in groups!*");
    }

    try {
      const groupMetadata = await Cypher.groupMetadata(m.chat);
      const participants = groupMetadata.participants;
      const botNumber = await Cypher.decodeJid(Cypher.user.id);

      const senderIsAdmin = participants.find(
        (p) => p.id === m.sender && (p.admin === "admin" || p.admin === "superadmin")
      );

      if (!senderIsAdmin) {
        return m.reply("⚠️ *This command requires admin privileges!*");
      }

      const botIsAdmin = participants.find(
        (p) => p.id === botNumber && (p.admin === "admin" || p.admin === "superadmin")
      );

      if (!botIsAdmin) {
        return m.reply("⚠️ *Bot needs to be an admin to perform this action!*");
      }
      
      await Cypher.groupSettingUpdate(m.chat, "not_announcement");
      m.reply("✅ *Group opened by admin. Members can now send messages.*");
    } catch (error) {
      console.error("Error opening group:", error);
      m.reply("❌ *Failed to open the group. Please try again.*");
    }
  }
});
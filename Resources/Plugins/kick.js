module.exports = () => ({
  name: "Kick User",
  triggers: ["kick", "remove"],
  description: "Remove a user from the group",
  category: "Group Admin",
  react: "👢",
  owner: true,

  run: async ({ m, Cypher, text }) => {
    if (!m.isGroup) {
      return m.reply("⚠️ *This command can only be used in groups!*");
    }

    try {
      const groupMetadata = await Cypher.groupMetadata(m.chat);
      const participants = groupMetadata.participants;
      const botNumber = await Cypher.decodeJid(Cypher.user.id);

      const sender = participants.find((p) => p.id === m.sender);
      const senderIsAdmin = sender && (sender.admin === "admin" || sender.admin === "superadmin");

      if (!senderIsAdmin) {
        return m.reply("⚠️ *This command requires admin privileges!*");
      }

      const botIsAdmin = participants.find(
        (p) => p.id === botNumber && (p.admin === "admin" || p.admin === "superadmin")
      );

      if (!botIsAdmin) {
        return m.reply("⚠️ *Bot needs to be an admin to perform this action!*");
      }

      let target = m.mentionedJid[0] 
        ? m.mentionedJid[0] 
        : m.quoted 
        ? m.quoted.sender 
        : text.replace(/[^0-9]/g, "") 
        ? text.replace(/[^0-9]/g, "") + "@s.whatsapp.net" 
        : null;

      if (!target) {
        return m.reply("⚠️ *Mention or reply to a user to remove!*");
      }

      await Cypher.groupParticipantsUpdate(m.chat, [target], "remove");
      m.reply(`✅ *User removed successfully!*`);
    } catch (error) {
      console.error("Error removing user:", error);
      m.reply("❌ *Failed to remove user. They might be an admin or the bot lacks permissions.*");
    }
  }
});
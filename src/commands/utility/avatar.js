module.exports = {
    name: 'avatar',
    aliases: ['icon', 'pfp'],
    description: 'Show user avatar',
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.channel.send(`${message.author}'s avatar: ${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`;
        });

        message.channel.send(avatarList);
    }
}

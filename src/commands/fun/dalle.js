const { Discord, MessageEmbed } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateImage(prompt) {
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
  });
  const image_url = response.data.data[0].url;
  return image_url;
}

module.exports = {
  name: 'dalle',
  aliases: ['',],
  description: 'DALL-E image generation',
  usage: '<prompt>',
  async execute(message, args) {
    if (args != "") {
      const prompt = args.join(' ');
      message.channel.send('Generating...');

      try {
        const image_url = await generateImage(prompt);
        message.reply(
          `Here's your **${prompt}**`,
          {
            files: [
              {attachment: image_url, name: prompt + '.png'},
            ],
          }
        );

      } catch (e) {
        console.log(e.message);
        message.reply('Could not generate 🤬 ' + e.message);
      }
    }
  },
}
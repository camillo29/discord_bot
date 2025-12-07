import 'dotenv/config';

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = 'https://discord.com/api/v10/' + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    await DiscordRequest(endpoint, { method: 'PUT', body: commands });
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  const emojiList = ['😭','😄','😌','🤓','😎','😤','🤖','😶‍🌫️','🌏','📸','💿','👋','🌊','✨'];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function getRandomShake() {
    const shakeList = [
        'https://cdn.discordapp.com/attachments/1438143159673684089/1445349059450896384/20251130_222212.gif?ex=6934a2f5&is=69335175&hm=a0caa218e6ae9197edeafaed0c71043039fe747cce870009dede3bd3ab1e2a25&',
        'https://cdn.discordapp.com/attachments/1438143159673684089/1445349060058812498/20251130_220928.gif?ex=6934a2f5&is=69335175&hm=d35a6cbd657c4be4416c14a3a09fcc5846a01febe61c345f29c7f9bc74a0f5ea&',
        'https://cdn.discordapp.com/attachments/1438143159673684089/1445349061015375893/20251130_220848.gif?ex=6934a2f5&is=69335175&hm=6f1ae722a3a69cfbd3be43d94b948f27364a37cb6e56749ae5a7a2cc684f07bc&',
        'https://cdn.discordapp.com/attachments/1438143159673684089/1445349061707305021/20251130_123454.gif?ex=6934a2f5&is=69335175&hm=6231a9c13d8e06c247a1cd9189b7144237d653f16209d713fb88006ef8f4d2db&',
        'https://cdn.discordapp.com/attachments/1438143159673684089/1445349062038523944/20251130_124448.gif?ex=6934a2f5&is=69335175&hm=2eb1914461401f9b9d609af8350eb8545fc4cfad063c0ea691c130a4a133a94a&',
        'https://cdn.discordapp.com/attachments/1438143159673684089/1445349062319538227/20251130_123110.gif?ex=6934a2f5&is=69335175&hm=df3cefa7e4f0529c1fcf00e63248d6147146e0fc4aa136eb34098bc5883ef130&',
        'https://cdn.discordapp.com/attachments/1438143159673684089/1445349062760071259/20251130_122851.gif?ex=6934a2f5&is=69335175&hm=d9e62fd4d77313968a82af4172e6862cde154d4e4ad2234ec1ce695ab7cd3e5a&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1445003926549037147/20251201_114855.gif?ex=69360486&is=6934b306&hm=0edc9c06d2adfd558d9104c632db162f96555a7851af47e6ff492a4849eeb0f1&'];
    return shakeList[Math.floor(Math.random() * shakeList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

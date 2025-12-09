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
        'https://cdn.discordapp.com/attachments/1438117831685181443/1445003926549037147/20251201_114855.gif?ex=69360486&is=6934b306&hm=0edc9c06d2adfd558d9104c632db162f96555a7851af47e6ff492a4849eeb0f1&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1447716887386525928/krakotka.gif?ex=6938a2eb&is=6937516b&hm=12541d3e21bf3ca94b392f9bf35ad8c6ce0e18862d7d8f3e639fe0089513d290&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1447972360706723903/GdBb5T3m-ezgif.com-crop.gif?ex=693990d8&is=69383f58&hm=a41fb6a3333eec7d4b3c4b720b54616739d8eec14ba78e2133299db67eafb839&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1444809072368025785/ezgif-66abe9c9c69b20c7.gif?ex=6939438e&is=6937f20e&hm=901d4628f062d18e72dbc20027fe097a89a019448ed905971ed11c6cd06278a3&'];
    return shakeList[Math.floor(Math.random() * shakeList.length)];
}

export function getRandomGif() {
    const gifList = ['https://cdn.discordapp.com/attachments/1438117831685181443/1445543605736570951/traikotkawesele.gif?ex=69394ca4&is=6937fb24&hm=e9426f9cc42c6ecd54ee155169edd0df04238d2b78eb0cd5927f173749a13d2b&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1445550961920573484/Traikotkaglowka.gif?ex=6939537e&is=693801fe&hm=75e5448a1dec718244ffa3bd9abc1924b605cc51caf925a50697cf1adee6b7df&',
        'https://cdn.discordapp.com/attachments/1438131355308261377/1444796010147610775/traikotkaDance.avif?ex=69393763&is=6937e5e3&hm=2cc381ba12a3eb0b8a5e3dc8537033a3a299914e542e41e292312266f7ac5dd2&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1446263332817469571/TraikotkaShrugg.gif?ex=693947f0&is=6937f670&hm=2a05646ae920fd8eb850e2ca3b70c35c5004c87fb967080a13da79b9e4f8c4a5&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1445550961136505023/TraikotkaPstryk.gif?ex=6939537e&is=693801fe&hm=bfbe7900fd3b194619a56f4438c921503cb242cf43e232bd15ac4940256d13fe&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1447380998424625282/emptyhead.avif?ex=69396459&is=693812d9&hm=f848b1cd5a41f2ca2fb3d8f3038338e631ebd570d27c1d049c68fa73296aed6d&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1446289499905855742/rizz.avif?ex=6939604f&is=69380ecf&hm=f689fe78897b1d9c539b769238ae067eb22e6d1535ad66ce242186c832069741&',
        'https://cdn.discordapp.com/attachments/1438143159673684089/1446413792077418537/ezgif.com-added-text.gif?ex=69392b51&is=6937d9d1&hm=750bd712684d6619b59489146a571a2b695507412f83cd4f4e961546ee9f2504&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1445524504930554166/ALEjebo.gif?ex=69393ada&is=6937e95a&hm=242c6c7e6ac69814df0f090a188735e0f14c12901cea5a4da6075fbd43f5f5b9&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1446290436011458560/TraikotkaDance3.gif?ex=6939612e&is=69380fae&hm=bf6351f7f5d8c2198ec6c8ace9a6144b9b9fe5d09613a656aad74d6cdcfc0aef&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1446903645483438151/christmasPog.gif?ex=6938f947&is=6937a7c7&hm=faf0def35fe560ca5ff0327fb10dc8c79767608b0d8c49b5fcbb99471d77df2a&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1446284148082737343/swir.avif?ex=69395b53&is=693809d3&hm=d1e5be1b2b4cdb6f086469b68ea5d22962dbb610d35f543db7c6b35b7ec666c5&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1445550961555800195/TraikotkaLepa.gif?ex=6939537e&is=693801fe&hm=0687a2f9ec128fbf7083bb0f8ca9f64a74e04491735291a6e40d788e8ad2f9d9&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1445537159007441067/traik1.gif?ex=693946a3&is=6937f523&hm=6cd1d8b5fd48361d69dc190dd129cdc89a513d75833e42e8668623a28303296a&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1445530700349440215/67taikotka.gif?ex=6939409f&is=6937ef1f&hm=31846a10fd107efd05aec893b7aef15836a6fb7952ac36d223870049122f760f&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1445885560718753893/20251203_221238.gif?ex=6939399c&is=6937e81c&hm=188a9cfaa7771746fac979117820ff4d528433834e1147c2f78e325798298d03&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1445546197375914004/trajkocze2-ezgif.com-crop.gif?ex=69394f0e&is=6937fd8e&hm=a2d59ab407ec4f5cba2391e16f20e398fc1d7d8e5f2900f23e22313486127329&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1445041399983640686/Pi7_GIF_CMP.gif?ex=6939732d&is=693821ad&hm=545accc504c592fea499a022b4d516918bc9f082e91048c8eb4e751611e8f048&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1448064579035730011/farmazoniarz.avif?ex=6939e6bb&is=6938953b&hm=6b7ed60626679bd59de8fa66dcb96424124d86cdc4d261070d1de409f3b46452&',
        'https://cdn.discordapp.com/attachments/1438117831685181443/1448065289572061425/guzik.avif?ex=6939e764&is=693895e4&hm=e718e191e19a42158e4cbb5f395c40a865245d79870cc3fb7f8cc153ef37a8f5&'];
    return gifList[Math.floor(Math.random() * gifList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

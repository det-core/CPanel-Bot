/*
    # Credits:
    BASE BY : CODEBREAKER 
  https://wa.me/2347030627048
  
 DONT REMOVE CREDIT!!!!!!
*/
import fs from "fs";
import chalk from "chalk";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);

//settings custom pairing code 
global.pairingKode = "DARKTECH" //max 8 DONT REMOVE THE CODE OR ELSE IT WILL CRASH
//settings
global.owner = ["2347030626048"]

//settings bot info
global.versi = "0.0.1"
global.url = "https://shop.jarr.biz.id"
global.namaOwner = "CODEBREAKER"
global.namaBot = "KNOX CPanel"
global.idCh = "120363400363337568@newsletter"

//settings bot thumbnail 
global.thumb = "https://raw.githubusercontent.com/jarroffc/dat4/main/uploads/66a1bd-1766582294407.jpg"
global.foto = "https://files.catbox.moe/3cgiby.jpg"

//settings cpanel 
global.loc = "1" // Fill with location id
global.egg = "15" // Fill with egg id
global.nestid = "5" // Fill with nest id
global.domain = "https:" //domain 
global.apikey = "ptla" //plta
global.capikey = "ptlc" //pltc

//settings cpanelv2
global.locV2 = "1" // Fill with location id
global.eggV2 = "15" // Fill with egg id
global.nestidV2 = "5" // Fill with nest id
global.domainV2 = "https:" //domain 
global.apikeyV2 = "ptla_" //plta
global.capikeyV2 = "ptlc_" //pltc

//=======panelText==========//
global.teksPanel = 
"* Panel expires in 1 month\n* Keep this data as safe as possible\n* Purchase warranty 20 days (5x replace)\n* Claiming warranty must provide proof of purchase chat\n* Do not share panel data\n* No DDOS Server\n> If there are any problems, please report"

global.mess = {
 owner: "*[ACCESS DENIED]*\nOWNER ONLY - CODEBREAKER",
 admin: "*[REJECT]* - ONLY ADMINS GROUPS",
 botAdmin: "*[REJECT]* - BOT MUST BE ADMIN",
 group: "*[REJECT]* - ONLY IN THE GROUP",
 sewa: "*[REJECT]* - ONLY PREMIUM USERS",
 vip: "*[REJECT]* - ONLY OWNER & PREMIUM USERS",
 private: "*[REJECT]* - ONLY IN THE PRIVATE CHAT",
 prem: "*[ Access Denied ]*\nThis feature is for premium users only"
}

fs.watchFile(__filename, () => {
    fs.unwatchFile(__filename);
    console.log(chalk.white.bold("~> Update File :"), chalk.green.bold(__filename));
    import(`${pathToFileURL(__filename).href}?update=${Date.now()}`);
});
/*
    # Credits:
    BASE BY : CODEBREAKER 
  https://wa.me/2347030627048
  
 DONT REMOVE CREDIT!!!!!!
*/

// ██████╗  ███████╗████████╗
// ██╔══██╗██╔════╝╚══██╔══╝
// ██║  ██║ █████╗     ██║
// ██║  ██║ ██╔══╝     ██║
// ██████╔╝███████╗   ██║
// ╚═════╝ ╚══════╝   ╚═╝

// ============= KNOX CPanel BOT COMMANDS =============
// All bot commands are stored in knox.js
// This file is required for the case management system
// 
// Commands available:
// • .menu - Show all bot features
// • .sticker - Create sticker from image/video
// • .ping - Check bot response time
// • .owner - Show bot creator contact
// • .tourl - Upload media to Catbox
// • .brat - Create BRAT sticker
// • .toimage - Convert sticker to image
// • .tovn - Convert video/audio to voice note
// • .backup - Backup bot script (owner only)
// • .restart - Restart bot (owner only)
// • .clearsesi - Clear session files (owner only)
// • .addowner - Add new owner (owner only)
// • .delowner - Remove owner (owner only)
// • .listowner - List all owners (owner only)
// • .addprem - Add premium user (owner only)
// • .delprem - Remove premium user (owner only)
// • .listprem - List premium users (owner only)
// • .self - Switch to self mode (owner only)
// • .public - Switch to public mode (owner only)
// • .mode - Check current bot mode (owner only)
// • .setprefix - Change command prefix (owner only)
// • .prefix - Toggle prefix mode (owner only)
// • .delprefix - Reset prefix to default (owner only)
// • .listcase - Show all command cases (owner only)
// • .getcase - Get specific case code (owner only)
// • .delcase - Delete a case (owner only)
// • .addcase - Add new case (owner only)
// • .q - Get quoted message JSON (owner only)
//
// ============= PANEL MANAGEMENT COMMANDS =============
// • .1gb to .10gb - Create panel server (Reseller)
// • .unli - Create unlimited panel (Reseller)
// • .1gbv2 to .10gbv2 - Create V2 panel server (Reseller)
// • .unliv2 - Create unlimited V2 panel (Reseller)
// • .listpanel - List all panel servers (Owner)
// • .delpanel - Delete panel server (Owner)
// • .listpanelv2 - List all V2 panel servers (Owner)
// • .delpanelv2 - Delete V2 panel server (Owner)
// • .cadmin - Create admin panel (Owner)
// • .cadminv2 - Create V2 admin panel (Owner)
// • .listadmin - List admin panels (Owner)
// • .listadminv2 - List V2 admin panels (Owner)
// • .deladmin - Delete admin panel (Owner)
// • .deladminv2 - Delete V2 admin panel (Owner)
// • .clearpanel - Delete all non-admin panels (Owner)
// • .clearpanelv2 - Delete all non-admin V2 panels (Owner)
// • .addsrv - Add server to existing user (Owner)
// • .addsrvv2 - Add server to existing V2 user (Owner)
// • .addseller - Add reseller group (Owner)
// • .listress - List reseller groups (Owner)
// • .delresseler - Remove reseller group (Owner)
//
// ============= DO NOT DELETE THIS FILE =============
// This file is required for the case management system
// All actual command code is in knox.js
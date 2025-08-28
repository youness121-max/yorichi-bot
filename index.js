const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// قائمة المسموح لهم باستخدام البوت (ضع أرقامك هنا)
const ALLOWED_USERS = [
  "212611684415@c.us", // رقمك الأول
  "212626313887@c.us"  // رقمك الثاني
];

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: './session' }),
  puppeteer: { 
    headless: true,
    args: ['--no-sandbox']
  }
});

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('🔍 امسح الكود بواسطة واتساب ويب');
});

client.on('ready', () => {
  console.log('✅ البوت جاهز للاستخدام!');
  
  // رسالة ترحيب باسمك عند تشغيل البوت
  console.log('☀️ مرحبا بك يا يوريتشي!');
});

client.on('message', async msg => {
  try {
    const sender = msg.from;
    const chat = await msg.getChat();
    
    // التحقق إذا كان المرسل مسموحًا له
    if (!ALLOWED_USERS.includes(sender)) {
      return; // لا يرد على غير المسموح لهم
    }

    if (msg.body === '!بينج') {
      await msg.reply('🏓 بونج! (هذا رد خاص فقط للمسموح لهم)');
      return;
    }

    // أوامر الإدارة (تتطلب أن يكون البوت مشرفًا)
    if (chat.isGroup) {
      const isBotAdmin = chat.participants.some(
        participant => participant.isAdmin && participant.id._serialized === client.info.wid._serialized
      );

      if (!isBotAdmin) return;

      if (msg.body.startsWith('!ترقية') && msg.mentionedIds.length > 0) {
        await chat.promoteParticipants(msg.mentionedIds);
        await msg.reply(`✅ تم ترقية ${msg.mentionedIds.map(id => id.split('@')[0]).join(', ')}`);
      }
      else if (msg.body.startsWith('!طرد') && msg.mentionedIds.length > 0) {
        await chat.removeParticipants(msg.mentionedIds);
        await msg.reply(`🚫 تم طرد ${msg.mentionedIds.map(id => id.split('@')[0]).join(', ')}`);
      }
      else if (msg.body === '!قفل') {
        await chat.setMessagesAdminsOnly(true);
        await msg.reply('🔒 تم قفل الجروب');
      }
      else if (msg.body === '!فتح') {
        await chat.setMessagesAdminsOnly(false);
        await msg.reply('🔓 تم فتح الجروب');
      }
    }
  } catch (error) {
    console.error('حدث خطأ:', error);
  }
});

client.initialize();

process.on('SIGINT', () => {
  client.destroy();
  console.log('✋ تم إيقاف البوت');
  process.exit();
});

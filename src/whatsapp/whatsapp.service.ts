import { Injectable } from '@nestjs/common';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { Client, LocalAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';
import { menu } from './consts/menu';
import * as path from 'path';
import * as fs from 'fs';
import { promises } from 'dns';
import { ResDTO } from 'src/shared/consts/res.dto';
import { WhatsappMsgDto } from './dto/whatsapp-msg.dto';

@Injectable()
export class WhatsappService {
  private authPath = path.resolve(__dirname, '../..', 'private', 'wpp-auth');

  private client: Client = new Client({
    authStrategy: new LocalAuth({
      clientId: 'CLIENT_ID',
      dataPath: this.authPath,
    }),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox'],
    },
  });

  constructor() {
    /* 
    this.removeAuth(); */
    this.initialize();
  }

  removeAuth() {
    // * remove folder data/auth
    fs.rmdirSync(this.authPath, { recursive: true });
  }

  initialize() {
    this.client.on('qr', (qr) => {
      // Generate and scan this code with your
      try {
        qrcode.generate(qr, { small: true });
      } catch (e) {
        console.log(e);
      }
    });

    this.client.on('ready', () => {
      console.log('Client is ready!');
    });

    this.client.on('message', (msg) => {
      if (msg.body != null) {
        msg.reply('Por favor, não responda esse número, pois é somente para enviar mensagens automaticas.');
      }

    });

    this.client.initialize();
  }

  transformPhoneNumber(phoneNumber: string) {
    return `55${phoneNumber.replace(/\D/g, '')}@c.us`;
  }

  async enviarMensagem(msg: WhatsappMsgDto): Promise<ResDTO> {
    console.log(this.transformPhoneNumber(msg.numero));
    try {
      
      const resultado = await this.client.sendMessage(this.transformPhoneNumber(msg.numero), msg.msg);
      
    } catch (error) {
      return<ResDTO>{
        success: false,
        message: 'Houve um erro no serviço ao enviar a mensagem'+error
      }
    }
    
  }


}

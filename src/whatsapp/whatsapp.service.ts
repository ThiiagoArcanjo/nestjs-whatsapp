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
      if (msg.body == '!ping') {
        msg.reply('pong');
      }
      // * phone number format: 11 987654321
      // * transform to 5511987654321@c.us
      /* this.client.sendMessage(this.transformPhoneNumber('11 941666617'), 'pong'); */
    });

    this.client.initialize();
  }

  transformPhoneNumber(phoneNumber: string) {
    return `55${phoneNumber.replace(/\D/g, '')}@c.us`;
  }

  async enviarMensagem(sistema, celular, msg): Promise<ResDTO> {
    try {
      const resultado = this.client.sendMessage(this.transformPhoneNumber(celular), msg);
      console.log(resultado);
    } catch (error) {
      return<ResDTO>{
        success: false,
        message: 'Houve um erro ao enviar a mensagem'+error
      }
    }
    
  }

  sendMessage(celular, msg){
    this.client.sendMessage(this.transformPhoneNumber(celular), msg);
  }
}

import { Res } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { CreateWhatsappDto } from './dto/create-whatsapp.dto';
import { UpdateWhatsappDto } from './dto/update-whatsapp.dto';
import { ResDTO } from 'src/shared/consts/res.dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) { }

  @Get()
  async findAll() {
    console.log('findAll()');
    return [];
  }

  @Get('enviar-mensagem/:sistema/:celular/:msg')
  async enviarMensagem(
    @Param('sistema') sistema: string,
    @Param('celular') celular: string,
    @Param('msg') msg: string,
  ): Promise<ResDTO> {
    try {
     
     return await this.whatsappService.enviarMensagem(sistema, celular, msg);
 
    } catch (error) {
      return <ResDTO>{
        success: false,
        message: 'Houve um erro ao enviar a mensagem: ' + error,
      }
    }

  }


  @Get('enviar-mensagem2/:celular/:msg')
  enviarMensagem2(
    @Param('celular') celular: string,
    @Param('msg') msg: string,
  ) {
    try {
      console.log(celular);
      console.log(msg);
      this.whatsappService.sendMessage(celular, msg);
 
    } catch (error) {
      return <ResDTO>{
        success: false,
        message: 'Houve um erro ao enviar a mensagem: ' + error,
      }
    }

  }
}

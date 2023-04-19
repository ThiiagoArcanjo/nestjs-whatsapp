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
import { WhatsappMsgDto } from './dto/whatsapp-msg.dto';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) { }
  
  /* Enviando mensagem para o cliente*/
  @Post('enviar-mensagem')
  async enviarMensagem(
    @Body() msg: WhatsappMsgDto,
  ): Promise<ResDTO> {
    try {
     return await this.whatsappService.enviarMensagem(msg);
 
    } catch (error) {
      return <ResDTO>{
        success: false,
        message: 'Houve um erro no controller ao enviar a mensagem: ' + error,
      }
    }

  }

}

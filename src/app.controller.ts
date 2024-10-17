import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { newNezoDto } from './nezok.Dto';
import { Response } from 'express';
import { isDate } from 'util/types';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('foglalas')
  @Render('foglalas')
  getFoglalas(){
    return{
      errors: [],
      data: []
    }
  }  


  @Post('foglalas')
  newNezo(@Body()  foglalasdata : newNezoDto,
    @Res() response : Response
    ){
      var toDate = new Date();
    const errors: string[] = [];
    if(!foglalasdata.nev || !foglalasdata.email || !foglalasdata.datum || !foglalasdata.nezoksz){
      errors.push('Minden mezőt meg kell adnia!')
    }
    if(typeof foglalasdata.nezoksz == "number"){
      errors.push('A nézőket számmal kell megadni')
    }
    if(typeof foglalasdata.nev == 'number'){
      errors.push('A nevet nem számmal kell megadnia')
    }
    if (!foglalasdata.email.includes("@")){
      errors.push('Nem helyes az email cím megadása')
    }
    if (foglalasdata.nezoksz > 10){
      errors.push('Max 10 néző lehet egy rendelésben')
    }
    if (new Date(foglalasdata.datum).getTime()< toDate.getTime()){
      errors.push('Nem lehet a múltba foglalni')
    }
    if(errors.length > 0){
    response.render('foglalas',{
      errors,
      data:foglalasdata
    });  
    }
  response.redirect(303,"success")
  }

@Get('success')
@Render('success')
getSuccess(){

}

}

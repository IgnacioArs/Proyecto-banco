import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, HttpStatusCode } from 'axios';
import { map } from 'rxjs';

@Injectable()
export class AccountService {
  url = this.configService.get('MS');

  constructor(
    private readonly configService: ConfigService,
    private readonly  httpService:HttpService          
  ){}

  async create(createAccountDto:CreateAccountDto):Promise<any> {
    const requestConfig:AxiosRequestConfig={};
    return this.httpService
    .post(`${this.url}/account`,createAccountDto,requestConfig)
    .pipe(
      map(response => {
        if(response.status === HttpStatus.CREATED){
          return{
            statuscode:response.status,
            message:'Cuenta creada',
            data:response.data
          }
        }else{
          return {
            statuscode:response.status,
            message:'Error al crear la cuenta'+response.data
          }
        }
      })
    )
  }

  async findAll():Promise<any> {
    const requestConfig:AxiosRequestConfig={};
    return this.httpService
    .get(`${this.url}/account`,requestConfig)
    .pipe(
      map(response => {
        if(response.status === HttpStatus.OK){
          return {
              statusCode: response.status,
              message:'OK',
              data: response.data
          }
        }else{
          return {
            statusCode: response.status,
            message:'Error al buscar las cuentas'
          }
        }
      })
    )
  }

  async findOne(id: number) {
    const requestConfig:AxiosRequestConfig={};
    return this.httpService
    .get(`${this.url}/account/${id}`,requestConfig)
    .pipe(
      map(response =>{
        if(response.status === HttpStatus.OK){
          return {
              statusCode:response.status,
              message:'Se ha encontrado la cuenta',
              data:response.data
          }
        }else{
          return {
              status:response.status,
              message:`Error al encontrar la cuenta con el id:${id}`
          }
        }
      })
    )
  }

  async update(id: number, updateAccountDto: CreateAccountDto) {
    const requestConfig:AxiosRequestConfig={};
    return this.httpService
    .patch(`${this.url}/account/${id}`,updateAccountDto,requestConfig)
    .pipe(
      map(response =>{
        if(response.status === HttpStatus.OK){
            return{
              statusCode:response.status,
              message:'Cuenta actualizada',
              data:response.data
            }
        }else{
            return {
              statusCode:response.status,
              message:`Error al actualizar el numero de cuenta:${id}`
            }
        }
      })
    )
  }

  async remove(id: number) {
    const requestConfig:AxiosRequestConfig={};
    return this.httpService
    .delete(`${this.url}/account/${id}`,requestConfig)
    .pipe(
      map(response =>{
        if(response.status === HttpStatus.OK){
            return{
                statusCode: response.status,
                message:'Cuenta eliminada',
                data:response.data
            }
        }else{
            return{
                statusCode:response.status,
                message:`La cuenta con el numero id:${id}`
            }
        }
      })
    )
  }
}

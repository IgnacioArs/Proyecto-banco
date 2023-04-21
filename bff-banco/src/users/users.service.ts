import { HttpStatus, Injectable,HttpException } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import {ConfigService} from '@nestjs/config'
import { HttpService } from '@nestjs/axios/dist';
import { map } from 'rxjs';

@Injectable()
export class UsersService {
  url = this.configService.get('MS');

  constructor(
    private readonly httpService:HttpService,
    private readonly configService:ConfigService
  ){}

  async create(createUserDto: CreateUserDto): Promise<any>{
    const requestConfig:AxiosRequestConfig={};
    return this.httpService
    .post(`${this.url}/users`,createUserDto,requestConfig)
    .pipe(
      map(response => {
        if(response.status === HttpStatus.CREATED){
          return{
            statuscode:response.status,
            message:'Usuario Creado',
            data:response.data
          }
        }else{
          return {
            statuscode:response.status,
            message:'Error al crear el usuario'+response.data
          }
        }
      })
    )
  }

 async findAll():Promise<any> {
  const requestConfig:AxiosRequestConfig={};
  return this.httpService
  .get(`${this.url}/users`,requestConfig)
  .pipe(map(response =>{
    if(response.status=== HttpStatus.OK){
      return{
        statusCode:response.status,
        message:'OK',
        data:response.data
      }
    }else{
      return{
        statusCode:response.data,
        message:'Hubo un error al encontrar a los usuarios'+response.data,
      }
    }
  }))
  }

 async findOne(id: number):Promise<any> {
  const requestConfig:AxiosRequestConfig={};
  return this.httpService
  .get(`${this.url}/users/${id}`,requestConfig)
  .pipe(
    map(response => {
      if(response.status === HttpStatus.OK){
          return{
            statusCode: response.status,
            message:'Usuario encontrado',
            data:response.data
          }
      }else{
          return{
            statusCode:response.status,
            message: `Hubo un problema al buscar el código de el usuario: ${id}`,
          }
      }
    })
  )
  }



  async getUserBySession(email: string , password: string):Promise<any>{
    const requestConfig:AxiosRequestConfig={};
    return this.httpService
    .get(`${this.url}/users/session/${email}/${password}`,requestConfig)
    .pipe(
      map(response => {
       /*  console.log("VIENDO QUE TRAE CUANDO NO ENVIO EMAIL",response); */
        if(response.status === HttpStatus.OK && response.data !=''){
            console.log(response.data)
            return{
              statusCode: response.status,
              message: new HttpException("ACCEPTED",HttpStatus.ACCEPTED),
              data:response.data
            }
        }else if(response.data ===''){
          return{
            statusCode:204,
            message: new HttpException("NO_CONTENT",HttpStatus.NO_CONTENT),
          }
        }else{
          return{
            statusCode:response.status,
            message: new HttpException("PASSWORD_INVALID",HttpStatus.FORBIDDEN),
          }
        }
      })
    )
  }


  async getUserByEmail(email:string):Promise<any> {
    const requestConfig:AxiosRequestConfig={};
    return this.httpService
    .get(`${this.url}/users/verificacion/${email}`,requestConfig)
    .pipe(
      map(response => {
        if(response.status === HttpStatus.OK){
            return{
              statusCode: response.status,
              message:'Usuario encontrado por email',
              data:response.data
            }
        }else{
            return{
              statusCode:response.status,
              message: `Hubo un problema al usuario por email: ${email}`,
            }
        }
      })
    )
    }

  
 async update(id: number, updateUserDto: UpdateUserDto):Promise<any> {
        const requestConfig:AxiosRequestConfig={};
        return this.httpService
        .patch(`${this.url}/users/${id}`, updateUserDto,requestConfig)
        .pipe(
          map(response =>{
            if(response.status === HttpStatus.OK){
                return{
                  statusCode:response.status,
                  message:'Usuario actualizado',
                  data:response.data
                } 
            }else{
                return{
                  statusCode:response.status,
                  message:'Error al actualizar el usuario con el id:'+response.status
                }
            }
          })
        )
  }

 async remove(id: number):Promise<any> {
  const requestConfig:AxiosRequestConfig={};
  return this.httpService
  .patch(`${this.url}/users/${id}`,requestConfig)
  .pipe(
    map(response =>{
      if(response.status === HttpStatus.OK){
         return{
          statusCode: response.status,
          message:'OK',
          data:response.data
         }
      }else{
         return{
            statusCode:response.status,
            message:`Hubo un problema al eliminar un usuario con el id:${id}`
         }
      }
    })
  )

  }
}

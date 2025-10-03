import { Injectable } from '@nestjs/common';
import { AUTH_PROVIDERS, User } from 'generated/prisma';

@Injectable()
export class MessageService {

    private readonly messages = {
        login: 'Inicio de sesión exitoso, bienvenido',
        logout: 'Cierre de sesión exitoso',
        created: 'Usuario creado con éxito, revisa tu correo electrónico para confirmar tu cuenta',
        accountConfirmed: 'Cuenta confirmada con éxito, ahora puedes iniciar sesión',
        request: 'El token para confirmar tu cuenta fue enviado a tu correo electrónico',
        forgot: 'El token para restablecer tu cuenta fue enviado a tu correo electrónico',
        recover: 'Contraseña cambiada con éxito',
        check: 'Se ha enviado un token a tu correo electrónico para confirmar tu acceso.',
        success: 'Por favor ingresa tu contraseña para confirmar tu acceso.',
        tokenValidated: 'Token validado con éxito, continúa para cambiar tu contraseña.',
        accountCompleted: 'Cuenta completada con éxito, bienvenido'
    }


    welcome(name: User['name']) {
        return `${this.messages.login} ${name}`
    }

    created() {
        return this.messages.created
    }

    accountConfirmed() {
        return this.messages.accountConfirmed
    }

    request() {
        return this.messages.request
    }

    forgot() {
        return this.messages.forgot
    }

    recover() {
        return this.messages.recover
    }

    success() {
        return this.messages.success
    }

    tokenValidated() {
        return this.messages.tokenValidated
    }

    accountCompleted() {
        return this.messages.accountCompleted
    }

    checkEmail(provider: User['authProvider']) {
        return provider === AUTH_PROVIDERS.GOOGLE ? this.messages.check : this.messages.success
    }

    profileIncomplete() {
        return 'Completa tu perfil para continuar con tu app'
    }

    logout() {
        return this.messages.logout
    }
}


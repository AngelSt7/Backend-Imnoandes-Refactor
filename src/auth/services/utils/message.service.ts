import { Injectable } from '@nestjs/common';
import { AUTH_PROVIDERS, User } from 'generated/prisma';

@Injectable()
export class MessageService {

    private readonly messages = {
        login: 'Login successful, welcome',
        logout: 'Logout successful',
        created: 'User created successfully, check your email to confirm your account',
        accountConfirmed: 'Account confirmed successfully, you can now login',
        request: 'The token to confirm your account was sent to your email',
        forgot: 'The token to reset your account was sent to your email',
        recover: 'Password changed successfully',
        check: 'A token has been sent to your email to confirm your access.',
        success: 'Please enter your password to confirm your access.',
        tokenValidated: 'Token validated successfully, contineue to change your password.',
        accountCompleted: 'Account completed successfully, welcome'
    }
    
    welcome(name: User['name']){
        return `${this.messages.login} ${name}`
    }

    created(){
        return this.messages.created
    }

    accountConfirmed(){
        return this.messages.accountConfirmed
    }

    request(){
        return this.messages.request
    }

    forgot(){
        return this.messages.forgot
    }

    recover(){
        return this.messages.recover
    }

    success(){
        return this.messages.success
    }

    tokenValidated(){
        return this.messages.tokenValidated
    }

    accountCompleted(){
        return this.messages.accountCompleted
    }

    checkEmail(provider: User['authProvider']){
        return provider === AUTH_PROVIDERS.GOOGLE ? this.messages.check : this.messages.success
    }
}


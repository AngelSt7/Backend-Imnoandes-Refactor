import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';

@Injectable()
export class MessageService {

    private readonly messages = {
        login: 'Login successful, welcome',
        logout: 'Logout successful',
        created: 'User created successfully, check your email to confirm your account',
        accountConfirmed: 'Account confirmed successfully, you can now login',
        request: 'The token to confirm your account was sent to your email',
        forgot: 'The token to reset your account was sent to your email',
        recover: 'Password changed successfully'
    }
    
    welcome(name: User['name']){
        return `${this.messages.login}' '${name}`
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
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Token } from '../entities/token.entity';

@Injectable()
export class TokenService {
    constructor(
        // @InjectModel(Token.name)
        // private readonly tokenModel: Model<Token>,
    ) { }


    public async upsertToken(userId: Types.ObjectId): Promise<string> {
        // const token = this.generateToken();

        // const existing = await this.tokenModel.findOne({ userId });

        // if (existing) {
        //     await this.tokenModel.updateOne(
        //         { userId },
        //         { token, createdAt: new Date() }
        //     );
        // } else {
        //     await this.tokenModel.create({ userId, token });
        // }

        return "a";
    }

    public async validToken(token: Token['token']) {
        // const tokenDB = await this.tokenModel.findOne({ token: token })
        // if (!tokenDB) throw new NotFoundException('Token not found, request a new one')
        // return tokenDB.userId
    }

    public generateToken() {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }

    public async deleteToken(token: Token['token']) {
        // return await this.tokenModel.deleteOne({ token: token })
    }
}

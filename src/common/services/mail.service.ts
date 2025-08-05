import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) { }

  onModuleInit() {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: +this.configService.get('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendAccountConfirmationEmail(to: string, token: string, name: string) {
    await this.transporter.sendMail({
      from: `"Nest App" <${this.configService.get('SMTP_USER')}>`,
      to,
      subject: "Nest App - Confirma tu cuenta",
      html: ` <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #444; text-align: center;">¡Bienvenido a Nest App, ${name}!</h2>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        Has creado tu cuenta en <strong>Nest App</strong>, ¡ya casi está todo listo! Solo debes confirmar tu cuenta para poder comenzar a usarla.
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        Para confirmar tu cuenta, visita el siguiente enlace:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="/auth/confirm/${token}" 
                            style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">
                            Confirmar Cuenta
                        </a>
                    </div>
                    <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0;">
                        ${token}
                    </div>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        <strong>Nota:</strong> Este token expira en 10 minutos.
                    </p>
                    <p style="text-align: center; color: #999; font-size: 14px; margin-top: 20px;">
                        Si no has solicitado esta cuenta, puedes ignorar este mensaje.
                    </p>
                </div>
            </div>

            `
    });
  }

  async sendPasswordResetEmail(to: string, token: string, name: string) {
    await this.transporter.sendMail({
      from: `"Nest App" <${this.configService.get('SMTP_USER')}>`,
      to,
      subject: "Nest App - Recupera tu acceso",
      html: ` <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
              <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #444; text-align: center;">Hola, ${name}</h2>
                <p style="font-size: 16px; line-height: 1.5; color: #555;">
                  Hemos recibido una solicitud para restablecer tu contraseña en <strong>Nest App</strong>.
                </p>
                <p style="font-size: 16px; line-height: 1.5; color: #555;">
                  Si fuiste tú quien hizo esta solicitud, puedes continuar el proceso haciendo clic en el siguiente botón:
                </p>
                <div style="text-align: center; margin: 20px 0;">
                  <a href="/auth/forgot/${token}" 
                      style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">
                      Restablecer contraseña
                  </a>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0;">
                  ${token}
                </div>
                <p style="font-size: 16px; line-height: 1.5; color: #555;">
                  <strong>Importante:</strong> Este código expirará en 10 minutos por motivos de seguridad.
                </p>
                <p style="text-align: center; color: #999; font-size: 14px; margin-top: 20px;">
                  Si no solicitaste este cambio, puedes ignorar este mensaje. Tu cuenta seguirá segura.
                </p>
              </div>
            </div>
            `
    });
  }
}

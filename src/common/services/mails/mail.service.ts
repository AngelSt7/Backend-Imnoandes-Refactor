import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { envs } from '@/config';

interface Token {
  id: string;
  token: string;
}

@Injectable()
export class MailService {

  private readonly resend = new Resend(envs.resendApiKey);
  private readonly frontendUrl = envs.frontendUrl;

  async sendAccountConfirmationEmail(to: string, token: Token, name: string) {
    const url = `${this.frontendUrl}/auth/confirmar-cuenta/${token.id}`;
    await this.resend.emails.send({
      from: 'ImnoAndes <onboarding@resend.dev>',
      to,
      subject: 'ImnoAndes - Confirma tu cuenta',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #444; text-align: center;">¡Bienvenido a ImnoAndes, ${name}!</h2>
              <p style="font-size: 16px; line-height: 1.5; color: #555;">
                  Has creado tu cuenta en <strong>ImnoAndes</strong>, ¡ya casi está todo listo! Solo debes confirmar tu cuenta para poder comenzar a usarla.
              </p>
              <p style="font-size: 16px; line-height: 1.5; color: #555;">
                  Para confirmar tu cuenta, visita el siguiente enlace:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                  <a href="${url}" 
                      style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">
                      Confirmar Cuenta
                  </a>
              </div>
              <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0;">
                  ${token.token}
              </div>
              <p style="font-size: 16px; line-height: 1.5; color: #555;">
                  <strong>Nota:</strong> Este token expira en 10 minutos.
              </p>
              <p style="text-align: center; color: #999; font-size: 14px; margin-top: 20px;">
                  Si no has solicitado esta cuenta, puedes ignorar este mensaje.
              </p>
          </div>
        </div>
      `,
    });
  }

  async sendPasswordResetEmail(to: string, token: Token, name: string) {
    const url = `${this.frontendUrl}/auth/recuperar-contraseña/${token.id}`;
    await this.resend.emails.send({
      from: 'ImnoAndes <onboarding@resend.dev>',
      to,
      subject: 'ImnoAndes - Recupera tu acceso',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #444; text-align: center;">Hola, ${name}</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Hemos recibido una solicitud para restablecer tu contraseña en <strong>ImnoAndes</strong>.
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Si fuiste tú quien hizo esta solicitud, puedes continuar el proceso haciendo clic en el siguiente botón:
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${url}" 
                  style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">
                  Restablecer contraseña
              </a>
            </div>
            <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0;">
              ${token.token}
            </div>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              <strong>Importante:</strong> Este código expirará en 10 minutos por motivos de seguridad.
            </p>
            <p style="text-align: center; color: #999; font-size: 14px; margin-top: 20px;">
              Si no solicitaste este cambio, puedes ignorar este mensaje. Tu cuenta seguirá segura.
            </p>
          </div>
        </div>
      `,
    });
  }

  async sendAccessConfirmationEmail(to: string, token: string, name: string) {
    await this.resend.emails.send({
      from: 'ImnoAndes <onboarding@resend.dev>',
      to,
      subject: 'ImnoAndes - Código de verificación de acceso',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #444; text-align: center;">Hola, ${name}</h2>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Hemos detectado un intento de acceso a tu cuenta de <strong>ImnoAndes</strong> desde un nuevo dispositivo o ubicación.
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Para verificar que eres tú, introduce el siguiente código en la aplicación:
            </p>
            <div style="text-align: center; font-size: 22px; font-weight: bold; margin: 20px 0; color: #222; letter-spacing: 2px;">
              ${token}
            </div>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              <strong>Importante:</strong> Este código expirará en 10 minutos por motivos de seguridad.
            </p>
            <p style="font-size: 14px; line-height: 1.5; color: #777; background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin: 15px 0;">
              💡 <strong>¿Por qué recibo este email?</strong><br>
              Tu cuenta está protegida con autenticación adicional. Este paso garantiza que solo tú puedas acceder a tu información.
            </p>
            <p style="text-align: center; color: #999; font-size: 14px; margin-top: 20px;">
              Si no intentaste acceder a tu cuenta, por favor ignora este mensaje o contacta con nuestro soporte.
            </p>
          </div>
        </div>
      `,
    });
  }
}

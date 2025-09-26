import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactEmailDto, RequestInfoEmailDto } from '@/modules/email/dto';

interface Token {
  id: string
  token: string
}

@Injectable()
export class MailService {

  constructor(
    @Inject('MAIL_TRANSPORTER') private readonly transporter: nodemailer.Transporter,
    private readonly configService: ConfigService
  ) { }

  async requestInfo(dto: RequestInfoEmailDto) {
    await this.transporter.sendMail({
      from: `"ImnoAndes" <${this.configService.get('SMTP_USER')}>`,
      to: dto.email,
      subject: "ImnoAndes - Hemos recibido tu solicitud de información",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #444; text-align: center;">✅ ¡Solicitud recibida exitosamente!</h2>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50;">
            <p style="margin: 0; font-size: 16px; color: #2e7d32;">
              <strong>¡Hola ${dto.fullName}!</strong><br>
              Hemos recibido tu solicitud de información y nos pondremos en contacto contigo muy pronto.
            </p>
          </div>

          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196F3;">
            <h3 style="margin: 0 0 10px 0; color: #333;">📋 Resumen de tu solicitud:</h3>
            <p style="margin: 5px 0; font-size: 16px;"><strong>Nombre:</strong> ${dto.fullName}</p>
            <p style="margin: 5px 0; font-size: 16px;"><strong>Email:</strong> ${dto.email}</p>
            <p style="margin: 5px 0; font-size: 16px;"><strong>Teléfono:</strong> +51 ${dto.phone}</p>
          </div>

          <div style="background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #333;">💬 Tu mensaje:</h3>
            <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0; white-space: pre-line; font-style: italic;">"${dto.message}"</p>
          </div>

          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h3 style="margin: 0 0 10px 0; color: #333;">⏰ ¿Qué sigue ahora?</h3>
            <ul style="margin: 10px 0; padding-left: 20px; color: #856404;">
              <li style="margin: 8px 0;">Nuestro equipo revisará tu solicitud</li>
              <li style="margin: 8px 0;">Te contactaremos en las próximas <strong>24 horas</strong></li>
              <li style="margin: 8px 0;">Te proporcionaremos toda la información que necesitas</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 25px 0;">
            <div style="display: inline-block; padding: 15px; background-color: #f0f8ff; border-radius: 8px; border: 2px solid #4CAF50;">
              <p style="margin: 0; color: #2e7d32; font-size: 16px; font-weight: bold;">
                📞 Horarios de contacto: Lunes a Viernes 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #1565c0; text-align: center;">
              💡 <strong>Mientras tanto:</strong> Puedes explorar más propiedades en nuestro sitio web o seguirnos en redes sociales para las últimas novedades
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
          
          <p style="text-align: center; color: #999; font-size: 14px; margin: 10px 0;">
            Gracias por confiar en <strong>ImnoAndes</strong><br>
            Tu plataforma de confianza para bienes raíces
          </p>
          
          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 15px;">
            Este es un mensaje automático, no es necesario que respondas a este email.<br>
            Si tienes alguna pregunta urgente, contáctanos directamente.
          </p>
        </div>
      </div>
    `
    });
  }

  async contactOwner(dto: ContactEmailDto) {
    await this.transporter.sendMail({
      from: `"ImnoAndes" <${this.configService.get('SMTP_USER')}>`,
      to: dto.ownerEmail,
      subject: "ImnoAndes - Nueva consulta sobre tu propiedad",
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #444; text-align: center;">📧 Nueva consulta sobre tu propiedad</h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Información del interesado:</h3>
            <p style="margin: 5px 0; font-size: 16px;"><strong>Nombre:</strong> ${dto.fullName}</p>
            <p style="margin: 5px 0; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${dto.email}" style="color: #4CAF50; text-decoration: none;">${dto.email}</a></p>
            <p style="margin: 5px 0; font-size: 16px;"><strong>Teléfono:</strong> <a href="tel:+51${dto.phone}" style="color: #4CAF50; text-decoration: none;">+51 ${dto.phone}</a></p>
            <p style="margin: 5px 0; font-size: 16px;"><strong>Dirección de interés:</strong> ${dto.address}</p>
          </div>

          <div style="background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
            <h3 style="margin: 0 0 15px 0; color: #333;">💬 Mensaje:</h3>
            <p style="font-size: 16px; line-height: 1.6; color: #555; margin: 0; white-space: pre-line;">${dto.message}</p>
          </div>

          <div style="text-align: center; margin: 25px 0;">
            <a href="mailto:${dto.email}?subject=Re: Consulta sobre propiedad en ${dto.address}" 
               style="display: inline-block; padding: 12px 25px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; margin-right: 10px;">
              📧 Responder por Email
            </a>
            <a href="tel:+51${dto.phone}" 
               style="display: inline-block; padding: 12px 25px; background-color: #2196F3; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">
              📞 Llamar
            </a>
          </div>

          <div style="background-color: #e8f5e8; padding: 12px; border-radius: 5px; margin: 20px 0;">
            <p style="font-size: 14px; color: #2e7d32; margin: 0; text-align: center;">
              💡 <strong>Tip:</strong> Responde pronto para no perder esta oportunidad de negocio
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
          
          <p style="text-align: center; color: #999; font-size: 14px; margin: 10px 0;">
            Este mensaje fue enviado a través de <strong>ImnoAndes</strong><br>
            Plataforma de gestión inmobiliaria
          </p>
          
          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 15px;">
            Si tienes problemas con los enlaces, copia y pega la información de contacto directamente.
          </p>
        </div>
      </div>
    `
    });
  }

  async sendAccountConfirmationEmail(to: string, token: Token, name: string) {
    await this.transporter.sendMail({
      from: `"ImnoAndes" <${this.configService.get('SMTP_USER')}>`,
      to,
      subject: "ImnoAndes - Confirma tu cuenta",
      html: ` <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #444; text-align: center;">¡Bienvenido a ImnoAndes, ${name}!</h2>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        Has creado tu cuenta en <strong>ImnoAndes</strong>, ¡ya casi está todo listo! Solo debes confirmar tu cuenta para poder comenzar a usarla.
                    </p>
                    <p style="font-size: 16px; line-height: 1.5; color: #555;">
                        Para confirmar tu cuenta, visita el siguiente enlace:
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="/auth/confirm-account/${token.id}" 
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

            `
    });
  }

  async sendPasswordResetEmail(to: string, token: Token, name: string) {
    await this.transporter.sendMail({
      from: `"ImnoAndes" <${this.configService.get('SMTP_USER')}>`,
      to,
      subject: "ImnoAndes - Recupera tu acceso",
      html: ` <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
              <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #444; text-align: center;">Hola, ${name}</h2>
                <p style="font-size: 16px; line-height: 1.5; color: #555;">
                  Hemos recibido una solicitud para restablecer tu contraseña en <strong>ImnoAndes</strong>.
                </p>
                <p style="font-size: 16px; line-height: 1.5; color: #555;">
                  Si fuiste tú quien hizo esta solicitud, puedes continuar el proceso haciendo clic en el siguiente botón:
                </p>
                <div style="text-align: center; margin: 20px 0;">
                  <a href="http://localhost:3000/auth/recover-password/${token.id}" 
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
            `
    });
  }

  async sendAccessConfirmationEmail(to: string, token: string, name: string) {
    await this.transporter.sendMail({
      from: `"ImnoAndes" <${this.configService.get('SMTP_USER')}>`,
      to,
      subject: "ImnoAndes - Confirma tu acceso",
      html: ` <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #444; text-align: center;">Hola, ${name}</h2>
              <p style="font-size: 16px; line-height: 1.5; color: #555;">
                Hemos detectado un intento de acceso a tu cuenta de <strong>ImnoAndes</strong> desde un nuevo dispositivo o ubicación.
              </p>
              <p style="font-size: 16px; line-height: 1.5; color: #555;">
                Como tu cuenta está vinculada con Google, necesitamos verificar que eres tú quien está intentando acceder.
              </p>
              <p style="font-size: 16px; line-height: 1.5; color: #555;">
                Para confirmar tu acceso, haz clic en el siguiente botón:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="/auth/verify-access/${token}" 
                    style="display: inline-block; padding: 10px 20px; background-color: #4285F4; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">
                    Confirmar Acceso
                </a>
              </div>
              <div style="text-align: center; font-size: 18px; font-weight: bold; margin: 20px 0;">
                ${token}
              </div>
              <p style="font-size: 16px; line-height: 1.5; color: #555;">
                <strong>Importante:</strong> Este código de verificación expirará en 10 minutos por motivos de seguridad.
              </p>
              <p style="font-size: 14px; line-height: 1.5; color: #777; background-color: #f9f9f9; padding: 10px; border-radius: 5px; margin: 15px 0;">
                💡 <strong>¿Por qué recibo este email?</strong><br>
                Tu cuenta está protegida con autenticación de Google. Este paso adicional garantiza que solo tú puedas acceder a tu información.
              </p>
              <p style="text-align: center; color: #999; font-size: 14px; margin-top: 20px;">
                Si no intentaste acceder a tu cuenta, por favor ignora este mensaje o contacta con nuestro soporte.
              </p>
            </div>
          </div>
          `
    });
  }
}

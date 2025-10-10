import { ContactEmailDto, RequestInfoEmailDto } from '@/modules/email/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

interface Token {
  id: string
  token: string
}

@Injectable()
export class MailService {

  constructor(
    @Inject('RESEND_CLIENT') private readonly resend: Resend,
    private readonly configServiceA: ConfigService,
    private readonly configService: ConfigService
  ) { }

  async requestInfo(dto: RequestInfoEmailDto) {
    await this.resend.emails.send({
      from: 'ImnoAndes <noreply@imnoandes.com>',
      to: dto.email,
      subject: 'ImnoAndes - Hemos recibido tu solicitud de información',
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
    `,
    });
  }


  async contactOwner(dto: ContactEmailDto) {
    await this.resend.emails.send({
      from: 'ImnoAndes <onboarding@resend.dev>',
      to: dto.ownerEmail,
      subject: 'ImnoAndes - Nueva consulta sobre tu propiedad',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #444; text-align: center;">📧 Nueva consulta sobre tu propiedad</h2>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4CAF50;">
              <h3 style="margin: 0 0 10px 0; color: #333;">Información del interesado:</h3>
              <p><strong>Nombre:</strong> ${dto.fullName}</p>
              <p><strong>Email:</strong> <a href="mailto:${dto.email}">${dto.email}</a></p>
              <p><strong>Teléfono:</strong> <a href="tel:+51${dto.phone}">+51 ${dto.phone}</a></p>
              <p><strong>Dirección de interés:</strong> ${dto.address}</p>
            </div>
            <div style="background-color: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #333;">💬 Mensaje:</h3>
              <p style="font-size: 16px; line-height: 1.6; color: #555; white-space: pre-line;">${dto.message}</p>
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
          </div>
        </div>
      `,
    });
  }

}

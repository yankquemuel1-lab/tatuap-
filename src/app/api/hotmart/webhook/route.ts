import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase-admin'

const SENHA_TEMPORARIA = 'mudesuasenha123'

export async function POST(request: NextRequest) {
  try {
    // 1. Ler o payload da Hotmart
    const body = await request.json()

    // 2. Validar o hottok — no v2.0.0 ele vem dentro do body
    const hottok = body?.hottok
    if (hottok !== process.env.HOTMART_HOTTOK) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const evento = body?.event

    // Só processa compras aprovadas
    if (evento !== 'PURCHASE_APPROVED') {
      return NextResponse.json({ message: 'Evento ignorado' }, { status: 200 })
    }

    const email: string = body?.data?.buyer?.email
    const nome: string = body?.data?.buyer?.name ?? 'Explorador'

    if (!email) {
      return NextResponse.json({ error: 'Email não encontrado no payload' }, { status: 400 })
    }

    // 3. Criar usuário no Supabase
    const { error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: SENHA_TEMPORARIA,
      email_confirm: true,
      user_metadata: { full_name: nome },
    })

    // Se o usuário já existe, não é erro — só continua para enviar o email
    if (createError && !createError.message.includes('already been registered')) {
      console.error('Erro ao criar usuário:', createError.message)
      return NextResponse.json({ error: createError.message }, { status: 500 })
    }

    // 4. Enviar email de boas-vindas com as credenciais
    const resend = new Resend(process.env.RESEND_API_KEY)
    const primeiroNome = nome.split(' ')[0]
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://tatuape.com.br'

    await resend.emails.send({
      from: 'Tatuapé <tatuape@produto-oficial.site>',
      to: email,
      subject: '🎉 Seu acesso ao Tatuapé chegou!',
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; background: #f8f6f6; padding: 32px; border-radius: 16px;">
          <h1 style="color: #e2715a; font-size: 24px; margin-bottom: 8px;">Olá, ${primeiroNome}! 🎉</h1>
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Seu acesso ao <strong>Tatuapé</strong> está pronto. Use os dados abaixo para entrar no app:
          </p>

          <div style="background: #fff; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #e2715a;">
            <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Login (e-mail)</p>
            <p style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 16px; font-weight: bold;">${email}</p>
            <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Senha temporária</p>
            <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: bold;">${SENHA_TEMPORARIA}</p>
          </div>

          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            ⚠️ Por segurança, troque sua senha assim que entrar pela primeira vez.
          </p>

          <a href="${appUrl}" style="display: inline-block; background: #e2715a; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-size: 16px; font-weight: bold; margin-top: 16px;">
            Acessar o Tatuapé →
          </a>

          <p style="color: #aaa; font-size: 12px; margin-top: 32px;">
            Dúvidas? Responda este e-mail que te ajudamos.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ message: 'Usuário criado e e-mail enviado com sucesso' }, { status: 200 })
  } catch (error) {
    console.error('Erro inesperado no webhook:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}

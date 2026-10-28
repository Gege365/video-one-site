export const WHATSAPP_NUMBER = '5534998335489'
export const WHATSAPP_DISPLAY = '(34) 99833-5489'

export const assistants = {
  john: {
    id: 'john',
    name: 'Jhon',
    role: 'Especialista em Cursos Online',
    taglineBefore: 'Converse com o Jhon para ',
    taglineHighlight: 'criar o seu curso online',
    taglineAfter: ' e fazer o seu lançamento',
    description:
      'Gravação, edição, posicionamento nas redes, organização do curso e lançamento — ele te guia do zero ao ar.',
    avatar: '/images/jhon.png',
    accent: 'purple',
    sheetKey: 'john_leads',
    cta: 'Falar com o Jhon para Criar meu Curso',
    greeting:
      'E aí! 👋 Sou o Jhon, da Video One. Vou te ajudar a entender como gravar e lançar o seu curso online. Bora?',
    questions: [
      {
        id: 'name',
        text: 'Primeiro, me conta: qual é o seu nome?',
        type: 'text',
        placeholder: 'Seu nome',
        field: 'nome',
      },
      {
        id: 'phone',
        text: 'Show, {nome}! Qual o melhor WhatsApp pra nossa equipe te chamar?',
        type: 'tel',
        placeholder: '(00) 00000-0000',
        field: 'telefone',
      },
      {
        id: 'niche',
        text: 'Qual é o tema ou nicho do curso que você quer lançar?',
        type: 'text',
        placeholder: 'Ex: finanças, marketing, saúde...',
        field: 'nicho',
      },
      {
        id: 'experience',
        text: 'Você já tem experiência gravando ou já lançou algum curso antes?',
        type: 'choice',
        field: 'experiencia',
        options: [
          'Nunca gravei, quero começar do zero',
          'Já gravei, mas quero profissionalizar',
          'Já lancei e quero escalar',
        ],
      },
      {
        id: 'content',
        text: 'O conteúdo do curso já está pronto (roteiro/aulas) ou ainda está em planejamento?',
        type: 'choice',
        field: 'conteudo',
        options: [
          'Conteúdo pronto, falta gravar',
          'Em planejamento',
          'Tenho só a ideia',
        ],
      },
      {
        id: 'format',
        text: 'Como você imagina o formato das aulas?',
        type: 'choice',
        field: 'formato',
        options: [
          'Falando pra câmera (estilo mentor)',
          'Slides + apresentação',
          'Mistura de formatos',
          'Ainda não sei',
        ],
      },
      {
        id: 'timeline',
        text: 'Em quanto tempo você gostaria de lançar o curso?',
        type: 'choice',
        field: 'prazo',
        options: [
          'O quanto antes (até 30 dias)',
          'Em 1 a 3 meses',
          'Ainda sem pressa',
        ],
      },
      {
        id: 'audience',
        text: 'Você já tem público nas redes ou precisa construir audiência pro lançamento?',
        type: 'choice',
        field: 'publico',
        options: [
          'Já tenho público engajado',
          'Tenho pouco público',
          'Estou começando do zero',
        ],
      },
      {
        id: 'platform',
        text: 'Já pensou em qual plataforma vai vender o curso?',
        type: 'choice',
        field: 'plataforma',
        options: [
          'Hotmart / Kiwify / Eduzz',
          'Plataforma própria',
          'Ainda não decidi — quero indicação',
        ],
      },
      {
        id: 'investment',
        text: 'Por último: qual faixa de investimento você imagina pra gravar + lançar com a gente?',
        type: 'choice',
        field: 'investimento',
        options: [
          'Até R$ 5 mil',
          'De R$ 5 a R$ 15 mil',
          'Acima de R$ 15 mil',
          'Quero conversar sobre valores',
        ],
      },
    ],
    closing:
      'Perfeito, {nome}! Anotei tudo. Vou mandar esse resumo pro WhatsApp da equipe Video One agora — eles te chamam pra continuar a conversa e fechar o próximo passo. Valeu demais! 🚀',
  },
  teo: {
    id: 'teo',
    name: 'Teo',
    role: 'Especialista em Sites',
    taglineBefore: 'Converse com o Teo para ',
    taglineHighlight: 'criar o seu site personalizado',
    taglineAfter: ' e captar leads',
    description:
      'Sites tecnológicos, landing pages e assistentes virtuais — visual premium feito para converter visitantes em clientes.',
    avatar: '/images/teo.png',
    accent: 'green',
    sheetKey: 'teo_leads',
    cta: 'Falar com o Teo para Criar meu Site',
    greeting:
      'Fala! 😎 Eu sou o Teo, da Video One. Vou te ajudar a desenhar o site ideal pro seu negócio — com visual premium e captação de leads. Bora nessa?',
    questions: [
      {
        id: 'name',
        text: 'Qual o seu nome?',
        type: 'text',
        placeholder: 'Seu nome',
        field: 'nome',
      },
      {
        id: 'phone',
        text: 'Beleza, {nome}! Me passa o WhatsApp pra nossa equipe te atender depois:',
        type: 'tel',
        placeholder: '(00) 00000-0000',
        field: 'telefone',
      },
      {
        id: 'business',
        text: 'Qual o nome do seu negócio ou projeto?',
        type: 'text',
        placeholder: 'Nome da empresa / projeto',
        field: 'negocio',
      },
      {
        id: 'segment',
        text: 'Em qual segmento você atua?',
        type: 'choice',
        field: 'segmento',
        options: [
          'Clínica / estética / saúde',
          'Advocacia',
          'Contabilidade / finanças',
          'Infoproduto / cursos',
          'Outro / empreendedor',
        ],
      },
      {
        id: 'siteType',
        text: 'Que tipo de site você precisa?',
        type: 'choice',
        field: 'tipo_site',
        options: [
          'Landing page de captura',
          'Site institucional completo',
          'Site com assistente virtual',
          'Ainda não sei — quero indicação',
        ],
      },
      {
        id: 'goal',
        text: 'Qual o principal objetivo do site?',
        type: 'choice',
        field: 'objetivo',
        options: [
          'Captar leads / WhatsApp',
          'Vender produto ou serviço',
          'Fortalecer a marca',
          'Agendar clientes',
        ],
      },
      {
        id: 'hasSite',
        text: 'Você já tem site hoje?',
        type: 'choice',
        field: 'tem_site',
        options: [
          'Não tenho',
          'Tenho, mas está desatualizado',
          'Tenho e quero redesenhar do zero',
        ],
      },
      {
        id: 'features',
        text: 'O que é indispensável no seu site?',
        type: 'choice',
        field: 'recursos',
        options: [
          'Assistente virtual / chat',
          'Integração com WhatsApp',
          'Agendamento online',
          'Tudo isso e mais',
        ],
      },
      {
        id: 'deadline',
        text: 'Qual o prazo ideal pra o site estar no ar?',
        type: 'choice',
        field: 'prazo',
        options: [
          'Urgente (até 15 dias)',
          'Em até 30–45 dias',
          'Sem prazo rígido',
        ],
      },
      {
        id: 'budget',
        text: 'Pra eu direcionar certo: qual faixa de investimento você considera?',
        type: 'choice',
        field: 'investimento',
        options: [
          'Até R$ 3 mil',
          'De R$ 3 a R$ 8 mil',
          'Acima de R$ 8 mil',
          'Quero uma proposta personalizada',
        ],
      },
    ],
    closing:
      'Fechado, {nome}! Resumo anotado. Vou enviar tudo pro WhatsApp da equipe Video One — eles te chamam já sabendo do projeto pra avançar no fechamento. Valeu! 💚',
  },
}

export function buildWhatsAppSummary(assistant, answers) {
  const lines = [
    `*Novo lead — ${assistant.name} (${assistant.role})*`,
    '',
    ...Object.entries(answers).map(([key, value]) => {
      const label = key.replace(/_/g, ' ')
      return `• *${label}:* ${value}`
    }),
    '',
    '_Lead captado pelo site Video One_',
  ]
  return lines.join('\n')
}

export function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

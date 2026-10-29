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
    sheetKey: 'Jhon',
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
          'Slides de Apresentação + Aula',
          'Aula mais dinâmica - Ideal para Cursos de Estética com Pacientes Modelos.',
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
    sheetKey: 'Teo',
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
          'Clínica / estética / Medicina / saúde',
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
          'Landing page de captura com redirecionamento (Site Simples)',
          'Site com assistente virtual para captar os Leads (Site Padrão)',
          'Site institucional completo com Assistente e Especificidades (Site Premium)',
          'Ainda não sei — quero indicação',
        ],
      },
      {
        id: 'goal',
        text: 'Qual o principal objetivo do site?',
        type: 'choice',
        field: 'objetivo',
        options: [
          'Redirecionar Leads para WhatsApp',
          'Receber os leads com uma Assistente Virtual e encaminhar',
          'Vender produto ou serviço',
          'Fortalecer a marca',
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

export function createAttendanceId(assistant) {
  const code = assistant.id === 'teo' ? 'TEO' : 'JHON'
  const now = new Date()
  const stamp = [
    now.getFullYear().toString().slice(-2),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
  ].join('')
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `VO-${code}-${stamp}-${suffix}`
}

export function buildWhatsAppSummary(assistant, answers, attendanceId) {
  const nome = (answers.nome || '').trim() || '—'
  const purpose =
    assistant.id === 'teo'
      ? 'criação do meu site'
      : 'criação do meu curso'

  return [
    `Olá. Acabei de falar com o ${assistant.name} no site para a ${purpose}.`,
    'E quero continuar o atendimento com a Equipe Video One.',
    `Nome: ${nome}`,
    `ID do Atendimento: ${attendanceId}`,
  ].join('\n')
}

export function getWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function openWhatsApp(message) {
  window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
}

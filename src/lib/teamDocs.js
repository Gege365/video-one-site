const esc = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const line = (value, fallback = '\u00a0') => {
  const text = String(value ?? '').trim()
  return esc(text || fallback)
}

const mark = (checked) => (checked ? '☑' : '☐')

const sharedCss = `
  @page { size: A4; margin: 12mm 12mm 14mm 12mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    font-size: 10pt;
    line-height: 1.42;
    color: #1a1a1f;
    background: #fff;
  }
  .page { max-width: 186mm; margin: 0 auto; }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 2.5px solid #0a0a0c;
    padding-bottom: 10px;
    margin-bottom: 12px;
  }
  header img { height: 40px; width: auto; }
  .header-meta {
    text-align: right;
    font-size: 8pt;
    color: #4b5563;
    line-height: 1.35;
  }
  .header-meta strong {
    display: block;
    color: #0a0a0c;
    font-size: 11pt;
    margin-bottom: 2px;
  }
  h1 {
    margin: 0 0 4px;
    font-size: 13.5pt;
    text-align: center;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .subtitle {
    text-align: center;
    font-size: 9pt;
    color: #6b7280;
    margin: 0 0 14px;
  }
  h2 {
    font-size: 9.5pt;
    margin: 12px 0 6px;
    padding: 4px 8px;
    background: #0a0a0c;
    color: #fff;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  p, li { margin: 0 0 5px; text-align: justify; }
  ul { margin: 4px 0 8px; padding-left: 16px; }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 14px;
  }
  .field { font-size: 9pt; margin-bottom: 5px; }
  .field label {
    display: block;
    font-weight: 600;
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #4b5563;
    margin-bottom: 1px;
  }
  .line {
    border-bottom: 1px solid #9ca3af;
    min-height: 16px;
    padding: 1px 2px;
  }
  .box, .card {
    border: 1px solid #d1d5db;
    padding: 8px 10px;
    margin: 6px 0 8px;
    background: #fafafa;
  }
  .card h3 { margin: 0 0 4px; font-size: 10pt; }
  .card .what { font-size: 8.5pt; color: #4b5563; margin-bottom: 6px; }
  .note { font-size: 8.5pt; color: #4b5563; }
  .warn {
    border-left: 3px solid #f59e0b;
    background: #fffbeb;
    padding: 7px 10px;
    margin: 8px 0;
    font-size: 8.5pt;
  }
  .ok {
    border-left: 3px solid #14f195;
    background: #f0fdf8;
    padding: 7px 10px;
    margin: 8px 0;
    font-size: 8.5pt;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 6px 0 8px;
    font-size: 9pt;
  }
  th, td {
    border: 1px solid #d1d5db;
    padding: 5px 7px;
    text-align: left;
    vertical-align: top;
  }
  th {
    background: #f3f4f6;
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .sign-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-top: 18px;
  }
  .sign { text-align: center; padding-top: 28px; }
  .sign .sig-line {
    border-top: 1px solid #111;
    margin: 0 6px 4px;
    padding-top: 5px;
    font-size: 8.5pt;
  }
  .sign .role { font-size: 7.5pt; color: #6b7280; }
  footer.doc-foot {
    margin-top: 16px;
    padding-top: 7px;
    border-top: 1px solid #e5e7eb;
    font-size: 7pt;
    color: #6b7280;
    text-align: center;
    line-height: 1.35;
  }
  .badge {
    display: inline-block;
    background: #14f195;
    color: #0a0a0c;
    font-size: 7.5pt;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 3px 8px;
    margin-bottom: 6px;
  }
  .steps { counter-reset: step; list-style: none; padding: 0; margin: 6px 0 8px; }
  .steps li {
    position: relative;
    padding-left: 28px;
    margin-bottom: 6px;
    text-align: left;
  }
  .steps li::before {
    counter-increment: step;
    content: counter(step);
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #0a0a0c;
    color: #fff;
    font-size: 8pt;
    font-weight: 700;
    text-align: center;
    line-height: 18px;
  }
  .mono { font-family: Consolas, "Courier New", monospace; font-size: 8.5pt; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`

function docShell({ title, bodyHtml, logoUrl }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${esc(title)}</title>
  <style>${sharedCss}</style>
</head>
<body>
  <div class="page">
    <header>
      <img src="${esc(logoUrl)}" alt="Video One" />
      <div class="header-meta">
        <strong>VIDEO ONE</strong>
        Agência e Produtora<br />
        Av. Rondon Pacheco, 5750 — Empresarial Albino Pfeifer<br />
        Minas Gerais, Brasil<br />
        WhatsApp: (34) 99833-5489 · @videooneprodutora
      </div>
    </header>
    ${bodyHtml}
  </div>
  <script>
    window.addEventListener('load', function () {
      setTimeout(function () { window.focus(); window.print(); }, 250);
    });
  </script>
</body>
</html>`
}

export function buildContractHtml(data, logoUrl) {
  const pay =
    data.pagamentoTipo === 'integral'
      ? '☑ 100% na assinatura'
      : data.pagamentoTipo === 'entrada'
        ? `☑ ${line(data.entradaPct, '__')}% de entrada + ${line(data.restantePct, '__')}% na entrega`
        : `☑ Outra: ${line(data.outraPagamento, '_______________')}`

  const body = `
    <h1>Contrato de Prestação de Serviços</h1>
    <p class="subtitle">Criação, publicação e entrega de site institucional / landing page</p>

    <h2>1. Identificação das partes</h2>
    <p><strong>CONTRATADA:</strong> Video One — Agência e Produtora, com atuação em criação de sites, identidade digital e soluções de presença online, doravante denominada simplesmente <strong>Video One</strong>.</p>
    <p><strong>CONTRATANTE:</strong></p>
    <div class="grid-2">
      <div class="field"><label>Nome completo / Razão social</label><div class="line">${line(data.nome)}</div></div>
      <div class="field"><label>CPF / CNPJ</label><div class="line">${line(data.cpfCnpj)}</div></div>
      <div class="field"><label>E-mail</label><div class="line">${line(data.email)}</div></div>
      <div class="field"><label>Telefone / WhatsApp</label><div class="line">${line(data.telefone)}</div></div>
      <div class="field" style="grid-column:1/-1"><label>Endereço completo</label><div class="line">${line(data.endereco)}</div></div>
      <div class="field"><label>Nome do negócio / marca no site</label><div class="line">${line(data.marca)}</div></div>
      <div class="field"><label>Cidade / UF</label><div class="line">${line(data.cidadeUf)}</div></div>
    </div>

    <h2>2. Objeto</h2>
    <p>
      O presente contrato tem por objeto a prestação de serviços de <strong>criação, publicação e entrega de um site</strong>
      (institucional e/ou landing page) para o CONTRATANTE, incluindo configuração das contas necessárias à hospedagem,
      repositório do código e, quando contratado, registro do domínio, de modo que o CONTRATANTE receba o projeto
      <strong>pronto para uso</strong>, sem necessidade de operar ferramentas técnicas.
    </p>

    <h2>3. Entregáveis</h2>
    <ul>
      <li>${mark(data.entSite)} Site responsivo (desktop e celular), com visual profissional alinhado à marca do CONTRATANTE</li>
      <li>${mark(data.entPaginas)} Páginas / seções: ${line(data.paginas, '_______________________________________________')}</li>
      <li>${mark(data.entWhatsapp)} Botão / integração com WhatsApp</li>
      <li>${mark(data.entFormulario)} Formulário ou chamada para contato</li>
      <li>${mark(data.entPublicacao)} Publicação online (URL provisória na Vercel e/ou domínio definitivo)</li>
      <li>${mark(data.entContas)} Criação e configuração, em nome do CONTRATANTE, de contas em: <strong>GitHub</strong>, <strong>Vercel</strong> e, se contratado, <strong>Registro.br</strong></li>
      <li>${mark(data.entTransferencia)} Transferência / entrega das contas e acessos ao CONTRATANTE após a quitação</li>
      <li>${mark(data.entAjustes)} Até <strong>${line(data.rodadasAjustes, '___')}</strong> rodadas de ajustes de conteúdo/visual após a apresentação da versão aprovada</li>
      <li>${mark(data.entPdf)} Material de entrega (PDF Video One) com resumo do projeto e dados de acesso</li>
    </ul>
    <p class="note">
      <strong>Não estão incluídos</strong> (salvo contratação à parte): logotipo do zero, filmagem/fotografia profissional,
      copywriting extenso, anúncios pagos, e-mail profissional, loja virtual completa, sistemas/ERP, manutenção mensal,
      renovação anual de domínio após o 1º período, nem alterações ilimitadas após a entrega final.
    </p>

    <h2>4. Valores e pagamento</h2>
    <table>
      <tr><th>Descrição</th><th>Valor (R$)</th></tr>
      <tr><td>Pacote de criação e entrega do site</td><td>${line(data.valorSite)}</td></tr>
      <tr><td>Registro de domínio .com.br / .com (1º período), se contratado</td><td>${line(data.valorDominio)}</td></tr>
      <tr><td>Outros: ${line(data.outrosDesc, '—')}</td><td>${line(data.valorOutros)}</td></tr>
      <tr><td><strong>Valor total</strong></td><td><strong>${line(data.valorTotal)}</strong></td></tr>
    </table>
    <div class="box">
      <p><strong>Forma de pagamento:</strong> Pix / transferência · Chave/dados: ${line(data.chavePix)}</p>
      <p><strong>Condições:</strong> ${pay}</p>
      <p class="note">
        A transferência definitiva das contas (GitHub, Vercel, Registro.br) e a exclusão das cópias sob controle da Video One
        ocorrem <strong>após a confirmação do pagamento integral</strong> (ou conforme condição acima).
      </p>
    </div>

    <h2>5. Prazo</h2>
    <p>
      Prazo estimado de entrega da versão publicada: <strong>${line(data.prazoDias, '___')} dias úteis</strong> após assinatura deste contrato,
      recebimento da entrada (se houver) e envio pelo CONTRATANTE dos materiais essenciais (fotos, textos, dados de contato).
      Atrasos no envio de materiais pelo CONTRATANTE suspendem proporcionalmente o prazo.
    </p>

    <h2>6. Contas, domínio e autonomia do cliente</h2>
    <p>
      Para facilitar a vida do CONTRATANTE, a Video One poderá <strong>criar e configurar</strong> as contas técnicas
      (GitHub, Vercel e, se aplicável, Registro.br), definir senhas iniciais e organizar a publicação do site.
      Após a quitação, a Video One entregará ao CONTRATANTE, preferencialmente por WhatsApp e/ou PDF de entrega, os acessos e orientações do projeto.
    </p>
    <p>
      Recomenda-se que o CONTRATANTE <strong>altere as senhas</strong> após o recebimento e guarde os acessos em local seguro.
      A partir da entrega, a responsabilidade pela renovação de domínio, segurança das senhas e conteúdo publicado passa a ser do CONTRATANTE,
      salvo novo contrato de manutenção.
    </p>

    <h2>7. Conteúdo, imagens e responsabilidades</h2>
    <ul>
      <li>O CONTRATANTE declara ter direito de uso das fotos, textos, marcas e dados fornecidos à Video One.</li>
      <li>A Video One poderá usar conteúdo público do negócio apenas para fins de demonstração prévia, substituindo por materiais oficiais após o fechamento.</li>
      <li>O CONTRATANTE é responsável pela veracidade das informações exibidas no site.</li>
    </ul>

    <h2>8. Propriedade e transferência</h2>
    <p>
      Após o pagamento integral, o CONTRATANTE passa a ser o titular das contas entregues e do site nelas publicado.
      A Video One poderá manter cópia técnica apenas pelo tempo necessário à transferência e, em seguida,
      <strong>remover o projeto de seus ambientes</strong> (computador local, GitHub e Vercel próprios), sem prejuízo do site no ar nas contas do CONTRATANTE.
    </p>

    <h2>9. Cancelamento</h2>
    <p>
      Em caso de desistência pelo CONTRATANTE após o início dos trabalhos, os valores já pagos referentes a etapas concluídas
      não serão reembolsáveis. Valores de domínio já registrados junto ao Registro.br seguem as regras do próprio registrador.
    </p>

    <h2>10. Foro</h2>
    <p>
      As partes elegem o foro da comarca de <strong>Uberlândia/MG</strong>, com renúncia a qualquer outro, por mais privilegiado que seja,
      para dirimir dúvidas oriundas deste contrato.
    </p>

    <p style="margin-top:14px">Local e data: ${line(data.localData, '________________________ , _____ / _____ / ________')}</p>

    <div class="sign-grid">
      <div class="sign"><div class="sig-line">CONTRATADA — Video One<br /><span class="role">Nome / assinatura do responsável</span></div></div>
      <div class="sign"><div class="sig-line">CONTRATANTE<br /><span class="role">${line(data.nome, 'Nome / assinatura')}</span></div></div>
    </div>

    <footer class="doc-foot">
      Video One — Agência e Produtora · Contrato de criação e entrega de site<br />
      Contato: WhatsApp (34) 99833-5489 · Instagram @videooneprodutora · Av. Rondon Pacheco, 5750 — Uberlândia/MG
    </footer>
  `

  return docShell({
    title: `Contrato — ${data.nome || 'Video One'}`,
    bodyHtml: body,
    logoUrl,
  })
}

export function buildDeliveryHtml(data, logoUrl) {
  const body = `
    <div class="badge">Documento de entrega</div>
    <h1 style="text-align:left;text-transform:none;letter-spacing:-0.01em;font-size:15pt">Seu site está no ar</h1>
    <p class="subtitle" style="text-align:left;margin-bottom:12px">
      Este PDF reúne o resumo do projeto, os acessos das contas criadas para você e as orientações
      para manter o site sob o seu controle — sem mensalidade e sem depender do computador da Video One.
    </p>

    <h2>1. Dados do projeto</h2>
    <div class="grid-2">
      <div class="field"><label>Cliente / empresa</label><div class="line">${line(data.cliente)}</div></div>
      <div class="field"><label>Data da entrega</label><div class="line">${line(data.dataEntrega)}</div></div>
      <div class="field"><label>Nome do site / marca</label><div class="line">${line(data.marca)}</div></div>
      <div class="field"><label>Responsável Video One</label><div class="line">${line(data.responsavel)}</div></div>
      <div class="field" style="grid-column:1/-1"><label>URL do site</label><div class="line mono">${line(data.urlSite)}</div></div>
      <div class="field" style="grid-column:1/-1"><label>Pacote / entregáveis resumidos</label><div class="line">${line(data.pacoteResumo)}</div></div>
    </div>

    <h2>2. O que foi entregue</h2>
    <table>
      <tr><th style="width:32%">Item</th><th>Detalhe</th></tr>
      <tr><td>Site publicado</td><td>Versão responsiva (celular e computador), visual profissional, com as seções combinadas no contrato.</td></tr>
      <tr><td>Contato</td><td>Integração com WhatsApp e/ou formulário de contato, conforme o projeto.</td></tr>
      <tr><td>Hospedagem</td><td>Site hospedado na <strong>Vercel</strong>, na conta criada para o cliente.</td></tr>
      <tr><td>Código-fonte</td><td>Repositório do projeto no <strong>GitHub</strong>, na conta criada para o cliente.</td></tr>
      <tr><td>Domínio</td><td>Quando contratado: registrado no <strong>Registro.br</strong> em nome do cliente e apontado para o site.</td></tr>
      <tr><td>Acessos</td><td>Logins e senhas iniciais das contas listadas abaixo.</td></tr>
    </table>

    <h2>3. Onde o projeto vive</h2>
    <ol class="steps">
      <li><strong>GitHub</strong> — guarda o código do site (a “pasta do projeto” na nuvem). É o backup técnico.</li>
      <li><strong>Vercel</strong> — publica o site na internet. É o que deixa a URL no ar 24h.</li>
      <li><strong>Registro.br</strong> — (se houver) é onde fica o domínio (ex.: seunome.com.br), no seu CPF/CNPJ.</li>
    </ol>
    <div class="ok">
      Depois desta entrega, o site <strong>não depende do computador da Video One</strong>.
      Ele continua no ar pelas contas abaixo. Guarde este PDF e as senhas em local seguro.
    </div>

    <h2>4. Acessos — Vercel (hospedagem)</h2>
    <div class="card">
      <h3>Vercel</h3>
      <p class="what">Painel onde o site está hospedado e publicado. Endereço: https://vercel.com</p>
      <div class="grid-2">
        <div class="field"><label>E-mail de login</label><div class="line">${line(data.vercelEmail)}</div></div>
        <div class="field"><label>Senha inicial</label><div class="line">${line(data.vercelSenha)}</div></div>
        <div class="field" style="grid-column:1/-1"><label>Nome do projeto na Vercel</label><div class="line">${line(data.vercelProjeto)}</div></div>
      </div>
    </div>

    <h2>5. Acessos — GitHub (código)</h2>
    <div class="card">
      <h3>GitHub</h3>
      <p class="what">Repositório com o código-fonte do site. Endereço: https://github.com</p>
      <div class="grid-2">
        <div class="field"><label>E-mail / usuário de login</label><div class="line">${line(data.githubLogin)}</div></div>
        <div class="field"><label>Senha inicial</label><div class="line">${line(data.githubSenha)}</div></div>
        <div class="field" style="grid-column:1/-1"><label>Link do repositório</label><div class="line mono">${line(data.githubRepo)}</div></div>
      </div>
    </div>

    <h2>6. Acessos — Registro.br (domínio)</h2>
    <div class="card">
      <h3>Registro.br</h3>
      <p class="what">Conta do domínio .com.br (quando contratado). Endereço: https://registro.br</p>
      <div class="grid-2">
        <div class="field"><label>Domínio</label><div class="line">${line(data.dominio)}</div></div>
        <div class="field"><label>Situação</label><div class="line">${line(data.dominioSituacao)}</div></div>
        <div class="field"><label>E-mail / ID de login</label><div class="line">${line(data.registroEmail)}</div></div>
        <div class="field"><label>Senha inicial</label><div class="line">${line(data.registroSenha)}</div></div>
      </div>
    </div>

    <div class="warn">
      <strong>Importante:</strong> altere as senhas assim que receber este documento.
      A Video One não cobra mensalidade neste pacote; renovação de domínio (anual) e segurança das contas
      passam a ser de responsabilidade do cliente. Para alterações futuras no site, solicite orçamento avulso à Video One.
    </div>

    <h2>7. Próximos passos sugeridos</h2>
    <ul>
      <li>Abrir cada conta (Vercel, GitHub e, se houver, Registro.br) e trocar as senhas.</li>
      <li>Testar o site no celular e no computador (WhatsApp, formulário, links).</li>
      <li>Guardar este PDF + senhas novas em local seguro (não encaminhar em grupos).</li>
      <li>Acompanhar o e-mail do Registro.br para avisos de renovação do domínio.</li>
    </ul>

    <h2>8. Contato Video One</h2>
    <p>Dúvidas sobre esta entrega: WhatsApp <strong>(34) 99833-5489</strong> · Instagram <strong>@videooneprodutora</strong></p>
    <p style="margin-top:10px">Declaro ter recebido o site publicado e os acessos descritos neste documento.</p>
    <p>Local e data: ${line(data.localData, '________________________ , _____ / _____ / ________')}</p>

    <div class="sign-grid">
      <div class="sign"><div class="sig-line">Video One — entrega<br /><span class="role">${line(data.responsavel, 'Responsável técnico / comercial')}</span></div></div>
      <div class="sign"><div class="sig-line">Cliente — recebimento<br /><span class="role">${line(data.cliente, 'Nome / assinatura')}</span></div></div>
    </div>

    <footer class="doc-foot">
      Video One — Agência e Produtora · Documento de entrega de site<br />
      Av. Rondon Pacheco, 5750 — Uberlândia/MG · WhatsApp (34) 99833-5489 · @videooneprodutora
    </footer>
  `

  return docShell({
    title: `Entrega — ${data.cliente || 'Video One'}`,
    bodyHtml: body,
    logoUrl,
  })
}

export function openPrintDocument(html) {
  const win = window.open('', '_blank')
  if (!win) {
    alert('Permita pop-ups para imprimir ou salvar o PDF.')
    return
  }
  win.document.open()
  win.document.write(html)
  win.document.close()
}

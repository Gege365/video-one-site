/**
 * Video One — Webhook Google Sheets
 *
 * Abas esperadas na planilha:
 *   - "Jhon"  → leads de cursos
 *   - "Teo"   → leads de sites
 *
 * Como publicar:
 * 1. Crie uma planilha no Google Sheets
 * 2. Crie as abas "Jhon" e "Teo" (nomes exatos)
 * 3. Extensões → Apps Script → cole este código
 * 4. Em SECRET_TOKEN abaixo, defina o mesmo valor do .env (VITE_SHEETS_TOKEN)
 * 5. Implantar → Nova implantação → Tipo: app da Web
 *    - Executar como: Eu
 *    - Quem tem acesso: Qualquer pessoa
 * 6. Copie a URL da implantação para VITE_GOOGLE_SHEETS_WEBHOOK
 */

var SECRET_TOKEN = 'troque-este-token';

var JHON_HEADERS = [
  'Data',
  'ID Atendimento',
  'Nome',
  'Telefone',
  'Nicho',
  'Experiência',
  'Conteúdo',
  'Formato',
  'Prazo',
  'Público',
  'Plataforma',
  'Investimento',
];

var TEO_HEADERS = [
  'Data',
  'ID Atendimento',
  'Nome',
  'Telefone',
  'Negócio',
  'Segmento',
  'Tipo de site',
  'Objetivo',
  'Já tem site',
  'Recursos',
  'Prazo',
  'Investimento',
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (SECRET_TOKEN && data.token !== SECRET_TOKEN) {
      return json_({ ok: false, error: 'unauthorized' });
    }

    var assistantId = data.assistant || '';
    var sheetName = assistantId === 'teo' ? 'Teo' : 'Jhon';
    var answers = data.answers || {};
    var attendanceId = data.attendanceId || '';
    var createdAt = data.createdAt || new Date().toISOString();

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    ensureHeaders_(sheet, sheetName === 'Teo' ? TEO_HEADERS : JHON_HEADERS);

    var row =
      sheetName === 'Teo'
        ? [
            formatDate_(createdAt),
            attendanceId,
            answers.nome || '',
            answers.telefone || '',
            answers.negocio || '',
            answers.segmento || '',
            answers.tipo_site || '',
            answers.objetivo || '',
            answers.tem_site || '',
            answers.recursos || '',
            answers.prazo || '',
            answers.investimento || '',
          ]
        : [
            formatDate_(createdAt),
            attendanceId,
            answers.nome || '',
            answers.telefone || '',
            answers.nicho || '',
            answers.experiencia || '',
            answers.conteudo || '',
            answers.formato || '',
            answers.prazo || '',
            answers.publico || '',
            answers.plataforma || '',
            answers.investimento || '',
          ];

    sheet.appendRow(row);
    return json_({ ok: true, sheet: sheetName });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({
    ok: true,
    service: 'Video One Leads',
    sheets: ['Jhon', 'Teo'],
  });
}

function ensureHeaders_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    return;
  }

  var existing = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  var needsHeader = existing.every(function (cell) {
    return cell === '' || cell === null;
  });
  if (needsHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
}

function formatDate_(iso) {
  try {
    var d = new Date(iso);
    return Utilities.formatDate(d, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');
  } catch (e) {
    return iso;
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

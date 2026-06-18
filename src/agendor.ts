// Integração com o Agendor (CRM) — executada apenas no servidor (SSR/Express).
// O token NUNCA vai para o frontend; é lido da variável de ambiente AGENDOR_TOKEN.
const BASE = 'https://api.agendor.com.br/v3';

export interface LeadPayload {
  nome: string;
  empresa?: string;
  email?: string;
  telefone?: string;
  produto?: string;
  documento?: string;
  tipo?: 'proposta' | 'download' | 'saida' | string;
  licenca?: string;
  quantidade?: number;
  mensagem?: string;
  origem?: string;
}

export interface LeadResult {
  ok: boolean;
  dealId?: number;
  personId?: number;
  error?: string;
}

function tipoLabel(t?: string): string {
  if (t === 'download') return 'Download / Versão de teste';
  if (t === 'saida') return 'Lead (pop-up de saída)';
  return 'Proposta';
}

/** Cria a pessoa (lead) e um negócio na raia "Contato" do Funil de Vendas. */
export async function enviarLeadAgendor(lead: LeadPayload): Promise<LeadResult> {
  const token = process.env['AGENDOR_TOKEN'];
  if (!token) return { ok: false, error: 'AGENDOR_TOKEN não configurado no servidor' };
  if (!lead?.nome) return { ok: false, error: 'nome obrigatório' };

  const funnel = Number(process.env['AGENDOR_FUNNEL_ID'] ?? 891975);
  const stage = Number(process.env['AGENDOR_STAGE_ID'] ?? 3780288);
  const headers = { Authorization: `Token ${token}`, 'Content-Type': 'application/json' };

  const fone = (lead.telefone ?? '').replace(/\D/g, '');

  // 1) Pessoa (contato)
  const personBody = {
    name: lead.nome,
    role: 'Lead do site',
    contact: {
      email: lead.email || undefined,
      mobile: fone || undefined,
      whatsapp: fone || undefined,
    },
    description: lead.empresa ? `Empresa: ${lead.empresa}` : undefined,
  };

  const pRes = await fetch(`${BASE}/people`, {
    method: 'POST',
    headers,
    body: JSON.stringify(personBody),
  });
  if (!pRes.ok) return { ok: false, error: `people ${pRes.status}: ${await safeText(pRes)}` };
  const person = (await pRes.json()) as { data?: { id?: number } };
  const personId = person?.data?.id;
  if (!personId) return { ok: false, error: 'pessoa criada sem id' };

  // 2) Negócio na raia "Contato"
  const titulo = `${tipoLabel(lead.tipo)} — ${lead.produto || 'GstarCAD'}`;
  const description = [
    lead.empresa ? `Empresa: ${lead.empresa}` : null,
    lead.documento ? `CPF/CNPJ: ${lead.documento}` : null,
    lead.produto ? `Produto: ${lead.produto}` : null,
    lead.licenca ? `Licença: ${lead.licenca}` : null,
    lead.quantidade ? `Quantidade: ${lead.quantidade}` : null,
    lead.email ? `E-mail: ${lead.email}` : null,
    fone ? `Telefone: ${fone}` : null,
    lead.mensagem ? `Mensagem: ${lead.mensagem}` : null,
    lead.origem ? `Origem: ${lead.origem}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const dealBody = { title: titulo, funnel, dealStage: stage, description };
  const dRes = await fetch(`${BASE}/people/${personId}/deals`, {
    method: 'POST',
    headers,
    body: JSON.stringify(dealBody),
  });
  if (!dRes.ok) return { ok: false, personId, error: `deals ${dRes.status}: ${await safeText(dRes)}` };
  const deal = (await dRes.json()) as { data?: { id?: number } };
  return { ok: true, personId, dealId: deal?.data?.id };
}

async function safeText(r: Response): Promise<string> {
  try { return (await r.text()).slice(0, 300); } catch { return ''; }
}

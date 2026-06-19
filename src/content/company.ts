import { Company } from '../app/core/models';

// EDITE AQUI os dados da sua empresa/revenda.
export const COMPANY: Company = {
  name: 'TLTEC',
  legalName: 'TLTEC Soluções em Software',
  brand: 'GstarCAD',
  url: 'https://www.gstarcadoficial.com.br',
  email: 'comercial@tltec.com.br',
  emails: [
    { label: 'Comercial', address: 'comercial@tltec.com.br' },
    { label: 'Suporte', address: 'suporte@tltec.com.br' },
    { label: 'Financeiro', address: 'financeiro@tltec.com.br' },
  ],
  phoneDisplay: '(21) 3950-7019',
  whatsapp: '552139507019', // 55 + DDD 21 + 39507019
  city: 'Rio de Janeiro',
  state: 'RJ',
  description:
    'Revenda autorizada GstarCAD no Brasil. Software CAD 2D/3D e BIM profissional, 100% compatível ' +
    'com DWG — a alternativa econômica ao AutoCAD. Licença perpétua, economia de até 70% e suporte ' +
    'em português para arquitetos, engenheiros, projetistas e empresas.',
  social: [
    { label: 'Instagram', url: 'https://instagram.com/' },
    { label: 'LinkedIn', url: 'https://linkedin.com/' },
    { label: 'YouTube', url: 'https://youtube.com/' },
  ],
};

// Mensagem padrão para WhatsApp
export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(
    message ?? 'Olá! Tenho interesse no GstarCAD e gostaria de uma proposta.'
  );
  return `https://wa.me/${COMPANY.whatsapp}?text=${text}`;
}

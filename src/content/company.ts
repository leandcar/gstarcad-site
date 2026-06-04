import { Company } from '../app/core/models';

// EDITE AQUI os dados da sua empresa/revenda.
export const COMPANY: Company = {
  name: 'TLTEC',
  legalName: 'TLTEC Soluções em Software',
  brand: 'GstarCAD',
  url: 'https://www.seudominio.com.br',
  email: 'contato@seudominio.com.br',
  phoneDisplay: '(11) 4000-0000',
  whatsapp: '5511900000000', // <-- coloque seu número (formato 55 + DDD + número)
  city: 'São Paulo',
  state: 'SP',
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
    message ?? 'Olá! Tenho interesse no GstarCAD e gostaria de um orçamento.'
  );
  return `https://wa.me/${COMPANY.whatsapp}?text=${text}`;
}

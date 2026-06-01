import { BlogPost } from '../app/core/models';

// Posts em HTML simples (renderizados com [innerHTML]). Bom para SEO de cauda longa.
export const BLOG: BlogPost[] = [
  {
    slug: 'gstarcad-alternativa-ao-autocad',
    title: 'GstarCAD: a melhor alternativa ao AutoCAD em 2026',
    description:
      'Descubra por que milhares de profissionais estão migrando do AutoCAD para o GstarCAD: ' +
      'compatibilidade total com DWG, licença perpétua e economia real.',
    date: '2026-05-20',
    author: 'Equipe GstarCAD Brasil',
    tags: ['comparativo', 'autocad', 'dwg'],
    readingMinutes: 6,
    body: `
<p>Se você procura uma <strong>alternativa ao AutoCAD</strong> que não comprometa a qualidade do
seu trabalho, o GstarCAD é a resposta. Ele usa o formato DWG nativamente e mantém a mesma lógica
de comandos, atalhos e interface — a migração é praticamente instantânea.</p>
<h2>Compatibilidade total com DWG</h2>
<p>O GstarCAD abre e salva arquivos <strong>.dwg</strong> de qualquer versão sem conversões nem perda
de informação. Seus projetos antigos continuam funcionando perfeitamente.</p>
<h2>Licença perpétua: pague uma vez, use para sempre</h2>
<p>Enquanto concorrentes apostam só em assinaturas caras, o GstarCAD oferece <strong>licença
perpétua</strong>. É um investimento único, com retorno rápido para autônomos e empresas.</p>
<h2>Mesma produtividade, custo muito menor</h2>
<p>Comandos idênticos, suporte a LISP/VBA/.NET e ferramentas profissionais como Drawing Compare e
Sheet Set. Tudo o que você já usa, por uma fração do preço.</p>
<p>Quer ver na prática? <a href="/downloads">Baixe a versão de avaliação gratuita</a> ou
<a href="/orcamento">peça um orçamento</a>.</p>
`,
  },
  {
    slug: 'como-abrir-arquivos-dwg-gratis',
    title: 'Como abrir arquivos DWG grátis (sem AutoCAD)',
    description:
      'Precisa visualizar um arquivo DWG mas não tem AutoCAD? Veja como abrir DWG de graça com o ' +
      'GstarCAD Viewer.',
    date: '2026-04-12',
    author: 'Equipe GstarCAD Brasil',
    tags: ['dwg', 'viewer', 'tutorial'],
    readingMinutes: 4,
    body: `
<p>Receber um arquivo <strong>DWG</strong> e não conseguir abri-lo é frustrante. A boa notícia: você
não precisa de um software caro só para visualizar desenhos.</p>
<h2>GstarCAD Viewer — gratuito e completo</h2>
<p>O <a href="/produtos/gstarcad-viewer">GstarCAD Viewer</a> abre arquivos DWG e DXF de qualquer
versão, gratuitamente. Você pode medir, navegar por camadas e imprimir.</p>
<h2>Passo a passo</h2>
<ol>
<li>Baixe o GstarCAD Viewer na nossa <a href="/downloads">página de downloads</a>.</li>
<li>Instale e abra o programa.</li>
<li>Arraste o arquivo .dwg para a janela — pronto!</li>
</ol>
<p>Precisa também <em>editar</em> o desenho? Conheça as edições completas do
<a href="/produtos">GstarCAD</a>.</p>
`,
  },
  {
    slug: 'licenca-perpetua-vs-assinatura',
    title: 'Licença perpétua x assinatura: qual vale mais a pena?',
    description:
      'Entenda as diferenças entre licença perpétua, assinatura e aluguel de software CAD e ' +
      'descubra qual modelo é mais econômico para você.',
    date: '2026-03-03',
    author: 'Equipe GstarCAD Brasil',
    tags: ['licenciamento', 'custos'],
    readingMinutes: 5,
    body: `
<p>Ao escolher um software CAD, o modelo de licenciamento impacta diretamente o seu bolso. Vamos
comparar as três opções que o GstarCAD oferece.</p>
<h2>Licença perpétua</h2>
<p>Pagamento único: o software é seu para sempre. Ideal para quem usa CAD continuamente e quer
previsibilidade de custos no longo prazo.</p>
<h2>Assinatura anual</h2>
<p>Valor menor por ano, sempre com a versão mais recente. Boa para quem prefere diluir o custo.</p>
<h2>Aluguel</h2>
<p>Para projetos pontuais ou demandas sazonais, pague apenas pelo período que precisar.</p>
<p>Na dúvida? <a href="/orcamento">Fale com a gente</a> que ajudamos a escolher o melhor modelo.</p>
`,
  },
];

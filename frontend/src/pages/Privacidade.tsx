import { Shield } from 'lucide-react';

export default function Privacidade() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <Shield className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Política de Privacidade</h1>
            <p className="text-gray-400 text-sm mt-1">Última atualização: agosto de 2026</p>
          </div>
        </div>

        <div className="prose-blog space-y-8">

          <section>
            <p className="lead">
              A GlobalMove valoriza sua privacidade. Esta política explica quais dados coletamos,
              como os usamos e quais são os seus direitos, em conformidade com a
              Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2>1. Quem somos</h2>
            <p>
              A GlobalMove é uma plataforma digital de planejamento migratório, que ajuda brasileiros
              a comparar países, simular custos e planejar sua jornada de imigração.
              Operamos por meio do site <strong>globalmove.com.br</strong>.
            </p>
          </section>

          <section>
            <h2>2. Dados que coletamos</h2>
            <p>Coletamos apenas os dados necessários para o funcionamento da plataforma:</p>
            <ul>
              <li><strong>Dados de cadastro:</strong> nome, e-mail e senha (quando você cria uma conta).</li>
              <li><strong>Dados de perfil migratório:</strong> informações que você preenche no onboarding (renda, poupança, objetivos), usadas exclusivamente para gerar sua análise personalizada.</li>
              <li><strong>Dados de uso:</strong> páginas visitadas, interações com ferramentas e tempo de sessão, coletados de forma agregada e anônima para melhorar o serviço.</li>
              <li><strong>Cookies:</strong> utilizamos cookies técnicos essenciais e, mediante seu consentimento, cookies de análise e publicidade (Google AdSense/Analytics).</li>
            </ul>
          </section>

          <section>
            <h2>3. Como usamos seus dados</h2>
            <ul>
              <li>Fornecer e personalizar os resultados da plataforma (análise de destinos, simulações, metas).</li>
              <li>Enviar comunicações relevantes sobre o serviço, quando você autorizar.</li>
              <li>Melhorar continuamente a experiência e funcionalidades do produto.</li>
              <li>Exibir anúncios relevantes por meio do Google AdSense (somente em páginas de conteúdo).</li>
            </ul>
            <p>Não vendemos, alugamos nem compartilhamos seus dados pessoais com terceiros para fins de marketing.</p>
          </section>

          <section>
            <h2>4. Google AdSense e Publicidade</h2>
            <p>
              Utilizamos o Google AdSense para exibir anúncios em algumas páginas de conteúdo do site.
              O Google pode usar cookies para exibir anúncios baseados em visitas anteriores a este ou
              outros sites. Você pode optar por não receber anúncios personalizados acessando
              as <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Configurações de Anúncios do Google</a>.
            </p>
          </section>

          <section>
            <h2>5. Armazenamento e segurança</h2>
            <p>
              Seus dados são armazenados em servidores seguros com criptografia em trânsito (HTTPS)
              e em repouso. Adotamos práticas padrão da indústria para proteger suas informações
              contra acesso não autorizado, perda ou alteração.
            </p>
          </section>

          <section>
            <h2>6. Seus direitos (LGPD)</h2>
            <p>De acordo com a LGPD, você tem direito a:</p>
            <ul>
              <li>Confirmar a existência de tratamento dos seus dados.</li>
              <li>Acessar seus dados pessoais.</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários.</li>
              <li>Revogar o consentimento a qualquer momento.</li>
              <li>Solicitar a portabilidade dos dados para outro fornecedor.</li>
            </ul>
            <p>
              Para exercer qualquer um desses direitos, entre em contato pelo e-mail:
              <a href="mailto:privacidade@globalmove.com.br"> privacidade@globalmove.com.br</a>.
            </p>
          </section>

          <section>
            <h2>7. Retenção de dados</h2>
            <p>
              Mantemos seus dados enquanto sua conta estiver ativa ou pelo período necessário para
              cumprir obrigações legais. Ao solicitar exclusão da conta, seus dados pessoais serão
              removidos em até 30 dias.
            </p>
          </section>

          <section>
            <h2>8. Alterações nesta política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Quando houver mudanças relevantes,
              notificaremos você por e-mail ou por aviso em destaque no site. A data de
              "última atualização" no topo da página sempre refletirá a versão vigente.
            </p>
          </section>

          <section>
            <h2>9. Contato</h2>
            <p>
              Dúvidas sobre esta política? Entre em contato:
            </p>
            <ul>
              <li>E-mail: <a href="mailto:privacidade@globalmove.com.br">privacidade@globalmove.com.br</a></li>
              <li>Site: <a href="https://globalmove.com.br/contato">globalmove.com.br/contato</a></li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}

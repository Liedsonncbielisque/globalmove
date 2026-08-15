import { FileText } from 'lucide-react';

export default function Termos() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <FileText className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Termos de Uso</h1>
            <p className="text-gray-400 text-sm mt-1">Última atualização: agosto de 2026</p>
          </div>
        </div>

        <div className="prose-blog space-y-8">

          <section>
            <p className="lead">
              Ao usar a plataforma GlobalMove, você concorda com os termos descritos abaixo.
              Leia com atenção antes de criar sua conta ou utilizar nossas ferramentas.
            </p>
          </section>

          <section>
            <h2>1. Sobre o serviço</h2>
            <p>
              A GlobalMove é uma plataforma de informação e planejamento migratório. Nosso serviço
              inclui comparação de países e cidades, simulador financeiro, calculadora de metas,
              blog informativo e assistente com inteligência artificial.
            </p>
            <p>
              <strong>Importante:</strong> As informações fornecidas pela GlobalMove têm caráter
              informativo e educacional. Não somos um escritório de advocacia, despachante
              de vistos nem consultoria migratória regulamentada. As simulações e análises são
              estimativas baseadas em dados públicos e não constituem garantia de aprovação
              de visto ou processo migratório.
            </p>
          </section>

          <section>
            <h2>2. Uso permitido</h2>
            <p>Você pode usar a GlobalMove para:</p>
            <ul>
              <li>Explorar informações sobre países e rotas migratórias.</li>
              <li>Simular cenários financeiros para planejamento pessoal.</li>
              <li>Acompanhar seu progresso com metas de poupança.</li>
              <li>Ler e compartilhar conteúdo do blog.</li>
            </ul>
          </section>

          <section>
            <h2>3. Uso proibido</h2>
            <p>É vedado ao usuário:</p>
            <ul>
              <li>Tentar acessar áreas restritas do sistema por meios não autorizados.</li>
              <li>Utilizar ferramentas automatizadas (bots, scrapers) para coletar dados da plataforma.</li>
              <li>Compartilhar credenciais de acesso com terceiros.</li>
              <li>Publicar conteúdo falso, enganoso ou que viole direitos de terceiros.</li>
              <li>Usar o serviço para fins ilegais ou contrários a esta política.</li>
            </ul>
          </section>

          <section>
            <h2>4. Cadastro e conta</h2>
            <p>
              Para acessar recursos personalizados, você precisará criar uma conta com e-mail e senha.
              Você é responsável pela segurança das suas credenciais e por todas as atividades
              realizadas em sua conta. Informe-nos imediatamente se suspeitar de uso não autorizado.
            </p>
          </section>

          <section>
            <h2>5. Limitação de responsabilidade</h2>
            <p>
              A GlobalMove não se responsabiliza por decisões tomadas com base nas informações
              fornecidas pela plataforma. Leis de imigração mudam com frequência; recomendamos
              sempre consultar fontes oficiais do país de destino e, quando necessário,
              um advogado de imigração habilitado.
            </p>
            <p>
              Não garantimos disponibilidade ininterrupta do serviço e nos reservamos o direito
              de realizar manutenções programadas ou não programadas.
            </p>
          </section>

          <section>
            <h2>6. Propriedade intelectual</h2>
            <p>
              Todo o conteúdo da plataforma — textos, análises, imagens, código e marca —
              é de propriedade da GlobalMove ou de seus licenciadores.
              É proibida a reprodução total ou parcial sem autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2>7. Publicidade</h2>
            <p>
              Algumas páginas do site exibem anúncios por meio do Google AdSense.
              Esses anúncios são selecionados automaticamente pelo Google e não representam
              endosso da GlobalMove a produtos ou serviços anunciados.
            </p>
          </section>

          <section>
            <h2>8. Alterações nos termos</h2>
            <p>
              Podemos revisar estes termos a qualquer momento. Usuários cadastrados serão
              notificados por e-mail sobre mudanças relevantes. O uso contínuo da plataforma
              após notificação constitui aceite das alterações.
            </p>
          </section>

          <section>
            <h2>9. Lei aplicável</h2>
            <p>
              Estes termos são regidos pela legislação brasileira. Fica eleito o foro
              da comarca de Xaxim, Santa Catarina, para dirimir eventuais controvérsias.
            </p>
          </section>

          <section>
            <h2>10. Contato</h2>
            <p>
              Dúvidas sobre estes termos? Fale conosco:
            </p>
            <ul>
              <li>E-mail: <a href="mailto:contato@globalmove.com.br">contato@globalmove.com.br</a></li>
              <li>Site: <a href="https://globalmove.com.br/contato">globalmove.com.br/contato</a></li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}

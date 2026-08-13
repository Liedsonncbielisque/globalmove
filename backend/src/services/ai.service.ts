import { supabaseAdmin } from '../config/supabase';
import { logger } from '../utils/logger';

export interface AIQuery {
  userId?: string;
  question: string;
  context?: {
    currentCapital?: number;
    monthlySavings?: number;
    targetMonths?: number;
    objective?: string;
  };
}

export interface AIResponse {
  answer: string;
  data?: any;
  sources?: string[];
  confidence: 'high' | 'medium' | 'low';
}

export class AIService {
  /**
   * Processa pergunta do usuário usando dados do sistema
   */
  async processQuery(query: AIQuery): Promise<AIResponse> {
    try {
      const { question, context } = query;

      // Análise de intenção
      const intent = this.detectIntent(question);

      switch (intent) {
        case 'best_destination':
          return await this.answerBestDestination(context);
        
        case 'cost_estimation':
          return await this.answerCostEstimation(question, context);
        
        case 'visa_info':
          return await this.answerVisaInfo(question);
        
        case 'timeline':
          return await this.answerTimeline(context);
        
        default:
          return {
            answer: 'Desculpe, não entendi sua pergunta. Posso ajudar com: melhores destinos, custos, vistos e prazos.',
            confidence: 'low',
          };
      }
    } catch (error) {
      logger.error('Error processing AI query:', error);
      return {
        answer: 'Desculpe, ocorreu um erro ao processar sua pergunta.',
        confidence: 'low',
      };
    }
  }

  /**
   * Detecta intenção da pergunta
   */
  private detectIntent(question: string): string {
    const q = question.toLowerCase();

    if (q.includes('melhor') || q.includes('recomend') || q.includes('qual país')) {
      return 'best_destination';
    }

    if (q.includes('custo') || q.includes('quanto') || q.includes('preço')) {
      return 'cost_estimation';
    }

    if (q.includes('visto') || q.includes('visa') || q.includes('imigra')) {
      return 'visa_info';
    }

    if (q.includes('quando') || q.includes('tempo') || q.includes('prazo')) {
      return 'timeline';
    }

    return 'unknown';
  }

  /**
   * Responde sobre melhor destino
   */
  private async answerBestDestination(context?: AIQuery['context']): Promise<AIResponse> {
    try {
      // Buscar países com melhor custo-benefício
      const { data: countries } = await supabaseAdmin
        .from('countries')
        .select('*, cost_of_living(*)')
        .eq('is_active', true)
        .limit(5);

      if (!countries || countries.length === 0) {
        return {
          answer: 'Não encontrei dados atualizados para este indicador.',
          confidence: 'low',
        };
      }

      // Análise simples baseada em custo
      const sorted = countries.sort((a, b) => {
        const costA = a.cost_of_living?.[0]?.rent || Infinity;
        const costB = b.cost_of_living?.[0]?.rent || Infinity;
        return costA - costB;
      });

      const top3 = sorted.slice(0, 3);

      const answer = `Com base nos dados disponíveis, os destinos com melhor custo-benefício são:

${top3.map((c, i) => `${i + 1}. ${c.flag} ${c.name}`).join('\n')}

Esses países oferecem bom equilíbrio entre custo de vida e qualidade de vida.`;

      return {
        answer,
        data: top3,
        sources: ['GlobalMove Database'],
        confidence: 'medium',
      };
    } catch (error) {
      logger.error('Error answering best destination:', error);
      return {
        answer: 'Não encontrei dados atualizados para este indicador.',
        confidence: 'low',
      };
    }
  }

  /**
   * Responde sobre custos
   */
  private async answerCostEstimation(question: string, context?: AIQuery['context']): Promise<AIResponse> {
    // Extrair nome do país da pergunta (simplificado)
    const countries = ['polônia', 'portugal', 'espanha', 'irlanda', 'canadá', 'chile'];
    const mentionedCountry = countries.find((c) => question.toLowerCase().includes(c));

    if (!mentionedCountry) {
      return {
        answer: 'Por favor, especifique o país para o qual deseja saber os custos.',
        confidence: 'low',
      };
    }

    try {
      const { data: country } = await supabaseAdmin
        .from('countries')
        .select('*, cost_of_living(*)')
        .ilike('name', `%${mentionedCountry}%`)
        .single();

      if (!country || !country.cost_of_living?.[0]) {
        return {
          answer: 'Não encontrei dados atualizados para este indicador.',
          confidence: 'low',
        };
      }

      const cost = country.cost_of_living[0];
      const total = 
        Number(cost.rent) +
        Number(cost.food) +
        Number(cost.transport) +
        Number(cost.utilities) +
        Number(cost.internet) +
        Number(cost.health) +
        Number(cost.leisure);

      const answer = `O custo de vida mensal estimado em ${country.name} é de aproximadamente ${total.toLocaleString('pt-BR')} ${cost.currency}.

Detalhamento:
- Aluguel: ${Number(cost.rent).toLocaleString('pt-BR')} ${cost.currency}
- Alimentação: ${Number(cost.food).toLocaleString('pt-BR')} ${cost.currency}
- Transporte: ${Number(cost.transport).toLocaleString('pt-BR')} ${cost.currency}
- Outros: ${(Number(cost.utilities) + Number(cost.internet) + Number(cost.health) + Number(cost.leisure)).toLocaleString('pt-BR')} ${cost.currency}

Fonte: ${cost.source}`;

      return {
        answer,
        data: cost,
        sources: [cost.source],
        confidence: cost.confidence,
      };
    } catch (error) {
      logger.error('Error answering cost estimation:', error);
      return {
        answer: 'Não encontrei dados atualizados para este indicador.',
        confidence: 'low',
      };
    }
  }

  /**
   * Responde sobre vistos
   */
  private async answerVisaInfo(question: string): Promise<AIResponse> {
    try {
      const { data: visas } = await supabaseAdmin
        .from('visa_routes')
        .select('*, countries(name, flag)')
        .eq('is_active', true)
        .limit(5);

      if (!visas || visas.length === 0) {
        return {
          answer: 'Não encontrei dados atualizados sobre vistos.',
          confidence: 'low',
        };
      }

      const answer = `Encontrei ${visas.length} rotas migratórias disponíveis:

${visas.map((v) => `- ${v.countries.flag} ${v.name} (${v.category})`).join('\n')}

Cada visto possui requisitos específicos. Recomendo consultar a fonte oficial antes de aplicar.`;

      return {
        answer,
        data: visas,
        sources: visas.map((v) => v.official_source),
        confidence: 'medium',
      };
    } catch (error) {
      logger.error('Error answering visa info:', error);
      return {
        answer: 'Não encontrei dados atualizados sobre vistos.',
        confidence: 'low',
      };
    }
  }

  /**
   * Responde sobre prazos
   */
  private async answerTimeline(context?: AIQuery['context']): Promise<AIResponse> {
    if (!context?.currentCapital || !context?.monthlySavings) {
      return {
        answer: 'Para calcular o prazo, preciso saber seu capital atual e economia mensal.',
        confidence: 'low',
      };
    }

    // Exemplo de cálculo (simplificado)
    const exampleGoal = 70000;
    const remaining = Math.max(0, exampleGoal - context.currentCapital);
    const months = Math.ceil(remaining / context.monthlySavings);

    const answer = `Com capital de R$ ${context.currentCapital.toLocaleString('pt-BR')} e economia de R$ ${context.monthlySavings.toLocaleString('pt-BR')}/mês, você atingirá uma meta de R$ ${exampleGoal.toLocaleString('pt-BR')} em aproximadamente ${months} meses.`;

    return {
      answer,
      data: { months, goal: exampleGoal },
      confidence: 'medium',
    };
  }
}

export const aiService = new AIService();
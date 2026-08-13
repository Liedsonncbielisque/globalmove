import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';
import { ApiError } from '../middleware/error.middleware';

export class VisaController {
  async getByCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const { countryId } = req.params;

      const { data: visas, error } = await supabaseAdmin
        .from('visa_routes')
        .select('*')
        .eq('country_id', countryId)
        .eq('is_active', true);

      if (error) throw new ApiError(500, 'Failed to fetch visa routes');

      res.json({ status: 'success', data: { visas: visas || [] } });
    } catch (error) {
      next(error);
    }
  }

  async checkCompatibility(req: Request, res: Response, next: NextFunction) {
    try {
      const { visaId, profile } = req.body;

      if (!visaId || !profile) {
        throw new ApiError(400, 'visaId and profile are required');
      }

      const { data: visa, error } = await supabaseAdmin
        .from('visa_routes')
        .select('*')
        .eq('id', visaId)
        .single();

      if (error || !visa) throw new ApiError(404, 'Visa route not found');

      const compatibility = this.analyzeCompatibility(visa, profile);

      res.json({
        status: 'success',
        data: {
          visa,
          compatibility,
          disclaimer:
            'Esta rota apresenta compatibilidade potencial. Nenhuma aprovação de visto é garantida. Consulte sempre a fonte oficial.',
        },
      });
    } catch (error) {
      next(error);
    }
  }

  private analyzeCompatibility(visa: any, profile: any) {
    const issues: string[] = [];
    const strengths: string[] = [];
    let score = 100;

    if (visa.min_age && profile.age < visa.min_age) {
      issues.push(`Idade mínima requerida: ${visa.min_age} anos`);
      score -= 20;
    }
    if (visa.max_age && profile.age > visa.max_age) {
      issues.push(`Idade máxima permitida: ${visa.max_age} anos`);
      score -= 20;
    }

    if (visa.experience_requirement && profile.yearsExperience < visa.experience_requirement) {
      issues.push(`Experiência mínima requerida: ${visa.experience_requirement} anos`);
      score -= 15;
    } else if (visa.experience_requirement) {
      strengths.push('Experiência profissional adequada');
    }

    if (visa.language_requirement) {
      const level = profile.englishLevel;
      if (level === 'C1' || level === 'C2') strengths.push('Nível de idioma excelente');
      else if (level === 'B1' || level === 'B2') strengths.push('Nível de idioma adequado');
      else {
        issues.push('Comprovação de idioma necessária');
        score -= 15;
      }
    }

    if (visa.min_income && profile.monthlyIncome < Number(visa.min_income)) {
      issues.push(`Renda mínima requerida: ${visa.min_income} ${visa.fee_currency || ''}`);
      score -= 25;
    } else if (visa.min_income) {
      strengths.push('Renda compatível com requisitos');
    }

    let level: 'high' | 'medium' | 'low';
    if (score >= 80) level = 'high';
    else if (score >= 60) level = 'medium';
    else level = 'low';

    const recommendations: Record<string, string> = {
      high: 'Você possui alta compatibilidade com esta rota migratória. Recomendamos verificar os requisitos na fonte oficial e prosseguir com a aplicação.',
      medium: 'Você possui compatibilidade parcial. Revise os requisitos pendentes antes de aplicar.',
      low: 'Compatibilidade baixa. Considere outras rotas ou melhore seu perfil antes de aplicar.',
    };

    return {
      level,
      score: Math.max(0, score),
      strengths,
      issues,
      recommendation: recommendations[level],
    };
  }
}

export const visaController = new VisaController();
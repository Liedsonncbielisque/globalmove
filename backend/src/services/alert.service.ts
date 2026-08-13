import { supabaseAdmin } from '../config/supabase';
import { logger } from '../utils/logger';

export interface Alert {
  id: string;
  userId: string;
  type: 'currency' | 'rent' | 'flight' | 'visa' | 'goal' | 'system';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: string;
}

export class AlertService {
  /**
   * Cria um novo alerta
   */
  async createAlert(params: {
    userId: string;
    type: Alert['type'];
    title: string;
    message: string;
    data?: any;
  }): Promise<Alert | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('alerts')
        .insert({
          user_id: params.userId,
          type: params.type,
          title: params.title,
          message: params.message,
          data: params.data,
          read: false,
        })
        .select()
        .single();

      if (error) throw error;

      logger.info(`Alert created for user ${params.userId}: ${params.title}`);
      return data;
    } catch (error) {
      logger.error('Error creating alert:', error);
      return null;
    }
  }

  /**
   * Busca alertas de um usuário
   */
  async getUserAlerts(userId: string, unreadOnly: boolean = false): Promise<Alert[]> {
    try {
      let query = supabaseAdmin
        .from('alerts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (unreadOnly) {
        query = query.eq('read', false);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data || [];
    } catch (error) {
      logger.error('Error fetching alerts:', error);
      return [];
    }
  }

  /**
   * Marca alerta como lido
   */
  async markAsRead(alertId: string): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .from('alerts')
        .update({ read: true })
        .eq('id', alertId);

      if (error) throw error;

      return true;
    } catch (error) {
      logger.error('Error marking alert as read:', error);
      return false;
    }
  }

  /**
   * Marca todos os alertas como lidos
   */
  async markAllAsRead(userId: string): Promise<boolean> {
    try {
      const { error } = await supabaseAdmin
        .from('alerts')
        .update({ read: true })
        .eq('user_id', userId)
        .eq('read', false);

      if (error) throw error;

      return true;
    } catch (error) {
      logger.error('Error marking all alerts as read:', error);
      return false;
    }
  }

  /**
   * Verifica mudanças de câmbio e cria alertas
   */
  async checkCurrencyAlerts(): Promise<void> {
    try {
      // Buscar usuários com metas ativas
      const { data: goals } = await supabaseAdmin
        .from('goals')
        .select('user_id, target_country_id, countries(currency)')
        .eq('status', 'active');

      if (!goals) return;

      // Lógica de verificação de câmbio
      // (Implementar quando tiver dados históricos)

      logger.info('Currency alerts checked');
    } catch (error) {
      logger.error('Error checking currency alerts:', error);
    }
  }

  /**
   * Verifica progresso de metas e cria alertas
   */
  async checkGoalProgress(userId: string): Promise<void> {
    try {
      const { data: goals } = await supabaseAdmin
        .from('goals')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active');

      if (!goals) return;

      for (const goal of goals) {
        const progress = (Number(goal.current_amount) / Number(goal.target_amount)) * 100;

        // Alerta de 80% da meta
        if (progress >= 80 && progress < 81) {
          await this.createAlert({
            userId,
            type: 'goal',
            title: '🎯 Você atingiu 80% da sua meta!',
            message: `Faltam apenas ${Number(goal.target_amount) - Number(goal.current_amount)} para atingir sua meta.`,
            data: { goalId: goal.id, progress },
          });
        }

        // Alerta de meta atingida
        if (progress >= 100) {
          await this.createAlert({
            userId,
            type: 'goal',
            title: '🎉 Parabéns! Você atingiu sua meta!',
            message: 'Você já pode começar a planejar sua mudança.',
            data: { goalId: goal.id, progress },
          });

          // Atualizar status da meta
          await supabaseAdmin
            .from('goals')
            .update({ status: 'completed' })
            .eq('id', goal.id);
        }
      }
    } catch (error) {
      logger.error('Error checking goal progress:', error);
    }
  }
}

export const alertService = new AlertService();
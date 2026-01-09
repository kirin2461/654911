import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SubscriptionPlan {
  id: number;
  slug: string;
  name: string;
  base_price_rub: number;
  video_retention_days: number;
  messages_retention_days: number;
  boards_persist_flag: boolean;
  jarvis_daily_limit: number;
  is_active: boolean;
}

interface SeatPrice {
  id: number;
  plan_id: number;
  seat_type: string;
  price_per_month_rub: number;
  is_billable: boolean;
}

interface PricingLog {
  id: number;
  table_name: string;
  field_name: string;
  old_value: string;
  new_value: string;
  changed_at: string;
}

export const AdminPricingPanel: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [seatPrices, setSeatPrices] = useState<SeatPrice[]>([]);
  const [logs, setLogs] = useState<PricingLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [plansRes, pricesRes, logsRes] = await Promise.all([
        axios.get('/api/admin/pricing/plans'),
        axios.get('/api/admin/pricing/seats'),
        axios.get('/api/admin/pricing/logs')
      ]);
      setPlans(plansRes.data);
      setSeatPrices(pricesRes.data);
      setLogs(logsRes.data);
    } catch (error) {
      console.error('Error fetching pricing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlan = async (plan: SubscriptionPlan) => {
    try {
      await axios.post('/api/admin/pricing/plans/update', plan);
      setEditingPlan(null);
      fetchData();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const handleUpdateSeatPrice = async (seatPrice: SeatPrice) => {
    try {
      await axios.post('/api/admin/pricing/seats/update', seatPrice);
      fetchData();
    } catch (error) {
      console.error('Error updating seat price:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-pricing-panel">
      <h1>Управление ценами подписок</h1>

      {/* Планы подписок */}
      <section className="section-plans">
        <h2>Планы подписок</h2>
        <table className="plans-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Базовая цена (₽)</th>
              <th>Видео (дней)</th>
              <th>Jarvis (запр/день)</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.name}</td>
                <td>
                  {editingPlan?.id === plan.id ? (
                    <input
                      type="number"
                      value={editingPlan.base_price_rub}
                      onChange={(e) => setEditingPlan({...editingPlan, base_price_rub: parseFloat(e.target.value)})}
                    />
                  ) : (
                    plan.base_price_rub
                  )}
                </td>
                <td>
                  {editingPlan?.id === plan.id ? (
                    <input
                      type="number"
                      value={editingPlan.video_retention_days}
                      onChange={(e) => setEditingPlan({...editingPlan, video_retention_days: parseInt(e.target.value)})}
                    />
                  ) : (
                    plan.video_retention_days
                  )}
                </td>
                <td>
                  {editingPlan?.id === plan.id ? (
                    <input
                      type="number"
                      value={editingPlan.jarvis_daily_limit}
                      onChange={(e) => setEditingPlan({...editingPlan, jarvis_daily_limit: parseInt(e.target.value)})}
                    />
                  ) : (
                    plan.jarvis_daily_limit
                  )}
                </td>
                <td>
                  {editingPlan?.id === plan.id ? (
                    <>
                      <button onClick={() => handleUpdatePlan(editingPlan)}>Сохранить</button>
                      <button onClick={() => setEditingPlan(null)}>Отмена</button>
                    </>
                  ) : (
                    <button onClick={() => setEditingPlan(plan)}>Редактировать</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Цены на места */}
      <section className="section-seats">
        <h2>Цены на роли (Seats)</h2>
        <table className="seats-table">
          <thead>
            <tr>
              <th>План</th>
              <th>Тип роли</th>
              <th>Цена (₽/мес)</th>
              <th>Billable</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {seatPrices.map(seat => (
              <tr key={seat.id}>
                <td>{plans.find(p => p.id === seat.plan_id)?.name}</td>
                <td>{seat.seat_type}</td>
                <td>
                  <input
                    type="number"
                    value={seat.price_per_month_rub}
                    onChange={(e) => {
                      const updated = {...seat, price_per_month_rub: parseFloat(e.target.value)};
                      handleUpdateSeatPrice(updated);
                    }}
                  />
                </td>
                <td>{seat.is_billable ? 'Да' : 'Нет'}</td>
                <td>
                  <button onClick={() => handleUpdateSeatPrice(seat)}>Применить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Логи изменений */}
      <section className="section-logs">
        <h2>История изменений</h2>
        <table className="logs-table">
          <thead>
            <tr>
              <th>Таблица</th>
              <th>Поле</th>
              <th>Старое значение</th>
              <th>Новое значение</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {logs.slice(0, 20).map(log => (
              <tr key={log.id}>
                <td>{log.table_name}</td>
                <td>{log.field_name}</td>
                <td>{log.old_value}</td>
                <td>{log.new_value}</td>
                <td>{new Date(log.changed_at).toLocaleString('ru-RU')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPricingPanel;

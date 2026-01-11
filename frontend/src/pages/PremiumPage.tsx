import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { premiumAPI } from "@/lib/api";
import { useStore } from "@/lib/store";
import { Crown, Check, Sparkles, Zap, Shield, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumPlan {
  id: number;
  name: string;
  price_rub: number;
  duration_days: number;
  features: string;
  is_active: boolean;
}

interface UserPremium {
  has_premium: boolean;
  plan_name?: string;
  expires_at?: string;
}

export default function PremiumPage() {
  const { user, isAuthenticated } = useStore();
  const [plans, setPlans] = useState<PremiumPlan[]>([]);
  const [userPremium, setUserPremium] = useState<UserPremium | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [plansData, premiumData] = await Promise.all([
          premiumAPI.getPlans(),
          isAuthenticated && user?.id ? premiumAPI.getUserPremium(String(user.id)) : null,
        ]);
        setPlans(plansData || []);
        setUserPremium(premiumData);
      } catch (error) {
        console.error("Failed to load premium data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [isAuthenticated, user?.id]);

  const handlePurchase = async (planId: number) => {
    if (!isAuthenticated) {
      alert("Войдите в аккаунт для покупки подписки");
      return;
    }
    
    setPurchasing(planId);
    try {
      alert("Функция покупки будет доступна после интеграции платёжной системы");
    } catch (error) {
      console.error("Failed to purchase:", error);
      alert("Ошибка при оформлении подписки");
    } finally {
      setPurchasing(null);
    }
  };

  const parseFeatures = (featuresStr: string): string[] => {
    try {
      return JSON.parse(featuresStr);
    } catch {
      return featuresStr.split(",").map(f => f.trim()).filter(Boolean);
    }
  };

  const getPlanIcon = (index: number) => {
    const icons = [Zap, Star, Crown];
    return icons[index % icons.length];
  };

  const getPlanColor = (index: number) => {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-yellow-500 to-amber-500",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 sm:p-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 mb-6">
            <Crown className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500 font-medium">Premium</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Откройте все возможности</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Получите доступ к эксклюзивным функциям и поддержите развитие платформы
          </p>
        </div>

        {userPremium?.has_premium && (
          <Card className="cosmic-border p-6 mb-8 bg-gradient-to-r from-yellow-500/10 to-amber-500/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">У вас активна подписка {userPremium.plan_name}</h3>
                {userPremium.expires_at && (
                  <p className="text-muted-foreground">
                    Действует до {new Date(userPremium.expires_at).toLocaleDateString("ru-RU")}
                  </p>
                )}
              </div>
              <Shield className="w-8 h-8 text-green-500 ml-auto" />
            </div>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.length > 0 ? (
            plans.map((plan, index) => {
              const Icon = getPlanIcon(index);
              const gradientColor = getPlanColor(index);
              const features = parseFeatures(plan.features);
              const isPopular = index === 1;

              return (
                <Card
                  key={plan.id}
                  className={cn(
                    "cosmic-border relative overflow-hidden transition-all hover:scale-105",
                    isPopular && "ring-2 ring-primary"
                  )}
                >
                  {isPopular && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-bl-lg">
                      Популярный
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center mb-4",
                      gradientColor
                    )}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-bold">{plan.price_rub}₽</span>
                      <span className="text-muted-foreground">/ {plan.duration_days} дней</span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePurchase(plan.id)}
                      loading={purchasing === plan.id}
                      disabled={!isAuthenticated || userPremium?.has_premium}
                      className={cn(
                        "w-full",
                        isPopular && "bg-gradient-to-r from-primary to-accent"
                      )}
                    >
                      {userPremium?.has_premium ? (
                        "Уже активно"
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Оформить
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <Crown className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Планы подписки скоро появятся</h3>
              <p className="text-muted-foreground">
                Мы готовим для вас эксклюзивные предложения
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Почему Premium?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 rounded-xl bg-card/50 border border-border/50">
              <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Расширенные возможности</h3>
              <p className="text-sm text-muted-foreground">
                Доступ к эксклюзивным функциям и инструментам
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 border border-border/50">
              <Shield className="w-10 h-10 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Приоритетная поддержка</h3>
              <p className="text-sm text-muted-foreground">
                Быстрые ответы от команды поддержки
              </p>
            </div>
            <div className="p-6 rounded-xl bg-card/50 border border-border/50">
              <Crown className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Эксклюзивный значок</h3>
              <p className="text-sm text-muted-foreground">
                Выделяйтесь среди других пользователей
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

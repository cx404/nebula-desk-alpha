import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, TrendingUp, TrendingDown, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  // 模拟数据
  const balanceData = {
    current: 1000.00,
    totalRecharge: 2000.00,
    totalConsumption: 1000.00,
    percentage: 50
  };

  const transactionRecords = [
    {
      id: 1,
      type: "recharge",
      title: "充值",
      date: "2024-01-13",
      amount: 500.00,
      description: "账户充值金额"
    },
    {
      id: 2,
      type: "consumption",
      title: "GPT-2模型训练",
      date: "2024-01-12",
      amount: -89.50,
      description: "模型训练消费"
    },
    {
      id: 3,
      type: "consumption",
      title: "BERT模型部署",
      date: "2024-01-13",
      amount: -45.20,
      description: "模型部署消费"
    },
    {
      id: 4,
      type: "recharge",
      title: "充值",
      date: "2024-01-12",
      amount: 1000.00,
      description: "账户充值金额"
    },
    {
      id: 5,
      type: "consumption",
      title: "数据预处理",
      date: "2024-01-11",
      amount: -12.10,
      description: "数据处理消费"
    }
  ];

  const upcomingCharges = [
    {
      id: 1,
      title: "模型训练任务",
      date: "2024-01-15",
      estimatedAmount: -120.00,
      status: "pending"
    },
    {
      id: 2,
      title: "GPU实例租用",
      date: "2024-01-16",
      estimatedAmount: -75.50,
      status: "pending"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* 头部 */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                返回
              </Button>
              <div>
                <h1 className="text-2xl font-bold">账户余额详情</h1>
                <p className="text-sm text-muted-foreground">账户、交易记录、消费明细</p>
              </div>
            </div>
            <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4" />
              充值
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 余额卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                当前余额
                <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  {balanceData.percentage}%
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                ¥{balanceData.current.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                可用算力：8 GPU
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                总充值
                <ArrowUp className="h-4 w-4 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                ¥{balanceData.totalRecharge.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                累计充值金额
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                已消费
                <ArrowDown className="h-4 w-4 text-red-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                ¥{balanceData.totalConsumption.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                累计消费金额
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 记录列表 */}
        <Card>
          <CardHeader>
            <Tabs defaultValue="consumption">
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="consumption">消费记录</TabsTrigger>
                <TabsTrigger value="upcoming">即将扣费</TabsTrigger>
              </TabsList>

              <TabsContent value="consumption" className="mt-6">
                <div className="space-y-4">
                  {transactionRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          record.type === 'recharge' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {record.type === 'recharge' ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{record.title}</div>
                          <div className="text-sm text-muted-foreground">{record.date}</div>
                        </div>
                      </div>
                      <div className={`text-lg font-semibold ${
                        record.type === 'recharge' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {record.type === 'recharge' ? '+' : ''}¥{Math.abs(record.amount).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-6">
                <div className="space-y-4">
                  {upcomingCharges.map((charge) => (
                    <div key={charge.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                          <TrendingDown className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{charge.title}</div>
                          <div className="text-sm text-muted-foreground">预计扣费时间：{charge.date}</div>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-yellow-600">
                        ¥{Math.abs(charge.estimatedAmount).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
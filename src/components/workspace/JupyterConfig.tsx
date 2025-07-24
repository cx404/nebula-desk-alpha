import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JupyterConfigProps {
  onBack?: () => void;
}

export const JupyterConfig = ({ onBack }: JupyterConfigProps) => {
  const configurations = [
    {
      id: "cpu",
      name: "CPU",
      description: "单次运行时长为16小时，关闭后会释放资源",
      specs: "4u 16G 20G",
      image: "python3.9-ms2.5.0",
      features: "预装mindscore、numpy、pandas等依赖",
      badge: "免费"
    },
    {
      id: "ascend",
      name: "Ascend",
      description: "单次运行时长为16小时，关闭后会释放资源",
      specs: "1*ascend-snt9|ARM: 19核 90GB",
      image: "python3.9-ms2.6.0-cann8.1.RC1.beta1",
      features: "预装mindscore、numpy、pandas等依赖",
      badge: "免费"
    },
    {
      id: "ascend-snt9b",
      name: "Ascend-snt9b",
      description: "单次运行时长为16小时，关闭后会释放资源",
      specs: "1*ascend-snt9b|ARM: 19核 180GB",
      image: "python3.9-ms2.6.0-cann8.1.RC1.beta1",
      features: "预装mindscore、numpy、pandas等依赖",
      badge: "免费"
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Jupyter云上开发</h1>
        <p className="text-gray-400">
          云上开发环境，无需配置环境，既可灵活调试运行代码，注意一个用户只能启动一个jupyter实例，自16小时后会自动释放资源，到期时间前请及时将资源下载到本地。
        </p>
      </div>

      {/* 配置卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {configurations.map((config) => (
          <Card key={config.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
            <div className="space-y-4">
              {/* 卡片头部 */}
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold text-white">{config.name}</h3>
                <Badge className="bg-blue-500 text-white border-0 hover:bg-blue-600">
                  {config.badge}
                </Badge>
              </div>

              {/* 描述 */}
              <p className="text-sm text-gray-400">{config.description}</p>

              {/* 规格 */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">规格：</label>
                  <Select defaultValue={config.specs}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={config.specs}>{config.specs}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 镜像 */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">镜像：</label>
                  <Select defaultValue={config.image}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={config.image}>{config.image}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 特性 */}
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">特性：</label>
                  <p className="text-sm text-gray-400">{config.features}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 底部按钮 */}
      <div className="flex justify-center">
        <Button 
          size="lg" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-3 rounded-xl text-lg font-semibold"
        >
          启动
        </Button>
      </div>
    </div>
  );
};
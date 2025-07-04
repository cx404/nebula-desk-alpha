import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ModelDeploymentProps {
  onDeploy: (config: DeploymentConfig) => void;
}

interface DeploymentConfig {
  modelName: string;
  modelType: string;
  gpuType: string;
  replicas: number;
  memoryLimit: string;
  apiEndpoint: string;
}

export const ModelDeployment = ({ onDeploy }: ModelDeploymentProps) => {
  const [config, setConfig] = useState<DeploymentConfig>({
    modelName: "",
    modelType: "LLM",
    gpuType: "A100",
    replicas: 1,
    memoryLimit: "16Gi",
    apiEndpoint: "",
  });
  
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<"idle" | "deploying" | "success" | "error">("idle");

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentStatus("deploying");
    
    // 模拟部署过程
    setTimeout(() => {
      setIsDeploying(false);
      setDeploymentStatus("success");
      onDeploy(config);
      
      // 生成API端点
      const endpoint = `https://api.${config.modelName.toLowerCase().replace(/\s+/g, '-')}.your-domain.com`;
      setConfig(prev => ({ ...prev, apiEndpoint: endpoint }));
    }, 3000);
  };

  const predefinedModels = [
    { name: "DeepSeek-R1", type: "LLM", description: "推理优化模型" },
    { name: "GPT-4", type: "LLM", description: "通用语言模型" },
    { name: "DALL-E 3", type: "Image", description: "图像生成模型" },
    { name: "Whisper", type: "Audio", description: "语音识别模型" },
    { name: "CLIP", type: "MultiModal", description: "多模态模型" },
    { name: "CodeLlama", type: "Code", description: "代码生成模型" },
  ];

  return (
    <Card className="glass-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">模型部署</h3>
        <Badge className={`${
          deploymentStatus === "success" ? "bg-green-500/10 text-green-400 border-green-500/20" :
          deploymentStatus === "deploying" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
          deploymentStatus === "error" ? "bg-red-500/10 text-red-400 border-red-500/20" :
          "bg-gray-500/10 text-gray-400 border-gray-500/20"
        }`}>
          {deploymentStatus === "deploying" ? "部署中..." : 
           deploymentStatus === "success" ? "部署成功" :
           deploymentStatus === "error" ? "部署失败" : "待部署"}
        </Badge>
      </div>

      {/* 预置模型选择 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-white mb-3">选择预置模型</h4>
        <div className="grid grid-cols-2 gap-3">
          {predefinedModels.map((model) => (
            <div
              key={model.name}
              className={`p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/10 ${
                config.modelName === model.name ? 'ring-2 ring-blue-500 bg-blue-500/10' : ''
              }`}
              onClick={() => setConfig(prev => ({ ...prev, modelName: model.name, modelType: model.type }))}
            >
              <div className="flex justify-between items-center mb-1">
                <h5 className="font-medium text-white text-sm">{model.name}</h5>
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-xs">
                  {model.type}
                </Badge>
              </div>
              <p className="text-xs text-gray-400">{model.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 自定义模型配置 */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm text-gray-400 block mb-1">模型名称</label>
          <Input
            className="bg-white/5 border-white/10 text-white"
            value={config.modelName}
            onChange={(e) => setConfig(prev => ({ ...prev, modelName: e.target.value }))}
            placeholder="输入模型名称或选择预置模型"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1">GPU类型</label>
            <select 
              className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white"
              value={config.gpuType}
              onChange={(e) => setConfig(prev => ({ ...prev, gpuType: e.target.value }))}
            >
              <option value="A100">NVIDIA A100</option>
              <option value="V100">NVIDIA V100</option>
              <option value="T4">NVIDIA T4</option>
              <option value="H100">NVIDIA H100</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm text-gray-400 block mb-1">副本数</label>
            <Input
              type="number"
              className="bg-white/5 border-white/10 text-white"
              value={config.replicas}
              onChange={(e) => setConfig(prev => ({ ...prev, replicas: parseInt(e.target.value) }))}
              min="1"
              max="10"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 block mb-1">内存限制</label>
          <select 
            className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white"
            value={config.memoryLimit}
            onChange={(e) => setConfig(prev => ({ ...prev, memoryLimit: e.target.value }))}
          >
            <option value="8Gi">8GB</option>
            <option value="16Gi">16GB</option>
            <option value="32Gi">32GB</option>
            <option value="64Gi">64GB</option>
          </select>
        </div>
      </div>

      {/* API端点显示 */}
      {config.apiEndpoint && (
        <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
          <label className="text-sm text-gray-400 block mb-1">API端点</label>
          <div className="flex items-center gap-2">
            <code className="text-xs text-green-400 bg-black/20 px-2 py-1 rounded flex-1">
              {config.apiEndpoint}
            </code>
            <Button
              size="sm"
              className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30"
              onClick={() => navigator.clipboard.writeText(config.apiEndpoint)}
            >
              复制
            </Button>
          </div>
        </div>
      )}

      {/* 部署按钮 */}
      <Button
        onClick={handleDeploy}
        disabled={!config.modelName || isDeploying}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white disabled:opacity-50"
      >
        {isDeploying ? "部署中..." : "🚀 部署模型"}
      </Button>

      {/* 部署进度 */}
      {isDeploying && (
        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-400">部署进度:</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white">正在分配GPU资源...</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-white">正在加载模型文件...</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-white">正在启动API服务...</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
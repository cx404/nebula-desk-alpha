import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserMenu } from "@/components/UserMenu";
import { ResourceMonitorChart } from "@/components/charts/ResourceMonitorChart";
import { BillingChart } from "@/components/charts/BillingChart";
import { APIUsageChart } from "@/components/charts/APIUsageChart";
import { PerformanceChart } from "@/components/charts/PerformanceChart";
import { Canvas } from "@/components/workspace/Canvas";
import { ModelDeployment } from "@/components/workspace/ModelDeployment";
import { AIAgent } from "@/components/workspace/AIAgent";
import { mockDataService } from "@/services/mockDataService";

const Workspace = () => {
  const [selectedNav, setSelectedNav] = useState("dashboard");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: "assistant", content: "您好！我是Alaya AI助手，可以帮您管理工作空间、部署模型、执行AI任务。试试说'帮我部署一个模型'或'调整画布布局'？" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  
  // 图表数据状态
  const [resourceData, setResourceData] = useState([]);
  const [billingData, setBillingData] = useState([]);
  const [apiUsageData, setApiUsageData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  
  // AI Agent状态
  const [agentTasks, setAgentTasks] = useState([]);
  
  // 初始化和更新数据
  useEffect(() => {
    const updateData = () => {
      setResourceData(mockDataService.generateResourceData());
      setBillingData(mockDataService.generateBillingData());
      setApiUsageData(mockDataService.generateAPIUsageData());
      setPerformanceData(mockDataService.generatePerformanceData());
    };
    
    updateData();
    const interval = setInterval(updateData, 30000); // 每30秒更新一次
    
    return () => clearInterval(interval);
  }, []);

  // AI Agent执行指令
  const handleExecuteCommand = async (command: string): Promise<string> => {
    // 这里可以集成真实的AI模型API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`已执行指令: ${command}`);
      }, 1000);
    });
  };

  // AI Agent更新画布
  const handleUpdateCanvas = (action: string, params: any) => {
    console.log('Canvas update:', action, params);
    // 这里可以实现实际的画布更新逻辑
  };

  // 模型部署处理
  const handleModelDeploy = (config: any) => {
    console.log('Model deployment:', config);
    // 实际的模型部署逻辑
  };

  const navGroups = [
    {
      title: "主菜单",
      items: [
        { id: "dashboard", name: "仪表盘", icon: "📊" },
        { id: "compute", name: "算力管理", icon: "⚡" },
      ]
    },
    {
      title: "资源",
      items: [
        { id: "marketplace", name: "组件市场", icon: "🛍️" },
        { id: "community", name: "社区", icon: "👥" },
        { id: "docs", name: "文档", icon: "📖" },
      ]
    },
    {
      title: "设置",
      items: [
        { id: "personal", name: "个人设置", icon: "👤" },
        { id: "platform", name: "平台设置", icon: "⚙️" },
        { id: "billing", name: "计费中心", icon: "💳" },
      ]
    }
  ];

  const workspaceItems = [
    { id: "notebook", name: "Jupyter Notebook", icon: "📓", x: 100, y: 100 },
    { id: "vscode", name: "VS Code", icon: "💻", x: 250, y: 100 },
    { id: "terminal", name: "Terminal", icon: "⚡", x: 400, y: 100 },
    { id: "browser", name: "Browser", icon: "🌐", x: 100, y: 250 },
    { id: "docker", name: "Docker", icon: "🐳", x: 250, y: 250 },
    { id: "git", name: "Git Client", icon: "📋", x: 400, y: 250 },
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = { id: Date.now(), type: "user", content: newMessage };
    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // 增强的AI回复逻辑
    setTimeout(() => {
      let response = "我已经收到您的消息，正在为您处理...";
      
      const message = newMessage.toLowerCase();
      if (message.includes("部署") && message.includes("模型")) {
        response = "我可以帮您部署模型！请告诉我模型类型和配置要求，我将为您自动配置GPU资源并启动部署流程。";
      } else if (message.includes("画布") || message.includes("布局")) {
        response = "我可以帮您调整工作空间布局！您可以说'添加Terminal组件'或'重新排列组件'，我会自动操作画布。";
      } else if (message.includes("监控") || message.includes("资源")) {
        response = "让我为您查看当前资源使用情况... 当前GPU使用率78%，建议优化算力分配以提升效率。";
      } else if (message.includes("费用") || message.includes("账单")) {
        response = "根据当前使用情况，本月预计费用¥1,234，比上月增长12%。我建议启用自动资源调度来优化成本。";
      }
      
      const aiResponse = { id: Date.now() + 1, type: "assistant", content: response };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // 渲染不同导航项的内容看板
  const renderContent = () => {
    switch (selectedNav) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">仪表盘</h2>
              <p className="text-gray-400">项目总览和系统状态</p>
            </div>
            
            {/* 概览卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">活跃项目</h3>
                    <p className="text-3xl font-bold text-blue-400">3</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">算力使用</h3>
                    <p className="text-3xl font-bold text-green-400">78%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">今日费用</h3>
                    <p className="text-3xl font-bold text-purple-400">¥126</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 图表区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResourceMonitorChart data={resourceData} />
              <APIUsageChart data={apiUsageData} />
            </div>
          </div>
        );
      
      case "compute":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">算力管理</h2>
              <p className="text-gray-400">管理和监控计算资源</p>
            </div>
            
            {/* GPU实例列表 */}
            <Card className="glass-card p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-white">GPU 实例</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <p className="font-medium text-white">NVIDIA A100</p>
                    <p className="text-sm text-gray-400">80GB 显存</p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                    运行中
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <p className="font-medium text-white">NVIDIA V100</p>
                    <p className="text-sm text-gray-400">32GB 显存</p>
                  </div>
                  <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20">
                    已停止
                  </Badge>
                </div>
              </div>
            </Card>

            {/* 资源监控图表 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResourceMonitorChart data={resourceData} />
              <PerformanceChart data={performanceData} />
            </div>
          </div>
        );
      
      case "environment":
        return <Canvas />;
      
      case "model":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">模型部署</h2>
              <p className="text-gray-400">部署和管理AI模型</p>
            </div>
            <ModelDeployment onDeploy={handleModelDeploy} />
          </div>
        );
      
      case "dataset":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">数据集</h2>
              <p className="text-muted-foreground">管理训练和测试数据集</p>
            </div>
            <Card className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">我的数据集</h3>
                <Button variant="outline" size="sm">
                  ➕ 上传数据集
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📊</span>
                    <div>
                      <p className="font-medium">CIFAR-10</p>
                      <p className="text-xs text-muted-foreground">图像分类数据集</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">50MB</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-card/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">📝</span>
                    <div>
                      <p className="font-medium">Text Corpus</p>
                      <p className="text-xs text-muted-foreground">自然语言处理数据</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">128MB</span>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case "tasks":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">任务管理</h2>
              <p className="text-muted-foreground">监控训练任务和作业状态</p>
            </div>
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">运行中的任务</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">图像分类模型训练</h4>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                      训练中
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">ResNet50 在 CIFAR-10 数据集上的训练</p>
                  <div className="w-full bg-border/50 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Epoch 65/100</p>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case "model":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">模型部署</h2>
              <p className="text-muted-foreground">部署和管理AI模型</p>
            </div>
            <Card className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">已部署模型</h3>
                <Button variant="outline" size="sm">
                  🚀 部署新模型
                </Button>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-card/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">GPT-3.5 微调模型</h4>
                      <p className="text-sm text-muted-foreground">文本生成模型</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        在线
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">QPS: 45</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      
      case "marketplace":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">组件市场</h2>
              <p className="text-gray-400">发现和安装各种开发组件</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">数据可视化</h3>
                    <p className="text-sm text-gray-400">Chart.js 组件包</p>
                  </div>
                </div>
                <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30">
                  安装
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI 模型</h3>
                    <p className="text-sm text-gray-400">预训练模型库</p>
                  </div>
                </div>
                <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/30">
                  安装
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <span className="text-xl">🔧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">开发工具</h3>
                    <p className="text-sm text-gray-400">调试和测试工具</p>
                  </div>
                </div>
                <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30">
                  安装
                </Button>
              </div>
            </div>
          </div>
        );

      case "community":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">社区</h2>
              <p className="text-gray-400">与开发者交流和分享经验</p>
            </div>
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 text-white">热门讨论</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">如何优化GPU使用率？</h4>
                      <p className="text-sm text-gray-400 mt-1">在深度学习训练中，如何最大化GPU利用率...</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>👍 23</span>
                        <span>💬 12</span>
                        <span>2小时前</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">分享：自动化部署脚本</h4>
                      <p className="text-sm text-gray-400 mt-1">分享一个可以自动部署模型到生产环境的脚本...</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>👍 45</span>
                        <span>💬 8</span>
                        <span>5小时前</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case "docs":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">文档</h2>
              <p className="text-gray-400">查看API文档和使用指南</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">快速开始</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="font-medium text-white">🚀 平台介绍</h4>
                    <p className="text-sm text-gray-400">了解算力云桌面的基本功能</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="font-medium text-white">⚡ 环境配置</h4>
                    <p className="text-sm text-gray-400">设置开发环境和依赖</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="font-medium text-white">🔧 工具使用</h4>
                    <p className="text-sm text-gray-400">常用开发工具的使用方法</p>
                  </div>
                </div>
              </Card>
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">API 参考</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="font-medium text-white">📡 REST API</h4>
                    <p className="text-sm text-gray-400">完整的REST API文档</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="font-medium text-white">🔌 SDK</h4>
                    <p className="text-sm text-gray-400">各语言SDK使用指南</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="font-medium text-white">📝 示例代码</h4>
                    <p className="text-sm text-gray-400">常见场景的代码示例</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case "personal":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">个人设置</h2>
              <p className="text-gray-400">管理个人账户和偏好设置</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">账户信息</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">用户名</label>
                    <Input className="mt-1 bg-white/5 border-white/10 text-white" defaultValue="developer@example.com" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">显示名称</label>
                    <Input className="mt-1 bg-white/5 border-white/10 text-white" defaultValue="开发者" />
                  </div>
                  <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30">
                    更新信息
                  </Button>
                </div>
              </Card>
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">偏好设置</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">深色模式</span>
                    <div className="w-10 h-6 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">邮件通知</span>
                    <div className="w-10 h-6 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">自动保存</span>
                    <div className="w-10 h-6 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case "platform":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">平台设置</h2>
              <p className="text-gray-400">配置平台级别的选项和权限</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">资源配置</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">默认GPU类型</label>
                    <select className="w-full mt-1 p-2 bg-white/5 border border-white/10 rounded-lg text-white">
                      <option value="a100">NVIDIA A100</option>
                      <option value="v100">NVIDIA V100</option>
                      <option value="t4">NVIDIA T4</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">内存限制 (GB)</label>
                    <Input className="mt-1 bg-white/5 border-white/10 text-white" defaultValue="32" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">存储限制 (GB)</label>
                    <Input className="mt-1 bg-white/5 border-white/10 text-white" defaultValue="500" />
                  </div>
                </div>
              </Card>
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">安全设置</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">双重认证</span>
                    <div className="w-10 h-6 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">IP白名单</span>
                    <div className="w-10 h-6 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">API访问控制</span>
                    <div className="w-10 h-6 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">计费中心</h2>
              <p className="text-gray-400">管理账单、费用和支付方式</p>
            </div>
            
            {/* 费用概览 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-center">
                  <h3 className="font-semibold text-white mb-2">本月费用</h3>
                  <p className="text-3xl font-bold text-blue-400">¥1,234</p>
                  <p className="text-sm text-gray-400 mt-1">比上月增长 12%</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-center">
                  <h3 className="font-semibold text-white mb-2">账户余额</h3>
                  <p className="text-3xl font-bold text-green-400">¥856</p>
                  <p className="text-sm text-gray-400 mt-1">可用 2.5 个月</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="text-center">
                  <h3 className="font-semibold text-white mb-2">预计下月</h3>
                  <p className="text-3xl font-bold text-purple-400">¥1,089</p>
                  <p className="text-sm text-gray-400 mt-1">基于当前使用</p>
                </div>
              </div>
            </div>

            {/* 费用趋势图表 */}
            <BillingChart data={billingData} />

            {/* 账单列表 */}
            <Card className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">最近账单</h3>
                <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                  查看全部
                </Button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-medium text-white">2024年1月账单</p>
                    <p className="text-sm text-gray-400">GPU使用费 + 存储费</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">¥1,156</p>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">已支付</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-medium text-white">2023年12月账单</p>
                    <p className="text-sm text-gray-400">GPU使用费 + 存储费</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">¥1,089</p>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">已支付</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">自定义工作空间</h2>
              <p className="text-muted-foreground">拖拽组件创建您的专属工作环境</p>
            </div>
            <div className="relative h-[600px] bg-card/20 rounded-lg border-2 border-dashed border-border/50 overflow-hidden">
              {workspaceItems.map((item) => (
                <div
                  key={item.id}
                  className="absolute w-20 h-20 bg-card/80 backdrop-blur-lg rounded-lg border border-border/50 flex flex-col items-center justify-center cursor-move hover:scale-105 transition-transform group"
                  style={{ left: item.x, top: item.y }}
                >
                  <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs text-center leading-tight">{item.name}</span>
                </div>
              ))}
              <div className="absolute bottom-4 right-4">
                <Button variant="outline" className="bg-card/80 backdrop-blur-lg">
                  ➕ 添加组件
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex">
      {/* Left Navigation */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded"></div>
            </div>
            <span className="text-lg font-semibold text-white">算力云桌面</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-medium px-2">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left justify-start ${
                      selectedNav === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setSelectedNav(item.id)}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">工作空间</h1>
              <p className="text-gray-400 mt-1">自定义您的云桌面环境</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                运行中
              </Badge>
              <UserMenu />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="h-full">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Right AI Chat */}
      <div className="w-80 bg-white/5 backdrop-blur-xl border-l border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <span className="text-lg font-semibold text-white">Alaya AI助手</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">支持工作空间管理、模型部署、Agent自动执行</p>
        </div>
        
        {/* AI Agent面板 */}
        <div className="p-4 border-b border-white/10">
          <AIAgent 
            onExecuteCommand={handleExecuteCommand}
            onUpdateCanvas={handleUpdateCanvas}
          />
        </div>
        
        {/* 对话区域 */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/10 text-gray-200 border border-white/20'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex gap-2">
            <Input
              placeholder="输入消息..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-500"
            />
            <Button 
              onClick={handleSendMessage} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl"
            >
              发送
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
// 模拟数据服务
export const mockDataService = {
  // 生成资源监控数据
  generateResourceData: () => {
    const data = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      data.push({
        time: time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        cpu: Math.floor(Math.random() * 60) + 20,
        memory: Math.floor(Math.random() * 40) + 40,
        gpu: Math.floor(Math.random() * 80) + 10,
      });
    }
    return data;
  },

  // 生成费用数据
  generateBillingData: () => {
    const data = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const gpu = Math.floor(Math.random() * 200) + 100;
      const storage = Math.floor(Math.random() * 50) + 20;
      const api = Math.floor(Math.random() * 30) + 10;
      
      data.push({
        date: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
        cost: gpu + storage + api,
        gpu,
        storage,
        api,
      });
    }
    return data;
  },

  // 生成API使用数据
  generateAPIUsageData: () => {
    const data = [];
    const now = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 2 * 60 * 60 * 1000);
      data.push({
        time: time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        requests: Math.floor(Math.random() * 1000) + 200,
        errors: Math.floor(Math.random() * 50) + 5,
        latency: Math.floor(Math.random() * 200) + 50,
      });
    }
    return data;
  },

  // 生成性能数据
  generatePerformanceData: () => {
    const data = [];
    const models = ['GPT-4', 'Claude-3', 'DeepSeek-R1', 'LLaMA-2'];
    
    models.forEach(model => {
      data.push({
        model,
        throughput: Math.floor(Math.random() * 1000) + 500,
        latency: Math.floor(Math.random() * 500) + 100,
        accuracy: (Math.random() * 0.15 + 0.85).toFixed(3),
      });
    });
    
    return data;
  },

  // 生成工作空间布局数据
  generateLayoutData: (components: any[]) => {
    const layouts = [
      { name: "开发环境", components: ["notebook", "vscode", "terminal", "git"] },
      { name: "AI训练", components: ["notebook", "tensorboard", "gpu-monitor", "data-loader"] },
      { name: "部署环境", components: ["docker", "kubernetes", "monitor", "api-gateway"] },
    ];
    
    return layouts;
  },

  // 生成模型部署状态
  generateDeploymentStatus: () => {
    return [
      { name: "DeepSeek-R1", status: "running", replicas: 3, requests: 1250 },
      { name: "GPT-4-Mini", status: "scaling", replicas: 2, requests: 890 },
      { name: "Claude-3", status: "stopped", replicas: 0, requests: 0 },
    ];
  },
};
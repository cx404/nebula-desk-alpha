import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Plus, Star, Users } from "lucide-react";

const Index = () => {
  // Mock data for workspaces
  const recentWorkspaces = [
    { id: 1, name: "项目A", image: "/placeholder.svg" },
    { id: 2, name: "项目B", image: "/placeholder.svg" },
    { id: 3, name: "项目C", image: "/placeholder.svg" },
    { id: 4, name: "项目D", image: "/placeholder.svg" },
  ];

  // Mock data for community templates
  const communityTemplates = [
    { id: 1, name: "会议开发模板", author: "开发团队", rating: 4.8, downloads: 1.2, type: "k" },
    { id: 2, name: "机器学习模板", author: "AI技术", rating: 4.7, downloads: 950, type: "" },
    { id: 3, name: "数据科学模板", author: "数据团队", rating: 4.7, downloads: 756, type: "" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-white rounded-sm"></div>
          <span className="text-white font-semibold">Alaya NeW Cross</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="text-white border-white/30 hover:bg-white/10">
            登录
          </Button>
          <Button className="bg-white text-purple-900 hover:bg-white/90">
            注册
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* AI Assistant Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Star className="w-8 h-8" />
            AI 智能工作空间助手
            <Star className="w-8 h-8" />
          </h1>
          <p className="text-purple-200 mb-8">告诉我您的需求，我将为您量身定制完美的工作空间</p>
          
          {/* AI Chat Interface */}
          <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8 max-w-4xl mx-auto">
            <div className="bg-purple-700/50 rounded-xl p-4 mb-4">
              <p className="text-white text-left">你好！我是您的AI助手，可以帮助您创建完美的工作空间。请告诉我您需要哪些功能？</p>
            </div>
            <div className="flex items-center space-x-4">
              <input 
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-200"
                placeholder="描述您想创建的组织内容，我将帮助您建立一个完整的..."
              />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
                发送
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="flex justify-center space-x-4 mb-12">
            <div className="text-center">
              <div className="text-purple-200 text-sm mb-2">模版创建</div>
              <div className="text-purple-300 text-xs mb-3">从海量创建助手中快速启动</div>
              <Button className="bg-purple-700 hover:bg-purple-600 text-white">
                选择模板
              </Button>
            </div>
            <div className="text-center">
              <div className="text-purple-200 text-sm mb-2">空白创建</div>
              <div className="text-purple-300 text-xs mb-3">从零开始创建全新工作空间</div>
              <Button className="bg-purple-700 hover:bg-purple-600 text-white">
                立即创建
              </Button>
            </div>
          </div>
        </div>

        {/* My Workspaces Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <FolderOpen className="w-6 h-6 text-purple-200" />
              <h2 className="text-xl font-semibold text-white">我的工作空间</h2>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-purple-200 text-sm">最近打开</span>
              <Button variant="ghost" className="text-purple-200 hover:text-white">
                显示所有
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {recentWorkspaces.map((workspace) => (
              <Card key={workspace.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300 hover:bg-white/15 cursor-pointer">
                <div className="aspect-video bg-white/20 rounded-lg mb-3"></div>
                <p className="text-white text-sm font-medium">{workspace.name}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Users className="w-6 h-6 text-purple-200" />
            <h2 className="text-xl font-semibold text-white">社区</h2>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg text-white mb-4">工作空间模板</h3>
            <div className="space-y-3">
              {communityTemplates.map((template) => (
                <Card key={template.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300 hover:bg-white/15 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">{template.name}</h4>
                      <p className="text-purple-200 text-sm">by {template.author}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm">{template.rating}</span>
                        <span className="text-purple-200 text-sm">{template.downloads}{template.type}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-6">
              <Button className="w-full bg-black/50 hover:bg-black/70 text-white py-3 rounded-xl">
                浏览更多模板
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

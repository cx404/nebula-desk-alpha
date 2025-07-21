import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, User, Settings as SettingsIcon, MessageSquare, Heart, Share2, Globe, Moon, ChevronRight, Info, BookOpen, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface UserProfileProps {
  isVisible: boolean;
  onClose: () => void;
}

export const UserProfile = ({ isVisible, onClose }: UserProfileProps) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [developerMode, setDeveloperMode] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onClose();
  };

  if (!isVisible) return null;

  const profileItems = [
    {
      icon: User,
      title: "设置个人资料",
      color: "text-blue-400 bg-blue-500/10",
      hasArrow: true
    },
    {
      icon: Globe,
      title: "语言设置",
      subtitle: "中文（简体）",
      color: "text-blue-400 bg-blue-500/10",
      hasArrow: true
    },
    {
      icon: MessageSquare,
      title: "声音选择",
      subtitle: "温柔桃子",
      color: "text-purple-400 bg-purple-500/10",
      hasArrow: true
    },
    {
      icon: SettingsIcon,
      title: "帮助与反馈",
      color: "text-blue-400 bg-blue-500/10",
      hasArrow: true
    },
    {
      icon: BookOpen,
      title: "开启新手任务",
      color: "text-blue-400 bg-blue-500/10",
      hasSwitch: true,
      switchValue: developerMode,
      onSwitchChange: setDeveloperMode
    },
    {
      icon: Heart,
      title: "分享豆包给好友",
      color: "text-red-400 bg-red-500/10",
      hasArrow: true
    },
    {
      icon: Moon,
      title: "黑名单",
      color: "text-gray-400 bg-gray-500/10",
      hasArrow: true
    },
    {
      icon: Info,
      title: "关于豆包",
      color: "text-blue-400 bg-blue-500/10",
      hasArrow: true
    },
    {
      icon: BookOpen,
      title: "关于豆包大模型",
      color: "text-green-400 bg-green-500/10",
      hasArrow: true
    },
    {
      icon: SettingsIcon,
      title: "账号设置",
      color: "text-purple-400 bg-purple-500/10",
      hasArrow: true
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <Card className="w-full max-w-md h-full bg-white/10 backdrop-blur-xl border-l border-white/20 rounded-none">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">用户信息</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* User Avatar and Info */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">
                  {user?.user_metadata?.name || user?.email?.split('@')[0] || '用户706334'}
                </h3>
                <p className="text-sm text-gray-400">
                  ID号: {user?.id?.slice(0, 8) || '976935689'}
                </p>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Profile Settings */}
            <div className="space-y-2">
              {profileItems.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.title}</p>
                        {item.subtitle && (
                          <p className="text-sm text-gray-400">{item.subtitle}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.hasSwitch && (
                        <Switch
                          checked={item.switchValue}
                          onCheckedChange={item.onSwitchChange}
                          className="data-[state=checked]:bg-blue-600"
                        />
                      )}
                      {item.hasArrow && (
                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      )}
                    </div>
                  </div>
                  {index === 4 || index === 6 || index === 8 ? (
                    <Separator className="bg-white/5 my-2" />
                  ) : null}
                </div>
              ))}
            </div>

            <Separator className="bg-white/10" />

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full text-orange-400 border-orange-400/30 hover:bg-orange-500/20 hover:text-orange-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              退出登录
            </Button>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};
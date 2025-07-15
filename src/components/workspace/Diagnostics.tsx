import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Wifi, Server, TrendingUp, Zap, AlertTriangle, Clock, Activity } from "lucide-react";
export const Diagnostics = () => {
  const stats = [{
    label: "System Status",
    value: "Healthy",
    icon: CheckCircle,
    color: "text-green-400",
    bgColor: "bg-green-500/20"
  }, {
    label: "Network",
    value: "45ms",
    icon: Wifi,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20"
  }, {
    label: "Services",
    value: "4/4",
    icon: Server,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20"
  }, {
    label: "Uptime",
    value: "99.9%",
    icon: TrendingUp,
    color: "text-orange-400",
    bgColor: "bg-orange-500/20"
  }];
  const connectivityTests = [{
    id: "1",
    name: "Network Connectivity",
    description: "Testing connection to cloud services",
    detail: "All endpoints responding normally",
    status: "passed",
    duration: "45ms"
  }, {
    id: "2",
    name: "Authentication",
    description: "Verifying user credentials",
    detail: "Token valid, permissions verified",
    status: "passed",
    duration: "120ms"
  }, {
    id: "3",
    name: "Storage Access",
    description: "Testing S3 and WebDAV connections",
    detail: "S3 responding slowly, WebDAV timeout",
    status: "warning",
    duration: "890ms"
  }, {
    id: "4",
    name: "GPU Services",
    description: "Checking workspace availability",
    detail: "12 GPUs available, 2 in use",
    status: "passed",
    duration: "67ms"
  }];
  const systemMetrics = [{
    name: "CPU Usage",
    value: 23,
    color: "bg-blue-500"
  }, {
    name: "Memory",
    value: 45,
    color: "bg-green-500"
  }, {
    name: "Disk Usage",
    value: 78,
    color: "bg-orange-500"
  }];
  const networkTest = {
    downloadSpeed: "125.3 Mbps",
    uploadSpeed: "45.7 Mbps",
    ping: "12ms"
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "text-green-400";
      case "warning":
        return "text-orange-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-400" />;
      case "failed":
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">PASSED</Badge>;
      case "warning":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">WARNING</Badge>;
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">FAILED</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">UNKNOWN</Badge>;
    }
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">诊断</h1>
          <p className="text-gray-400">Monitor system health and troubleshoot connectivity issues</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          ▶ Run Diagnostics
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => <Card key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-300 text-sm">{stat.label}</h3>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </Card>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connectivity Tests */}
        <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Connectivity Tests</h2>
          </div>
          <p className="text-gray-400 text-sm mb-6">Automated tests for system connectivity and performance</p>

          <div className="space-y-4">
            {connectivityTests.map(test => <Card key={test.id} className="bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <h4 className="text-white font-semibold text-sm">{test.name}</h4>
                      <p className="text-gray-400 text-xs">{test.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(test.status)}
                    <div className="text-right">
                      <div className="text-xs text-gray-400">{test.duration}</div>
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm">{test.detail}</p>
              </Card>)}
          </div>
        </Card>

        {/* System Metrics */}
        <Card className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">System Metrics</h2>
          </div>
          <p className="text-gray-400 text-sm mb-6">Real-time system performance monitoring</p>

          <div className="space-y-6">
            {systemMetrics.map((metric, index) => <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{metric.name}</span>
                  <span className="text-white font-bold">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>)}

            <div className="border-t border-white/10 pt-6">
              <h4 className="text-white font-medium mb-1">Network I/O</h4>
              <p className="text-green-400 font-bold text-lg">12.5MB/s</p>
            </div>

            {/* Quick Network Test */}
            <Card className="bg-purple-500/10 border border-purple-300/20 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Wifi className="w-5 h-5 text-purple-400" />
                <h4 className="text-white font-medium">Quick Network Test</h4>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-400 mb-1">Download Speed:</div>
                  <p className="text-white font-semibold">{networkTest.downloadSpeed}</p>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Upload Speed:</div>
                  <p className="text-white font-semibold">{networkTest.uploadSpeed}</p>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Ping:</div>
                  <p className="text-white font-semibold">{networkTest.ping}</p>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>;
};
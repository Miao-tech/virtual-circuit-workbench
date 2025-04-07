
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 错误: 用户尝试访问不存在的路由:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">抱歉！页面未找到</p>
        <Link to="/">
          <Button className="mt-2">
            返回主页
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

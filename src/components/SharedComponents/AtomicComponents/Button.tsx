import { Button } from "antd";
import MaterialIcon from "../Icons/MaterialIcons";

interface ButtonProps {
  loading?: boolean;
  children?: any;
  icon?: string;
  size?: string;
  action?: any;
  className?: string;
  htmlType?: "button" | "submit" | "reset" | undefined;
}
interface RequiredButtonProps {
  type?: "primary" | "secondary" | "outlined" | undefined;
}

interface TypeTextButtonProps {
  type?: "danger" | undefined;
}
export function AButton({
  loading,
  children,
  icon,
  type,
  action,
  htmlType,
  className,
}: RequiredButtonProps & ButtonProps) {
  return (
    <Button
      onClick={action}
      loading={loading}
      htmlType={htmlType ? htmlType : "button"}
      icon={icon ? <MaterialIcon icon={icon} /> : null}
      className={`${className} px-4 py-2 h-auto rounded-md flex items-center space-x-3   ${
        type === "secondary"
          ? "bg-green-100 border-green-100 text-green-400 hover:border-transparent hover:text-green-400 hover:bg-transparent focus:border-transparent focus:text-green-400 focus:bg-transparent"
          : "bg-[#39910f] border-[#39910f] text-white hover:border-green-400 hover:text-white hover:bg-green-400 focus:border-green-400 focus:text-white focus:bg-green-400"
      }`}
    >
      {children}
    </Button>
  );
}

export function ATButton({
  action,
  children,
  icon,
  loading,
  type,
  className,
}: ButtonProps & TypeTextButtonProps) {
  return (
    <Button
      onClick={action}
      loading={loading}
      type="text"
      className={`${className} ${
        type === "danger"
          ? "text-red-500   hover:bg-transparent focus:bg-transparent hover:text-red-300  focus:text-red-600"
          : "text-green-500   hover:bg-transparent focus:bg-transparent hover:text-green-300  focus:text-green-600"
      }  rounded-md flex  space-x-3 px-0 py-0 h-auto    `}
      icon={icon ? <MaterialIcon icon={icon} /> : null}
    >
      {children}
    </Button>
  );
}

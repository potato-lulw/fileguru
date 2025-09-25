import { useTheme } from "next-themes"
import { Toaster as Sonner, toast} from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "light" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--normal-description": "var(--muted-foreground)",
        }
      }
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-black group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          title: "!font-medium",
          description: "group-[.toaster]:!text-muted-foreground ",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-destructive group-[.toast]:text-destructive-foreground",
          icon: ' !mr-3',
        }
      }}
      {...props} />
  );
}

export { Toaster, toast}

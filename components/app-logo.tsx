import Link from "next/link"
import { cn } from "@/lib/utils"

interface AppLogoProps {
  className?: string
}

export function AppLogo({ className }: AppLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "text-xl font-bold hover:opacity-80 transition-opacity",
        className
      )}
    >
      Class Routine Optimizer
    </Link>
  )
}


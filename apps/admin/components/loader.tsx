import { Loader2 } from "lucide-react";

export default function Loader({ text = "Loading..." }: { text: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center flex gap-2">
        <Loader2 className="animate-spin" />
        <p className="text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}

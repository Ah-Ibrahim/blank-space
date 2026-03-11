import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { useSettingsStore } from "@/hooks/use-settings";

function SettingsModal() {
  const isOpen = useSettingsStore((state) => state.isOpen);
  const onClose = useSettingsStore((state) => state.onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between">
          <div className="text-sm">
            <div>Appearance</div>
            <div className="text-muted-foreground">
              Customize your application&apos;s appearance
            </div>
          </div>
          <div>
            <ModeToggle />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default SettingsModal;

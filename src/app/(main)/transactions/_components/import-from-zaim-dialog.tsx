import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ImportFromZaimDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ImportFromZaimDialog = ({
  open,
  onOpenChange,
}: ImportFromZaimDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ZaimのCSVから取り込み</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

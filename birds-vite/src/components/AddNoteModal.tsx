import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAddNote } from '@/hooks/useAddNote';
import { X } from 'lucide-react';
import { useState } from 'react';

interface AddNoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  birdId: string;
  onNoteAdded?: () => void;
  onNoteAddStart?: () => void;
}

export function AddNoteModal({ open, onOpenChange, birdId, onNoteAdded, onNoteAddStart }: AddNoteModalProps) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const { addNote, loading } = useAddNote();

  const handleSubmit = async () => {
    if (!note.trim() || !title.trim()) return;

    try {
      // Signal that note addition has started
      onNoteAddStart?.();
      
      await addNote(birdId, note.trim(), title.trim() || undefined);

      // Reset form and close modal
      setTitle('');
      setNote('');
      onOpenChange(false);
      onNoteAdded?.();
    } catch (error) {
      console.error('Error adding note:', error);
      // Reset loading state on error
      onNoteAdded?.();
    }
  };

  const handleCancel = () => {
    setTitle('');
    setNote('');
    onOpenChange(false);
  };

  const isFormValid = note.trim().length > 0 && title.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[424px] max-w-[calc(100vw-2rem)] p-0 gap-0 bg-white border border-black/[0.06] rounded-lg"
        style={{
          boxShadow: '0px 68px 68px -32px rgba(0, 0, 0, 0.08), 0px 32px 32px -16px rgba(0, 0, 0, 0.08), 0px 0px 60px rgba(0, 0, 0, 0.16)'
        }}
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between h-12 px-4 border-b-0 text-left">
          <DialogTitle className="text-[13px] font-semibold leading-4 text-birds-primary flex-1">
            Add a note
          </DialogTitle>
          <DialogDescription className="sr-only">
            Add a note with a title and comment for this bird
          </DialogDescription>
          <DialogClose asChild>
            <button className="w-4 h-4 flex items-center justify-center text-black hover:opacity-70 transition-opacity cursor-pointer">
              <X className="w-4 h-4" strokeWidth={1.33} />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* Form Content */}
        <div className="flex flex-col px-4 py-4 gap-4 h-[204px]">
          {/* Title Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold leading-4 text-birds-text-secondary">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Where did you spot it?"
              className={`h-8 px-[10px] py-2 text-[13px] leading-4 text-birds-primary placeholder:text-birds-text-placeholder rounded focus:outline-none transition-all duration-75 ease-out ${
                title.trim() ? 'border-2 border-birds-blue bg-white' : 'border-0 focus:border-2 focus:border-birds-blue bg-birds-field-bg focus:bg-white'
              }`}
            />
          </div>

          {/* Note Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold leading-4 text-birds-text-secondary">
              Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter your notes here"
              className={`h-20 px-[10px] py-2 text-[13px] leading-4 text-birds-primary placeholder:text-birds-text-placeholder rounded resize-none focus:outline-none transition-all duration-75 ease-out ${
                note.trim() ? 'border-2 border-birds-blue bg-white' : 'border-0 focus:border-2 focus:border-birds-blue bg-birds-field-bg focus:bg-white'
              }`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="h-16 px-4 py-4 border-t border-[#E9EAEA] backdrop-blur-sm">
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="h-8 px-3 text-[13px] font-semibold text-birds-primary bg-white border border-black/[0.06] rounded-lg hover:bg-gray-50"
              style={{
                boxShadow: '0px 2px 4px rgba(0, 24, 46, 0.04), 0px 1px 0.5px -1px rgba(0, 24, 45, 0.12)'
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || loading}
              className={`h-8 px-3 text-[13px] font-semibold text-white border border-birds-blue rounded-lg transition-opacity ${
                !isFormValid || loading
                  ? 'bg-birds-blue opacity-50 cursor-not-allowed'
                  : 'bg-birds-blue hover:bg-birds-blue-hover'
              }`}
              style={{
                boxShadow: '0px 2px 4px rgba(0, 24, 46, 0.04), 0px 1px 1px -1px rgba(0, 24, 45, 0.12)'
              }}
            >
              {loading ? 'Adding...' : 'Add note'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Dialog, DialogContent, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { useBird } from '@/hooks/useBird';
import { useNavigate, useParams } from 'react-router-dom';
import { AddNoteModal } from './AddNoteModal';
import { BirdDetailSkeleton } from './BirdDetailSkeleton';
import { ImageWithFallback } from './ImageWithFallback';
import { FlyingBirdIcon } from './FlyingBirdIcon';
import { NoteItem } from './NoteItem';
import { NoteItemSkeleton } from './NoteItemSkeleton';
import { X } from 'lucide-react';
import { watermarkImage } from '@/lib/watermark';

export function BirdDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bird, loading, error } = useBird(id);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [watermarkedImageUrl, setWatermarkedImageUrl] = useState<string>('');

  // Watermark the image when bird data is available
  useEffect(() => {
    if (bird?.image_url) {
      watermarkImage(bird.image_url)
        .then(setWatermarkedImageUrl)
        .catch(error => {
          console.error('Failed to watermark image for zoom:', error);
          setWatermarkedImageUrl(bird.image_url);
        });
    }
  }, [bird?.image_url]);

  // Show loading skeleton while bird is being fetched
  if (loading) {
    return <BirdDetailSkeleton />;
  }

  // Handle errors or bird not found
  if (error || !bird) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FlyingBirdIcon />
          
          <h2 className="text-xl font-semibold text-birds-primary mb-2">
            {error ? 'Error Loading Bird' : 'Bird Not Found'}
          </h2>
          <p className="text-birds-secondary">
            {error || 'The requested bird could not be found.'}
          </p>
        </div>
      </div>
    );
  }



  return (
    <div className="flex flex-col h-full bg-white w-full">
      {/* Header with breadcrumb */}
      <div className="flex flex-row justify-between items-center border-b border-birds-border flex-shrink-0 px-4 md:px-6 py-4 h-[72px] gap-3">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-xl md:text-2xl xl:text-[32px] leading-8 md:leading-10 tracking-[-0.8px] text-birds-primary">
            <span
              className="opacity-40 cursor-pointer hover:opacity-60 transition-opacity"
              onClick={() => navigate('/')}
            >
              Birds /
            </span>
            <span className="font-bold"> {bird.english_name}</span>
          </h1>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddNoteModalOpen(true)}
          className="h-8 px-3 text-[13px] font-semibold"
        >
          Add Note
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="flex flex-col gap-2">

          {/* Images Section */}
          <div className="flex flex-row items-start px-4 md:px-6 gap-3 h-auto md:h-[169.5px]">
            <div className="flex flex-col gap-3 w-full max-w-[301px] h-auto md:h-[169.5px]">
              <div
                className={watermarkedImageUrl ? "cursor-pointer hover:opacity-90 transition-opacity duration-200" : "cursor-default"}
                onClick={watermarkedImageUrl ? () => setIsImageZoomed(true) : undefined}
                role={watermarkedImageUrl ? "button" : undefined}
                tabIndex={watermarkedImageUrl ? 0 : -1}
                onKeyDown={watermarkedImageUrl ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsImageZoomed(true);
                  }
                } : undefined}
                aria-label={watermarkedImageUrl ? `View larger image of ${bird.english_name}` : undefined}
              >
                <ImageWithFallback
                  src={bird.image_url || ''}
                  alt={bird.english_name}
                  className="rounded-lg object-cover w-full h-[200px] md:w-[301px] md:h-[169px]"
                />
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="flex flex-col w-full h-auto md:h-[204px] pt-5">
            <div className="flex flex-row items-start px-4 md:px-6 pb-3 h-[60px]">
              <h2 className="font-bold text-[22px] leading-7 tracking-[-0.33px] text-birds-primary">
                Notes
              </h2>
            </div>

            <div className="w-full max-w-[759px] min-h-[144px]">
              {/* Show loading skeleton when adding a note */}
              {isAddingNote && <NoteItemSkeleton />}
              
              {bird.notes.length > 0 ? (
                bird.notes.map((note) => (
                  <NoteItem
                    key={note.id}
                    note={note}
                    birdImageUrl={bird.image_url || ''}
                    birdName={bird.english_name}
                  />
                ))
              ) : (
                !isAddingNote && (
                  <div className="flex items-center justify-center h-[72px] text-birds-secondary/60">
                    No notes yet. Add the first note!
                  </div>
                )
              )}
            </div>
          </div>

          {/* In Other Languages Section */}
          <div className="flex flex-col w-full h-auto md:h-[249.5px]">
            <div className="flex flex-row items-start px-4 md:px-6 pb-3 h-[59.5px]">
              <h2 className="font-bold text-[22px] leading-7 tracking-[-0.33px] text-birds-primary">
                In Other Languages
              </h2>
            </div>

            <div className="w-full h-auto md:h-[190px]">
              <div className="flex flex-col md:flex-row">
                {/* Spanish Column */}
                <div className="flex flex-col items-start px-4 md:px-6 py-4 gap-1 w-full md:w-[464px] h-[79px] border-t border-gray-200">
                  <div className="flex flex-row items-start w-full h-[21px]">
                    <span className="font-normal text-sm leading-[21px] text-birds-secondary">
                      Spanish
                    </span>
                  </div>
                  <div className="flex flex-row items-start w-full h-[21px]">
                    <span className="font-normal text-sm leading-[21px] text-birds-secondary/50">
                      Not available
                    </span>
                  </div>
                </div>

                {/* Latin Column */}
                <div className="flex flex-col items-start px-4 md:px-2 py-4 gap-1 w-full md:w-[452px] h-[79px] border-t border-gray-200">
                  <div className="flex flex-row items-start w-full h-[21px]">
                    <span className="font-normal text-sm leading-[21px] text-birds-secondary">
                      Latin
                    </span>
                  </div>
                  <div className="flex flex-row items-start w-full h-[21px]">
                    <span className="font-normal text-sm leading-[21px] text-birds-primary">
                      {bird.latin_name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      <AddNoteModal
        open={isAddNoteModalOpen}
        onOpenChange={setIsAddNoteModalOpen}
        birdId={bird.id}
        onNoteAdded={() => {
          setIsAddingNote(false);
          console.log('Note added successfully');
        }}
        onNoteAddStart={() => {
          setIsAddingNote(true);
        }}
      />

      {/* Image Zoom Modal */}
      <Dialog open={isImageZoomed} onOpenChange={setIsImageZoomed}>
        <DialogContent
          className="max-w-[100vw] max-h-[100vh] flex items-center justify-center p-0 gap-0 border-0 bg-transparent shadow-none"
          showCloseButton={false}
        >
          <DialogDescription className="sr-only">
            Zoomed view of {bird.english_name} image. Click outside or press escape to close.
          </DialogDescription>
          <div className="relative">
            {/* Full screen background overlay for closing */}
            <div
              className="fixed inset-0 cursor-pointer z-10 bg-black/75 backdrop-blur-xl"
              onClick={() => setIsImageZoomed(false)}
              aria-label="Close image zoom"
            />

            {/* Image container with matching rounded background */}
            <div className="relative z-20 p-4" onClick={(e) => e.stopPropagation()}>
              {/* Background that matches image shape */}
              <div className="absolute inset-0 rounded-xl bg-white" />
              
              {/* Close button positioned relative to image */}
              <DialogClose asChild>
                <button
                  className="absolute -top-2 -right-2 z-30 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full transition-all duration-200 text-gray-700 shadow-lg"
                  aria-label="Close image zoom"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                </button>
              </DialogClose>

              {/* Zoomed image */}
              {watermarkedImageUrl ? (
                <img
                  src={watermarkedImageUrl}
                  alt={bird.english_name}
                  className="relative rounded-xl shadow-2xl bg-white max-w-[90vw] max-h-[90vh] w-auto h-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="relative bg-birds-search animate-pulse rounded-xl flex items-center justify-center shadow-2xl w-[min(90vw,400px)] h-[min(50vh,300px)]">
                  <span className="text-birds-secondary/50 text-sm">Loading...</span>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

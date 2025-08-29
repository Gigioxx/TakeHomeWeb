import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useBird } from '@/hooks/useBird';
import { useNavigate, useParams } from 'react-router-dom';
import { AddNoteModal } from './AddNoteModal';
import { BirdDetailSkeleton } from './BirdDetailSkeleton';
import { ImageWithFallback } from './ImageWithFallback';
import { FlyingBirdIcon } from './FlyingBirdIcon';
import { NoteItem } from './NoteItem';
import { NoteItemSkeleton } from './NoteItemSkeleton';

export function BirdDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bird, loading, error } = useBird(id);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);

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
              <ImageWithFallback
                src={bird.image_url || ''}
                alt={bird.english_name}
                className="rounded-lg object-cover w-full h-[200px] md:w-[301px] md:h-[169px]"
              />
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
    </div>
  );
}

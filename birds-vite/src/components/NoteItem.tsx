import { Note } from '@/types/bird';
import { ImageWithFallback } from './ImageWithFallback';

interface NoteItemProps {
  note: Note;
  birdImageUrl: string;
  birdName: string;
}

function parseNoteComment(comment: string): { title: string; content: string } {
  // Parse the comment format: "Location: {title}\n\n{content}" or just "{content}"
  if (comment.startsWith('Location: ')) {
    const parts = comment.split('\n\n');
    if (parts.length >= 2) {
      const title = parts[0].replace('Location: ', '');
      const content = parts.slice(1).join('\n\n');
      return { title, content };
    }
  }
  
  // If no location format found, use timestamp as fallback title
  return { title: 'Note', content: comment };
}

export function NoteItem({ note, birdImageUrl, birdName }: NoteItemProps) {
  const { title, content } = parseNoteComment(note.comment);
  
  return (
    <div className="w-[759px] min-h-[72px] bg-white">
      {/* Note content container with exact Figma positioning */}
      <div className="flex flex-row items-center gap-4 px-6 py-2">
        {/* Bird Image - 56px x 56px with 8px border radius */}
        <div className="w-14 h-14 flex-none">
          <ImageWithFallback
            src={birdImageUrl}
            alt={birdName}
            className="w-14 h-14 rounded-lg object-cover"
            showText={false}
          />
        </div>
        
        {/* Content Column */}
        <div className="flex flex-col justify-center items-start flex-1">
          {/* Title - matches Figma specs */}
          <div className="flex flex-col items-start">
            <h3 className="font-medium text-base leading-6 text-birds-primary">
              {title}
            </h3>
          </div>
          
          {/* Comment - matches Figma specs */}
          <div className="flex flex-col items-start">
            <p className="font-normal text-sm leading-[21px] text-birds-secondary">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Bird } from '@/types/bird';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './ImageWithFallback';

interface BirdCardProps {
  bird: Bird;
  onClick?: () => void;
}

export function BirdCard({ bird, onClick }: BirdCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/bird/${bird.id}`);
    }
  };

  return (
    <div
      className="cursor-pointer transition-all hover:scale-105 flex flex-col gap-2 w-full min-w-0"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="flex flex-col w-full">
        <ImageWithFallback
          src={bird.image_url || ''}
          alt={bird.english_name}
          className="relative w-full rounded-lg aspect-[168/95]"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col pb-3">
        <h3 className="font-medium text-base leading-6 text-birds-primary">
          {bird.english_name}
        </h3>
        <p className="font-normal text-sm leading-[21px] text-birds-secondary">
          {bird.latin_name}
        </p>
      </div>
    </div>
  );
}

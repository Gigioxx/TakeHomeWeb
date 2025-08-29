export interface Bird {
  id: string;
  thumb_url: string;
  image_url: string;
  latin_name: string;
  english_name: string;
  notes: Note[];
}

export interface Note {
  id: string;
  comment: string;
  timestamp: number;
}

export interface BirdsResponse {
  birds: Bird[];
}

export interface BirdResponse {
  bird: Bird;
}

export interface AddNoteResponse {
  addNote: Note;
}
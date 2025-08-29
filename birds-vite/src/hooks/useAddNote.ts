import { gql, useMutation } from '@apollo/client';

const ADD_NOTE_MUTATION = gql`
  mutation AddNote($birdId: ID!, $comment: String!, $timestamp: Int!) {
    addNote(birdId: $birdId, comment: $comment, timestamp: $timestamp)
  }
`;

export interface AddNoteVariables {
  birdId: string;
  comment: string;
  timestamp: number;
}

export interface AddNoteResult {
  addNote: string;
}

export function useAddNote() {
  const [addNoteMutation, { loading, error, data }] = useMutation<AddNoteResult, AddNoteVariables>(
    ADD_NOTE_MUTATION,
    {
      // Refetch queries after successful mutation to update the UI
      refetchQueries: ['GetBird', 'GetBirds'],
      // Update the cache optimistically if needed
      update: (_, { data: mutationData }) => {
        if (!mutationData?.addNote) return;

        // The specific cache update logic would depend on how birds/notes are queried
        // For now, we rely on refetchQueries to update the data
        console.log('Note added successfully:', mutationData.addNote);
      },
      onError: (error) => {
        console.error('Error adding note:', error);
      }
    }
  );

  const addNote = async (birdId: string, comment: string, location?: string) => {
    const fullComment = location 
      ? `Location: ${location}\n\n${comment}` 
      : comment;
    
    const timestamp = Math.floor(Date.now() / 1000); // Use seconds from epoch as number
    
    try {
      const result = await addNoteMutation({
        variables: {
          birdId,
          comment: fullComment,
          timestamp
        }
      });
      
      return result.data?.addNote; // This is now a string ID
    } catch (error) {
      console.error('Failed to add note:', error);
      throw error;
    }
  };

  return {
    addNote,
    loading,
    error,
    data
  };
}
'use client';
import { useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { voiceSearch } from '@/ai/flows/voice-search';

interface VoiceSearchButtonProps {
  onTranscript: (text: string) => void;
}

export function VoiceSearchButton({ onTranscript }: VoiceSearchButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      audioChunksRef.current.push(event.data);
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.addEventListener('dataavailable', handleDataAvailable);
      recorder.addEventListener('stop', async () => {
        setIsRecording(false);
        setIsTranscribing(true);
        stream.getTracks().forEach(track => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          try {
            const result = await voiceSearch({ audioDataUri: base64Audio });
            if (result.searchText) {
              onTranscript(result.searchText);
            } else {
              toast({ variant: 'destructive', description: 'Could not understand audio. Please try again.' });
            }
          } catch (error) {
            console.error('Transcription error:', error);
            toast({ variant: 'destructive', description: 'Failed to transcribe audio.' });
          } finally {
            setIsTranscribing(false);
          }
        };
      });
      recorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({ variant: 'destructive', description: 'Microphone access denied. Please enable it in your browser settings.' });
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  return (
    <Button
      variant={isRecording ? 'destructive' : 'ghost'}
      size="icon"
      className="rounded-full h-9 w-9"
      onClick={toggleRecording}
      disabled={isTranscribing}
      aria-label={isRecording ? 'Stop recording' : 'Start voice search'}
    >
      {isTranscribing ? (
        <Loader className="animate-spin" />
      ) : isRecording ? (
        <MicOff />
      ) : (
        <Mic />
      )}
    </Button>
  );
}

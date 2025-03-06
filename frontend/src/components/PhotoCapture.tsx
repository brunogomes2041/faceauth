import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface PhotoCaptureProps {
  onPhotoCapture: (file: File) => void;
}

const PhotoCapture = ({ onPhotoCapture }: PhotoCaptureProps) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        onPhotoCapture(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, envie uma foto em formato JPG ou PNG.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-900">Foto do Participante</h2>
      <p className="text-gray-600 text-sm">
        Por favor, faça upload de uma foto sua em um ambiente bem iluminado, com o rosto claramente visível.
      </p>
      <p className="text-gray-600 text-sm">
        Aceitamos apenas fotos em formato JPG ou PNG.
      </p>

      <div className="space-y-4">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpeg,image/png"
          onChange={handleFileUpload}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {photoPreview && (
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border">
            <img
              src={photoPreview}
              alt="Preview"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoCapture;

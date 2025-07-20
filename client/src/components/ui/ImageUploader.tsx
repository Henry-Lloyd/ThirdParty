
import React, { useState } from 'react';

interface ImageUploaderProps {
  label: string;
  onUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <label className="block mb-2 font-semibold">{label}</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded" />}
    </div>
  );
};

export default ImageUploader;

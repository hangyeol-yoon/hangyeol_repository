import React, { useState, useEffect } from 'react';
import { Stethoscope } from 'lucide-react';
import { getCustomDoctorImages } from '../utils/doctorImageStore';

interface DoctorAvatarProps {
  src: string;
  name: string;
  title?: string;
  doctorId?: string;
  className?: string;
}

export const DoctorAvatar: React.FC<DoctorAvatarProps> = ({
  src,
  name,
  doctorId,
  className = 'w-16 h-16 rounded-2xl',
}) => {
  const [error, setError] = useState(false);
  const [customSrc, setCustomSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadCustomImage = () => {
      if (doctorId) {
        const customImages = getCustomDoctorImages();
        if (customImages[doctorId]) {
          setCustomSrc(customImages[doctorId]);
          setError(false);
          return;
        }
      }
      setCustomSrc(null);
    };

    loadCustomImage();

    const handleUpdate = () => {
      loadCustomImage();
    };

    window.addEventListener('doctor-images-updated', handleUpdate);
    return () => {
      window.removeEventListener('doctor-images-updated', handleUpdate);
    };
  }, [doctorId]);

  const activeSrc = customSrc || src;

  const isFemale =
    name.includes('이수진') ||
    name.includes('정유진') ||
    name.includes('윤아름') ||
    name.includes('송지은') ||
    name.includes('김하은') ||
    name.includes('서연') ||
    name.includes('유진') ||
    name.includes('하은');

  if (error || !activeSrc) {
    const bgGradient = isFemale
      ? 'from-teal-600 via-teal-700 to-emerald-800'
      : 'from-blue-600 via-indigo-700 to-slate-800';

    return (
      <div
        className={`${className} bg-gradient-to-br ${bgGradient} flex flex-col items-center justify-center text-white relative overflow-hidden border-2 border-white/80 shadow-md shrink-0`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-black/30" />
        <div className="relative z-10 flex flex-col items-center justify-center p-1 text-center">
          <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-xs border border-white/40 shadow-sm mb-0.5">
            {name.charAt(0)}
          </div>
          <span className="text-[10px] font-bold text-white tracking-tight leading-tight px-1 drop-shadow-sm truncate max-w-full">
            {name}
          </span>
          <div className="flex items-center gap-0.5 text-[8px] bg-white/25 text-white font-medium px-1.5 py-0.2 rounded-full mt-0.5 border border-white/20">
            <Stethoscope className="w-2.5 h-2.5" />
            <span>전문의</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={activeSrc}
      alt={`${name} 교수`}
      className={`${className} object-cover shrink-0`}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
};

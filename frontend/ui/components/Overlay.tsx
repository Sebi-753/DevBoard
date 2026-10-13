"use client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Overlay({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <button
      type="button"
      aria-label="Close sidebar"
      onClick={onClose}
      className="fixed inset-0 z-40 cursor-default bg-black/40 md:hidden"
    />
  );
}

import { useState, useEffect } from 'react';

interface ResponsiveState {
  updateRefMenuOpen: boolean;
  showBackIcon: boolean;
}

interface ResponsiveProps {
  width: number;
  MobileMenuOpenAtWidth: number;
  BackIconAtWidth: number;
}

const useResponsiveState = ({
  width,
  MobileMenuOpenAtWidth,
  BackIconAtWidth,
}: ResponsiveProps): ResponsiveState => {
  const updatedWidth = width < MobileMenuOpenAtWidth;
  const displayMessageListIcon = width <= BackIconAtWidth;

  const [updateRefMenuOpen, setUpdateRefMenuOpen] = useState(updatedWidth);
  const [showBackIcon, setShowBackIcon] = useState(displayMessageListIcon);

  useEffect(() => {
    setUpdateRefMenuOpen(updatedWidth);
  }, [updatedWidth]);

  useEffect(() => {
    setShowBackIcon(displayMessageListIcon);
  }, [displayMessageListIcon]);

  return { updateRefMenuOpen, showBackIcon };
};

export default useResponsiveState;

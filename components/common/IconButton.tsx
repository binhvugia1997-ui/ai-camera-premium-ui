import React from 'react';
import { Button } from '@blinkdotnew/mobile-ui';

export function IconButton({ icon, onPress, active = false }: {
  icon: React.ReactNode;
  onPress: () => void;
  active?: boolean;
}) {
  return (
    <Button onPress={onPress} width={42} height={42} minWidth={42} padding={0} borderRadius={22}
      backgroundColor={active ? 'rgba(255,255,255,0.18)' : 'rgba(10,11,11,0.58)'}
      borderColor="rgba(255,255,255,0.16)" borderWidth={1}
      pressStyle={{ opacity: 0.72, scale: 0.95 }}>
      {icon as React.ReactElement}
    </Button>
  );
}

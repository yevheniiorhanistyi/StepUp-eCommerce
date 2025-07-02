import React, { ReactElement, PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';

const Providers = ({ children }: PropsWithChildren<object>): ReactElement => {
  return <>{children}</>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };

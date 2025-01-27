import { LogEntryResponse } from '@mapistry/take-home-challenge-shared';
import { render, screen, waitFor } from '@testing-library/react';
import { App } from './App';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalRef: any = global;
let mockData: LogEntryResponse[];

globalRef.fetch = jest.fn(() =>
  Promise.resolve({
    json: jest.fn(() => Promise.resolve(mockData)),
  }),
);

describe('App', () => {
  beforeEach(() => {
    mockData = [];
  });

  it('displays the currently selected log title', async () => {
    render(<App />);
    await waitFor(() => {
      const status = screen.getByText('Test Log');
      expect(status).toBeInTheDocument();
    });
  });
});

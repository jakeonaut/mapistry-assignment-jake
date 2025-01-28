import '../styles/reset.css';
import { ViewLogEntries } from './ViewLogEntries/ViewLogEntries';

export const App = () => (
  <main>
    <ViewLogEntries />
    <img
      src="/frog.jpg"
      style={{
        position: 'absolute',
        top: 0,
        zIndex: -99,
        left: 0,
        opacity: 0.2,
        width: '100%',
        height: '100%',
      }}
    />
  </main>
);

import { Provider } from 'react-redux';
import Container from './components/shared/container.tsx';
import { TransferFilters } from './components/shared/filters/transfer-filters.tsx';
import aviasalesLogo from './assets/aviasales.svg';
import { HeaderFilters } from './components/shared/filters/header-sort.tsx';
import { TicketsGroup } from './components/shared/tickets/tickets-group.tsx';
import { store } from './store/store.ts';

function App() {
  return (
    <Provider store={store}>
      <Container>
        <main className="min-h-full font-opensans text-title">
          <img src={aviasalesLogo} alt="logo" className="mx-auto my-12" />
          <section className="flex flex-row gap-5">
            <TransferFilters />
            <div className="flex flex-col">
              <HeaderFilters className="mb-5" />
              <TicketsGroup />
            </div>
          </section>
        </main>
      </Container>
    </Provider>
  );
}

export default App;

# Fabra Connect React Hook

## Installation
`npm i @fabra/react-fabra-connect`

## Usage
```
import { useFabraConnect } from '@fabra/react-fabra-connect';

function App() {
  const { open } = useFabraConnect();
  const linkToken = <Fetch the link token from your own backend>;

  return (
    <div className="App">
      <button onClick={() => open(linkToken)} />
    </div>
  );
}
```
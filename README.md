# Fabra Connect React Hook

## Installation
`npm i @fabra/react-fabra-connect`

## Usage
```
import { useFabraConnect } from '@fabra/react-fabra-connect';

function App() {
  const linkToken = <Fetch the link token from your own backend>;

  const theme = {
    colors: {
      primary: {
        base: #805AD5, // Default color for buttons, graphics, etc
        hover: #553C9A, // Hover color for buttons and links
        text: #FFFFFF, // The font color on top of the primary color
      }
    }
  }

  const { open } = useFabraConnect({
    linkToken,
    theme, // Theme is optional, will default to Fabra colors.
  });

  return (
    <div className="App">
      <button onClick={() => open()} />
    </div>
  );
}
```
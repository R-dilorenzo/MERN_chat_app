import AlertMaterial from "./AlertMaterial";
import { positions } from "react-alert";

/**
 * Alert custom utilizzando react-alert
 * per DOC => https://www.npmjs.com/package/react-alert
 */
export const options = {
  position: positions.TOP_CENTER,
  timeout: 7000,
};

// definisco un template custom utilizzando il component AlertMaterial
// modificando AlertTemplate che viene richiamato in index.js
export const AlertTemplate = ({
  style,
  options,
  message,
  close,
  alertError,
}) => (
  <div style={style}>
    {options.type === "error" ? (
      <AlertMaterial alertError message={message}></AlertMaterial>
    ) : (
      <AlertMaterial message={message}></AlertMaterial>
    )}
  </div>
);

/**
 * è possibile quindi utilizzare gli alert con: es.
 *
 * import { useAlert } from 'react-alert'
 * const alert = useAlert();
 * ...
 * utilizzando => alert.error('<message>') utilizzo AlertMaterial con il messaggio di errore
 * utilizzando => alert.show('<message>') o con  alert.success('<message>') utilizzo AlertMaterial con il messaggio di errore
 */

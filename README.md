## Formularis amb HTML i JS

## Objectius

Anem a veure algunes de les eines que ens proporciona HTML per a crear formularis i com podem utilitzar JavaScript per a validar-los. A través d'aquest practicarem també aspectes relacionats amb el DOM i els esdeveniments.

També aprofitarem per repassar alguns conceptes d'asincronia fent alguna crida a una API i mostrant el resultat en la pàgina web.

## Formularis amb JavaScript

Els formularis serveixen per recollir informació de manera estructurada amb l'objectius de:

- Validar usuari i contrasenya.
- Buscar informació.
- Recollir opinions.
- Realitzar enquestes.
- Fer qüestionaris.
- Introduir dades.
- Configurar l'aplicació.

### Elements dels formularis

Existeixen una gran quantitat d'elements que podem utilitzar en els formularis. Els més comuns són:

- `form` - Serveix per crear el formulari agrupant els elements que el formen. Inclou atributs que determinen a on i com s'enviarà la informació del formulari.
- `fieldset` - Serveix per agrupar els elements del formulari.
  - `legend` - Serveix per donar un títol al `fieldset`.
- `label` - Serveix per donar un nom a l'element del formulari.
- `input` - element genèric per introducir dades de diferents tipus:
  - `text`: per introduir dades de tipus text.
  - `number`: per introduir dades de tipus numèric.
  - `range`: per introduir valors utilitzant un element lliscant (slider). Cada navegador ho implementa de forma diferent i és difícil aconseguir que es vegin igual en tots els navegadors, per això s'acostumen a fer amb <div> o utilitzant llibreries especialitzades.
  - `button`: actualment és preferible uilitzar elements de tipus button.
  - `checkbox`: per opcions booleanes (vertader/fals, sí/no, actiu/inactiu...).
  - `radio`: per triar una opció entre vàries. Si hi ha moltes opcions, és preferible utilitzar select.
  - `date`: per triar una data.
  - `time`: per triar una hora.
  - `color`: per triar un color.
  - `email`: per posar una adreça de correu.
  - `url`: per posar una adreça web.
  - `password`: per introduir una contrasenya (mostra asterics enlloc dels caràcters).
  - `file`: per seleccionar un arxiu de la màquina.
  - `hidden`: per incloure dades que no han de ser visibles per l'usuari, per exemple constants o combinacions d'altres dades, però que també s'han d'enviar amb la resta de dades del formulari.
  - `image`: per utilitzar una imatge en lloc del botó submit.
  - `submit`: botó per enviar el formulari.
  - `reset`: botó per reiniciar el formulari.
- `textarea` - és similar a un `input` de tipus `text` però permet múltiples línies, es pot redimensionar i té atributs específics per determinar l'amplada i l'alçada.
- `select` - permet seleccionar una opció entre vàries.
  - `option` - permet definir una opció d'un `select`.
  - `optgroup` - permet agrupar opcions d'un `select`.
- `datalist` - permet definir una llista d'opcions per a un `input` de tipus `text`.
- `output` - permet mostrar el resultat d'una operació matemàtica.
- `button` - permet crear un botó.

Com veus hi ha una gran quantitat d'elements que et poden ajudar a definir el teu usuari i a recollir la informació que necessites. És important tenir una lleugera idea de què pots fer amb cada element per a poder utilitzar el més adequat en cada cas. Tens la documentació per consultar com utilitzar-los en detall i quin resultat esperar:

Aquesta informació es pot enviar a un servidor o ser processada en el mateix client.

[Referència](https://www.w3schools.com/html/html_forms.asp)
[Referència detallada (MDN)](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms)
[Elements dels formularis](https://www.w3schools.com/html/html_form_elements.asp)
["input types"](https://www.w3schools.com/html/html_form_input_types.asp)
["input types" detallada (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
[Pas a pas (MDN)](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/How_to_structure_an_HTML_form)

Accedeix a la carpeta `examples` i obre el fitxer `formularis.html` amb el teu navegador. Aquest fitxer conté una sèrie d'exemples de formularis amb els elements més comuns.

### Gestió dels valors, atributs i estils dels elements dels formularis

Els elements dels formularis tenen associats una sèrie d'atributs que necessitem conèixer per interactuar amb ells. Aquests atributs ens permeten modificar el seu comportament i la seva aparença. També ens permeten accedir als valors que contenen.

#### Inicialitzar i Obtindre els Valors dels Camps

Per posar o obtenir els valors dels camps, cal utilitzar la propietat `value`:

```javascript
document.getElementById('nif').value = '12345678Z';
let NIF = document.getElementById('nif').value;
```

#### Camps de Tipus "date"

Per posar una data en els camps de tipus date es pot fer utilitzant el format AAAA-MM-DD o assignant a la propietat `valueAsDate` un objecte de tipus Date:

```javascript
document.getElementById('data').value = '2020-02-02';
document.getElementById('data').valueAsDate = new Date(); // Data actual
```

#### Gestionar els Atributs

Per modificar un atribut, es pot utilitzar el mètode `setAttribute()`. El primer paràmetre és el nom de l'atribut i el segon és el valor.
Per activar un atribut sense valor (per exemple checked, selected, readonly...), cal posar un string buit en el segon paràmetre.

Per eliminar un atribut, es pot utilitzar el mètode `removeAttribute()`. Només té un paràmetre: el nom de l'atribut.

```javascript
document.getElementById('opinio').setAttribute('name', 'opinio');
document.getElementById('opinio').setAttribute('readonly', '');
document.getElementById('opinio').removeAttribute('size');
```

#### Atributs de `<form>`

- `target`: en quina finestra s'ha de mostrar el resultat quan es rebi la resposta.
- `action`: especifica on s'han d'enviar les dades del formulari.
- `method`: pot ser get o post.
- `enctype`: pot ser application/x-www-form-urlencoded (per defecte) o multipart/form-data (per enviar arxius). En aquest últim cas només es pot utilitzar el mètode post.

```html
<form
  id="formulari"
  action="https://www.google.com/search"
  method="get"
  target="_blank"
></form>
```

#### Atributs Genèrics dels Camps

- `id`: identificador de l'element.
- `name`: nom de la dada. Si un camp d'un formulari no té aquest atribut, no s'envia.
- `value`: contingut del camp.
- `hidden`: el camp quedarà ocult. Pot servir per enviar dades (si conté l'atribut name) que no ha d'introduir l'usuari, per exemple el codi d'un producte.
- `readonly`: evita que es pugui modificar el valor.
- `disabled`: evita que es pugui modificar el valor i no s'envia.
- `size`: indica l'amplada en caràcters d'un input de text.

Existeixen també atributs específics o especials per als diferents tipus de camps. Per exemple `checked` per als camps de tipus `checkbox` i `radio`. Pots consultar-ho a la documentació de cada element.

#### Selector :invalid

Podem utilitzar el selector `:invalid` per seleccionar els camps que no compleixen les restriccions de validació. Això ens permetrà canviar el seu estil per indicar a l'usuari que hi ha algun error.

```css
input:invalid {
  border: 1px solid red;
}
```

### Gestió d'esdeveniments

Ens falta veure quins esedevniment estan associats als formularis i com els podem utilitzar.

#### Esdeveniments relacionats amb canvis, validació i enviament

- `change`: Depenent del tipus d'element, es dispara quan es produeix el canvi (checkbox, radio, select...) o quan es perd el focus (text, textarea...).
- `input`: Es dispara en el mateix moment en què es produeix un canvi en l'element, per exemple quan s'escriu un caràcter en un camp de text.
- `search`: Es dispara quan s'escriu en un camp de cerca (`<input type="search">`).
- `invalid`: Quan el contingut d'un element d'un formulari no és correcte o està buit (si és requerit).
- `submit`: Quan es fa clic al botó per enviar el formulari. Es pot utilitzar per validar el formulari abans que sigui enviat.
- `reset`: Quan es fa clic al botó per reiniciar el formulari.

#### Atributs relacionats amb els esdeveniments:

- `required`: Indica que l'element s'ha d'omplir abans d'enviar el formulari.
- `autocomplete`: Fa que el navegador intenti completar el text basant-se en entrades anteriors.
- `placeholder`: Quan el camp està buit, indica què s'hi ha de posar.
- `min/max`: Valor mínim i màxim en camps numèrics.
- `step`: Valor de l'increment en camps numèrics.
- `minlength/maxlength`: Nombre mínim i màxim de caràcters en camps de text.
- `pattern`: Patró per validar el contingut. És un string de tipus RegExp, per exemple "[A-Z]{8}" per indicar que ha de contenir 8 lletres.
- `list`: Afegeix les dades d'un `<datalist>` per fer que apareguin com a opcions seleccionables.
- `form`: Permet associar un element a un formulari encara que no estigui dins del formulari.

Exemple de `submit` amb validació:

```javascript
document.getElementById('formulari').addEventListener('submit', function (e) {
  if (document.getElementById('nif').value === '') {
    alert("Has d'introduir el NIF");
    e.preventDefault();
  }
});
```

```html
<form
  id="formulari"
  action="https://www.google.com/search"
  method="get"
  target="_blank"
>
  <input type="text" id="nif" name="q" placeholder="NIF" required />
  <input type="submit" value="Cercar" />
</form>
```

Més informació sobre els esdeveniments dels formularis: [Apunts Sapalomera](https://www.sapalomera.cat/moodlecf/apunts/daw/dwec/index.html?cap=70&ref=3464)

### Validació dels formularis

Ens queda validar les dades. És important fer-ho en el client per millorar l'experiència de l'usuari i evitar la transferència inútil de dades incorrectes al servidor.

Encara que la validació en el client és important, sempre s'ha de validar les dades en el servidor per assegurar la integritat i seguretat del sistema.

#### Validació HTML (Automàtica)

Utilitzant atributs en els camps d'un formulari, es pot habilitar la validació automàtica del navegador abans d'enviar les dades. Exemples d'atributs:

- `required`: el camp no pot estar buit.
- `min/max`: valor mínim i màxim en camps numèrics.
- `minlength/maxlength`: nombre mínim i màxim de caràcters en camps de text.
- `pattern`: patró (expressió regular) que ha de complir el contingut en camps de text.

Exemple:

```javascript
document.getElementById('edat').setAttribute('required', '');
let mail = document.getElementById('mail');
mail.setAttribute('pattern', '(^.*@gmail.com$|^.*@sapalomera.cat$)');
```

#### Validació Manual Abans d'Enviar

Per validar manualment abans d'enviar el formulari, es pot capturar l'esdeveniment `submit` i prevenir el comportament per defecte si la validació falla:

```javascript
function enviar(e) {
  if (!validar()) e.preventDefault();
}

formulari.addEventListener('submit', enviar);
```

#### Validació amb la API de Formularis

[Referència - JS Validation API](https://www.w3schools.com/js/js_validation_api.asp)

#### Validació amb Codi

En alguns casos, no queda més remei que crear rutines específiques per validar determinades dades, per exemple, comprovar si la lletra del NIF és correcta o no.

#### Validació amb Expressions Regulars

Per comprovar els camps utilitzant expressions regulars es pot fer de la següent forma:

```javascript
function validar(contingut) {
  let expressio = /^[A-Z]{8}$/; // Per validar que el camp contingui 8 caràcters
  return expressio.test(contingut);
}
```

També es poden crear expressions regulars amb l'objecte RegExp:

```javascript
function validar(contingut) {
  let expressio = new RegExp('^[A-Z]{8}$');
  return expressio.test(contingut);
}
```

[Referència](https://www.sapalomera.cat/moodlecf/apunts/daw/dwec/index.html?cap=74&ref=3470)

Més informació sobr:

- [Guardar arxius](https://www.sapalomera.cat/moodlecf/apunts/daw/dwec/index.html?cap=71&ref=3466)
- [Carregar arxius](https://www.sapalomera.cat/moodlecf/apunts/daw/dwec/index.html?cap=72&ref=3467)
- [Enviament i reinici de dades](https://www.sapalomera.cat/moodlecf/apunts/daw/dwec/index.html?cap=73&ref=3468)

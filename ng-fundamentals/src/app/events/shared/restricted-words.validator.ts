import { FormControl } from '@angular/forms';

export function restrictedWords(words) {
     return (control: FormControl): {[key: string]: any} => //deze functie zal een object teruggeven. het maakt niet uit hoe het object eruit ziet
        {
            if(!words) return null
            
            //map functie loopt over alle keywords en kijkt of het deze waarde bevat, hierna geeft het dit woord terug, indien niet gevonden: null
            var invalidWords = words
            .map(w => control.value.includes(w) ? w : null)
            .filter(w => w != null)//null waardes fileren

            return invalidWords && invalidWords.length > 0                        
                ? {'restrictedWords': invalidWords.join(', ')}// allle restricted woorden komen hierin, gescheiden door een komma
                : null  //het woord zit er niet in
        }
    }
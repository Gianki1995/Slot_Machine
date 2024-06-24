const buttonGioca = document.getElementById("gioca");
const inputNumeroGiocatoTag = document.getElementById("giocata");
const boxEsito = document.getElementById("esito");
const liNumbersAnimated = document.querySelectorAll( "ul.slot-machine--numbers > li");
const DURATA_ONE_STEP_ANIMATION = 5000 / 9;
let extractedNumbers = [];
let numGiocatoConverted;
buttonGioca.addEventListener("click", gestisciGiocata);

function gestisciGiocata() {
  boxEsito.textContent = ""
  const numGiocato = inputNumeroGiocatoTag.value;
  numGiocatoConverted = Number(numGiocato);

  if(isFinite(numGiocato) &&  numGiocato !== "" && Number.isInteger(numGiocatoConverted) && numGiocatoConverted>=0 && numGiocatoConverted <=9){
    //corretto
    inputNumeroGiocatoTag.classList.remove("errore");

   
    //La classe restart serve se vuoi giocare un'altra partita.
    //Devi fare ripartire l'animazione dall'inizio altrimenti il numero
    //nello slot resta alla precedente giocata. Il trucco per fare ripartire
    //un'animazione è mettere animation-name:none (nella classe restart)
    //e poi togliere questa classe (va tolta al successivo ciclo di repaint
    //del browser altrimenti potrebbe non funzionare).
    liNumbersAnimated[0].classList.add("restart");
    liNumbersAnimated[1].classList.add("restart");
    liNumbersAnimated[2].classList.add("restart");
    liNumbersAnimated[3].classList.add("restart");

    //estrai 4 numeri casuali
    extractedNumbers = [Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10)];
    console.log("🚀 ~ gestisciGiocata ~ extractedNumbers:", extractedNumbers)
    

    requestAnimationFrame(function(){
      liNumbersAnimated[0].classList.remove("restart");
      liNumbersAnimated[1].classList.remove("restart");
      liNumbersAnimated[2].classList.remove("restart");
      liNumbersAnimated[3].classList.remove("restart");

      liNumbersAnimated[0].classList.add("animate-number");
    liNumbersAnimated[1].classList.add("animate-number");
    liNumbersAnimated[2].classList.add("animate-number");
    liNumbersAnimated[3].classList.add("animate-number");


/*     9 sono gli step dell'animazione che in totale dura 5000ms. Quindi mi calcolo
    quando dura uno step e interrompo le animazioni quando l'animazione è
    stat eseguita per un tempo pari a durataDiUnoStep*numeroVisualizzare
 */

    
    setTimeout(function(){    liNumbersAnimated[0].classList.remove("animate-number");
  },DURATA_ONE_STEP_ANIMATION*extractedNumbers[0]);
  setTimeout(function(){    liNumbersAnimated[1].classList.remove("animate-number");
  },DURATA_ONE_STEP_ANIMATION*extractedNumbers[1]);
  setTimeout(function(){    liNumbersAnimated[2].classList.remove("animate-number");
  },DURATA_ONE_STEP_ANIMATION*extractedNumbers[2]);
  setTimeout(function(){    liNumbersAnimated[3].classList.remove("animate-number");
  },DURATA_ONE_STEP_ANIMATION*extractedNumbers[3]);
    /* DA AGGIUNGERE */
  })

    setTimeout(stabilisciRisultato,Math.max.apply(Math,extractedNumbers)*DURATA_ONE_STEP_ANIMATION);
}//end if

    else{
      inputNumeroGiocatoTag.classList.add("errore");
    }
}

function stabilisciRisultato() {
 if(extractedNumbers.includes(numGiocatoConverted)){
  boxEsito.classList.add("positivo");
  boxEsito.textContent = "Hai vinto"
  // boxEsito.style.display = "block";
  boxEsito.classList.remove("negativo")
  console.log(boxEsito.classList)
 }else{
  boxEsito.classList.add("negativo");
    boxEsito.textContent = "Hai perso";
    boxEsito.classList.remove('positivo')
      // boxEsito.style.display = "block";


    console.log(boxEsito.classList)

 }


}

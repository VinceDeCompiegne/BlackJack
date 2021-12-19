var jeuCarte = ["AsCarro","02Carro","03Carro","04Carro","05Carro","06Carro","07Carro","08Carro","09Carro","10Carro","J_Carro","Q_Carro","K_Carro","AsCoeur","02Coeur","03Coeur","04Coeur","05Coeur","06Coeur","07Coeur","08Coeur","09Coeur","10Coeur","J_Coeur","Q_Coeur","K_Coeur","AsPic","02Pic","03Pic","04Pic","05Pic","06Pic","07Pic","08Pic","09Pic","10Pic","J_Pic","Q_Pic","K_Pic","AsTrefle","02Trefle","03Trefle","04Trefle","05Trefle","06Trefle","07Trefle","08Trefle","09Trefle","10Trefle","J_Trefle","Q_Trefle","K_Trefle"];
var carteCache = "";

var CarteJoue = new Array(52);

var CarteTireOrdi = new Array();
var CarteTireJoueur = new Array();

var carteTable =0;
var cagnotte = 100;
var banque = 100;
var mise = 5;
var NumPartie = 1;
var partieGagnante = 0;
var Sabot = 52;
var blockMise = false;

var valPartieNum = document.getElementById("valPartieNum");
valPartieNum.textContent=NumPartie;

var valMise = document.getElementById("valMise");
valMise.textContent=mise + " $";



var banqueNum = document.getElementById("banqueNum");
banqueNum.textContent=banque  + " $";

var cagnotteNum = document.getElementById("cagnotteNum");
cagnotteNum.textContent=cagnotte  + " $";

var sabotNum = document.getElementById("sabotNum");
sabotNum.textContent=Sabot;

var miseBoutonMoins = document.getElementsByClassName("Mise__Bouton")[0];
var miseBoutonPlus = document.getElementsByClassName("Mise__Bouton")[1];



var carte = document.getElementById("carte");
var rejouer = document.getElementById("rejouer");
var stopper = document.getElementById("stop");
var jouer = document.getElementById("jouer");

ordi__carte1 = document.getElementById("ordi__carte1");
ordi__carte2 = document.getElementById("ordi__carte2");
ordi__carte3 = document.getElementById("ordi__carte3");
ordi__carte4 = document.getElementById("ordi__carte4");
ordi__carte5 = document.getElementById("ordi__carte5");

joueur__carte1 = document.getElementById("joueur__carte1");
joueur__carte2 = document.getElementById("joueur__carte2");
joueur__carte3 = document.getElementById("joueur__carte3");
joueur__carte4 = document.getElementById("joueur__carte4");
joueur__carte5 = document.getElementById("joueur__carte5");

carte.style.visibility="hidden";
rejouer.style.visibility="hidden";
stopper.style.visibility="hidden";
jouer.style.visibility="visible";
Init();

jouer.addEventListener('click',function (){

        carte.style.visibility="visible";
        rejouer.style.visibility="visible";
        stopper.style.visibility="visible";
        jouer.style.visibility="hidden";
    /*********************** */

    if ((Sabot<=0)||(cagnotte <= 0)){

        reInitialisation();
    }
    if (jouer.textContent=="REJOUER"){
        Init();
    }

    distributionCarte();

});
function valBanque(rejouer = false){
    /*rafraichissement cagnotte*/
    if (blockMise == true){
        let result = comptePoint(); 
        if (result==-1){
            cagnotte = cagnotte - mise;
            banque = banque + mise;
        }
        else if (result==1){
            cagnotte = cagnotte + mise;
            banque = banque - mise;
        }
        else if (rejouer == true){
            cagnotte = cagnotte + mise;
            banque = banque - mise;
        }
        cagnotteNum.textContent= cagnotte   + " $";
        banqueNum.textContent= banque   + " $";
        mise = 5;
        valMise.textContent= mise + " $";
    }
}
rejouer.addEventListener('click',function (){

        carte.style.visibility="hidden";
        rejouer.style.visibility="hidden";
        stopper.style.visibility="hidden";
        jouer.style.visibility="visible";
    

/************************** */
/*rafraichissement mise*/
    if ((cagnotte-mise) > 5) {
        mise = 5;
        valMise.textContent= mise + " $"
    }else if ((cagnotte > 0) && (cagnotte < 5)) {
        mise = cagnotte;
    }
   
    valMise.textContent= mise + " $";
/*********************** */
if ((Sabot<4)||(cagnotte <= 0)){
    jouer.textContent="REJOUER";
}else{
    jouer.textContent="JOUER";
    
}

reInitialisation();     
});

stopper.addEventListener('click', function(){

    carte.style.visibility="hidden";
    rejouer.style.visibility="visible";
    stopper.style.visibility="hidden";
    jouer.style.visibility="hidden";
    blockMise=true;

    valBanque();

});


miseBoutonMoins.addEventListener('click', function(){
    if ((mise > 1) && (blockMise == false)) {valMise.textContent= --mise + " $"};
});

miseBoutonPlus.addEventListener('click', function(){
    if (((cagnotte-mise) > 0) && (blockMise == false)) {valMise.textContent= ++mise + " $"};
});

function distributionCarte(){
    let index;

    blockMise = false;

    if (Sabot < 4){reInitialisation()};

    do{
        index = Math.floor(Math.random()*52);
 
        if (CarteJoue[index]!=1  && Sabot>0){
            ordi__carte1.src="asset/ressource/Dos.png";
            carteCache = "asset/ressource/" + jeuCarte[index] + ".png"; 
            CarteTireOrdi.push(jeuCarte[index]);
            Sabot--;
        }
        
    }while(CarteJoue[index]==1 && Sabot>0)
    CarteJoue[index]=1;
    
    do{
        index = Math.floor(Math.random()*52);
 
            if (CarteJoue[index]!=1 && Sabot>0){
                ordi__carte2.src="asset/ressource/" + jeuCarte[index] + ".png";
                CarteTireOrdi.push(jeuCarte[index]);
                Sabot--;
            }
    }while(CarteJoue[index]==1 && Sabot>0)
    CarteJoue[index]=1;
    
    do{
        index = Math.floor(Math.random()*52);

        if (CarteJoue[index]!=1 && Sabot>0){
            joueur__carte1.src="asset/ressource/" + jeuCarte[index] + ".png";
            CarteTireJoueur.push(jeuCarte[index]);
            Sabot--;
        }
        
    }while(CarteJoue[index]==1 && Sabot>0)
    CarteJoue[index]=1;
    
    do{
        index = Math.floor(Math.random()*52);

            if (CarteJoue[index]!=1 && Sabot>0){
                joueur__carte2.src="asset/ressource/" + jeuCarte[index] + ".png";
                CarteTireJoueur.push(jeuCarte[index]);
                Sabot--;
            }
    }while(CarteJoue[index]==1 && Sabot>0)
    CarteJoue[index]=1;
    carteTable=2;
    sabotNum.textContent=Sabot;

    
}
function Init(){
    if ((Sabot<4)||(cagnotte == 0)){
        Sabot = 52
        sabotNum.textContent=Sabot;
        CarteJoue = new Array(52);
        valPartieNum.textContent = ++NumPartie;

    };
    if (cagnotte <= 0){
        cagnotte = 100;
        cagnotteNum.textContent= cagnotte + " $";
        banque = 100;
        banqueNum.textContent= cagnotte + " $";
    }
}
function reInitialisation(){
   
    ordi__carte1.src="asset/ressource/FondVert.png";
    ordi__carte2.src="asset/ressource/FondVert.png";
    ordi__carte3.src="asset/ressource/FondVert.png";
    ordi__carte4.src="asset/ressource/FondVert.png";
    ordi__carte5.src="asset/ressource/FondVert.png";

    joueur__carte1.src="asset/ressource/FondVert.png";
    joueur__carte2.src="asset/ressource/FondVert.png";
    joueur__carte3.src="asset/ressource/FondVert.png";
    joueur__carte4.src="asset/ressource/FondVert.png";
    joueur__carte5.src="asset/ressource/FondVert.png";

    CarteTireOrdi = new Array();
    CarteTireJoueur = new Array();

}

carte.addEventListener('click', function (){

    let index;

    rejouer.style.visibility="hidden";

    if (++carteTable<=5){

        ordi__carte = document.getElementById("ordi__carte" + carteTable);
        do{
        index = Math.floor(Math.random()*52);
        console.log(index);
        if (CarteJoue[index]!=1 && Sabot>0){
            ordi__carte.src="asset/ressource/" + jeuCarte[index] + ".png";
            CarteTireOrdi.push(jeuCarte[index]); 
            Sabot--;
        }
        
        }while(CarteJoue[index]==1 && Sabot>0)
        CarteJoue[index]=1;
        let joueur__carte = document.getElementById("joueur__carte" + carteTable);
        do{
            index = Math.floor(Math.random()*52);
            console.log(index);
            if (CarteJoue[index]!=1 && Sabot>0){
                joueur__carte.src="asset/ressource/" + jeuCarte[index] + ".png";
                CarteTireJoueur.push(jeuCarte[index]);
                Sabot--;
            }   
        }while(CarteJoue[index]==1 && Sabot>0)
        CarteJoue[index]=1;

        sabotNum.textContent=Sabot;
        blockMise=true;
    }

    if (carteTable>=5){
        carteTable=5;
        carte.style.visibility="hidden";
        rejouer.style.visibility="visible";
        stopper.style.visibility="hidden";
        jouer.style.visibility="hidden";
        blockMise=true;
        valBanque();
    }
});

function comptePoint(){

    ordi__carte1.src=carteCache;

    let Result;

    let PointJoueur = comptePointJoueur();
    let PointOrdi = comptePointOrdi();

    console.log("PointOrdi : " + PointOrdi);
    console.log("PointJoueur : " + PointJoueur);

    if (PointJoueur <= 21){
        if ((PointJoueur>=PointOrdi) || (PointOrdi > 21)){
            Result = 1; 
        }
        else{
            Result = -1;  
        }

    }
    else{
        Result = -1;
    }
    console.log("Result = " + Result);
    return Result;
    
}

function comptePointJoueur(){
    let compteJoueur = 0;
    for (var Kard in CarteTireJoueur){
        switch (true){
            case (CarteTireJoueur[Kard] == "02Carro" || CarteTireJoueur[Kard] == "02Coeur" || CarteTireJoueur[Kard] == "02Trefle" || CarteTireJoueur[Kard] == "02Pic") :
                /*console.log("+2");*/
                compteJoueur += 2;
                break;
            case (CarteTireJoueur[Kard] == "03Carro" || CarteTireJoueur[Kard] == "03Coeur" || CarteTireJoueur[Kard] == "03Trefle" ||  CarteTireJoueur[Kard] == "03Pic") :
                /*console.log("+3");*/
                compteJoueur += 3;
                break;
            case ( CarteTireJoueur[Kard] == "04Carro" || CarteTireJoueur[Kard] == "04Coeur" || CarteTireJoueur[Kard] == "04Trefle" || CarteTireJoueur[Kard] == "04Pic") :
                /*console.log("+4");*/
                compteJoueur += 4;
                break;
            case (CarteTireJoueur[Kard] == "05Carro" || CarteTireJoueur[Kard] == "05Coeur" || CarteTireJoueur[Kard] == "05Trefle" || CarteTireJoueur[Kard] == "05Pic") :
                /*console.log("+5");*/
                compteJoueur += 5;
                break;
            case (CarteTireJoueur[Kard] == "06Carro" || CarteTireJoueur[Kard] == "06Coeur" || CarteTireJoueur[Kard] == "06Trefle" || CarteTireJoueur[Kard] == "06Pic") :
                /*console.log("+6");*/
                compteJoueur += 6;
                break;
            case (CarteTireJoueur[Kard] == "07Carro" || CarteTireJoueur[Kard] == "07Coeur" || CarteTireJoueur[Kard] == "07Trefle" || CarteTireJoueur[Kard] == "07Pic") :
                /*console.log("+7");*/
                compteJoueur += 7;
                break;
            case (CarteTireJoueur[Kard] == "08Carro" || CarteTireJoueur[Kard] == "08Coeur" || CarteTireJoueur[Kard] == "08Trefle" || CarteTireJoueur[Kard] == "08Pic") :
                /*console.log("+8");*/
                compteJoueur += 8;
                break;
            case (CarteTireJoueur[Kard] == "09Carro" || CarteTireJoueur[Kard] == "09Coeur" || CarteTireJoueur[Kard] == "09Trefle" || CarteTireJoueur[Kard] == "09Pic") :
                /*console.log("+9");*/
                compteJoueur += 9;
                break;
            case (CarteTireJoueur[Kard] == "10Carro" || CarteTireJoueur[Kard] == "10Coeur" || CarteTireJoueur[Kard] == "10Trefle" || CarteTireJoueur[Kard] == "10Pic") :
                /*console.log("+10");*/
                compteJoueur += 10;
                break;
            case (CarteTireJoueur[Kard] == "J_Carro" || CarteTireJoueur[Kard] == "J_Coeur" || CarteTireJoueur[Kard] == "J_Trefle" || CarteTireJoueur[Kard] == "J_Pic") :
                /*console.log("+10");*/
                compteJoueur += 10;
                break; 
            case (CarteTireJoueur[Kard] == "Q_Carro" || CarteTireJoueur[Kard] == "Q_Coeur" || CarteTireJoueur[Kard] == "Q_Trefle" || CarteTireJoueur[Kard] == "Q_Pic") :
                /*console.log("+10");*/
                compteJoueur += 10;
                break;
            case (CarteTireJoueur[Kard] == "K_Carro" || CarteTireJoueur[Kard] == "K_Coeur" || CarteTireJoueur[Kard] == "K_Trefle" || CarteTireJoueur[Kard] == "K_Pic") :
                /*console.log("+10");*/
                compteJoueur += 10;
                break; 
            default :
                /*console.log("autre");*/
                break;
        };
    };
    for (var Kard in CarteTireJoueur){
        switch (true){
            case (CarteTireJoueur[Kard] == "AsCarro" || CarteTireJoueur[Kard] == "AsCoeur" || CarteTireJoueur[Kard] == "AsTrefle" || CarteTireJoueur[Kard] == "AsPic") :
                if (compteJoueur + 11 < 21){compteJoueur += 11;}else{compteJoueur += 1;};
                /*console.log("+1 ou +10");*/
                break;
            default :
                compteJoueur= compteJoueur;
                break;
        };  
    };

    return compteJoueur;
}

function comptePointOrdi(){
    let compteOrdi = 0;
    for (var Kard in CarteTireOrdi){
        switch (true){
            case (CarteTireOrdi[Kard] == "02Carro" || CarteTireOrdi[Kard] == "02Coeur" || CarteTireOrdi[Kard] == "02Trefle" || CarteTireOrdi[Kard] == "02Pic") :
                /*console.log("+2");*/
                compteOrdi += 2;
                break;
            case (CarteTireOrdi[Kard] == "03Carro" || CarteTireOrdi[Kard] == "03Coeur" || CarteTireOrdi[Kard] == "03Trefle" ||  CarteTireOrdi[Kard] == "03Pic") :
                /*console.log("+3");*/
                compteOrdi += 3;
                break;
            case ( CarteTireOrdi[Kard] == "04Carro" || CarteTireOrdi[Kard] == "04Coeur" || CarteTireOrdi[Kard] == "04Trefle" || CarteTireOrdi[Kard] == "04Pic") :
                /*console.log("+4");*/
                compteOrdi += 4;
                break;
            case (CarteTireOrdi[Kard] == "05Carro" || CarteTireOrdi[Kard] == "05Coeur" || CarteTireOrdi[Kard] == "05Trefle" || CarteTireOrdi[Kard] == "05Pic") :
                /*console.log("+5");*/
                compteOrdi += 5;
                break;
            case (CarteTireOrdi[Kard] == "06Carro" || CarteTireOrdi[Kard] == "06Coeur" || CarteTireOrdi[Kard] == "06Trefle" || CarteTireOrdi[Kard] == "06Pic") :
                /*console.log("+6");*/
                compteOrdi += 6;
                break;
            case (CarteTireOrdi[Kard] == "07Carro" || CarteTireOrdi[Kard] == "07Coeur" || CarteTireOrdi[Kard] == "07Trefle" || CarteTireOrdi[Kard] == "07Pic") :
                /*console.log("+7");*/
                compteOrdi += 7;
                break;
            case (CarteTireOrdi[Kard] == "08Carro" || CarteTireOrdi[Kard] == "08Coeur" || CarteTireOrdi[Kard] == "08Trefle" || CarteTireOrdi[Kard] == "08Pic") :
                /*console.log("+8");*/
                compteOrdi += 8;
                break;
            case (CarteTireOrdi[Kard] == "09Carro" || CarteTireOrdi[Kard] == "09Coeur" || CarteTireOrdi[Kard] == "09Trefle" || CarteTireOrdi[Kard] == "09Pic") :
                /*console.log("+9");*/
                compteOrdi += 9;
                break;
            case (CarteTireOrdi[Kard] == "10Carro" || CarteTireOrdi[Kard] == "10Coeur" || CarteTireOrdi[Kard] == "10Trefle" || CarteTireOrdi[Kard] == "10Pic") :
                /*console.log("+10");*/
                compteOrdi += 10;
                break;
            case (CarteTireOrdi[Kard] == "J_Carro" || CarteTireOrdi[Kard] == "J_Coeur" || CarteTireOrdi[Kard] == "J_Trefle" || CarteTireOrdi[Kard] == "J_Pic") :
                /*console.log("+10");*/
                compteOrdi += 10;
                break; 
            case (CarteTireOrdi[Kard] == "Q_Carro" || CarteTireOrdi[Kard] == "Q_Coeur" || CarteTireOrdi[Kard] == "Q_Trefle" || CarteTireOrdi[Kard] == "Q_Pic") :
                /*console.log("+10");*/
                compteOrdi += 10;
                break;
            case (CarteTireOrdi[Kard] == "K_Carro" || CarteTireOrdi[Kard] == "K_Coeur" || CarteTireOrdi[Kard] == "K_Trefle" || CarteTireOrdi[Kard] == "K_Pic") :
                /*console.log("+10");*/
                compteOrdi += 10;
                break; 
            default :
                /*console.log("autre");*/
                break;
        };
    };
    for (var Kard in CarteTireOrdi){
        switch (true){
            case (CarteTireOrdi[Kard] == "AsCarro" || CarteTireOrdi[Kard] == "AsCoeur" || CarteTireOrdi[Kard] == "AsTrefle" || CarteTireOrdi[Kard] == "AsPic") :
                if (compteOrdi + 11 < 21){compteOrdi += 11;}else{compteOrdi += 1;};
                /*console.log("+1 ou +10");*/
                break;
            default :
            compteOrdi= compteOrdi;
                break;
        };  
    };

    return compteOrdi;
}